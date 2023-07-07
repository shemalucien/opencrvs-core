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

// export enum Status {
//   OK = 'ok',
//   ERROR = 'error'
// }

// export interface Service extends Record<string, unknown> {
//   name: string
//   status: Status
//   error?: string
//   url?: string
//   ping?: number
//   icon: JSX.Element;
// }

// export const checkHealth = async (): Promise<Service[]> => {
//   if (!process.env.HEALTHCHECK_URL) {
//     throw new Error(`Environment variable "HEALTHCHECK_URL" is not set.

// Run the following command in packages/healthcheck and restart services:
// echo "HEALTHCHECK_URL=http://localhost:7070/ping" > .env.local`)
//   }

//   const res = await fetch(process.env.HEALTHCHECK_URL!)
//   return res.json()
// }


export enum Status {
  OK = 'ok',
  ERROR = 'error'
}

export interface Service {
  acceptedStatusCodes?: number[];
  name: string;
  status: Status;
  error?: string;
  url?: string;
  ping?: number;
  icon: JSX.Element;
}


export const checkHealth = async (): Promise<Service[]> => {
  if (!process.env.HEALTHCHECK_URL) {
    throw new Error(`Environment variable "HEALTHCHECK_URL" is not set.

Run the following command in packages/healthcheck and restart services:
echo "HEALTHCHECK_URL=http://localhost:7070/ping" > .env.local`);
  }

  const res = await fetch(process.env.HEALTHCHECK_URL!);
  return res.json();
};

