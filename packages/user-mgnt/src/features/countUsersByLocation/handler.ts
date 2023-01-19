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
import * as Hapi from '@hapi/hapi'
import {
  countRegistrarsByLocation,
  countUsersByLocation
} from '@user-mgnt/features/countUsersByLocation/service'

const ROLE = 'role'
const LOCATION_ID = 'locationId'

export async function countRegistrarsByLocationHandler(request: Hapi.Request) {
  const locationId = request.query[LOCATION_ID]

  return countRegistrarsByLocation(locationId)
}

export async function countUsersByLocationHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  const role = request.query[ROLE]

  return countUsersByLocation({ role })
}
