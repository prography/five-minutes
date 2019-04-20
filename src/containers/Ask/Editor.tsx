import React, { useState, memo } from 'react';
import { Tabs, TextArea } from 'gestalt';
import styled from 'styled-components';
import useMarkdown from '../../hooks/useMarkdown';

const TextContainer = styled.div`
  margin-top: 1rem;
`;
const Preview = styled.div`
  padding: 0 14px;
`;
const TABS = [{ text: 'Editor', href: '#' }, { text: 'Preview', href: '#' }];
interface IEditorProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  handleChange: (value: string) => void;
}
const Editor: React.SFC<IEditorProps> = ({ value, handleChange }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const onChange = ({ value }: { value: string }) => {
    handleChange(value);
  };
  const handleTabChange = ({ activeTabIndex }: { activeTabIndex: number }) => {
    setTabIndex(activeTabIndex);
  };
  const markdownValue = useMarkdown(value);
  return (
    <>
      <Tabs activeTabIndex={tabIndex} tabs={TABS} onChange={handleTabChange} />
      <TextContainer>
        {tabIndex === 1 ? (
          <Preview dangerouslySetInnerHTML={{ __html: markdownValue }} />
        ) : (
          <TextArea id="editor" value={value} onChange={onChange} />
        )}
      </TextContainer>
    </>
  );
};

export default memo(Editor);
