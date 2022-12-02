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
import type { ServerRoute, ReqRefDefaults } from '@hapi/hapi'
import { pingHandler } from '@hearth/handlers/ping'
import { locationHandler } from '@hearth/handlers/fhir/location'

export enum FhirResource {
  Composition = 'Composition',
  DocumentReference = 'DocumentReference',
  Encounter = 'Encounter',
  Observation = 'Observation',
  Patient = 'Patient',
  PaymentReconciliation = 'PaymentReconciliation',
  RelatedPerson = 'RelatedPerson',
  Task = 'Task',
  Location = 'Location'
}

export const routes: ServerRoute<ReqRefDefaults>[] = [
  {
    method: 'GET',
    path: '/ping',
    handler: pingHandler
  },
  {
    method: 'GET',
    path: '/fhir',
    handler: () => console.log('moi'),
    options: {
      tags: []
    }
  },
  {
    method: 'GET',
    path: FhirResource.Location,
    handler: locationHandler
  }
]
