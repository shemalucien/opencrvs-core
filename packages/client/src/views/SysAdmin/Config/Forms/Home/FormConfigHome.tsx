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
import { IStoreState } from '@client/store'
import * as React from 'react'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { SysAdminContentWrapper } from '@client/views/SysAdmin/SysAdminContentWrapper'
import { Content } from '@opencrvs/components/lib/Content'
import {
  messages,
  draftTabsMessages
} from '@client/i18n/messages/views/formConfig'
import { DraftStatus, Event } from '@client/utils/gateway'
import { DraftsTab } from './DraftsTab'
import { selectFormDraft } from '@client/forms/configuration/formConfig/selectors'
import { PreviewTab } from './PreviewTab'
import { PublishedTab } from './PublishedTab'
import styled from 'styled-components'
import { Alert } from '@opencrvs/components/lib/Alert'
import { Text } from '@opencrvs/components/lib/Text'
import { constantsMessages } from '@client/i18n/messages'
import {
  ActionState,
  ActionContext,
  ActionsModal,
  defaultActionState
} from './ActionsModal'
import { ActionsNotification } from './ActionsNotification'
import { FormTabs } from '@opencrvs/components/lib/FormTabs'

const StyledAlert = styled(Alert)`
  margin: 24px auto 16px;
  max-width: 778px;
`

export function UnpublishedWarning({ compact }: { compact?: boolean }) {
  const intl = useIntl()
  const { status: birthStatus } = useSelector((store: IStoreState) =>
    selectFormDraft(store, Event.Birth)
  )
  const { status: deathStatus } = useSelector((store: IStoreState) =>
    selectFormDraft(store, Event.Death)
  )
  const events: string[] = []
  if (birthStatus !== DraftStatus.Published) {
    events.push(intl.formatMessage(constantsMessages[Event.Birth]))
  }
  if (deathStatus !== DraftStatus.Published) {
    events.push(intl.formatMessage(constantsMessages[Event.Death]))
  }

  if (compact) {
    return (
      <>
        {events.length > 0 && (
          <Text color="negativeDark" variant="bold16" element="p">
            {intl.formatMessage(messages.publishedWarning, {
              events: events.join(', ')
            })}
          </Text>
        )}
      </>
    )
  }

  return (
    <>
      {events.length > 0 && (
        <StyledAlert type="warning">
          {intl.formatMessage(messages.publishedWarning, {
            events: events.join(', ')
          })}
        </StyledAlert>
      )}
    </>
  )
}

export function FormConfigHome() {
  const intl = useIntl()
  const [selectedTab, setSelectedTab] = React.useState<string>(
    DraftStatus.Draft
  )
  /* This reducer is for ActionsModal and Notifications */
  const [actionState, setAction] = React.useReducer(
    (state: ActionState, newState: Partial<ActionState>) => ({
      ...state,
      ...newState
    }),
    defaultActionState
  )

  return (
    <SysAdminContentWrapper isCertificatesConfigPage hideBackground={true}>
      {<UnpublishedWarning />}
      <Content
        title={intl.formatMessage(messages.title)}
        subtitle={
          selectedTab === DraftStatus.InPreview
            ? intl.formatMessage(messages.previewDescription)
            : selectedTab === DraftStatus.Published
            ? intl.formatMessage(messages.publishedDescription)
            : undefined
        }
        tabBarContent={
          <FormTabs
            sections={[
              {
                id: DraftStatus.Draft,
                title: intl.formatMessage(draftTabsMessages[DraftStatus.Draft])
              },
              {
                id: DraftStatus.InPreview,
                title: intl.formatMessage(
                  draftTabsMessages[DraftStatus.InPreview]
                )
              },
              {
                id: DraftStatus.Published,
                title: intl.formatMessage(
                  draftTabsMessages[DraftStatus.Published]
                )
              }
            ]}
            activeTabId={selectedTab}
            onTabClick={(tabId) => setSelectedTab(tabId)}
          />
        }
      >
        <ActionContext.Provider value={{ actionState, setAction }}>
          {selectedTab === DraftStatus.Draft ? (
            <DraftsTab />
          ) : selectedTab === DraftStatus.InPreview ? (
            <PreviewTab />
          ) : selectedTab === DraftStatus.Published ? (
            <PublishedTab />
          ) : (
            <></>
          )}
          <ActionsModal />
          <ActionsNotification />
        </ActionContext.Provider>
      </Content>
    </SysAdminContentWrapper>
  )
}
