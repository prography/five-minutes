import styled from 'styled-components';
import { maxDevice } from '../../utils/device';
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
  @media ${maxDevice.laptop} {
    flex: 0 0 50px;
  }
`;
export const BodyMain = styled.div`
  flex: 1;
  min-width: calc(100% - 80px);
`;
export const Content = styled.div`
  p {
    word-break: break-all;
    margin: 0;
  }
`;
export const TagWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
`;
export const Footer = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const ActionWrapper = styled.div`
  display: flex;
  a {
    padding: 0 3px 2px;
  }
`;
export const Code = styled.div`
  font-size: 0.95em;
`;
