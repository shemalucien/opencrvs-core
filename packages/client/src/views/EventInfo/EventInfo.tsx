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
import { RouteComponentProps } from 'react-router'
import { Container, BodyContent } from '@opencrvs/components/lib/Content'
import {
  WrappedComponentProps as IntlShapeProps,
  MessageDescriptor,
  injectIntl
} from 'react-intl'
import { Event } from '@client/utils/gateway'
import { constantsMessages, buttonMessages } from '@client/i18n/messages'
import { FixedEventTopBar } from '@opencrvs/components/lib/EventTopBar'
import { messages } from '@client/i18n/messages/views/eventInfo'
import styled from '@client/styledComponents'
import {
  TertiaryButton,
  ICON_ALIGNMENT,
  PrimaryButton
} from '@opencrvs/components/lib/buttons'
import { BackArrow } from '@opencrvs/components/lib/icons'
import { BulletList } from '@opencrvs/components/lib/BulletList'
import { connect } from 'react-redux'
import {
  goBack,
  goToBirthInformant,
  goToDeathInformant,
  goToHome
} from '@client/navigation'
import {
  storeDeclaration,
  IDeclaration,
  createDeclaration
} from '@client/declarations'

interface IDispatchProps {
  goBack: typeof goBack
  goToHome: typeof goToHome
  storeDeclaration: typeof storeDeclaration
  goToBirthInformant: typeof goToBirthInformant
  goToDeathInformant: typeof goToDeathInformant
}
type IFullProps = RouteComponentProps<{ eventType: Event }> &
  IntlShapeProps &
  IDispatchProps

const Title = styled.h4`
  ${({ theme }) => theme.fonts.h2};
  color: ${({ theme }) => theme.colors.copy};
  margin-top: 16px;
  margin-bottom: 24px;
`

function EventInfoComponet(props: IFullProps) {
  const {
    match: {
      params: { eventType }
    },
    intl
  } = props
  let topBarTitle: MessageDescriptor
  let listItems: string[]

  function handleContinue() {
    let declaration: IDeclaration
    switch (eventType) {
      case Event.Birth:
        declaration = createDeclaration(Event.Birth)
        props.storeDeclaration(declaration)
        props.goToBirthInformant(declaration.id)

        break
      case Event.Death:
        declaration = createDeclaration(Event.Death)
        props.storeDeclaration(declaration)
        props.goToDeathInformant(declaration.id)
        break
      case Event.Marriage:
        declaration = createDeclaration(Event.Marriage)
        props.storeDeclaration(declaration)
        props.goToDeathInformant(declaration.id)
        break
      default:
        throw new Error(`Unknown eventType ${eventType}`)
    }
  }
  switch (eventType) {
    case Event.Birth:
      topBarTitle = constantsMessages.newBirthRegistration
      listItems = messages.birthBulletListItems.map((message) =>
        intl.formatMessage(message.index)
      )
      break
    case Event.Death:
      topBarTitle = constantsMessages.newDeathRegistration
      listItems = messages.deathBulletListItems.map((message) =>
        intl.formatMessage(message.index)
      )
      break
    case Event.Marriage:
      topBarTitle = constantsMessages.newMarriageRegistration
      listItems = messages.marriageBulletListItems.map((message) =>
        intl.formatMessage(message.index)
      )
      break
    default:
      topBarTitle = constantsMessages.newBirthRegistration
      listItems = messages.birthBulletListItems.map((message) =>
        intl.formatMessage(message.index)
      )
  }

  return (
    <Container id={`${eventType}-info-container`}>
      <FixedEventTopBar
        title={intl.formatMessage(topBarTitle)}
        goHome={props.goToHome}
      />
      <BodyContent>
        <TertiaryButton
          align={ICON_ALIGNMENT.LEFT}
          icon={() => <BackArrow />}
          onClick={props.goBack}
        >
          {intl.formatMessage(buttonMessages.back)}
        </TertiaryButton>
        <Title>{intl.formatMessage(messages.title, { eventType })}</Title>
        <BulletList
          id={`${eventType}-info-bullet-list`}
          items={listItems}
          font="reg18"
        />
        <PrimaryButton id="continue" onClick={handleContinue}>
          {intl.formatMessage(buttonMessages.continueButton)}
        </PrimaryButton>
      </BodyContent>
    </Container>
  )
}

export const EventInfo = connect(null, {
  goBack,
  goToHome,
  storeDeclaration,
  goToBirthInformant,
  goToDeathInformant
})(injectIntl(EventInfoComponet))
