import styled from 'styled-components';

export const Inner = styled.div`
  padding: 20px 30px;
`;
export const Form = styled.form``;

export const FakeLink = styled.span`
  color: ${props => props.theme.palette.primary.main};

  &:hover {
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.1s;
  }
`;
