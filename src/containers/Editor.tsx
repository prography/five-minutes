import React, { useState, memo } from 'react';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import useMarkdown from '../hooks/useMarkdown';

const Label = styled.h3`
  font-size: 16px;
`;
const TextContainer = styled.div`
  margin-top: 1rem;
`;
const Preview = styled.div`
  padding: 0 14px;
`;

interface IEditorProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}
const Editor: React.SFC<IEditorProps> = ({ value, handleChange }) => {
  const markdownValue = useMarkdown(value);
  return (
    <>
      <TextContainer>
        <TextField
          id="contents"
          label="내용"
          multiline
          margin="dense"
          fullWidth
          value={value}
          onChange={handleChange}
        />
      </TextContainer>
      <TextContainer>
        <Divider light />
        <Preview dangerouslySetInnerHTML={{ __html: markdownValue }} />
      </TextContainer>
    </>
  );
};

export default memo(Editor);
