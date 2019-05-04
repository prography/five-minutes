import styled from 'styled-components';
import { Button } from '../../components';
export const Container = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 60px;

  box-sizing: border-box;
  padding: 0 5%;

  background-color: white;

  border-bottom: 5px solid ${props => props.theme.palette.primary.main};
`;

export const LogoWrapper = styled.div`
  position: relative;
  flex-basis: 200px;
`;
export const LogoAdjust = styled.div`
  position: absolute;
  top: -10px;
  left: 0px;
`;
export const SearchBox = styled.div`
  flex: 0 1 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 auto;
`;
export const MiniButton = styled(Button)`
  min-height: 0px;
  padding: 5px;
`;
export const Actions = styled.div`
  display: flex;
`;
export const Menu = styled.div`
  margin-left: 10px;
`;
