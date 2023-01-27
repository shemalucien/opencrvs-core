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
import {
  createCertificateHandler,
  deleteCertificateHandler,
  getActiveCertificatesHandler,
  getCertificateHandler,
  requestActiveCertificate,
  requestNewCertificate,
  updateCertificate,
  updateCertificateHandler
} from '@config/handlers/certificate/certificateHandler'
import configHandler, {
  getLoginConfigHandler,
  updateApplicationConfig,
  updateApplicationConfigHandler
} from '@config/handlers/application/applicationConfigHandler'
import createQuestionHandler, {
  formDatasetSchema,
  requestSchema as createQuestionReqSchema
} from '@config/handlers/question/createQuestion/handler'
import updateQuestionHandler, {
  requestSchema as updateQuestionReqSchema
} from '@config/handlers/question/updateQuestion/handler'
import getQuestionsHandler from '@config/handlers/question/getQuestions/handler'
import {
  createFormDraftHandler,
  requestSchema as createFormDraftReqSchema
} from '@config/handlers/formDraft/createFormDraft/handler'
import {
  modifyDraftStatusHandler,
  requestSchema as modifyFormDraftReqSchema
} from '@config/handlers/formDraft/updateFormDraft/handler'
import getFormDrafts from '@config/handlers/formDraft/getFormDrafts/handler'
import {
  deleteFormDraftHandler,
  requestSchema as deleteFormDraftReqSchema
} from '@config/handlers/formDraft/deleteFormDraft/handler'
import createInformantSMSNotificationHandler, {
  requestSchema as createInformantSMSNotificationReqSchema
} from '@config/handlers/informantSMSNotifications/createInformantSMSNotification/handler'
import getInformantSMSNotificationsHandler from '@config/handlers/informantSMSNotifications/getInformantSMSNotification/handler'
import updateInformantSMSNotificationHandler, {
  requestSchema as updateInformantSMSNotificationReqSchema
} from '@config/handlers/informantSMSNotifications/updateInformantSMSNotification/handler'
import getSystems from '@config/handlers/system/systemHandler'
import {
  createFormDatasetHandler,
  getFormDatasetHandler
} from '@config/handlers/formDataset/handler'

export const enum RouteScope {
  DECLARE = 'declare',
  REGISTER = 'register',
  CERTIFY = 'certify',
  PERFORMANCE = 'performance',
  SYSADMIN = 'sysadmin',
  VALIDATE = 'validate',
  NATLSYSADMIN = 'natlsysadmin'
}

export default function getRoutes() {
  return [
    // add ping route by default for health check
    {
      method: 'GET',
      path: '/ping',
      handler: (request: any, h: any) => {
        // Perform any health checks and return true or false for success prop
        return {
          success: true
        }
      },
      config: {
        auth: false,
        tags: ['api'],
        description: 'Health check endpoint'
      }
    },
    {
      method: 'GET',
      path: '/config',
      handler: configHandler,
      config: {
        auth: {
          scope: [
            RouteScope.NATLSYSADMIN,
            RouteScope.DECLARE,
            RouteScope.REGISTER,
            RouteScope.CERTIFY,
            RouteScope.PERFORMANCE,
            RouteScope.SYSADMIN,
            RouteScope.VALIDATE
          ]
        },
        tags: ['api'],
        description: 'Retrieve all configuration'
      }
    },
    {
      method: 'GET',
      path: '/loginConfig',
      handler: getLoginConfigHandler,
      config: {
        auth: false,
        tags: ['api'],
        description: 'Retrieve Application configuration'
      }
    },
    {
      method: 'GET',
      path: '/integrationConfig',
      handler: getSystems,
      config: {
        tags: ['api'],
        description: 'Retrieve Application integrations'
      }
    },
    {
      method: 'POST',
      path: '/getCertificate',
      handler: getCertificateHandler,
      config: {
        tags: ['api'],
        description: 'Retrieves certificate',
        auth: {
          scope: [
            RouteScope.NATLSYSADMIN,
            RouteScope.REGISTER,
            RouteScope.CERTIFY,
            RouteScope.VALIDATE
          ]
        },
        validate: {
          payload: requestActiveCertificate
        }
      }
    },
    {
      method: 'GET',
      path: '/getActiveCertificates',
      handler: getActiveCertificatesHandler,
      config: {
        tags: ['api'],
        description: 'Retrieves active certificates for birth and death',
        auth: {
          scope: [
            RouteScope.NATLSYSADMIN,
            RouteScope.DECLARE,
            RouteScope.REGISTER,
            RouteScope.CERTIFY,
            RouteScope.PERFORMANCE,
            RouteScope.SYSADMIN,
            RouteScope.VALIDATE
          ]
        }
      }
    },
    {
      method: 'POST',
      path: '/createCertificate',
      handler: createCertificateHandler,
      config: {
        tags: ['api'],
        description: 'Creates a new Certificate',
        auth: {
          scope: [RouteScope.NATLSYSADMIN]
        },
        validate: {
          payload: requestNewCertificate
        }
      }
    },
    {
      method: 'POST',
      path: '/updateCertificate',
      handler: updateCertificateHandler,
      config: {
        tags: ['api'],
        description: 'Updates an existing Certificate',
        auth: {
          scope: [RouteScope.NATLSYSADMIN]
        },
        validate: {
          payload: updateCertificate
        }
      }
    },
    {
      method: 'DELETE',
      path: '/certificate/{certificateId}',
      handler: deleteCertificateHandler,
      config: {
        tags: ['api'],
        description: 'Delete certificate',
        auth: {
          scope: [RouteScope.NATLSYSADMIN]
        }
      }
    },
    {
      method: 'GET',
      path: '/formDraft',
      handler: getFormDrafts,
      config: {
        tags: ['api'],
        description: 'Get form draft',
        auth: {
          scope: [
            RouteScope.NATLSYSADMIN,
            RouteScope.DECLARE,
            RouteScope.REGISTER,
            RouteScope.CERTIFY,
            RouteScope.PERFORMANCE,
            RouteScope.SYSADMIN,
            RouteScope.VALIDATE
          ]
        }
      }
    },
    {
      method: 'PUT',
      path: '/formDraft',
      handler: modifyDraftStatusHandler,
      config: {
        tags: ['api'],
        description: 'Change form draft status',
        auth: {
          scope: [RouteScope.NATLSYSADMIN]
        },
        validate: {
          payload: modifyFormDraftReqSchema
        }
      }
    },
    {
      method: 'DELETE',
      path: '/formDraft',
      handler: deleteFormDraftHandler,
      config: {
        tags: ['api'],
        description: 'Delete form draft',
        auth: {
          scope: [RouteScope.NATLSYSADMIN]
        },
        validate: {
          payload: deleteFormDraftReqSchema
        }
      }
    },
    {
      method: 'POST',
      path: '/formDraft',
      handler: createFormDraftHandler,
      config: {
        tags: ['api'],
        description: 'Create form draft & update questions',
        auth: {
          scope: [RouteScope.NATLSYSADMIN]
        },
        validate: {
          payload: createFormDraftReqSchema
        }
      }
    },
    {
      method: 'POST',
      path: '/updateApplicationConfig',
      handler: updateApplicationConfigHandler,
      config: {
        tags: ['api'],
        description: 'Updates an existing Config',
        auth: {
          scope: [RouteScope.NATLSYSADMIN]
        },
        validate: {
          payload: updateApplicationConfig
        }
      }
    },
    {
      method: 'POST',
      path: '/question',
      handler: createQuestionHandler,
      config: {
        tags: ['api'],
        description: 'Create question',
        auth: {
          scope: [RouteScope.NATLSYSADMIN]
        },
        validate: {
          payload: createQuestionReqSchema
        }
      }
    },
    {
      method: 'PUT',
      path: '/question',
      handler: updateQuestionHandler,
      config: {
        tags: ['api'],
        description: 'Update question',
        auth: {
          scope: [RouteScope.NATLSYSADMIN]
        },
        validate: {
          payload: updateQuestionReqSchema
        }
      }
    },
    {
      method: 'GET',
      path: '/questions',
      handler: getQuestionsHandler,
      config: {
        tags: ['api'],
        description: 'Get question',
        auth: {
          scope: [RouteScope.NATLSYSADMIN]
        }
      }
    },
    {
      method: 'GET',
      path: '/getFormDataset',
      handler: getFormDatasetHandler,
      config: {
        tags: ['api'],
        description: 'fetch form dataset',
        auth: {
          scope: [RouteScope.NATLSYSADMIN]
        }
      }
    },
    {
      method: 'POST',
      path: '/createFormDataset',
      handler: createFormDatasetHandler,
      config: {
        tags: ['api'],
        description: 'Create form dataset',
        auth: {
          scope: [RouteScope.NATLSYSADMIN]
        },
        validate: {
          payload: formDatasetSchema
        }
      }
    },
    {
      method: 'POST',
      path: '/informantSMSNotification',
      handler: createInformantSMSNotificationHandler,
      config: {
        tags: ['api'],
        description: 'Creates informantSMSNotifications',
        auth: {
          scope: [RouteScope.NATLSYSADMIN]
        },
        validate: {
          payload: createInformantSMSNotificationReqSchema
        }
      }
    },
    {
      method: 'GET',
      path: '/informantSMSNotification',
      handler: getInformantSMSNotificationsHandler,
      config: {
        tags: ['api'],
        description: 'Get informantSMSNotifications',
        auth: {
          scope: [
            RouteScope.NATLSYSADMIN,
            RouteScope.DECLARE,
            RouteScope.REGISTER,
            RouteScope.CERTIFY,
            RouteScope.VALIDATE
          ]
        }
      }
    },
    {
      method: 'PUT',
      path: '/informantSMSNotification',
      handler: updateInformantSMSNotificationHandler,
      config: {
        tags: ['api'],
        description: 'Update informantSMSNotification',
        auth: {
          scope: [RouteScope.NATLSYSADMIN]
        },
        validate: {
          payload: updateInformantSMSNotificationReqSchema
        }
      }
    }
  ]
}
