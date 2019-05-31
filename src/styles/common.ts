import styled from 'styled-components';

export const WithBackground = styled.div`
  width: 100%;
`;

export const PageLayout = styled.div`
  margin: 3rem auto;
`;
export const MainLayout = styled.div`
  width: 60%;
  min-width: 800px;
  margin: auto;
  @media screen and (max-width: 800px) {
    width: 95%;
    min-width: 300px;
  }
`;
export const LeftSidebar = styled.div`
  float: left;
  width: calc(20% - 20px);

  margin-left: 20px;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;
export const RightSidebar = styled.div`
  float: left;
  width: calc(20% - 20px);

  margin-right: 20px;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

export const ShadowBox = styled.div`
  margin: auto;
  padding: 1.4rem;

  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.02);
  width: 100%;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.13);
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  color: ${props => props.theme.palette.primary.main};

  border-left: 3.5px solid ${props => props.theme.palette.primary.main};

  padding-left: 20px;
`;
