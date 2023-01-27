import { AdditionalIdWithCompositionId } from '@client/utils/gateway'
import { AUDIT_ACTION } from '@client/views/SysAdmin/Team/user/UserAuditActionModal'

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

export const SHOW_USER_RECONNECTED_TOAST = 'SHOW_ONLINE_USER_SUCCESS_TOAST'
export const HIDE_USER_RECONNECTED_TOAST = 'HIDE_ONLINE_USER_SUCCESS_TOAST'

export const SHOW_CONFIG_ERROR = 'SHOW_CONFIG_ERROR'
export const HIDE_CONFIG_ERROR = 'HIDE_CONFIG_ERROR'
export const SESSION_EXPIRED = 'AUTH/SESSION_EXPIRED'
export const TOGGLE_DRAFT_SAVED_NOTIFICATION = 'TOGGLE_DRAFT_SAVED_NOTIFICATION'

export const SHOW_SUBMIT_FORM_SUCCESS_TOAST = 'SUBMIT_FORM_SUCCESS_TOAST'
export const HIDE_SUBMIT_FORM_SUCCESS_TOAST = 'HIDE_SUBMIT_FORM_SUCCESS_TOAST'
export const SHOW_SUBMIT_FORM_ERROR_TOAST = 'SHOW_SUBMIT_FORM_ERROR_TOAST'
export const SHOW_CREATE_USER_ERROR_TOAST = 'SHOW_CREATE_USER_ERROR_TOAST'
export const HIDE_SUBMIT_FORM_ERROR_TOAST = 'HIDE_SUBMIT_FORM_ERROR_TOAST '
export const HIDE_CREATE_USER_ERROR_TOAST = 'HIDE_CREATE_USER_ERROR_TOAST'

export const HIDE_DOWNLOAD_DECLARATION_FAILED_TOAST =
  'HIDE_DOWNLOAD_DECLARATION_FAILED_TOAST'
export const SHOW_DOWNLOAD_DECLARATION_FAILED_TOAST =
  'SHOW_DOWNLOAD_DECLARATION_FAILED_TOAST'

export const SHOW_USER_AUDIT_SUCCESS_TOAST = 'SHOW_USER_AUDIT_SUCCESS_TOAST'
export const HIDE_USER_AUDIT_SUCCESS_TOAST = 'HIDE_USER_AUDIT_SUCCESS_TOAST'

export const SHOW_DUPLICATE_RECORDS_TOAST = 'SHOW_DUPLICATE_RECORDS_TOAST'
export const HIDE_DUPLICATE_RECORDS_TOAST = 'HIDE_DUPLICATE_RECORDS_TOAST'

export const SHOW_PIN_UPDATE_SUCCESS = 'SHOW_PIN_UPDATE_SUCCESS'
export const HIDE_PIN_UPDATE_SUCCESS = 'HIDE_PIN_UPDATE_SUCCESS'

export const SHOW_UNASSIGNED = 'SHOW_UNASSIGNED'
export const HIDE_UNASSIGNED = 'HIDE_UNASSIGNED'

export type ShowConfigurationErrorAction = {
  type: typeof SHOW_CONFIG_ERROR
}

export type HideConfigurationErrorAction = {
  type: typeof HIDE_CONFIG_ERROR
}

export type toggleDraftSavedNotificationAction = {
  type: typeof TOGGLE_DRAFT_SAVED_NOTIFICATION
}

export type ShowSubmitFormSuccessToast = {
  type: typeof SHOW_SUBMIT_FORM_SUCCESS_TOAST
  payload: {
    data: string
  }
}

export type HideSubmitFormSuccessToast = {
  type: typeof HIDE_SUBMIT_FORM_SUCCESS_TOAST
}

export type ShowSubmitFormErrorToast = {
  type: typeof SHOW_SUBMIT_FORM_ERROR_TOAST
  payload: {
    data: string
  }
}
export type ShowCreateUserErrorToast = {
  type: typeof SHOW_CREATE_USER_ERROR_TOAST
  payload: {
    data: string
    mobile: string
  }
}

export type HideDownloadDeclarationFailedToast = {
  type: typeof HIDE_DOWNLOAD_DECLARATION_FAILED_TOAST
}

export type ShowDownloadDeclarationFailedToast = {
  type: typeof SHOW_DOWNLOAD_DECLARATION_FAILED_TOAST
}

export type HideSubmitFormErrorToast = {
  type: typeof HIDE_SUBMIT_FORM_ERROR_TOAST
}

export type HideCreateUserErrorToast = {
  type: typeof HIDE_CREATE_USER_ERROR_TOAST
}

export type ShowUserAuditSuccessToast = {
  type: typeof SHOW_USER_AUDIT_SUCCESS_TOAST
  payload: {
    userFullName: string
    action: AUDIT_ACTION
  }
}

export type HideUserAuditSuccessToast = {
  type: typeof HIDE_USER_AUDIT_SUCCESS_TOAST
}

export const showConfigurationErrorNotification =
  (): ShowConfigurationErrorAction => ({
    type: SHOW_CONFIG_ERROR
  })

export const hideConfigurationErrorNotification =
  (): HideConfigurationErrorAction => ({
    type: HIDE_CONFIG_ERROR
  })

export const toggleDraftSavedNotification =
  (): toggleDraftSavedNotificationAction => ({
    type: TOGGLE_DRAFT_SAVED_NOTIFICATION
  })

export type ShowUserReconnectedToastAction = {
  type: typeof SHOW_USER_RECONNECTED_TOAST
}

export type HideUserReconnectedToastAction = {
  type: typeof HIDE_USER_RECONNECTED_TOAST
}

export type SessionExpiredAction = {
  type: typeof SESSION_EXPIRED
}

export interface ShowUnassignedPayload extends Record<string, string> {
  trackingId: string
}

export type ShowUnassigned = {
  type: typeof SHOW_UNASSIGNED
  payload: ShowUnassignedPayload
}

export type HideUnassigned = {
  type: typeof HIDE_UNASSIGNED
}

export const showUserReconnectedToast = (): ShowUserReconnectedToastAction => ({
  type: SHOW_USER_RECONNECTED_TOAST
})

export const hideUserReconnectedToast = (): HideUserReconnectedToastAction => ({
  type: HIDE_USER_RECONNECTED_TOAST
})

export const showSessionExpireConfirmation = (): SessionExpiredAction => ({
  type: SESSION_EXPIRED
})

export const showSubmitFormSuccessToast = (
  data: string
): ShowSubmitFormSuccessToast => ({
  type: SHOW_SUBMIT_FORM_SUCCESS_TOAST,
  payload: { data }
})

export const hideSubmitFormSuccessToast = (): HideSubmitFormSuccessToast => ({
  type: HIDE_SUBMIT_FORM_SUCCESS_TOAST
})

export const showSubmitFormErrorToast = (
  data: string
): ShowSubmitFormErrorToast => ({
  type: SHOW_SUBMIT_FORM_ERROR_TOAST,
  payload: { data }
})

export const showCreateUserErrorToast = (
  data: string,
  mobile: string
): ShowCreateUserErrorToast => ({
  type: SHOW_CREATE_USER_ERROR_TOAST,
  payload: { data, mobile }
})

export const showDownloadDeclarationFailedToast =
  (): ShowDownloadDeclarationFailedToast => ({
    type: SHOW_DOWNLOAD_DECLARATION_FAILED_TOAST
  })

export const hideDownloadDeclarationFailedToast =
  (): HideDownloadDeclarationFailedToast => ({
    type: HIDE_DOWNLOAD_DECLARATION_FAILED_TOAST
  })

export const hideSubmitFormErrorToast = (): HideSubmitFormErrorToast => ({
  type: HIDE_SUBMIT_FORM_ERROR_TOAST
})

export const hideCreateUserErrorToast = (): HideCreateUserErrorToast => ({
  type: HIDE_CREATE_USER_ERROR_TOAST
})

export const showUserAuditSuccessToast = (
  userFullName: string,
  action: AUDIT_ACTION
): ShowUserAuditSuccessToast => ({
  type: SHOW_USER_AUDIT_SUCCESS_TOAST,
  payload: {
    userFullName,
    action
  }
})

export const hideUserAuditSuccessToast = (): HideUserAuditSuccessToast => ({
  type: HIDE_USER_AUDIT_SUCCESS_TOAST
})

export type ShowDuplicateRecordsToast = {
  type: typeof SHOW_DUPLICATE_RECORDS_TOAST
  payload: { trackingId: string; compositionId: string }
}

export const showDuplicateRecordsToast = ({
  trackingId,
  compositionId
}: AdditionalIdWithCompositionId): ShowDuplicateRecordsToast => ({
  type: SHOW_DUPLICATE_RECORDS_TOAST,
  payload: { trackingId, compositionId }
})

export type HideDuplicateRecordsToast = {
  type: typeof HIDE_DUPLICATE_RECORDS_TOAST
}

export const hideDuplicateRecordsToast = () => ({
  type: HIDE_DUPLICATE_RECORDS_TOAST
})

export type ShowPINUpdateSuccessAction = {
  type: typeof SHOW_PIN_UPDATE_SUCCESS
}

export type HidePINUpdateSuccessAction = {
  type: typeof HIDE_PIN_UPDATE_SUCCESS
}
export const showPINUpdateSuccessToast = (): ShowPINUpdateSuccessAction => ({
  type: SHOW_PIN_UPDATE_SUCCESS
})

export const hidePINUpdateSuccessToast = (): HidePINUpdateSuccessAction => ({
  type: HIDE_PIN_UPDATE_SUCCESS
})

export const showUnassigned = (
  data: ShowUnassignedPayload
): ShowUnassigned => ({
  type: SHOW_UNASSIGNED,
  payload: data
})

export const hideUnassignedModal = (): HideUnassigned => ({
  type: HIDE_UNASSIGNED
})

export type Action =
  | SessionExpiredAction
  | ShowConfigurationErrorAction
  | HideConfigurationErrorAction
  | toggleDraftSavedNotificationAction
  | ShowSubmitFormSuccessToast
  | ShowSubmitFormErrorToast
  | HideSubmitFormSuccessToast
  | HideSubmitFormErrorToast
  | ShowUserAuditSuccessToast
  | HideUserAuditSuccessToast
  | ShowPINUpdateSuccessAction
  | HidePINUpdateSuccessAction
  | ShowDownloadDeclarationFailedToast
  | HideDownloadDeclarationFailedToast
  | ShowUnassigned
  | HideUnassigned
  | ShowCreateUserErrorToast
  | HideCreateUserErrorToast
  | ShowDuplicateRecordsToast
  | HideDuplicateRecordsToast
  | ShowUserReconnectedToastAction
  | HideUserReconnectedToastAction
