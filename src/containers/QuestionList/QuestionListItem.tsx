import React from 'react';
import styled from 'styled-components';
import { Divider } from 'gestalt';
import { useMarkdown } from '../../hooks';
import { ShadowBox } from '../../styles/common';
import { IQuestion } from '../../models/question';

const Question = styled(ShadowBox)`
  margin-top: 1.5rem;
`;
const Subject = styled.h3``;
export interface IQuestionListItemProps extends IQuestion {}
const QuestionListItem: React.SFC<IQuestionListItemProps> = ({
  subject,
  content,
}) => {
  const parsedHTML = useMarkdown(content);
  return (
    <Question>
      <Subject>{subject}</Subject>
      <Divider />
      <div dangerouslySetInnerHTML={{ __html: parsedHTML }} />
    </Question>
  );
};

export default QuestionListItem;
