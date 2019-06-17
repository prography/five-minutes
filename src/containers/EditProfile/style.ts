import styled from 'styled-components';

export const ImageWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`
export const ImageEdit = styled.button`
  position: absolute;
  top: 0;
  height: 0;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  color: rgba(255,255,255,.65);
  background-color: rgba(0,0,0,.54);
  font-size: 1.5rem;

  &:hover {
    cursor:pointer;
    color: white;
    transition: color 0.1s;
  }

  display: flex;
  justify-content: center;
  align-items: center;
`