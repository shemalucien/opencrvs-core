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
import { v4 as uuid } from 'uuid'
import {
  createPersonSection,
  createPersonEntryTemplate,
  createEncounterSection,
  createEncounter,
  createLocationResource,
  createObservationEntryTemplate,
  createSupportingDocumentsSection,
  createDocRefTemplate,
  createTaskRefTemplate,
  createRelatedPersonTemplate,
  createPaymentReconciliationTemplate,
  createQuestionnaireResponseTemplate,
  CERTIFICATE_DOCS_CODE,
  CERTIFICATE_DOCS_TITLE,
  CERTIFICATE_CONTEXT_KEY,
  BIRTH_ENCOUNTER_CODE,
  DEATH_ENCOUNTER_CODE,
  INFORMANT_CODE,
  INFORMANT_TITLE,
  createPractitionerEntryTemplate,
  BIRTH_CORRECTION_ENCOUNTER_CODE,
  DEATH_CORRECTION_ENCOUNTER_CODE,
  CORRECTION_CERTIFICATE_DOCS_CODE,
  CORRECTION_CERTIFICATE_DOCS_TITLE,
  CORRECTION_CERTIFICATE_DOCS_CONTEXT_KEY
} from '@gateway/features/fhir/templates'
import {
  ITemplatedBundle,
  ITemplatedComposition
} from '@gateway/features/registration/fhir-builders'
import fetch from 'node-fetch'
import {
  FHIR_URL,
  SEARCH_URL,
  METRICS_URL,
  HEARTH_URL,
  DOCUMENTS_URL
} from '@gateway/constants'
import { IAuthHeader } from '@gateway/common-types'
import {
  FHIR_OBSERVATION_CATEGORY_URL,
  OPENCRVS_SPECIFICATION_URL,
  EVENT_TYPE,
  BIRTH_REG_NO,
  DEATH_REG_NO,
  DOWNLOADED_EXTENSION_URL,
  REQUEST_CORRECTION_EXTENSION_URL,
  ASSIGNED_EXTENSION_URL,
  UNASSIGNED_EXTENSION_URL,
  REINSTATED_EXTENSION_URL,
  VIEWED_EXTENSION_URL
} from '@gateway/features/fhir/constants'
import { ISearchCriteria } from '@gateway/features/search/type-resolvers'
import { IMetricsParam } from '@gateway/features/metrics/root-resolvers'
import { URLSearchParams } from 'url'
import { logger } from '@gateway/logger'
import {
  GQLBirthRegistrationInput,
  GQLDeathRegistrationInput,
  GQLRegAction,
  GQLRegStatus
} from '@gateway/graphql/schema'
import { getTokenPayload, getUser } from '@gateway/features/user/utils'
export interface ITimeLoggedResponse {
  status?: string
  timeSpentEditing: number
}
export interface IEventDurationResponse {
  status: string
  durationInSeconds: number
}
export function findCompositionSectionInBundle(
  code: string,
  fhirBundle: ITemplatedBundle
) {
  return findCompositionSection(code, fhirBundle.entry[0].resource)
}

export function findCompositionSection(
  code: string,
  composition: ITemplatedComposition
) {
  return (
    composition.section &&
    composition.section.find((section: fhir.CompositionSection) => {
      if (!section.code || !section.code.coding || !section.code.coding.some) {
        return false
      }
      return section.code.coding.some((coding) => coding.code === code)
    })
  )
}

export function selectOrCreatePersonResource(
  sectionCode: string,
  sectionTitle: string,
  fhirBundle: ITemplatedBundle
): fhir.Patient {
  const section = findCompositionSectionInBundle(sectionCode, fhirBundle)

  let personEntry
  if (!section) {
    // create person
    const ref = uuid()
    const personSection = createPersonSection(ref, sectionCode, sectionTitle)
    const composition = fhirBundle.entry[0].resource
    composition.section.push(personSection)
    personEntry = createPersonEntryTemplate(ref)
    fhirBundle.entry.push(personEntry)
  } else {
    if (!section.entry || !section.entry[0]) {
      throw new Error('Expected person section ot have an entry')
    }
    const personSectionEntry = section.entry[0]
    personEntry = fhirBundle.entry.find(
      (entry) => entry.fullUrl === personSectionEntry.reference
    )
  }

  if (!personEntry) {
    throw new Error(
      'Patient referenced from composition section not found in FHIR bundle'
    )
  }

  return personEntry.resource as fhir.Patient
}

export function selectOrCreateEncounterResource(
  fhirBundle: ITemplatedBundle,
  context: any,
  isCorrection?: boolean
): fhir.Encounter {
  let sectionCode
  if (context.event === EVENT_TYPE.BIRTH) {
    sectionCode = isCorrection
      ? BIRTH_CORRECTION_ENCOUNTER_CODE
      : BIRTH_ENCOUNTER_CODE
  } else if (context.event === EVENT_TYPE.DEATH) {
    sectionCode = isCorrection
      ? DEATH_CORRECTION_ENCOUNTER_CODE
      : DEATH_ENCOUNTER_CODE
  } else {
    throw new Error(`Unknown event ${context}`)
  }
  const section = findCompositionSectionInBundle(sectionCode, fhirBundle)
  let encounterEntry

  if (!section) {
    const ref = uuid()
    const encounterSection = createEncounterSection(ref, sectionCode)
    fhirBundle.entry[0].resource.section.push(encounterSection)
    encounterEntry = createEncounter(ref)
    fhirBundle.entry.push(encounterEntry)
  } else {
    if (!section.entry || !section.entry[0]) {
      throw new Error('Expected encounter section to have an entry')
    }
    const encounterSectionEntry = section.entry[0]
    encounterEntry = fhirBundle.entry.find(
      (entry) => entry.fullUrl === encounterSectionEntry.reference
    )
  }

  if (!encounterEntry) {
    throw new Error(
      'Encounter referenced from composition section not found in FHIR bundle'
    )
  }

  return encounterEntry.resource as fhir.Encounter
}

export function selectOrCreateObservationResource(
  sectionCode: string,
  categoryCode: string,
  categoryDescription: string,
  observationCode: string,
  observationDescription: string,
  fhirBundle: ITemplatedBundle,
  context: any
): fhir.Observation {
  let observation = fhirBundle.entry.find((entry) => {
    if (
      !entry ||
      !entry.resource ||
      entry.resource.resourceType !== 'Observation'
    ) {
      return false
    }
    const observationEntry = entry.resource as fhir.Observation
    const obCoding =
      observationEntry.code &&
      observationEntry.code.coding &&
      observationEntry.code.coding.find(
        (obCode) => obCode.code === observationCode
      )
    if (obCoding) {
      return true
    }
    return false
  })

  if (observation) {
    return observation.resource as fhir.Observation
  }
  /* Existing obseration not found for given type */
  observation = createObservationResource(sectionCode, fhirBundle, context)
  return updateObservationInfo(
    observation as fhir.Observation,
    categoryCode,
    categoryDescription,
    observationCode,
    observationDescription
  )
}

export function updateObservationInfo(
  observation: fhir.Observation,
  categoryCode: string,
  categoryDescription: string,
  observationCode: string,
  observationDescription: string
): fhir.Observation {
  const categoryCoding = {
    coding: [
      {
        system: FHIR_OBSERVATION_CATEGORY_URL,
        code: categoryCode,
        display: categoryDescription
      }
    ]
  }

  if (!observation.category) {
    observation.category = []
  }
  observation.category.push(categoryCoding)

  const coding = [
    {
      system: 'http://loinc.org',
      code: observationCode,
      display: observationDescription
    }
  ]
  setArrayPropInResourceObject(observation, 'code', coding, 'coding')
  return observation
}

export function selectObservationResource(
  observationCode: string,
  fhirBundle: ITemplatedBundle
): fhir.Observation | undefined {
  let observation
  fhirBundle.entry.forEach((entry) => {
    if (
      !entry ||
      !entry.resource ||
      entry.resource.resourceType === 'Observation'
    ) {
      const observationEntry = entry.resource as fhir.Observation
      const obCoding =
        observationEntry.code &&
        observationEntry.code.coding &&
        observationEntry.code.coding.find(
          (obCode) => obCode.code === observationCode
        )
      if (obCoding) {
        observation = observationEntry
      }
    }
  })

  return observation
}

export async function removeObservationResource(
  observationCode: string,
  fhirBundle: ITemplatedBundle
) {
  fhirBundle.entry.forEach((entry, index) => {
    if (
      !entry ||
      !entry.resource ||
      entry.resource.resourceType === 'Observation'
    ) {
      const observationEntry = entry.resource as fhir.Observation
      const obCoding =
        observationEntry.code &&
        observationEntry.code.coding &&
        observationEntry.code.coding.find(
          (obCode) => obCode.code === observationCode
        )
      if (obCoding) {
        fhirBundle.entry.splice(index, 1)
      }
    }
  })
}

export function createObservationResource(
  sectionCode: string,
  fhirBundle: ITemplatedBundle,
  context: any
): fhir.Observation {
  const encounter = selectOrCreateEncounterResource(fhirBundle, context)
  const section = findCompositionSectionInBundle(sectionCode, fhirBundle)

  const ref = uuid()
  const observationEntry = createObservationEntryTemplate(ref)
  if (!section || !section.entry || !section.entry[0]) {
    throw new Error('Expected encounter section to exist and have an entry')
  }
  const encounterSectionEntry = section.entry[0]
  const encounterEntry = fhirBundle.entry.find(
    (entry) => entry.fullUrl === encounterSectionEntry.reference
  )
  if (encounterEntry && encounter) {
    observationEntry.resource.context = {
      reference: `${encounterEntry.fullUrl}`
    }
  }
  fhirBundle.entry.push(observationEntry)

  return observationEntry.resource
}

export function selectOrCreateLocationRefResource(
  sectionCode: string,
  fhirBundle: ITemplatedBundle,
  context: any
): fhir.Location {
  let locationEntry
  const isCorrection = [
    BIRTH_CORRECTION_ENCOUNTER_CODE,
    DEATH_CORRECTION_ENCOUNTER_CODE
  ].includes(sectionCode)
  const encounter = selectOrCreateEncounterResource(
    fhirBundle,
    context,
    isCorrection
  )

  if (!encounter.location) {
    // create location
    const locationRef = uuid()
    locationEntry = createLocationResource(locationRef)
    fhirBundle.entry.push(locationEntry)
    encounter.location = []
    encounter.location.push({
      location: { reference: `urn:uuid:${locationRef}` }
    })
  } else {
    if (!encounter.location || !encounter.location[0]) {
      throw new Error('Encounter is expected to have a location property')
    }
    const locationElement = encounter.location[0]
    locationEntry = fhirBundle.entry.find(
      (entry) => entry.fullUrl === locationElement.location.reference
    )
  }

  if (!locationEntry) {
    throw new Error(
      'Location referenced from encounter section not found in FHIR bundle'
    )
  }

  return locationEntry.resource as fhir.Location
}

export function selectOrCreateEncounterParticipant(
  fhirBundle: ITemplatedBundle,
  context: any
): fhir.Reference {
  const encounter = selectOrCreateEncounterResource(fhirBundle, context)
  if (!encounter.participant || !encounter.participant[0]) {
    encounter.participant = [{}]
  }
  return encounter.participant[0]
}

export function selectOrCreateEncounterPartitioner(
  fhirBundle: ITemplatedBundle,
  context: any
): fhir.Practitioner {
  const encounterParticipant = selectOrCreateEncounterParticipant(
    fhirBundle,
    context
  ) as fhir.EncounterParticipant
  let practitioner
  if (
    !encounterParticipant.individual ||
    !encounterParticipant.individual.reference
  ) {
    const ref = uuid()
    encounterParticipant.individual = {
      reference: `urn:uuid:${ref}`
    }
    practitioner = createPractitionerEntryTemplate(ref)
    fhirBundle.entry.push(practitioner)
  } else {
    practitioner = fhirBundle.entry.find(
      (entry) => entry.fullUrl === encounterParticipant.individual?.reference
    )
    if (!practitioner) {
      throw new Error(
        'fhirBundle is expected to have an encounter practitioner entry'
      )
    }
  }
  return practitioner.resource as fhir.Practitioner
}

export function selectOrCreateEncounterLocationRef(
  fhirBundle: ITemplatedBundle,
  context: any,
  correction?: boolean
): fhir.Reference {
  const encounter = selectOrCreateEncounterResource(
    fhirBundle,
    context,
    correction
  )
  if (!encounter.location) {
    encounter.location = []
    encounter.location.push({
      location: { reference: '' }
    })
  } else {
    if (!encounter.location || !encounter.location[0]) {
      throw new Error('Encounter is expected to have a location property')
    }
  }
  return encounter.location[0].location
}

export function selectOrCreateDocRefResource(
  sectionCode: string,
  sectionTitle: string,
  fhirBundle: ITemplatedBundle,
  context: any,
  indexKey: string
): fhir.DocumentReference {
  const section = findCompositionSectionInBundle(sectionCode, fhirBundle)

  let docRef
  if (!section) {
    const ref = uuid()
    const docSection = createSupportingDocumentsSection(
      sectionCode,
      sectionTitle
    )
    docSection.entry[context._index[indexKey]] = {
      reference: `urn:uuid:${ref}`
    }
    fhirBundle.entry[0].resource.section.push(docSection)
    docRef = createDocRefTemplate(ref)
    fhirBundle.entry.push(docRef)
  } else {
    if (!section.entry) {
      throw new Error(
        'Expected supporting documents section to have an entry property'
      )
    }
    const docSectionEntry = section.entry[context._index[indexKey]]
    if (!docSectionEntry) {
      const ref = uuid()
      section.entry[context._index[indexKey]] = {
        reference: `urn:uuid:${ref}`
      }
      docRef = createDocRefTemplate(ref)
      fhirBundle.entry.push(docRef)
    } else {
      docRef = fhirBundle.entry.find(
        (entry) => entry.fullUrl === docSectionEntry.reference
      )
      if (!docRef) {
        const ref = uuid()
        docRef = createDocRefTemplate(ref)
        fhirBundle.entry.push(docRef)
        section.entry[context._index[indexKey]] = {
          reference: `urn:uuid:${ref}`
        }
      }
    }
  }

  return docRef.resource as fhir.DocumentReference
}

export function selectOrCreateCertificateDocRefResource(
  fhirBundle: ITemplatedBundle,
  context: any,
  eventType: string,
  isCorrection?: boolean
): fhir.DocumentReference {
  const certificate = isCorrection
    ? {
        code: CORRECTION_CERTIFICATE_DOCS_CODE,
        title: CORRECTION_CERTIFICATE_DOCS_TITLE,
        indexKey: CORRECTION_CERTIFICATE_DOCS_CONTEXT_KEY
      }
    : {
        code: CERTIFICATE_DOCS_CODE,
        title: CERTIFICATE_DOCS_TITLE,
        indexKey: CERTIFICATE_CONTEXT_KEY
      }
  const docRef = selectOrCreateDocRefResource(
    certificate.code,
    certificate.title,
    fhirBundle,
    context,
    certificate.indexKey
  )
  if (!docRef.type) {
    docRef.type = {
      coding: [
        {
          system: `${OPENCRVS_SPECIFICATION_URL}certificate-type`,
          code: eventType
        }
      ]
    }
  }
  return docRef
}

export function selectOrCreateInformantSection(
  sectionCode: string,
  sectionTitle: string,
  fhirBundle: ITemplatedBundle
): fhir.RelatedPerson {
  const section = findCompositionSectionInBundle(sectionCode, fhirBundle)

  let informantEntry
  if (!section) {
    // create person
    const ref = uuid()
    const informantSection = createPersonSection(ref, sectionCode, sectionTitle)
    const composition = fhirBundle.entry[0].resource
    composition.section.push(informantSection)
    informantEntry = createRelatedPersonTemplate(ref)
    fhirBundle.entry.push(informantEntry)
  } else {
    if (!section.entry || !section.entry[0]) {
      throw new Error('Expected person section ot have an entry')
    }
    const personSectionEntry = section.entry[0]
    informantEntry = fhirBundle.entry.find(
      (entry) => entry.fullUrl === personSectionEntry.reference
    )
  }

  if (!informantEntry) {
    throw new Error(
      'Informant referenced from composition section not found in FHIR bundle'
    )
  }

  return informantEntry.resource as fhir.RelatedPerson
}

export function selectOrCreateInformantResource(
  fhirBundle: ITemplatedBundle
): fhir.Patient {
  const relatedPersonResource = selectOrCreateInformantSection(
    INFORMANT_CODE,
    INFORMANT_TITLE,
    fhirBundle
  )
  const patientRef =
    relatedPersonResource.patient && relatedPersonResource.patient.reference
  if (!patientRef) {
    const personEntry = createPersonEntryTemplate(uuid())
    fhirBundle.entry.push(personEntry)
    relatedPersonResource.patient = {
      reference: personEntry.fullUrl
    }
    return personEntry.resource as fhir.Patient
  } else {
    const personEntry = fhirBundle.entry.find(
      (entry) => entry.fullUrl === patientRef
    )
    if (!personEntry) {
      throw new Error(
        'No related informant person entry not found on fhir bundle'
      )
    }
    return personEntry.resource as fhir.Patient
  }
}

export function selectOrCreateRelatedPersonResource(
  fhirBundle: ITemplatedBundle,
  context: any,
  eventType: string
): fhir.RelatedPerson {
  const docRef = selectOrCreateCertificateDocRefResource(
    fhirBundle,
    context,
    eventType
  )
  if (!docRef.extension) {
    docRef.extension = []
  }
  const relatedPersonExt = docRef.extension.find(
    (extention) =>
      extention.url === `${OPENCRVS_SPECIFICATION_URL}extension/collector`
  )
  if (!relatedPersonExt) {
    const relatedPersonEntry = createRelatedPersonTemplate(uuid())
    fhirBundle.entry.push(relatedPersonEntry)
    docRef.extension.push({
      url: `${OPENCRVS_SPECIFICATION_URL}extension/collector`,
      valueReference: {
        reference: relatedPersonEntry.fullUrl
      }
    })
    return relatedPersonEntry.resource
  } else {
    const relatedPersonEntry = fhirBundle.entry.find((entry) => {
      if (!relatedPersonExt.valueReference) {
        return false
      }
      return entry.fullUrl === relatedPersonExt.valueReference.reference
    })
    if (!relatedPersonEntry) {
      throw new Error('No related person entry found on bundle')
    }
    return relatedPersonEntry.resource as fhir.RelatedPerson
  }
}

export function selectOrCreateCollectorPersonResource(
  fhirBundle: ITemplatedBundle,
  context: any,
  eventType: string
): fhir.Patient {
  const relatedPersonResource = selectOrCreateRelatedPersonResource(
    fhirBundle,
    context,
    eventType
  )
  const patientRef =
    relatedPersonResource.patient && relatedPersonResource.patient.reference
  if (!patientRef) {
    const personEntry = createPersonEntryTemplate(uuid())
    fhirBundle.entry.push(personEntry)
    relatedPersonResource.patient = {
      reference: personEntry.fullUrl
    }
    return personEntry.resource as fhir.Patient
  } else {
    const personEntry = fhirBundle.entry.find(
      (entry) => entry.fullUrl === patientRef
    )
    if (!personEntry) {
      throw new Error(
        'No related collector person entry not found on fhir bundle'
      )
    }
    return personEntry.resource as fhir.Patient
  }
}

export async function setCertificateCollectorReference(
  sectionCode: string,
  relatedPerson: fhir.RelatedPerson,
  fhirBundle: ITemplatedBundle,
  context: any
) {
  const section = findCompositionSectionInBundle(sectionCode, fhirBundle)
  if (section && section.entry) {
    const personSectionEntry = section.entry[0]
    const personEntry = fhirBundle.entry.find(
      (entry) => entry.fullUrl === personSectionEntry.reference
    )
    if (!personEntry) {
      throw new Error('Expected person entry not found on the bundle')
    }
    relatedPerson.patient = {
      reference: personEntry.fullUrl
    }
  } else {
    const composition = await fetchFHIR(
      `/Composition/${fhirBundle.entry[0].resource.id}`,
      context.authHeader
    )

    const sec = findCompositionSection(sectionCode, composition)
    if (sec && sec.entry) {
      relatedPerson.patient = {
        reference: sec.entry[0].reference
      }
    }
  }
}

export function selectOrCreatePaymentReconciliationResource(
  fhirBundle: ITemplatedBundle,
  context: any,
  eventType: string,
  isCorrection?: boolean
): fhir.PaymentReconciliation {
  const docRef = selectOrCreateCertificateDocRefResource(
    fhirBundle,
    context,
    eventType,
    isCorrection
  )
  if (!docRef.extension) {
    docRef.extension = []
  }
  const paymentExt = docRef.extension.find(
    (extention) =>
      extention.url === `${OPENCRVS_SPECIFICATION_URL}extension/payment`
  )
  if (!paymentExt) {
    const paymentEntry = createPaymentReconciliationTemplate(uuid())
    fhirBundle.entry.push(paymentEntry)
    docRef.extension.push({
      url: `${OPENCRVS_SPECIFICATION_URL}extension/payment`,
      valueReference: {
        reference: paymentEntry.fullUrl
      }
    })
    return paymentEntry.resource
  } else {
    const paymentEntry = fhirBundle.entry.find((entry) => {
      if (!paymentExt.valueReference) {
        return false
      }
      return entry.fullUrl === paymentExt.valueReference.reference
    })
    if (!paymentEntry) {
      throw new Error('No related payment entry found on bundle')
    }
    return paymentEntry.resource as fhir.PaymentReconciliation
  }
}

export function selectOrCreateQuestionnaireResource(
  sectionCode: string,
  fhirBundle: ITemplatedBundle,
  context: any
): fhir.QuestionnaireResponse {
  const questionnaire = fhirBundle.entry.find((entry) => {
    if (
      !entry ||
      !entry.resource ||
      entry.resource.resourceType !== 'QuestionnaireResponse'
    ) {
      return false
    } else {
      return true
    }
  })

  if (questionnaire) {
    return questionnaire.resource as fhir.QuestionnaireResponse
  }

  const encounter = selectOrCreateEncounterResource(fhirBundle, context)
  const section = findCompositionSectionInBundle(sectionCode, fhirBundle)

  const ref = uuid()
  const questionnaireResponseEntry = createQuestionnaireResponseTemplate(ref)
  if (!section || !section.entry || !section.entry[0]) {
    throw new Error('Expected encounter section to exist and have an entry')
  }
  const encounterSectionEntry = section.entry[0]
  const encounterEntry = fhirBundle.entry.find(
    (entry) => entry.fullUrl === encounterSectionEntry.reference
  )
  if (encounterEntry && encounter) {
    questionnaireResponseEntry.resource.subject = {
      reference: `${encounterEntry.fullUrl}`
    }
  }
  fhirBundle.entry.push(questionnaireResponseEntry)

  return questionnaireResponseEntry.resource
}

export function selectOrCreateTaskRefResource(
  fhirBundle: ITemplatedBundle,
  context: any
): fhir.Task {
  let taskEntry =
    fhirBundle.entry &&
    fhirBundle.entry.find((entry) => {
      if (entry.resource && entry.resource.resourceType === 'Task') {
        return true
      }
      return false
    })
  if (!taskEntry) {
    taskEntry = createTaskRefTemplate(uuid(), context.event)
    const taskResource = taskEntry.resource as fhir.Task
    if (!taskResource.focus) {
      taskResource.focus = { reference: '' }
    }
    taskResource.focus.reference = fhirBundle.entry[0].fullUrl
    fhirBundle.entry.push(taskEntry)
  }
  return taskEntry.resource as fhir.Task
}
export function setObjectPropInResourceArray(
  resource: fhir.Resource,
  label: string,
  value: string | string[] | Record<string, unknown>,
  propName: string,
  context: any,
  contextProperty?: string
) {
  if (!resource[label]) {
    resource[label] = []
  }

  if (contextProperty) {
    if (!resource[label][context._index[contextProperty]]) {
      resource[label][context._index[contextProperty]] = {}
    }
    resource[label][context._index[contextProperty]][propName] = value
  } else {
    if (!resource[label][context._index[label]]) {
      resource[label][context._index[label]] = {}
    }
    resource[label][context._index[label]][propName] = value
  }
}

export function setQuestionnaireItem(
  questionnaire: fhir.QuestionnaireResponse,
  context: any,
  label: string | null,
  value: string | null
) {
  if (!questionnaire.item) {
    questionnaire.item = []
  }

  if (label && !questionnaire.item[context._index.questionnaire]) {
    questionnaire.item[context._index.questionnaire] = {
      text: label,
      linkId: ''
    }
  }

  if (value && questionnaire.item[context._index.questionnaire]) {
    questionnaire.item[context._index.questionnaire].answer = [
      { valueString: value }
    ]
  }
}

export function setArrayPropInResourceObject(
  resource: fhir.Resource,
  label: string,
  value: Array<{}>,
  propName: string
) {
  if (!resource[label]) {
    resource[label] = {}
  }
  resource[label][propName] = value
}

export function findExtension(
  url: string,
  extensions: fhir.Extension[]
): fhir.Extension | undefined {
  const extension =
    extensions &&
    extensions.find((obj: fhir.Extension) => {
      return obj.url === url
    })
  return extension
}

export function getDownloadedExtensionStatus(task: fhir.Task) {
  const extension =
    task.extension && findExtension(DOWNLOADED_EXTENSION_URL, task.extension)
  return extension?.valueString
}
export async function setCertificateCollector(
  details: GQLBirthRegistrationInput | GQLDeathRegistrationInput,
  authHeader: IAuthHeader
) {
  const tokenPayload = getTokenPayload(authHeader.Authorization.split(' ')[1])
  const userId = tokenPayload.sub
  const userDetails = await getUser({ userId }, authHeader)
  const name = userDetails.name.map((nameItem) => ({
    use: nameItem.use,
    familyName: nameItem.family,
    firstNames: nameItem.given.join(' ')
  }))

  ;(details?.registration?.certificates || []).map((certificate: any) => {
    if (!certificate?.collector) {
      certificate.collector = {
        individual: { name },
        relationship: 'PRINT_IN_ADVANCE',
        otherRelationship: userDetails.role
      }
    }
    return certificate
  })

  return details
}
export async function getCertificatesFromTask(
  task: fhir.Task,
  _: any,
  authHeader: IAuthHeader
) {
  if (!task.focus) {
    throw new Error(
      'Task resource does not have a focus property necessary to lookup the composition'
    )
  }

  const compositionBundle = await fetchFHIR(
    `/${task.focus.reference}/_history`,
    authHeader
  )

  if (!compositionBundle || !compositionBundle.entry) {
    return null
  }

  return compositionBundle.entry.map(
    async (compositionEntry: fhir.BundleEntry) => {
      const certSection = findCompositionSection(
        CERTIFICATE_DOCS_CODE,
        compositionEntry.resource as ITemplatedComposition
      )
      if (
        !certSection ||
        !certSection.entry ||
        !(certSection.entry.length > 0)
      ) {
        return null
      }
      return await fetchFHIR(`/${certSection.entry[0].reference}`, authHeader)
    }
  )
}
export function getActionFromTask(task: fhir.Task) {
  const extensions = task.extension || []
  if (findExtension(DOWNLOADED_EXTENSION_URL, extensions)) {
    return GQLRegAction.DOWNLOADED
  } else if (findExtension(ASSIGNED_EXTENSION_URL, extensions)) {
    return GQLRegAction.ASSIGNED
  } else if (findExtension(UNASSIGNED_EXTENSION_URL, extensions)) {
    return GQLRegAction.UNASSIGNED
  } else if (findExtension(REQUEST_CORRECTION_EXTENSION_URL, extensions)) {
    return GQLRegAction.REQUESTED_CORRECTION
  } else if (findExtension(REINSTATED_EXTENSION_URL, extensions)) {
    return GQLRegAction.REINSTATED
  } else if (findExtension(VIEWED_EXTENSION_URL, extensions)) {
    return GQLRegAction.VIEWED
  }
  return null
}
export function getStatusFromTask(task: fhir.Task) {
  const statusType = task.businessStatus?.coding?.find(
    (coding: fhir.Coding) =>
      coding.system === `${OPENCRVS_SPECIFICATION_URL}reg-status`
  )
  return statusType && (statusType.code as GQLRegStatus)
}
export function getMaritalStatusCode(fieldValue: string) {
  switch (fieldValue) {
    case 'SINGLE':
      return 'S'
    case 'WIDOWED':
      return 'W'
    case 'DIVORCED':
      return 'D'
    case 'NOT_STATED':
      return 'UNK'
    case 'MARRIED':
      return 'M'
    case 'SEPARATED':
      return 'L'
    default:
      return 'UNK'
  }
}

export function removeDuplicatesFromComposition(
  composition: fhir.Composition,
  compositionId: string,
  duplicateId: string
) {
  const removeAllDuplicates = compositionId === duplicateId
  const updatedRelatesTo =
    composition.relatesTo &&
    composition.relatesTo.filter((relatesTo: fhir.CompositionRelatesTo) => {
      return (
        relatesTo.code !== 'duplicate' ||
        (!removeAllDuplicates &&
          relatesTo.targetReference &&
          relatesTo.targetReference.reference !== `Composition/${duplicateId}`)
      )
    })
  composition.relatesTo = updatedRelatesTo
  return composition
}

export const fetchFHIR = <T = any>(
  suffix: string,
  authHeader: IAuthHeader,
  method = 'GET',
  body: string | undefined = undefined
): Promise<T> => {
  return fetch(`${FHIR_URL}${suffix}`, {
    method,
    headers: {
      'Content-Type': 'application/fhir+json',
      ...authHeader
    },
    body
  })
    .then((response) => {
      return response.json()
    })
    .catch((error) => {
      return Promise.reject(new Error(`FHIR request failed: ${error.message}`))
    })
}

export const fetchFromHearth = <T = any>(
  suffix: string,
  method = 'GET',
  body: string | undefined = undefined
): Promise<T> => {
  return fetch(`${HEARTH_URL}${suffix}`, {
    method,
    headers: {
      'Content-Type': 'application/fhir+json'
    },
    body
  })
    .then((response) => {
      return response.json()
    })
    .catch((error) => {
      return Promise.reject(
        new Error(`FHIR with Hearth request failed: ${error.message}`)
      )
    })
}

export const sendToFhir = async (
  body: string,
  suffix: string,
  method: string,
  token: string
) => {
  return fetch(`${FHIR_URL}${suffix}`, {
    method,
    body,
    headers: {
      'Content-Type': 'application/fhir+json',
      Authorization: `${token}`
    }
  })
    .then((response) => {
      return response
    })
    .catch((error) => {
      return Promise.reject(
        new Error(`FHIR ${method} failed: ${error.message}`)
      )
    })
}

export async function postAssignmentSearch(
  authHeader: IAuthHeader,
  compositionId: string
) {
  return fetch(`${SEARCH_URL}search/assignment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader
    },
    body: JSON.stringify({ compositionId })
  })
    .then((response) => {
      return response.json()
    })
    .catch((error) => {
      return Promise.reject(
        new Error(`Search assignment failed: ${error.message}`)
      )
    })
}

export const postAdvancedSearch = (
  authHeader: IAuthHeader,
  criteria: ISearchCriteria
) => {
  return fetch(`${SEARCH_URL}advancedRecordSearch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader
    },
    body: JSON.stringify(criteria)
  })
    .then((response) => {
      return response.json()
    })
    .catch((error) => {
      return Promise.reject(
        new Error(`Search request failed: ${error.message}`)
      )
    })
}

type DuplicateSearchBody = {
  childFirstNames?: string
  childFamilyName?: string
  childDoB?: string
  motherFirstNames?: string
  motherFamilyName?: string
  motherDoB?: string
}
export const findDuplicates = (
  authHeader: IAuthHeader,
  criteria: DuplicateSearchBody
) => {
  return fetch(`${SEARCH_URL}search/duplicates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader
    },
    body: JSON.stringify(criteria)
  })
    .then((response) => {
      return response.json()
    })
    .catch((error) => {
      return Promise.reject(
        new Error(`Search request failed: ${error.message}`)
      )
    })
}

export const getMetrics = (
  prefix: string,
  params: IMetricsParam,
  authHeader: IAuthHeader
) => {
  const paramsWithUndefined = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  )
  return fetch(
    `${METRICS_URL}${prefix}?` +
      new URLSearchParams({ ...paramsWithUndefined }),
    {
      method: 'GET',
      headers: {
        ...authHeader
      }
    }
  )
    .then((response) => {
      return response.json()
    })
    .catch((error) => {
      return Promise.reject(
        new Error(`Metrics request failed: ${error.message}`)
      )
    })
}

export const postMetrics = (
  prefix: string,
  payload: IMetricsParam,
  authHeader: IAuthHeader
) => {
  return fetch(`${METRICS_URL}${prefix}`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      ...authHeader
    }
  })
    .then((response) => {
      return response.json()
    })
    .catch((error) => {
      return Promise.reject(
        new Error(`Metrics request failed: ${error.message}`)
      )
    })
}

export const getTimeLoggedFromMetrics = async (
  authHeader: IAuthHeader,
  compositionId: string,
  status?: string
): Promise<ITimeLoggedResponse | ITimeLoggedResponse[]> => {
  const params = new URLSearchParams({ compositionId })
  return fetch(`${METRICS_URL}/timeLogged?` + params, {
    method: 'GET',
    headers: {
      ...authHeader
    }
  })
    .then((response) => {
      return response.json()
    })
    .catch((error) => {
      return Promise.reject(
        new Error(`Time logged from metrics request failed: ${error.message}`)
      )
    })
}

export const getEventDurationsFromMetrics = async (
  authHeader: IAuthHeader,
  compositionId: string
): Promise<IEventDurationResponse | IEventDurationResponse[]> => {
  const params = new URLSearchParams({ compositionId })
  return fetch(`${METRICS_URL}/eventDuration?` + params, {
    method: 'GET',
    headers: {
      ...authHeader
    }
  })
    .then((response) => {
      return response.json()
    })
    .catch((error) => {
      return Promise.reject(
        new Error(
          `Event Durations from metrics request failed: ${error.message}`
        )
      )
    })
}

export async function getDeclarationIdsFromResponse(
  resBody: fhir.Bundle,
  authHeader: IAuthHeader,
  compId?: string
) {
  const compositionId = compId || getIDFromResponse(resBody)
  return getDeclarationIds(compositionId, authHeader)
}

export async function getDeclarationIds(
  compositionId: string,
  authHeader: IAuthHeader
) {
  const compositionBundle = await fetchFHIR(
    `/Composition/${compositionId}`,
    authHeader
  )
  if (!compositionBundle || !compositionBundle.identifier) {
    throw new Error(
      'getTrackingId: Invalid composition or composition has no identifier'
    )
  }
  return { trackingId: compositionBundle.identifier.value, compositionId }
}

export async function getRegistrationIdsFromResponse(
  resBody: fhir.Bundle,
  eventType: EVENT_TYPE,
  authHeader: IAuthHeader
) {
  const compositionId = getIDFromResponse(resBody)
  return getRegistrationIds(
    compositionId,
    eventType,
    isTaskResponse(resBody),
    authHeader
  )
}

export async function getRegistrationIds(
  compositionId: string,
  eventType: EVENT_TYPE,
  isTask: boolean,
  authHeader: IAuthHeader
) {
  let registrationNumber: string
  if (eventType === EVENT_TYPE.BIRTH) {
    registrationNumber = BIRTH_REG_NO
  } else if (eventType === EVENT_TYPE.DEATH) {
    registrationNumber = DEATH_REG_NO
  }
  let path
  if (isTask) {
    path = `/Task/${compositionId}`
  } else {
    path = `/Task?focus=Composition/${compositionId}`
  }
  const taskBundle = await fetchFHIR(path, authHeader)
  let taskResource
  if (taskBundle && taskBundle.entry && taskBundle.entry[0].resource) {
    taskResource = taskBundle.entry[0].resource
  } else if (taskBundle.resourceType === 'Task') {
    taskResource = taskBundle
  } else {
    throw new Error('getRegistrationIds: Invalid task found')
  }
  const regIdentifier =
    taskResource.identifier &&
    taskResource.identifier.find(
      (identifier: fhir.Identifier) =>
        identifier.system ===
        `${OPENCRVS_SPECIFICATION_URL}id/${registrationNumber}`
    )
  if (!regIdentifier || !regIdentifier.value) {
    throw new Error(
      'getRegistrationIds: Task does not have any registration identifier'
    )
  }
  return { registrationNumber: regIdentifier.value, compositionId }
}

export function getIDFromResponse(resBody: fhir.Bundle): string {
  if (
    !resBody ||
    !resBody.entry ||
    !resBody.entry[0] ||
    !resBody.entry[0].response ||
    !resBody.entry[0].response.location
  ) {
    throw new Error(`FHIR did not send a valid response`)
  }
  // return the Composition's id
  return resBody.entry[0].response.location.split('/')[3]
}

export function isTaskResponse(resBody: fhir.Bundle): boolean {
  if (
    !resBody ||
    !resBody.entry ||
    !resBody.entry[0] ||
    !resBody.entry[0].response ||
    !resBody.entry[0].response.location
  ) {
    throw new Error(`FHIR did not send a valid response`)
  }
  return resBody.entry[0].response.location.indexOf('Task') > -1
}

export async function setInformantReference(
  sectionCode: string,
  relatedPerson: fhir.RelatedPerson,
  fhirBundle: ITemplatedBundle,
  context: any
) {
  const section = findCompositionSectionInBundle(sectionCode, fhirBundle)
  if (section && section.entry) {
    const personSectionEntry = section.entry[0]
    const personEntry = fhirBundle.entry.find(
      (entry) => entry.fullUrl === personSectionEntry.reference
    )
    if (!personEntry) {
      logger.error('Expected person entry not found on the bundle')
      return
    }
    relatedPerson.patient = {
      reference: personEntry.fullUrl
    }
  } else {
    const composition = await fetchFHIR(
      `/Composition/${fhirBundle.entry[0].resource.id}`,
      context.authHeader
    )

    const sec = findCompositionSection(sectionCode, composition)
    if (sec && sec.entry) {
      relatedPerson.patient = {
        reference: sec.entry[0].reference
      }
    }
  }
}

export function hasRequestCorrectionExtension(task: fhir.Task) {
  const extension =
    task.extension &&
    findExtension(REQUEST_CORRECTION_EXTENSION_URL, task.extension)
  return extension
}
export const fetchDocuments = async <T = any>(
  suffix: string,
  authHeader: IAuthHeader,
  method = 'GET',
  body: string | undefined = undefined
): Promise<T> => {
  const result = await fetch(`${DOCUMENTS_URL}${suffix}`, {
    method,
    headers: {
      ...authHeader,
      'Content-Type': 'application/json'
    },
    body
  })
  const res = await result.json()
  return await res
}

export async function uploadBase64ToMinio(
  fileData: string,
  authHeader: IAuthHeader
): Promise<string> {
  const docUploadResponse = await fetchDocuments(
    '/upload',
    authHeader,
    'POST',
    JSON.stringify({ fileData: fileData })
  )

  return docUploadResponse.refUrl
}

export function isBase64FileString(str: string) {
  if (str === '' || str.trim() === '') {
    return false
  }
  const strSplit = str.split(':')
  return strSplit.length > 0 && strSplit[0] === 'data'
}
