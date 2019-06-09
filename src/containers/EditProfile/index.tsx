import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ProfileImage from './ProfileImage';
import { IUser } from '../../models/user';
import { setUserProfile } from '../../actions/auth';
import { updateUser } from '../../api/user';
import { useSetState } from '../../hooks';
import { Button } from '@material-ui/core';
import { notifier } from '../../utils/renoti';
import { history } from '../../utils/history';

interface IEditProfileProps {
  user: IUser;
}
const EditProfile: React.SFC<IEditProfileProps> = ({ user: INIT_USER }) => {
  // TODO: shallow eqaulity check
  const [user, setUser] = useSetState(INIT_USER);
  const dispatch = useDispatch();
  const { id, image, nickname } = user;

  const handleUpdateUser = useCallback((userDraft: Partial<IUser>) => {
    setUser(userDraft);
  }, [setUser]);
  const handleNicknameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setUser({ nickname: e.target.value }), [setUser]);
  const handleSave = useCallback(async () => {
    try {
      const { result } = await updateUser(id, { image, nickname });
      dispatch(setUserProfile(result));
      notifier.notify({ type: 'success', message: '프로필 변경이 완료되었습니다.' });
      history.goBack();
    } catch (err) {
      notifier.notify({ type: 'error', message: '저장에 실패하였습니다. 다시 시도해주세요.' });
    }
  }, [id, image, nickname, dispatch]);
  const handleCancle = useCallback(() => {
    history.goBack();
  }, []);
  return (
    <>
      <Grid container direction="column" spacing={3}>
        <Grid item container spacing={3}>
          <Grid item>
            <ProfileImage handleUpdateUser={handleUpdateUser} image={image} />
          </Grid>
          <Grid item xs={7} container direction="column" spacing={2}>
            <Grid item>
              <TextField value={nickname} placeholder="nickname" onChange={handleNicknameChange} inputProps={{
                style: {
                  fontSize: '2rem'
                }
              }} />
            </Grid>
          </Grid>
        </Grid>
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