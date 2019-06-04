import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EditorFromTextArea } from 'codemirror';
import { AnswerForm, AnswerList, QuestionView } from '../containers';
import { AuthBlock, LoadingBar } from '../components';
import { getQuestionActions } from '../actions/question';
import { IRootState } from '../reducers';
import { MainLayout, Box } from '../styles/common';

interface IParams {
  questionId: string;
}
export interface IQuestionProps extends RouteComponentProps<IParams> {}
const Question: React.SFC<IQuestionProps> = ({ match }) => {
  // 원 질문글의 code Ref
  const dispatch = useDispatch();
  const [codeRef, setCodeRef] = useState<EditorFromTextArea>();
  const { questionId } = match.params;
  useEffect(() => {
    dispatch(getQuestionActions.request(questionId));
  }, [questionId, dispatch]);

  const { status, question, isLoggedIn } = useSelector(
    (state: IRootState) => ({
      status: state.question.get.status,
      question: state.question.get.question,
      error: state.question.get.error,
      isLoggedIn: state.auth.me.isLoggedIn,
    }),
  );

  if (status === 'FETCHING') {
    return <LoadingBar />;
  }
  if (!question) return null;
  return (
    <MainLayout>
      <Box>
        <QuestionView {...question} codeRef={codeRef} setCodeRef={setCodeRef} />
        <AnswerList codeRef={codeRef} {...question} />
        {isLoggedIn ? (
          <AnswerForm {...question} />
        ) : (
          <AuthBlock>
            <h2>로그인을 하셔야 답변을 다실 수 있습니다.</h2>
          </AuthBlock>
        )}
      </Box>
    </MainLayout>
  );
};

export default Question;
