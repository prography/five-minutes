import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useInitialFetch } from '../hooks';
import { getQuestion } from '../api/question';

interface IParams {
  questionId: string;
}
export interface IQuestionProps extends RouteComponentProps<IParams> {}
const Question: React.SFC<IQuestionProps> = ({ match }) => {
  const { questionId } = match.params;
  const [fetchState] = useInitialFetch(getQuestion, questionId);
  const { data, status, error } = fetchState;
  if (!data) return null;
  const { result } = data;
  return <h1>{result.subject}</h1>;
};

export default Question;
