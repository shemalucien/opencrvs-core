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
  MINIO_BUCKET,
  USER_NOTIFICATION_DELIVERY_METHOD
} from '@gateway/constants'
import {
  GQLAttachmentInput,
  GQLBirthRegistrationInput,
  GQLDeathRegistrationInput,
  GQLMarriageRegistrationInput,
  GQLUserInput
} from '@gateway/graphql/schema'
import { fromBuffer } from 'file-type'

export async function validateAttachments(
  attachments: Array<{ data?: string; uri?: string }>
) {
  for (const file of attachments) {
    const isMinioUrl =
      file.uri &&
      file.uri.split('/').length > 1 &&
      file.uri.split('/')[1] === MINIO_BUCKET

    if (isMinioUrl) {
      continue
    }

    if (!file.data) {
      throw new Error(`No attachment file found!`)
    }

    const data = file.data.split('base64,')?.[1] || ''
    const mime = file.data.split(';')[0].replace('data:', '')

    if (!mime.startsWith('image/')) {
      throw new Error(`File type doesn't match image/*`)
    }

    const buffer = Buffer.from(data, 'base64')
    const type = await fromBuffer(buffer)
    if (!type) {
      throw new Error("File type couldn't be determined")
    }

    if (!type.mime.startsWith('image/')) {
      throw new Error(`File type doesn't match image/*`)
    }
  }
}

export async function validateNotificationDeliveryMethod(user: GQLUserInput) {
  const notificationMethodMap = {
    sms: 'mobile',
    email: 'email'
  }
  if (!user[notificationMethodMap[USER_NOTIFICATION_DELIVERY_METHOD]]) {
    throw new Error(
      `${notificationMethodMap[USER_NOTIFICATION_DELIVERY_METHOD]} is required`
    )
  }
}

export function validateBirthDeclarationAttachments(
  details: GQLBirthRegistrationInput
) {
  const attachments = [
    details.registration?.attachments,
    details.informant?.affidavit,
    details.mother?.photo,
    details.father?.photo,
    details.child?.photo
  ]
    .flat()
    .filter((x): x is GQLAttachmentInput => x !== undefined)

  return validateAttachments(attachments)
}

export function validateDeathDeclarationAttachments(
  details: GQLDeathRegistrationInput
) {
  const attachments = [
    details.registration?.attachments,
    details.informant?.affidavit,
    details.mother?.photo,
    details.father?.photo,
    details.deceased?.photo,
    details.spouse?.photo
  ]
    .flat()
    .filter((x): x is GQLAttachmentInput => x !== undefined)

  return validateAttachments(attachments)
}

export function validateMarriageDeclarationAttachments(
  details: GQLMarriageRegistrationInput
) {
  const attachments = [
    details.registration?.attachments,
    details.bride?.photo,
    details.groom?.photo
  ]
    .flat()
    .filter((x): x is GQLAttachmentInput => x !== undefined)

  return validateAttachments(attachments)
}
