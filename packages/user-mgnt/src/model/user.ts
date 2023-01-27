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
import { Document, model, Schema } from 'mongoose'
import { statuses } from '@user-mgnt/utils/userUtils'

export enum AUDIT_REASON {
  TERMINATED,
  SUSPICIOUS,
  ROLE_REGAINED,
  NOT_SUSPICIOUS,
  OTHER
}

export enum AUDIT_ACTION {
  DEACTIVATE,
  REACTIVATE,
  CERTIFICATE_CREATED,
  CERTIFICATE_UPDATED,
  CERTIFICATE_DELETED
}

export interface IUserName {
  use: string
  family: string
  given: string[]
}

export enum FIELD_AGENT_TYPES {
  HEALTHCARE_WORKER = 'HEALTHCARE_WORKER',
  POLICE_OFFICER = 'POLICE_OFFICER',
  SOCIAL_WORKER = 'SOCIAL_WORKER',
  LOCAL_LEADER = 'LOCAL_LEADER'
}

interface IIdentifier {
  system: string
  value: string
}
export interface ISecurityQuestionAnswer {
  questionKey: string
  answerHash: string
}
interface ISignature {
  type: string
  data: string
}
interface ILocalRegistrar {
  name: IUserName[]
  role?: string
  signature: ISignature
}
export interface IAuditHistory {
  auditedBy: string
  auditedOn: number
  action: string
  reason: string
  comment?: string
}

export enum Event {
  BIRTH = 'birth',
  DEATH = 'death'
}
export interface ISearch {
  searchId: string
  name: string
  parameters: {
    event?: Event
    registrationStatuses?: string[]
    dateOfEvent?: string
    dateOfEventStart?: string
    dateOfEventEnd?: string
    registrationNumber?: string
    trackingId?: string
    dateOfRegistration?: string
    dateOfRegistrationStart?: string
    dateOfRegistrationEnd?: string
    declarationLocationId?: string
    declarationJurisdictionId?: string
    eventLocationId?: string
    eventCountry?: string
    eventLocationLevel1?: string
    eventLocationLevel2?: string
    eventLocationLevel3?: string
    eventLocationLevel4?: string
    eventLocationLevel5?: string
    childFirstNames?: string
    childLastName?: string
    childDoB?: string
    childDoBStart?: string
    childDoBEnd?: string
    childGender?: string
    deceasedFirstNames?: string
    deceasedFamilyName?: string
    deceasedGender?: string
    deceasedDoB?: string
    deceasedDoBStart?: string
    deceasedDoBEnd?: string
    motherFirstNames?: string
    motherFamilyName?: string
    motherDoB?: string
    motherDoBStart?: string
    motherDoBEnd?: string
    fatherFirstNames?: string
    fatherFamilyName?: string
    fatherDoB?: string
    fatherDoBStart?: string
    fatherDoBEnd?: string
    informantFirstNames?: string
    informantFamilyName?: string
    informantDoB?: string
    informantDoBStart?: string
    informantDoBEnd?: string
  }
}
export interface IAvatar {
  type: string
  data: string
}

export interface IUser {
  name: IUserName[]
  username: string
  identifiers: IIdentifier[]
  email: string
  mobile: string
  passwordHash: string
  salt: string
  role: string
  type?: FIELD_AGENT_TYPES
  practitionerId: string
  primaryOfficeId: string
  catchmentAreaIds: string[]
  scope: string[]
  signature: ISignature
  localRegistrar?: ILocalRegistrar
  status: string
  device?: string
  securityQuestionAnswers: ISecurityQuestionAnswer[]
  creationDate: number
  auditHistory?: IAuditHistory[]
  avatar?: IAvatar
  searches?: ISearch[]
}

export interface IUserModel extends IUser, Document {}

export const UserNameSchema = new Schema(
  {
    use: String,
    given: [String],
    family: String
  },
  { _id: false }
)

const IdentifierSchema = new Schema(
  {
    system: String,
    value: String
  },
  { _id: false }
)

const SecurityQuestionAnswerSchema = new Schema(
  {
    questionKey: String,
    answerHash: String
  },
  { _id: false }
)

const AuditHistory = new Schema(
  {
    auditedBy: String,
    auditedOn: {
      type: Number,
      default: Date.now
    },
    action: {
      type: String,
      enum: [
        AUDIT_ACTION.DEACTIVATE,
        AUDIT_ACTION.REACTIVATE,
        AUDIT_ACTION.CERTIFICATE_CREATED,
        AUDIT_ACTION.CERTIFICATE_UPDATED,
        AUDIT_ACTION.CERTIFICATE_DELETED
      ],
      default: AUDIT_ACTION.DEACTIVATE
    },
    reason: {
      type: String,
      enum: [
        AUDIT_REASON.TERMINATED,
        AUDIT_REASON.SUSPICIOUS,
        AUDIT_REASON.ROLE_REGAINED,
        AUDIT_REASON.NOT_SUSPICIOUS,
        AUDIT_REASON.OTHER
      ],
      default: AUDIT_REASON.OTHER
    },
    comment: String
  },
  {
    _id: false
  }
)

const AdvanceSearchParameters = new Schema(
  {
    event: {
      type: String,
      enum: [Event.BIRTH, Event.DEATH],
      required: false
    },
    registrationStatuses: [
      {
        type: String
      }
    ],
    dateOfEvent: { type: String },
    dateOfEventStart: { type: String },
    dateOfEventEnd: { type: String },
    registrationNumber: { type: String },
    trackingId: { type: String },
    dateOfRegistration: { type: String },
    dateOfRegistrationStart: { type: String },
    dateOfRegistrationEnd: { type: String },
    declarationLocationId: { type: String },
    declarationJurisdictionId: { type: String },
    eventCountry: { type: String },
    eventLocationId: { type: String },
    eventLocationLevel1: { type: String },
    eventLocationLevel2: { type: String },
    eventLocationLevel3: { type: String },
    eventLocationLevel4: { type: String },
    eventLocationLevel5: { type: String },
    childFirstNames: { type: String },
    childLastName: { type: String },
    childDoB: { type: String },
    childDoBStart: { type: String },
    childDoBEnd: { type: String },
    childGender: { type: String },
    deceasedFirstNames: { type: String },
    deceasedFamilyName: { type: String },
    deceasedGender: { type: String },
    deceasedDoB: { type: String },
    deceasedDoBStart: { type: String },
    deceasedDoBEnd: { type: String },
    motherFirstNames: { type: String },
    motherFamilyName: { type: String },
    motherDoB: { type: String },
    motherDoBStart: { type: String },
    motherDoBEnd: { type: String },
    fatherFirstNames: { type: String },
    fatherFamilyName: { type: String },
    fatherDoB: { type: String },
    fatherDoBStart: { type: String },
    fatherDoBEnd: { type: String },
    informantFirstNames: { type: String },
    informantFamilyName: { type: String },
    informantDoB: { type: String },
    informantDoBStart: { type: String },
    informantDoBEnd: { type: String }
  },
  {
    _id: false
  }
)

const SearchesSchema = new Schema(
  {
    searchId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    parameters: { type: AdvanceSearchParameters, required: true }
  },
  {
    _id: false
  }
)

const Avatar = new Schema(
  {
    type: String,
    data: String
  },
  {
    _id: false
  }
)

const userSchema = new Schema({
  name: { type: [UserNameSchema], required: true },
  username: { type: String, required: true },
  identifiers: [IdentifierSchema],
  email: { type: String },
  mobile: { type: String, unique: true },
  passwordHash: { type: String, required: true },
  salt: { type: String, required: true },
  role: String,
  type: String,
  practitionerId: { type: String, required: true },
  primaryOfficeId: { type: String, required: true },
  catchmentAreaIds: { type: [String], required: true },
  scope: { type: [String], required: true },
  status: {
    type: String,
    enum: [
      statuses.PENDING,
      statuses.ACTIVE,
      statuses.DISABLED,
      statuses.DEACTIVATED
    ],
    default: statuses.PENDING
  },
  securityQuestionAnswers: [SecurityQuestionAnswerSchema],
  device: String,
  creationDate: { type: Number, default: Date.now },
  auditHistory: [AuditHistory],
  avatar: Avatar,
  searches: [SearchesSchema]
})

export default model<IUserModel>('User', userSchema)
