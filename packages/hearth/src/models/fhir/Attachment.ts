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
import mongoose from 'mongoose'
import {
  base64Binary,
  code,
  dateTime,
  unsignedInt,
  url
} from './primitive-validators'

export const Attachment = new mongoose.Schema<fhir.Attachment>({
  contentType: code,
  language: code,
  data: base64Binary,
  url: url,
  size: unsignedInt,
  hash: base64Binary,
  title: { type: String },
  creation: dateTime
})
