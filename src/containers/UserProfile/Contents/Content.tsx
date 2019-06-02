import React, { useState, useEffect, useCallback } from 'react';
import ContentList from './ContentList';
import { List, Tab } from './style';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../../reducers';
import { loadUserQuestions, loadUserComments } from '../../../actions/user';

interface IContentProps {
  currentTab: 'Questions' | 'Answers';
}

const Content: React.SFC<IContentProps> = ({ currentTab }) => {
  const { userId, ...stateByTab } = useSelector((state: IRootState) => {
    return {
      userId: state.user.get.user ? state.user.get.user.id : '',
      Questions: {
        items: state.user.questions.items,
        status: state.user.questions.status,
        hasNext: !!state.user.questions.nextPage,
        count: state.user.questions.totalCount,
      },
      Answers: {
        // key값 중복 제거를 위해 question id대신 comment id 사용
        items: state.user.comments.items.map(({ id, question }) => ({
          ...question,
          id,
        })), // TODO: Reselect
        status: state.user.comments.status,
        hasNext: !!state.user.comments.nextPage,
        count: state.user.comments.totalCount,
      },
    };
  });
  const dispatch = useDispatch();
  const fetchMore = useCallback(
    (tab: 'Questions' | 'Answers') => () => {
      if (tab === 'Questions') {
        dispatch(loadUserQuestions(userId, false));
      }
      if (tab === 'Answers') {
        dispatch(loadUserComments(userId, false));
      }
    },
    [userId, dispatch],
  );
  const { status, items, hasNext, count } = stateByTab[currentTab];
  return (
    <List>
      <div>
        <div>
          <Tab selected>
            {currentTab}: {count}
          </Tab>
        </div>
        <ContentList
          status={status}
          items={items}
          fetchMore={fetchMore(currentTab)}
          hasNext={hasNext}
        />
      </div>
    </List>
  );
};

export default Content;
