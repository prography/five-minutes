import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
const CustomLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const FeedSearch = () => {
  return (
    <>
      <Title>
        Review <br />
        your code
      </Title>
      <Wrapper>
        <Input />
        <Button color="primary">검색</Button>
        <CustomLink to="/ask">
          <Button color="secondary">코드 올리기</Button>
        </CustomLink>
      </Wrapper>
    </>
  );
};

export default FeedSearch;
