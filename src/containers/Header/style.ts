import styled from 'styled-components';
import { minDevice } from '../../utils/device';

export const Container = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 60px;

  box-sizing: border-box;

  background-color: white;

  border-bottom: 3px solid ${props => props.theme.palette.primary.main};
  
  padding: 0;
  @media ${minDevice.laptop} {
    padding: 0 5%;
    border-bottom: 5px solid ${props => props.theme.palette.primary.main};
  }
`;
export const LogoAdjust = styled.div`
position: absolute;
  top: 18px;
  left: 5px;
  @media ${minDevice.laptop} {
    left: 50px;
  }
`;
export const Menu = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;
