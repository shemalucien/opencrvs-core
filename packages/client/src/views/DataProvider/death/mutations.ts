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
import { gql } from '@apollo/client'
import { REQUEST_DEATH_REG_CORRECTION } from '@client/forms/correction/mutations'
import { SubmissionAction } from '@client/forms'

const SUBMIT_DEATH_DECLARATION = gql`
  mutation createDeathRegistration($details: DeathRegistrationInput!) {
    createDeathRegistration(details: $details) {
      trackingId
      compositionId
      isPotentiallyDuplicate
    }
  }
`
const APPROVE_DEATH_DECLARATION = gql`
  mutation markDeathAsValidated($id: ID!, $details: DeathRegistrationInput!) {
    markDeathAsValidated(id: $id, details: $details)
  }
`
const REGISTER_DEATH_DECLARATION = gql`
  mutation markDeathAsRegistered($id: ID!, $details: DeathRegistrationInput!) {
    markDeathAsRegistered(id: $id, details: $details) {
      id
      registration {
        id
        status {
          id
          user {
            id
            name {
              use
              firstNames
              familyName
            }
            systemRole
          }
          location {
            id
            name
            alias
          }
          office {
            name
            alias
            address {
              district
              state
            }
          }
          type
          timestamp
          comments {
            comment
          }
        }
      }
    }
  }
`
const REJECT_DEATH_DECLARATION = gql`
  mutation markEventAsVoided(
    $id: String!
    $reason: String!
    $comment: String!
  ) {
    markEventAsVoided(id: $id, reason: $reason, comment: $comment)
  }
`

const ARCHIVE_DEATH_DECLARATION = gql`
  mutation markEventAsArchived(
    $id: String!
    $reason: String
    $comment: String
    $duplicateTrackingId: String
  ) {
    markEventAsArchived(
      id: $id
      reason: $reason
      comment: $comment
      duplicateTrackingId: $duplicateTrackingId
    )
  }
`

const COLLECT_DEATH_CERTIFICATE = gql`
  mutation markDeathAsCertified($id: ID!, $details: DeathRegistrationInput!) {
    markDeathAsCertified(id: $id, details: $details)
  }
`

const ISSUE_DEATH_CERTIFICATE = gql`
  mutation markDeathAsIssued($id: ID!, $details: DeathRegistrationInput!) {
    markDeathAsIssued(id: $id, details: $details)
  }
`

export function getDeathMutation(action: SubmissionAction) {
  switch (action) {
    case SubmissionAction.SUBMIT_FOR_REVIEW:
      return SUBMIT_DEATH_DECLARATION
    case SubmissionAction.APPROVE_DECLARATION:
      return APPROVE_DEATH_DECLARATION
    case SubmissionAction.REGISTER_DECLARATION:
      return REGISTER_DEATH_DECLARATION
    case SubmissionAction.REJECT_DECLARATION:
      return REJECT_DEATH_DECLARATION
    case SubmissionAction.ARCHIVE_DECLARATION:
      return ARCHIVE_DEATH_DECLARATION
    case SubmissionAction.CERTIFY_DECLARATION:
    case SubmissionAction.CERTIFY_AND_ISSUE_DECLARATION:
      return COLLECT_DEATH_CERTIFICATE
    case SubmissionAction.ISSUE_DECLARATION:
      return ISSUE_DEATH_CERTIFICATE
    case SubmissionAction.REQUEST_CORRECTION_DECLARATION:
      return REQUEST_DEATH_REG_CORRECTION
  }
}
