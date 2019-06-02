import styled from 'styled-components';
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
export const LogoAdjust = styled.div`
  position: absolute;
  top: 18px;
  left: 50px;
`;
export const Menu = styled.div`
  margin-left: 10px;
`;
