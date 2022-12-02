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
import { CodeableConcept } from './CodeableConcept'
import { Identifier } from './Identifier'

export const Location = new mongoose.Schema<fhir.Location>(
  {
    id: {
      type: String,
      unique: true,
      index: true
    },
    resourceType: {
      type: String,
      enum: ['Location'],
      required: true
    },
    identifier: {
      type: [Identifier],
      required: true
    },
    name: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'inactive'],
      required: true
    },
    mode: {
      type: String,
      enum: ['instance', 'kind'],
      required: true
    },
    physicalType: {
      type: [CodeableConcept]
    }
  },
  { _id: false }
)
