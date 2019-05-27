import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CustomLink = styled(Link)<{ color?: string }>`
  text-decoration: none;
  color: ${props =>
    props.color ? props.color : props.theme.palette.primary.main};
  &:hover {
    color: #2962ff;
  }
`;

export default CustomLink;
