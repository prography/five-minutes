import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import { Divider } from 'gestalt';
import { format } from 'date-fns';
import { TagList } from '../../components';
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
const Footer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  margin: 1rem 0;
`;
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
  color: ${props => props.theme.colors.gray};
`;
export interface IQuestionListItemProps extends IQuestion {}
const QuestionListItem: React.SFC<IQuestionListItemProps> = ({
  subject,
  content,
  createdAt,
  tags,
}) => {
  const parsedHTML = useMarkdown(content);
  const formattedDate = useMemo(
    () => createdAt && format(createdAt, 'YYYY-MM-DD'),
    [createdAt],
  );
  return (
    <Question>
      <Header>
        <Subject>{subject}</Subject>
        <Info>
          <Date>{formattedDate}</Date>
        </Info>
      </Header>
      <Divider />
      <div dangerouslySetInnerHTML={{ __html: parsedHTML }} />
      <Footer>
        <TagList tags={tags} />
      </Footer>
    </Question>
  );
};

export default memo(QuestionListItem);
