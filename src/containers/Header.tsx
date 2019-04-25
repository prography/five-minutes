import React, { memo } from 'react';
import styled from 'styled-components';
import { CustomLink, Input, Button, Logo } from '../components';

const Container = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 60px;

  box-sizing: border-box;
  padding: 0 5%;

  background-color: white;

  border-bottom: 5px solid ${props => props.theme.colors.primary};
`;

const LogoWrapper = styled.div`
  position: relative;
  flex-basis: 200px;
`;
const LogoAdjust = styled.div`
  position: absolute;
  top: -10px;
  left: 0px;
`;
const SearchBox = styled.div`
  flex: 0 1 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 40px;
  margin: 0 auto;
`;
const MiniButton = styled(Button)`
  min-height: 0px;
  padding: 5px;
`;
const Actions = styled.div`
  display: flex;
`;
const Menu = styled.div`
  margin-left: 10px;
`;

// TODO: Search Header 따로 빼기
interface IHeaderProps {
  withSearch?: boolean;
}
const Header: React.SFC<IHeaderProps> = ({ withSearch = false }) => {
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
