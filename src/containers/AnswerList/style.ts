import styled from 'styled-components';

export const AnswerContainer = styled.div`
  width: 100%;
  padding: 10px;
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
  margin-top: 2rem;
  width: 100%;
  min-height: 100px;
  display: flex;
`;

export const AnswerLike = styled.div`
  text-align: center;
  flex: 0 0 100px;
  border-right: 1px solid ${props => props.theme.palette.gray};
  padding-top: 1rem;
`;
export const AnswerMain = styled.div`
  flex: 1 0;
  padding: 0 20px;
`;

export const AnswerSide = styled.div`
  min-width: 150px;
`;

export const AnswerUser = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  img {
    margin-right: 10px;
  }
  margin-bottom: 10px;
`;

export const AnswerInfo = styled.div`
  font-size: 0.9em;
  color: ${props => props.theme.palette.darkGray};
`;
