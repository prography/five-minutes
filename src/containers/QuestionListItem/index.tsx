import React, { memo, useMemo } from 'react';
import Divider from '@material-ui/core/Divider';
import ThumbUp from '@material-ui/icons/ThumbUpOutlined';
import ThumbDown from '@material-ui/icons/ThumbDownOutlined';
import Comment from '@material-ui/icons/CommentOutlined';
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
import { IQuestion } from '../../models/question';

const MAX_TRUNCATE_LEN = 80;

export interface IQuestionListItemProps extends IQuestion { }
const QuestionListItem: React.SFC<IQuestionListItemProps> = ({
  id,
  subject,
  content,
  createdAt,
  tags,
  user,
  likedUsers = [],
  dislikedUsers = [],
  comments = [],
}) => {
  const truncated = useMemo(() => content.length >= MAX_TRUNCATE_LEN ? `${content}...` : content, [content]);
  const formattedDate = useDateFormat(createdAt);
  const likeCount = useMemo(() => likedUsers.length, [likedUsers]);
  const dislikeCount = useMemo(() => dislikedUsers.length, [dislikedUsers]);
  const commentCount = useMemo(() => comments.length, [comments]);
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
              <ThumbUp fontSize="inherit" />
              &nbsp;{likeCount}
            </Count>
            <Count>
              <ThumbDown fontSize="inherit" />
              &nbsp;{dislikeCount}
            </Count>
            <Count>
              <Comment fontSize="inherit" />
              &nbsp;{commentCount}
            </Count>
          </CountContainer>
        </FooterRight>
      </Footer>
    </Question>
  );
};

export default memo(QuestionListItem);
