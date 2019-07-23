import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;
export const ContainerTitle = styled.div`
  width: 100%;
  padding: 5px 10px;

  display: flex;
  align-items: center;
  box-sizing: border-box;

  font-size: 0.9em;
`;
export const ContainerContents = styled.div<{ isActive?: boolean }>`
  opacity: ${props => (props.isActive ? 1 : 0.4)};
  transition: opacity 0.1s ease-in-out;
  padding: 5px;
  box-sizing: border-box;
`;
export const TagWrapper = styled.span`
  display: inline-block;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
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
export const EditIcon = styled.span<{ isEditing?: boolean }>`
  color: ${props =>
    props.isEditing
      ? props.theme.palette.secondary.main
      : props.theme.palette.darkGray};
`;
