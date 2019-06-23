import React from 'react';
import styled from 'styled-components';
import NoResultImg from '../assets/images/noresult.png';

const Container = styled.div`
  max-width: 400px;
  width: 100%;
  margin: auto;
`;
const Image = styled.div`
  width: 100%;
  height: 300px;
`;
const Text = styled.div`
  text-align: center;
  h1, h2, h3 {
    color: ${props => props.theme.palette.primary.main};
  }
`;

interface INoResultProps {
  header?: string;
}
const NoResult: React.SFC<INoResultProps> = ({ header = '결과가 없습니다.', children }) => (
  <Container>
    <Image>
      <img src={NoResultImg} alt="noresult" />
    </Image>
    <Text>
      <h1>
        {header}
      </h1>
      {children && (
        <div>
          {children}
        </div>
      )}
    </Text>
  </Container>
);

export default NoResult;
