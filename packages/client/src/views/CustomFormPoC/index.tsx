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

import * as React from 'react'
import { OpenCRVSFormProvider } from '@opencrvs/components'

import * as OpenCRVSComponents from '@opencrvs/components'
import { ReviewSectionComp } from '../RegisterForm/review/ReviewSection'
import { IForm, IFormSection } from '@client/forms'
import { useSelector } from 'react-redux'
import { getScope } from '@client/profile/profileSelectors'
import { getOfflineData } from '@client/offline/selectors'
import { IDeclaration } from '@client/declarations'
import { useIntl } from 'react-intl'

/*
 * This is needed so components coming from country config
 * always use the right react instance
 */

window.React = React

/*
 * Enable access to our components from the country config
 */
;(window as any).OpenCRVSComponents = OpenCRVSComponents

const MyCustomComponentLoader = React.lazy(
  () => import('http://localhost:3040/MyCustomForm.js')
)

function Showcase() {
  const form: IForm = {}
  const registrationSection: IFormSection = {}
  const documentsSection: IFormSection = {}

  const formData = OpenCRVSComponents.useOpenCRVSForm()
  const draft: IDeclaration = {
    event: 'CUSTOM_FORM_POC',
    id: '1fd548a1-a663-40fd-926e-d7ac22a10aa5',
    data: {
      ...formData.getFormData(),
      documents: {}
    },
    submissionStatus: 'DRAFT',
    savedOn: 1681587513760,
    modifiedOn: 1681587522905,
    visitedGroupIds: [
      {
        sectionId: 'registration',
        groupId: 'who-is-applying-view-group'
      }
    ],
    writingDraft: false
  }

  const registerForm: { [key: string]: IForm } = {
    CUSTOM_FORM_POC: {
      sections: formData.getFormSections()
    }
  }

  const fakeReviewProps = {
    writeDeclaration: (): any => {},
    goToPageGroup: (): any => {},
    submitClickEvent: () => {},
    registerForm,
    language: 'en',
    pageRoute: '',
    form,
    intl: useIntl(),
    draft,
    registrationSection,
    documentsSection,
    scope: useSelector(getScope),
    offlineCountryConfiguration: useSelector(getOfflineData)
  }

  return (
    <React.Suspense fallback={<h1>Couldn't load the custom form</h1>}>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            width: '30%',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              padding: '2rem',
              border: '3px solid red'
            }}
          >
            <div
              style={{
                background: 'red',
                position: 'absolute',
                top: 0,
                left: 0,
                color: '#fff',
                padding: '3px 6px 6px 3px',
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                fontWeight: 700
              }}
            >
              React component fetched from country config
            </div>
            <MyCustomComponentLoader />
          </div>
          <div style={{ border: '3px solid blue', position: 'relative' }}>
            <div
              style={{
                background: 'blue',
                position: 'absolute',
                top: 0,
                left: 0,
                color: '#fff',
                padding: '3px 6px 6px 3px',
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                fontWeight: 700
              }}
            >
              Automatically generated form definition
            </div>
            <pre
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(registerForm, null, 2)
              }}
            ></pre>
          </div>
        </div>
        <div style={{ flex: 1, width: '70%' }}>
          {registerForm.CUSTOM_FORM_POC.sections.length > 0 && (
            <ReviewSectionComp {...fakeReviewProps} />
          )}
        </div>
      </div>
    </React.Suspense>
  )
}

export function CustomFormPoc() {
  return (
    <OpenCRVSFormProvider>
      <Showcase></Showcase>
    </OpenCRVSFormProvider>
  )
}
