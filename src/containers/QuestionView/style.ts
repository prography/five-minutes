import styled from 'styled-components';
export const Container = styled.div`
  font-size: 1rem;
  line-height: 1.5;
`;
export const Subject = styled.h1`
  flex: 1;
`;
export const Body = styled.div`
  padding-top: 20px;
  width: 100%;
  min-height: 200px;
  display: flex;
`;
export const BodySide = styled.div`
  flex: 0 0 80px;
  text-align: center;
`;
export const BodyMain = styled.div`
  flex: 1;
`;
export const Content = styled.div`
  p {
    word-break: break-all;
    margin: 0;
  }
`;
export const Code = styled.div`
  font-size: 0.95em;
`;
