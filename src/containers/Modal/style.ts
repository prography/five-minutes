import styled from 'styled-components';

export const Inner = styled.div`
  padding: 20px 30px;
`;
export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
// input 2개를 centering
export const InputWrapper = styled.div<{ isLeft?: boolean }>`
  width: calc(50% - 8px);
  margin-right: ${props => (props.isLeft ? '16px' : '0px')};
`;

export const FakeLink = styled.span`
  color: ${props => props.theme.palette.primary.main};

  &:hover {
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.1s;
  }
`;
