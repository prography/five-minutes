import React, { SFC, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { EditQuestion } from '../containers';
import { IRootState } from '../reducers';
import { getQuestionActions } from '../actions/question';
import { MainLayout } from '../styles/common';

const QuestionEdit: SFC<RouteComponentProps<{ questionId: string }>> = ({
  match,
}) => {
  const { questionId } = match.params;
  const dispatch = useDispatch();
  const userMatch = useSelector((state: IRootState) => {
    return (
      !!state.question.get.question &&
      state.question.get.question.user.id === state.auth.me.user.id
    );
  });
  const lastGetQuestionId = useSelector((state: IRootState) =>
    state.question.get.question
      ? state.question.get.question.id.toString()
      : undefined,
  );
  const enterDirectly = lastGetQuestionId !== questionId;
  useEffect(() => {
    if (enterDirectly) {
      dispatch(getQuestionActions.request(questionId));
    }
  }, [questionId, enterDirectly, dispatch]);
  if (!userMatch) return null;
  if (enterDirectly) {
    return null;
  }
  return (
    <MainLayout>
      <EditQuestion />
    </MainLayout>
  );
};

export default QuestionEdit;
