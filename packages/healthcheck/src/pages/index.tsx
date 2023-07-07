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
import { MyEnvironment } from "@/components/Dependencies";
import { checkHealth, Service} from '@/lib/check-health'
import type { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import React from 'react'
import { LeftNavigation } from '@opencrvs/components/lib/SideNavigation'
import { AppBar } from '@opencrvs/components/lib/AppBar'
import { SearchTool } from '@opencrvs/components/lib/SearchTool'
import { Icon } from '@opencrvs/components/lib/Icon'
import { Stack } from '@opencrvs/components/lib/Stack'
import { Button } from '@opencrvs/components/lib/Button'
import { Pagination } from '@opencrvs/components/lib/Pagination'

import { Table } from '@opencrvs/components/lib/Table'
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




    /* <div style={{ minHeight: '150px', justifyContent: 'center', alignItems: 'center' }}>
        <AppBar
          desktopLeft={<Button aria-label="Go back" size="large" type="icon"><Icon name="ArrowLeft" size="large" /></Button>}
          desktopRight={
            <Stack gap={8}>
              <Button size="large" type="icon"><Icon name="Target" size="large" /></Button>
              <Button size="large" type="secondary">Exit</Button>
              <Button size="large" type="primary">Save</Button>
            </Stack>
          }
          desktopTitle={<h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>OpenCRVS</h1>}
          mobileLeft={<Button aria-label="Go back" size="large" type="icon"><Icon name="ArrowLeft" size="large" /></Button>}
          mobileRight={<Button type="secondary">Button</Button>}
          mobileTitle={<h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>OpenCRVS</h1>}
        />
      </div> */

    /* <div style={{ flex: 1, overflowY: 'auto' }}>
      {runningServices.length == 0 ? (
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90%' }}>
          {/* <Services services={runningServices} /> */

    /* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Table
                  tableHeight={500} // Set table height to the full height of the window
                  columns={[
                    { label: 'User', width: 25, key: 'user' },
                    { label: 'url', width: 50, key: 'url' },
                    { label: 'Status', width: 25, key: 'status' }
                  ]}
                  content={[
                    { user: 'webhooks', url: 'http://localhost:2525/ping', status: 'Active' },
                    { user: 'Stevie Nicks', time: '12 May 2021', status: 'Active' },
                    { user: 'Ellie Crouch', time: '1 November 2020', status: 'Active' },
                    { user: 'Jill Cross', time: '23 October 2021', status: 'Inactive' },
                    { user: 'Rebecca Finch', time: '11 March 2021', status: 'Active' }
                  ]}
                />
              </div>
  
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90%' }}>
              <div>No services are currently running.</div>
            </div>
          )}
          */
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Head>
          <title>{isAllOk ? '' : '! '}OpenCRVS healthcheck</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Favicon status={isAllOk ? 'ok' : 'error'} />
        </Head>
        <MyEnvironment />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10%', position: 'sticky', bottom: 0 }}>
        <Pagination currentPage={1} onPageChange={() => { }} totalPages={10} />
      </div>
    </div>



    // </div>

  );
}
