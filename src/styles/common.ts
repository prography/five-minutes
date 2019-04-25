import styled from 'styled-components';

export const WithBackground = styled.div`
  width: 100%;
`;

export const PageLayout = styled.div`
  width: 50%;
  min-width: 800px;

  margin: 3rem auto;
`;

export const ShadowBox = styled.div`
  margin: auto;
  padding: 1.5rem;

  background-color: white;
  box-sizing: border-box;
  box-shadow: 1px 1px 10px 0px;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: ${props => props.theme.colors.main};

  border-left: 5px solid ${props => props.theme.colors.primary};

  padding-left: 20px;
`;
