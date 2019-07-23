import styled from 'styled-components';
import { maxDevice, size } from '../utils/device';

export const WithBackground = styled.div`
  width: 100%;
`;

export const PageLayout = styled.div`
  width: 100%;
  padding: 1rem 5px;

  box-sizing: border-box;
  @media ${maxDevice.tablet} {
    padding: 0;
  }
`;
export const LayoutWithSidebar = styled.div`
  width: 1400px;
  max-width: 100%;
  margin: auto;

  display: flex;
  justify-content: space-between;
`;
export const MainLayout = styled.div`
  flex: 1 1 ${size.tablet}px;
  width: ${size.tablet}px;
  min-width: ${size.tablet}px;
  margin: auto;
  box-sizing: border-box;
  @media ${maxDevice.tablet} {
    width: 100%;
    min-width: 300px;
    padding: 5px;
  }
`;
export const Sidebar = styled.div<{ left?: boolean }>`
  flex: 0 1 300px;
  margin: 0 20px;
  @media screen and (max-width: ${props =>
    props.left ? '1400px' : '1100px'}) {
    display: none;
  }
`;

export const Box = styled.div`
  width: 100%;
  margin: auto;
  padding: 1.4rem;
  box-sizing: border-box;

  background: #ffffff;
`;
export const ShadowBox = styled(Box)`
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.1);
  }
`;

export const Title = styled.h2`
  color: ${props => props.theme.palette.primary.main};

  border-left: 3.5px solid ${props => props.theme.palette.primary.main};

  padding-left: 20px;
`;

export const MenuList = styled.ul`
  min-width: 200px;
  font-size: 16px;
  list-style: none;
  padding: 1rem 0px;
`

export const MenuItem = styled.li<{ isDivider?: boolean }>`
  box-sizing: border-box;
  width: 100%;
  padding: 7px 25px;
  ${props => !props.isDivider && (
    `&:hover {
      cursor: pointer;
      color: ${props.theme.palette.primary.main};
      transition: color 0.1s;
    }`
  )}
`