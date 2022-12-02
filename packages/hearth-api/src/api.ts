import fetch from 'node-fetch'
import * as qs from 'qs'

const HEARTH_URL = 'http://someurl:1234/fhir'

export const GET = (
  suffix: string,
  queryString?: Record<string, string | number>
) => {
  return fetch(
    HEARTH_URL +
      '/' +
      suffix +
      '?' +
      qs.stringify(queryString, { encode: false }),
    { method: 'GET' }
  )
}

export const POST = (
  suffix: string,
  queryString?: Record<string, string | number>
) => {
  return fetch(
    HEARTH_URL +
      '/' +
      suffix +
      '?' +
      qs.stringify(queryString, { encode: false }),
    { method: 'GET' }
  )
}
