import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ProfileImage from './ProfileImage';
import { IUser, IUpdateUser } from '../../models/user';
import { setUserProfile } from '../../actions/auth';
import { updateUser } from '../../api/user';
import { useSetState } from '../../hooks';
import { notifier } from '../../utils/renoti';
import { history } from '../../utils/history';
import TagEdit from './TagEdit';
import { Title } from '../../styles/common';
import { isNickname } from '../../utils/validation';
import { Message } from '../../components';

interface IEditProfileProps {
  user: IUser;
}
const EditProfile: React.SFC<IEditProfileProps> = ({ user: INIT_USER }) => {
  // TODO: shallow eqaulity check
  const [user, setUser] = useSetState({ ...INIT_USER, tags: INIT_USER.tags.map(tag => tag.name) });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { id, image, nickname, tags } = user;

  const handleUpdateUser = useCallback((userDraft: IUpdateUser) => {
    setUser(userDraft);
  }, [setUser]);
  const handleSave = async () => {
    try {
      await isNickname.validate(nickname);
    }
    catch (err) {
      return setError(err.message);
    }
    try {
      const { result } = await updateUser(id, { image, nickname, tags });
      dispatch(setUserProfile(result));
      notifier.notify({ type: 'success', message: '프로필 변경이 완료되었습니다.' });
      history.goBack();
    } catch (err) {
      notifier.notify({ type: 'error', message: '저장에 실패하였습니다. 다시 시도해주세요.' });
    }
  };
  const handleCancle = useCallback(() => {
    history.goBack();
  }, []);
  return (
    <>
      <Grid container direction="column" spacing={5}>
        <Title>기본정보 수정</Title>
        <Grid item container spacing={3}>
          <Grid item>
            <ProfileImage handleUpdateUser={handleUpdateUser} image={image} />
          </Grid>
          <Grid item xs={7} container direction="column" spacing={2}>
            <Grid item>
              <TextField value={nickname} placeholder="nickname" onChange={(e) => handleUpdateUser({ nickname: e.target.value })} inputProps={{
                style: {
                  fontSize: '2rem'
                }
              }} />
            </Grid>
          </Grid>
        </Grid>
        <Title>관심태그 수정</Title>
        <Grid item>
          <TagEdit tags={tags} handleUpdateUser={handleUpdateUser} />
        </Grid>
        {!!error && <Message type="error">{error}</Message>}
        <Grid item container spacing={2}>
          <Grid item>
            <Button color="primary" variant="outlined" onClick={handleSave}>저장</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={handleCancle}>취소</Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default EditProfile;