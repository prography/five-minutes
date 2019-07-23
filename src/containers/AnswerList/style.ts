import styled from 'styled-components';
import { BodySide, BodyMain } from '../QuestionView/style';

/* Answer와 User의 간격 맞춰야함 */

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;
export const AnswerLeft = styled(BodySide)``;
export const AnswerRight = styled(BodyMain)`
  flex: 1 1 calc(100% - 160px);
  min-width: calc(100% - 160px);
  box-sizing: border-box;
`;
export const ResolveCheck = styled.button<{ resolve?: boolean }>`
  width: 80px;
  padding: 0;
  text-align: right;
  color: ${props => props.resolve ? props.theme.palette.secondary.main : props.theme.palette.gray};

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
