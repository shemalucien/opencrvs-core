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

export enum QUESTION_KEYS {
  BIRTH_TOWN,
  HIGH_SCHOOL,
  MOTHER_NAME,
  FAVORITE_TEACHER,
  FAVORITE_MOVIE,
  FAVORITE_SONG,
  FAVORITE_FOOD,
  FIRST_CHILD_NAME
}
interface IUserMessages
  extends Record<string | number | symbol, MessageDescriptor> {
  accountTitle: MessageDescriptor
  BIRTH_TOWN: MessageDescriptor
  CHA: MessageDescriptor
  CHAIRMAN: MessageDescriptor
  changeLanguageMessege: MessageDescriptor
  changeLanguageSuccessMessage: MessageDescriptor
  changeLanguageTitle: MessageDescriptor
  DATA_ENTRY_CLERK: MessageDescriptor
  DISTRICT_REGISTRAR: MessageDescriptor
  ENTREPENEUR: MessageDescriptor
  FAVORITE_FOOD: MessageDescriptor
  FAVORITE_MOVIE: MessageDescriptor
  FAVORITE_SONG: MessageDescriptor
  FAVORITE_TEACHER: MessageDescriptor
  FIRST_CHILD_NAME: MessageDescriptor
  HEALTH_DIVISION: MessageDescriptor
  HIGH_SCHOOL: MessageDescriptor
  HOSPITAL: MessageDescriptor
  healthSystem: MessageDescriptor
  labelEnglishName: MessageDescriptor
  LOCAL_REGISTRAR: MessageDescriptor
  LOCAL_SYSTEM_ADMIN: MessageDescriptor
  MAYOR: MessageDescriptor
  MOTHER_NAME: MessageDescriptor
  NATIONAL_REGISTRAR: MessageDescriptor
  NATIONAL_SYSTEM_ADMIN: MessageDescriptor
  ORG_DIVISION: MessageDescriptor
  PERFORMANCE_MANAGEMENT: MessageDescriptor
  profileTitle: MessageDescriptor
  REGISTRATION_AGENT: MessageDescriptor
  SECRETARY: MessageDescriptor
  securityTitle: MessageDescriptor
  settingsTitle: MessageDescriptor
  STATE_REGISTRAR: MessageDescriptor
  API_USER: MessageDescriptor
  NOTIFICATION_API_USER: MessageDescriptor
  VALIDATOR_API_USER: MessageDescriptor
  AGE_VERIFICATION_API_USER: MessageDescriptor
  systemTitle: MessageDescriptor
  FIELD_AGENT: MessageDescriptor
  currentPassword: MessageDescriptor
  changePassword: MessageDescriptor
  changePasswordMessage: MessageDescriptor
  changePhoneTitle: MessageDescriptor
  verifyPhoneTitle: MessageDescriptor
  changePhoneLabel: MessageDescriptor
  verifyPhoneLabel: MessageDescriptor
  confirmationPhoneMsg: MessageDescriptor
  phoneNumberChangeFormValidationMsg: MessageDescriptor
  changeAvatar: MessageDescriptor
  changeImage: MessageDescriptor
  resizeAvatar: MessageDescriptor
  newPasswordLabel: MessageDescriptor
  passwordUpdateFormValidationMsg: MessageDescriptor
  passwordLengthCharacteristicsForPasswordUpdateForm: MessageDescriptor
  passwordCaseCharacteristicsForPasswordUpdateForm: MessageDescriptor
  passwordNumberCharacteristicsForPasswordUpdateForm: MessageDescriptor
  confirmPasswordLabel: MessageDescriptor
  matchedPasswordMsg: MessageDescriptor
  mismatchedPasswordMsg: MessageDescriptor
  confirmButtonLabel: MessageDescriptor
  requiredfield: MessageDescriptor
  incorrectPassword: MessageDescriptor
  incorrectVerifyCode: MessageDescriptor
  passwordUpdated: MessageDescriptor
  phoneNumberUpdated: MessageDescriptor
  avatarUpdating: MessageDescriptor
  avatarUpdated: MessageDescriptor
  name: MessageDescriptor
  systemLanguage: MessageDescriptor
  profileImage: MessageDescriptor
  duplicateUserMobileErrorMessege: MessageDescriptor
  enterPinLabel: MessageDescriptor
}
interface IDynamicUserMessages
  extends Record<string | number | symbol, MessageDescriptor> {
  [key: string]: MessageDescriptor
}

const messagesToDefine: IUserMessages = {
  accountTitle: {
    defaultMessage: 'Account',
    description: 'Account header',
    id: 'settings.account.tile'
  },
  BIRTH_TOWN: {
    defaultMessage: 'What city were you born in?',
    description: 'The description for BIRTH_TOWN key',
    id: 'userSetup.securityQuestions.birthTown'
  },
  CHA: {
    defaultMessage: 'CHA',
    description: 'The description for CHA type',
    id: 'constants.cha'
  },
  CHAIRMAN: {
    defaultMessage: 'Chairman',
    description: 'The description for CHAIRMAN type',
    id: 'constants.chairman'
  },
  changeLanguageMessege: {
    defaultMessage: 'Your prefered language that you want to use on OpenCRVS',
    description: 'Change language message',
    id: 'settings.message.changeLanguage'
  },
  changeLanguageSuccessMessage: {
    defaultMessage: 'Language updated to {language}',
    description: 'Change language success',
    id: 'settings.changeLanguage.success'
  },
  changeLanguageTitle: {
    defaultMessage: 'Change language',
    description: 'Change language title',
    id: 'settings.changeLanguage'
  },
  DATA_ENTRY_CLERK: {
    defaultMessage: 'Data entry clerk',
    description: 'The description for DATA_ENTRY_CLERK type',
    id: 'constants.dataEntryClerk'
  },
  DISTRICT_REGISTRAR: {
    defaultMessage: 'District Registrar',
    description: 'The description for DISTRICT_REGISTRAR role',
    id: 'constants.districtRegistrar'
  },
  POLICE_OFFICER: {
    defaultMessage: 'Police Officer',
    description: 'The description for Police Officer type',
    id: 'constants.policeOfficer'
  },
  SOCIAL_WORKER: {
    defaultMessage: 'Social Worker',
    description: 'The description for Social Worker type',
    id: 'constants.socialWorker'
  },
  LOCAL_LEADER: {
    defaultMessage: 'Local Leader',
    description: 'The description for Local Leader type',
    id: 'constants.localLeader'
  },
  HEALTHCARE_WORKER: {
    defaultMessage: 'Healthcare Worker',
    description: 'The description for Healthcare Worker type',
    id: 'constants.healthcareWorker'
  },
  DNRPC: {
    defaultMessage: 'DNRPC',
    description: 'The description for DNRPC type',
    id: 'constants.dnrpc'
  },
  ENTREPENEUR: {
    defaultMessage: 'Entrepeneur',
    description: 'The description for ENTREPENEUR type',
    id: 'constants.entrepeneur'
  },
  FAVORITE_FOOD: {
    defaultMessage: 'What is your favorite food?',
    description: 'The description for FAVORITE_FOOD key',
    id: 'userSetup.securityQuestions.favoriteFood'
  },
  FAVORITE_MOVIE: {
    defaultMessage: 'What is your favorite movie?',
    description: 'The description for FAVORITE_MOVIE key',
    id: 'userSetup.securityQuestions.favoriteMovie'
  },
  FAVORITE_SONG: {
    defaultMessage: 'What is your favorite song?',
    description: 'The description for FAVORITE_SONG key',
    id: 'userSetup.securityQuestions.favoriteSong'
  },
  FAVORITE_TEACHER: {
    defaultMessage: 'What is the name of your favorite school teacher?',
    description: 'The description for FAVORITE_TEACHER key',
    id: 'userSetup.securityQuestions.favoriteTeacher'
  },
  FIELD_AGENT: {
    defaultMessage: 'Field Agent',
    description: 'The description for FIELD_AGENT role',
    id: 'constants.fieldAgent'
  },
  FIRST_CHILD_NAME: {
    defaultMessage: "What is your first child's name?",
    description: 'The description for FIRST_CHILD_NAME key',
    id: 'userSetup.securityQuestions.firstChildName'
  },
  HEALTH_DIVISION: {
    defaultMessage: 'Health Division',
    description: 'The description for HEALTH_DIVISION type',
    id: 'constants.healthDivision'
  },
  HIGH_SCHOOL: {
    defaultMessage: 'What is the name of your high school?',
    description: 'The description for HIGH_SCHOOL key',
    id: 'userSetup.securityQuestions.hightSchool'
  },
  HOSPITAL: {
    defaultMessage: 'Hospital',
    description: 'The description for HOSPITAL type',
    id: 'userSetup.type.hospital'
  },
  healthSystem: {
    defaultMessage: 'Health System',
    description: 'The description for health system type',
    id: 'userSetup.type.healthSystem'
  },
  labelEnglishName: {
    defaultMessage: 'English name',
    description: 'English name label',
    id: 'settings.user.label.nameEN'
  },
  LOCAL_REGISTRAR: {
    defaultMessage: 'Registrar',
    description: 'The description for LOCAL_REGISTRAR role',
    id: 'constants.localRegistrar'
  },
  LOCAL_SYSTEM_ADMIN: {
    defaultMessage: 'Sysadmin',
    description: 'The description for Sysadmin role',
    id: 'home.header.localSystemAdmin'
  },
  MAYOR: {
    defaultMessage: 'Mayor',
    description: 'The description for MAYOR type',
    id: 'constants.mayor'
  },
  MOTHER_NAME: {
    defaultMessage: "What is your mother's name?",
    description: 'The description for MOTHER_NAME key',
    id: 'userSetup.securityQuestions.motherName'
  },
  NATIONAL_REGISTRAR: {
    defaultMessage: 'National Registrar',
    description: 'The description for NATIONAL_REGISTRAR role',
    id: 'constants.nationalRegistrar'
  },
  NATIONAL_SYSTEM_ADMIN: {
    defaultMessage: 'System admin (national)',
    description: 'The description for System admin (national)',
    id: 'constants.nationalSystemAdmin'
  },
  ORG_DIVISION: {
    defaultMessage: 'ORG Division',
    description: 'The description for ORG_DIVISION type',
    id: 'constants.orgDivision'
  },
  PERFORMANCE_MANAGEMENT: {
    defaultMessage: 'Performance Management',
    description: 'The description for Performance Management role',
    id: 'constants.performanceManagement'
  },
  profileTitle: {
    defaultMessage: 'Profile',
    description: 'Profile header',
    id: 'settings.profile.tile'
  },
  REGISTRATION_AGENT: {
    defaultMessage: 'Registration Agent',
    description: 'The description for REGISTRATION_AGENT role',
    id: 'constants.registrationAgent'
  },
  SECRETARY: {
    defaultMessage: 'Secretary',
    description: 'The description for SECRETARY type',
    id: 'constants.secretary'
  },
  securityTitle: {
    defaultMessage: 'Security',
    description: 'Security header',
    id: 'settings.security.tile'
  },
  settingsTitle: {
    defaultMessage: 'Settings',
    description: 'Title of the settings page',
    id: 'settings.title'
  },
  STATE_REGISTRAR: {
    defaultMessage: 'State Registrar',
    description: 'The description for STATE_REGISTRAR role',
    id: 'constants.stateRegistrar'
  },
  API_USER: {
    defaultMessage: 'API role',
    description: 'The description for API_USER role',
    id: 'constants.apiUser'
  },
  NOTIFICATION_API_USER: {
    defaultMessage: 'Notification API role',
    description: 'The description for NOTIFICATION_API_USER role',
    id: 'constants.notificationApiUser'
  },
  VALIDATOR_API_USER: {
    defaultMessage: 'Validator API role',
    description: 'The description for VALIDATOR_API_USER role',
    id: 'constants.validatorApiUser'
  },
  AGE_VERIFICATION_API_USER: {
    defaultMessage: 'Age verificatiion API role',
    description: 'The description for AGE_VERIFICATION_API_USER role',
    id: 'constants.ageVerificationApiUser'
  },
  systemTitle: {
    defaultMessage: 'System',
    description: 'System header',
    id: 'settings.system.tile'
  },
  currentPassword: {
    id: 'password.label.current',
    defaultMessage: 'Current password',
    description: 'Current password label'
  },
  changePassword: {
    defaultMessage: 'Change password',
    description: 'Password change modal header',
    id: 'settings.changePassword'
  },
  changePasswordMessage: {
    defaultMessage:
      'We recommend you create a unique password - one that you don’t use for another website or app. Note. You can’t reuse your old password once you change it.',
    description: 'Password change message',
    id: 'misc.newPass.instruction'
  },
  changePhoneTitle: {
    defaultMessage: 'Change phone number',
    description: 'Change phone number title',
    id: 'settings.changePhone'
  },
  verifyPhoneTitle: {
    defaultMessage: 'Verify phone number',
    description: 'Verify phone number title',
    id: 'settings.verifyPhone'
  },
  changePhoneLabel: {
    defaultMessage: 'What is your new number?',
    description: 'Change phone number label',
    id: 'phone.label.changeNumber'
  },
  verifyPhoneLabel: {
    defaultMessage: 'Enter 6 digit verification code',
    description: 'Verify phone number label',
    id: 'phone.label.verify'
  },
  confirmationPhoneMsg: {
    defaultMessage: 'A confirmational SMS has been sent to {num}',
    description: 'Confirmation phone number message',
    id: 'phone.label.confirmation'
  },
  phoneNumberChangeFormValidationMsg: {
    id: 'changePhone.validation.msg',
    defaultMessage:
      'Must be a valid {num} digit number that starts with {start}',
    description: 'Phone number validation message'
  },
  changeAvatar: {
    id: 'settings.changeAvatar',
    defaultMessage: 'Change profile image',
    description: 'Avatar change modal header'
  },
  changeImage: {
    id: 'settings.changeAvatar.changeImage',
    defaultMessage: 'Change image',
    description: 'Change image label'
  },
  resizeAvatar: {
    id: 'settings.changeAvatar.resizeAvatar',
    defaultMessage: 'Resize and position the chosen image.',
    description: 'Avatar resize and position message'
  },
  newPasswordLabel: {
    id: 'password.label.new',
    defaultMessage: 'New password:',
    description: 'New password label'
  },
  passwordUpdateFormValidationMsg: {
    id: 'password.validation.msg',
    defaultMessage: 'Password must have:',
    description: 'Password validation message'
  },
  passwordLengthCharacteristicsForPasswordUpdateForm: {
    id: 'password.minLength',
    defaultMessage: '{min} characters minimum',
    description: 'Password validation'
  },
  passwordCaseCharacteristicsForPasswordUpdateForm: {
    id: 'password.cases',
    defaultMessage: 'Contain upper and lower cases',
    description: 'Password validation'
  },
  passwordNumberCharacteristicsForPasswordUpdateForm: {
    id: 'password.number',
    defaultMessage: 'At least one number',
    description: 'Password validation'
  },
  confirmPasswordLabel: {
    id: 'password.label.confirm',
    defaultMessage: 'Confirm new password',
    description: 'Confirm password label'
  },
  matchedPasswordMsg: {
    id: 'password.match',
    defaultMessage: 'Passwords match',
    description: 'Password validation'
  },
  mismatchedPasswordMsg: {
    id: 'password.mismatch',
    defaultMessage: 'Passwords do not match',
    description: 'Password validation'
  },
  confirmButtonLabel: {
    id: 'buttons.confirm',
    defaultMessage: 'Confirm',
    description: 'Label used for confirm button'
  },
  requiredfield: {
    id: 'register.form.required',
    defaultMessage: 'This field is required',
    description: 'Required field error message'
  },
  incorrectPassword: {
    id: 'system.user.settings.incorrectPassword',
    defaultMessage: 'Current password incorrect. Please try again.',
    description: 'Response message for incorrect password for password change'
  },
  incorrectVerifyCode: {
    id: 'system.user.settings.incorrectVerifyCode',
    defaultMessage: 'Verify code incorrect. Please try again.',
    description:
      'Response message for incorrect Verify code for phone number change'
  },
  passwordUpdated: {
    id: 'system.user.settings.passwordUpdated',
    defaultMessage: 'Password was successfully changed',
    description: 'Password change message on success'
  },
  phoneNumberUpdated: {
    id: 'system.user.settings.phonedNumberUpdated',
    defaultMessage: 'Phone number updated',
    description: 'Phone change message on success'
  },
  avatarUpdating: {
    id: 'system.user.settings.avatarUpdating',
    defaultMessage: 'Updating profile image',
    description: 'Profile image message when uploading'
  },
  avatarUpdated: {
    id: 'system.user.settings.avatarUpdated',
    defaultMessage: 'Profile image successfully updated',
    description: 'Profile image change message on success'
  },
  name: {
    id: 'system.user.settings.name',
    defaultMessage: 'Name',
    description: 'label for Name'
  },
  systemLanguage: {
    id: 'system.user.settings.systemLanguage',
    defaultMessage: 'System language',
    description: 'Label for system language'
  },
  profileImage: {
    id: 'system.user.settings.profileImage',
    defaultMessage: 'Profile Image',
    description: 'Label for profile image'
  },
  duplicateUserMobileErrorMessege: {
    defaultMessage:
      '{number} is already used by another user. Please use a different phone number',
    description:
      'This error messege shows when user try to input already exsisted mobile number',
    id: 'system.user.duplicateMobileError'
  },
  enterPinLabel: {
    id: 'system.user.unlock.pinLabel',
    defaultMessage: 'Enter your pin',
    description: 'Label for entering unlock user profile'
  }
}

export const userMessages: IUserMessages | IDynamicUserMessages =
  defineMessages(messagesToDefine)
