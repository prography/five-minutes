import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'gestalt';
import QuestionListItem from './QuestionListItem';
import { Observer } from './style';
import useIntersect, { OnIntersect } from '../../../hooks/useIntersect';
import { getQuestions } from '../../../actions/question';
import { IRootState } from '../../../reducers';
import { IQuestion } from '../../../models/question';

export interface IQuestionListProps {
  status: Status;
  questions: IQuestion[];
  error: string;
  page: number;
  hasNext: boolean;
  getQuestionsAction: typeof getQuestions;
}
const QuestionList: React.SFC<IQuestionListProps> = ({
  status,
  questions,
  error,
  page,
  hasNext,
  getQuestionsAction,
}) => {
  useEffect(() => {
    // TODO: cache 확인
    getQuestionsAction({ page: 1, perPage: 10 });
  }, []);
  // 다음 페이지 없을 경우 observer 해제
  const onIntersect: OnIntersect = useCallback(
    (entry, observer) => {
      if (!hasNext) {
        observer.unobserve(entry.target);
        return;
      }
      if (status !== 'FETCHING') {
        getQuestionsAction({ page: page + 1, perPage: 10 });
      }
    },
    [page, status],
  );
  const [ref, setRef, observer] = useIntersect(onIntersect);
  return (
    <>
      {questions.map((question, i) => (
        <div key={question.id}>
          <QuestionListItem {...question} />
        </div>
      ))}
      <Observer ref={setRef}>
        <Spinner accessibilityLabel="loading" show={status === 'FETCHING'} />
      </Observer>
    </>
  );
};

const mapState = (state: IRootState) => ({
  status: state.question.getList.status,
  questions: state.question.getList.questions,
  error: state.question.getList.error,
  page: state.question.getList.page,
  hasNext: state.question.getList.hasNext,
});

export default connect(
  mapState,
  {
    getQuestionsAction: getQuestions,
  },
)(QuestionList);
