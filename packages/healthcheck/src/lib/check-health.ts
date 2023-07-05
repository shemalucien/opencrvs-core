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

export enum Status {
  OK = 'ok',
  ERROR = 'error'
}

export interface Service extends Record<string, unknown> {
  name: string
  status: Status
  error?: string
  url?: string
  ping?: number
}

const HEALTHCHECK_URL = 'http://localhost:7070/ping'

export const checkHealth = async (): Promise<Service[]> => {
  if (!process.env.HEALTHCHECK_URL) {
    throw new Error(`Environment variable "HEALTHCHECK_URL" is not set.

Run the following command in packages/healthcheck and restart services:
echo "HEALTHCHECK_URL=${HEALTHCHECK_URL}" > .env.local`)
  }

  const res = await fetch(HEALTHCHECK_URL)
  console.log("health check response",res)
  return res.json()
}
