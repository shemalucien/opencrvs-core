import React from 'react'
import { CustomIcon } from '../types'

export const ChartActivity: CustomIcon = ({ size, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? '24'}
      height={size ?? '24'}
      viewBox="0 0 24 24"
      fill="none"
      {...rest}
    >
      <path
        d="M6 6V18H18"
        stroke="#727272"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.6667 10L13.3333 13.3333L10.6667 10.6667L8.66666 12.6667"
        stroke="#727272"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
