import React, { useCallback } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { CustomLink, Search, Logo, ProfileMenu } from '../../components';
import { openModal } from '../../actions/modal';
import { Container, LogoAdjust, Menu } from './style';
import { IRootState } from '../../reducers';
import { IUser } from '../../models/user';
import { logout } from '../../actions/auth';

export interface IHeaderProps extends RouteComponentProps {
  dispatch: Dispatch;
  user: IUser;
  isLoggedIn: boolean;
}
const Header: React.SFC<IHeaderProps> = ({ dispatch, user, isLoggedIn }) => {
  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <LogoAdjust>
            <CustomLink to="/">
              <Logo />
            </CustomLink>
          </LogoAdjust>
        </Grid>
        <Grid
          item
          container
          xs={9}
          spacing={2}
          justify="flex-end"
          alignItems="center"
        >
          <Grid item>
            <Search paperProps={{ style: { width: '100%' } }} />
          </Grid>
          <Grid item>
            {isLoggedIn ? (
              <Menu>
                <ProfileMenu {...user} logout={handleLogout} />
              </Menu>
            ) : (
              <>
                <Button onClick={() => dispatch(openModal('signin'))}>
                  로그인
                </Button>
                <Button onClick={() => dispatch(openModal('signup'))}>
                  회원가입
                </Button>
              </>
            )}
          </Grid>
          <Grid item>
            <CustomLink to="/ask">
              <Button fullWidth variant="contained" color="primary">
                코드 올리기
              </Button>
            </CustomLink>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state: IRootState) => ({
  isLoggedIn: state.auth.me.isLoggedIn,
  user: state.auth.me.user,
});
export default withRouter(connect(mapStateToProps)(Header));
