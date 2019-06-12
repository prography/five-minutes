import React, { useCallback } from 'react';
import { QuestionListItem } from '..';
import { Pagination } from '../../components';
import { IQuestionListItem } from '../../models/question';

interface IPaginationListProps {
  page: number;
  perPage: number;
  items: IQuestionListItem[];
  totalCount: number;
  handlePageChange: (page: number) => void;
}

const PaginationList: React.SFC<IPaginationListProps> = ({
  page,
  perPage,
  items,
  totalCount,
  handlePageChange,
}) => {
  const onPageChange = useCallback(
    (page: number) => {
      handlePageChange(page);
    },
    [handlePageChange],
  );
  return (
    <div>
      {items.map(item => (
        <QuestionListItem key={item.id} {...item} />
      ))}
      <Pagination
        initialPage={page}
        perPage={perPage}
        totalCount={totalCount}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default PaginationList;
