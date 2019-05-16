import React, { useCallback } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
  CustomLink,
  Input,
  Logo,
  ProfilePhoto,
  ProfileMenu,
} from '../../components';
import { openModal, closeModal } from '../../actions/modal';
import {
  Container,
  LogoWrapper,
  LogoAdjust,
  SearchBox,
  MiniButton,
  Actions,
  Menu,
} from './style';
import { IRootState } from '../../reducers';
import { IUser } from '../../models/user';
import { logout } from '../../actions/auth';

// searchbox가 필요한 route
// const withSearchPath: { [key: string]: boolean } = {
//   '/ask': true,
// };

export interface IHeaderProps extends RouteComponentProps {
  dispatch: Dispatch;
  user: IUser;
  isLoggedIn: boolean;
}
const Header: React.SFC<IHeaderProps> = ({ dispatch, user, isLoggedIn }) => {
  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, []);
  return (
    <Container>
      <LogoWrapper>
        <LogoAdjust>
          <CustomLink to="/">
            <Logo />
          </CustomLink>
        </LogoAdjust>
      </LogoWrapper>
      <SearchBox>
        <Input />
        <MiniButton invert>상세 검색</MiniButton>
        <CustomLink to="/ask">
          <MiniButton>코드 올리기</MiniButton>
        </CustomLink>
      </SearchBox>
      <Actions>
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
      </Actions>
    </Container>
  );
};

const mapStateToProps = (state: IRootState) => ({
  isLoggedIn: state.auth.me.isLoggedIn,
  user: state.auth.me.user,
});
export default withRouter(connect(mapStateToProps)(Header));
