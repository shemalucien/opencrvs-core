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
import { NON_UNICODED_LANGUAGES } from '@notification/constants'
import { internal } from '@hapi/boom'
import { notifyCountryConfig } from '@notification/features/sms/service'
import * as Hapi from '@hapi/hapi'
import { getDefaultLanguage } from '@notification/i18n/utils'

interface IMessageIdentifier {
  [key: string]: string
}
export interface ILanguage {
  lang: string
  displayName: string
  messages: IMessageIdentifier
}

export interface ISMSPayload {
  msisdn: string
}

interface IUserName {
  use: string
  family: string
  given: string[]
}

export interface IMessageRecipient {
  userFullName: IUserName[]
  msisdn?: string
  email?: string
}

export interface IAuthHeader {
  Authorization: string
}

export async function sendNotification(
  request: Hapi.Request,
  templateName: {
    email?: string
    sms: string
  },
  recipient: {
    email?: string
    sms?: string
  },
  variables: Record<string, string>
) {
  const token = request.headers.authorization
  const locale = getDefaultLanguage()
  try {
    return await notifyCountryConfig(
      templateName,
      recipient,
      variables,
      token,
      locale,
      /* send unicoded sms if provided local is not in non unicoded set */
      NON_UNICODED_LANGUAGES.indexOf(getDefaultLanguage()) < 0
    )
  } catch (err) {
    return internal(err)
  }
}
