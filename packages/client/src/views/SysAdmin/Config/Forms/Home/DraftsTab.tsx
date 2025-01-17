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
import {
  ListViewSimplified,
  ListViewItemSimplified
} from '@opencrvs/components/lib/ListViewSimplified'
import { useSelector, useDispatch } from 'react-redux'
import { IStoreState } from '@client/store'
import { selectFormDraft } from '@client/forms/configuration/formConfig/selectors'
import { BirthSection, DeathSection } from '@client/forms'
import { useIntl } from 'react-intl'
import { buttonMessages } from '@client/i18n/messages'
import {
  messages,
  draftStatusMessages
} from '@client/i18n/messages/views/formConfig'
import { LinkButton } from '@opencrvs/components/lib/buttons'
import { ToggleMenu } from '@opencrvs/components/lib/ToggleMenu'
import { Pill } from '@opencrvs/components/lib/Pill'
import { Icon } from '@opencrvs/components/lib/Icon'
import { goToFormConfigWizard } from '@client/navigation'
import { IFormDraft } from '@client/forms/configuration/formDrafts/utils'
import { DraftStatus, Event } from '@client/utils/gateway'
import { Value, DraftVersion } from './components'
import {
  ActionStatus,
  isDefaultDraft
} from '@client/views/SysAdmin/Config/Forms/utils'
import { ActionContext, Actions } from './ActionsModal'
import { FormConfigMobileViewModal } from './FormConfigMobileViewModal'
import { isMobileDevice } from '@client/utils/commonUtils'

function ActionButton({ event, version }: IFormDraft) {
  const intl = useIntl()
  const dispatch = useDispatch()
  const [showMobileModal, setMobileModal] = React.useState(false)
  const toggleModal = () => setMobileModal((prev) => !prev)
  return (
    <>
      <LinkButton
        onClick={() => {
          if (isMobileDevice()) {
            toggleModal()
          } else {
            dispatch(
              goToFormConfigWizard(
                event,
                event === Event.Birth
                  ? BirthSection.Child
                  : DeathSection.Deceased
              )
            )
          }
        }}
      >
        {intl.formatMessage(
          isDefaultDraft({ version })
            ? buttonMessages.configure
            : buttonMessages.edit
        )}
      </LinkButton>
      <FormConfigMobileViewModal
        showModal={showMobileModal}
        toggleModal={toggleModal}
      />
    </>
  )
}

function OptionsMenu({ event }: { event: Event }) {
  const intl = useIntl()
  const { setAction } = React.useContext(ActionContext)

  return (
    <ToggleMenu
      id="draftActions"
      toggleButton={
        <Icon name="DotsThreeVertical" color="primary" size="large" />
      }
      menuItems={[
        {
          label: intl.formatMessage(buttonMessages.preview),
          handler: () => {
            setAction({
              action: Actions.PREVIEW,
              event: event,
              status: ActionStatus.MODAL
            })
          }
        },
        {
          label: intl.formatMessage(buttonMessages.delete),
          handler: () => {
            setAction({
              action: Actions.DELETE,
              event: event,
              status: ActionStatus.MODAL
            })
          }
        }
      ]}
    />
  )
}

function EventDrafts({ event }: { event: Event }) {
  const intl = useIntl()
  const formDraft = useSelector((store: IStoreState) =>
    selectFormDraft(store, event)
  )
  const { comment, history, status, version } = formDraft
  const actions = (
    <>
      <ActionButton {...formDraft} />
      {!isDefaultDraft(formDraft) && <OptionsMenu event={event} />}
    </>
  )

  return (
    <>
      <ListViewItemSimplified
        key={version}
        label={<DraftVersion event={event} version={version} />}
        value={
          <Value>
            {isDefaultDraft(formDraft)
              ? intl.formatMessage(messages.defaultComment)
              : comment}
          </Value>
        }
        actions={
          status === DraftStatus.Draft ? (
            actions
          ) : status === DraftStatus.InPreview ? (
            <Pill
              label={intl.formatMessage(
                draftStatusMessages[DraftStatus.InPreview]
              )}
              type="active"
            />
          ) : (
            <Pill
              label={intl.formatMessage(
                draftStatusMessages[DraftStatus.Published]
              )}
              type="active"
            />
          )
        }
      />
      {history
        .filter((draftHistory) => !isDefaultDraft(draftHistory))
        .map(({ comment, version }) => (
          <ListViewItemSimplified
            key={version}
            label={<DraftVersion event={event} version={version} />}
            value={<Value>{comment}</Value>}
          />
        ))}
    </>
  )
}

export function DraftsTab() {
  return (
    <ListViewSimplified>
      <EventDrafts event={Event.Birth} />
      <EventDrafts event={Event.Death} />
    </ListViewSimplified>
  )
}
