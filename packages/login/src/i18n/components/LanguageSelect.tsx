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
import { useDispatch, useSelector } from 'react-redux'
import { changeLanguage } from '@login/i18n/actions'
import {
  ISelect2Option,
  Select2
} from '@opencrvs/components/lib/Select/Select2'
import styled from 'styled-components'
import { useSearchQuery } from '@login/i18n/utils'
import { getLanguages, getLanguage } from '@login/i18n/selectors'
import { useHistory, useLocation } from 'react-router'

const SelectContainer = styled.div`
  ${({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: end;
  padding: 24px 24px 8px;
`

function useLanguage(selectedLanguage: string, paramLanguage: string | null) {
  const applicationLanguages = window.config.LANGUAGES.split(',')
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const languages = useSelector(getLanguages)

  const languageOptions: ISelect2Option[] = Object.values(languages)
    .map(({ lang, displayName }) => ({ value: lang, label: displayName }))
    .filter(({ value }) => applicationLanguages.includes(value))

  const onChange = ({ value }: ISelect2Option) => {
    if (paramLanguage) {
      history.replace({
        pathname: location.pathname,
        search: `lang=${value}`
      })
    }
    dispatch(changeLanguage({ language: value }))
  }
  return [languageOptions, onChange] as const
}

export function LanguageSelect() {
  const paramLanguage = useSearchQuery('lang')
  const selectedLanguage = useSelector(getLanguage)

  const [languageOptions, onLanguageChange] = useLanguage(
    selectedLanguage,
    paramLanguage
  )

  return (
    <>
      {languageOptions.length > 1 && (
        <SelectContainer>
          <Select2
            value={selectedLanguage}
            options={languageOptions}
            onChange={onLanguageChange}
          />
        </SelectContainer>
      )}
    </>
  )
}
