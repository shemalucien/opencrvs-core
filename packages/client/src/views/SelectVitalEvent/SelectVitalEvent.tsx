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
import styled, { keyframes } from 'styled-components'
import { WrappedComponentProps as IntlShapeProps, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { PrimaryButton } from '@opencrvs/components/lib/buttons'
import { ErrorText } from '@opencrvs/components/lib/ErrorText'
import { FixedEventTopBar } from '@opencrvs/components/lib/EventTopBar'
import { RadioButton } from '@opencrvs/components/lib/Radio'
import { BodyContent, Container } from '@opencrvs/components/lib/Content'
import { Event } from '@client/utils/gateway'
import {
  goBack,
  goToHome,
  goToBirthInformant,
  goToDeathInformant,
  goToEventInfo
} from '@client/navigation'
import { messages } from '@client/i18n/messages/views/selectVitalEvent'
import { constantsMessages, buttonMessages } from '@client/i18n/messages'
import {
  PAGE_TRANSITIONS_CLASSNAME,
  PAGE_TRANSITIONS_ENTER_TIME,
  PAGE_TRANSITIONS_TIMING_FUNC_N_FILL_MODE
} from '@client/utils/constants'
import {
  storeDeclaration,
  IDeclaration,
  createDeclaration
} from '@client/declarations'

const Title = styled.h4`
  ${({ theme }) => theme.fonts.h2};
  margin-top: 16px;
  margin-bottom: 24px;
`
const Actions = styled.div`
  padding-bottom: 24px;
  & > div {
    margin-bottom: 16px;
  }
  @media (max-width: ${({ theme }) => theme.grid.breakpoints.md}px) {
    padding-bottom: 16px;
  }
`

const fadeFromBottom = keyframes`
from {
   -webkit-transform: translateY(100%);
   transform: translateY(100%);
  }
`
const StyledContainer = styled.div`
  top: 0;
  min-height: calc(100vh);
  width: 100%;
  &.${PAGE_TRANSITIONS_CLASSNAME}-enter {
    animation: ${fadeFromBottom} ${PAGE_TRANSITIONS_ENTER_TIME}ms
      ${PAGE_TRANSITIONS_TIMING_FUNC_N_FILL_MODE};
    z-index: 999;
  }

  &.${PAGE_TRANSITIONS_CLASSNAME}-enter-done {
    position: fixed;
  }
  &.${PAGE_TRANSITIONS_CLASSNAME}-enter-active {
    z-index: 999;
    position: fixed;
  }
`
class SelectVitalEventView extends React.Component<
  IntlShapeProps & {
    goBack: typeof goBack
    goToHome: typeof goToHome
    storeDeclaration: typeof storeDeclaration
    goToEventInfo: typeof goToEventInfo
    goToBirthInformant: typeof goToBirthInformant
    goToDeathInformant: typeof goToDeathInformant
  }
> {
  state = {
    goTo: '',
    noEventSelectedError: false
  }
  handleContinue = () => {
    if (this.state.goTo === '') {
      this.setState({ noEventSelectedError: true })
    } else {
      if (window.config.HIDE_EVENT_REGISTER_INFORMATION) {
        let declaration: IDeclaration
        switch (this.state.goTo as Event) {
          case Event.Birth:
            declaration = createDeclaration(Event.Birth)
            this.props.storeDeclaration(declaration)
            this.props.goToBirthInformant(declaration.id)
            break
          case Event.Death:
            declaration = createDeclaration(Event.Death)
            this.props.storeDeclaration(declaration)
            this.props.goToDeathInformant(declaration.id)
            break
          case Event.Marriage:
            declaration = createDeclaration(Event.Marriage)
            this.props.storeDeclaration(declaration)
            this.props.goToDeathInformant(declaration.id)
            break
          default:
            throw new Error(`Unknown eventType ${this.state.goTo}`)
        }
      } else {
        this.props.goToEventInfo(this.state.goTo as Event)
      }
    }
  }

  render() {
    const { intl } = this.props
    return (
      <StyledContainer
        id="select-vital-event-view"
        className={PAGE_TRANSITIONS_CLASSNAME}
      >
        <Container>
          <FixedEventTopBar
            title={intl.formatMessage(messages.registerNewEventTitle)}
            goHome={this.props.goToHome}
          />
          <BodyContent>
            <Title>
              {intl.formatMessage(messages.registerNewEventHeading)}
            </Title>
            {this.state.noEventSelectedError && (
              <ErrorText id="require-error">
                {intl.formatMessage(messages.errorMessage)}
              </ErrorText>
            )}
            <Actions id="select_vital_event_view">
              <RadioButton
                size="large"
                key="birthevent"
                name="birthevent"
                label={intl.formatMessage(constantsMessages.birth)}
                value="birth"
                id="select_birth_event"
                selected={this.state.goTo === 'birth' ? 'birth' : ''}
                onChange={() =>
                  this.setState({ goTo: 'birth', noEventSelectedError: false })
                }
              />
              <RadioButton
                size="large"
                key="deathevent"
                name="deathevent"
                label={intl.formatMessage(constantsMessages.death)}
                value="death"
                id="select_death_event"
                selected={this.state.goTo === 'death' ? 'death' : ''}
                onChange={() =>
                  this.setState({ goTo: 'death', noEventSelectedError: false })
                }
              />
              {window.config.MARRIAGE_REGISTRATION && (
                <RadioButton
                  size="large"
                  key="marriagevent"
                  name="marriageevent"
                  label={intl.formatMessage(constantsMessages.marriage)}
                  value="marriage"
                  id="select_marriage_event"
                  selected={this.state.goTo === 'marriage' ? 'marriage' : ''}
                  onChange={() =>
                    this.setState({
                      goTo: 'marriage',
                      noEventSelectedError: false
                    })
                  }
                />
              )}
            </Actions>
            <PrimaryButton id="continue" onClick={this.handleContinue}>
              {intl.formatMessage(buttonMessages.continueButton)}
            </PrimaryButton>
          </BodyContent>
        </Container>
      </StyledContainer>
    )
  }
}

export const SelectVitalEvent = connect(null, {
  goBack,
  goToHome,
  storeDeclaration,
  goToBirthInformant,
  goToDeathInformant,
  goToEventInfo
})(injectIntl(SelectVitalEventView))
