import React, { useCallback, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Observer } from './style';
import { QuestionListItem } from '..';
import { NoResult } from '../../components';
import useIntersect, { OnIntersect } from '../../hooks/useIntersect';
import { getQuestions } from '../../actions/question';
import { IRootState } from '../../reducers';
import { IQuestion } from '../../models/question';

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
    if (questions.length === 0) {
      getQuestionsAction({ page: 1, perPage: 10 });
    }
  }, []);
  // 현재 페이지 저장
  const currentList = useRef({
    page,
    status,
  });
  // currentList Ref 업데이트
  useEffect(() => {
    currentList.current = {
      ...currentList.current,
      page,
      status,
    };
  }, [page, status]);
  // 다음 페이지 없을 경우 observer 해제
  const onIntersect: OnIntersect = useCallback((entry, observer) => {
    observer.unobserve(entry.target);
    if (currentList.current.status !== 'FETCHING') {
      getQuestionsAction({ page: currentList.current.page + 1, perPage: 10 });
    }
  }, []);

  const [ref, setRef, observer] = useIntersect(onIntersect);

  useEffect(() => {
    if (hasNext && status === 'SUCCESS') {
      ref && observer && observer.observe(ref);
    }
  }, [hasNext, status]);
  if (status !== 'INIT' && questions.length === 0) {
    return <NoResult />;
  }
  return (
    <>
      {questions.map((question, i) => (
        <div key={question.id}>
          <QuestionListItem {...question} />
        </div>
      ))}
      <Observer ref={setRef}>
        {status === 'FETCHING' && <CircularProgress />}
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
