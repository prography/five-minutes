import styled from 'styled-components';

export const ToolbarContainer = styled.div`
  width: 100%;
  padding: 8px;
  border: 1px solid ${props => props.theme.palette.gray};
  border-bottom: none;
  box-sizing: border-box;
`;

export const ToolItem = styled.span`
  margin-right: 15px;
  display: inline-block;
  vertical-align: middle;

  color: ${props => props.theme.palette.gray};
  cursor: pointer;
  &:hover {
    transition: color 0.2s;
    color: #20639b;
  }
`;

export const EditorContainer = styled.div`
  position: relative;
  * {
    box-sizing: border-box;
  }
  fieldset {
    border-radius: 0px;
    border-width: 1px !important;
    border-color: ${props => props.theme.palette.gray} !important;

    &:focus {
      border-width: 2px !important;
    }
  }
`;

export const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.1);
`