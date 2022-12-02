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

import { cleanEnv, port, host, str } from 'envalid'

export const { HOST, PORT, HOSTNAME, MONGO_URL } = cleanEnv(process.env, {
  HOST: host({ desc: 'Host address of the server. e.g. "localhost"' }),
  PORT: port({ desc: 'Host port of the server, e.g. 3447' }),
  HOSTNAME: str({ desc: 'The hostname for CORS' }),
  MONGO_URL: str({ desc: 'MongoDB connection string' })
})

export const DEFAULT_TIMEOUT = 600000
