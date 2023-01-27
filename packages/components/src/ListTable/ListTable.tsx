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
import { Pagination } from '../Pagination'
import { ColumnContentAlignment } from '../common-types'
import { IDynamicValues, IColumn, IFooterFColumn } from '../Workqueue'
import { LoadMore } from '../Workqueue/components/LoadMore'

const Wrapper = styled.div<{
  hideBoxShadow?: boolean
  isFullPage?: boolean
  fixedWidth: number | undefined
}>`
  ${({ fixedWidth }) =>
    fixedWidth ? `width: ${fixedWidth}px;` : `width: 100%`}

  @media (max-width: ${({ fixedWidth, theme }) => fixedWidth}px) {
    width: 100%;
  }
  background: ${({ theme }) => theme.colors.white};
  ${({ hideBoxShadow, isFullPage, theme }) =>
    isFullPage
      ? `padding-bottom:24px;`
      : hideBoxShadow
      ? `padding: 24px 0;`
      : `padding: 24px;
    ${theme.shadows.light};`}
`
const TableHeader = styled.div<{
  isSortable?: boolean
  totalWidth?: number
  fixedWidth?: number
}>`
  ${({ fixedWidth, totalWidth }) =>
    fixedWidth ? `width: ${fixedWidth}px;` : `width: ${totalWidth || 100}%;`}
  background: ${({ theme }) => theme.colors.background};
  padding: 10px 0px;
  display: flex;
  align-items: flex-end;

  & span:first-child {
    padding-left: 8px;
  }

  & span:last-child {
    padding-right: 8px;
  }
`

const TableHeaderText = styled.div<{
  isSorted?: boolean
}>`
  ${({ theme }) => theme.fonts.bold16};
  color: ${({ theme }) => theme.colors.copy};
  display: flex;
`

const TableBody = styled.div<{ footerColumns: boolean }>`
  color: ${({ theme }) => theme.colors.copy};
  ${({ theme }) => theme.fonts.reg16};

  & div:last-of-type {
    ${({ footerColumns }) => (footerColumns ? 'border-bottom: none;' : '')};
  }
  & span:first-child {
    padding-left: 8px;
  }

  & span:last-child {
    padding-right: 8px;
  }
`
const RowWrapper = styled.div<{
  totalWidth: number
  highlight?: boolean
  height?: IBreakpoint
  horizontalPadding?: IBreakpoint
  hideTableBottomBorder?: boolean
}>`
  width: 100%;
  /* min-height: 48px; */
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.disabled};

  &:last-child {
    ${({ hideTableBottomBorder }) =>
      hideTableBottomBorder && `border-bottom: 0`};
  }

  display: flex;

  ${({ height }) =>
    height ? `min-height:${height.lg}px;` : `min-height: 48px;`};
  @media (max-width: ${({ theme }) => theme.grid.breakpoints.lg}px) {
    ${({ height }) =>
      height ? `min-height:${height.md}px;` : `min-height: 48px;`};
  }

  & span:first-child {
    ${({ horizontalPadding }) =>
      horizontalPadding
        ? `padding-left:${horizontalPadding.lg}px;`
        : `padding-left: 12px;`}
  }

  & span:last-child {
    text-align: right;
    ${({ horizontalPadding }) =>
      horizontalPadding
        ? `padding-right:${horizontalPadding.lg}px;`
        : `padding-right: 12px;`}
  }

  @media (max-width: ${({ theme }) => theme.grid.breakpoints.lg}px) {
    & span:first-child {
      text-align: right;
      ${({ horizontalPadding }) =>
        horizontalPadding
          ? `padding-left:${horizontalPadding.md}px;`
          : `padding-left: 12px;`}
    }

    & span:last-child {
      text-align: right;
      ${({ horizontalPadding }) =>
        horizontalPadding
          ? `padding-right:${horizontalPadding.md}px;`
          : `padding-right: 12px;`}
    }
  }
`
const TableFooter = styled(RowWrapper)`
  padding-right: 10px;
  background: ${({ theme }) => theme.colors.background};
  border-top: 2px solid ${({ theme }) => theme.colors.disabled};
  border-bottom: none;
  & span {
    color: ${({ theme }) => theme.colors.copy};
    ${({ theme }) => theme.fonts.bold16};
  }
`

const ContentWrapper = styled.span<{
  width: number
  alignment?: string
  sortable?: boolean
  totalWidth?: number
}>`
  align-self: flex-start;
  width: ${({ width, totalWidth }) =>
    totalWidth && totalWidth > 100 ? (width * 100) / totalWidth : width}%;
  flex-shrink: 0;
  text-align: ${({ alignment }) => (alignment ? alignment.toString() : 'left')};
  padding-right: 10px;
  cursor: ${({ sortable }) => (sortable ? 'pointer' : 'default')};
  color: ${({ theme }) => theme.colors.tertiary};
`
const ValueWrapper = styled.span<{
  width: number
  totalWidth: number
  alignment?: string
  color?: string
  // TODO: The children can be passed a `IDynamicValues` value, which is a very flexible / any-like type.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any
}>`
  width: ${({ width, totalWidth }) =>
    totalWidth > 100 ? (width * 100) / totalWidth : width}%;

  justify-content: ${({ alignment }) =>
    alignment === ColumnContentAlignment.RIGHT ? 'flex-end' : 'flex-start'};
  text-align: ${({ alignment }) => (alignment ? alignment.toString() : 'left')};
  padding-right: 8px;
  ${({ color }) => color && `color: ${color};`}
`
const Error = styled.span`
  color: ${({ theme }) => theme.colors.negative};
`
const ErrorText = styled.div<{ isFullPage?: boolean }>`
  ${({ theme }) => theme.fonts.h3};
  text-align: left;
  margin-left: ${({ isFullPage }) => (isFullPage ? `40px` : `10px`)};
  color: ${({ theme }) => theme.colors.copy};
`
export const LoadingGrey = styled.span<{
  width?: number
}>`
  background: ${({ theme }) => theme.colors.background};
  display: inline-block;
  height: 24px;
  width: ${({ width }) => (width ? `${width}%` : '100%')};
`
const TableScrollerHorizontal = styled.div<{
  disableScrollOnOverflow?: boolean
}>`
  ${({ disableScrollOnOverflow }) =>
    !disableScrollOnOverflow && `overflow: auto`};
  padding-bottom: 8px;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.grey400};
  }
`
const TableScroller = styled.div<{
  height?: number
  totalWidth: number
  isFullPage?: boolean
  offsetTop: number
  fixedWidth: number | undefined
}>`
  display: block;
  max-height: ${({ height, isFullPage, offsetTop }) =>
    isFullPage
      ? `calc(100vh - ${offsetTop}px - 180px)`
      : height
      ? `${height}px`
      : 'auto'};

  ${({ fixedWidth, totalWidth }) =>
    fixedWidth
      ? `width: ${fixedWidth}px;`
      : `width: ${(totalWidth >= 100 && totalWidth) || 100}%;`}
`

const TableHeaderWrapper = styled.div`
  padding-right: 0;
`
const ToggleSortIcon = styled.div<{
  toggle?: boolean
}>`
  margin-left: 5px;
  display: inline;
  svg {
    transform: ${({ toggle }) => (toggle ? 'rotate(180deg)' : 'none')};
  }
`
const LoadingContainer = styled.div<{
  totalWidth: number
  fixedWidth: number | undefined
}>`
  ${({ fixedWidth, totalWidth }) =>
    fixedWidth
      ? `width: ${fixedWidth}px;`
      : `width: ${(totalWidth >= 100 && totalWidth) || 100}%;`}
  overflow: hidden;
`
const defaultConfiguration = {
  pageSize: 10,
  currentPage: 1
}

interface IListTableProps {
  id?: string
  content: IDynamicValues[]
  columns: IColumn[]
  footerColumns?: IFooterFColumn[]
  noResultText: string
  tableHeight?: number
  rowStyle?: {
    height: IBreakpoint
    horizontalPadding: IBreakpoint
  }
  onPageChange?: (currentPage: number) => void
  disableScrollOnOverflow?: boolean
  pageSize?: number
  totalItems?: number
  currentPage?: number
  isLoading?: boolean
  hideBoxShadow?: boolean
  hideTableHeader?: boolean
  hideTableBottomBorder?: boolean
  loadMoreText?: string
  highlightRowOnMouseOver?: boolean
  isFullPage?: boolean
  fixedWidth?: number
}

interface IListTableState {
  sortIconInverted: boolean
  sortKey: string | null
  tableOffsetTop: number
}

interface IBreakpoint {
  lg: number
  md: number
}

/**
 * @deprecated in favour of `<Table>`
 */
export class ListTable extends React.Component<
  IListTableProps,
  IListTableState
> {
  tableRef = React.createRef<HTMLDivElement>()
  state = {
    sortIconInverted: false,
    sortKey: null,
    tableOffsetTop: 0
  }

  onPageChange = (currentPage: number) => {
    if (this.props.onPageChange) {
      this.props.onPageChange(currentPage)
    }
  }

  getDisplayItems = (
    currentPage: number,
    pageSize: number,
    allItems: IDynamicValues[]
  ) => {
    if (allItems.length <= pageSize) {
      // expect that allItem is already sliced correctly externally
      return allItems
    }

    // perform internal pagination
    const offset = (currentPage - 1) * pageSize
    const displayItems = allItems.slice(offset, offset + pageSize)
    return displayItems
  }

  invertSortIcon = (sortKey: string) => {
    let sortIconInverted: boolean

    if (this.state.sortKey === sortKey || this.state.sortKey === null) {
      sortIconInverted = !this.state.sortIconInverted
    } else {
      sortIconInverted = true
    }
    this.setState({ sortIconInverted, sortKey })
    return true
  }

  componentDidUpdate(prevProps: IListTableProps) {
    if (prevProps.isLoading && !this.props.isLoading) {
      this.setState({
        tableOffsetTop:
          (this.tableRef.current &&
            this.tableRef.current.getBoundingClientRect().top) ||
          0
      })
    }
  }

  render() {
    const {
      id,
      columns,
      content,
      noResultText,
      pageSize = defaultConfiguration.pageSize,
      currentPage = defaultConfiguration.currentPage,
      isLoading = false,
      tableHeight,
      rowStyle,
      hideBoxShadow,
      hideTableHeader,
      hideTableBottomBorder,
      footerColumns,
      loadMoreText,
      highlightRowOnMouseOver,
      isFullPage,
      fixedWidth
    } = this.props
    const totalItems = this.props.totalItems || 0
    const totalWidth = columns.reduce((total, col) => (total += col.width), 0)

    return (
      <>
        {!isLoading && (
          <Wrapper
            id={`listTable-${id}`}
            hideBoxShadow={hideBoxShadow}
            isFullPage={isFullPage}
            fixedWidth={fixedWidth}
            ref={this.tableRef}
          >
            <TableScrollerHorizontal
              disableScrollOnOverflow={this.props.disableScrollOnOverflow}
            >
              {!hideTableHeader && content.length > 0 && (
                <TableHeaderWrapper>
                  <TableHeader totalWidth={totalWidth} fixedWidth={fixedWidth}>
                    {columns.map((preference, index) => (
                      <ContentWrapper
                        key={index}
                        id={`${preference.key}-label`}
                        width={preference.width}
                        totalWidth={totalWidth}
                        alignment={preference.alignment}
                        sortable={preference.isSortable}
                        onClick={() =>
                          preference.isSortable &&
                          preference.sortFunction &&
                          this.invertSortIcon(preference.key) &&
                          preference.sortFunction(preference.key)
                        }
                      >
                        <TableHeaderText isSorted={preference.isSorted}>
                          <div>{preference.label}</div>
                          <ToggleSortIcon
                            toggle={
                              this.state.sortIconInverted &&
                              this.state.sortKey === preference.key
                            }
                          >
                            {preference.icon}
                          </ToggleSortIcon>
                        </TableHeaderText>
                      </ContentWrapper>
                    ))}
                  </TableHeader>
                </TableHeaderWrapper>
              )}
              <TableScroller
                height={tableHeight}
                isFullPage={isFullPage}
                totalWidth={totalWidth}
                fixedWidth={fixedWidth}
                offsetTop={this.state.tableOffsetTop}
              >
                <TableBody
                  footerColumns={
                    (footerColumns && footerColumns.length > 0) || false
                  }
                >
                  {this.getDisplayItems(currentPage, pageSize, content).map(
                    (item, index) => {
                      return (
                        <RowWrapper
                          id={'row_' + index}
                          key={index}
                          totalWidth={totalWidth}
                          highlight={highlightRowOnMouseOver}
                          height={rowStyle?.height}
                          horizontalPadding={rowStyle?.horizontalPadding}
                          hideTableBottomBorder={hideTableBottomBorder || false}
                        >
                          {columns.map((preference, indx) => {
                            return (
                              <ValueWrapper
                                key={indx}
                                width={preference.width}
                                alignment={preference.alignment}
                                color={preference.color}
                                totalWidth={totalWidth}
                              >
                                {item[preference.key] || (
                                  <Error>{preference.errorValue}</Error>
                                )}
                              </ValueWrapper>
                            )
                          })}
                        </RowWrapper>
                      )
                    }
                  )}
                </TableBody>
              </TableScroller>
              {footerColumns && content.length > 1 && (
                <TableFooter
                  id={'listTable-' + id + '-footer'}
                  totalWidth={totalWidth}
                >
                  {footerColumns.map((preference, index) => (
                    <ContentWrapper key={index} width={preference.width}>
                      {preference.label || ''}
                    </ContentWrapper>
                  ))}
                </TableFooter>
              )}
            </TableScrollerHorizontal>
            {content.length <= 0 && (
              <ErrorText id="no-record" isFullPage={isFullPage}>
                {noResultText}
              </ErrorText>
            )}
          </Wrapper>
        )}
        {isLoading && (
          <LoadingContainer totalWidth={totalWidth} fixedWidth={fixedWidth}>
            <TableHeader totalWidth={totalWidth} fixedWidth={fixedWidth}>
              {columns.map((preference, index) => (
                <ContentWrapper
                  key={index}
                  width={preference.width}
                  alignment={preference.alignment}
                  sortable={preference.isSortable}
                >
                  <LoadingGrey />
                </ContentWrapper>
              ))}
            </TableHeader>
            <TableHeader totalWidth={totalWidth} fixedWidth={fixedWidth}>
              {columns.map((preference, index) => (
                <ContentWrapper
                  key={index}
                  width={preference.width}
                  alignment={preference.alignment}
                  sortable={preference.isSortable}
                >
                  <LoadingGrey width={30} />
                </ContentWrapper>
              ))}
            </TableHeader>
          </LoadingContainer>
        )}
        {totalItems > pageSize && (
          <>
            {!loadMoreText && (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalItems / pageSize)}
                onPageChange={this.onPageChange}
              />
            )}
            {loadMoreText && (
              <LoadMore
                initialPage={currentPage}
                loadMoreText={loadMoreText}
                onLoadMore={this.onPageChange}
                usageTableType={'list'}
              />
            )}
          </>
        )}
      </>
    )
  }
}
