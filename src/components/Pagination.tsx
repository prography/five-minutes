import React, { useState, useMemo, useCallback, memo } from 'react';
import styled from 'styled-components';

const PageList = styled.ul`
  list-style-type: none;
`;
const Page = styled.li`
  display: inline;
`;
const PageNumber = styled.button<{
  active?: boolean;
  isLeft?: boolean;
  isRight?: boolean;
}>`
  font-weight: bold;

  color: ${props =>
    props.active
      ? props.theme.palette.primary.contrastText
      : props.theme.palette.darkGray};
  background-color: ${props =>
    props.active
      ? props.theme.palette.primary.main
      : props.theme.palette.primary.light};
  border: 1px solid
    ${props =>
      props.active
        ? props.theme.palette.primary.main
        : props.theme.palette.gray};
  border-top-left-radius: ${props => props.isLeft && 5}px;
  border-bottom-left-radius: ${props => props.isLeft && 5}px;
  border-top-right-radius: ${props => props.isRight && 5}px;
  border-bottom-right-radius: ${props => props.isRight && 5}px;

  min-width: 30px;
  margin-left: -1px;
  padding: 0.6rem 0.8rem;

  &:hover {
    color: ${props =>
      props.active
        ? props.theme.palette.darkGray
        : props.theme.palette.primary.main};
    transition: color 0.1s;
    cursor: pointer;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SKIP = '...' as const;
interface IPaginationProps {
  initialPage?: number;
  pageRange?: number;
  perPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.SFC<IPaginationProps> = ({
  initialPage = 1,
  pageRange = 5,
  perPage,
  totalCount,
  onPageChange,
}) => {
  const [page, setPage] = useState(initialPage);
  const maxPage = perPage === 0 ? 0 : Math.ceil(totalCount / perPage);
  const pages: (number | typeof SKIP)[] = useMemo(() => {
    if (maxPage === 0) {
      return [];
    }
    if (maxPage === 1) {
      return [maxPage];
    }
    if (pageRange + 2 >= maxPage) {
      return [...Array(maxPage)].map((_, i) => i + 1);
    }
    let pageNums = [page];
    for (let i = 1; i < pageRange && pageNums.length < pageRange; ++i) {
      const start = pageNums[0];
      const end = pageNums[pageNums.length - 1];
      start !== 1 && pageNums.unshift(start - 1);
      end !== maxPage && pageNums.push(end + 1);
    }
    const pages: (number | typeof SKIP)[] = pageNums;
    pages[0] !== 1 && pages.unshift(1, SKIP);
    pages[pages.length - 1] !== maxPage && pages.push(SKIP, maxPage);
    return pages;
  }, [page, pageRange, maxPage]);
  const handlePageClick = (page: number) => () => {
    setPage(page);
    onPageChange(page);
  };
  if (!pages.length) {
    return null;
  }
  return (
    <PageList>
      <Page>
        <PageNumber
          isLeft
          disabled={page === 1}
          onClick={handlePageClick(page - 1)}
        >
          이전
        </PageNumber>
      </Page>
      {pages.map((pageNum, i) => {
        return pageNum === SKIP ? (
          <Page key={pageNum + i}>
            <PageNumber disabled>{pageNum}</PageNumber>
          </Page>
        ) : (
          <Page key={pageNum}>
            <PageNumber
              active={page === pageNum}
              onClick={handlePageClick(pageNum)}
            >
              {pageNum}
            </PageNumber>
          </Page>
        );
      })}
      <Page>
        <PageNumber
          isRight
          disabled={page === maxPage}
          onClick={handlePageClick(page + 1)}
        >
          다음
        </PageNumber>
      </Page>
    </PageList>
  );
};

export default memo(Pagination);
