import styled from 'styled-components';
import * as backgroundImg from '../assets/background.png';

export const WithBackground = styled.div`
  width: 100%;
  min-height: 100vh;
  background: url(${backgroundImg});
  background-size: 110% 80%;
  background-position: -5px -5px;
  background-repeat: no-repeat;
`;

export const PageLayout = styled.div`
  width: 50%;
  min-width: 800px;

  margin: 3rem auto;
`;

export const ShadowBox = styled.div`
  margin: auto;
  padding: 10px 20px;

  background-color: white;
  box-sizing: border-box;
  box-shadow: 2px 2px 10px 0px;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: white;

  border-left: 3px solid ${props => props.theme.colors.primary};

  padding-left: 20px;
`;
