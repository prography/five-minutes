import React, { memo, useMemo } from 'react';
import Divider from '@material-ui/core/Divider';
import { TiThumbsUp, TiThumbsDown, TiMessageTyping } from 'react-icons/ti';
import {
  Question,
  Header,
  Subject,
  Info,
  Date,
  Footer,
  FooterRight,
  TagContainer,
  Count,
  CountContainer,
} from './style';
import { CustomLink, TagList, ProfileLink } from '../../components';
import { useDateFormat } from '../../hooks';
import { IQuestionListItem } from '../../models/question';

const MAX_TRUNCATE_LEN = 80;

export type IQuestionListItemProps = IQuestionListItem;
const QuestionListItem: React.SFC<IQuestionListItemProps> = ({
  id,
  subject,
  content,
  createdAt,
  tags,
  user,
  likedUsers = [],
  dislikedUsers = [],
  comments_count = 0,
}) => {
  const truncated = useMemo(
    () => (content.length >= MAX_TRUNCATE_LEN ? `${content}...` : content),
    [content],
  );
  const formattedDate = useDateFormat(createdAt);
  const likeCount = useMemo(() => likedUsers.length, [likedUsers]);
  const dislikeCount = useMemo(() => dislikedUsers.length, [dislikedUsers]);
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
      <p>{truncated}</p>
      <Footer>
        <TagContainer>{tags && <TagList tags={tags} />}</TagContainer>
        <FooterRight>
          <div>
            <ProfileLink {...user}>{user && user.nickname}</ProfileLink>
          </div>
          <CountContainer>
            <Count>
              <TiThumbsUp fontSize="inherit" />
              &nbsp;{likeCount}
            </Count>
            <Count>
              <TiThumbsDown fontSize="inherit" />
              &nbsp;{dislikeCount}
            </Count>
            <Count>
              <TiMessageTyping fontSize="inherit" />
              &nbsp;{comments_count}
            </Count>
          </CountContainer>
        </FooterRight>
      </Footer>
    </Question>
  );
};

export default memo(QuestionListItem);
