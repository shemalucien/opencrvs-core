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
import { defineMessages, MessageDescriptor } from 'react-intl'

interface INavigationMessages
  extends Record<string | number | symbol, MessageDescriptor> {
  progress: MessageDescriptor
  readyForReview: MessageDescriptor
  sentForReview: MessageDescriptor
  requiresUpdate: MessageDescriptor
  approvals: MessageDescriptor
  waitingValidation: MessageDescriptor //Waiting for validation',
  print: MessageDescriptor
  application: MessageDescriptor
  performance: MessageDescriptor
  team: MessageDescriptor
  vsexports: MessageDescriptor
  config: MessageDescriptor
  certificate: MessageDescriptor
  completenessRates: MessageDescriptor
  form: MessageDescriptor
  integration: MessageDescriptor
  communications: MessageDescriptor
  informantnotification: MessageDescriptor
  outbox: MessageDescriptor
}

const messagesToDefine: INavigationMessages = {
  progress: {
    defaultMessage: 'In progress',
    description: 'In progress label in navigation',
    id: 'navigation.progress'
  },
  readyForReview: {
    defaultMessage: 'Ready for review',
    description: 'Ready for review label in navigation',
    id: 'navigation.readyForReview'
  },
  sentForReview: {
    defaultMessage: 'Sent for review',
    description: 'Sent for review label in navigation',
    id: 'navigation.sentForReview'
  },
  requiresUpdate: {
    defaultMessage: 'Requires update',
    description: 'Requires update label for registrar in navigation',
    id: 'navigation.requiresUpdate'
  },
  approvals: {
    defaultMessage: 'Sent for approval',
    description: 'Sent for approval label in navigation',
    id: 'navigation.approvals'
  },
  waitingValidation: {
    defaultMessage: 'In external validation',
    description: 'Waiting for validation label in navigation',
    id: 'navigation.waitingValidation'
  },
  print: {
    defaultMessage: 'Ready to print',
    description: 'Ready to print label in navigation',
    id: 'navigation.print'
  },
  application: {
    defaultMessage: 'Application',
    description: 'Application label in navigation',
    id: 'navigation.application'
  },
  performance: {
    defaultMessage: 'Performance',
    description: 'Performance label in navigation',
    id: 'navigation.performance'
  },
  team: {
    defaultMessage: 'Team',
    description: 'Team label in navigation',
    id: 'navigation.team'
  },
  config: {
    defaultMessage: 'Config',
    description: 'Config label in navigation',
    id: 'navigation.config'
  },
  certificate: {
    defaultMessage: 'Certificate',
    description: 'Certificates label in navigation',
    id: 'navigation.certificate'
  },
  vsexports: {
    defaultMessage: 'Vital statistics',
    description: 'Reports label in navigation',
    id: 'navigation.reports'
  },
  completenessRates: {
    defaultMessage: 'Completeness rates',
    description: 'Completeness rates in navigation',
    id: 'navigation.completenessRates'
  },
  form: {
    defaultMessage: 'Declaration forms',
    description: 'Declaration forms label in navigation',
    id: 'navigation.declarationForms'
  },
  integration: {
    defaultMessage: 'Integrations',
    description: 'Integration forms label in navigation',
    id: 'navigation.integration'
  },
  communications: {
    defaultMessage: 'Communications',
    description: 'Communications label in navigation',
    id: 'navigation.communications'
  },
  informantnotification: {
    defaultMessage: 'Informant notifications',
    description: 'Informant notifications label in navigation',
    id: 'navigation.informantNotification'
  },
  outbox: {
    defaultMessage: 'Outbox',
    description: 'Label for navigation item outbox',
    id: 'navigation.outbox'
  }
}

export const navigationMessages: INavigationMessages =
  defineMessages(messagesToDefine)
