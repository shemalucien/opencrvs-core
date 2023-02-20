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

import React from 'react'
import { connect } from 'react-redux'
import { IStoreState } from '@client/store'
import { getOfflineData } from '@client/offline/selectors'
import { injectIntl } from 'react-intl'
import { SysAdminContentWrapper } from '@client/views/SysAdmin/SysAdminContentWrapper'

function performanceStatisticsComponent() {
  return (
    <>
      <SysAdminContentWrapper
        id="performance-statistics"
        isCertificatesConfigPage={true}
      >
        new Component
      </SysAdminContentWrapper>
    </>
  )
}
export const PerformanceStatistics = connect((state: IStoreState) =>
  getOfflineData(state)
)(injectIntl(performanceStatisticsComponent))
