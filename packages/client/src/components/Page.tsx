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
import styled from '@client/styledComponents'
import { RouteComponentProps, withRouter } from 'react-router'
import { connect } from 'react-redux'
import { IStoreState } from '@opencrvs/client/src/store'
import { setInitialDeclarations } from '@client/declarations'
import { Spinner } from '@opencrvs/components/lib/Spinner'
import {
  getOfflineData,
  getOfflineDataLoaded,
  getOfflineLoadingError
} from '@client/offline/selectors'
import { checkAuth } from '@client/profile/profileActions'
import {
  showConfigurationErrorNotification,
  hideConfigurationErrorNotification
} from '@client/notification/actions'
import { changeLanguage } from '@client/i18n/actions'
import { Ii18n } from '@client/type/i18n'
import { getPreferredLanguage } from '@client/i18n/utils'
import { getInitialDeclarationsLoaded } from '@client/declarations/selectors'
import { isRegisterFormReady } from '@client/forms/register/declaration-selectors'
import { isFormConfigLoaded } from '@client/forms/configuration/formConfig/selectors'
import { IOfflineData } from '@client/offline/reducer'
import { isNavigatorOnline } from '@client/utils'

const StyledPage = styled.div<IPageProps>`
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  box-sizing: border-box;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *:before,
  *:after {
    box-sizing: border-box;
  }
`

const StyledSpinner = styled(Spinner)`
  position: absolute;
  margin-left: -24px;
  margin-top: -24px;
  top: calc(50% - 20px);
  left: 50%;
  width: 40px;
  height: 40px;
`
export const StyledText = styled.div`
  position: absolute;
  top: 44%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 251px;
  height: 32px;
  ${({ theme }) => theme.fonts.h3};
  color: ${({ theme }) => theme.colors.grey600};
`

interface IPageProps {
  initialDeclarationsLoaded: boolean
  offlineDataLoaded: boolean
  registerFormLoaded: boolean
  formConfigLoaded: boolean
  loadingError: boolean
  offlineData: IOfflineData | undefined
  children?: React.ReactNode
}

interface IDispatchProps {
  setInitialDeclarations: () => void
  checkAuth: typeof checkAuth
  showConfigurationErrorNotification: () => void
  hideConfigurationErrorNotification: () => void
  changeLanguage: (values: Ii18n) => void
}

class Component extends React.Component<
  RouteComponentProps<{}> & IPageProps & IDispatchProps
> {
  componentDidUpdate(
    prevProps: RouteComponentProps<{}> & IPageProps & IDispatchProps
  ) {
    const { hash } = this.props.location
    const hashChanged = hash && hash !== prevProps.location.hash
    const appName = this.props.offlineData
      ? this.props.offlineData.config.APPLICATION_NAME
      : ''
    if (appName) document.title = appName
    if (hashChanged) {
      // Push onto callback queue so it runs after the DOM is updated,
      // this is required when navigating from a different page so that
      // the element is rendered on the page before trying to getElementById.
      setTimeout(() => {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView()
        }
      }, 0)
    }
    if (this.props.loadingError && isNavigatorOnline()) {
      this.props.showConfigurationErrorNotification()
    }
    if (prevProps.loadingError && !this.props.loadingError) {
      this.props.hideConfigurationErrorNotification()
    }
  }

  async componentDidMount() {
    const language = await getPreferredLanguage()

    this.props.changeLanguage({ language })

    this.props.checkAuth()
  }

  render() {
    const {
      initialDeclarationsLoaded,
      offlineDataLoaded,
      registerFormLoaded,
      formConfigLoaded,
      children
    } = this.props

    if (
      offlineDataLoaded &&
      initialDeclarationsLoaded &&
      registerFormLoaded &&
      formConfigLoaded
    ) {
      return (
        <div id="readyDeclaration">
          <StyledPage {...this.props}>{children}</StyledPage>
        </div>
      )
    } else {
      return (
        <>
          <StyledSpinner id="appSpinner" />
        </>
      )
    }
  }
}

const mapStateToProps = (store: IStoreState) => {
  return {
    initialDeclarationsLoaded: getInitialDeclarationsLoaded(store),
    offlineDataLoaded: getOfflineDataLoaded(store),
    loadingError: getOfflineLoadingError(store),
    registerFormLoaded: isRegisterFormReady(store),
    formConfigLoaded: isFormConfigLoaded(store),
    offlineData: getOfflineDataLoaded(store) ? getOfflineData(store) : undefined
  }
}

const mapDispatchToProps = {
  setInitialDeclarations,
  checkAuth,
  showConfigurationErrorNotification,
  hideConfigurationErrorNotification,
  changeLanguage
}

export const Page = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Component)
)
