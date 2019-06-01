import styled from 'styled-components';

export const WithBackground = styled.div`
  width: 100%;
`;

export const PageLayout = styled.div`
  width: 100%;
  padding: 3rem 10px;

  box-sizing: border-box;
`;
export const MainLayout = styled.div`
  flex: 1 1 800px;
  width: 800px;
  min-width: 800px;
  margin: auto;
  @media screen and (max-width: 800px) {
    width: 95%;
    min-width: 300px;
  }
`;
export const LayoutWithSidebar = styled.div`
  width: 1400px;
  margin: auto;

  display: flex;
  justify-content: space-between;
`;
export const Sidebar = styled.div<{ left?: boolean }>`
  flex: 0 1 300px;
  margin: 0 20px;
  @media screen and (max-width: ${props => (props.left ? '600px' : '900px')}) {
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
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.1);
    transform : scale(1.01);
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  color: ${props => props.theme.palette.primary.main};

  border-left: 3.5px solid ${props => props.theme.palette.primary.main};

  padding-left: 20px;
`;
