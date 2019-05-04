import React from 'react';
import styled from 'styled-components';

const Container = styled.h1`
  max-width: 500px;
  margin: auto;
  margin-top: 200px;
  font-size: 3em;
`;
const NoResult: React.SFC = ({ children = `결과가 없습니다...` }) => (
  <Container>{children}</Container>
);

export default NoResult;
