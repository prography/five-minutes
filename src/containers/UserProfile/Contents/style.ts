import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;
export const Nav = styled.nav`
border-bottom: 1px solid ${props => props.theme.palette.gray};
`;
export const Tabs = styled.ul`
  padding: 0;
  margin-bottom: -1px;
  list-style-type: none;
`;
export const Tab = styled.li<{ selected: boolean }>`
  display: inline-block;
  list-style-type: none;
  cursor: pointer;
  margin-right: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid
    ${props =>
    props.selected
      ? props.theme.palette.primary.main
      : props.theme.palette.gray};
  
  &:hover {
    border-bottom: 1px solid ${props => props.theme.palette.primary.main};
    transition: border-bottom 0.1s;
  }
`;
export const Center = styled.div`
  display: flex;
  justify-content: center;
`;

export const ContentListWrapper = styled.div`
  margin-top: 2rem;
`;
