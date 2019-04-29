import React from 'react';
import styled from 'styled-components';
import { Divider } from 'gestalt';
import { useMarkdown } from '../../hooks';
import { ShadowBox } from '../../styles/common';
import { IQuestion } from '../../models/question';

const Question = styled(ShadowBox)`
  margin-top: 1.5rem;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const Footer = styled.div``;
const Subject = styled.h3`
  flex: 1 1;
`;
const Info = styled.div`
  flex: 0 0 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Date = styled.span`
  font-size: 0.85em;
  color: ${props => props.theme.colors.sub};
`;
export interface IQuestionListItemProps extends IQuestion {}
const QuestionListItem: React.SFC<IQuestionListItemProps> = ({
  subject,
  content,
  createdAt,
}) => {
  const parsedHTML = useMarkdown(content);
  return (
    <Question>
      <Header>
        <Subject>{subject}</Subject>
        <Info>
          <Date>{createdAt}</Date>
        </Info>
      </Header>
      <Divider />
      <div dangerouslySetInnerHTML={{ __html: parsedHTML }} />
    </Question>
  );
};

export default QuestionListItem;
