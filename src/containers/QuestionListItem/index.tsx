import React, { memo } from 'react';
import { Divider } from 'gestalt';
import { Question, Header, Subject, Info, Date, Footer } from './style';
import { CustomLink, TagList } from '../../components';
import { useDateFormat, useMarkdown } from '../../hooks';
import { IQuestion } from '../../models/question';

export interface IQuestionListItemProps extends IQuestion {}
const QuestionListItem: React.SFC<IQuestionListItemProps> = ({
  id,
  subject,
  content,
  createdAt,
  tags,
}) => {
  const parsedHTML = useMarkdown(content);
  const formattedDate = useDateFormat(createdAt, 'YYYY-MM-DD');
  return (
    <Question>
      <Header>
        <Subject>
          <CustomLink to={`/question/${id}`}>{subject}</CustomLink>
        </Subject>
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
