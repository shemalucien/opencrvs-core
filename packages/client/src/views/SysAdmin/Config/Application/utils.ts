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

import { countries as countryList, lookup } from 'country-data'
import { orderBy, uniqBy } from 'lodash'
import {
  BirthActionId,
  DeathActionId,
  GeneralActionId
} from '@client/views/SysAdmin/Config/Application'
import { EMPTY_STRING } from '@client/utils/constants'
import { configApplicationMutations } from '@client/views/SysAdmin/Config/Application/mutations'
import { IOfflineData } from '@client/offline/reducer'
import { ConfigActionType } from '@client/views/SysAdmin/Config/Forms/Wizard/FormConfigSettings'
import { updateOfflineConfigData } from '@client/offline/actions'
import { Dispatch } from 'redux'
import { IApplicationConfig, ICurrency } from '@client/utils/referenceApi'

export type IActionType =
  | keyof typeof GeneralActionId
  | keyof typeof BirthActionId
  | keyof typeof DeathActionId
interface ICurrencyOptions {
  [key: string]: string
}

type ICountrylist = {
  alpha2: string
  alpha3: string
  countryCallingCodes: string[]
  currencies: string[]
  emoji: string
  ioc: string
  languages: string[]
  name: string
  status: string
}

export enum NOTIFICATION_STATUS {
  SUCCESS = 'success',
  IDLE = 'idle',
  IN_PROGRESS = 'inProgress',
  ERROR = 'error'
}

export const getAmountWithCurrencySymbol = (
  currency: ICurrency,
  amount: number
) => {
  const amountWithSymbol = new Intl.NumberFormat(
    `${currency.languagesAndCountry}-u-nu-mathsans`,
    {
      style: 'currency',
      currency: currency.isoCode
    }
  ).format(amount)

  return amountWithSymbol.normalize('NFKD').replace(/[\u0300-\u036F]/g, '')
}

export const getCurrencySymbol = (currency: ICurrency) => {
  const currencySymbol = lookup.currencies({
    code: currency.isoCode
  })[0].symbol
  return currencySymbol
}

export const getCurrencyObject = (value: string) => {
  const arr = value.split('-')
  return {
    isoCode: arr.pop(),
    languagesAndCountry: [arr.join('-')]
  }
}

export const getCountryName = (isoCode: string) => {
  const countryName = lookup.countries({ alpha3: isoCode })[0]
  return countryName && countryName.name
}

export function isValidRegEx(pattern: string): boolean {
  try {
    const value = ''
    value.match(pattern)
  } catch {
    return false
  }
  if (pattern === '') return false
  return true
}
export function isValidHexColorCode(value: string): boolean {
  const pattern = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

  try {
    pattern.test(value)
  } catch {
    return false
  }
  if (!pattern.test(value)) return false
  return true
}
export function isValidHexColorCodeEntry(value: string): boolean {
  const pattern = /^[A-Fa-f0-9]{0,6}$/
  try {
    pattern.test(value)
  } catch {
    return false
  }
  if (!pattern.test(value)) return false
  return true
}

export function isValidExample(pattern: string, example: string) {
  if (
    !isValidRegEx(pattern) ||
    !new RegExp(pattern).test(example) ||
    !pattern ||
    !example
  ) {
    return false
  }
  return true
}

export const getCurrencySelectOptions = () => {
  const currencyOptions = [] as ICurrencyOptions[]
  countryList.all.forEach((element: ICountrylist) => {
    const countryLanguage = lookup.languages({
      alpha3: element.languages[0]
    })
    const countryCurrency = lookup.currencies({
      code: element.currencies[0]
    })

    if (Boolean(element.currencies.length) && Boolean(countryLanguage[0])) {
      currencyOptions.push({
        value: `${countryLanguage[0].alpha2}-${element.alpha2}-${element.currencies[0]}`,
        label: countryCurrency[0].name
      })
    }
  })
  const uniqCurrencyOptions = uniqBy(currencyOptions, 'label')
  const sortedCountryOptions = orderBy(uniqCurrencyOptions, ['label'], ['asc'])
  return sortedCountryOptions
}

export const getFormattedFee = (value: string) => {
  let fee = value.replace(/,/g, '')
  if (!isNaN(Number(fee)) || !fee) {
    const decimalPlaces = fee.toString().split('.')[1]
    if (decimalPlaces && decimalPlaces.length > 2) {
      const calcDec = Math.pow(10, 2)
      fee = (Math.trunc(parseFloat(fee) * calcDec) / calcDec).toString()
    }
    if (fee.slice(-1) === '.') {
      return fee
        ? Number(Number(fee).toFixed(1)).toLocaleString().concat('.')
        : EMPTY_STRING
    } else {
      const intValue = fee.split('.')
      if (!fee) {
        return EMPTY_STRING
      }

      if (intValue[1]) {
        return Number(intValue[0])
          .toLocaleString()
          .concat('.' + intValue[1])
      }
      return Number(intValue[0]).toLocaleString()
    }
  }
  return EMPTY_STRING
}

export const isWithinFileLength = (base64data: string) => {
  const baseStr = base64data.substring(22)
  const decoded = window.atob(baseStr)
  if (decoded.length >= 2000000) {
    return false
  }
  return true
}

const isGeneralOrConfigAction = (
  configProperty: IActionType | ConfigActionType
): configProperty is GeneralActionId | ConfigActionType => {
  return (
    Object.keys(GeneralActionId).includes(configProperty) ||
    Object.keys(ConfigActionType).includes(configProperty)
  )
}

export async function callApplicationConfigMutation(
  configProperty: IActionType | ConfigActionType,
  appConfig: IApplicationConfig,
  dispatch: Dispatch,
  setNotificationStatus: (status: NOTIFICATION_STATUS) => void
) {
  try {
    setNotificationStatus(NOTIFICATION_STATUS.IN_PROGRESS)
    const res = await configApplicationMutations.mutateApplicationConfig(
      configProperty === ConfigActionType.INFORMANT_SIGNATURE
        ? {
            INFORMANT_SIGNATURE: appConfig.INFORMANT_SIGNATURE,
            INFORMANT_SIGNATURE_REQUIRED: appConfig.INFORMANT_SIGNATURE_REQUIRED
          }
        : isGeneralOrConfigAction(configProperty)
        ? {
            [configProperty]: appConfig[configProperty]
          }
        : configProperty in BirthActionId
        ? { BIRTH: appConfig.BIRTH }
        : { DEATH: appConfig.DEATH }
    )
    if (res && res.data) {
      const updatedConfigs = res.data.updateApplicationConfig
      setNotificationStatus(NOTIFICATION_STATUS.SUCCESS)
      const offlineConfig = {
        config: {
          ...updatedConfigs
        }
      }
      dispatch(updateOfflineConfigData(offlineConfig))
    }
  } catch (err) {
    throw err
  }
}
