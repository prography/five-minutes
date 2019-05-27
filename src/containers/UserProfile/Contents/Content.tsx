import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { QuestionListItem } from '../../';
import { meQuestions, meComments } from '../../../api/auth';
import { IComment } from '../../../models/comment';
import { IQuestion } from '../../../models/question';
import { useSetState } from '../../../hooks';
import { List, Center } from './style';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';

interface IContentProps {
  currentTab: string;
}

const Content: React.SFC<IContentProps> = ({ currentTab }) => {
  const { questions, comments, questionStatus, commentStatus } = useSelector(
    (state: IRootState) => ({
      questions: state.user.questions.items,
      questionStatus: state.user.questions.status,
      comments: state.user.comments.items,
      commentStatus: state.user.comments.status,
    }),
  );
  return (
    <List>
      {currentTab === 'Questions' && (
        <>
          {questions.map(question => (
            <QuestionListItem key={question.id} {...question} />
          ))}
        </>
      )}
    </List>
  );
};

export default Content;
