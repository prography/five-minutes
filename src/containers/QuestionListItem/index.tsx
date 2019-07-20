import React, { memo, useMemo } from 'react';
import Divider from '@material-ui/core/Divider';
import { MdThumbUp, MdThumbDown, MdComment } from 'react-icons/md';
import {
  Question,
  Header,
  Subject,
  Info,
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
  hits,
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
          {formattedDate}
        </Info>
      </Header>
      {/* <Divider light /> <hr> */}
      <p>{truncated}</p>
      <Footer>
        <TagContainer>{tags && <TagList tags={tags} />}</TagContainer>
        <FooterRight>
          <div>
            <ProfileLink {...user}>{user && user.nickname}</ProfileLink>
          </div>
          <CountContainer>
            <Count>
              <MdThumbUp fontSize="inherit" />
              &nbsp;{likeCount}
            </Count>
            <Count>
              <MdThumbDown fontSize="inherit" />
              &nbsp;{dislikeCount}
            </Count>
            <Count>
              <MdComment fontSize="inherit" />
              &nbsp;{comments_count}
            </Count>
          </CountContainer>
        </FooterRight>
      </Footer>
    </Question>
  );
};

export default memo(QuestionListItem);
