import React, { useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GithubImg from '../../../assets/icon/github.png';
import Tags from './Tags';
import { WatchedTags } from '../../';
import { IRootState } from '../../../reducers';
import { ProfilePhoto, CustomLink, ImageUploader } from '../../../components';
import { profileUploader } from '../../../utils/cloudinary';
import { updateUser } from '../../../api/user';

const Info = () => {
  const {
    user,
    status,
    error,
    myId,
    questionCount,
    commentCount,
  } = useSelector((state: IRootState) => ({
    user: state.user.get.user,
    status: state.user.get.status,
    error: state.user.get.error,
    myId: state.auth.me.user.id,
    questionCount: state.user.questions.totalCount,
    commentCount: state.user.questions.totalCount,
  }));
  const uploaderRef = useRef<HTMLInputElement>(null);
  const handleImageClick = useCallback(() => {
    if (uploaderRef.current) {
      uploaderRef.current.click();
    }
  }, []);
  // TODO : 유저 업데이트 및 본인 확인 (edit 페이지 따로 뺄까?)
  const handleImageFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0];
        try {
          const { url } = await profileUploader.uploadImage(file);
          const { result } = await updateUser(myId, { image: url });
          console.log(result);
        } catch (err) {
          console.log(err);
        }
      }
    },
    [myId],
  );
  if (!user || status === 'FETCHING') return null;
  const isMe = myId === user.id;
  const { nickname, image, tags, githubUrl } = user;
  return (
    <>
      <Grid container direction="column" spacing={3}>
        <Grid item container spacing={3}>
          <Grid item xs={2}>
            <ProfilePhoto width="100%" onClick={handleImageClick} />
            <ImageUploader ref={uploaderRef} onChange={handleImageFile} />
          </Grid>
          <Grid item xs={10} container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h3">{nickname}</Typography>
            </Grid>
            <Grid item>
              <div>질문 수 : {questionCount}</div>
              <div>답변 수 : {commentCount}</div>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>{isMe ? <WatchedTags /> : <Tags tags={tags} />}</Grid>
        <Grid item container justify="flex-end">
          {githubUrl && (
            <a href={githubUrl}>
              <img src={GithubImg} width={32} />
            </a>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Info;
