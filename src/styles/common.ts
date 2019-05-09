import styled from 'styled-components';

export const WithBackground = styled.div`
  width: 100%;
`;

export const PageLayout = styled.div`
  width: 50%;
  min-width: 800px;
  margin: 3rem auto;

  @media screen and (max-width: 800px) {
    width: 95%;
    min-width: 300px;
    margin: 3rem auto;
  }
`;

export const ShadowBox = styled.div`
  margin: auto;
  padding: 1.4rem;

  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.02);
  width: 100%;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.15);
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  color: ${props => props.theme.palette.primary.main};

  border-left: 5px solid ${props => props.theme.palette.primary.main};

  padding-left: 20px;
`;
