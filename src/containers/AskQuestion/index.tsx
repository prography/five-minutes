import React, { useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../reducers';
import { IPostQuestion } from '../../models/question';
import { postQuestionActions } from '../../actions/question';
import { QuestionForm } from '..';

const AskQuestion = () => {
  const status = useSelector((state: IRootState) => state.question.post.status);
  const dispatch = useDispatch();
  const handlePostQuestion = useCallback(
    (question: IPostQuestion) => {
      dispatch(postQuestionActions.request(question));
    },
    [dispatch],
  );
  return (
    <QuestionForm
      handleSubmit={handlePostQuestion}
      loading={status === 'FETCHING'}
    />
  );
};

export default memo(AskQuestion);
