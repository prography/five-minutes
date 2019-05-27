import React, { memo } from 'react';
import Divider from '@material-ui/core/Divider';
import {
  Question,
  Header,
  Subject,
  Info,
  Date,
  Footer,
  TagContainer,
} from './style';
import { CustomLink, TagList, ProfileLink } from '../../components';
import { useDateFormat, useMarkdown } from '../../hooks';
import { IQuestion } from '../../models/question';

export interface IQuestionListItemProps extends IQuestion {}
const QuestionListItem: React.SFC<IQuestionListItemProps> = ({
  id,
  subject,
  content,
  createdAt,
  tags,
  user,
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
      <Divider light />
      <div dangerouslySetInnerHTML={{ __html: parsedHTML }} />
      <Footer>
        <TagContainer>{tags && <TagList tags={tags} />}</TagContainer>
        <ProfileLink {...user}>{user && user.nickname}</ProfileLink>
      </Footer>
    </Question>
  );
};

export default memo(QuestionListItem);
