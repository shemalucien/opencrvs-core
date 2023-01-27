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

import { resolvers as certificateResolvers } from '@gateway/features/certificate/root-resolvers'
import { resolvers as locationRootResolvers } from '@gateway/features/location/root-resolvers'
import { resolvers as metricsRootResolvers } from '@gateway/features/metrics/root-resolvers'
import { resolvers as integrationResolver } from '@gateway/features/systems/root-resolvers'
import { typeResolvers as metricsTypeResolvers } from '@gateway/features/metrics/type-resolvers'
import { resolvers as notificationRootResolvers } from '@gateway/features/notification/root-resolvers'
import { resolvers as registrationRootResolvers } from '@gateway/features/registration/root-resolvers'
import { typeResolvers } from '@gateway/features/registration/type-resolvers'
import { resolvers as roleRootResolvers } from '@gateway/features/role/root-resolvers'
import { roleTypeResolvers } from '@gateway/features/role/type-resolvers'
import { resolvers as searchRootResolvers } from '@gateway/features/search/root-resolvers'
import { searchTypeResolvers } from '@gateway/features/search/type-resolvers'
import { resolvers as userRootResolvers } from '@gateway/features/user/root-resolvers'
import { resolvers as correctionRootResolvers } from '@gateway/features/correction/root-resolvers'
import { resolvers as applicationRootResolvers } from '@gateway/features/application/root-resolvers'
import { resolvers as formDraftResolvers } from '@gateway/features/formDraft/root-resolvers'
import { resolvers as bookmarkAdvancedSearchResolvers } from '@gateway/features/bookmarkAdvancedSearch/root-resolvers'
import { resolvers as formDatasetResolvers } from '@gateway/features/formDataset/root-resolver'
import { resolvers as informantSMSNotificationResolvers } from '@gateway/features/informantSMSNotifications/root-resolvers'
import {
  ISystemModelData,
  IUserModelData,
  userTypeResolvers
} from '@gateway/features/user/type-resolvers'
import {
  getUser,
  getTokenPayload,
  getSystem
} from '@gateway/features/user/utils'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { addResolversToSchema } from '@graphql-tools/schema'
import { AuthenticationError, Config, gql } from 'apollo-server-hapi'
import { readFileSync } from 'fs'
import { GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools'
import { merge, isEqual, uniqueId } from 'lodash'
import { certificateTypeResolvers } from '@gateway/features/certificate/type-resolvers'
import { informantSMSNotiTypeResolvers } from '@gateway/features/informantSMSNotifications/type-resolvers'

const graphQLSchemaPath = `${__dirname}/schema.graphql`

interface IStringIndexSignatureInterface {
  [index: string]: any
}

type StringIndexed<T> = T & IStringIndexSignatureInterface

const resolvers: StringIndexed<IResolvers> = merge(
  notificationRootResolvers as IResolvers,
  registrationRootResolvers as IResolvers,
  locationRootResolvers as IResolvers,
  userRootResolvers as IResolvers,
  userTypeResolvers as IResolvers,
  certificateTypeResolvers as IResolvers,
  metricsRootResolvers as IResolvers,
  integrationResolver as IResolvers,
  metricsTypeResolvers as IResolvers,
  typeResolvers as IResolvers,
  searchRootResolvers as IResolvers,
  searchTypeResolvers as IResolvers,
  roleRootResolvers as IResolvers,
  roleTypeResolvers as IResolvers,
  certificateResolvers as IResolvers,
  correctionRootResolvers as IResolvers,
  formDraftResolvers as IResolvers,
  applicationRootResolvers as IResolvers,
  integrationResolver as IResolvers,
  formDatasetResolvers as IResolvers,
  bookmarkAdvancedSearchResolvers as IResolvers,
  formDatasetResolvers as IResolvers,
  informantSMSNotificationResolvers as IResolvers,
  informantSMSNotiTypeResolvers as IResolvers
)

export const getExecutableSchema = (): GraphQLSchema => {
  const schema = loadSchemaSync(graphQLSchemaPath, {
    loaders: [new GraphQLFileLoader()]
  })

  return addResolversToSchema({
    schema,
    resolvers
  })
}

export const getApolloConfig = (): Config => {
  const typeDefs = gql`
    ${readFileSync(graphQLSchemaPath, 'utf8')}
  `

  return {
    typeDefs,
    resolvers,
    introspection: true,
    context: async ({ request, h }) => {
      try {
        const tokenPayload = getTokenPayload(
          request.headers.authorization.split(' ')[1]
        )
        const userId = tokenPayload.sub
        let user: IUserModelData | ISystemModelData
        const isSystemUser = tokenPayload.scope.indexOf('recordsearch') > -1
        if (isSystemUser) {
          user = await getSystem(
            { systemId: userId },
            { Authorization: request.headers.authorization }
          )
        } else {
          user = await getUser(
            { userId },
            { Authorization: request.headers.authorization }
          )
        }

        if (!user || !['active', 'pending'].includes(user.status)) {
          throw new AuthenticationError('Authentication failed')
        }

        if (tokenPayload && !isEqual(tokenPayload.scope, user.scope)) {
          throw new AuthenticationError('Authentication failed')
        }
      } catch (err) {
        throw new AuthenticationError(err)
      }

      return {
        Authorization: request.headers.authorization,
        'x-correlation-id': request.headers['x-correlation-id'] || uniqueId(),
        'x-real-ip':
          request.headers['x-real-ip'] || request.info?.remoteAddress,
        'x-real-user-agent': request.headers['user-agent']
      }
    }
  }
}
