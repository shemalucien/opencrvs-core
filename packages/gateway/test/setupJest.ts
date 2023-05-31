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
import { join } from 'path'
import * as fetch from 'jest-fetch-mock'
// eslint-disable-next-line import/no-relative-parent-imports
import { IDatabaseConnector } from '../src/features/user/database'

const f = jest.requireActual('node-fetch')

jest.setMock('node-fetch', { default: fetch, Headers: f.Headers })

const database: { [key: string]: string } = {}

const mock: IDatabaseConnector = {
  set: jest.fn().mockImplementation(async (key, value) => {
    database[key] = value
  }),
  setex: jest.fn().mockImplementation(async (key, ttl, value) => {
    database[key] = value
  }),
  get: jest.fn().mockImplementation(async (key) => {
    return database[key] || null
  }),
  del: jest.fn().mockImplementation(async (key) => {
    const keyExists = !!database[key]
    delete database[key]
    return keyExists ? 1 : 0
  }),
  start: jest.fn(),
  stop: jest.fn()
}

jest.setMock('src/features/user/database', mock)

process.env.CERT_PUBLIC_KEY_PATH = join(__dirname, './cert.key.pub')
process.env.NATIONAL_ID_OIDP_CLIENT_PRIVATE_KEY =
  'ewogICAgInAiOiAiMVRMMlRPOWxNZnZOWThzeWVReFFrd3F1RThfdll5bV85ZS1yUkxRaV9reWJvLUMwUXJYVklQRFNfN2laV3I4WFB0MGlMWnJkemtjSzU0dGtKWGRkYWk3bEhxM3VyNndLU09uUHVPMURNS0stLXlNR3lCd0RfazdTbUdLUDlsTml3Q0pDT1Q2dDdjWEM1SnBEaVBNc05HQWNEUDZyRGFQQ2tlMzZUcjV5LW5NIiwKICAgICJrdHkiOiAiUlNBIiwKICAgICJxIjogIng4U1FwSHc2UlFnWmxHUC1EdWpiS1pRcUZxczAxU0ZsczFQa1lya25yM01rV1FrUFVGVDlubW5CbTlHWlVwbUV0TU9WZDc4SWVfdHV1UGZFVFo1SWYwTmt0bTNJdS1Pcm9jQzJBU3IzQnF0dUZyUnhUWTRJbnVBVnhHd0VuV0Frd1ZWR1dJQklEVkhSeHhGblAwZUo0YWNmVGVDcWs4QTE1cFRhOUo2MmY4ayIsCiAgICAiZCI6ICJubms3Q2RtT2hucVdyMTU1cW5hc25PY2pPamYyVEJLNlVpYUJOcWw1S1FBMmlJSnJGa0F1ZXFYcmwzM1J0eVgtZFFtOU1NTnhNLUYwMUpac3REME50eW1ZdXlzOVFMbGhKbld2RHlGLXlmMHJHOFJPVHROQkNuZjgxNUE2STQ1UzhqVUlXMGI1dl9lQlAxY1lKdWRLSW5QNlY0NVRZUEFlSjhKQ2hPeFJ2RlJHX2loOFVRaTdDZFZWNXFvVUVpX1lOWXNleTc1cTZpTFRiRVFFOExsNE9lMnRFNDMxTnltMTBaa185R2FNVEp0SU1YMm1iMW01blFfMTZmRC1ZNDZvWDlucW9zUUtUZ19uYmRoUFU3QWQwNW5MSjZFRER0X0JIbDNfc0d1blhrN3BhMjFTN1hfRjBQT0JrdG42dlNUV0FEZjQtM2pXaFNHa21yX3pyR3hLc1EiLAogICAgImUiOiAiQVFBQiIsCiAgICAicWkiOiAiRlpCaE55Uk5nMVhJVW44d1VFVGRCSEh4Qmx0Wk9tbDJhUzNXYlVZb3VuQlN1NDhoVk9BOGpWdFJFaWFBc25xUkxtaGNIN3V0aWVCTHBKazZsZ2pyM3RINnh3WklOSDRCb1NBYnRyUW5DMXd1ZE1fa1FCX1hpRk4tSFhPX0oyU2thV05nb19JSFFING1udXZnRUkxUEdpZGdwZzJ2NnJ6V3R3ZW5rbXhHblJnIiwKICAgICJkcCI6ICJNYkhMVDJ1TnZ2VGVqeUJTQjMwald1TG1hSl9UUU4zLWJLa00xdHJXUFVoR0R4RFZjNmRHb29MXzY3TnZxNE5YTzhQM3I0R2xxZXROVTJOZVdJMVdMT1g1YWdsSTFaSFlZOTU4R0xMVk1vVDgxelQyNDdZRUNFYl9ONTNoeUp6dks3SFFsZDlTVTFZQmM1LXhsajU0VTAwRHZOT3ZzMkkwZkNkb2JPcGZpcGsiLAogICAgImFsZyI6ICJSUzI1NiIsCiAgICAiZHEiOiAiYlJkRjJkMVJRTk5zaktHU1l2ZjhmeGNfYU1PMEJWUElvd2FFS1BsdDE1MHNVMGJrU3YwdXh1eF80eVN4OHU2TkR0M2o2TkcwdzJnS0RnNlg3NzhwWGY0aXFKRUpWcm04eDRkaW5QNm1pY2ppUkpuamFmUFBkMXR0NTZjSldodmYxb2hIOHhxU3ZsdFpFTG5MUlQ0LTZMQ0lJdEkydEpyNWxHTGpzMFJjNnlrIiwKICAgICJuIjogInBsNVE4QWVsT1ozWERyc093ems5T0ExNzR1WEF3ZnpxOW1NVXB2cVEwMC1sMFlKWGljZUlfWU13ZVJnS0tGTnpEMklEajhGNnJqaDh1THEwdjhiTE5oLWQzUEFwRHBTMTVOc3ZhN2U4VFZNR1paLVZJVDVKVGZqMzZsNWR2Q1oxa21MRUJ2ZjJhbzFHOVowMXU0NDNMZDRueEgzNHpkLTlUZU5VRXp4ejAweXUtOFBrRkJ5OGNySGVCR2JmcUlTLV9nbVJ6ZEIwclFQM29GT3hiNWJfa01WYUR6Wm5YSFVVemFIdDRNOEcxcHF2QjJOZzQzUDQ0d2NJME1YMVNHVkRQbGMtZVBfNjFjNW5qTzhoVnhnbUZzOUt0WVR5a0t3OXhsYUh6U1dCbG9ObVZFeG1Yd1ItckVzSTdJczdxOUpWTjdEVzNaNmYzRnk3NVpnN21rZXhTdyIKfQ=='
process.env.NATIONAL_ID_OIDP_BASE_URL = 'http://localhost:27501/v1/oid/'
process.env.NATIONAL_ID_OIDP_REST_URL = 'http://localhost:27502/v1/oid/'
process.env.NATIONAL_ID_OIDP_JWT_AUD_CLAIM =
  'http://localhost:27501/v1/idp/oauth/token'
