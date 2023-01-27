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
  DOWNLOAD_STATUS,
  makeDeclarationReadyToDownload,
  storeDeclaration,
  modifyDeclaration
} from '@client/declarations'
import { DownloadAction } from '@client/forms'
import { Event } from '@client/utils/gateway'
import { checkAuth } from '@client/profile/profileActions'
import { queries } from '@client/profile/queries'
import { createStore } from '@client/store'
import {
  createRouterProps,
  createTestComponent,
  mockUserResponse,
  resizeWindow
} from '@client/tests/util'
import { waitForElement, waitFor } from '@client/tests/wait-for-element'
import { createClient } from '@client/utils/apolloClient'
import { REGISTRATION_HOME_QUERY } from '@client/views/OfficeHome/queries'
import { OfficeHome } from '@client/views/OfficeHome/OfficeHome'
import { EVENT_STATUS } from '@client/workqueue'
import { Workqueue } from '@opencrvs/components/lib/Workqueue'
import { ApolloClient } from '@apollo/client'
import { ReactWrapper } from 'enzyme'
import { merge } from 'lodash'
import * as React from 'react'
import { ReadyForReview } from './ReadyForReview'
import {
  GQLBirthEventSearchSet,
  GQLDeathEventSearchSet
} from '@opencrvs/gateway/src/graphql/schema'
import { formattedDuration } from '@client/utils/date-formatting'
import { REGISTRAR_HOME } from '@client/navigation/routes'
import { formatUrl } from '@client/navigation'
import { WORKQUEUE_TABS } from '@client/components/interface/Navigation'
import { birthDeclarationForReview } from '@client/tests/mock-graphql-responses'
import { vi, Mock } from 'vitest'

const registerScopeToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJyZWdpc3RlciIsImNlcnRpZnkiLCJkZW1vIl0sImlhdCI6MTU0MjY4ODc3MCwiZXhwIjoxNTQzMjkzNTcwLCJhdWQiOlsib3BlbmNydnM6YXV0aC11c2VyIiwib3BlbmNydnM6dXNlci1tZ250LXVzZXIiLCJvcGVuY3J2czpoZWFydGgtdXNlciIsIm9wZW5jcnZzOmdhdGV3YXktdXNlciIsIm9wZW5jcnZzOm5vdGlmaWNhdGlvbi11c2VyIiwib3BlbmNydnM6d29ya2Zsb3ctdXNlciJdLCJpc3MiOiJvcGVuY3J2czphdXRoLXNlcnZpY2UiLCJzdWIiOiI1YmVhYWY2MDg0ZmRjNDc5MTA3ZjI5OGMifQ.ElQd99Lu7WFX3L_0RecU_Q7-WZClztdNpepo7deNHqzro-Cog4WLN7RW3ZS5PuQtMaiOq1tCb-Fm3h7t4l4KDJgvC11OyT7jD6R2s2OleoRVm3Mcw5LPYuUVHt64lR_moex0x_bCqS72iZmjrjS-fNlnWK5zHfYAjF2PWKceMTGk6wnI9N49f6VwwkinJcwJi6ylsjVkylNbutQZO0qTc7HRP-cBfAzNcKD37FqTRNpVSvHdzQSNcs7oiv3kInDN5aNa2536XSd3H-RiKR9hm9eID9bSIJgFIGzkWRd5jnoYxT70G0t03_mTVnDnqPXDtyI-lmerx24Ost0rQLUNIg'
const getItem = window.localStorage.getItem as Mock

const nameObj = {
  data: {
    getUser: {
      name: [
        {
          use: 'en',
          firstNames: 'Mohammad',
          familyName: 'Ashraful',
          __typename: 'HumanName'
        },
        { use: 'bn', firstNames: '', familyName: '', __typename: 'HumanName' }
      ],
      role: 'DISTRICT_REGISTRAR'
    }
  }
}

const mockListSyncController = vi.fn()

const mockSearchData = {
  id: 'e302f7c5-ad87-4117-91c1-35eaf2ea7be8',
  type: 'Birth',
  registration: {
    status: 'DECLARED',
    contactNumber: '01622688231',
    trackingId: 'BW0UTHR',
    registrationNumber: null,
    registeredLocationId: '308c35b4-04f8-4664-83f5-9790e790cde1',
    duplicates: null,
    createdAt: '2018-05-23T14:44:58+02:00',
    modifiedAt: '2018-05-23T14:44:58+02:00'
  },
  dateOfBirth: '2010-10-10',
  childName: [
    {
      firstNames: 'Iliyas',
      familyName: 'Khan',
      use: 'en'
    },
    {
      firstNames: 'ইলিয়াস',
      familyName: 'খান',
      use: 'bn'
    }
  ],
  // TODO: When fragmentMatching work is completed, remove unnecessary result objects
  // PR: https://github.com/opencrvs/opencrvs-core/pull/836/commits/6302fa8f015fe313cbce6197980f1300bf4eba32
  child: {
    id: 'FAKE_ID',
    name: [
      {
        firstNames: 'Iliyas',
        familyName: 'Khan',
        use: 'en'
      },
      {
        firstNames: 'ইলিয়াস',
        familyName: 'খান',
        use: 'bn'
      }
    ],
    birthDate: '2010-10-10'
  },
  deceased: {
    name: [
      {
        use: '',
        firstNames: '',
        familyName: ''
      }
    ],
    deceased: {
      deathDate: ''
    }
  },
  informant: {
    individual: {
      telecom: [
        {
          system: '',
          use: '',
          value: ''
        }
      ]
    }
  },
  dateOfDeath: null,
  deceasedName: null,
  createdAt: '2018-05-23T14:44:58+02:00'
}
const searchData: any = []
for (let i = 0; i < 14; i++) {
  searchData.push(mockSearchData)
}
merge(mockUserResponse, nameObj)

const mockDeclarationDateStr = '2019-10-20T11:03:20.660Z'
const mockReviewTabData = {
  totalItems: 2,
  results: [
    {
      id: '9a55d213-ad9f-4dcd-9418-340f3a7f6269',
      type: 'Birth',
      registration: {
        status: 'DECLARED',
        contactNumber: '01622688231',
        trackingId: 'BW0UTHR',
        registrationNumber: undefined,
        eventLocationId: undefined,
        registeredLocationId: '308c35b4-04f8-4664-83f5-9790e790cde1',
        createdAt: '1544188309380',
        modifiedAt: '1544188309380'
      },
      operationHistories: [
        {
          operationType: 'DECLARED',
          operatedOn: mockDeclarationDateStr,
          operatorRole: 'LOCAL_REGISTRAR',
          operatorName: [
            {
              firstNames: 'Mohammad',
              familyName: 'Ashraful',
              use: 'en'
            },
            {
              firstNames: '',
              familyName: '',
              use: 'bn'
            }
          ],
          operatorOfficeName: 'Alokbali Union Parishad',
          operatorOfficeAlias: ['আলোকবালী  ইউনিয়ন পরিষদ']
        }
      ],
      dateOfBirth: '2010-10-10',
      childName: [
        {
          firstNames: 'Iliyas',
          familyName: 'Khan',
          use: 'en'
        },
        {
          firstNames: 'ইলিয়াস',
          familyName: 'খান',
          use: 'bn'
        }
      ]
    } as GQLBirthEventSearchSet,
    {
      id: 'bc09200d-0160-43b4-9e2b-5b9e90424e95',
      type: 'Death',
      registration: {
        status: 'VALIDATED',
        trackingId: 'DW0UTHR',
        registrationNumber: undefined,
        eventLocationId: undefined,
        contactNumber: undefined,
        duplicates: ['308c35b4-04f8-4664-83f5-9790e790cd33'],
        registeredLocationId: '308c35b4-04f8-4664-83f5-9790e790cde1',
        createdAt: '1544188309380',
        modifiedAt: '1544188309380'
      },
      dateOfDeath: '2007-01-01',
      deceasedName: [
        {
          firstNames: 'Iliyas',
          familyName: 'Khan',
          use: 'en'
        },
        {
          firstNames: 'ইলিয়াস',
          familyName: 'খান',
          use: 'bn'
        }
      ]
    } as GQLDeathEventSearchSet
  ]
}

describe('OfficeHome sent for review tab related tests', () => {
  let store: ReturnType<typeof createStore>['store']
  let history: ReturnType<typeof createStore>['history']
  let apolloClient: ApolloClient<{}>

  beforeEach(async () => {
    ;(queries.fetchUserDetails as Mock).mockReturnValue(mockUserResponse)
    const createdStore = createStore()
    store = createdStore.store
    history = createdStore.history

    apolloClient = createClient(store)

    getItem.mockReturnValue(registerScopeToken)
    await store.dispatch(checkAuth())
  })

  it('should show pagination bar if items more than 11 in ReviewTab', async () => {
    Date.now = vi.fn(() => 1554055200000)

    const testComponent = await createTestComponent(
      <ReadyForReview
        queryData={{
          data: {
            totalItems: 24,
            results: []
          }
        }}
        paginationId={1}
        pageSize={10}
        onPageChange={() => {}}
        loading={false}
        error={false}
      />,
      { store, history }
    )

    const pagination = await waitForElement(
      testComponent,
      '#pagination_container'
    )

    expect(pagination.hostNodes()).toHaveLength(1)

    testComponent
      .find('#pagination button')
      .last()
      .hostNodes()
      .simulate('click')
    expect(testComponent.exists('#page-number-2')).toBeTruthy()
  })

  it('renders all items returned from graphql query in ready for review', async () => {
    const TIME_STAMP = '1544188309380'
    Date.now = vi.fn(() => 1554055200000)

    const testComponent = await createTestComponent(
      <ReadyForReview
        queryData={{
          data: mockReviewTabData
        }}
        paginationId={1}
        pageSize={10}
        onPageChange={() => {}}
        loading={false}
        error={false}
      />,
      { store, history }
    )

    const workqueue = await waitForElement(testComponent, Workqueue)

    const data = workqueue.prop<Array<Record<string, string>>>('content')
    const EXPECTED_DATE_OF_DECLARATION = formattedDuration(
      new Date(mockDeclarationDateStr)
    )

    expect(data.length).toBe(2)
    expect(data[0].id).toBe('9a55d213-ad9f-4dcd-9418-340f3a7f6269')
    expect(data[0].dateOfEvent).toBe('8 years ago')
    expect(data[0].sentForReview).toBe(EXPECTED_DATE_OF_DECLARATION)
    expect(data[0].name).toBe('iliyas khan')
    expect(data[0].trackingId).toBe('BW0UTHR')
    expect(data[0].event).toBe('Birth')
    expect(data[0].actions).toBeDefined()
  })

  it('returns an empty array incase of invalid graphql query response', async () => {
    Date.now = vi.fn(() => 1554055200000)

    const testComponent = await createTestComponent(
      <ReadyForReview
        queryData={{
          data: {
            totalItems: 12,
            results: []
          }
        }}
        paginationId={1}
        pageSize={10}
        onPageChange={() => {}}
        loading={false}
        error={false}
      />,
      { store, history }
    )

    const workqueue = await waitForElement(testComponent, Workqueue)
    const data = workqueue.prop<Array<Record<string, string>>>('content')
    expect(data.length).toBe(0)
  })

  it('redirects to recordAudit page if row is clicked', async () => {
    Date.now = vi.fn(() => 1554055200000)

    const testComponent = await createTestComponent(
      <ReadyForReview
        queryData={{
          data: {
            totalItems: 2,
            results: [
              {
                id: 'e302f7c5-ad87-4117-91c1-35eaf2ea7be8',
                type: 'Birth',
                registration: {
                  status: 'DECLARED',
                  contactNumber: '01622688231',
                  trackingId: 'BW0UTHR',
                  registrationNumber: undefined,
                  eventLocationId: undefined,
                  registeredLocationId: '308c35b4-04f8-4664-83f5-9790e790cde1',
                  duplicates: [null],
                  createdAt: '2018-05-23T14:44:58+02:00',
                  modifiedAt: '2018-05-23T14:44:58+02:00'
                },
                dateOfBirth: '2010-10-10',
                childName: [
                  {
                    firstNames: 'Iliyas',
                    familyName: 'Khan',
                    use: 'en'
                  },
                  {
                    firstNames: 'ইলিয়াস',
                    familyName: 'খান',
                    use: 'bn'
                  }
                ]
              } as GQLBirthEventSearchSet,
              {
                id: 'bc09200d-0160-43b4-9e2b-5b9e90424e95',
                type: 'Death',
                registration: {
                  status: 'VALIDATED',
                  trackingId: 'DW0UTHR',
                  registrationNumber: undefined,
                  eventLocationId: undefined,
                  contactNumber: undefined,
                  duplicates: ['308c35b4-04f8-4664-83f5-9790e790cd33'],
                  registeredLocationId: '308c35b4-04f8-4664-83f5-9790e790cde1',
                  createdAt: '2007-01-01',
                  modifiedAt: '2007-01-01'
                },
                operationHistories: [
                  {
                    operationType: 'VALIDATED',
                    operatedOn: '2019-12-12T15:23:21.280Z',
                    operatorRole: 'REGISTRATION_AGENT',
                    operatorName: [
                      {
                        firstNames: 'Tamim',
                        familyName: 'Iqbal',
                        use: 'en'
                      },
                      {
                        firstNames: '',
                        familyName: null,
                        use: 'bn'
                      }
                    ],
                    operatorOfficeName: 'Alokbali Union Parishad',
                    operatorOfficeAlias: ['আলোকবালী  ইউনিয়ন পরিষদ']
                  }
                ],
                dateOfDeath: '2007-01-01',
                deceasedName: [
                  {
                    firstNames: 'Iliyas',
                    familyName: 'Khan',
                    use: 'en'
                  },
                  {
                    firstNames: 'ইলিয়াস',
                    familyName: 'খান',
                    use: 'bn'
                  }
                ]
              } as GQLDeathEventSearchSet
            ]
          }
        }}
        paginationId={1}
        pageSize={10}
        onPageChange={() => {}}
        loading={false}
        error={false}
      />,
      { store, history }
    )
    const element = await waitForElement(testComponent, '#name_0')
    element.hostNodes().simulate('click')

    await waitFor(() =>
      window.location.href.includes(
        '/record-audit/reviewTab/e302f7c5-ad87-4117-91c1-35eaf2ea7be8'
      )
    )
  })

  describe('handles download status', () => {
    let testComponent: ReactWrapper<{}, {}>
    let createdTestComponent: ReactWrapper<{}, {}>
    beforeEach(async () => {
      Date.now = vi.fn(() => 1554055200000)

      mockListSyncController
        .mockReturnValueOnce({
          data: {
            inProgressTab: { totalItems: 0, results: [] },
            notificationTab: { totalItems: 0, results: [] },
            reviewTab: mockReviewTabData,
            rejectTab: { totalItems: 0, results: [] },
            approvalTab: { totalItems: 0, results: [] },
            printTab: { totalItems: 0, results: [] },
            externalValidationTab: { totalItems: 0, results: [] }
          },
          initialSyncDone: true
        })
        .mockReturnValueOnce({
          data: {
            fetchBirthRegistration: birthDeclarationForReview
          }
        })
      apolloClient.query = mockListSyncController

      createdTestComponent = await createTestComponent(
        <OfficeHome
          {...createRouterProps(
            formatUrl(REGISTRAR_HOME, {
              tabId: WORKQUEUE_TABS.readyForReview
            }),
            { isNavigatedInsideApp: false },
            {
              matchParams: {
                tabId: WORKQUEUE_TABS.readyForReview
              }
            }
          )}
        />,
        { store, history, apolloClient }
      )

      testComponent = createdTestComponent
    })
    //TODO:: FAILED TEST
    it.skip('downloads declaration after clicking download button', async () => {
      await waitForElement(testComponent, '#ListItemAction-0-icon')
      testComponent.find('#ListItemAction-0-icon').hostNodes().simulate('click')
      testComponent.update()
      expect(testComponent.find('#assignment').hostNodes()).toHaveLength(1)

      testComponent.find('#assign').hostNodes().simulate('click')

      expect(
        testComponent.find('#action-loading-ListItemAction-0').hostNodes()
      ).toHaveLength(1)

      await new Promise((resolve) => {
        setTimeout(resolve, 100)
      })
      testComponent.update()

      const action = await waitForElement(
        testComponent,
        '#ListItemAction-0-Review'
      )
      action.hostNodes().simulate('click')

      await new Promise((resolve) => {
        setTimeout(resolve, 100)
      })
      testComponent.update()
      expect(history.location.pathname).toBe(
        '/reviews/9a55d213-ad9f-4dcd-9418-340f3a7f6269/events/birth/parent/review'
      )
    })
    //TODO:: FAILED TEST
    it.skip('shows error when download is failed', async () => {
      const downloadedDeclaration = makeDeclarationReadyToDownload(
        Event.Death,
        'bc09200d-0160-43b4-9e2b-5b9e90424e95',
        DownloadAction.LOAD_REVIEW_DECLARATION
      )
      downloadedDeclaration.downloadStatus = DOWNLOAD_STATUS.FAILED
      store.dispatch(storeDeclaration(downloadedDeclaration))

      testComponent.update()

      expect(
        testComponent.find('#ListItemAction-1-icon-failed').hostNodes()
      ).toHaveLength(1)
    })
  })

  it('check the validate icon', async () => {
    const TIME_STAMP = '1544188309380'
    Date.now = vi.fn(() => 1554055200000)

    const testComponent = await createTestComponent(
      <ReadyForReview
        queryData={{
          data: {
            totalItems: 2,
            results: [
              {
                id: 'e302f7c5-ad87-4117-91c1-35eaf2ea7be8',
                type: 'Birth',
                registration: {
                  status: 'VALIDATED',
                  contactNumber: '01622688231',
                  trackingId: 'BW0UTHR',
                  registeredLocationId: '308c35b4-04f8-4664-83f5-9790e790cde1',
                  createdAt: TIME_STAMP,
                  modifiedAt: TIME_STAMP
                },
                dateOfBirth: '2010-10-10',
                childName: [
                  {
                    firstNames: 'Iliyas',
                    familyName: 'Khan',
                    use: 'en'
                  },
                  {
                    firstNames: 'ইলিয়াস',
                    familyName: 'খান',
                    use: 'bn'
                  }
                ]
              } as GQLBirthEventSearchSet,
              {
                id: 'bc09200d-0160-43b4-9e2b-5b9e90424e95',
                type: 'Death',
                registration: {
                  status: 'DECLARED',
                  trackingId: 'DW0UTHR',
                  duplicates: ['308c35b4-04f8-4664-83f5-9790e790cd33'],
                  registeredLocationId: '308c35b4-04f8-4664-83f5-9790e790cde1',
                  createdAt: TIME_STAMP,
                  modifiedAt: TIME_STAMP
                },
                dateOfDeath: '2007-01-01',
                deceasedName: [
                  {
                    firstNames: 'Iliyas',
                    familyName: 'Khan',
                    use: 'en'
                  },
                  {
                    firstNames: 'ইলিয়াস',
                    familyName: 'খান',
                    use: 'bn'
                  }
                ]
              } as GQLDeathEventSearchSet
            ]
          }
        }}
        paginationId={1}
        pageSize={10}
        onPageChange={() => {}}
        loading={false}
        error={false}
      />,
      { store, history }
    )

    const props = testComponent.find('#declaration_icon').first().props().color
    expect(props).toBe('grey')
  })

  describe.skip('handles download status for possible duplicate declaration', () => {
    let testComponent: ReactWrapper<{}, {}>
    let createdTestComponent: ReactWrapper<{}, {}>
    beforeAll(async () => {
      Date.now = vi.fn(() => 1554055200000)
      const graphqlMocks = [
        {
          request: {
            query: REGISTRATION_HOME_QUERY,
            variables: {
              declarationLocationId: '2a83cf14-b959-47f4-8097-f75a75d1867f',
              count: 10,
              reviewStatuses: [EVENT_STATUS.DECLARED, EVENT_STATUS.VALIDATED],
              inProgressSkip: 0,
              reviewSkip: 0,
              rejectSkip: 0,
              approvalSkip: 0,
              externalValidationSkip: 0,
              printSkip: 0
            }
          },
          result: {
            data: {
              inProgressTab: { totalItems: 0, results: [] },
              notificationTab: { totalItems: 0, results: [] },
              reviewTab: mockReviewTabData,
              rejectTab: { totalItems: 0, results: [] },
              approvalTab: { totalItems: 0, results: [] },
              externalValidationTab: { totalItems: 0, results: [] },
              printTab: { totalItems: 0, results: [] }
            }
          }
        }
      ]

      createdTestComponent = await createTestComponent(
        // @ts-ignore
        <OfficeHome />,
        { store, history, graphqlMocks }
      )

      getItem.mockReturnValue(registerScopeToken)
      await store.dispatch(checkAuth())
      testComponent = createdTestComponent
    })

    it('starts downloading after clicking download button', async () => {
      const downloadButton = await waitForElement(
        testComponent,
        '#ListItemAction-1-icon'
      )

      downloadButton.hostNodes().simulate('click')
      testComponent.update()

      expect(
        testComponent.find('#action-loading-ListItemAction-1').hostNodes()
      ).toHaveLength(1)
    })

    it('shows review button when download is complete', async () => {
      const downloadedDeclaration = makeDeclarationReadyToDownload(
        Event.Death,
        'bc09200d-0160-43b4-9e2b-5b9e90424e95',
        DownloadAction.LOAD_REVIEW_DECLARATION
      )
      downloadedDeclaration.downloadStatus = DOWNLOAD_STATUS.DOWNLOADED
      store.dispatch(modifyDeclaration(downloadedDeclaration))

      const action = await waitForElement(
        testComponent,
        '#ListItemAction-1-Review'
      )

      expect(action.hostNodes()).toHaveLength(1)
      action.hostNodes().simulate('click')

      await waitFor(() =>
        window.location.href.includes(
          '/duplicates/bc09200d-0160-43b4-9e2b-5b9e90424e95'
        )
      )
    })

    it('shows error when download is failed', async () => {
      const downloadedDeclaration = makeDeclarationReadyToDownload(
        Event.Death,
        'bc09200d-0160-43b4-9e2b-5b9e90424e95',
        DownloadAction.LOAD_REVIEW_DECLARATION
      )
      downloadedDeclaration.downloadStatus = DOWNLOAD_STATUS.FAILED
      store.dispatch(modifyDeclaration(downloadedDeclaration))

      testComponent.update()

      const errorIcon = await waitForElement(
        testComponent,
        '#ListItemAction-1-download-failed'
      )

      expect(errorIcon.hostNodes()).toHaveLength(1)
    })
  })
})

describe('Tablet tests', () => {
  let { store, history } = createStore()

  beforeAll(async () => {
    const s = createStore()
    store = s.store
    history = s.history
    resizeWindow(800, 1280)
  })

  afterEach(() => {
    resizeWindow(1024, 768)
  })

  it('redirects to recordAudit page if item is clicked', async () => {
    const TIME_STAMP = '1544188309380'
    Date.now = vi.fn(() => 1554055200000)

    const testComponent = await createTestComponent(
      <ReadyForReview
        queryData={{
          data: {
            totalItems: 2,
            results: [
              {
                id: 'e302f7c5-ad87-4117-91c1-35eaf2ea7be8',
                type: 'Birth',
                registration: {
                  status: 'VALIDATED',
                  contactNumber: '01622688231',
                  trackingId: 'BW0UTHR',
                  registrationNumber: undefined,
                  eventLocationId: undefined,
                  registeredLocationId: '308c35b4-04f8-4664-83f5-9790e790cde1',
                  duplicates: [null],
                  createdAt: TIME_STAMP,
                  modifiedAt: TIME_STAMP
                },
                dateOfBirth: '2010-10-10',
                childName: [
                  {
                    firstNames: 'Iliyas',
                    familyName: 'Khan',
                    use: 'en'
                  },
                  {
                    firstNames: 'ইলিয়াস',
                    familyName: 'খান',
                    use: 'bn'
                  }
                ]
              } as GQLBirthEventSearchSet,
              {
                id: 'bc09200d-0160-43b4-9e2b-5b9e90424e95',
                type: 'Death',
                registration: {
                  status: 'DECLARED',
                  trackingId: 'DW0UTHR',
                  registrationNumber: undefined,
                  eventLocationId: undefined,
                  contactNumber: undefined,
                  duplicates: ['308c35b4-04f8-4664-83f5-9790e790cd33'],
                  registeredLocationId: '308c35b4-04f8-4664-83f5-9790e790cde1',
                  createdAt: TIME_STAMP,
                  modifiedAt: TIME_STAMP
                },
                dateOfDeath: '2007-01-01',
                deceasedName: [
                  {
                    firstNames: 'Iliyas',
                    familyName: 'Khan',
                    use: 'en'
                  },
                  {
                    firstNames: 'ইলিয়াস',
                    familyName: 'খান',
                    use: 'bn'
                  }
                ]
              } as GQLDeathEventSearchSet
            ]
          }
        }}
        paginationId={1}
        pageSize={10}
        onPageChange={() => {}}
        loading={false}
        error={false}
      />,
      { store, history }
    )

    getItem.mockReturnValue(registerScopeToken)
    await store.dispatch(checkAuth())

    const row = await waitForElement(testComponent, '#name_0')
    row.hostNodes().simulate('click')

    expect(window.location.href).toContain(
      '/record-audit/reviewTab/e302f7c5-ad87-4117-91c1-35eaf2ea7be8'
    )
  })
})
