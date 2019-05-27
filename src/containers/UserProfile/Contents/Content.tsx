import React, { useState, useEffect, useCallback } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import ContentList from './ContentList';
import { List, Tab } from './style';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../../reducers';
import { loadUserQuestions, loadUserComments } from '../../../actions/user';

interface IContentProps {
  currentTab: string;
}

const Content: React.SFC<IContentProps> = ({ currentTab }) => {
  const {
    userId,
    questions,
    comments,
    questionStatus,
    commentStatus,
    questionHasNext,
    commentHasNext,
    questionCount,
    commentCount,
  } = useSelector((state: IRootState) => ({
    userId: state.user.get.user ? state.user.get.user.id : '',
    questions: state.user.questions.items,
    questionStatus: state.user.questions.status,
    comments: state.user.comments.items,
    commentStatus: state.user.comments.status,
    questionHasNext: !!state.user.questions.nextPage,
    commentHasNext: !!state.user.comments.nextPage,
    questionCount: state.user.questions.totalCount,
    commentCount: state.user.comments.totalCount,
  }));
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
  return (
    <List>
      {currentTab === 'Questions' && (
        <div>
          <div>
            <Tab selected>
              {currentTab}: {questionCount}
            </Tab>
          </div>
          <ContentList
            status={questionStatus}
            items={questions}
            fetchMore={fetchMore('Questions')}
            hasNext={questionHasNext}
          />
        </div>
      )}
    </List>
  );
};

export default Content;
