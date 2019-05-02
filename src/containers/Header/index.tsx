import React, { useMemo, memo } from 'react';
import { connect } from 'react-redux';
import { CustomLink, Input, Logo } from '../../components';
import {
  Container,
  LogoWrapper,
  LogoAdjust,
  SearchBox,
  MiniButton,
  Actions,
  Menu,
} from './style';
import { history } from '../../utils/history';

// searchbox가 필요한 route
const withSearchPath: { [key: string]: boolean } = {
  '/ask': true,
};

interface IHeaderProps {}
const Header: React.SFC<IHeaderProps> = () => {
  const { pathname } = history.location;
  const withSearch = useMemo(() => {
    return withSearchPath[pathname];
  }, [pathname]);
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
        {withSearch && (
          <>
            <Input />
            <MiniButton invert>상세 검색</MiniButton>
            <MiniButton>코드 올리기</MiniButton>
          </>
        )}
      </SearchBox>
      <Actions>
        <Menu>로그인</Menu>
        <Menu>회원가입</Menu>
      </Actions>
    </Container>
  );
};

export default memo(Header);
