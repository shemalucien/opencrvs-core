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

import { Event, CustomFieldType } from '@client/utils/gateway'
import { buttonMessages } from '@client/i18n/messages'
import { messages } from '@client/i18n/messages/views/formConfig'
import styled from 'styled-components'
import { LinkButton } from '@opencrvs/components/lib/buttons'
import {
  ListViewItemSimplified,
  ListViewSimplified
} from '@opencrvs/components/lib/ListViewSimplified'
import React from 'react'
import { useIntl, MessageDescriptor } from 'react-intl'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { addCustomField } from '@client/forms/configuration/formConfig/actions'
import { flushSync } from 'react-dom'
import { CenteredToggle } from './components'

const TitleContainer = styled.div`
  margin-top: 24px;
  margin-bottom: 15px;
  ${({ theme }) => theme.fonts.bold14}
`

const Label = styled.span`
  ${({ theme }) => theme.fonts.reg14};
  color: ${({ theme }) => theme.colors.grey600};
`

const MESSAGE_MAP: Record<CustomFieldType, MessageDescriptor> = {
  [CustomFieldType.Text]: messages.textInput,
  [CustomFieldType.Tel]: messages.phoneNumberInput,
  [CustomFieldType.Number]: messages.numberInput,
  [CustomFieldType.Textarea]: messages.textAreaInput,
  /* TODO */
  [CustomFieldType.Subsection]: messages.supportingCopy,
  [CustomFieldType.Paragraph]: messages.heading,
  [CustomFieldType.SelectWithOptions]: messages.customSelect,
  [CustomFieldType.Time]: messages.time,
  [CustomFieldType.SelectWithDynamicOptions]:
    messages.customSelectWithDynamicOptions
}

type IRouteProps = {
  event: Event
  section: string
}

type IFormToolsProps = {
  showHiddenFields: boolean
  onCustomFieldAdded: () => void
  setShowHiddenFields: React.Dispatch<React.SetStateAction<boolean>>
}

export const FormTools = ({
  showHiddenFields,
  onCustomFieldAdded,
  setShowHiddenFields
}: IFormToolsProps) => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const { event, section } = useParams<IRouteProps>()

  const toggleShowHiddenFields = () => setShowHiddenFields((prev) => !prev)

  const handleAddCustomField = (fieldType: CustomFieldType) => {
    flushSync(() => dispatch(addCustomField(event, section, fieldType)))
    onCustomFieldAdded()
  }

  return (
    <>
      <ListViewSimplified>
        <ListViewItemSimplified
          label={<Label>{intl.formatMessage(messages.showHiddenFields)}</Label>}
          actions={
            <CenteredToggle
              defaultChecked={showHiddenFields}
              onChange={toggleShowHiddenFields}
            />
          }
        />
      </ListViewSimplified>
      <TitleContainer>
        {intl.formatMessage(messages.addInputContent)}
      </TitleContainer>
      <ListViewSimplified>
        {Object.values(CustomFieldType).map((fieldType) => (
          <ListViewItemSimplified
            key={fieldType}
            label={<Label>{intl.formatMessage(MESSAGE_MAP[fieldType])}</Label>}
            actions={
              <LinkButton
                id={`add-${fieldType}-btn`}
                onClick={() => handleAddCustomField(fieldType)}
                size="small"
                /* TODO */
                disabled={
                  fieldType === CustomFieldType.Paragraph ||
                  fieldType === CustomFieldType.Subsection ||
                  fieldType === CustomFieldType.SelectWithDynamicOptions
                }
              >
                {intl.formatMessage(buttonMessages.add)}
              </LinkButton>
            }
          />
        ))}
      </ListViewSimplified>
    </>
  )
}
