import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
`;
export const Side = styled.div`
  flex: 0 1 150px;
`;
export const Tabs = styled.ul`
  padding: 0;
  list-style-type: none;
`;
export const Tab = styled.li<{ selected: boolean }>`
  list-style-type: none;
  cursor: pointer;
  font-size: 20px;
  line-height: 1.5;
  margin-top: 1rem;
  border-bottom: 1px solid
    ${props =>
      props.selected
        ? props.theme.palette.primary.main
        : props.theme.palette.gray};
`;
export const Content = styled.div`
  flex: 1 0;
  margin-left: 20px;
`;
export const List = styled.div``;
export const Center = styled.div`
  display: flex;
  justify-content: center;
`;

export const ContentListWrapper = styled.div`
  & > div {
    margin-bottom: 0;
    border-bottom: 1px solid ${props => props.theme.palette.gray};
  }
`;
