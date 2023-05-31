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
import React from 'react'
import styled from 'styled-components'
import { Text } from '../Text'

export interface BulletListProps {
  id?: string
  items: string[]
  font: 'reg12' | 'reg14' | 'reg16' | 'reg18' | 'h4' | 'h3' | 'h2' | 'h1'
}

const List = styled.ul`
  list-style-type: disc;
`
const ListItem = styled.li`
  margin-bottom: 12px;
  padding-left: 8px;
`

export function BulletList({ id, font, items }: BulletListProps) {
  return (
    <List id={id}>
      <Text variant={font} element="p" color="grey600">
        {items.map((items) => (
          <ListItem key={items}>{items}</ListItem>
        ))}
      </Text>
    </List>
  )
}
