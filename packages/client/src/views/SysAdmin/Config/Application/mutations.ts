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
import { gql } from '@apollo/client'
import { client } from '@client/utils/apolloClient'
import { IApplicationConfig } from '@client/utils/referenceApi'

const applicationConfigMutation = gql`
  mutation updateApplicationConfig(
    $applicationConfig: ApplicationConfigurationInput
  ) {
    updateApplicationConfig(applicationConfig: $applicationConfig) {
      APPLICATION_NAME
      NID_NUMBER_PATTERN
      PHONE_NUMBER_PATTERN
      HIDE_EVENT_REGISTER_INFORMATION
      DATE_OF_BIRTH_UNKNOWN
      INFORMANT_SIGNATURE
      INFORMANT_SIGNATURE_REQUIRED
      ADDRESSES
      ADMIN_LEVELS
      LOGIN_BACKGROUND {
        backgroundColor
        backgroundImage
        imageFit
      }
      COUNTRY_LOGO {
        fileName
        file
      }
      CURRENCY {
        languagesAndCountry
        isoCode
      }
      BIRTH {
        REGISTRATION_TARGET
        LATE_REGISTRATION_TARGET
        FEE {
          ON_TIME
          LATE
          DELAYED
        }
      }
      DEATH {
        REGISTRATION_TARGET
        FEE {
          ON_TIME
          DELAYED
        }
      }
    }
  }
`
async function mutateApplicationConfig(
  applicationConfig: Partial<IApplicationConfig>
) {
  return (
    client &&
    client.mutate({
      mutation: applicationConfigMutation,
      variables: { applicationConfig }
    })
  )
}

export const configApplicationMutations = {
  mutateApplicationConfig
}
