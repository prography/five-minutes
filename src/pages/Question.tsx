import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AnswerForm, QuestionView } from '../containers';
import { AuthBlock } from '../components';
import { useInitialFetch } from '../hooks';
import { getQuestion } from '../api/question';
import { IRootState } from '../reducers';

interface IParams {
  questionId: string;
}
export interface IQuestionProps extends RouteComponentProps<IParams> {}
const Question: React.SFC<IQuestionProps> = ({ match }) => {
  const { questionId } = match.params;
  const [fetchState] = useInitialFetch(getQuestion, questionId);
  const isLoggedIn = useSelector(
    (state: IRootState) => state.auth.me.isLoggedIn,
  );
  const { data, status, error } = fetchState;
  if (!data) return null;
  const { result } = data;
  return (
    <>
      <QuestionView {...result} />
      {isLoggedIn ? (
        <AnswerForm {...result} />
      ) : (
        <AuthBlock>
          <h2>로그인을 하셔야 답변을 다실 수 있습니다.</h2>
        </AuthBlock>
      )}
    </>
  );
};

export default Question;
