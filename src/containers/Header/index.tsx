import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CustomLink, Input, Logo } from '../../components';
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

// searchbox가 필요한 route
// const withSearchPath: { [key: string]: boolean } = {
//   '/ask': true,
// };

const Header: React.SFC<RouteComponentProps & { dispatch: Dispatch }> = ({
  dispatch,
  location,
}) => {
  const { pathname } = location;
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
        <Menu onClick={() => dispatch(openModal('signin'))}>로그인</Menu>
        <Menu onClick={() => dispatch(openModal('signup'))}>회원가입</Menu>
      </Actions>
    </Container>
  );
};

export default withRouter(connect()(Header));
