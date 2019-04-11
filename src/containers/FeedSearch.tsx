import React from 'react';
import styled from 'styled-components';
import { Button, Input } from '../components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 60px;
`;
const Title = styled.h1`
  color: white;
`;
const FeedSearch = () => {
  return (
    <>
      <Title>Review your code</Title>
      <Wrapper>
        <Input />
        <Button>검색</Button>
      </Wrapper>
    </>
  );
};

export default FeedSearch;
