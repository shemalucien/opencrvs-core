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
import { EMPTY_STRING } from '@client/utils/constants'
import * as React from 'react'
import {
  CheckboxGroup,
  ICheckboxOption,
  ResponsiveModal
} from '@client/../../components/lib'
import { useIntl } from 'react-intl'
import { buttonMessages, constantsMessages } from '@client/i18n/messages'
import { TertiaryButton, PrimaryButton } from '@opencrvs/components/lib/buttons'
import { Text } from '@opencrvs/components/lib/Text'
import { Calendar, User, MapPin } from 'react-feather'
import styled from '@client/styledComponents'
import { IExportReportFilters } from './ExportReportButton'
import { endOfYear, subDays, subMonths } from 'date-fns'
import format from '@client/utils/date-formatting'
import { constantsMessages as messages } from '@client/i18n/messages/constants'

interface IProps {
  show: boolean
  onSuccess: () => void
  onClose: () => void
  state: IExportReportFilters
}

const LocationIcon = styled(MapPin)`
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.grey600};
`

const UserIcon = styled(User)`
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.grey600};
`

const CalendarIcon = styled(Calendar)`
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.grey600};
`

const FilterRow = styled.div`
  margin: 4px 0;
`

function getRangeDescription(startDate: Date, endDate: Date): string {
  // TODO: Is this the right way to use intl?
  const intl = useIntl()
  const today = new Date(Date.now())
  const currentYear = today.getFullYear()
  const date30DaysBack = subDays(today, 30)
  const date12MonthsBack = subMonths(today, 12)
  const lastYear = new Date(currentYear - 1, 0)
  const last2Year = new Date(currentYear - 2, 0)
  const last3Year = new Date(currentYear - 3, 0)

  if (endDate >= today) {
    if (startDate.toDateString() == date30DaysBack.toDateString()) {
      return intl.formatMessage(constantsMessages.last30Days)
    }
    if (startDate.toDateString() == date12MonthsBack.toDateString()) {
      return intl.formatMessage(constantsMessages.last12Months)
    }
  }
  if (
    startDate.toDateString() == lastYear.toDateString() &&
    endDate.toDateString() == endOfYear(lastYear).toDateString()
  ) {
    return format(lastYear, 'yyyy')
  }
  if (
    startDate.toDateString() == last2Year.toDateString() &&
    endDate.toDateString() == endOfYear(last2Year).toDateString()
  ) {
    return format(last2Year, 'yyyy')
  }
  if (
    startDate.toDateString() == last3Year.toDateString() &&
    endDate.toDateString() == endOfYear(last3Year).toDateString()
  ) {
    return format(last3Year, 'yyyy')
  }
  return `${format(startDate, 'MMMM yyyy')} - ${format(endDate, 'MMMM yyyy')}`
}

export function ExportReportModal({ show, onClose, onSuccess, state }: IProps) {
  const intl = useIntl()
  const [phoneNumber, setPhoneNumber] = React.useState(EMPTY_STRING)

  const inputProps = {
    id: 'id',
    onChange: () => {},
    onBlur: () => {},
    value: {}
    // disabled: fieldDefinition.disabled,
    // error: Boolean(error),
    // touched: Boolean(touched),
    // placeholder: fieldDefinition.placeholder
  }

  const x = getRangeDescription(state.timeStart, state.timeEnd)

  //var selectedValues : FormFieldValue[]

  const sectionOptions: ICheckboxOption[] = [
    { value: '', label: 'Completion rates' },
    { value: '', label: 'Registrations' },
    { value: '', label: 'Certificates issued' },
    { value: '', label: 'Sources of applications' },
    { value: '', label: 'Corrections' },
    { value: '', label: 'Fees collected' }
  ]

  const onSuccessChangeNumber = (phoneNumber: string) => {
    setPhoneNumber(phoneNumber)
  }
  const restoreState = () => {
    setPhoneNumber(EMPTY_STRING)
  }
  React.useEffect(() => {
    if (!show) {
      restoreState()
    }
  }, [show])

  return (
    <ResponsiveModal
      id="ExportReportModal"
      show={show}
      title="Export report"
      actions={[
        <TertiaryButton key="cancel" id="modal_cancel" onClick={onClose}>
          {intl.formatMessage(buttonMessages.cancel)}
        </TertiaryButton>,
        <PrimaryButton
          id="continue-button"
          key="continue"
          onClick={() => {
            console.log('Click')
            //continueButtonHandler(phoneNumber)
          }}
          //disabled={!Boolean(phoneNumber.length) || isInvalidPhoneNumber}
        >
          {intl.formatMessage(buttonMessages.exportButton)}
        </PrimaryButton>
      ]}
      handleClose={onClose}
      contentHeight={390}
      contentScrollableY={true}
    >
      <Text element="p" color="supportingCopy" variant="reg16">
        A PDF report will be generated with the following sections
      </Text>
      <FilterRow>
        <LocationIcon size={14} color="black" />
        <Text element="span" color="copy" variant="bold16">
          {state.selectedLocation.displayLabel}
        </Text>
      </FilterRow>
      <FilterRow>
        <UserIcon size={14} />
        <Text element="span" color="copy" variant="bold16">
          {state.event.toString() ==
          messages.birth.defaultMessage?.toString().toLowerCase()
            ? messages.births.defaultMessage
            : messages.deaths.defaultMessage}
        </Text>
      </FilterRow>
      <FilterRow>
        {/* How to set the colour correctly? */}
        <CalendarIcon size={14} color="black" />
        <Text element="span" color="copy" variant="bold16">
          {getRangeDescription(state.timeStart, state.timeEnd)}
        </Text>
      </FilterRow>
      <CheckboxGroup
        {...inputProps}
        options={sectionOptions}
        name={'SectionOptions'}
        value={['value??']}
        onChange={(val: string[]) => console.log('onchange: ', val)}
      />
    </ResponsiveModal>
  )
}