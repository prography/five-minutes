import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { RouteComponentProps, withRouter } from 'react-router';
import { InfoContainer } from './style';
import GithubImg from '../../../assets/icon/github.png';
import { IRootState } from '../../../reducers';
import { ProfilePhoto, CustomLink, TagList } from '../../../components';

const Info: React.SFC<RouteComponentProps> = ({ location }) => {
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
      <Grid container direction="column" spacing={3}>
        <Grid item container spacing={3}>
          <Grid item xs={2}>
            <ProfilePhoto width="100" src={image} />
          </Grid>
          <Grid item xs={7} container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h3">{nickname}</Typography>
            </Grid>
            <Grid item>
              <div>질문 수 : {questionCount}</div>
              <div>답변 수 : {commentCount}</div>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            {isMe && (
              <CustomLink to={`${location.pathname}/edit`}>
                <Button color="primary" variant="outlined" fullWidth>
                  프로필 수정
                </Button>
              </CustomLink>
            )}
          </Grid>
        </Grid>

        <Grid item>
          <TagList tags={tags} />
        </Grid>
        <Grid item container justify="flex-end">
          {githubUrl && (
            <a href={githubUrl}>
              <img alt="profile" src={GithubImg} width={32} />
            </a>
          )}
        </Grid>
      </Grid>
    </InfoContainer>
  );
};

export default withRouter(Info);
