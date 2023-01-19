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
import fetch from 'node-fetch'
import { IAuthHeader } from '@metrics/features/registration'
import {
  fhirUrl,
  COUNTRY_CONFIG_URL,
  SEARCH_URL,
  USER_MANAGEMENT_URL
} from '@metrics/constants'

export function fetchFHIR<T = any>(
  suffix: string,
  authHeader: IAuthHeader,
  method: string = 'GET',
  body?: string
) {
  const url = [fhirUrl.replace(/\/$/, ''), suffix].join('/')
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/fhir+json',
      ...authHeader
    },
    body
  })
    .then((response) => {
      return response.json() as Promise<T>
    })
    .catch((error) => {
      return Promise.reject(new Error(`FHIR request failed: ${error.message}`))
    })
}

export function fetchTaskHistory(taskId: string, authHeader: IAuthHeader) {
  return fetchFHIR<fhir.Bundle>(`Task/${taskId}/_history`, authHeader)
}

export const fetchLocation = async (
  locationId: string,
  authHeader: IAuthHeader
) => {
  return await fetchFHIR<fhir.Location>(
    locationId.startsWith('Location/') ? locationId : `Location/${locationId}`,
    authHeader
  )
}

export async function fetchLocationsByType(
  type: string,
  authHeader: IAuthHeader
): Promise<fhir.Location[]> {
  const bundle = await fetchFHIR(`Location?_count=0&type=${type}`, authHeader)
  return bundle?.entry?.map((entry: fhir.BundleEntry) => entry.resource) ?? []
}

export async function fetchParentLocationByLocationID(
  locationID: string,
  authHeader: IAuthHeader
) {
  const location = await fetchFHIR(locationID, authHeader)
  return location && location.partOf && location.partOf.reference
}

export async function fetchTaskIdByCompositionID(
  compositionId: string,
  authHeader: IAuthHeader
) {
  const taskBundle = await fetchFHIR(
    `Task?focus=Composition/${compositionId}`,
    authHeader
  )
  if (!taskBundle.entry[0] || !taskBundle.entry[0].resource) {
    return null
  }
  return taskBundle.entry[0].resource.id
}

export async function totalOfficesInCountry(authHeader: IAuthHeader) {
  const bundle: fhir.Bundle = await fetchFHIR(
    'Location?type=CRVS_OFFICE',
    authHeader
  )
  return bundle.total ?? 0
}

export async function fetchChildLocationsByParentId(
  locationId: string,
  authHeader: IAuthHeader
): Promise<fhir.Location[]> {
  const bundle = await fetchFHIR(
    `Location?_count=0&type=ADMIN_STRUCTURE&partof=${locationId}`,
    authHeader
  )
  return bundle?.entry?.map((entry: fhir.BundleEntry) => entry.resource) ?? []
}

export async function fetchAllChildLocationsByParentId(
  locationId: string,
  authHeader: IAuthHeader
): Promise<fhir.Location[]> {
  const bundle = await fetchFHIR(
    `Location?_count=0&partof=${locationId}`,
    authHeader
  )
  return bundle?.entry?.map((entry: fhir.BundleEntry) => entry.resource) ?? []
}

export async function fetchChildLocationsWithTypeByParentId(
  locationId: string,
  locationType: string,
  authHeader: IAuthHeader
): Promise<fhir.Location[]> {
  const bundle = await fetchFHIR(
    `Location?_count=0&type=${locationType}&partof=${locationId}`,
    authHeader
  )
  return bundle?.entry?.map((entry: fhir.BundleEntry) => entry.resource) ?? []
}

export function fetchFromResource(
  suffix: string,
  authHeader: IAuthHeader,
  method: string = 'GET',
  body?: string
) {
  const url = [COUNTRY_CONFIG_URL.replace(/\/$/, ''), suffix].join('/')
  return fetch(url, {
    method,
    headers: {
      ...authHeader
    },
    body
  })
    .then((response) => {
      return response.json()
    })
    .catch((error) => {
      return Promise.reject(
        new Error(`RESOURCE request failed: ${error.message}`)
      )
    })
}

export function fetchAllFromSearch(authHeader: IAuthHeader) {
  return fetch(`${SEARCH_URL}search/all`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader
    }
  })
    .then((response) => {
      return response.json()
    })
    .catch((error) => {
      return Promise.reject(
        new Error(`Search request failed: ${error.message}`)
      )
    })
}

export const fetchPractitionerTitle = async (
  practitionerId: string,
  authHeader: IAuthHeader
) => {
  const roleBundle: fhir.Bundle = await fetchFHIR(
    `PractitionerRole?practitioner=${practitionerId}`,
    authHeader
  )
  const practitionerRole =
    roleBundle &&
    roleBundle.entry &&
    roleBundle.entry &&
    roleBundle.entry.length > 0 &&
    (roleBundle.entry[0].resource as fhir.PractitionerRole)

  const codes =
    practitionerRole && practitionerRole.code
      ? practitionerRole.code.flatMap((code) => code.coding || [])
      : []

  const titleCode = codes.find(
    (coding) => coding.system === 'http://opencrvs.org/specs/titles'
  )?.code

  if (titleCode) {
    return titleCode
  } else {
    return Promise.reject(new Error(`Title code cannot be found`))
  }
}
export const fetchPractitionerRole = async (
  practitionerId: string,
  authHeader: IAuthHeader
) => {
  const roleBundle: fhir.Bundle = await fetchFHIR(
    `PractitionerRole?practitioner=${practitionerId}`,
    authHeader
  )
  const practitionerRole =
    roleBundle &&
    roleBundle.entry &&
    roleBundle.entry &&
    roleBundle.entry.length > 0 &&
    (roleBundle.entry[0].resource as fhir.PractitionerRole)

  const roleCode =
    practitionerRole &&
    practitionerRole.code &&
    practitionerRole.code.length > 0 &&
    practitionerRole.code[0].coding &&
    practitionerRole.code[0].coding[0].code

  if (roleCode) {
    return roleCode
  } else {
    return Promise.reject(new Error(`Role code cannot be found`))
  }
}

interface IUserCountSearchCriteria {
  role: string
}

export interface ICountByLocation {
  total: number
  locationId: string
}

export async function countRegistrarsByLocation(
  authHeader: IAuthHeader,
  locationId?: string
): Promise<{ registrars: number }> {
  const res = await fetch(
    locationId
      ? `${USER_MANAGEMENT_URL}/countRegistrarsByLocation?locationId=${locationId}`
      : `${USER_MANAGEMENT_URL}/countRegistrarsByLocation`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader
      }
    }
  )
  return res.json()
}

export async function countUsersByLocation(
  searchCriteria: Partial<IUserCountSearchCriteria>,
  authHeader: IAuthHeader
): Promise<ICountByLocation[]> {
  const { role } = searchCriteria
  const res = await fetch(
    `${USER_MANAGEMENT_URL}/countUsersByLocation?role=${role}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader
      }
    }
  )
  return res.json()
}
