import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { InfoContainer, MarginList, MarginLeft, Name, InfoLeft } from './style';
import GithubImg from '../../../assets/icon/github.png';
import { IRootState } from '../../../reducers';
import { ProfilePhoto, CustomLink, TagList } from '../../../components';

interface IInfoProps {
  currentPath: string;
}
const Info: React.SFC<IInfoProps> = ({ currentPath }) => {
  // TODO: Shallow Equality check 적용
  const myId = useSelector((state: IRootState) => state.auth.me.user.id);
  const { user, status, questionCount, commentCount } = useSelector(
    (state: IRootState) => ({
      user: state.user.get.user,
      status: state.user.get.status,
      error: state.user.get.error,
      questionCount: state.user.questions.totalCount,
      commentCount: state.user.comments.totalCount,
    }),
  );
  if (!user || status === 'FETCHING') return <InfoContainer />;
  const isMe = myId === user.id;
  const { nickname, tags, githubUrl, image = '' } = user;
  return (
    <InfoContainer>
      <MarginList>
        <div style={{ display: 'flex' }}>
          <InfoLeft>
            <div>
              <ProfilePhoto width="100%" src={image} />
            </div>
          </InfoLeft>
          <div style={{ flex: 2, flexBasis: 30, marginLeft: 20 }}>
            <MarginList>
              <Grid container alignItems="center">
                <Grid item>
                  <Name>{nickname}</Name>
                </Grid>
                <Grid item>
                  {isMe && (
                    <CustomLink to={`${currentPath}/edit`}>
                      <Button color="primary" variant="outlined">
                        프로필 수정
                    </Button>
                    </CustomLink>
                  )}
                </Grid>
              </Grid>
              <div>질문 수 : {questionCount} 답변 수 : {commentCount}</div>
              <div>
                {githubUrl && (
                  <a href={githubUrl}>
                    <img alt="profile" src={GithubImg} width={32} />
                  </a>
                )}
              </div>
            </MarginList>
          </div>
        </div>
        <div>
          <TagList tags={tags} />
        </div>
      </MarginList>
    </InfoContainer>
  );
};

export default memo(Info);
