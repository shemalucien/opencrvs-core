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
import { IFormConfig } from '@client/forms'
import { readFileSync } from 'fs'
import { join } from 'path'
import { IFormDraft } from '@client/forms/configuration/formDrafts/utils'
import {
  CustomFieldType,
  DraftStatus,
  Event,
  System,
  SystemStatus,
  SystemType
} from '@client/utils/gateway'
import { ILocation } from '@client/offline/reducer'

export const validImageB64String =
  'iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAYAAABllJ3tAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAAXSURBVAiZY1RWVv7PgAcw4ZNkYGBgAABYyAFsic1CfAAAAABJRU5ErkJggg=='

const formDrafts: IFormDraft[] = [
  {
    event: Event.Birth,
    status: DraftStatus.Draft,
    version: 0,
    history: [],
    updatedAt: 1649395100098,
    createdAt: 1649395100098
  },
  {
    event: Event.Death,
    status: DraftStatus.Draft,
    version: 0,
    history: [],
    updatedAt: 1649395100098,
    createdAt: 1649395100098
  }
]

export const formConfig: IFormConfig = {
  formDrafts,
  questionConfig: [
    {
      fieldId: 'birth.child.child-view-group.vaccination',
      label: [
        {
          lang: 'en',
          descriptor: {
            defaultMessage: 'What vaccinations has the child received?',
            description: 'Label for form field: vaccination question',
            id: 'form.field.label.vaccination'
          }
        }
      ],
      placeholder: [
        {
          lang: 'en',
          descriptor: {
            defaultMessage: 'E.G. Polio, Diptheria',
            description: 'Placeholder for form field: vaccination question',
            id: 'form.field.label.vaccinationPlaceholder'
          }
        }
      ],
      description: [
        {
          lang: 'en',
          descriptor: {
            defaultMessage: 'Vaccine name',
            description: 'Input field for vaccination question',
            id: 'form.field.label.vaccinationDescription'
          }
        }
      ],
      tooltip: [
        {
          lang: 'en',
          descriptor: {
            defaultMessage: 'Enter the Vaccine name',
            description: 'Tooltip for form field: vaccination question',
            id: 'form.field.label.vaccinationTooltip'
          }
        }
      ],
      errorMessage: [
        {
          lang: 'en',
          descriptor: {
            defaultMessage: 'Please enter the valid vaccine name',
            description: 'Error Message for form field: vaccination question',
            id: 'form.field.label.vaccinationErrorMessage'
          }
        }
      ],
      maxLength: 32,
      fieldName: 'vaccination',
      fieldType: CustomFieldType.Text,
      precedingFieldId: 'birth.child.child-view-group.attendantAtBirth',
      required: false,
      enabled: '',
      custom: true
    },
    {
      fieldId: 'birth.child.child-view-group.birthType',
      enabled: '',
      identifiers: { sectionIndex: 1, groupIndex: 0, fieldIndex: 6 },
      precedingFieldId: 'birth.child.child-view-group.vaccination'
    }
  ]
}

export const systems: System[] = [
  {
    name: 'WebHook 1',
    status: SystemStatus.Active,
    type: SystemType.Webhook,
    _id: '63998b6efbd0f8bad7708033',
    shaSecret: 'c37d4f5d-4c12-4016-9c7e-d810d2f871df',
    clientId: '4a7ba5bc-46c7-469e-8d61-20dd4d86e79a',
    settings: {
      webhook: [
        {
          event: 'birth',
          permissions: ['informant-details', 'supporting-documents']
        },
        {
          event: 'death',
          permissions: ['deceased-details', 'death-encounter']
        }
      ]
    }
  },
  {
    name: 'National Id',
    status: SystemStatus.Active,
    type: SystemType.NationalId,
    _id: '613ddbbe4c0b86e9b9f114e8',
    shaSecret: '22ea09c2-f964-4562-bdac-8e9ca9b9a81a',
    clientId: '2f1047bb-af48-4f27-8ab8-993d7b960f92',
    settings: {
      openIdProviderClientId: '7b621732-6c1d-4808-81b2-fd67f05f3af3'
    }
  },
  {
    _id: '63a01ffe607915acacc2f553',
    clientId: '5923118f-c633-40c6-ba97-c3e3cbb412aa',
    name: 'Health Deactivation',
    shaSecret: '2569a6d4-1f38-4f53-8724-1bfcba8262f6',
    status: SystemStatus.Deactivated,
    type: SystemType.Health,
    settings: {},
    __typename: 'System'
  }
]

export const mockConditionals = {
  presentAtBirthRegistration: {
    action: 'hide',
    expression:
      '(!draftData || !draftData.registration || draftData.registration.presentAtBirthRegistration !== "OTHER" || draftData.registration.presentAtBirthRegistration === "BOTH_PARENTS" )'
  },
  isRegistrarRoleSelected: {
    action: 'hide',
    expression: 'values.systemRole!=="LOCAL_REGISTRAR"'
  },
  isOfficePreSelected: {
    action: 'hide',
    expression: 'values.skippedOfficeSelction && values.registrationOffice'
  },
  iDType: {
    action: 'hide',
    expression: "!values.iDType || (values.iDType !== 'OTHER')"
  },
  fathersDetailsExist: {
    action: 'hide',
    expression: '!values.fathersDetailsExist'
  },
  primaryAddressSameAsOtherPrimary: {
    action: 'hide',
    expression: 'values.primaryAddressSameAsOtherPrimary'
  },
  secondaryAddressSameAsOtherSecondary: {
    action: 'hide',
    expression: 'values.secondaryAddressSameAsOtherSecondary'
  },
  secondaryAddressSameAsPrimary: {
    action: 'hide',
    expression: 'values.secondaryAddressSameAsPrimary'
  },
  countryPrimary: {
    action: 'hide',
    expression: '!values.countryPrimary'
  },
  isDefaultCountryPrimary: {
    action: 'hide',
    expression: 'isDefaultCountry(values.countryPrimary)'
  },
  statePrimary: {
    action: 'hide',
    expression: '!values.statePrimary'
  },
  districtPrimary: {
    action: 'hide',
    expression: '!values.districtPrimary'
  },
  addressLine4Primary: {
    action: 'hide',
    expression: '!values.addressLine4Primary'
  },
  addressLine3Primary: {
    action: 'hide',
    expression: '!values.addressLine3Primary'
  },
  country: {
    action: 'hide',
    expression: '!values.country'
  },
  isDefaultCountry: {
    action: 'hide',
    expression: 'isDefaultCountry(values.country)'
  },
  state: {
    action: 'hide',
    expression: '!values.state'
  },
  district: {
    action: 'hide',
    expression: '!values.district'
  },
  addressLine4: {
    action: 'hide',
    expression: '!values.addressLine4'
  },
  addressLine3: {
    action: 'hide',
    expression: '!values.addressLine3'
  },
  uploadDocForWhom: {
    action: 'hide',
    expression: '!values.uploadDocForWhom'
  },
  motherCollectsCertificate: {
    action: 'hide',
    expression: 'values.personCollectingCertificate!="MOTHER"'
  },
  fatherCollectsCertificate: {
    action: 'hide',
    expression: 'values.personCollectingCertificate!="FATHER"'
  },
  informantCollectsCertificate: {
    action: 'hide',
    expression: 'values.personCollectingCertificate!="INFORMANT"'
  },
  otherPersonCollectsCertificate: {
    action: 'hide',
    expression: 'values.personCollectingCertificate!="OTHER"'
  },
  birthCertificateCollectorNotVerified: {
    action: 'hide',
    expression:
      '!(values.personCollectingCertificate=="MOTHER" && values.motherDetails===false) && !(values.personCollectingCertificate=="FATHER" && values.fatherDetails===false) && !(values.personCollectingCertificate =="OTHER" && values.otherPersonSignedAffidavit===false)'
  },
  deathCertificateCollectorNotVerified: {
    action: 'hide',
    expression:
      '!(values.personCollectingCertificate=="INFORMANT" && values.informantDetails===false) && !(values.personCollectingCertificate =="OTHER" && values.otherPersonSignedAffidavit===false)'
  },
  placeOfBirthHospital: {
    action: 'hide',
    expression:
      '(values.placeOfBirth!="HOSPITAL" && values.placeOfBirth!="OTHER_HEALTH_INSTITUTION")'
  },
  placeOfDeathTypeHeathInstitue: {
    action: 'hide',
    expression: 'values.placeOfDeath!="HEALTH_FACILITY"'
  },
  otherBirthEventLocation: {
    action: 'hide',
    expression:
      '(values.placeOfBirth!="OTHER" && values.placeOfBirth!="PRIVATE_HOME")'
  },
  isNotCityLocation: {
    action: 'hide',
    expression:
      '(offlineCountryConfig && offlineCountryConfig.locations && isCityLocation(offlineCountryConfig.locations,values.addressLine4))'
  },
  isCityLocation: {
    action: 'hide',
    expression:
      '!(offlineCountryConfig && offlineCountryConfig.locations && isCityLocation(offlineCountryConfig.locations,values.addressLine4))'
  },
  isNotCityLocationPrimary: {
    action: 'hide',
    expression:
      '(offlineCountryConfig && offlineCountryConfig.locations && isCityLocation(offlineCountryConfig.locations,values.addressLine4Primary))'
  },
  isCityLocationPrimary: {
    action: 'hide',
    expression:
      '!(offlineCountryConfig && offlineCountryConfig.locations && isCityLocation(offlineCountryConfig.locations,values.addressLine4Primary))'
  },
  iDAvailable: {
    action: 'hide',
    expression: '!values.iDType || values.iDType === "NO_ID"'
  },
  informantPrimaryAddressSameAsCurrent: {
    action: 'hide',
    expression: 'values.informantPrimaryAddressSameAsCurrent'
  },
  deathPlaceOther: {
    action: 'hide',
    expression: 'values.placeOfDeath !== "OTHER"'
  },
  deathPlaceAtPrivateHome: {
    action: 'hide',
    expression: 'values.placeOfDeath !== "PRIVATE_HOME"'
  },
  deathPlaceAtOtherLocation: {
    action: 'hide',
    expression: 'values.placeOfDeath !== "OTHER"'
  },
  causeOfDeathEstablished: {
    action: 'hide',
    expression: '!values.causeOfDeathEstablished'
  },
  isMarried: {
    action: 'hide',
    expression: '(!values.maritalStatus || values.maritalStatus !== "MARRIED")'
  },
  identifierIDSelected: {
    action: 'hide',
    expression:
      '(!values.iDType || (values.iDType !== "BIRTH_REGISTRATION_NUMBER" && values.iDType !== "NATIONAL_ID"))'
  },
  otherRelationship: {
    action: 'hide',
    expression: 'values.informantsRelationToDeceased !== "OTHER"'
  },
  fatherContactDetailsRequired: {
    action: 'hide',
    expression:
      '(draftData && draftData.registration && draftData.registration.whoseContactDetails === "FATHER")'
  },
  withInTargetDays: {
    action: 'hide',
    expression:
      '(draftData && draftData.child && draftData.child.childBirthDate && diffDoB(draftData.child.childBirthDate) === "withinTargetdays") || !draftData.child || !draftData.child.childBirthDate'
  },
  between46daysTo5yrs: {
    action: 'hide',
    expression:
      '(draftData && draftData.child && draftData.child.childBirthDate && diffDoB(draftData.child.childBirthDate) === "between46daysTo5yrs") || !draftData.child || !draftData.child.childBirthDate'
  },
  after5yrs: {
    action: 'hide',
    expression:
      '(draftData && draftData.child && draftData.child.childBirthDate && diffDoB(draftData.child.childBirthDate) === "after5yrs")  || !draftData.child || !draftData.child.childBirthDate'
  },
  deceasedNationIdSelected: {
    action: 'hide',
    expression:
      '(values.uploadDocForDeceased && !!values.uploadDocForDeceased.find(a => ["National ID (front)", "National ID (Back)"].indexOf(a.optionValues[1]) > -1))'
  },
  certCollectorOther: {
    action: 'hide',
    expression: 'values.type !== "OTHER"'
  },
  userAuditReasonSpecified: {
    action: 'hide',
    expression: 'values.reason === "OTHER"'
  },
  userAuditReasonOther: {
    action: 'hide',
    expression: 'values.reason !== "OTHER"'
  },
  isAuditActionDeactivate: {
    action: 'hide',
    expression: 'draftData.formValues.action !== "DEACTIVATE"'
  },
  isAuditActionReactivate: {
    action: 'hide',
    expression: 'draftData.formValues.action !== "REACTIVATE"'
  }
}

export const mockOfflineData = {
  forms: JSON.parse(readFileSync(join(__dirname, './default.json')).toString()),
  facilities: {
    '627fc0cc-e0e2-4c09-804d-38a9fa1807ee': {
      id: '627fc0cc-e0e2-4c09-804d-38a9fa1807ee',
      name: 'Shaheed Taj Uddin Ahmad Medical College',
      alias: 'শহীদ তাজউদ্দিন আহমেদ মেডিকেল কলেজ হাসপাতাল',
      physicalType: 'Building',
      status: 'active',
      type: 'HEALTH_FACILITY',
      partOf: 'Location/3a5358d0-1bcd-4ea9-b0b7-7cfb7cbcbf0f'
    },
    'ae5b4462-d1b2-4b22-b289-a66f912dce73': {
      id: 'ae5b4462-d1b2-4b22-b289-a66f912dce73',
      name: 'Kaliganj Union Sub Center',
      alias: 'কালীগঞ্জ ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
      physicalType: 'Building',
      status: 'active',
      type: 'HEALTH_FACILITY',
      partOf: 'Location/50c5a9c4-3cc1-4c8c-9a1b-a37ddaf85987'
    },
    '6abbb7b8-d02e-41cf-8a3e-5039776c1eb0': {
      id: '6abbb7b8-d02e-41cf-8a3e-5039776c1eb0',
      name: 'Kaliganj Upazila Health Complex',
      alias: 'কালীগঞ্জ উপজেলা স্বাস্থ্য কমপ্লেক্স',
      physicalType: 'Building',
      status: 'active',
      type: 'HEALTH_FACILITY',
      partOf: 'Location/50c5a9c4-3cc1-4c8c-9a1b-a37ddaf85987'
    },
    '0d8474da-0361-4d32-979e-af91f020309e': {
      id: '0d8474da-0361-4d32-979e-af91f020309e',
      name: 'Dholashadhukhan Cc',
      alias: 'ধলাশাধুখান সিসি - কালিগঞ্জ',
      physicalType: 'Building',
      status: 'active',
      type: 'HEALTH_FACILITY',
      partOf: 'Location/50c5a9c4-3cc1-4c8c-9a1b-a37ddaf85987'
    }
  },
  offices: {
    '0d8474da-0361-4d32-979e-af91f012340a': {
      id: '0d8474da-0361-4d32-979e-af91f012340a',
      name: 'Moktarpur Union Parishad',
      alias: 'মোক্তারপুর ইউনিয়ন পরিষদ',
      physicalType: 'Building',
      status: 'active',
      type: 'CRVS_OFFICE',
      partOf: 'Location/7a18cb4c-38f3-449f-b3dc-508473d485f3'
    }
  },
  locations: {
    '65cf62cb-864c-45e3-9c0d-5c70f0074cb4': {
      id: '65cf62cb-864c-45e3-9c0d-5c70f0074cb4',
      name: 'Barisal',
      alias: 'বরিশাল',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    '8cbc862a-b817-4c29-a490-4a8767ff023c': {
      id: '8cbc862a-b817-4c29-a490-4a8767ff023c',
      name: 'Chittagong',
      alias: 'চট্টগ্রাম',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    '6e1f3bce-7bcb-4bf6-8e35-0d9facdf158b': {
      id: '6e1f3bce-7bcb-4bf6-8e35-0d9facdf158b',
      name: 'Dhaka',
      alias: 'ঢাকা',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    '7304b306-1b0d-4640-b668-5bf39bc78f48': {
      id: '7304b306-1b0d-4640-b668-5bf39bc78f48',
      name: 'Khulna',
      alias: 'খুলনা',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    '75fdf3dc-0dd2-4b65-9c59-3afe5f49fc3a': {
      id: '75fdf3dc-0dd2-4b65-9c59-3afe5f49fc3a',
      name: 'Rajshahi',
      alias: 'রাজশাহী',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    '2b55d13f-f700-4373-8255-c0febd4733b6': {
      id: '2b55d13f-f700-4373-8255-c0febd4733b6',
      name: 'Rangpur',
      alias: 'রংপুর',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    '59f7f044-84b8-4a6c-955d-271aa3e5af46': {
      id: '59f7f044-84b8-4a6c-955d-271aa3e5af46',
      name: 'Sylhet',
      alias: 'সিলেট',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    '237f3404-d417-41fe-9130-3d049800a1e5': {
      id: '237f3404-d417-41fe-9130-3d049800a1e5',
      name: 'Mymensingh',
      alias: 'ময়মনসিংহ',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    '7a18cb4c-38f3-449f-b3dc-508473d485f3': {
      id: '7a18cb4c-38f3-449f-b3dc-508473d485f3',
      name: 'Chandpur',
      alias: 'চাঁদপুর',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/5926982b-845c-4463-80aa-cbfb86762e0a'
    },
    'bc4b9f99-0db3-4815-926d-89fd56889407': {
      id: 'bc4b9f99-0db3-4815-926d-89fd56889407',
      name: 'BARGUNA',
      alias: 'বরগুনা',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/65cf62cb-864c-45e3-9c0d-5c70f0074cb4'
    },
    'dabffdf7-c174-4450-b306-5a3c2c0e2c0e': {
      id: 'dabffdf7-c174-4450-b306-5a3c2c0e2c0e',
      name: 'BARISAL',
      alias: 'বরিশাল',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/65cf62cb-864c-45e3-9c0d-5c70f0074cb4'
    },
    'a5b61fc5-f0c9-4f54-a934-eba18f9110c2': {
      id: 'a5b61fc5-f0c9-4f54-a934-eba18f9110c2',
      name: 'BHOLA',
      alias: 'ভোলা',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/65cf62cb-864c-45e3-9c0d-5c70f0074cb4'
    },
    '5ffa5780-5ddf-4549-a391-7ad3ba2334d4': {
      id: '5ffa5780-5ddf-4549-a391-7ad3ba2334d4',
      name: 'JHALOKATI',
      alias: 'ঝালকাঠি',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/65cf62cb-864c-45e3-9c0d-5c70f0074cb4'
    },
    'c8dcf1fe-bf92-404b-81c0-31d6802a1a68': {
      id: 'c8dcf1fe-bf92-404b-81c0-31d6802a1a68',
      name: 'PATUAKHALI',
      alias: 'পটুয়াখালী ',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/65cf62cb-864c-45e3-9c0d-5c70f0074cb4'
    },
    '9c86160a-f704-464a-8b7d-9eae2b4cf1f9': {
      id: '9c86160a-f704-464a-8b7d-9eae2b4cf1f9',
      name: 'PIROJPUR',
      alias: 'পিরোজপুর ',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/65cf62cb-864c-45e3-9c0d-5c70f0074cb4'
    },
    '1846f07e-6f5c-4507-b5d6-126716b0856b': {
      id: '1846f07e-6f5c-4507-b5d6-126716b0856b',
      name: 'BANDARBAN',
      alias: 'বান্দরবান',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/8cbc862a-b817-4c29-a490-4a8767ff023c'
    },
    'cf141982-36a1-4308-9090-0445c311f5ae': {
      id: 'cf141982-36a1-4308-9090-0445c311f5ae',
      name: 'BRAHMANBARIA',
      alias: 'ব্রাহ্মণবাড়িয়া',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/8cbc862a-b817-4c29-a490-4a8767ff023c'
    },
    '478f518e-8d86-439d-8618-5cfa8d3bf5dd': {
      id: '478f518e-8d86-439d-8618-5cfa8d3bf5dd',
      name: 'CHANDPUR',
      alias: 'চাঁদপুর',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/8cbc862a-b817-4c29-a490-4a8767ff023c'
    },
    'db5faba3-8143-4924-a44a-8562ed5e0437': {
      id: 'db5faba3-8143-4924-a44a-8562ed5e0437',
      name: 'CHITTAGONG',
      alias: 'চট্টগ্রাম',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/8cbc862a-b817-4c29-a490-4a8767ff023c'
    },
    '5926982b-845c-4463-80aa-cbfb86762e0a': {
      id: '5926982b-845c-4463-80aa-cbfb86762e0a',
      name: 'COMILLA',
      alias: 'কুমিল্লা',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/8cbc862a-b817-4c29-a490-4a8767ff023c'
    },
    'a3455e64-164c-4bf4-b834-16640a85efd8': {
      id: 'a3455e64-164c-4bf4-b834-16640a85efd8',
      name: "COX'S BAZAR",
      alias: 'কক্সবাজার ',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/8cbc862a-b817-4c29-a490-4a8767ff023c'
    },
    '1dfc716a-c5f7-4d39-ad71-71d2a359210c': {
      id: '1dfc716a-c5f7-4d39-ad71-71d2a359210c',
      name: 'FENI',
      alias: 'ফেনী',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/8cbc862a-b817-4c29-a490-4a8767ff023c'
    },
    'bfe8306c-0910-48fe-8bf5-0db906cf3155': {
      alias: 'বানিয়াজান',
      id: 'bfe8306c-0910-48fe-8bf5-0db906cf3155',
      status: 'active',
      jurisdictionType: 'UNION',
      name: 'Baniajan',
      partOf: 'Location/8f1aae72-2f90-4585-b853-e8c37f4be764',
      physicalType: 'Jurisdiction',
      type: 'ADMIN_STRUCTURE'
    },
    'd3cef1d4-6187-4f0e-a024-61abd3fce9d4': {
      alias: 'দুওজ',
      id: 'd3cef1d4-6187-4f0e-a024-61abd3fce9d4',
      status: 'active',
      jurisdictionType: 'UNION',
      name: 'Duaz',
      partOf: 'Location/8f1aae72-2f90-4585-b853-e8c37f4be764',
      physicalType: 'Jurisdiction',
      type: 'ADMIN_STRUCTURE'
    },
    '473ed705-13e8-4ec1-9836-69bc269f7fad': {
      alias: '',
      id: '473ed705-13e8-4ec1-9836-69bc269f7fad',
      status: 'active',
      jurisdictionType: 'STATE',
      name: 'Lusaka',
      partOf: 'Location/0',
      physicalType: 'Jurisdiction',
      type: 'ADMIN_STRUCTURE'
    },
    '81317429-1d89-42ac-8abc-7a92f268273c': {
      alias: '',
      id: '81317429-1d89-42ac-8abc-7a92f268273c',
      status: 'active',
      jurisdictionType: 'DISTRICT',
      name: 'Lusaka',
      partOf: 'Location/473ed705-13e8-4ec1-9836-69bc269f7fad',
      physicalType: 'Jurisdiction',
      type: 'ADMIN_STRUCTURE'
    }
  },
  languages: JSON.parse(
    readFileSync(join(__dirname, './languages.json')).toString()
  ).data,
  templates: JSON.parse(
    readFileSync(join(__dirname, './templates.json')).toString()
  ),
  assets: {
    logo: `data:image;base64,${validImageB64String}`
  },
  config: {
    APPLICATION_NAME: 'Farajaland CRVS',
    BIRTH: {
      REGISTRATION_TARGET: 45,
      LATE_REGISTRATION_TARGET: 365,
      FEE: {
        ON_TIME: 0,
        LATE: 15,
        DELAYED: 20
      },
      PRINT_IN_ADVANCE: true
    },
    AVAILABLE_LANGUAGES_SELECT: 'en:English,fr:Français,bn:বাংলা',
    DEATH: {
      REGISTRATION_TARGET: 45,
      FEE: {
        ON_TIME: 0,
        DELAYED: 0
      },
      PRINT_IN_ADVANCE: true
    },
    MARRIAGE: {
      REGISTRATION_TARGET: 45,
      FEE: {
        ON_TIME: 0,
        DELAYED: 0
      },
      PRINT_IN_ADVANCE: true
    },
    HEALTH_FACILITY_FILTER: 'DISTRICT',
    LANGUAGES: 'en,bn',
    FIELD_AGENT_AUDIT_LOCATIONS:
      'WARD,UNION,CITY_CORPORATION,MUNICIPALITY,UPAZILA',
    DECLARATION_AUDIT_LOCATIONS: 'WARD,UNION',
    HIDE_EVENT_REGISTER_INFORMATION: false,
    EXTERNAL_VALIDATION_WORKQUEUE: true,
    _id: '61a8c105c04ac94fe46ceb27',
    COUNTRY: 'BGD',
    COUNTRY_LOGO: {
      fileName: 'logo.png',
      file: `data:image;base64,${validImageB64String}`
    },
    LOGIN_BACKGROUND: {
      backgroundColor: 'FFF',
      backgroundImage: '',
      imageFit: 'FILL'
    },
    CURRENCY: {
      isoCode: 'ZMW',
      languagesAndCountry: ['en-ZM']
    },
    PHONE_NUMBER_PATTERN: /^01[1-9][0-9]{8}$/,
    BIRTH_REGISTRATION_TARGET: 45,
    DEATH_REGISTRATION_TARGET: 45,
    NID_NUMBER_PATTERN: /^[0-9]{9}$/,
    SENTRY: 'https://sentry.com',
    LOGROCKET: 'opencrvs-foundation/opencrvs-zambia',
    ADDRESSES: 1,
    DATE_OF_BIRTH_UNKNOWN: true,
    INFORMANT_SIGNATURE: false,
    INFORMANT_SIGNATURE_REQUIRED: false,
    ADMIN_LEVELS: 2
  },
  anonymousConfig: {
    APPLICATION_NAME: 'Farajaland CRVS',
    COUNTRY_LOGO: {
      fileName: 'logo.png',
      file: `data:image;base64,${validImageB64String}`
    },
    LOGIN_BACKGROUND: {
      backgroundColor: 'FFF',
      backgroundImage: '',
      imageFit: 'FILL'
    },
    PHONE_NUMBER_PATTERN: /^01[1-9][0-9]{8}$/
  },
  formConfig,
  systems
}

export const mockOfflineLocationsWithHierarchy: Record<
  string,
  Record<string, ILocation>
> = {
  facilities: {
    '5c6abc88-26b8-4834-a1a6-2992807e3a72': {
      id: '5c6abc88-26b8-4834-a1a6-2992807e3a72',
      name: 'ARK Private Clinic',
      alias: 'ARK Private Clinic',
      physicalType: 'Building',
      status: 'active',
      type: 'HEALTH_FACILITY',
      partOf: 'Location/f244b79e-16e7-40b2-834f-c1c57bd7eae8'
    }
  },
  offices: {
    'c9c4d6e9-981c-4646-98fe-4014fddebd5e': {
      id: 'c9c4d6e9-981c-4646-98fe-4014fddebd5e',
      name: 'Ibombo District Office',
      alias: 'Ibombo District Office',
      physicalType: 'Building',
      status: 'active',
      type: 'CRVS_OFFICE',
      partOf: 'Location/ecc5a78b-e7d9-4640-ac65-e591a6a9590f'
    }
  },
  locations: {
    'f244b79e-16e7-40b2-834f-c1c57bd7eae8': {
      id: 'f244b79e-16e7-40b2-834f-c1c57bd7eae8',
      name: 'Abwe',
      alias: 'Abwe',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/df669feb-61a3-4984-ab24-4b28511b472a'
    },
    'ecc5a78b-e7d9-4640-ac65-e591a6a9590f': {
      id: 'ecc5a78b-e7d9-4640-ac65-e591a6a9590f',
      name: 'Ibombo',
      alias: 'Ibombo',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/df669feb-61a3-4984-ab24-4b28511b472a'
    },
    'df669feb-61a3-4984-ab24-4b28511b472a': {
      id: 'df669feb-61a3-4984-ab24-4b28511b472a',
      name: 'Central',
      alias: 'Central',
      physicalType: 'Jurisdiction',
      status: 'active',
      jurisdictionType: 'STATE',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    }
  }
}
export const mockOfflineDataWithLocationHierarchy = {
  ...mockOfflineData,
  ...mockOfflineLocationsWithHierarchy
}
