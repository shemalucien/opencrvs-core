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
import { Favicon } from '@/components/Favicon'
import { Services } from '@/components/Services'
import { checkHealth, Service } from '@/lib/check-health'
import type { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import React from 'react'
import { LeftNavigation } from '@opencrvs/components/lib/SideNavigation'
import { AppBar } from '@opencrvs/components/lib/AppBar'
import { SearchTool } from '@opencrvs/components/lib/SearchTool'
import { Icon } from '@opencrvs/components/lib/Icon'
import { Stack } from '@opencrvs/components/lib/Stack'
import { Button } from '@opencrvs/components/lib/Button'
import {Pagination} from '@opencrvs/components/lib/Pagination'
const isAllOk = (services: Service[]) =>
  Array.isArray(services) && services.every((service) => service.status === 'ok');

export async function getServerSideProps() {
  try {
    const services = await checkHealth()
    console.log("services", services)
    return {
      props: {
        services,
        isAllOk: isAllOk(services)
      }
    }
  } catch (error) {
    console.error('Error fetching services:', error)
    return {
      props: {
        services: [],
        isAllOk: false
      }
    }
  }
}

export default function Home({
  services,
  isAllOk
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const runningServices = Array.isArray(services)
    ? services.filter((service) => service.status === 'ok')
    : [];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Head>
        <title>{isAllOk ? '' : '! '}OpenCRVS healthcheck</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Favicon status={isAllOk ? 'ok' : 'error'} />
      </Head>
      <LeftNavigation applicationName="OpenCRVS" applicationVersion="1.1.0" buildVersion="Development">
        {/* Add side navigation content here */}
      </LeftNavigation>
      {/* <AppBar> */}
        {/* Add header content here */}
      {/* </AppBar> */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90%' }}>
          {runningServices.length > 0 ? (
            <Services services={runningServices} />
          ) : (
            <div>No services are currently running.</div>
          )}
          {/* Add other content here */}

        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10%' }}>
        <Pagination
          currentPage={1}
          onPageChange={() => {}}
          totalPages={10}
        />
        </div>
        
      </div>
    </div>
  );
}
