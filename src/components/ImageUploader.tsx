import styled from 'styled-components';

const ImageUploader = styled.input.attrs({
  type: 'file',
  accept: 'image/*',
})`
  display: none;
`;

export default ImageUploader;
