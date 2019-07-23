import React, { memo, useCallback, useContext, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import isEqual from 'lodash/isEqual';
import ViewportContext from '../../context/ViewportChecker';
import { CustomLink, Search, Logo, ProfileMenu } from '../../components';
import { openModal } from '../../actions/modal';
import { Container, LogoAdjust, Menu } from './style';
import { IRootState } from '../../reducers';
import { logout } from '../../actions/auth';

const Header: React.SFC = () => {
  const viewport = useContext(ViewportContext);

  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state: IRootState) => ({
    isLoggedIn: state.auth.me.isLoggedIn,
    user: state.auth.me.user,
  }), isEqual);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const isMobile = useMemo(() => viewport !== 'laptop', [viewport]);
  return (
    <Container>
      <LogoAdjust>
        <CustomLink to="/">
          <Logo width={isMobile ? 120 : 200} />
        </CustomLink>
      </LogoAdjust>
      <Grid container alignItems="center">
        <Grid
          item
          container
          xs="auto"
          justify="flex-end"
          alignItems="center"
        >
          <Grid item>
            <Search isMobile={isMobile} />
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
          {
            isLoggedIn && !isMobile && (
              <Grid item>
                <CustomLink to="/ask">
                  <Button fullWidth variant="contained" color="primary">
                    코드 올리기
                  </Button>
                </CustomLink>
              </Grid>
            )
          }
        </Grid>
      </Grid>
    </Container>
  );
};

export default memo(Header);
