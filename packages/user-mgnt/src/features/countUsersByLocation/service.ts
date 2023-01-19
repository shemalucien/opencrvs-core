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
import User from '@user-mgnt/model/user'

export async function countRegistrarsByLocation(
  locationId: string | undefined
) {
  // For the whole country
  if (!locationId) {
    const resArray = await User.aggregate([
      { $match: { scope: 'register' } },
      { $count: 'registrars' }
    ])
    return resArray[0]
  }
  const resArray = await User.aggregate([
    {
      $match: {
        catchmentAreaIds: locationId,
        scope: 'register'
      }
    },
    { $unwind: '$catchmentAreaIds' },
    { $group: { _id: '$catchmentAreaIds', registrars: { $sum: 1 } } },
    { $match: { _id: locationId } }
  ])
  return resArray[0]
}

export async function countUsersByLocation(
  searchCriteria: Record<string, unknown>
) {
  const queryResult = await User.aggregate([
    { $match: searchCriteria },
    {
      $group: {
        _id: '$primaryOfficeId',
        total: {
          $sum: 1
        }
      }
    }
  ]).exec()
  return queryResult.map(({ _id, total }: { _id: string; total: number }) => ({
    locationId: _id,
    total
  }))
}
