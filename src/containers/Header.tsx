import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;

  width: 90%;
  height: 60px;

  color: white;

  box-sizing: border-box;
  margin: auto;
`;

const Logo = styled.div`
  flex: 1 1;
`;
const Actions = styled.div`
  display: flex;
`;
const Menu = styled.div`
  margin-left: 10px;
`;
const Header = () => {
  return (
    <Container>
      <Logo>
        <h2>CorrectCode</h2>
      </Logo>
      <Actions>
        <Menu>로그인</Menu>
        <Menu>회원가입</Menu>
      </Actions>
    </Container>
  );
};

export default Header;
