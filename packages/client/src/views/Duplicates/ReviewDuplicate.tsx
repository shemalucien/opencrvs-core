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
import { useParams, useHistory } from 'react-router'
import { client } from '@client/utils/apolloClient'
import { IDeclaration } from '@client/declarations'
import { useSelector, useDispatch } from 'react-redux'
import { IStoreState } from '@client/store'
import { ReviewSection } from '@client/views/RegisterForm/review/ReviewSection'
import { getQueryMapping } from '@client/views/DataProvider/QueryProvider'
import { DownloadAction, IForm } from '@client/forms'
import { getRegisterForm } from '@client/forms/register/declaration-selectors'
import { gqlToDraftTransformer } from '@client/transformer'
import { Event } from '@client/utils/gateway'
import {
  Loader,
  EventTopBar,
  ErrorToastNotification
} from '@opencrvs/components/lib/interface'
import { useIntl } from 'react-intl'
import { messages as registerMessages } from '@client/i18n/messages/views/register'
import { Duplicate } from '@opencrvs/components/lib/icons'
import { goBack } from '@client/navigation'
import { errorMessages, buttonMessages } from '@client/i18n/messages'

function findDeclarationById(id: string, declarations: IDeclaration[]) {
  return declarations.find((declaration) => declaration.id === id)
}

async function fetchDeclaration(
  id: string,
  event: Event,
  form: Record<Event, IForm>
) {
  const mapping = getQueryMapping(
    event,
    DownloadAction.LOAD_CERTIFICATE_DECLARATION
  )
  const { data } = await client.query({
    query: mapping?.query,
    variables: { id }
  })

  if (mapping?.dataKey && data?.[mapping.dataKey]) {
    const queryData = data[mapping.dataKey]
    const declarationData = gqlToDraftTransformer(
      form[event as Event],
      queryData
    )
    return { id, data: declarationData, event }
  }
}

export function ReviewDuplicate() {
  const { id, existingId, event } = useParams()
  const declarations = useSelector<IStoreState, IDeclaration[]>(
    (state) => state.declarationsState.declarations
  )
  const intl = useIntl()
  const dispatch = useDispatch()
  const form = useSelector(getRegisterForm)
  const [loading, setLoading] = React.useState(2)
  const [error, setError] = React.useState(false)
  const [left, setLeft] = React.useState(findDeclarationById(id, declarations))
  const [right, setRight] = React.useState(
    findDeclarationById(existingId, declarations)
  )
  const history = useHistory()

  React.useEffect(() => {
    async function fetchLeft() {
      try {
        const declaration = await fetchDeclaration(id, event, form)
        setLeft(declaration)
      } catch (e) {
        setError(true)
        setLoading((l) => l - 1)
      }
    }
    if (!left) {
      fetchLeft()
    } else {
      setLoading((l) => l - 1)
    }
  }, [id, event, form, left])

  React.useEffect(() => {
    async function fetchRight() {
      try {
        const declaration = await fetchDeclaration(existingId, event, form)
        setRight(declaration)
      } catch (e) {
        setError(true)
        setLoading((l) => l - 1)
      }
    }
    if (!right) {
      fetchRight()
    } else {
      setLoading((l) => l - 1)
    }
  }, [existingId, event, form, right])

  return (
    <>
      <EventTopBar
        title={intl.formatMessage(registerMessages.newVitalEventRegistration, {
          event
        })}
        pageIcon={<Duplicate />}
        goHome={() => dispatch(goBack())}
      />
      {error ? (
        <ErrorToastNotification
          retryButtonText={intl.formatMessage(buttonMessages.retry)}
          retryButtonHandler={() => history.go(0)}
        >
          {intl.formatMessage(errorMessages.pageLoadFailed)}
        </ErrorToastNotification>
      ) : loading > 0 ? (
        <Loader id="review-duplicate-loader" marginPercent={23} />
      ) : left && right ? (
        <ReviewSection
          pageRoute=""
          readonly
          duplicate
          draft={left}
          draft2={right}
        />
      ) : null}
    </>
  )
}