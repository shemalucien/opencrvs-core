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
import { SubmissionAction } from '@client/forms'
import { REQUEST_MARRIAGE_REG_CORRECTION } from '@client/forms/correction/mutations'

const SUBMIT_MARRIAGE_DECLARATION = gql`
  mutation createMarriageRegistration($details: MarriageRegistrationInput!) {
    createMarriageRegistration(details: $details) {
      trackingId
      compositionId
    }
  }
`
const APPROVE_MARRIAGE_DECLARATION = gql`
  mutation markMarriageAsValidated(
    $id: ID!
    $details: MarriageRegistrationInput!
  ) {
    markMarriageAsValidated(id: $id, details: $details)
  }
`
const REGISTER_MARRIAGE_DECLARATION = gql`
  mutation markMarriageAsRegistered(
    $id: ID!
    $details: MarriageRegistrationInput!
  ) {
    markMarriageAsRegistered(id: $id, details: $details) {
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
const REJECT_MARRIAGE_DECLARATION = gql`
  mutation markEventAsVoided(
    $id: String!
    $reason: String!
    $comment: String!
  ) {
    markEventAsVoided(id: $id, reason: $reason, comment: $comment)
  }
`

const ARCHIVE_MARRIAGE_DECLARATION = gql`
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

const COLLECT_MARRIAGE_CERTIFICATE = gql`
  mutation markMarriageAsCertified(
    $id: ID!
    $details: MarriageRegistrationInput!
  ) {
    markMarriageAsCertified(id: $id, details: $details)
  }
`

const ISSUE_MARRIAGE_CERTIFICATE = gql`
  mutation markMarriageAsIssued(
    $id: ID!
    $details: MarriageRegistrationInput!
  ) {
    markMarriageAsIssued(id: $id, details: $details)
  }
`

export function getMarriageMutation(action: SubmissionAction) {
  switch (action) {
    case SubmissionAction.SUBMIT_FOR_REVIEW:
      return SUBMIT_MARRIAGE_DECLARATION
    case SubmissionAction.APPROVE_DECLARATION:
      return APPROVE_MARRIAGE_DECLARATION
    case SubmissionAction.REGISTER_DECLARATION:
      return REGISTER_MARRIAGE_DECLARATION
    case SubmissionAction.REJECT_DECLARATION:
      return REJECT_MARRIAGE_DECLARATION
    case SubmissionAction.ARCHIVE_DECLARATION:
      return ARCHIVE_MARRIAGE_DECLARATION
    case SubmissionAction.CERTIFY_DECLARATION:
    case SubmissionAction.CERTIFY_AND_ISSUE_DECLARATION:
      return COLLECT_MARRIAGE_CERTIFICATE
    case SubmissionAction.ISSUE_DECLARATION:
      return ISSUE_MARRIAGE_CERTIFICATE
    case SubmissionAction.REQUEST_CORRECTION_DECLARATION:
      return REQUEST_MARRIAGE_REG_CORRECTION
  }
}
