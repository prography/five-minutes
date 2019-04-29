import React, { useState, memo } from 'react';
import { Divider, TextArea } from 'gestalt';
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
  handleChange: (value: string) => void;
}
const Editor: React.SFC<IEditorProps> = ({ value, handleChange }) => {
  const onChange = ({ value }: { value: string }) => {
    handleChange(value);
  };
  const markdownValue = useMarkdown(value);
  return (
    <>
      <TextContainer>
        <TextArea id="editor" value={value} onChange={onChange} />
      </TextContainer>
      <TextContainer>
        <Divider />
        <Preview dangerouslySetInnerHTML={{ __html: markdownValue }} />
      </TextContainer>
    </>
  );
};

export default memo(Editor);
