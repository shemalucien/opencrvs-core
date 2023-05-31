/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * OpenCRVS is also distributed under the terms of the Civil Registration
 * & Healthcare Disclaimer located at http://opencrvs.org/license.
 *
 * Copyright (C) The OpenCRVS Authors. OpenCRVS and the OpenCRVS
 * graphic logo are (registered/a) trademark(s) of Plan International.
 */
import { HEARTH_URL, VALIDATING_EXTERNALLY } from '@workflow/constants'
import {
  markBundleAsCertified,
  markBundleAsValidated,
  markEventAsRegistered,
  modifyRegistrationBundle,
  setTrackingId,
  markBundleAsWaitingValidation,
  updatePatientIdentifierWithRN,
  touchBundle,
  markBundleAsDeclarationUpdated,
  markBundleAsRequestedForCorrection,
  validateDeceasedDetails,
  makeTaskAnonymous,
  markBundleAsIssued
} from '@workflow/features/registration/fhir/fhir-bundle-modifier'
import {
  getEventInformantName,
  getFromFhir,
  getPhoneNo,
  getSharedContactMsisdn,
  postToHearth,
  generateEmptyBundle,
  mergePatientIdentifier
} from '@workflow/features/registration/fhir/fhir-utils'
import {
  sendEventNotification,
  sendRegisteredNotification,
  isEventNonNotifiable
} from '@workflow/features/registration/utils'
import {
  taskHasInput,
  getTaskEventType
} from '@workflow/features/task/fhir/utils'
import { logger } from '@workflow/logger'
import { getToken } from '@workflow/utils/authUtils'
import * as Hapi from '@hapi/hapi'
import fetch from 'node-fetch'
import { EVENT_TYPE } from '@workflow/features/registration/fhir/constants'
import { getTaskResource } from '@workflow/features/registration/fhir/fhir-template'
import { triggerEvent } from '@workflow/features/events/handler'
import {
  Events,
  MARK_REG,
  REG_NUMBER_SYSTEM,
  SECTION_CODE
} from '@workflow/features/events/utils'

interface IEventRegistrationCallbackPayload {
  trackingId: string
  registrationNumber: string
  error: string
  childIdentifiers?: {
    type: `BIRTH_CONFIGURABLE_IDENTIFIER_${1 | 2 | 3}`
    value: string
  }[]
}

async function sendBundleToHearth(
  payload: fhir.Bundle,
  count = 1
): Promise<fhir.Bundle> {
  const res = await fetch(HEARTH_URL, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/fhir+json'
    }
  })
  if (!res.ok) {
    if (res.status === 409 && count < 5) {
      setTrackingId(payload)
      return await sendBundleToHearth(payload, count + 1)
    }

    throw new Error(
      `FHIR post to /fhir failed with [${res.status}] body: ${await res.text()}`
    )
  }

  return res.json()
}

function getSectionFromResponse(
  response: fhir.Bundle,
  reference: string
): fhir.BundleEntry[] {
  return (response.entry &&
    response.entry.filter((o) => {
      const res = o.response as fhir.BundleEntryResponse
      return Object.keys(res).some((k) =>
        res[k].toLowerCase().includes(reference.toLowerCase())
      )
    })) as fhir.BundleEntry[]
}

function getSectionIndex(
  section: fhir.CompositionSection[]
): number | undefined {
  let index
  section.filter((obj: fhir.CompositionSection, i: number) => {
    if (
      obj.title &&
      ['Birth encounter', 'Death encounter', 'Marriage encounter'].includes(
        obj.title
      )
    ) {
      index = i
    }
  })
  return index
}

export function populateCompositionWithID(
  payload: fhir.Bundle,
  response: fhir.Bundle
) {
  if (
    payload &&
    payload.entry &&
    payload.entry[0].resource &&
    payload.entry[0].resource.resourceType === 'Composition'
  ) {
    const responseEncounterSection = getSectionFromResponse(
      response,
      'Encounter'
    )
    const composition = payload.entry[0].resource as fhir.Composition
    if (composition.section) {
      const payloadEncounterSectionIndex = getSectionIndex(composition.section)
      if (
        payloadEncounterSectionIndex !== undefined &&
        composition.section[payloadEncounterSectionIndex] &&
        composition.section[payloadEncounterSectionIndex].entry &&
        responseEncounterSection &&
        responseEncounterSection[0] &&
        responseEncounterSection[0].response &&
        responseEncounterSection[0].response.location
      ) {
        const entry = composition.section[payloadEncounterSectionIndex]
          .entry as fhir.Reference[]
        entry[0].reference =
          responseEncounterSection[0].response.location.split('/')[3]
        composition.section[payloadEncounterSectionIndex].entry = entry
      }
      if (!composition.id) {
        composition.id =
          response &&
          response.entry &&
          response.entry[0].response &&
          response.entry[0].response.location &&
          response.entry[0].response.location.split('/')[3]
      }
      payload.entry[0].resource = composition
    }
  }
}

export async function createRegistrationHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit,
  event: Events
) {
  try {
    const token = getToken(request)
    let payload = await modifyRegistrationBundle(
      request.payload as fhir.Bundle,
      token
    )
    if (
      [
        Events.REGISTRAR_BIRTH_REGISTRATION_WAITING_EXTERNAL_RESOURCE_VALIDATION,
        Events.REGISTRAR_DEATH_REGISTRATION_WAITING_EXTERNAL_RESOURCE_VALIDATION,
        Events.REGISTRAR_MARRIAGE_REGISTRATION_WAITING_EXTERNAL_RESOURCE_VALIDATION
      ].includes(event)
    ) {
      payload = await markBundleAsWaitingValidation(
        payload as fhir.Bundle,
        token
      )
    } else if (
      [
        Events.BIRTH_REQUEST_FOR_REGISTRAR_VALIDATION,
        Events.DEATH_REQUEST_FOR_REGISTRAR_VALIDATION,
        Events.MARRIAGE_REQUEST_FOR_REGISTRAR_VALIDATION
      ].includes(event)
    ) {
      payload = await markBundleAsValidated(payload as fhir.Bundle, token)
    }
    const resBundle = await sendBundleToHearth(payload)
    populateCompositionWithID(payload, resBundle)

    if (isEventNonNotifiable(event)) {
      return { resBundle, payloadForInvokingValidation: payload }
    }

    /* sending notification to the contact */
    const msisdn = await getSharedContactMsisdn(payload)
    if (!msisdn) {
      logger.info('createRegistrationHandler could not send event notification')
      return { resBundle, payloadForInvokingValidation: payload }
    }
    logger.info('createRegistrationHandler sending event notification')
    sendEventNotification(payload, event, msisdn, {
      Authorization: request.headers.authorization
    })
    return { resBundle, payloadForInvokingValidation: payload }
  } catch (error) {
    logger.error(
      `Workflow/createRegistrationHandler[${event}]: error: ${error}`
    )
    throw new Error(error)
  }
}

export async function markEventAsValidatedHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit,
  event: Events
) {
  try {
    let payload: fhir.Bundle & fhir.BundleEntry

    const taskResource = getTaskResource(
      request.payload as fhir.Bundle & fhir.BundleEntry
    )

    // In case the record was updated then there will be input output in payload
    if (taskHasInput(taskResource)) {
      payload = await markBundleAsDeclarationUpdated(
        request.payload as fhir.Bundle & fhir.BundleEntry,
        getToken(request)
      )
      await postToHearth(payload)
      await triggerEvent(Events.DECLARATION_UPDATED, payload, request.headers)
      delete taskResource.input
      delete taskResource.output
    }

    payload = await markBundleAsValidated(
      request.payload as fhir.Bundle & fhir.BundleEntry,
      getToken(request)
    )

    return await postToHearth(payload)
  } catch (error) {
    logger.error(`Workflow/markAsValidatedHandler[${event}]: error: ${error}`)
    throw new Error(error)
  }
}

export async function markEventAsRegisteredCallbackHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  const { trackingId, registrationNumber, error, childIdentifiers } =
    request.payload as IEventRegistrationCallbackPayload

  if (error) {
    throw new Error(`Callback triggered with an error: ${error}`)
  }

  const taskBundle: fhir.Bundle = await getFromFhir(
    `/Task?identifier=${trackingId}`
  )
  if (
    !taskBundle ||
    !taskBundle.entry ||
    !taskBundle.entry[0] ||
    !taskBundle.entry[0].resource
  ) {
    throw new Error(
      `Task for tracking id ${trackingId} could not be found during markEventAsRegisteredCallbackHandler`
    )
  }

  const task = taskBundle.entry[0].resource as fhir.Task
  if (!task.focus || !task.focus.reference) {
    throw new Error(`Task ${task.id} doesn't have a focus reference`)
  }
  const composition: fhir.Composition = await getFromFhir(
    `/${task.focus.reference}`
  )
  const event = getTaskEventType(task) as EVENT_TYPE

  try {
    await markEventAsRegistered(
      task,
      registrationNumber,
      event,
      getToken(request)
    )

    /** pushing registrationNumber on related person's identifier
     *  taking patients as an array because MARRIAGE Event has two types of patient
     */
    const patients: fhir.Patient[] = await updatePatientIdentifierWithRN(
      composition,
      SECTION_CODE[event],
      REG_NUMBER_SYSTEM[event],
      registrationNumber
    )

    if (event === EVENT_TYPE.BIRTH && childIdentifiers) {
      // For birth event patients[0] is child and it should
      // already be initialized with the RN identifier
      childIdentifiers.forEach((childIdentifier) => {
        const previousIdentifier = patients[0].identifier!.find(
          ({ type }) => type === childIdentifier.type
        )
        if (!previousIdentifier) {
          // @ts-ignore
          patients[0].identifier!.push(childIdentifier)
        } else {
          previousIdentifier.value = childIdentifier.value
        }
      })
    }

    if (event === EVENT_TYPE.DEATH) {
      /** using first patient because for death event there is only one patient */
      patients[0] = await validateDeceasedDetails(patients[0], {
        Authorization: request.headers.authorization
      })
    }

    //** Making sure db automicity */
    const bundle = generateEmptyBundle()
    bundle.entry?.push({ resource: task })
    for (const patient of patients) {
      bundle.entry?.push({ resource: patient })
    }
    await sendBundleToHearth(bundle)
    //TODO: We have to configure sms and identify informant for marriage event
    if (event !== EVENT_TYPE.MARRIAGE) {
      const phoneNo = await getPhoneNo(task, event)
      const informantName = await getEventInformantName(composition, event)
      /* sending notification to the contact */
      if (phoneNo && informantName) {
        logger.info(
          'markEventAsRegisteredCallbackHandler sending event notification'
        )
        sendRegisteredNotification(
          phoneNo,
          informantName,
          trackingId,
          registrationNumber,
          event,
          {
            Authorization: request.headers.authorization
          }
        )
      } else {
        logger.info(
          'markEventAsRegisteredCallbackHandler could not send event notification'
        )
      }
    }
    // Most nations will desire the opportunity to pilot OpenCRVS alongised a legacy system, or an external data store / validation process
    // In the absence of an external process, we must wait at least a second before we continue, because Elasticsearch must
    // have time to complete indexing the previous waiting for external validation state before we update the search index with a BRN / DRN
    // If an external system is being used, then its processing time will mean a wait is not required.
    if (!VALIDATING_EXTERNALLY) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
    // Trigger an event for the registration
    await triggerEvent(
      MARK_REG[event],
      { resourceType: 'Bundle', entry: [{ resource: task }] },
      request.headers
    )
  } catch (error) {
    logger.error(
      `Workflow/markEventAsRegisteredCallbackHandler[${event}]: error: ${error}`
    )
    throw new Error(error)
  }

  return h.response().code(200)
}

export async function markEventAsWaitingValidationHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit,
  event: Events
) {
  try {
    let payload: fhir.Bundle & fhir.BundleEntry

    const taskResource = getTaskResource(
      request.payload as fhir.Bundle & fhir.BundleEntry
    )

    // In case the record was updated then there will be input output in payload
    if (taskHasInput(taskResource)) {
      payload = await markBundleAsDeclarationUpdated(
        request.payload as fhir.Bundle & fhir.BundleEntry,
        getToken(request)
      )
      await postToHearth(payload)
      await triggerEvent(Events.DECLARATION_UPDATED, payload, request.headers)
      delete taskResource.input
      delete taskResource.output
    }

    payload = await markBundleAsWaitingValidation(
      request.payload as fhir.Bundle & fhir.BundleEntry,
      getToken(request)
    )
    const resBundle = await postToHearth(payload)
    populateCompositionWithID(payload, resBundle)

    return { resBundle, payloadForInvokingValidation: payload }
  } catch (error) {
    logger.error(
      `Workflow/markAsWaitingValidationHandler[${event}]: error: ${error}`
    )
    throw new Error(error)
  }
}

export async function markEventAsCertifiedHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  try {
    const payload = await markBundleAsCertified(
      request.payload as fhir.Bundle,
      getToken(request)
    )
    await mergePatientIdentifier(payload)
    const resBundle = await postToHearth(payload)
    populateCompositionWithID(payload, resBundle)
    return resBundle
  } catch (error) {
    logger.error(`Workflow/markEventAsCertifiedHandler: error: ${error}`)
    throw new Error(error)
  }
}

export async function markEventAsIssuedHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  try {
    const payload = await markBundleAsIssued(
      request.payload as fhir.Bundle,
      getToken(request)
    )
    await mergePatientIdentifier(payload)
    const resBundle = await postToHearth(payload)
    populateCompositionWithID(payload, resBundle)
    return resBundle
  } catch (error) {
    logger.error(`Workflow/markEventAsIssuedHandler: error: ${error}`)
    throw new Error(error)
  }
}

export async function actionEventHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit,
  event: Events
) {
  try {
    let payload = request.payload as fhir.Bundle
    payload = await touchBundle(payload, getToken(request))
    const taskResource = payload.entry?.[0].resource as fhir.Task
    return await fetch(`${HEARTH_URL}/Task/${taskResource.id}`, {
      method: 'PUT',
      body: JSON.stringify(taskResource),
      headers: {
        'Content-Type': 'application/fhir+json'
      }
    })
  } catch (error) {
    logger.error(`Workflow/actionEventHandler(${event}): error: ${error}`)
    throw new Error(error)
  }
}
export async function anonymousActionEventHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit,
  event: Events
) {
  try {
    const payload = request.payload as fhir.Bundle
    const anonymousPayload = makeTaskAnonymous(payload)

    const taskResource = anonymousPayload.entry?.[0].resource as fhir.Task
    const res = await fetch(`${HEARTH_URL}/Task/${taskResource.id}`, {
      method: 'PUT',
      body: JSON.stringify(taskResource),
      headers: {
        'Content-Type': 'application/fhir+json'
      }
    })
    return res
  } catch (error) {
    logger.error(`Workflow/actionEventHandler(${event}): error: ${error}`)
    throw new Error(error)
  }
}

export async function markEventAsRequestedForCorrectionHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  try {
    const payload = await markBundleAsRequestedForCorrection(
      request.payload as fhir.Bundle,
      getToken(request)
    )
    return await postToHearth(payload)
  } catch (error) {
    logger.error(
      `Workflow/markEventAsRequestedForCorrectionHandler: error: ${error}`
    )
    throw new Error(error)
  }
}
