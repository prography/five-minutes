import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { QuestionListItem } from '../../';
import { meQuestions, meComments } from '../../../api/auth';
import { IComment } from '../../../models/comment';
import { IQuestion } from '../../../models/question';
import { useSetState } from '../../../hooks';
import { List, Center } from './style';

interface IContentProps {
  currentTab: string;
}

const Content: React.SFC<IContentProps> = ({ currentTab }) => {
  const [state, setState] = useSetState<{
    Answers: IComment[];
    Questions: IQuestion[];
    status: Status;
  }>({ Answers: [], Questions: [], status: 'INIT' });
  useEffect(() => {
    if (currentTab === 'Questions') {
      setState({ status: 'FETCHING' });
      meQuestions(null).then(({ items }) => {
        setState(prev => ({ ...prev, Questions: items, status: 'SUCCESS' }));
      });
    }
    if (currentTab === 'Answers') {
      setState({ status: 'FETCHING' });
      meComments(null).then(({ items }) => {
        setState(prev => ({ ...prev, Answers: items, status: 'SUCCESS' }));
      });
    }
  }, [currentTab]);
  if (state.status === 'FETCHING')
    return (
      <Center>
        <CircularProgress />
      </Center>
    );
  return (
    <List>
      {currentTab === 'Questions' && (
        <>
          {state.Questions.map(question => (
            <QuestionListItem key={question.id} {...question} />
          ))}
        </>
      )}
    </List>
  );
};

export default Content;
