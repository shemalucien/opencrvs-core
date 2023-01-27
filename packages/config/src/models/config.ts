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
import { model, Schema, Document } from 'mongoose'
interface IBirth {
  REGISTRATION_TARGET: number
  LATE_REGISTRATION_TARGET: number
  FEE: {
    ON_TIME: number
    LATE: number
    DELAYED: number
  }
}
interface IDeath {
  REGISTRATION_TARGET: number
  FEE: {
    ON_TIME: number
    DELAYED: number
  }
}
interface ICurrency {
  isoCode: string
  languagesAndCountry: string[]
}

interface ICountryLogo {
  fileName: string
  file: string
}

interface ILoginBackground {
  backgroundColor: string
  backgroundImage: string
  imageFit: string
}

export interface IApplicationConfigurationModel extends Document {
  APPLICATION_NAME: string
  BIRTH: IBirth
  COUNTRY_LOGO: ICountryLogo
  CURRENCY: ICurrency
  DEATH: IDeath
  FIELD_AGENT_AUDIT_LOCATIONS: string
  DECLARATION_AUDIT_LOCATIONS: string
  HIDE_EVENT_REGISTER_INFORMATION: boolean
  EXTERNAL_VALIDATION_WORKQUEUE: boolean
  PHONE_NUMBER_PATTERN: RegExp
  NID_NUMBER_PATTERN: string
  ADDRESSES: number
  DATE_OF_BIRTH_UNKNOWN: boolean
  INFORMANT_SIGNATURE: boolean
  INFORMANT_SIGNATURE_REQUIRED: boolean
  ADMIN_LEVELS: number
  LOGIN_BACKGROUND: ILoginBackground
}

const birthSchema = new Schema<IBirth>({
  REGISTRATION_TARGET: { type: Number, default: 45 },
  LATE_REGISTRATION_TARGET: { type: Number, default: 365 },
  FEE: {
    ON_TIME: Number,
    LATE: Number,
    DELAYED: Number
  }
})

const deathSchema = new Schema<IDeath>({
  REGISTRATION_TARGET: { type: Number, default: 45 },
  FEE: {
    ON_TIME: Number,
    DELAYED: Number
  }
})

const countryLogoSchema = new Schema<ICountryLogo>({
  fileName: String,
  file: String
})

const backgroundImageSchema = new Schema<ILoginBackground>({
  backgroundColor: String,
  backgroundImage: String,
  imageFit: String
})

const currencySchema = new Schema<ICurrency>({
  isoCode: { type: String },
  languagesAndCountry: { type: [String] }
})

export interface Integration {
  name: string
  status: string
}

export const statuses = {
  PENDING: 'pending',
  ACTIVE: 'active',
  DISABLED: 'disabled',
  DEACTIVATED: 'deactivated'
}

const configSchema = new Schema({
  APPLICATION_NAME: { type: String, required: false, default: 'OpenCRVS' },
  BIRTH: { type: birthSchema, required: false },
  COUNTRY_LOGO: { type: countryLogoSchema, required: false },
  CURRENCY: { type: currencySchema, required: false },
  DEATH: { type: deathSchema, required: false },
  FIELD_AGENT_AUDIT_LOCATIONS: {
    type: String,
    required: false,
    default: 'DISTRICT'
  },
  DECLARATION_AUDIT_LOCATIONS: {
    type: String,
    required: false,
    default: 'DISTRICT'
  },
  HIDE_EVENT_REGISTER_INFORMATION: {
    type: Boolean,
    required: false,
    default: false
  },
  EXTERNAL_VALIDATION_WORKQUEUE: {
    type: Boolean,
    required: false,
    default: false
  },
  PHONE_NUMBER_PATTERN: { type: String, required: false },
  NID_NUMBER_PATTERN: { type: String, required: false },
  ADDRESSES: {
    type: Number,
    required: false,
    enum: [1, 2],
    default: 1
  },
  DATE_OF_BIRTH_UNKNOWN: { type: Boolean, required: true, default: false },
  INFORMANT_SIGNATURE: { type: Boolean, required: true, default: true },
  INFORMANT_SIGNATURE_REQUIRED: {
    type: Boolean,
    required: true,
    default: true
  },
  LOGIN_BACKGROUND: { type: backgroundImageSchema, required: false },
  ADMIN_LEVELS: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
    default: 2
  }
})

export default model<IApplicationConfigurationModel>('Config', configSchema)
