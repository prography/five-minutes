import React, { memo } from 'react';
import styled from 'styled-components';
import { CustomLink, Input, Button } from '../components';

const Container = styled.div<{ withSearch: boolean }>`
  display: flex;
  align-items: center;

  width: 100%;
  height: 60px;

  box-sizing: border-box;
  padding: 0 5%;

  color: ${props => (props.withSearch ? 'black' : 'white')};
  background-color: ${props => (props.withSearch ? 'white' : 'inherit')};
`;

const Logo = styled.div<{ withSearch: boolean }>`
  ${props => !props.withSearch && `flex: 1 1;`}
  font-size: 20px;
`;
const WithSearch = styled.div`
  flex: 0 1 60%;
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
    <Container withSearch={withSearch}>
      <Logo withSearch={withSearch}>
        <CustomLink to="/">
          <h2>CorrectCode</h2>
        </CustomLink>
      </Logo>
      {withSearch && (
        <WithSearch>
          <Input />
          <MiniButton invert>검색</MiniButton>
        </WithSearch>
      )}
      <Actions>
        <Menu>로그인</Menu>
        <Menu>회원가입</Menu>
      </Actions>
    </Container>
  );
};

export default memo(Header);
