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
import { defineMessages, MessageDescriptor } from 'react-intl'

interface IFormMessages
  extends Record<string | number | symbol, MessageDescriptor> {
  accountDetails: MessageDescriptor
  addressLine1: MessageDescriptor
  addressLine2: MessageDescriptor
  addressLine3: MessageDescriptor
  addressLine3UrbanOption: MessageDescriptor
  addressLine4: MessageDescriptor
  answer: MessageDescriptor
  proofOfInformantsID: MessageDescriptor
  witnessName: MessageDescriptor
  informantName: MessageDescriptor
  otherInformantType: MessageDescriptor
  informantsDateOfBirth: MessageDescriptor
  informantsFamilyName: MessageDescriptor
  informantsFamilyNameEng: MessageDescriptor
  informantsGivenNames: MessageDescriptor
  informantsGivenNamesEng: MessageDescriptor
  informantsIdType: MessageDescriptor
  informantsRelationWithChild: MessageDescriptor
  informantsRelationWithDeceased: MessageDescriptor
  informantTitle: MessageDescriptor
  witnessOneTitle: MessageDescriptor
  witnessTwoTitle: MessageDescriptor
  assignedRegistrationOffice: MessageDescriptor
  assignedRegistrationOfficeGroupTitle: MessageDescriptor
  attendantAtBirth: MessageDescriptor
  attendantAtBirthLayperson: MessageDescriptor
  attendantAtBirthMidwife: MessageDescriptor
  attendantAtBirthTraditionalBirthAttendant: MessageDescriptor
  attendantAtBirthNone: MessageDescriptor
  attendantAtBirthNurse: MessageDescriptor
  attendantAtBirthOther: MessageDescriptor
  attendantAtBirthOtherParamedicalPersonnel: MessageDescriptor
  physician: MessageDescriptor
  attestedBirthRecord: MessageDescriptor
  attestedVaccination: MessageDescriptor
  birthAttendant: MessageDescriptor
  birthLocation: MessageDescriptor
  birthMedicalInstitution: MessageDescriptor
  birthType: MessageDescriptor
  birthTypeHigherMultipleDelivery: MessageDescriptor
  birthTypeQuadruplet: MessageDescriptor
  birthTypeSingle: MessageDescriptor
  birthTypeTriplet: MessageDescriptor
  birthTypeTwin: MessageDescriptor
  causeOfDeathMethod: MessageDescriptor
  causeOfDeathEstablished: MessageDescriptor
  causeOfDeathName: MessageDescriptor
  causeOfDeathNotice: MessageDescriptor
  causeOfDeathTitle: MessageDescriptor
  certification: MessageDescriptor
  changeButtonLabel: MessageDescriptor
  dateOfBirth: MessageDescriptor
  childFamilyName: MessageDescriptor
  childFirstNames: MessageDescriptor
  firstNames: MessageDescriptor
  sex: MessageDescriptor
  sexFemale: MessageDescriptor
  sexMale: MessageDescriptor
  childSexOther: MessageDescriptor
  sexUnknown: MessageDescriptor
  other: MessageDescriptor
  childTab: MessageDescriptor
  childTitle: MessageDescriptor
  commentsOrNotesDescription: MessageDescriptor
  commentsOrNotesLabel: MessageDescriptor
  confirm: MessageDescriptor
  confirmMotherDetails: MessageDescriptor
  contactDetailsInformant: MessageDescriptor
  contactDetailsBoth: MessageDescriptor
  contactDetailsFather: MessageDescriptor
  contactDetailsMother: MessageDescriptor
  certifyRecordToMother: MessageDescriptor
  certifyRecordToFather: MessageDescriptor
  country: MessageDescriptor
  secondaryAddress: MessageDescriptor
  dateOfMarriage: MessageDescriptor
  daughter: MessageDescriptor
  daughterInLaw: MessageDescriptor
  granddaughter: MessageDescriptor
  deathAtFacility: MessageDescriptor
  deathAtOtherLocation: MessageDescriptor
  deathAtPrivateHome: MessageDescriptor
  deathDate: MessageDescriptor
  deathEventName: MessageDescriptor
  deathEventTitle: MessageDescriptor
  marriageEventName: MessageDescriptor
  marriageEventTitle: MessageDescriptor
  deathPlace: MessageDescriptor
  placeOfDeath: MessageDescriptor
  placeOfMarriage: MessageDescriptor
  placeOfDeathOther: MessageDescriptor
  placeOfDeathSameAsCurrent: MessageDescriptor
  placeOfDeathSameAsPrimary: MessageDescriptor
  placeOfDeathType: MessageDescriptor
  deceasedCurrentAddressSameAsPrimary: MessageDescriptor
  deceasedDeathProof: MessageDescriptor
  deceasedDoBProof: MessageDescriptor
  deceasedFamilyName: MessageDescriptor
  deceasedGivenNames: MessageDescriptor
  deceasedIDProof: MessageDescriptor
  deceasedIdType: MessageDescriptor
  deceasedName: MessageDescriptor
  deceasedParagraph: MessageDescriptor
  deceasedPrimaryAddressProof: MessageDescriptor
  nameInEnglishPreviewGroup: MessageDescriptor
  deceasedSexOther: MessageDescriptor
  deceasedTitle: MessageDescriptor
  defaultLabel: MessageDescriptor
  deliveryAddress: MessageDescriptor
  deliveryInstitution: MessageDescriptor
  deny: MessageDescriptor
  district: MessageDescriptor
  docTaxReceipt: MessageDescriptor
  docTypeBirthCert: MessageDescriptor
  docTypeChildAgeProof: MessageDescriptor
  docTypeChildBirthProof: MessageDescriptor
  docTypeMarriageNotice: MessageDescriptor
  docTypeCopyOfBurialReceipt: MessageDescriptor
  docTypeDeathCertificate: MessageDescriptor
  docTypePoliceCertificate: MessageDescriptor
  docTypeDoctorCertificate: MessageDescriptor
  docTypeEPICard: MessageDescriptor
  docTypeEPIStaffCertificate: MessageDescriptor
  docTypeFuneralReceipt: MessageDescriptor
  docTypeLetterOfDeath: MessageDescriptor
  docTypeNID: MessageDescriptor
  docTypeOther: MessageDescriptor
  docTypePassport: MessageDescriptor
  docTypePostMortemReport: MessageDescriptor
  docTypeSC: MessageDescriptor
  documentNumber: MessageDescriptor
  documentsName: MessageDescriptor
  documentsTitle: MessageDescriptor
  documentsUploadName: MessageDescriptor
  educationAttainmentISCED1: MessageDescriptor
  educationAttainmentISCED4: MessageDescriptor
  educationAttainmentISCED5: MessageDescriptor
  educationAttainmentNone: MessageDescriptor
  enterResponse: MessageDescriptor
  familyName: MessageDescriptor
  marriedLastName: MessageDescriptor
  father: MessageDescriptor
  fatherFamilyName: MessageDescriptor
  fatherFirstNames: MessageDescriptor
  fatherName: MessageDescriptor
  fathersDetailsExist: MessageDescriptor
  mothersDetailsExist: MessageDescriptor
  fatherTitle: MessageDescriptor
  fetchDeceasedDetails: MessageDescriptor
  fetchFatherDetails: MessageDescriptor
  fetchIdentifierModalErrorTitle: MessageDescriptor
  fetchIdentifierModalSuccessTitle: MessageDescriptor
  fetchIdentifierModalTitle: MessageDescriptor
  fetchInformantDetails: MessageDescriptor
  fetchMotherDetails: MessageDescriptor
  fetchPersonByNIDModalErrorText: MessageDescriptor
  fetchPersonByNIDModalNetworkErrorText: MessageDescriptor
  fetchPersonByNIDModalInfo: MessageDescriptor
  fetchRegistrationModalErrorText: MessageDescriptor
  fetchRegistrationModalInfo: MessageDescriptor
  firstNameBn: MessageDescriptor
  firstNameEn: MessageDescriptor
  givenNames: MessageDescriptor
  healthInstitution: MessageDescriptor
  hospital: MessageDescriptor
  internationalState: MessageDescriptor
  internationalDistrict: MessageDescriptor
  internationalCity: MessageDescriptor
  internationalAddressLine1: MessageDescriptor
  internationalAddressLine2: MessageDescriptor
  internationalAddressLine3: MessageDescriptor
  internationalPostcode: MessageDescriptor
  iD: MessageDescriptor
  iDType: MessageDescriptor
  iDTypeAlienNumber: MessageDescriptor
  iDTypeBRN: MessageDescriptor
  iDTypeDrivingLicense: MessageDescriptor
  iDTypeDRN: MessageDescriptor
  iDTypeNationalID: MessageDescriptor
  iDTypeNoId: MessageDescriptor
  iDTypeOther: MessageDescriptor
  iDTypeOtherLabel: MessageDescriptor
  iDTypePassport: MessageDescriptor
  iDTypeRefugeeNumber: MessageDescriptor
  informantAttestation: MessageDescriptor
  lastNameEn: MessageDescriptor
  manner: MessageDescriptor
  mannerAccident: MessageDescriptor
  mannerHomicide: MessageDescriptor
  mannerNatural: MessageDescriptor
  mannerSuicide: MessageDescriptor
  mannerUndetermined: MessageDescriptor
  typeOfMarriage: MessageDescriptor
  polygamy: MessageDescriptor
  monogamy: MessageDescriptor
  maritalStatus: MessageDescriptor
  maritalStatusDivorced: MessageDescriptor
  maritalStatusMarried: MessageDescriptor
  maritalStatusNotStated: MessageDescriptor
  maritalStatusSeparated: MessageDescriptor
  maritalStatusSingle: MessageDescriptor
  maritalStatusWidowed: MessageDescriptor
  medicallyCertified: MessageDescriptor
  deathDescription: MessageDescriptor
  methodOfCauseOfDeath: MessageDescriptor
  mother: MessageDescriptor
  educationAttainment: MessageDescriptor
  motherFamilyName: MessageDescriptor
  motherFirstNames: MessageDescriptor
  motherName: MessageDescriptor
  motherTitle: MessageDescriptor
  groomName: MessageDescriptor
  groomTitle: MessageDescriptor
  brideName: MessageDescriptor
  brideTitle: MessageDescriptor
  headOfGroomFamily: MessageDescriptor
  headOfBrideFamily: MessageDescriptor
  multipleBirth: MessageDescriptor
  nationality: MessageDescriptor
  nationalityBangladesh: MessageDescriptor
  NID: MessageDescriptor
  officeLocationId: MessageDescriptor
  optionalLabel: MessageDescriptor
  otherDocuments: MessageDescriptor
  otherHealthInstitution: MessageDescriptor
  otherInstitution: MessageDescriptor
  otherOption: MessageDescriptor
  paragraphTargetDaysTo5Years: MessageDescriptor
  documentsParagraph: MessageDescriptor
  paragraphAbove5Years: MessageDescriptor
  deceasedPrimaryAddress: MessageDescriptor
  primaryAddressSameAsCurrent: MessageDescriptor
  primaryAddressSameAsOtherPrimary: MessageDescriptor
  primaryAddressSameAsDeceasedsPrimary: MessageDescriptor
  phoneNumber: MessageDescriptor
  phoneVerificationWarning: MessageDescriptor
  placeOfBirth: MessageDescriptor
  postCode: MessageDescriptor
  presentBoth: MessageDescriptor
  presentFather: MessageDescriptor
  presentMother: MessageDescriptor
  presentOther: MessageDescriptor
  privateHome: MessageDescriptor
  prompt: MessageDescriptor
  proofOfBirth: MessageDescriptor
  proofOfMarriageNotice: MessageDescriptor
  proofOfDocCertificateOfChild: MessageDescriptor
  proofOfEPICardOfChild: MessageDescriptor
  proofOfFathersID: MessageDescriptor
  otherBirthSupportingDocuments: MessageDescriptor
  legalGuardianProof: MessageDescriptor
  proofOfMothersID: MessageDescriptor
  proofOfGroomsID: MessageDescriptor
  proofOfBridesID: MessageDescriptor
  proofOfParentPrimaryAddress: MessageDescriptor
  placeOfBirthPreview: MessageDescriptor
  registrationName: MessageDescriptor
  registrationOffice: MessageDescriptor
  registrationPhoneLabel: MessageDescriptor
  registrationTitle: MessageDescriptor
  relationExtendedFamily: MessageDescriptor
  relationOther: MessageDescriptor
  relationshipPlaceHolder: MessageDescriptor
  searchFieldModalTitle: MessageDescriptor
  searchFieldPlaceHolderText: MessageDescriptor
  securityQuestionLabel: MessageDescriptor
  select: MessageDescriptor
  selectOne: MessageDescriptor
  selectSecurityQuestion: MessageDescriptor
  self: MessageDescriptor
  signedAffidavitConfirmation: MessageDescriptor
  someoneElse: MessageDescriptor
  someoneElseCollector: MessageDescriptor
  son: MessageDescriptor
  sonInLaw: MessageDescriptor
  grandson: MessageDescriptor
  spouse: MessageDescriptor
  grandfather: MessageDescriptor
  grandmother: MessageDescriptor
  brother: MessageDescriptor
  sister: MessageDescriptor
  legalGuardian: MessageDescriptor
  headOfTheInstitute: MessageDescriptor
  driverOfTheVehicle: MessageDescriptor
  ownerOfTheHouse: MessageDescriptor
  officerInCharge: MessageDescriptor
  state: MessageDescriptor
  typeOfDocument: MessageDescriptor
  uploadDocForChild: MessageDescriptor
  uploadDocForFather: MessageDescriptor
  uploadDocForMother: MessageDescriptor
  uploadDocForOther: MessageDescriptor
  uploadDocForWhom: MessageDescriptor
  uploadImage: MessageDescriptor
  userDetails: MessageDescriptor
  userDevice: MessageDescriptor
  userFormReviewTitle: MessageDescriptor
  userFormSecurityQuestionsDescription: MessageDescriptor
  userFormSecurityQuestionsHeading: MessageDescriptor
  userFormSecurityQuestionsTitle: MessageDescriptor
  userFormTitle: MessageDescriptor
  verbalAutopsy: MessageDescriptor
  verbalAutopsyReport: MessageDescriptor
  warningNotVerified: MessageDescriptor
  weightAtBirth: MessageDescriptor
  ageOfMother: MessageDescriptor
  ageOfFather: MessageDescriptor
  ageOfInformant: MessageDescriptor
  ageOfDeceased: MessageDescriptor
  ageOfGroom: MessageDescriptor
  ageOfBride: MessageDescriptor
  whatDocToUpload: MessageDescriptor
  whoIsPresentLabel: MessageDescriptor
  whoseContactDetailsLabel: MessageDescriptor
  uploadedList: MessageDescriptor
  userSignatureAttachmentTitle: MessageDescriptor
  docTypeCoronersReport: MessageDescriptor
  userSignatureAttachment: MessageDescriptor
  userAttachmentSection: MessageDescriptor
  userSignatureAttachmentDesc: MessageDescriptor
  addFile: MessageDescriptor
  uploadFile: MessageDescriptor
  fileUploadError: MessageDescriptor
  fileSizeError: MessageDescriptor
  typeOfId: MessageDescriptor
  firstName: MessageDescriptor
  lastName: MessageDescriptor
  relationship: MessageDescriptor
  relationshipToSpouses: MessageDescriptor
  primaryAddress: MessageDescriptor
  parentDetailsType: MessageDescriptor
  motherRadioButton: MessageDescriptor
  fatherRadioButton: MessageDescriptor
  reasonNA: MessageDescriptor
  reasonParentsNotApplying: MessageDescriptor
  motherDeceasedLabel: MessageDescriptor
  fatherDeceasedLabel: MessageDescriptor
  motherCaregiverTypeLabel: MessageDescriptor
  fatherCaregiverTypeLabel: MessageDescriptor
  legalGuardianCaregiverTypeLabel: MessageDescriptor
  parentsCaregiverTypeLabel: MessageDescriptor
  informantCaregiverTypeLabel: MessageDescriptor
  otherCaregiverTypeLabel: MessageDescriptor
  nameFieldLabel: MessageDescriptor
  reasonMNAPreview: MessageDescriptor
  reasonFNAPreview: MessageDescriptor
  tooltipNationalID: MessageDescriptor
  dateRangePickerCheckboxLabel: MessageDescriptor
  deceasedFatherSectionName: MessageDescriptor
  deceasedFatherSectionTitle: MessageDescriptor
  deceasedFathersFamilyName: MessageDescriptor
  deceasedFathersFamilyNameEng: MessageDescriptor
  deceasedFathersGivenNames: MessageDescriptor
  deceasedFathersGivenNamesEng: MessageDescriptor
  deceasedMotherSectionName: MessageDescriptor
  deceasedMotherSectionTitle: MessageDescriptor
  deceasedMothersFamilyName: MessageDescriptor
  deceasedMothersFamilyNameEng: MessageDescriptor
  deceasedMothersGivenNames: MessageDescriptor
  deceasedMothersGivenNamesEng: MessageDescriptor
  deceasedSpouseSectionName: MessageDescriptor
  deceasedSpouseSectionTitle: MessageDescriptor
  deceasedHasSpouseDetails: MessageDescriptor
  deceasedHasNoSpouseDetails: MessageDescriptor
  deceasedSpousesFamilyName: MessageDescriptor
  deceasedSpousesFamilyNameEng: MessageDescriptor
  deceasedSpousesGivenNames: MessageDescriptor
  deceasedSpousesGivenNamesEng: MessageDescriptor
  certificatePrintInAdvance: MessageDescriptor
  nationalIdOption: MessageDescriptor
  brnOption: MessageDescriptor
  helperTextNID: MessageDescriptor
  formSelectPlaceholder: MessageDescriptor
  selectContactPoint: MessageDescriptor
  reviewLabelMainContact: MessageDescriptor
  deceasedSecondaryAddressSameAsPrimary: MessageDescriptor
  deceasedSecondaryAddress: MessageDescriptor
  informantSecondaryAddressSameAsPrimary: MessageDescriptor
  informantSecondaryAddress: MessageDescriptor
  emptyStringForSubSection: MessageDescriptor
  assignedResponsibilityProof: MessageDescriptor
  showLabel: MessageDescriptor
  hideLabel: MessageDescriptor
}

export const formMessageDescriptors: IFormMessages = {
  docTypeCoronersReport: {
    defaultMessage: "Coroner's report",
    description: "Label for select option Coroner's report",
    id: 'form.field.label.docTypeCoronersReport'
  },
  docTypePoliceCertificate: {
    defaultMessage: 'Police certificate of death',
    description: 'Label for select option Police death certificate',
    id: 'form.field.label.docTypePoliceCertificate'
  },
  primaryAddressSameAsDeceasedsPrimary: {
    defaultMessage: "Same as deceased's usual place of residence",
    description:
      "Label for informant's address to be same as deceased's usual place of residence",
    id: 'form.field.label.primaryAddressSameAsDeceasedsPrimary'
  },
  deathDescription: {
    defaultMessage: 'Description',
    description:
      'Description of cause of death by lay person or verbal autopsy',
    id: 'form.field.label.deathDescription'
  },
  causeOfDeathMethod: {
    defaultMessage: 'Source of cause of death',
    description: 'Source of cause of death',
    id: 'form.field.label.causeOfDeathMethod'
  },
  assignedResponsibilityProof: {
    defaultMessage: 'Proof of assigned responsibility',
    description: 'Label for docuemnt option Proof of assigned responsibility',
    id: 'form.field.label.assignedResponsibilityProof'
  },
  legalGuardianProof: {
    defaultMessage: 'Proof of legal guardianship',
    description: 'Label for document option Proof of legal guardianship',
    id: 'form.field.label.legalGuardianProof'
  },
  otherBirthSupportingDocuments: {
    defaultMessage: 'Other',
    description: 'Option for other supporting documents',
    id: 'form.field.label.otherBirthSupportingDocuments'
  },
  reviewLabelMainContact: {
    defaultMessage: 'Main Contact',
    description: 'Label for point of contact on the review page',
    id: 'form.review.label.mainContact'
  },
  selectContactPoint: {
    defaultMessage: 'Who is the main point of contact for this declaration?',
    description: 'Form section title for contact point',
    id: 'register.SelectContactPoint.heading'
  },
  accountDetails: {
    defaultMessage: 'Account details',
    description: 'Account details section',
    id: 'form.section.accountDetails'
  },
  addressLine1: {
    defaultMessage: 'Street and house number',
    description: 'Title for the address line 1',
    id: 'form.field.label.addressLine5'
  },
  addressLine2: {
    defaultMessage: 'Area / Ward / Mouja / Village',
    description: 'Title for the address line 2',
    id: 'form.field.label.addressLine2'
  },
  addressLine3: {
    defaultMessage: 'Union / Municipality / Cantonment',
    description: 'Title for the address line 3 option 1',
    id: 'form.field.label.addressLine3'
  },
  addressLine3UrbanOption: {
    defaultMessage: 'Ward',
    description: 'Title for the address line 3 option 2',
    id: 'form.field.label.addressLine3UrbanOption'
  },
  addressLine4: {
    defaultMessage: 'Upazila (Thana) / City',
    description: 'Title for the address line 4',
    id: 'form.field.label.addressLine4'
  },
  answer: {
    defaultMessage: 'Answer',
    description: 'Label to show answer to a security question',
    id: 'user.form.securityquestion.answer'
  },
  proofOfInformantsID: {
    defaultMessage: "Proof of informant's ID",
    description: 'Option for radio group field: Type of Document To Upload',
    id: 'form.field.label.proofOfInformantsID'
  },
  witnessName: {
    defaultMessage: 'Witness',
    description: 'Form section name for Witness',
    id: 'form.section.witness.name'
  },
  informantName: {
    defaultMessage: 'Informant',
    description: 'Form section name for Informant',
    id: 'form.section.informant.name'
  },
  otherInformantType: {
    defaultMessage: 'Other relation',
    description: 'Label for form field: Other relation',
    id: 'form.field.label.otherInformantType'
  },
  informantsDateOfBirth: {
    defaultMessage: 'Date of Birth',
    description: 'Label for form field: Date of birth',
    id: 'form.field.label.informantsDateOfBirth'
  },
  informantsFamilyName: {
    defaultMessage: 'নামের শেষাংশ বাংলায়',
    description: 'Label for form field: Family name',
    id: 'form.field.label.informantsFamilyName'
  },
  informantsFamilyNameEng: {
    defaultMessage: 'Last Name(s) in English',
    description: 'Label for form field: Family name in english',
    id: 'form.field.label.informantsFamilyNameEng'
  },
  informantsGivenNames: {
    defaultMessage: 'নামের প্রথমাংশ বাংলায়',
    description: 'Label for form field: Given names',
    id: 'form.field.label.informantsGivenNames'
  },
  informantsGivenNamesEng: {
    defaultMessage: 'First Name(s) in English',
    description: 'Label for form field: Given names in english',
    id: 'form.field.label.informantsGivenNamesEng'
  },
  informantsIdType: {
    defaultMessage: 'Type of ID',
    description: 'Label for form field: Existing ID',
    id: 'form.field.label.informantsIdType'
  },
  informantsRelationWithChild: {
    defaultMessage: 'Relationship to child',
    description: 'Label for Relationship to child',
    id: 'form.field.label.informantsRelationWithChild'
  },
  informantsRelationWithDeceased: {
    defaultMessage: 'Relationship to Deceased',
    description: 'Label for Relationship to Deceased select',
    id: 'form.field.label.informantsRelationWithDeceased'
  },
  informantTitle: {
    defaultMessage: "What are the informant's details?",
    description: 'Form section title for informants',
    id: 'form.section.informant.title'
  },
  witnessOneTitle: {
    defaultMessage: 'What are the witnesses one details?',
    description: 'Form section title for witnesses',
    id: 'form.section.witnessOne.title'
  },
  witnessTwoTitle: {
    defaultMessage: 'What are the witnesses two details?',
    description: 'Form section title for witnesses',
    id: 'form.section.witnessTwo.title'
  },
  assignedRegistrationOffice: {
    defaultMessage: 'Assigned Registration Office',
    description: 'Assigned Registration Office section',
    id: 'form.section.assignedRegistrationOffice'
  },
  assignedRegistrationOfficeGroupTitle: {
    defaultMessage: 'Assigned registration office',
    description: 'Assigned Registration Office section',
    id: 'form.section.assignedRegistrationOfficeGroupTitle'
  },
  attendantAtBirth: {
    defaultMessage: 'Attendant at birth',
    description: 'Label for form field: Attendant at birth',
    id: 'form.field.label.attendantAtBirth'
  },
  attendantAtBirthLayperson: {
    defaultMessage: 'Layperson',
    description: 'Label for form field: Attendant at birth',
    id: 'form.field.label.attendantAtBirthLayperson'
  },
  attendantAtBirthMidwife: {
    defaultMessage: 'Midwife',
    description: 'Label for form field: Attendant at birth',
    id: 'form.field.label.attendantAtBirthMidwife'
  },
  attendantAtBirthTraditionalBirthAttendant: {
    defaultMessage: 'Traditional birth attendant',
    description: 'Label for form field: Attendant at birth',
    id: 'form.field.label.attendantAtBirthTraditionalBirthAttendant'
  },
  attendantAtBirthNone: {
    defaultMessage: 'None',
    description: 'Label for form field: Attendant at birth',
    id: 'form.field.label.attendantAtBirthNone'
  },
  attendantAtBirthNurse: {
    defaultMessage: 'Nurse',
    description: 'Label for form field: Attendant at birth',
    id: 'form.field.label.attendantAtBirthNurse'
  },
  attendantAtBirthOther: {
    defaultMessage: 'Other',
    description: 'Label for form field: Attendant at birth',
    id: 'form.field.label.attendantAtBirthOther'
  },
  attendantAtBirthOtherParamedicalPersonnel: {
    defaultMessage: 'Other paramedical personnel',
    description: 'Label for form field: Attendant at birth',
    id: 'form.field.label.attBirthOtherParaPers'
  },
  physician: {
    defaultMessage: 'Physician',
    description: 'Label for form field: physician',
    id: 'form.field.label.physician'
  },
  layReported: {
    defaultMessage: 'Lay reported',
    description: 'Label for form field: Lay reported',
    id: 'form.field.label.layReported'
  },
  attestedBirthRecord: {
    defaultMessage: 'Attested copy of hospital document or birth record, or',
    description: 'Attested copy of hospital document',
    id: 'form.section.documents.list.attestedBirthRecord'
  },
  attestedVaccination: {
    defaultMessage: 'Attested copy of the vaccination (EPI) card, or',
    description: 'Attested copy of the vaccination card',
    id: 'form.section.documents.list.attestedVaccination'
  },
  birthAttendant: {
    defaultMessage: 'Proof of birth from birth attendant',
    description: 'Document type label for Proof of birth from birth attendant',
    id: 'form.field.label.docTypebirthAttendant'
  },
  birthLocation: {
    defaultMessage: 'Hospital / Clinic',
    description: 'Label for form field: Hospital or Health Institution',
    id: 'form.field.label.birthLocation'
  },
  birthMedicalInstitution: {
    defaultMessage: 'Proof of birth from medical institution',
    description:
      'Document type label for Proof of birth from medical institution',
    id: 'form.field.label.docTypeMedicalInstitution'
  },
  birthType: {
    defaultMessage: 'Type of birth',
    description: 'Label for form field: Type of birth',
    id: 'form.field.label.birthType'
  },
  birthTypeHigherMultipleDelivery: {
    defaultMessage: 'Higher multiple delivery',
    description: 'Label for form field: Type of birth',
    id: 'form.field.label.birthTypeHigherMultipleDelivery'
  },
  birthTypeQuadruplet: {
    defaultMessage: 'Quadruplet',
    description: 'Label for form field: Type of birth',
    id: 'form.field.label.birthTypeQuadruplet'
  },
  birthTypeSingle: {
    defaultMessage: 'Single',
    description: 'Label for form field: Type of birth',
    id: 'form.field.label.birthTypeSingle'
  },
  birthTypeTriplet: {
    defaultMessage: 'Triplet',
    description: 'Label for form field: Type of birth',
    id: 'form.field.label.birthTypeTriplet'
  },
  birthTypeTwin: {
    defaultMessage: 'Twin',
    description: 'Label for form field: Type of birth',
    id: 'form.field.label.birthTypeTwin'
  },
  causeOfDeathProof: {
    defaultMessage: 'Proof of cause of death',
    description: 'Label for doc section: Proof of cause of death',
    id: 'form.field.label.causeOfDeathProof'
  },
  causeOfDeathEstablished: {
    defaultMessage: 'Cause of death has been established',
    description: 'Label for form field: Cause of Death Established',
    id: 'form.field.label.causeOfDeathEstablished'
  },
  causeOfDeathName: {
    defaultMessage: 'What is the official cause of death?',
    description: 'Form section name for Cause of Death',
    id: 'form.section.causeOfDeath.name'
  },
  causeOfDeathNotice: {
    defaultMessage:
      'A Medically Certified Cause of Death is not mandatory to submit the declaration. This can be added at a later date.',
    description: 'Form section notice for Cause of Death',
    id: 'form.section.causeOfDeathNotice'
  },
  causeOfDeathTitle: {
    defaultMessage: 'What is the official cause of death?',
    description: 'Form section title for Cause of Death',
    id: 'form.section.causeOfDeath.title'
  },
  certification: {
    defaultMessage:
      'Certification regarding NGO worker authorized by registrar in favour of date of birth, or',
    description: 'Certification regarding NGO worker',
    id: 'form.section.documents.list.certification'
  },
  dateOfBirth: {
    defaultMessage: 'Date of birth',
    description: 'Label for form field: Date of birth',
    id: 'form.field.label.dateOfBirth'
  },
  childFamilyName: {
    defaultMessage: 'নামের শেষাংশ বাংলায়',
    description: 'Label for form field: Family name',
    id: 'form.field.label.childFamilyName'
  },
  childFirstNames: {
    defaultMessage: 'নামের প্রথমাংশ বাংলায়',
    description: 'Label for form field: First names',
    id: 'form.field.label.childFirstNames'
  },
  firstNames: {
    defaultMessage: 'First name(s)',
    description: 'Label for form field: First names',
    id: 'form.field.label.firstNames'
  },
  sex: {
    defaultMessage: 'Sex',
    description: 'Label for form field: Sex name',
    id: 'form.field.label.sex'
  },
  sexFemale: {
    defaultMessage: 'Female',
    description: 'Option for form field: Sex name',
    id: 'form.field.label.sexFemale'
  },
  sexMale: {
    defaultMessage: 'Male',
    description: 'Option for form field: Sex name',
    id: 'form.field.label.sexMale'
  },
  childSexOther: {
    defaultMessage: 'Other',
    description: 'Option for form field: Sex name',
    id: 'form.field.label.childSexOther'
  },
  sexUnknown: {
    defaultMessage: 'Unknown',
    description: 'Option for form field: Sex name',
    id: 'form.field.label.sexUnknown'
  },
  other: {
    defaultMessage: 'Other',
    description: 'Option for form field: Other',
    id: 'form.field.label.other'
  },
  childTab: {
    defaultMessage: 'Child',
    description: 'Form section name for Child',
    id: 'form.section.child.name'
  },
  childTitle: {
    defaultMessage: "Child's details",
    description: 'Form section title for Child',
    id: 'form.section.child.title'
  },
  commentsOrNotesDescription: {
    defaultMessage:
      'Use this section to add any comments or notes that might be relevant to the completion and certification of this registration. This information won’t be shared with the informants.',
    description: 'Help text for the notes field',
    id: 'form.field.label.declaration.comment.desc'
  },
  commentsOrNotesLabel: {
    defaultMessage: 'Comments or notes',
    description: 'Input label for comments or notes textarea',
    id: 'form.field.label.declaration.commentsOrNotes'
  },
  confirm: {
    defaultMessage: 'Yes',
    description: 'confirmation label for yes / no radio button',
    id: 'form.field.label.confirm'
  },
  confirmMotherDetails: {
    defaultMessage:
      'Does their proof of ID document match the following details?',
    description: 'The label for mother details paragraph',
    id: 'form.field.label.print.confirmMotherInformation'
  },
  contactDetailsInformant: {
    id: 'form.field.label.app.whoContDet.app',
    defaultMessage: 'Informant',
    description: 'Label for "Informant" select option'
  },
  contactDetailsBoth: {
    defaultMessage: 'Both Parents',
    description: 'Label for "Both Parents" select option',
    id: 'form.field.label.app.whoContDet.both'
  },
  contactDetailsFather: {
    defaultMessage: 'Father',
    description: 'Label for "Father" select option',
    id: 'form.field.label.app.whoContDet.father'
  },
  contactDetailsMother: {
    defaultMessage: 'Mother',
    description: 'Label for "Mother" select option',
    id: 'form.field.label.app.whoContDet.mother'
  },
  certifyRecordToMother: {
    defaultMessage: 'Print and issue to informant (Mother)',
    description: 'Label for mother select option to certify record',
    id: 'form.field.label.app.certifyRecordTo.mother'
  },
  certifyRecordToFather: {
    defaultMessage: 'Print and issue to informant (Father)',
    description: 'Label for father select option to certify record',
    id: 'form.field.label.app.certifyRecordTo.father'
  },
  country: {
    defaultMessage: 'Country',
    description: 'Title for the country select',
    id: 'form.field.label.country'
  },
  secondaryAddress: {
    defaultMessage: 'Secondary Address',
    description: 'Title for the secondary address fields',
    id: 'form.field.label.secondaryAddress'
  },
  primaryAddress: {
    defaultMessage: 'Usual place of residence',
    description: 'Title of the primary adress ',
    id: 'form.field.label.primaryAddress'
  },
  dateOfMarriage: {
    defaultMessage: 'Date of marriage',
    description: 'Option for form field: Date of marriage',
    id: 'form.field.label.dateOfMarriage'
  },
  daughter: {
    defaultMessage: 'Daughter',
    description: 'Label for option Daughter',
    id: 'form.field.label.informantRelation.daughter'
  },
  daughterInLaw: {
    defaultMessage: 'Daughter in law',
    description: 'Label for option Daughter in law',
    id: 'form.field.label.informantRelation.daughterInLaw'
  },
  granddaughter: {
    defaultMessage: 'Granddaughter',
    description: 'Label for option Granddaughter',
    id: 'form.field.label.informantRelation.granddaughter'
  },
  deathAtFacility: {
    defaultMessage: 'What hospital did the death occur at?',
    description: 'Label for form field: Hospital or Health Institution',
    id: 'form.field.label.deathAtFacility'
  },
  deathAtOtherLocation: {
    defaultMessage: 'What is the other address did the death occur at?',
    description: 'Label for form field: Other Location Address',
    id: 'form.field.label.deathAtOtherLocation'
  },
  deathAtPrivateHome: {
    defaultMessage: 'What is the address of the private home?',
    description: 'Label for form field: Private Home Address',
    id: 'form.field.label.deathAtPrivateHome'
  },
  deathDate: {
    defaultMessage: 'Enter the date as: day, month, year e.g. 24 10 2020',
    description: 'Label for form field: Date of occurrence',
    id: 'form.field.label.deathDate'
  },
  deathEventName: {
    defaultMessage: 'Death event details',
    description: 'Form section name for Death Event',
    id: 'form.section.deathEvent.name'
  },
  deathEventDate: {
    defaultMessage: 'Date of death',
    description: 'Form section title for date of Death Event',
    id: 'form.section.deathEvent.date'
  },
  marriageEventName: {
    defaultMessage: 'Marriage event details',
    description: 'Form section name for Marriage Event',
    id: 'form.section.marriageEvent.name'
  },
  marriageEventDate: {
    defaultMessage: 'Date of marriage',
    description: 'Form section title for date of Marriage Event',
    id: 'form.section.marriageEvent.date'
  },
  deathEventTitle: {
    defaultMessage: 'Death details?',
    description: 'Form section title for Death Event',
    id: 'form.section.deathEvent.title'
  },
  marriageEventTitle: {
    defaultMessage: 'Marriage details?',
    description: 'Form section title for Marriage Event',
    id: 'form.section.marriageEvent.title'
  },
  deathPlace: {
    defaultMessage: 'Place of Occurrence of Death',
    description: 'Title for place of occurrence of death',
    id: 'form.field.label.deathPlace'
  },
  placeOfDeath: {
    defaultMessage: 'Where did the death occur?',
    description: 'Label for form field: Place of occurrence of death',
    id: 'form.field.label.placeOfDeath'
  },
  placeOfMarriage: {
    defaultMessage: 'Place of marriage',
    description: 'Label for form field: Place of occurrence of marriage',
    id: 'form.field.label.placeOfMarriage'
  },
  placeOfDeathOther: {
    defaultMessage: 'Different Address',
    description: 'Option for form field: Place of occurrence of death',
    id: 'form.field.label.placeOfDeathOther'
  },
  placeOfDeathSameAsCurrent: {
    defaultMessage: 'Current address of the deceased',
    description: 'Option for form field: Place of occurrence of death',
    id: 'form.field.label.placeOfDeathSameAsCurrent'
  },
  placeOfDeathSameAsPrimary: {
    defaultMessage: "Deceased's usual place of residence",
    description:
      'Option for place of occurrence of death same as deceased primary address  ',
    id: 'form.field.label.placeOfDeathSameAsPrimary'
  },
  placeOfDeathType: {
    defaultMessage: 'Type of Place',
    description: 'Label for form field: Type of place of death occurrence',
    id: 'form.field.label.placeOfDeathType'
  },
  deceasedCurrentAddressSameAsPrimary: {
    defaultMessage:
      'Is deceased’s current address the same as their permanent address?',
    description:
      'Title for the radio button to select that the deceased current address is the same as their permanent address',
    id: 'form.field.label.deceasedCurAddSamePerm'
  },
  deceasedDeathProof: {
    defaultMessage: 'Proof of death of deceased',
    description: 'Option for radio group field: Type of Document To Upload',
    id: 'form.field.label.deceasedDeathProof'
  },
  deceasedDoBProof: {
    defaultMessage: 'Proof of date of birth of deceased',
    description: 'Option for radio group field: Type of Document To Upload',
    id: 'form.field.label.deceasedDoBProof'
  },
  deceasedFamilyName: {
    defaultMessage: 'নামের শেষাংশ বাংলায়',
    description: 'Label for form field: Family name',
    id: 'form.field.label.deceasedFamilyName'
  },
  deceasedGivenNames: {
    defaultMessage: 'নামের প্রথমাংশ বাংলায়',
    description: 'Label for form field: Given names',
    id: 'form.field.label.deceasedGivenNames'
  },
  deceasedIDProof: {
    defaultMessage: "Proof of deceased's ID",
    description: 'Option for radio group field: Type of Document To Upload',
    id: 'form.field.label.deceasedIDProof'
  },
  deceasedIdType: {
    defaultMessage: 'Type of ID',
    description: 'Label for form field: Existing ID',
    id: 'form.field.label.deceasedIdType'
  },
  deceasedName: {
    defaultMessage: 'Deceased',
    description: 'Form section name for Deceased',
    id: 'form.section.deceased.name'
  },
  deceasedParagraph: {
    defaultMessage:
      'For this death registration, the following documents are required:',
    description: 'Documents Paragraph text',
    id: 'form.field.label.deceasedDocumentParagraph'
  },
  deceasedPrimaryAddressProof: {
    defaultMessage: 'Proof of permanent address of deceased',
    description: 'Option for radio group field: Type of Document To Upload',
    id: 'form.field.label.deceasedPrimaryAddressProof'
  },
  deceasedSexOther: {
    defaultMessage: 'Other',
    description: 'Option for form field: Sex name',
    id: 'form.field.label.deceasedSexOther'
  },
  deceasedTitle: {
    defaultMessage: 'What are the deceased details?',
    description: 'Form section title for Deceased',
    id: 'form.section.deceased.title'
  },
  defaultLabel: {
    defaultMessage: 'Label goes here',
    description: 'default label',
    id: 'form.field.label.defaultLabel'
  },
  deliveryAddress: {
    defaultMessage: 'Address of place of delivery',
    description: 'Label for form field: Address of place of delivery',
    id: 'form.field.label.deliveryAddress'
  },
  deliveryInstitution: {
    defaultMessage: 'Type or select institution',
    description: 'Label for form field: Type or select institution',
    id: 'form.field.label.deliveryInstitution'
  },
  deny: {
    defaultMessage: 'No',
    description: 'deny label for yes / no radio button',
    id: 'form.field.label.deny'
  },
  district: {
    defaultMessage: 'District',
    description: 'Title for the district select',
    id: 'form.field.label.district'
  },
  docTaxReceipt: {
    defaultMessage: 'Receipt of tax payment',
    description: 'Document type label for tax receipt',
    id: 'form.field.label.docTypeTaxReceipt'
  },
  docTypeBirthCert: {
    defaultMessage: 'Birth certificate',
    description: 'Label for select option birth certificate',
    id: 'form.field.label.docTypeBirthCert'
  },
  docTypeChildAgeProof: {
    defaultMessage: 'Proof of child age',
    description: 'Label for select option Child Age Proof',
    id: 'form.field.label.docTypeChildAgeProof'
  },
  docTypeChildBirthProof: {
    defaultMessage: 'Notification of birth',
    description: 'Label for select option Notification of birth',
    id: 'form.field.label.docTypeChildBirthProof'
  },
  docTypeMarriageNotice: {
    defaultMessage: 'Notice of marriage',
    description: 'Label for document section for marriage notice',
    id: 'form.field.label.docTypeMarriageNotice'
  },
  docTypeCopyOfBurialReceipt: {
    defaultMessage: 'Certified copy of burial receipt',
    description: 'Label for select option Certified Copy of Burial Receipt',
    id: 'form.field.label.docTypeCopyOfBurialReceipt'
  },
  docTypeDeathCertificate: {
    defaultMessage: 'Attested certificate of death',
    description: 'Label for select option Attested Certificate of Death',
    id: 'form.field.label.docTypeDeathCertificate'
  },
  docTypeDoctorCertificate: {
    defaultMessage: 'Doctor certificate',
    description: 'Label for select option Doctor Certificate',
    id: 'form.field.label.docTypeDoctorCertificate'
  },
  docTypeEPICard: {
    defaultMessage: 'EPI card',
    description: 'Label for select option EPI Card',
    id: 'form.field.label.docTypeEPICard'
  },
  docTypeEPIStaffCertificate: {
    defaultMessage: 'EPI staff certificate',
    description: 'Label for select option EPI Card',
    id: 'form.field.label.docTypeEPIStaffCertificate'
  },
  docTypeFuneralReceipt: {
    defaultMessage: 'Certified copy of funeral receipt',
    description: 'Label for select option Certified Copy of Funeral Receipt',
    id: 'form.field.label.docTypeFuneralReceipt'
  },
  docTypeHospitalDeathCertificate: {
    defaultMessage: 'Hospital certificate of death',
    description: 'Label for select option Hospital certificate of death',
    id: 'form.field.label.docTypeHospitalDeathCertificate'
  },
  docTypeLetterOfDeath: {
    defaultMessage: 'Attested letter of death',
    description: 'Label for select option Attested Letter of Death',
    id: 'form.field.label.docTypeLetterOfDeath'
  },
  docTypeNID: {
    defaultMessage: 'National ID',
    description: 'Label for select option radio option NID',
    id: 'form.field.label.docTypeNID'
  },
  docTypeOther: {
    defaultMessage: 'Other',
    description: 'Label for radio option Other',
    id: 'form.field.label.docTypeOther'
  },
  docTypePassport: {
    defaultMessage: 'Passport',
    description: 'Label for radio option Passport',
    id: 'form.field.label.docTypePassport'
  },
  docTypePostMortemReport: {
    defaultMessage: 'Certified post mortem report',
    description: 'Label for select option Post Mortem Report',
    id: 'form.field.label.docTypePostMortemReport'
  },
  docTypeSC: {
    defaultMessage: 'School certificate',
    description: 'Label for radio option School Certificate',
    id: 'form.field.label.docTypeSC'
  },
  documentNumber: {
    defaultMessage: 'Document number',
    description: 'Label for document number input field',
    id: 'form.field.label.print.documentNumber'
  },
  documentsName: {
    defaultMessage: 'Documents',
    description: 'Form section name for Documents',
    id: 'form.section.documents.name'
  },
  documentsTitle: {
    defaultMessage: 'Attach supporting documents',
    description: 'Form section title for Documents',
    id: 'form.section.documents.title'
  },
  documentsUploadName: {
    defaultMessage: 'Documents Upload',
    description: 'Form section name for Documents Upload',
    id: 'form.section.upload.documentsName'
  },
  educationAttainmentISCED1: {
    defaultMessage: 'Primary',
    description: 'Option for form field: ISCED1 education',
    id: 'form.field.label.educationAttainmentISCED1'
  },
  educationAttainmentISCED4: {
    defaultMessage: 'Secondary',
    description: 'Option for form field: ISCED4 education',
    id: 'form.field.label.educationAttainmentISCED4'
  },
  educationAttainmentISCED5: {
    defaultMessage: 'Tertiary',
    description: 'Option for form field: ISCED5 education',
    id: 'form.field.label.educationAttainmentISCED5'
  },
  educationAttainmentNone: {
    defaultMessage: 'No schooling',
    description: 'Option for form field: no education',
    id: 'form.field.label.educationAttainmentNone'
  },
  enterResponse: {
    defaultMessage: 'Enter a response to your chosen security question',
    description: 'Label to input an answer to a security question',
    id: 'user.form.securityquestion.enterResponse'
  },
  familyName: {
    defaultMessage: 'Last name',
    description: 'Label for family name text input',
    id: 'form.field.label.familyName'
  },
  marriedLastName: {
    defaultMessage: 'Married Last name (if different)',
    description: 'Label for married last name text input',
    id: 'form.field.label.marriedLastName'
  },
  father: {
    defaultMessage: 'Father',
    description: 'Label for option Father',
    id: 'form.field.label.informantRelation.father'
  },
  fatherFamilyName: {
    defaultMessage: 'নামের শেষাংশ বাংলায়',
    description: 'Label for form field: Family name',
    id: 'form.field.label.fatherFamilyName'
  },
  fatherFirstNames: {
    defaultMessage: 'নামের প্রথমাংশ বাংলায়',
    description: 'Label for form field: First name',
    id: 'form.field.label.fatherFirstNames'
  },
  fatherName: {
    defaultMessage: 'Father',
    description: 'Form section name for Father',
    id: 'form.section.father.name'
  },
  mothersDetailsExist: {
    defaultMessage: "Mother's details are not available",
    description: "Question to ask the user if they have the mother's details",
    id: 'form.field.label.mothersDetailsExist'
  },
  fathersDetailsExist: {
    defaultMessage: "Father's details are not available",
    description: "Question to ask the user if they have the father's details",
    id: 'form.field.label.fathersDetailsExist'
  },
  fatherTitle: {
    defaultMessage: "Father's details",
    description: 'Form section title for Father',
    id: 'form.section.father.title'
  },
  fetchDeceasedDetails: {
    defaultMessage: "Retrieve Deceased's Details",
    description: 'Label for loader button',
    id: 'form.field.label.fetchDeceasedDetails'
  },
  fetchFatherDetails: {
    defaultMessage: "Retrieve Father's Details",
    description: 'Label for loader button',
    id: 'form.field.label.fetchFatherDetails'
  },
  fetchIdentifierModalErrorTitle: {
    defaultMessage: 'Invalid Id',
    description: 'Label for fetch modal error title',
    id: 'form.field.label.fetchIdentifierModalErrorTitle'
  },
  fetchIdentifierModalSuccessTitle: {
    defaultMessage: 'ID valid',
    description: 'Label for fetch modal success title',
    id: 'form.field.label.fetchIdentifierModalSuccessTitle'
  },
  fetchIdentifierModalTitle: {
    defaultMessage: 'Checking',
    description: 'Label for fetch modal title',
    id: 'form.field.label.fetchIdentifierModalTitle'
  },
  fetchInformantDetails: {
    defaultMessage: "Retrieve Informant's Details",
    description: 'Label for loader button',
    id: 'form.field.label.fetchInformantDetails'
  },
  fetchMotherDetails: {
    defaultMessage: 'VERIFY NATIONAL ID',
    description: 'Label for loader button',
    id: 'form.field.label.fetchMotherDetails'
  },
  fetchPersonByNIDModalErrorText: {
    defaultMessage:
      'National ID not found. Please enter a valid National ID and date of birth.',
    description: 'Label for fetch modal error title',
    id: 'form.field.label.fetchPersonByNIDModalErrorText'
  },
  fetchPersonByNIDModalNetworkErrorText: {
    defaultMessage:
      'The request to the NID system was unsuccessful. Please try again with a better connection.',
    description: 'Label for fetch modal error title',
    id: 'form.field.label.NIDNetErr'
  },
  fetchPersonByNIDModalInfo: {
    defaultMessage: 'National ID',
    description: 'Label for loader button',
    id: 'form.field.label.fetchPersonByNIDModalInfo'
  },
  fetchRegistrationModalErrorText: {
    defaultMessage: 'No registration found for provided BRN',
    description: 'Label for fetch modal error title',
    id: 'form.field.label.fetchRegistrationModalErrorText'
  },
  fetchRegistrationModalInfo: {
    defaultMessage: 'Birth Registration Number',
    description: 'Label for loader button',
    id: 'form.field.label.fetchRegistrationModalInfo'
  },
  firstNameBn: {
    defaultMessage: 'Bengali first name',
    description: 'Bengali first name',
    id: 'form.field.label.firstNameBN'
  },
  firstNameEn: {
    defaultMessage: 'English first name',
    description: 'English first name',
    id: 'form.field.label.firstNameEN'
  },
  givenNames: {
    defaultMessage: 'Given name',
    description: 'Label for given name text input',
    id: 'form.field.label.print.otherPersonGivenNames'
  },
  healthInstitution: {
    defaultMessage: 'Health Institution',
    description: 'Select item for Health Institution',
    id: 'form.field.label.healthInstitution'
  },
  hospital: {
    defaultMessage: 'Hospital',
    description: 'Select item for hospital',
    id: 'form.field.label.hospital'
  },
  iD: {
    defaultMessage: 'ID Number',
    description: 'Label for form field: ID Number',
    id: 'form.field.label.iD'
  },
  iDType: {
    defaultMessage: 'Type of ID',
    description: 'Label for form field: Type of ID',
    id: 'form.field.label.iDType'
  },
  iDTypeAlienNumber: {
    defaultMessage: 'Alien Number',
    description: 'Option for form field: Type of ID',
    id: 'form.field.label.iDTypeAlienNumber'
  },
  iDTypeBRN: {
    defaultMessage: 'Birth registration number (in English)',
    description: 'Option for form field: Type of ID',
    id: 'form.field.label.iDTypeBRN'
  },
  iDTypeDrivingLicense: {
    defaultMessage: 'Drivers License',
    description: 'Option for form field: Type of ID',
    id: 'form.field.label.iDTypeDrivingLicense'
  },
  iDTypeDRN: {
    defaultMessage: 'Death Registration Number',
    description: 'Option for form field: Type of ID',
    id: 'form.field.label.iDTypeDRN'
  },
  iDTypeNationalID: {
    defaultMessage: 'National ID number (in English)',
    description: 'Option for form field: Type of ID',
    id: 'form.field.label.iDTypeNationalID'
  },
  iDTypeNoId: {
    defaultMessage: 'No ID available',
    description: 'Option for form field: Type of ID',
    id: 'form.field.label.iDTypeNoID'
  },
  iDTypeOther: {
    defaultMessage: 'Other',
    description: 'Option for form field: Type of ID',
    id: 'form.field.label.iDTypeOther'
  },
  iDTypeOtherLabel: {
    defaultMessage: 'Other type of ID',
    description: 'Label for form field: Other type of ID',
    id: 'form.field.label.iDTypeOtherLabel'
  },
  iDTypePassport: {
    defaultMessage: 'Passport',
    description: 'Option for form field: Type of ID',
    id: 'form.field.label.iDTypePassport'
  },
  iDTypeRefugeeNumber: {
    defaultMessage: 'Refugee Number',
    description: 'Option for form field: Type of ID',
    id: 'form.field.label.iDTypeRefugeeNumber'
  },
  informantAttestation: {
    defaultMessage: 'Attestation of the informant, or',
    description: 'Attested document of the informant',
    id: 'form.section.documents.list.informantAttestation'
  },
  lastNameEn: {
    defaultMessage: 'English last name',
    description: 'English last name',
    id: 'form.field.label.lastNameEN'
  },
  manner: {
    defaultMessage: 'Manner of death',
    description: 'Label for form field: Manner of death',
    id: 'form.field.label.mannerOfDeath'
  },
  mannerAccident: {
    defaultMessage: 'Accident',
    description: 'Option for form field: Manner of death',
    id: 'form.field.label.mannerOfDeathAccident'
  },
  mannerHomicide: {
    defaultMessage: 'Homicide',
    description: 'Option for form field: Manner of death',
    id: 'form.field.label.mannerOfDeathHomicide'
  },
  mannerNatural: {
    defaultMessage: 'Natural causes',
    description: 'Option for form field: Manner of death',
    id: 'form.field.label.mannerOfDeathNatural'
  },
  mannerSuicide: {
    defaultMessage: 'Suicide',
    description: 'Option for form field: Manner of death',
    id: 'form.field.label.mannerOfDeathSuicide'
  },
  mannerUndetermined: {
    defaultMessage: 'Manner undetermined',
    description: 'Option for form field: Manner of death',
    id: 'form.field.label.mannerOfDeathUndetermined'
  },
  typeOfMarriage: {
    defaultMessage: 'Type of marriage',
    description: 'Option for form field: Type of marriage',
    id: 'form.field.label.typeOfMarriage'
  },
  polygamy: {
    defaultMessage: 'Polygamous',
    description: 'Option for form field: Polygamy',
    id: 'form.field.label.polygamy'
  },
  monogamy: {
    defaultMessage: 'Monogamous',
    description: 'Option for form field: Monogamy',
    id: 'form.field.label.monogamy'
  },
  maritalStatus: {
    defaultMessage: 'Marital status',
    description: 'Label for form field: Marital status',
    id: 'form.field.label.maritalStatus'
  },
  maritalStatusSeparated: {
    id: 'form.field.label.maritalStatusSeparated',
    defaultMessage: 'Separated',
    description: 'Option for form field: Marital status'
  },
  maritalStatusDivorced: {
    defaultMessage: 'Divorced',
    description: 'Option for form field: Marital status',
    id: 'form.field.label.maritalStatusDivorced'
  },
  maritalStatusMarried: {
    defaultMessage: 'Married',
    description: 'Option for form field: Marital status',
    id: 'form.field.label.maritalStatusMarried'
  },
  maritalStatusNotStated: {
    defaultMessage: 'Not stated',
    description: 'Option for form field: Marital status',
    id: 'form.field.label.maritalStatusNotStated'
  },
  maritalStatusSingle: {
    defaultMessage: 'Single',
    description: 'Option for form field: Marital status',
    id: 'form.field.label.maritalStatusSingle'
  },
  maritalStatusWidowed: {
    defaultMessage: 'Widowed',
    description: 'Option for form field: Marital status',
    id: 'form.field.label.maritalStatusWidowed'
  },
  medicallyCertified: {
    defaultMessage: 'Medically Certified Cause of Death',
    description: 'Option for form field: Method of Cause of Death',
    id: 'form.field.label.medicallyCertified'
  },
  methodOfCauseOfDeath: {
    defaultMessage: 'Method of Cause of Death',
    description: 'Label for form field: Method of Cause of Death',
    id: 'form.field.label.methodOfCauseOfDeath'
  },
  mother: {
    defaultMessage: 'Mother',
    description: 'Label for option Mother',
    id: 'form.field.label.informantRelation.mother'
  },
  educationAttainment: {
    defaultMessage: 'Level of education',
    description: 'Label for form field: Education Attainment',
    id: 'form.field.label.educationAttainment'
  },
  motherFamilyName: {
    defaultMessage: 'Last name',
    description: 'Label for form field: Family name',
    id: 'form.field.label.motherFamilyName'
  },
  motherFirstNames: {
    defaultMessage: 'First name(s)',
    description: 'Label for form field: First names',
    id: 'form.field.label.motherFirstNames'
  },
  motherName: {
    defaultMessage: 'Mother',
    description: 'Form section name for Mother',
    id: 'form.section.mother.name'
  },
  motherTitle: {
    defaultMessage: "Mother's details",
    description: 'Form section title for Mother',
    id: 'form.section.mother.title'
  },
  groomName: {
    defaultMessage: 'Groom',
    description: 'Form section name for Groom',
    id: 'form.section.groom.name'
  },
  groomTitle: {
    defaultMessage: "Groom's details",
    description: 'Form section title for Groom',
    id: 'form.section.groom.title'
  },
  brideName: {
    defaultMessage: 'Bride',
    description: 'Form section name for Bride',
    id: 'form.section.bride.name'
  },
  brideTitle: {
    defaultMessage: "Bride's details",
    description: 'Form section title for Bride',
    id: 'form.section.bride.title'
  },
  headOfGroomFamily: {
    defaultMessage: "Head of groom's family",
    description: 'Form select option for witness relationship',
    id: 'form.section.groom.headOfGroomFamily'
  },
  headOfBrideFamily: {
    defaultMessage: "Head of bride's family",
    description: 'Form select option for witness relationship',
    id: 'form.section.bride.headOfBrideFamily'
  },
  multipleBirth: {
    defaultMessage: 'No. of previous births',
    description: 'Label for form field: multipleBirth',
    id: 'form.field.label.multipleBirth'
  },
  nationality: {
    defaultMessage: 'Nationality',
    description: 'Label for form field: Nationality',
    id: 'form.field.label.nationality'
  },
  nationalityBangladesh: {
    defaultMessage: 'Bangladesh',
    description: 'Option for form field: Nationality',
    id: 'form.field.label.father.nationalityBangladesh'
  },
  NID: {
    defaultMessage: 'NID',
    description: 'National ID',
    id: 'form.field.label.NID'
  },
  officeLocationId: {
    defaultMessage: 'Id: {locationId}',
    description: 'The location Id column',
    id: 'form.field.SearchField.officeLocationId'
  },
  optionalLabel: {
    defaultMessage: 'Optional',
    description: 'Optional label',
    id: 'form.field.label.optionalLabel'
  },
  otherDocuments: {
    defaultMessage:
      'Attested copy(s) of the document as prescribed by the Registrar',
    description: 'Attested copy(s) of the document',
    id: 'form.section.documents.list.otherDocuments'
  },
  otherHealthInstitution: {
    defaultMessage: 'Other Health Institution',
    description: 'Select item for Other Health Institution',
    id: 'form.field.label.otherHealthInstitution'
  },
  otherInstitution: {
    defaultMessage: 'Other',
    description: 'Select item for Other location',
    id: 'form.field.label.otherInstitution'
  },
  otherOption: {
    defaultMessage: 'Other',
    description: 'Other option for select',
    id: 'form.field.label.otherOption'
  },
  documentsParagraph: {
    defaultMessage:
      'For birth regiatration of children below 5 years old, one of the documents listed below is required:',
    description: 'Documents Paragraph text',
    id: 'form.section.documents.birth.requirements'
  },
  paragraphTargetDaysTo5Years: {
    defaultMessage:
      'For birth regiatration of children below 5 years old, one of the documents listed below is required:',
    description: 'Documents Paragraph text',
    id: 'form.section.documents.paragraphTargetDaysTo5Years'
  },
  paragraphAbove5Years: {
    defaultMessage:
      'For birth regiatration of children below 5 years old, one of the documents listed below is required:',
    description: 'Documents Paragraph text',
    id: 'form.section.documents.paragraphAbove5Years'
  },
  deceasedPrimaryAddress: {
    defaultMessage: 'Usual place of residence',
    description: 'Title for the primary address fields for the deceased',
    id: 'form.field.label.deceasedPrimaryAddress'
  },
  deceasedSecondaryAddress: {
    defaultMessage: 'Secondary address?',
    description: 'Title for the secondary address fields for the deceased',
    id: 'form.field.label.deceasedSecondaryAddress'
  },
  deceasedSecondaryAddressSameAsPrimary: {
    defaultMessage:
      'Was their secondary address the same as their primary address?',
    description:
      'Title for the checkbox for the deceased secondary address being the same as the primary address',
    id: 'form.field.label.deceasedSecondaryAddressSameAsPrimary'
  },
  informantSecondaryAddressSameAsPrimary: {
    defaultMessage:
      'Is their secondary address the same as their primary address?',
    description:
      'Title for the checkbox for the informant secondary address being the same as the informant primary address',
    id: 'form.field.label.informantSecondaryAddressSameAsPrimary'
  },
  informantSecondaryAddress: {
    defaultMessage: 'Secondary Address',
    description: 'Title for the secondary address fields for the informant',
    id: 'form.field.label.informantSecondaryAddress'
  },
  informantPrimaryAddress: {
    defaultMessage: 'Usual place of residence',
    description: 'Title for the primary address fields for the informant',
    id: 'form.field.label.informantPrimaryAddress'
  },
  primaryAddressSameAsCurrent: {
    defaultMessage:
      'Is the permanent address the same as their current address?',
    description:
      'Title for the radio button to select that the informants current address is the same as their permanent address',
    id: 'form.field.label.appCurrAddSameAsPerm'
  },
  primaryAddressSameAsOtherPrimary: {
    defaultMessage: "Same as mother's usual place of residence?",
    description:
      "Title for the radio button to select that the persons primary address is the same as the mother's primary address",
    id: 'form.field.label.primaryAddressSameAsOtherPrimary'
  },
  phoneNumber: {
    defaultMessage: 'Phone number',
    description: 'Input label for phone input',
    id: 'form.field.label.phoneNumber'
  },
  phoneVerificationWarning: {
    defaultMessage:
      'Check with the informant that the mobile phone number you have entered is correct',
    description: 'Warning message to verify informant phone number ',
    id: 'form.field.label.app.phoneVerWarn'
  },
  placeOfBirth: {
    defaultMessage: 'Location',
    description: 'Label for form field: Place of delivery',
    id: 'form.field.label.placeOfBirth'
  },
  nameInEnglishPreviewGroup: {
    defaultMessage: 'Full name',
    description: 'Label for child name in english',
    id: 'form.preview.group.label.english.name'
  },
  postCode: {
    defaultMessage: 'Postcode',
    description: 'Title for the postcode field',
    id: 'form.field.label.postCode'
  },
  presentBoth: {
    defaultMessage: 'Both Parents',
    description: 'Label for "Both Parents" select option',
    id: 'form.field.label.declaration.whoIsPresent.both'
  },
  presentFather: {
    defaultMessage: 'Father',
    description: 'Label for "Father" select option',
    id: 'form.field.label.declaration.whoIsPresent.father'
  },
  presentMother: {
    defaultMessage: 'Mother',
    description: 'Label for "Mother" select option',
    id: 'form.field.label.declaration.whoIsPresent.mother'
  },
  presentOther: {
    defaultMessage: 'Other',
    description: 'Label for "Other" select option',
    id: 'form.field.label.declaration.whoIsPresent.other'
  },
  privateHome: {
    defaultMessage: 'Residential address',
    description: 'Select item for Private Home',
    id: 'form.field.label.privateHome'
  },
  prompt: {
    defaultMessage:
      'Because there are no details of this person on record, we need to capture their details:',
    description:
      'Labal for prompt in case of other person collects certificate',
    id: 'form.field.label.print.otherPersonPrompt'
  },
  proofOfBirth: {
    defaultMessage: 'Proof of birth',
    description: 'Label for list item Proof of birth',
    id: 'form.field.label.proofOfBirth'
  },
  proofOfMarriageNotice: {
    defaultMessage: 'Notice of intention to marriage',
    description: 'Label for list item notice of marriage',
    id: 'form.field.label.proofOfMarriageNotice'
  },
  proofOfDocCertificateOfChild: {
    defaultMessage:
      "Certificate from doctor to prove child's age OR School certificate",
    description: 'Label for list item Doctor Certificate',
    id: 'form.field.label.proofOfDocCertificateOfChild'
  },
  proofOfEPICardOfChild: {
    defaultMessage: 'EPI Card of Child',
    description: 'Label for list item EPI Card of Child',
    id: 'form.field.label.proofOfEPICardOfChild'
  },
  proofOfFathersID: {
    defaultMessage: "Father's identity",
    description: 'Label for list item Father ID Proof',
    id: 'form.field.label.proofOfFathersID'
  },
  proofOfMothersID: {
    defaultMessage: "Mother's identity",
    description: 'Label for list item Mother ID Proof',
    id: 'form.field.label.proofOfMothersID'
  },
  proofOfGroomsID: {
    defaultMessage: "Proof of Groom's identity",
    description: 'Label for list item Groom ID Proof',
    id: 'form.field.label.proofOfGroomsID'
  },
  proofOfBridesID: {
    defaultMessage: "Proof of Bride's identity",
    description: 'Label for list item Bride ID Proof',
    id: 'form.field.label.proofOfBridesID'
  },
  proofOfParentPrimaryAddress: {
    defaultMessage: 'Proof of Primary Address of Parent',
    description: 'Label for list item Parent Primary Address Proof',
    id: 'form.field.label.proofOfParentPrimaryAddress'
  },
  registrationName: {
    defaultMessage: 'Registration',
    description: 'Form section name for Registration',
    id: 'form.section.declaration.name'
  },
  registrationOffice: {
    defaultMessage: 'Registration Office',
    description: 'Registration office',
    id: 'form.field.label.registrationOffice'
  },
  registrationPhoneLabel: {
    defaultMessage: 'Phone number',
    description: 'Input label for phone input',
    id: 'form.field.label.declaration.phone'
  },
  registrationTitle: {
    defaultMessage: 'Registration',
    description: 'Form section title for Registration',
    id: 'form.section.declaration.title'
  },
  relationExtendedFamily: {
    defaultMessage: 'Extended Family',
    description: 'Label for option Extended Family',
    id: 'form.field.label.informantRelation.extendedFamily'
  },
  relationOther: {
    defaultMessage: 'Other (Specify)',
    description: 'Label for option Other',
    id: 'form.field.label.informantRelation.other'
  },
  relationshipPlaceHolder: {
    defaultMessage: 'eg. Grandmother',
    description: 'Relationship place holder',
    id: 'form.field.label.relationshipPlaceHolder'
  },
  changeButtonLabel: {
    id: 'form.field.SearchField.changeButtonLabel',
    defaultMessage: `{fieldName, select, registrationOffice {Change assigned office} other {Change health institute}}`,
    description: 'Edit button text'
  },
  searchFieldModalTitle: {
    id: 'form.field.SearchField.modalTitle',
    defaultMessage: `{fieldName, select, registrationOffice {Assigned Registration Office} other {Health institutions}}`,
    description: 'Modal title'
  },
  searchFieldPlaceHolderText: {
    defaultMessage: 'Search',
    description: 'Place holder text ',
    id: 'form.field.SearchField.placeHolderText'
  },
  formSelectPlaceholder: {
    defaultMessage: 'Select',
    description: 'Placeholder text for a select',
    id: 'form.field.select.placeholder'
  },
  securityQuestionLabel: {
    defaultMessage: 'Security question {count}',
    description: 'Label to describe number of security questions entered',
    id: 'user.form.securityquestion.securityQuestionLabel'
  },
  select: {
    defaultMessage: 'Select',
    description: 'Placeholder text for a select',
    id: 'form.field.select.placeholder'
  },
  selectOne: {
    defaultMessage: 'Please select an option',
    description: 'Generic label for select on option',
    id: 'form.field.label.selectOne'
  },
  selectSecurityQuestion: {
    defaultMessage: 'Select a security question',
    description: 'Label to select a security question',
    id: 'user.form.securityquestion.selectSecurityQuestion'
  },
  self: {
    defaultMessage: 'Self',
    description: 'The title that appears when selecting self as informant',
    id: 'form.field.label.self'
  },
  signedAffidavitConfirmation: {
    defaultMessage: 'Do they have a signed affidavit?',
    description: 'Label for signed affidavit confirmation radio group',
    id: 'form.field.label.print.signedAffidavit'
  },
  informantRelation: {
    defaultMessage: 'Who is the informant?',
    description: 'Form section title for contact point',
    id: 'register.selectInformant.relation'
  },
  someoneElse: {
    defaultMessage: 'Someone else',
    description: 'Other Label',
    id: 'form.field.label.someoneElse'
  },
  someoneElseCollector: {
    defaultMessage: 'Print and issue to someone else',
    description: 'Other Label',
    id: 'form.field.label.someoneElseCollector'
  },
  son: {
    defaultMessage: 'Son',
    description: 'Label for option Son',
    id: 'form.field.label.informantRelation.son'
  },
  sonInLaw: {
    defaultMessage: 'Son in law',
    description: 'Label for option Son in law',
    id: 'form.field.label.informantRelation.sonInLaw'
  },
  grandson: {
    defaultMessage: 'Grandson',
    description: 'Label for option Grandson',
    id: 'form.field.label.informantRelation.grandson'
  },
  grandfather: {
    defaultMessage: 'Grandfather',
    description: 'Label for option Grandfather',
    id: 'form.field.label.informantRelation.grandfather'
  },
  otherFamilyMember: {
    defaultMessage: 'Other family member',
    description: 'Label for option Other family member',
    id: 'form.field.label.relationOtherFamilyMember'
  },
  grandmother: {
    defaultMessage: 'Grandmother',
    description: 'Label for option Grandmother',
    id: 'form.field.label.informantRelation.grandmother'
  },
  brother: {
    defaultMessage: 'Brother',
    description: 'Label for option brother',
    id: 'form.field.label.informantRelation.brother'
  },
  sister: {
    defaultMessage: 'Sister',
    description: 'Label for option Sister',
    id: 'form.field.label.informantRelation.sister'
  },
  legalGuardian: {
    defaultMessage: 'Legal guardian',
    description: 'Label for option Legal Guardian',
    id: 'form.field.label.informantRelation.legalGuardian'
  },
  spouse: {
    defaultMessage: 'Spouse',
    description: 'Label for option Spouse',
    id: 'form.field.label.informantRelation.spouse'
  },
  headOfTheInstitute: {
    defaultMessage: 'Head of the institution where the death occurred',
    description: 'Option for form field: Head of the institute',
    id: 'form.field.label.informantRelation.headInst'
  },
  driverOfTheVehicle: {
    defaultMessage:
      'Driver or operator of the land or water vehicle or aircraft where the death occurred',
    description: 'Option for form field: Driver of the vehicle',
    id: 'form.field.label.informantRelation.driver'
  },
  ownerOfTheHouse: {
    defaultMessage: 'Owner of the house or building where the death occurred',
    description: 'Option for form field: Owner of the house',
    id: 'form.field.label.informantRelation.owner'
  },
  officerInCharge: {
    defaultMessage:
      'Officer-in-charge of the Thana of a road or public space where the death occurred',
    description: 'Option for form field: Officer-in-charge',
    id: 'form.field.label.informantRelation.officer'
  },
  state: {
    defaultMessage: 'Division',
    description: 'Title for the state select',
    id: 'form.field.label.state'
  },
  internationalState: {
    defaultMessage: 'State',
    description: 'Title for the international address state field',
    id: 'form.field.label.internationalState'
  },
  internationalDistrict: {
    defaultMessage: 'District',
    description: 'Title for the international address district field',
    id: 'form.field.label.internationalDistrict'
  },
  internationalCity: {
    defaultMessage: 'City / Town',
    description: 'Title for the international address city field',
    id: 'form.field.label.internationalCity'
  },
  internationalAddressLine1: {
    defaultMessage: 'Address Line 1',
    description: 'Title for the international address line 1 field',
    id: 'form.field.label.internationalAddressLine1'
  },
  internationalAddressLine2: {
    defaultMessage: 'Address Line 2',
    description: 'Title for the international address line 2 field',
    id: 'form.field.label.internationalAddressLine2'
  },
  internationalAddressLine3: {
    defaultMessage: 'Address Line 3',
    description: 'Title for the international address line 3 field',
    id: 'form.field.label.internationalAddressLine3'
  },
  internationalPostcode: {
    defaultMessage: 'Postcode / Zip',
    description: 'Title for the international address postcode field',
    id: 'form.field.label.internationalPostcode'
  },
  typeOfDocument: {
    defaultMessage: 'Choose type of document',
    description: 'Label for Select Form Field: Type of Document',
    id: 'form.field.label.typeOfDocument'
  },
  uploadDocForChild: {
    defaultMessage: 'Child',
    description: 'Label for radio option Child',
    id: 'form.field.label.uploadDocForChild'
  },
  uploadDocForFather: {
    defaultMessage: 'Father',
    description: 'Label for radio option Father',
    id: 'form.field.label.uploadDocForFather'
  },
  uploadDocForMother: {
    defaultMessage: 'Mother',
    description: 'Label for radio option Mother',
    id: 'form.field.label.uploadDocForMother'
  },
  uploadDocForOther: {
    defaultMessage: 'Other',
    description: 'Label for radio option Other',
    id: 'form.field.label.uploadDocForOther'
  },
  uploadDocForWhom: {
    defaultMessage: 'Whose suppoting document are you uploading?',
    description: 'Question to ask user, for whom, documents are being uploaded',
    id: 'form.field.label.uploadDocForWhom'
  },
  uploadedList: {
    defaultMessage: 'Uploaded:',
    description: 'label for uploaded list',
    id: 'form.field.label.imageUpload.uploadedList'
  },
  uploadImage: {
    defaultMessage: 'Upload a photo of the supporting document',
    description: 'Title for the upload image button',
    id: 'form.section.documents.uploadImage'
  },
  userDetails: {
    defaultMessage: 'User details',
    description: 'User details section',
    id: 'form.section.userDetails'
  },
  userDevice: {
    defaultMessage: 'Device',
    description: 'User device',
    id: 'form.field.label.userDevice'
  },
  userFormReviewTitle: {
    defaultMessage: 'Please review the new users details',
    description: 'The title of the review page of the user form',
    id: 'form.section.user.preview.title'
  },
  userFormSecurityQuestionsDescription: {
    defaultMessage:
      'From the drop down lists below, select questions that can be used later to confirm your identity should you forget your password.',
    description: 'Description for the security questions form',
    id: 'user.form.securityquestion.description'
  },
  userFormSecurityQuestionsHeading: {
    defaultMessage: 'Set your security questions',
    description: 'Subtitle for the security questions form',
    id: 'user.form.securityquestion.heading'
  },
  userFormSecurityQuestionsTitle: {
    defaultMessage: 'Security questions',
    description: 'Title for the security questions form',
    id: 'user.form.securityquestion.title'
  },
  userFormTitle: {
    defaultMessage: 'Create new user',
    description: 'The title of user form',
    id: 'form.section.user.title'
  },
  verbalAutopsyReport: {
    defaultMessage: 'Verbal autopsy report',
    description: 'Option for form field: verbalAutopsyReport',
    id: 'form.field.label.verbalAutopsyReport'
  },
  verbalAutopsy: {
    defaultMessage: 'Verbal autopsy',
    description: 'Option for form field: verbalAutopsy',
    id: 'form.field.label.verbalAutopsy'
  },
  warningNotVerified: {
    defaultMessage:
      'Please be aware that if you proceed you will be responsible for issuing a certificate without the necessary proof of ID from the collector.',
    description: 'Label for warning message when the collector is not verified',
    id: 'form.field.label.print.warningNotVerified'
  },
  weightAtBirth: {
    defaultMessage: 'Weight at birth',
    description: 'Label for form field: Weight at birth',
    id: 'form.field.label.weightAtBirth'
  },
  ageOfMother: {
    defaultMessage: 'Age of mother',
    description: 'Label for form field: Age of mother',
    id: 'form.field.label.ageOfMother'
  },
  ageOfFather: {
    defaultMessage: 'Age of father',
    description: 'Label for form field: Age of father',
    id: 'form.field.label.ageOfFather'
  },
  ageOfInformant: {
    defaultMessage: 'Age of informant',
    description: 'Label for form field: Age of informant',
    id: 'form.field.label.ageOfInformant'
  },
  ageOfDeceased: {
    defaultMessage: 'Age of deceased',
    description: 'Label for form field: Age of deceased',
    id: 'form.field.label.ageOfDeceased'
  },
  ageOfGroom: {
    defaultMessage: 'Age of groom',
    description: 'Label for form field: Age of groom',
    id: 'form.field.label.ageOfGroom'
  },
  ageOfBride: {
    defaultMessage: 'Age of bride',
    description: 'Label for form field: Age of bride',
    id: 'form.field.label.ageOfBride'
  },
  placeOfBirthPreview: {
    defaultMessage: 'Place of delivery',
    description: 'Title for place of birth sub section',
    id: 'form.field.label.placeOfBirthPreview'
  },
  whatDocToUpload: {
    defaultMessage: 'Which document type are you uploading?',
    description:
      'Question to ask user, what type of documents are being uploaded',
    id: 'form.field.label.whatDocToUpload'
  },
  whoIsPresentLabel: {
    defaultMessage: 'Who is present for the registration',
    description: 'Input label for who is present input',
    id: 'form.field.label.declaration.whoIsPresent'
  },
  whoseContactDetailsLabel: {
    defaultMessage: 'Who is the contact person for this declaration?',
    description: 'Input label for contact details person',
    id: 'form.field.label.declaration.whoseContactDetails'
  },
  userSignatureAttachmentTitle: {
    defaultMessage: 'Attach the signature',
    description: 'Title for user signature attachment',
    id: 'form.field.label.userSignatureAttachmentTitle'
  },
  userSignatureAttachment: {
    defaultMessage: 'User’s signature',
    description: 'Input label for user signature attachment',
    id: 'form.field.label.userSignatureAttachment'
  },
  userSignatureAttachmentDesc: {
    defaultMessage:
      'Ask the user to sign a piece of paper and then scan or take a photo.',
    description: 'Description for user signature attachment',
    id: 'form.field.label.userSignatureAttachmentDesc'
  },
  userAttachmentSection: {
    defaultMessage: 'Attachments',
    description: 'label for user signature attachment',
    id: 'form.field.label.userAttachmentSection'
  },
  addFile: {
    defaultMessage: 'Add file',
    description: 'text for add file button',
    id: 'form.field.label.addFile'
  },
  uploadFile: {
    defaultMessage: 'Upload',
    description: 'text for file uploader button',
    id: 'form.field.label.uploadFile'
  },
  fileUploadError: {
    defaultMessage: '{type} supported image only',
    description: 'text for error on file upload',
    id: 'form.field.label.fileUploadError'
  },
  fileSizeError: {
    defaultMessage: 'File size must be less than 2MB',
    description: 'text for error on file size',
    id: 'form.field.label.fileSizeError'
  },
  typeOfId: {
    defaultMessage: 'Type of ID',
    description: "Input label for certificate collector's id type options",
    id: 'form.field.label.typeOfId'
  },
  firstName: {
    defaultMessage: 'First name',
    description: "Input label for certificate collector's first name",
    id: 'form.field.label.firstName'
  },
  lastName: {
    defaultMessage: 'Last name',
    description: "Input label for certificate collector's last name",
    id: 'form.field.label.lastName'
  },
  relationship: {
    defaultMessage: 'Relationship',
    description:
      "Input label for certificate collector's relationship to the subject",
    id: 'form.field.label.relationship'
  },
  relationshipToSpouses: {
    defaultMessage: 'Relationship to spouses',
    description: "Input label for witness's relationship with spouses",
    id: 'form.field.label.relationshipToSpouses'
  },
  parentDetailsType: {
    defaultMessage: "Do you have the mother and father's details?",
    description: 'Question to ask the user if they have the parents details',
    id: 'form.field.label.parentDetailsType'
  },
  motherRadioButton: {
    defaultMessage: "Only the mother's",
    description: 'confirmation label for mother radio button',
    id: 'form.field.label.radio.mother'
  },
  fatherRadioButton: {
    defaultMessage: "Only the father's",
    description: 'confirmation label for father radio button',
    id: 'form.field.label.radio.father'
  },
  reasonNA: {
    defaultMessage: 'Reason',
    description: 'Label for form field: reasonNotApplying',
    id: 'form.field.label.reasonNotApplying'
  },
  reasonMNAPreview: {
    defaultMessage: 'Reason for mother not applying',
    description: 'Label for form field: reasonMotherNotApplyingPreview',
    id: 'form.field.label.reasonMotherNotApplyingPreview'
  },
  reasonFNAPreview: {
    defaultMessage: 'Reason for father not applying',
    description: 'Label for form field: reasonFatherNotApplyingPreview',
    id: 'form.field.label.reasonFatherNotApplyingPreview'
  },
  reasonParentsNotApplying: {
    defaultMessage: 'Why are the mother and father not applying?',
    description: 'Form group name for reason parents are not applying',
    id: 'form.group.reasonNotApplying.parents'
  },
  motherDeceasedLabel: {
    defaultMessage: 'Mother has died',
    description: 'Label for form field: motherIsDeceased',
    id: 'form.field.label.motherIsDeceased'
  },
  fatherDeceasedLabel: {
    defaultMessage: 'Father has died',
    description: 'Label for form field: fatherIsDeceased',
    id: 'form.field.label.fatherIsDeceased'
  },
  motherCaregiverTypeLabel: {
    defaultMessage: 'Mother',
    description: 'label for mother radio button',
    id: 'form.field.label.caregiver.mother'
  },
  fatherCaregiverTypeLabel: {
    defaultMessage: 'Father',
    description: 'label for father radio button',
    id: 'form.field.label.caregiver.father'
  },
  parentsCaregiverTypeLabel: {
    defaultMessage: 'Mother and father',
    description: 'label for parents radio button',
    id: 'form.field.label.caregiver.parents'
  },
  legalGuardianCaregiverTypeLabel: {
    defaultMessage: 'Legal Guardian',
    description: 'label for legal guardian radio button',
    id: 'form.field.label.caregiver.legalGuardian'
  },
  informantCaregiverTypeLabel: {
    defaultMessage: 'Informant is the primary caregiver',
    description: 'label for informant radio button',
    id: 'form.field.label.caregiver.informant'
  },
  otherCaregiverTypeLabel: {
    defaultMessage: 'Other caregiver',
    description: 'label for other caregiver radio button',
    id: 'form.field.label.caregiver.other'
  },
  nameFieldLabel: {
    defaultMessage: 'Name',
    description: 'Label for form field: name',
    id: 'form.field.label.name'
  },
  tooltipNationalID: {
    defaultMessage:
      'The National ID can only be numeric and must be 10 digits long',
    description: 'Tooltip for form field: iD number',
    id: 'form.field.tooltip.tooltipNationalID'
  },
  dateRangePickerCheckboxLabel: {
    defaultMessage: '{rangeStart} to {rangeEnd}',
    description: 'Label for daterange picker checkbox',
    id: 'form.field.dateRangepicker.checkbox.dateLabel'
  },
  deceasedFatherSectionName: {
    defaultMessage: "What is the deceased's father name?",
    description: 'Form section name for father section',
    id: 'form.section.deceased.father.name'
  },
  deceasedFatherSectionTitle: {
    defaultMessage: "Father's details",
    description: 'Form section name for father section',
    id: 'form.section.deceased.father.title'
  },
  deceasedFathersFamilyName: {
    defaultMessage: 'নামের শেষাংশ বাংলায়',
    description: 'Label for form field: Family name',
    id: 'form.field.label.deceasedFathersFamilyName'
  },
  deceasedFathersFamilyNameEng: {
    defaultMessage: 'Last Name(s) in English',
    description: 'Label for form field: Family name in english',
    id: 'form.field.label.deceasedFathersFamilyNameEng'
  },
  deceasedFathersGivenNames: {
    defaultMessage: 'নামের প্রথমাংশ বাংলায়',
    description: 'Label for form field: Given names',
    id: 'form.field.label.deceasedFathersGivenNames'
  },
  deceasedFathersGivenNamesEng: {
    defaultMessage: 'First Name(s) in English',
    description: 'Label for form field: Given names in english',
    id: 'form.field.label.deceasedFathersGivenNamesEng'
  },
  deceasedMotherSectionName: {
    defaultMessage: "What is the deceased's mother name?",
    description: 'Form section name for mother section',
    id: 'form.section.deceased.mother.name'
  },
  deceasedMotherSectionTitle: {
    defaultMessage: "Mother's details",
    description: 'Form section name for mother section',
    id: 'form.section.deceased.mother.title'
  },
  deceasedMothersFamilyName: {
    defaultMessage: 'নামের শেষাংশ বাংলায়',
    description: 'Label for form field: Family name',
    id: 'form.field.label.deceasedMothersFamilyName'
  },
  deceasedMothersFamilyNameEng: {
    defaultMessage: 'Last Name(s) in English',
    description: 'Label for form field: Family name in english',
    id: 'form.field.label.deceasedMothersFamilyNameEng'
  },
  deceasedMothersGivenNames: {
    defaultMessage: 'নামের প্রথমাংশ বাংলায়',
    description: 'Label for form field: Given names',
    id: 'form.field.label.deceasedMothersGivenNames'
  },
  deceasedMothersGivenNamesEng: {
    defaultMessage: 'First Name(s) in English',
    description: 'Label for form field: Given names in english',
    id: 'form.field.label.deceasedMothersGivenNamesEng'
  },
  deceasedSpouseSectionName: {
    defaultMessage: 'Does the deceased have a spouse?',
    description: 'Form section name for spouse section',
    id: 'form.section.deceased.spouse.name'
  },
  deceasedSpouseSectionTitle: {
    defaultMessage: "Spouse's details",
    description: 'Form section name for spouse section',
    id: 'form.section.deceased.spouse.title'
  },
  deceasedHasSpouseDetails: {
    defaultMessage: 'Yes',
    description: 'Option for form field: Deceased has spouse',
    id: 'form.section.deceased.hasSpouse'
  },
  deceasedHasNoSpouseDetails: {
    defaultMessage: 'No / Unknown',
    description: "Option for form field: Deceased doesn't have spouse",
    id: 'form.section.deceased.noSpouse'
  },
  deceasedSpousesFamilyName: {
    defaultMessage: 'নামের শেষাংশ বাংলায়',
    description: 'Label for form field: Family name',
    id: 'form.field.label.deceasedSpousesFamilyName'
  },
  deceasedSpousesFamilyNameEng: {
    defaultMessage: 'Last Name(s) in English',
    description: 'Label for form field: Family name in english',
    id: 'form.field.label.deceasedSpousesFamilyNameEng'
  },
  deceasedSpousesGivenNames: {
    defaultMessage: 'নামের প্রথমাংশ বাংলায়',
    description: 'Label for form field: Given names',
    id: 'form.field.label.deceasedSpouseGivenNames'
  },
  deceasedSpousesGivenNamesEng: {
    defaultMessage: 'First Name(s) in English',
    description: 'Label for form field: Given names in english',
    id: 'form.field.label.deceasedSpousesGivenNamesEng'
  },
  certificatePrintInAdvance: {
    defaultMessage: 'Print in advance',
    description: 'Label for certificate collection option',
    id: 'form.field.label.certificatePrintInAdvance'
  },
  nationalIdOption: {
    defaultMessage: 'Birth registration number',
    description: 'Option for form field: Type of ID',
    id: 'form.field.option.iDTypeNationalID'
  },
  brnOption: {
    defaultMessage: 'National ID number',
    description: 'Option for form field: Type of ID',
    id: 'form.field.option.iDTypeBRN'
  },
  helperTextNID: {
    defaultMessage:
      'The National ID can only be numeric and must be 10 digits long',
    description: 'Helper text for nid input field',
    id: 'form.field.helpertext.nid'
  },
  emptyStringForSubSection: {
    defaultMessage: ' ',
    description: 'empty string',
    id: 'form.field.label.empty'
  },
  showLabel: {
    defaultMessage: 'Show',
    description: 'Show label for accordion component',
    id: 'form.field.showLabel'
  },
  hideLabel: {
    defaultMessage: 'Hide',
    description: 'Hide label for accordion component',
    id: 'form.field.hideLabel'
  },
  nidNotVerified: {
    defaultMessage: 'Authenticate',
    description: 'label for verified nid state',
    id: 'form.field.nidNotVerified'
  },
  nidVerified: {
    defaultMessage: 'Authenticated',
    description: 'label for unverified nid state',
    id: 'form.field.nidVerified'
  },
  nidOffline: {
    defaultMessage:
      'National ID authentication is currently not available offline.',
    description:
      'Label for indicating offline status for the user. NID verification is not currently available offline.',
    id: 'form.field.nidVerificationOngoing'
  },
  nidNotVerifiedReviewSection: {
    defaultMessage: 'Unauthenticated',
    description:
      'Label for indicating unauthenticated status for the a review section',
    id: 'form.field.nidNotVerifiedReviewSection'
  }
}

export const formMessages: IFormMessages = defineMessages(
  formMessageDescriptors
)
