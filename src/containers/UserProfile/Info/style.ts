import styled from 'styled-components';
import { maxDevice } from '../../../utils/device';

export const InfoContainer = styled.div`
  width: 100%;
`;

export const Container = styled.div`
  max-width: 300px;
  border: 1px solid ${props => props.theme.palette.gray};
`;
export const ContainerTitle = styled.div`
  width: 100%;
  padding: 10px;

  display: flex;
  align-items: center;
  box-sizing: border-box;
`;
export const ContainerContents = styled.div`
  padding: 10px;
  box-sizing: border-box;
`;
export const TagWrapper = styled.span`
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 20px;
  svg {
    &:hover {
      cursor: pointer;
    }
    vertical-align: middle;
  }
`;

export const Name = styled.h1`
  font-size: 24px;
  font-weight: 400;
  margin: 0;
  margin-right: 20px;
`

export const InfoLeft = styled.div`
  flex: 1;
  & > div {
    width: 150px;
    height: 150px;
    @media ${maxDevice.tablet} {
      width: 64px;
      height: 64px;
    }
  }
`
export const MarginRight = styled.div`
  margin-right: 20px;
`
export const MarginLeft = styled.div`
  margin-left: 20px;
`;
export const MarginList = styled.div`
  & > * {
    margin-bottom: 20px;
  }
`