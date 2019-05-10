import styled from 'styled-components';

export const ToolbarContainer = styled.div`
  width: 100%;
  padding: 8px;
  border: 1px solid ${props => props.theme.palette.gray};
  border-bottom: none;
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