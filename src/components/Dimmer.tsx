import styled from 'styled-components';

const Dimmer = styled.div`
  position: fixed;
  z-index: 800;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(255, 255, 255, 0.3);
`;

export default Dimmer;
