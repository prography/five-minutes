import styled from 'styled-components';

/* Answer와 User의 간격 맞춰야함 */

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;
export const AnswerLeft = styled.div`
  flex: 0 0 80px;
  text-align: center;
`;
export const AnswerRight = styled.div`
  flex: 1 1;
  padding: 0 10px;
  max-width: calc(100% - 100px);
`;
export const ResolveCheck = styled.button<{ resolve?: boolean }>`
  flex: 0 0 80px;
  text-align: center;
  color: ${props => props.resolve ? props.theme.palette.primary.main : props.theme.palette.gray};

  &:hover {
    ${props => !props.disabled && 'cursor: pointer;'}
  }
`
export const Date = styled.div`
  font-size: 0.8em;
  color: ${props => props.theme.palette.darkGray};
`;

export const ListHeader = styled.div`
  display: flex;
  width: 100%;

  align-items: center;
`;

export const ListCount = styled.h3`
  flex: 1;
`;

export const ListActions = styled.div``;

export const AnswerItem = styled.div`
  width: 100%;
  max-width: 100%;
  min-height: 100px;
  display: flex;

  padding-top: 0.8rem;
`;
