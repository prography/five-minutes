import React, { useCallback } from 'react';
import isEqual from 'lodash/isEqual';
import uniqBy from 'lodash/uniqBy';
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
        items: uniqBy(state.user.comments.items, item => item.question.id).map(
          comment => comment.question,
        ),
        status: state.user.comments.status,
        hasNext: !!state.user.comments.nextPage,
        count: state.user.comments.totalCount,
      },
    };
  }, isEqual);
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
  // TODO: api 업데이트
  const parsedItems = items.map(item => ({
    ...item,
    comments_count: item.comments ? item.comments.length : 0,
  }));
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
          items={parsedItems}
          fetchMore={fetchMore(currentTab)}
          hasNext={hasNext}
        />
      </div>
    </List>
  );
};

export default Content;
