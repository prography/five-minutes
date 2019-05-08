import styled from 'styled-components';

export const ToolbarContainer = styled.div`
  width: 100%;
  padding: 8px;
`;

export const ToolItem = styled.span`
  margin-right: 15px;
  display: inline-block;
  vertical-align: middle;

  color: ${props => props.theme.palette.primary.contrastText};

  &:hover {
    transition: color 0.2s;
    color: #20639b;
  }
`;
