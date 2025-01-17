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
import styled from 'styled-components'

export interface IBox extends React.HTMLAttributes<HTMLDivElement> {}

const Wrapper = styled.div<IBox>`
  position: relative;
  border-radius: 4px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.grey300};
  background: ${({ theme }) => theme.colors.white};
  @media (max-width: ${({ theme }) => theme.grid.breakpoints.md}px) {
    height: 100%;
    border: 0;
    padding: 16px;
  }
`

export const Box = ({ id, className, children }: IBox) => (
  <Wrapper id={id} className={className}>
    {children}
  </Wrapper>
)
