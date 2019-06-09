import styled from 'styled-components';

export const InfoContainer = styled.div`
  width: 100%;
  min-height: 220px;
`

export const Container = styled.div`
  max-width: 300px;
  border: 1px solid ${props => props.theme.palette.gray};
`;
export const ContainerTitle = styled.div`
  width: 100%;
  padding: 10px;

  display: flex;
  align-items: center;
  box-sizing: border-box;
`;
export const ContainerContents = styled.div`
  padding: 10px;
  box-sizing: border-box;
`;
export const TagWrapper = styled.span`
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 20px;
  svg {
    &:hover {
      cursor: pointer;
    }
    vertical-align: middle;
  }
`;
export const TagSelectWrapper = styled.div`
  margin-bottom: 3rem;
`;
