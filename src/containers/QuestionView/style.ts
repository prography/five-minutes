import styled from 'styled-components';
export const Container = styled.div`
  font-size: 1rem;
  line-height: 1.5;
`;
export const Subject = styled.h2`
  flex: 1;
`;
export const Body = styled.div`
  padding-top: 20px;
  width: 100%;
  min-height: 200px;
  display: flex;
`;
export const BodySide = styled.div`
  text-align: center;

  flex: 0 0 80px;
`;
export const BodyMain = styled.div`
  flex: 1;
  max-width: calc(100% - 80px);
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
