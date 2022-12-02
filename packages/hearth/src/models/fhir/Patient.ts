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
import { HumanName } from './HumanName'
import { Identifier } from './Identifier'

export const Patient = new mongoose.Schema<fhir.Patient>(
  {
    id: {
      type: String,
      unique: true,
      index: true
    },
    resourceType: {
      type: String
    },
    identifier: {
      type: [Identifier]
    },
    active: {
      type: Boolean
    },
    name: {
      type: [HumanName]
    },
    gender: {
      type: String
    },
    birthDate: {
      type: Date
    }
  },
  { _id: false }
)
