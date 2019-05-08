import styled from 'styled-components';

export const Commands = styled.div`
  background-color: white;
  z-index: 999;

  width: 200px;
  border-radius: 5px;
  border: 1px solid #ccc;

  padding: 5px 10px;
`;

export const EditorWithToolbar = styled.div`
  margin-top: 2rem;
  * {
    box-sizing: border-box;
  }
  fieldset {
    border-radius: 0px;

    &:focus {
      border: 1px solid #ccc;
    }
  }
`;
