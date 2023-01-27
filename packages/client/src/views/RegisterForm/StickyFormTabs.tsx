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
import * as React from 'react'
import Sticky from 'react-stickynode'
import { IFormTabs, FormTabs } from '@opencrvs/components/lib/FormTabs'
import styled from '@client/styledComponents'
import { injectIntl, WrappedComponentProps as IntlShapeProps } from 'react-intl'

const StickyFormTabsContainer = styled.div`
  div.sticky-inner-wrapper {
    ${({ theme }) => theme.gradients.primary};
  }
`

interface IStickyFormTabProps {
  sections: IFormTabs[]
  activeTabId: string
  onTabClick: (tabId: string) => void
}

function StickyFormTabsComponent({
  sections,
  activeTabId,
  onTabClick
}: IStickyFormTabProps & IntlShapeProps) {
  return (
    <StickyFormTabsContainer id="form_tabs_container">
      {/* 
      // The version of react-stickynode we're using doesn't have children -property in it's type definition.
      // React started to explicitly require it in version 18. React-stickynode would need to be updated.
      // @ts-ignore */}
      <Sticky enabled={true} innerZ={2}>
        <FormTabs
          sections={sections}
          activeTabId={activeTabId}
          onTabClick={onTabClick}
        />
      </Sticky>
    </StickyFormTabsContainer>
  )
}

export const StickyFormTabs = injectIntl(StickyFormTabsComponent)
