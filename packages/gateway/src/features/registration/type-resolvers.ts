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
import {
  findCompositionSection,
  findExtension,
  fetchFHIR,
  getTimeLoggedFromMetrics,
  getStatusFromTask,
  ITimeLoggedResponse,
  getCertificatesFromTask,
  getActionFromTask
} from '@gateway/features/fhir/utils'
import {
  MOTHER_CODE,
  FATHER_CODE,
  CHILD_CODE,
  ATTACHMENT_DOCS_CODE,
  BIRTH_ENCOUNTER_CODE,
  BODY_WEIGHT_CODE,
  BIRTH_TYPE_CODE,
  BIRTH_ATTENDANT_CODE,
  BIRTH_REG_TYPE_CODE,
  LAST_LIVE_BIRTH_CODE,
  NUMBER_BORN_ALIVE_CODE,
  NUMBER_FOEATAL_DEATH_CODE,
  DECEASED_CODE,
  INFORMANT_CODE,
  DEATH_ENCOUNTER_CODE,
  MANNER_OF_DEATH_CODE,
  CAUSE_OF_DEATH_CODE,
  CAUSE_OF_DEATH_METHOD_CODE,
  SPOUSE_CODE,
  MALE_DEPENDENTS_ON_DECEASED_CODE,
  FEMALE_DEPENDENTS_ON_DECEASED_CODE,
  DEATH_DESCRIPTION_CODE,
  CAUSE_OF_DEATH_ESTABLISHED_CODE
} from '@gateway/features/fhir/templates'
import {
  GQLQuestionnaireQuestion,
  GQLRegStatus,
  GQLResolver
} from '@gateway/graphql/schema'
import {
  ORIGINAL_FILE_NAME_SYSTEM,
  SYSTEM_FILE_NAME_SYSTEM,
  FHIR_SPECIFICATION_URL,
  OPENCRVS_SPECIFICATION_URL,
  REQUESTING_INDIVIDUAL,
  HAS_SHOWED_VERIFIED_DOCUMENT
} from '@gateway/features/fhir/constants'
import { ITemplatedComposition } from '@gateway/features/registration/fhir-builders'
import fetch from 'node-fetch'
import { USER_MANAGEMENT_URL } from '@gateway/constants'
import * as validateUUID from 'uuid-validate'
import {
  getSignatureExtension,
  IUserModelData
} from '@gateway/features/user/type-resolvers'
import { getSystem, getUser } from '@gateway/features/user/utils'

export const typeResolvers: GQLResolver = {
  EventRegistration: {
    __resolveType(obj) {
      if (obj.type.coding[0].code === 'birth-declaration') {
        return 'BirthRegistration'
      } else {
        return 'DeathRegistration'
      }
    }
  },
  HumanName: {
    firstNames(name) {
      return (name.given && name.given.join(' ')) || ''
    },
    familyName(name) {
      if (!name.family) {
        return null
      }
      return Array.isArray(name.family) ? name.family.join(' ') : name.family
    }
  },
  IdentityType: {
    id: (identifier) => {
      return identifier.value
    },
    type: (identifier) => {
      return identifier.type
    },
    otherType: (identifier) => {
      return identifier.otherType
    }
  },
  Address: {
    stateName: async (address, _, authHeader) => {
      const location = await fetchFHIR(`/Location/${address.state}`, authHeader)
      return location.name
    },
    districtName: async (address, _, authHeader) => {
      const location = await fetchFHIR(
        `/Location/${address.district}`,
        authHeader
      )
      return location.name
    },
    lineName: (address, _, authHeader) => {
      return Promise.all(
        address.line.map(async (line: string) => {
          if (!validateUUID(line)) {
            return line
          }
          const location = await fetchFHIR(`/Location/${line}`, authHeader)
          return location.name
        })
      )
    }
  },
  Person: {
    /* `gender` and `name` resolvers are trivial resolvers, so they don't need implementation */
    dateOfMarriage: (person) => {
      const marriageExtension = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/date-of-marriage`,
        person.extension
      )
      return (marriageExtension && marriageExtension.valueDateTime) || null
    },
    age: (person) => {
      const marriageExtension = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/age`,
        person.extension
      )
      return (marriageExtension && marriageExtension.valueString) || null
    },
    maritalStatus: (person) => {
      return person && person.maritalStatus && person.maritalStatus.text
    },
    occupation: (person) => {
      const occupationExtension = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/patient-occupation`,
        person.extension
      )
      return (occupationExtension && occupationExtension.valueString) || null
    },
    reasonNotApplying: (person) => {
      const reasonNotApplyingExtension = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/reason-not-applying`,
        person.extension
      )
      return (
        (reasonNotApplyingExtension &&
          reasonNotApplyingExtension.valueString) ||
        null
      )
    },
    ageOfIndividualInYears: (person) => {
      const ageOfIndividualInYearsExtension = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/age-of-individual-in-years`,
        person.extension
      )
      return (
        (ageOfIndividualInYearsExtension &&
          ageOfIndividualInYearsExtension.valueString) ||
        null
      )
    },
    exactDateOfBirthUnknown: (person) => {
      const exactDateOfBirthUnknownExtension = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/age-of-individual-in-years`,
        person.extension
      )
      return (
        (exactDateOfBirthUnknownExtension &&
          exactDateOfBirthUnknownExtension.valueString) ||
        null
      )
    },
    detailsExist: (person) => {
      return person.active
    },
    multipleBirth: (person) => {
      return person.multipleBirthInteger
    },
    deceased: (person) => {
      return person
    },
    nationality: (person) => {
      const nationalityExtension = findExtension(
        `${FHIR_SPECIFICATION_URL}patient-nationality`,
        person.extension
      )
      if (!nationalityExtension || !nationalityExtension.extension) {
        return null
      }
      const countryCodeExtension = findExtension(
        'code',
        nationalityExtension.extension
      )

      const coding =
        (countryCodeExtension &&
          countryCodeExtension.valueCodeableConcept &&
          countryCodeExtension.valueCodeableConcept.coding &&
          countryCodeExtension.valueCodeableConcept.coding) ||
        []

      // Nationality could be multiple
      const nationality = coding.map((n) => {
        return n.code
      })

      return nationality
    },
    educationalAttainment: (person) => {
      const educationalAttainmentExtension = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/educational-attainment`,
        person.extension
      )
      return (
        (educationalAttainmentExtension &&
          educationalAttainmentExtension.valueString) ||
        null
      )
    }
  },
  RelatedPerson: {
    id: (relatedPerson) => {
      return relatedPerson && relatedPerson.id
    },
    relationship: (relatedPerson) => {
      return (
        relatedPerson &&
        relatedPerson.relationship &&
        relatedPerson.relationship.coding &&
        relatedPerson.relationship.coding[0].code
      )
    },
    otherRelationship: (relatedPerson) => {
      return (
        relatedPerson &&
        relatedPerson.relationship &&
        relatedPerson.relationship.coding &&
        relatedPerson.relationship.coding[0].display
      )
    },
    individual: async (relatedPerson, _, authHeader) => {
      if (
        !relatedPerson ||
        !relatedPerson.patient ||
        !relatedPerson.patient.reference
      ) {
        return
      }
      if (relatedPerson.patient.reference.startsWith('RelatedPerson')) {
        relatedPerson = await fetchFHIR(
          `/${relatedPerson.patient.reference}`,
          authHeader
        )
      }
      return await fetchFHIR(`/${relatedPerson.patient.reference}`, authHeader)
    }
  },
  Deceased: {
    deceased: (person) => {
      return person && person.deceasedBoolean
    },
    deathDate: (person) => {
      return person && person.deceasedDateTime
    }
  },
  Registration: {
    async trackingId(task: fhir.Task) {
      let trackingId =
        task &&
        task.code &&
        task.code.coding &&
        task.code.coding[0] &&
        task.code.coding[0].code
      if (trackingId === 'BIRTH') {
        trackingId = 'birth-tracking-id'
      } else {
        trackingId = 'death-tracking-id'
      }
      const foundIdentifier =
        task.identifier &&
        task.identifier.find(
          (identifier: fhir.Identifier) =>
            identifier.system ===
            `${OPENCRVS_SPECIFICATION_URL}id/${trackingId}`
        )

      return (foundIdentifier && foundIdentifier.value) || null
    },
    async registrationNumber(task: fhir.Task) {
      let regNoType =
        task &&
        task.code &&
        task.code.coding &&
        task.code.coding[0] &&
        task.code.coding[0].code
      if (regNoType === 'BIRTH') {
        regNoType = 'birth-registration-number'
      } else {
        regNoType = 'death-registration-number'
      }
      const foundIdentifier =
        task.identifier &&
        task.identifier.find(
          (identifier: fhir.Identifier) =>
            identifier.system === `${OPENCRVS_SPECIFICATION_URL}id/${regNoType}`
        )

      return (foundIdentifier && foundIdentifier.value) || null
    },
    async mosipAid(task: fhir.Task) {
      let mosipAidType =
        task &&
        task.code &&
        task.code.coding &&
        task.code.coding[0] &&
        task.code.coding[0].code
      if (mosipAidType === 'BIRTH') {
        mosipAidType = 'mosip-aid'
      } else {
        return null
      }
      const foundIdentifier =
        task.identifier &&
        task.identifier.find(
          (identifier: fhir.Identifier) =>
            identifier.system ===
            `${OPENCRVS_SPECIFICATION_URL}id/${mosipAidType}`
        )

      return (foundIdentifier && foundIdentifier.value) || null
    },
    async attachments(task: fhir.Task, _, authHeader) {
      if (!task.focus) {
        throw new Error(
          'Task resource does not have a focus property necessary to lookup the composition'
        )
      }

      const composition = await fetchFHIR(
        `/${task.focus.reference}`,
        authHeader
      )
      const docSection = findCompositionSection(
        ATTACHMENT_DOCS_CODE,
        composition
      )
      if (!docSection || !docSection.entry) {
        return null
      }
      const docRefReferences = docSection.entry.map(
        (docRefEntry: fhir.Reference) => docRefEntry.reference
      )
      return docRefReferences.map(async (docRefReference: string) => {
        return await fetchFHIR(`/${docRefReference}`, authHeader)
      })
    },
    async informantType(task: fhir.Task, _, authHeader) {
      if (!task.focus) {
        return null
      }
      const composition = await fetchFHIR(
        `/${task.focus.reference}`,
        authHeader
      )
      const patientSection = findCompositionSection(INFORMANT_CODE, composition)
      if (!patientSection || !patientSection.entry) {
        return null
      }
      const relatedPerson: fhir.RelatedPerson = await fetchFHIR(
        `/${patientSection.entry[0].reference}`,
        authHeader
      )
      if (
        relatedPerson &&
        relatedPerson.relationship &&
        relatedPerson.relationship.coding &&
        relatedPerson.relationship.coding[0]
      ) {
        return relatedPerson.relationship?.coding[0].code
      } else {
        return null
      }
    },
    async otherInformantType(task: fhir.Task, _, authHeader) {
      if (!task.focus) {
        return null
      }
      const composition = await fetchFHIR(
        `/${task.focus.reference}`,
        authHeader
      )
      const patientSection = findCompositionSection(INFORMANT_CODE, composition)
      if (!patientSection || !patientSection.entry) {
        return null
      }
      const relatedPerson: fhir.RelatedPerson = await fetchFHIR(
        `/${patientSection.entry[0].reference}`,
        authHeader
      )
      if (
        relatedPerson &&
        relatedPerson.relationship &&
        relatedPerson.relationship.coding &&
        relatedPerson.relationship.coding[0]
      ) {
        return relatedPerson.relationship?.text
      } else {
        return null
      }
    },
    contact: (task) => {
      const contact = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/contact-person`,
        task.extension
      )
      return (contact && contact.valueString) || null
    },

    informantsSignature: (task) => {
      const contact = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/informants-signature`,
        task.extension
      )
      return (contact && contact.valueString) || null
    },

    contactRelationship: (task) => {
      const contact = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/contact-relationship`,
        task.extension
      )
      return (contact && contact.valueString) || null
    },
    contactPhoneNumber: (task) => {
      const contactNumber = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/contact-person-phone-number`,
        task.extension
      )
      return (contactNumber && contactNumber.valueString) || null
    },
    paperFormID: (task) => {
      const foundIdentifier =
        task.identifier &&
        task.identifier.find(
          (identifier: fhir.Identifier) =>
            identifier.system ===
            `${OPENCRVS_SPECIFICATION_URL}id/paper-form-id`
        )

      return (foundIdentifier && foundIdentifier.value) || null
    },
    page: (task) => {
      const foundIdentifier =
        task.identifier &&
        task.identifier.find(
          (identifier: fhir.Identifier) =>
            identifier.system ===
            `${OPENCRVS_SPECIFICATION_URL}id/paper-form-page`
        )

      return (foundIdentifier && foundIdentifier.value) || null
    },
    book: (task) => {
      const foundIdentifier =
        task.identifier &&
        task.identifier.find(
          (identifier: fhir.Identifier) =>
            identifier.system ===
            `${OPENCRVS_SPECIFICATION_URL}id/paper-form-book`
        )

      return (foundIdentifier && foundIdentifier.value) || null
    },
    status: async (task: fhir.Task, _, authHeader) => {
      // fetch full task history
      const taskBundle: fhir.Bundle = await fetchFHIR(
        `/Task/${task.id}/_history`,
        authHeader
      )
      return (
        taskBundle.entry &&
        taskBundle.entry.map((taskEntry: fhir.BundleEntry, i) => {
          const historicalTask = taskEntry.resource
          // all these tasks will have the same id, make it more specific to keep apollo-client's cache happy
          if (historicalTask && historicalTask.meta) {
            historicalTask.id = `${historicalTask.id}/_history/${historicalTask.meta.versionId}`
          }
          return historicalTask
        })
      )
    },
    type: (task) => {
      const taskType = task.code
      const taskCode = taskType.coding.find(
        (coding: fhir.Coding) =>
          coding.system === `${OPENCRVS_SPECIFICATION_URL}types`
      )
      return (taskCode && taskCode.code) || null
    },
    duplicates: async (task, _, authHeader) => {
      if (!task.focus) {
        throw new Error(
          'Task resource does not have a focus property necessary to lookup the composition'
        )
      }

      const composition = await fetchFHIR(
        `/${task.focus.reference}`,
        authHeader
      )
      return (
        composition.relatesTo &&
        composition.relatesTo.map((duplicate: fhir.CompositionRelatesTo) => {
          if (
            duplicate.code &&
            duplicate.code === 'duplicate' &&
            duplicate.targetReference &&
            duplicate.targetReference.reference
          ) {
            return duplicate.targetReference.reference.split('/')[1]
          }
          return null
        })
      )
    },
    certificates: async (task, _, authHeader) =>
      await getCertificatesFromTask(task, _, authHeader),
    assignment: async (task, _, authHeader) => {
      const assignmentExtension = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/regAssigned`,
        task.extension
      )
      const regLastOfficeExtension = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/regLastOffice`,
        task.extension
      )

      if (assignmentExtension) {
        const regLastUserExtension = findExtension(
          `${OPENCRVS_SPECIFICATION_URL}extension/regLastUser`,
          task.extension
        )

        const practitionerId =
          regLastUserExtension?.valueReference?.reference?.split('/')?.[1]

        if (practitionerId) {
          const user = await getUser({ practitionerId }, authHeader)
          if (user) {
            return {
              userId: user._id,
              firstName: user.name[0].given.join(' '),
              lastName: user.name[0].family,
              officeName: regLastOfficeExtension?.valueString || ''
            }
          }
        }
      }
      return null
    }
  },
  RegWorkflow: {
    type: (task: fhir.Task) => {
      return getStatusFromTask(task)
    },
    user: async (task, _, authHeader) => {
      const user = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/regLastUser`,
        task.extension
      )
      if (!user || !user.valueReference || !user.valueReference.reference) {
        return null
      }
      const res = await fetch(`${USER_MANAGEMENT_URL}getUser`, {
        method: 'POST',
        body: JSON.stringify({
          practitionerId: user.valueReference.reference.split('/')[1]
        }),
        headers: {
          'Content-Type': 'application/json',
          ...authHeader
        }
      })
      return await res.json()
    },
    reason: (task: fhir.Task) => (task.reason && task.reason.text) || null,
    timestamp: (task) => task.lastModified,
    comments: (task) => task.note,
    location: async (task, _, authHeader) => {
      const taskLocation = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/regLastLocation`,
        task.extension
      )
      if (!taskLocation || !taskLocation.valueReference) {
        return null
      }
      return await fetchFHIR(
        `/${taskLocation.valueReference.reference}`,
        authHeader
      )
    },
    office: async (task, _, authHeader) => {
      const taskLocation = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/regLastOffice`,
        task.extension
      )
      if (!taskLocation || !taskLocation.valueReference) {
        return null
      }
      return await fetchFHIR(
        `/${taskLocation.valueReference.reference}`,
        authHeader
      )
    },
    timeLogged: async (task, _, authHeader) => {
      const compositionId =
        (task.focus.reference && task.focus.reference.split('/')[1]) || ''
      const timeLoggedResponse = (await getTimeLoggedFromMetrics(
        authHeader,
        compositionId,
        getStatusFromTask(task) || ''
      )) as ITimeLoggedResponse
      return (timeLoggedResponse && timeLoggedResponse.timeSpentEditing) || 0
    }
  },
  Comment: {
    user: async (comment, _, authHeader) => {
      if (!comment.authorString) {
        return null
      }
      const res = await fetch(`${USER_MANAGEMENT_URL}getUser`, {
        method: 'POST',
        body: JSON.stringify({
          practitionerId: comment.authorString.split('/')[1]
        }),
        headers: {
          'Content-Type': 'application/json',
          ...authHeader
        }
      })
      return await res.json()
    },
    comment: (comment) => comment.text,
    createdAt: (comment) => comment.time
  },
  Attachment: {
    id(docRef: fhir.DocumentReference) {
      return (docRef.masterIdentifier && docRef.masterIdentifier.value) || null
    },
    data(docRef: fhir.DocumentReference) {
      return docRef.content[0].attachment.data
    },
    contentType(docRef: fhir.DocumentReference) {
      return docRef.content[0].attachment.contentType
    },
    originalFileName(docRef: fhir.DocumentReference) {
      const foundIdentifier =
        docRef.identifier &&
        docRef.identifier.find(
          (identifier: fhir.Identifier) =>
            identifier.system === ORIGINAL_FILE_NAME_SYSTEM
        )
      return (foundIdentifier && foundIdentifier.value) || null
    },
    systemFileName(docRef: fhir.DocumentReference) {
      const foundIdentifier =
        docRef.identifier &&
        docRef.identifier.find(
          (identifier: fhir.Identifier) =>
            identifier.system === SYSTEM_FILE_NAME_SYSTEM
        )
      return (foundIdentifier && foundIdentifier.value) || null
    },
    type(docRef: fhir.DocumentReference) {
      return (
        (docRef.type && docRef.type.coding && docRef.type.coding[0].code) ||
        null
      )
    },
    subject(docRef: fhir.DocumentReference) {
      return (docRef.subject && docRef.subject.display) || null
    },
    createdAt(docRef: fhir.DocumentReference) {
      return docRef.created
    }
  },
  Certificate: {
    async collector(docRef: fhir.DocumentReference, _, authHeader) {
      const relatedPersonRef =
        docRef.extension &&
        docRef.extension.find(
          (extension: fhir.Extension) =>
            extension.url === `${OPENCRVS_SPECIFICATION_URL}extension/collector`
        )
      if (!relatedPersonRef) {
        return null
      }
      return (await fetchFHIR(
        `/${
          relatedPersonRef.valueReference &&
          relatedPersonRef.valueReference.reference
        }`,
        authHeader
      )) as fhir.RelatedPerson
    },
    async hasShowedVerifiedDocument(
      docRef: fhir.DocumentReference,
      _,
      authHeader
    ) {
      const hasShowedDocument = findExtension(
        HAS_SHOWED_VERIFIED_DOCUMENT,
        docRef.extension as fhir.Extension[]
      )

      return Boolean(hasShowedDocument?.valueString)
    }
  },
  Identifier: {
    system: (identifier) => identifier.system,
    value: (identifier) => identifier.value
  },

  Location: {
    name: (location) => location.name,
    status: (location) => location.status,
    identifier: (location) => location.identifier,
    longitude: (location) => location.position.longitude,
    latitude: (location) => location.position.latitude,
    alias: (location) => location.alias,
    description: (location) => location.description,
    partOf: (location) => location.partOf,
    type: (location: fhir.Location) => {
      return (
        (location.type &&
          location.type.coding &&
          location.type.coding[0].code) ||
        null
      )
    },
    address: (location) => location.address
  },
  MedicalPractitioner: {
    name: async (encounterParticipant, _, authHeader) => {
      if (
        !encounterParticipant ||
        !encounterParticipant.individual ||
        !encounterParticipant.individual.reference
      ) {
        return null
      }
      const practitioner = await fetchFHIR(
        `/${encounterParticipant.individual.reference}`,
        authHeader
      )
      return (
        (practitioner &&
          practitioner.name &&
          practitioner.name[0] &&
          practitioner.name[0].family) ||
        null
      )
    },
    qualification: async (encounterParticipant, _, authHeader) => {
      if (
        !encounterParticipant ||
        !encounterParticipant.individual ||
        !encounterParticipant.individual.reference
      ) {
        return null
      }
      const practitioner = await fetchFHIR(
        `/${encounterParticipant.individual.reference}`,
        authHeader
      )
      return (
        (practitioner &&
          practitioner.qualification &&
          practitioner.qualification[0] &&
          practitioner.qualification[0].code &&
          practitioner.qualification[0].code.coding &&
          practitioner.qualification[0].code.coding[0] &&
          practitioner.qualification[0].code.coding[0].code) ||
        null
      )
    },
    lastVisitDate: async (encounterParticipant, _, authHeader) => {
      return (
        (encounterParticipant &&
          encounterParticipant.period &&
          encounterParticipant.period.start) ||
        null
      )
    }
  },

  History: {
    hasShowedVerifiedDocument: (task: fhir.Task) => {
      const hasShowedDocument = findExtension(
        HAS_SHOWED_VERIFIED_DOCUMENT,
        task.extension as fhir.Extension[]
      )

      return Boolean(hasShowedDocument?.valueString)
    },
    requester: (task: fhir.Task) => {
      const requestedBy = findExtension(
        REQUESTING_INDIVIDUAL,
        task.extension as fhir.Extension[]
      )

      return requestedBy?.valueString || ''
    },
    regStatus: (task: fhir.Task) => getStatusFromTask(task),
    action: (task) => getActionFromTask(task),
    statusReason: (task: fhir.Task) => task.statusReason || null,
    reason: (task: fhir.Task) => task.reason?.text || null,
    otherReason: (task: fhir.Task) => {
      return task.reason?.extension ? task.reason?.extension[0].valueString : ''
    },
    date: (task: fhir.Task) => task.meta?.lastUpdated,
    dhis2Notification: (task: fhir.Task) =>
      task.identifier?.some(
        ({ system }) =>
          system === `${OPENCRVS_SPECIFICATION_URL}id/dhis2_event_identifier`
      ),
    user: async (task: fhir.Task, _: any, authHeader: any) => {
      const user = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/regLastUser`,
        task.extension as fhir.Extension[]
      )
      if (!user || !user.valueReference || !user.valueReference.reference) {
        return null
      }
      const practitionerId = user.valueReference.reference.split('/')[1]
      const practitionerRoleBundle = await fetchFHIR(
        `/PractitionerRole?practitioner=${practitionerId}`,
        authHeader
      )
      const practitionerRoleId = practitionerRoleBundle.entry?.[0].resource?.id
      const practitionerRoleHistoryBundle: fhir.Bundle & {
        entry: fhir.PractitionerRole[]
      } = await fetchFHIR(
        `/PractitionerRole/${practitionerRoleId}/_history`,
        authHeader
      )
      const result = practitionerRoleHistoryBundle.entry.find(
        (it: fhir.BundleEntry) =>
          it.resource?.meta?.lastUpdated &&
          task.lastModified &&
          it.resource?.meta?.lastUpdated <= task.lastModified!
      )?.resource as fhir.PractitionerRole | undefined

      const role = result?.code?.[0]?.coding?.[0]?.code
      const res = await fetch(`${USER_MANAGEMENT_URL}getUser`, {
        method: 'POST',
        body: JSON.stringify({
          practitionerId: user.valueReference.reference.split('/')[1]
        }),
        headers: {
          'Content-Type': 'application/json',
          ...authHeader
        }
      })
      const userResponse: IUserModelData = await res.json()
      return {
        ...userResponse,
        role: role ?? userResponse.role
      }
    },
    system: async (task: fhir.Task, _: any, authHeader) => {
      const systemIdentifier = task.identifier?.find(
        ({ system }) =>
          system === `${OPENCRVS_SPECIFICATION_URL}id/system_identifier`
      )
      if (!systemIdentifier || !systemIdentifier.value) {
        return null
      }
      return await getSystem({ systemId: systemIdentifier.value }, authHeader)
    },
    location: async (task: fhir.Task, _: any, authHeader: any) => {
      const taskLocation = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/regLastLocation`,
        task.extension as fhir.Extension[]
      )
      if (!taskLocation || !taskLocation.valueReference) {
        return null
      }
      return await fetchFHIR(
        `/${taskLocation.valueReference.reference}`,
        authHeader
      )
    },
    office: async (task: fhir.Task, _: any, authHeader: any) => {
      const taskLocation = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/regLastOffice`,
        task.extension as fhir.Extension[]
      )
      if (!taskLocation || !taskLocation.valueReference) {
        return null
      }
      return await fetchFHIR(
        `/${taskLocation.valueReference.reference}`,
        authHeader
      )
    },
    comments: (task) => task.note || [],
    input: (task) => task.input || [],
    output: (task) => task.output || [],
    certificates: async (task, _, authHeader) => {
      if (
        getActionFromTask(task) ||
        getStatusFromTask(task) !== GQLRegStatus.CERTIFIED
      ) {
        return null
      }
      return await getCertificatesFromTask(task, _, authHeader)
    },
    signature: async (task: fhir.Task, _: any, authHeader: any) => {
      const action = getActionFromTask(task)
      if (action || getStatusFromTask(task) !== GQLRegStatus.REGISTERED) {
        return null
      }
      const user = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/regLastUser`,
        task.extension as fhir.Extension[]
      )
      if (!user || !user.valueReference || !user.valueReference.reference) {
        return null
      }

      const practitionerId = user.valueReference.reference.split('/')[1]
      const practitioner: fhir.Practitioner = await fetchFHIR(
        `/Practitioner/${practitionerId}`,
        authHeader
      )
      const signatureExtension = getSignatureExtension(practitioner.extension)
      const signature = signatureExtension && signatureExtension.valueSignature
      return (
        signature && {
          type: signature.contentType,
          data: signature.blob
        }
      )
    }
  },

  DeathRegistration: {
    async _fhirIDMap(composition: ITemplatedComposition, _, authHeader) {
      // Preparing Encounter
      const encounterSection = findCompositionSection(
        DEATH_ENCOUNTER_CODE,
        composition
      )

      const encounterReference =
        encounterSection &&
        encounterSection.entry &&
        encounterSection.entry[0].reference

      if (!encounterReference) {
        return {
          composition: composition.id
        }
      }

      const questionnaireResponse = await fetchFHIR(
        `/QuestionnaireResponse?subject=${encounterReference}`,
        authHeader
      )

      const observation = {}
      const observations = await fetchFHIR(
        `/Observation?encounter=${encounterReference}`,
        authHeader
      )

      const encounter = await fetchFHIR(`/${encounterReference}`, authHeader)

      if (observations) {
        const observationKeys = {
          maleDependentsOfDeceased: MALE_DEPENDENTS_ON_DECEASED_CODE,
          femaleDependentsOfDeceased: FEMALE_DEPENDENTS_ON_DECEASED_CODE,
          mannerOfDeath: MANNER_OF_DEATH_CODE,
          causeOfDeathMethod: CAUSE_OF_DEATH_METHOD_CODE,
          causeOfDeathEstablished: CAUSE_OF_DEATH_ESTABLISHED_CODE,
          deathDescription: DEATH_DESCRIPTION_CODE,
          causeOfDeath: CAUSE_OF_DEATH_CODE
        }
        observations.entry.map(
          (item: fhir.BundleEntry & { resource?: fhir.Observation }) => {
            if (item.resource?.code.coding?.[0]?.code) {
              const itemCode = item.resource.code.coding[0].code
              const observationKey = Object.keys(observationKeys).find(
                (key) => observationKeys[key] === itemCode
              )
              if (observationKey) {
                observation[observationKey] = item.resource.id
              }
            }
          }
        )
      }

      return {
        composition: composition.id,
        encounter: encounterReference.split('/')[1],
        eventLocation:
          encounter.location &&
          encounter.location[0].location.reference.split('/')[1],
        observation,
        questionnaireResponse: questionnaireResponse?.entry?.[0]?.resource?.id
      }
    },
    createdAt(composition: ITemplatedComposition) {
      return composition.date
    },
    async mother(composition: ITemplatedComposition, _, authHeader) {
      const patientSection = findCompositionSection(MOTHER_CODE, composition)
      if (!patientSection || !patientSection.entry) {
        return null
      }
      return await fetchFHIR(
        `/${patientSection.entry[0].reference}`,
        authHeader
      )
    },
    async father(composition: ITemplatedComposition, _, authHeader) {
      const patientSection = findCompositionSection(FATHER_CODE, composition)
      if (!patientSection || !patientSection.entry) {
        return null
      }
      return await fetchFHIR(
        `/${patientSection.entry[0].reference}`,
        authHeader
      )
    },
    async spouse(composition: ITemplatedComposition, _, authHeader) {
      const patientSection = findCompositionSection(SPOUSE_CODE, composition)
      if (!patientSection || !patientSection.entry) {
        return null
      }
      return await fetchFHIR(
        `/${patientSection.entry[0].reference}`,
        authHeader
      )
    },
    async deceased(composition: ITemplatedComposition, _, authHeader) {
      const patientSection = findCompositionSection(DECEASED_CODE, composition)
      if (!patientSection || !patientSection.entry) {
        return null
      }
      return await fetchFHIR(
        `/${patientSection.entry[0].reference}`,
        authHeader
      )
    },
    async informant(composition: ITemplatedComposition, _, authHeader) {
      const patientSection = findCompositionSection(INFORMANT_CODE, composition)
      if (!patientSection || !patientSection.entry) {
        return null
      }
      return (await fetchFHIR(
        `/${patientSection.entry[0].reference}`,
        authHeader
      )) as fhir.RelatedPerson
    },
    async registration(composition: ITemplatedComposition, _, authHeader) {
      const taskBundle = await fetchFHIR(
        `/Task?focus=Composition/${composition.id}`,
        authHeader
      )

      if (!taskBundle.entry[0] || !taskBundle.entry[0].resource) {
        return null
      }
      return taskBundle.entry[0].resource
    },

    async eventLocation(composition: ITemplatedComposition, _, authHeader) {
      const encounterSection = findCompositionSection(
        DEATH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const data = await fetchFHIR(
        `/${encounterSection.entry[0].reference}`,
        authHeader
      )

      if (!data || !data.location || !data.location[0].location) {
        return null
      }

      return await fetchFHIR(
        `/${data.location[0].location.reference}`,
        authHeader
      )
    },
    async deathDescription(composition: ITemplatedComposition, _, authHeader) {
      const encounterSection = findCompositionSection(
        DEATH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${encounterSection.entry[0].reference}&code=${DEATH_DESCRIPTION_CODE}`,
        authHeader
      )
      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueString) ||
        null
      )
    },
    async mannerOfDeath(composition: ITemplatedComposition, _, authHeader) {
      const encounterSection = findCompositionSection(
        DEATH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${encounterSection.entry[0].reference}&code=${MANNER_OF_DEATH_CODE}`,
        authHeader
      )
      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueCodeableConcept &&
          observations.entry[0].resource.valueCodeableConcept.coding &&
          observations.entry[0].resource.valueCodeableConcept.coding[0] &&
          observations.entry[0].resource.valueCodeableConcept.coding[0].code) ||
        null
      )
    },
    async causeOfDeathEstablished(
      composition: ITemplatedComposition,
      _,
      authHeader
    ) {
      const encounterSection = findCompositionSection(
        DEATH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${encounterSection.entry[0].reference}&code=${CAUSE_OF_DEATH_ESTABLISHED_CODE}`,
        authHeader
      )
      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueCodeableConcept &&
          observations.entry[0].resource.valueCodeableConcept.coding &&
          observations.entry[0].resource.valueCodeableConcept.coding[0] &&
          observations.entry[0].resource.valueCodeableConcept.coding[0].code) ||
        null
      )
    },
    async causeOfDeathMethod(
      composition: ITemplatedComposition,
      _,
      authHeader
    ) {
      const encounterSection = findCompositionSection(
        DEATH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${encounterSection.entry[0].reference}&code=${CAUSE_OF_DEATH_METHOD_CODE}`,
        authHeader
      )
      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueCodeableConcept &&
          observations.entry[0].resource.valueCodeableConcept.coding &&
          observations.entry[0].resource.valueCodeableConcept.coding[0] &&
          observations.entry[0].resource.valueCodeableConcept.coding[0].code) ||
        null
      )
    },
    async causeOfDeath(composition: ITemplatedComposition, _, authHeader) {
      const encounterSection = findCompositionSection(
        DEATH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${encounterSection.entry[0].reference}&code=${CAUSE_OF_DEATH_CODE}`,
        authHeader
      )

      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueCodeableConcept &&
          observations.entry[0].resource.valueCodeableConcept.coding &&
          observations.entry[0].resource.valueCodeableConcept.coding[0] &&
          observations.entry[0].resource.valueCodeableConcept.coding[0].code) ||
        null
      )
    },
    async maleDependentsOfDeceased(
      composition: ITemplatedComposition,
      _,
      authHeader
    ) {
      const encounterSection = findCompositionSection(
        DEATH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${encounterSection.entry[0].reference}&code=${MALE_DEPENDENTS_ON_DECEASED_CODE}`,
        authHeader
      )
      return observations &&
        observations.entry &&
        observations.entry[0] &&
        observations.entry[0].resource
        ? observations.entry[0].resource.valueString
        : null
    },
    async femaleDependentsOfDeceased(
      composition: ITemplatedComposition,
      _,
      authHeader
    ) {
      const encounterSection = findCompositionSection(
        DEATH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${encounterSection.entry[0].reference}&code=${FEMALE_DEPENDENTS_ON_DECEASED_CODE}`,
        authHeader
      )

      return observations &&
        observations.entry &&
        observations.entry[0] &&
        observations.entry[0].resource
        ? observations.entry[0].resource.valueString
        : null
    },
    async questionnaire(composition: ITemplatedComposition, _, authHeader) {
      const encounterSection = findCompositionSection(
        DEATH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const response = await fetchFHIR(
        `/QuestionnaireResponse?subject=${encounterSection.entry[0].reference}`,
        authHeader
      )
      let questionnaireResponse: fhir.QuestionnaireResponse | null = null

      if (
        response &&
        response.entry &&
        response.entry[0] &&
        response.entry[0].resource
      ) {
        questionnaireResponse = response.entry[0].resource
      }

      if (!questionnaireResponse) {
        return null
      }
      const questionnaire: GQLQuestionnaireQuestion[] = []

      if (questionnaireResponse.item && questionnaireResponse.item.length) {
        questionnaireResponse.item.forEach((item) => {
          if (item.answer && item.answer[0]) {
            questionnaire.push({
              fieldId: item.text,
              value: item.answer[0].valueString
            })
          }
        })
        return questionnaire
      } else {
        return null
      }
    },
    async medicalPractitioner(
      composition: ITemplatedComposition,
      _,
      authHeader
    ) {
      const encounterSection = findCompositionSection(
        DEATH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const encounter = await fetchFHIR(
        `/${encounterSection.entry[0].reference}`,
        authHeader
      )
      const encounterParticipant =
        encounter && encounter.participant && encounter.participant[0]
      if (!encounterParticipant) {
        return null
      }
      return encounterParticipant
    },
    async history(composition: ITemplatedComposition, _: any, authHeader: any) {
      const task = await fetchFHIR(
        `/Task/?focus=Composition/${composition.id}`,
        authHeader
      )

      const taskId = task.entry[0].resource.id

      const taskHistory = await fetchFHIR(
        `/Task/${taskId}/_history?_count=100`,
        authHeader
      )

      if (!taskHistory.entry[0] || !taskHistory.entry[0].resource) {
        return null
      }

      return taskHistory?.entry?.map(
        (item: {
          resource: { extension: any }
          extension: fhir.Extension[]
        }) => {
          return item.resource
        }
      )
    }
  },
  BirthRegistration: {
    async _fhirIDMap(composition: ITemplatedComposition, _, authHeader) {
      // Preparing Encounter
      const encounterSection = findCompositionSection(
        BIRTH_ENCOUNTER_CODE,
        composition
      )

      const encounterReference =
        encounterSection &&
        encounterSection.entry &&
        encounterSection.entry[0].reference

      if (!encounterReference) {
        return {
          composition: composition.id
        }
      }

      const questionnaireResponse = await fetchFHIR(
        `/QuestionnaireResponse?subject=${encounterReference}`,
        authHeader
      )

      const observation = {}
      const observations = await fetchFHIR(
        `/Observation?encounter=${encounterReference}`,
        authHeader
      )

      const encounter = await fetchFHIR(`/${encounterReference}`, authHeader)

      if (observations) {
        const observationKeys = {
          weightAtBirth: BODY_WEIGHT_CODE,
          birthType: BIRTH_TYPE_CODE,
          attendantAtBirth: BIRTH_ATTENDANT_CODE,
          birthRegistrationType: BIRTH_REG_TYPE_CODE,
          childrenBornAliveToMother: NUMBER_BORN_ALIVE_CODE,
          foetalDeathsToMother: NUMBER_FOEATAL_DEATH_CODE,
          lastPreviousLiveBirth: LAST_LIVE_BIRTH_CODE
        }
        observations.entry.map(
          (item: fhir.BundleEntry & { resource?: fhir.Observation }) => {
            if (item.resource?.code.coding?.[0]?.code) {
              const itemCode = item.resource.code.coding[0].code
              const observationKey = Object.keys(observationKeys).find(
                (key) => observationKeys[key] === itemCode
              )
              if (observationKey) {
                observation[observationKey] = item.resource.id
              }
            }
          }
        )
      }

      return {
        composition: composition.id,
        encounter: encounterReference.split('/')[1],
        eventLocation:
          encounter.location &&
          encounter.location[0].location.reference.split('/')[1],
        observation,
        questionnaireResponse: questionnaireResponse?.entry?.[0]?.resource?.id
      }
    },
    createdAt(composition: ITemplatedComposition) {
      return composition.date
    },
    async mother(composition: ITemplatedComposition, _, authHeader) {
      const patientSection = findCompositionSection(MOTHER_CODE, composition)
      if (!patientSection || !patientSection.entry) {
        return null
      }
      return await fetchFHIR(
        `/${patientSection.entry[0].reference}`,
        authHeader
      )
    },
    async father(composition: ITemplatedComposition, _, authHeader) {
      const patientSection = findCompositionSection(FATHER_CODE, composition)
      if (!patientSection || !patientSection.entry) {
        return null
      }
      return await fetchFHIR(
        `/${patientSection.entry[0].reference}`,
        authHeader
      )
    },
    async child(composition: ITemplatedComposition, _, authHeader) {
      const patientSection = findCompositionSection(CHILD_CODE, composition)
      if (!patientSection || !patientSection.entry) {
        return null
      }
      return await fetchFHIR(
        `/${patientSection.entry[0].reference}`,
        authHeader
      )
    },
    async informant(composition: ITemplatedComposition, _, authHeader) {
      const patientSection = findCompositionSection(INFORMANT_CODE, composition)
      if (!patientSection || !patientSection.entry) {
        return null
      }
      return (await fetchFHIR(
        `/${patientSection.entry[0].reference}`,
        authHeader
      )) as fhir.RelatedPerson
    },
    async registration(composition: ITemplatedComposition, _, authHeader) {
      const taskBundle = await fetchFHIR(
        `/Task?focus=Composition/${composition.id}`,
        authHeader
      )

      if (!taskBundle.entry[0] || !taskBundle.entry[0].resource) {
        return null
      }
      return taskBundle.entry[0].resource
    },
    async weightAtBirth(composition: ITemplatedComposition, _, authHeader) {
      const encounterSection = findCompositionSection(
        BIRTH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${encounterSection.entry[0].reference}&code=${BODY_WEIGHT_CODE}`,
        authHeader
      )
      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource &&
          observations.entry[0].resource.valueQuantity &&
          observations.entry[0].resource.valueQuantity.value) ||
        null
      )
    },

    async questionnaire(composition: ITemplatedComposition, _, authHeader) {
      const encounterSection = findCompositionSection(
        BIRTH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const response = await fetchFHIR(
        `/QuestionnaireResponse?subject=${encounterSection.entry[0].reference}`,
        authHeader
      )
      let questionnaireResponse: fhir.QuestionnaireResponse | null = null

      if (
        response &&
        response.entry &&
        response.entry[0] &&
        response.entry[0].resource
      ) {
        questionnaireResponse = response.entry[0].resource
      }

      if (!questionnaireResponse) {
        return null
      }
      const questionnaire: GQLQuestionnaireQuestion[] = []

      if (questionnaireResponse.item && questionnaireResponse.item.length) {
        questionnaireResponse.item.forEach((item) => {
          if (item.answer && item.answer[0]) {
            questionnaire.push({
              fieldId: item.text,
              value: item.answer[0].valueString
            })
          }
        })
        return questionnaire
      } else {
        return null
      }
    },
    async birthType(composition: ITemplatedComposition, _, authHeader) {
      const encounterSection = findCompositionSection(
        BIRTH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${encounterSection.entry[0].reference}&code=${BIRTH_TYPE_CODE}`,
        authHeader
      )
      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueQuantity.value) ||
        null
      )
    },
    async eventLocation(composition: ITemplatedComposition, _, authHeader) {
      const encounterSection = findCompositionSection(
        BIRTH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const data = await fetchFHIR(
        `/${encounterSection.entry[0].reference}`,
        authHeader
      )

      if (!data || !data.location || !data.location[0].location) {
        return null
      }

      return await fetchFHIR(
        `/${data.location[0].location.reference}`,
        authHeader
      )
    },
    async attendantAtBirth(composition: ITemplatedComposition, _, authHeader) {
      const encounterSection = findCompositionSection(
        BIRTH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${encounterSection.entry[0].reference}&code=${BIRTH_ATTENDANT_CODE}`,
        authHeader
      )
      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueString) ||
        null
      )
    },
    async birthRegistrationType(
      composition: ITemplatedComposition,
      _,
      authHeader
    ) {
      const encounterSection = findCompositionSection(
        BIRTH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${encounterSection.entry[0].reference}&code=${BIRTH_REG_TYPE_CODE}`,
        authHeader
      )
      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueString) ||
        null
      )
    },
    async childrenBornAliveToMother(
      composition: ITemplatedComposition,
      _,
      authHeader
    ) {
      const encounterSection = findCompositionSection(
        BIRTH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${encounterSection.entry[0].reference}&code=${NUMBER_BORN_ALIVE_CODE}`,
        authHeader
      )
      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueInteger) ||
        null
      )
    },
    async foetalDeathsToMother(
      composition: ITemplatedComposition,
      _,
      authHeader
    ) {
      const encounterSection = findCompositionSection(
        BIRTH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${encounterSection.entry[0].reference}&code=${NUMBER_FOEATAL_DEATH_CODE}`,
        authHeader
      )
      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueInteger) ||
        null
      )
    },
    async lastPreviousLiveBirth(
      composition: ITemplatedComposition,
      _,
      authHeader
    ) {
      const encounterSection = findCompositionSection(
        BIRTH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${encounterSection.entry[0].reference}&code=${LAST_LIVE_BIRTH_CODE}`,
        authHeader
      )
      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueDateTime) ||
        null
      )
    },
    async history(composition: ITemplatedComposition, _: any, authHeader: any) {
      const task = await fetchFHIR(
        `/Task/?focus=Composition/${composition.id}`,
        authHeader
      )

      const taskId = task.entry[0].resource.id

      const taskHistory = await fetchFHIR(
        `/Task/${taskId}/_history?_count=100`,
        authHeader
      )

      if (!taskHistory.entry[0] || !taskHistory.entry[0].resource) {
        return null
      }

      return taskHistory?.entry?.map(
        (item: {
          resource: { extension: any }
          extension: fhir.Extension[]
        }) => {
          return item.resource
        }
      )
    }
  }
}
