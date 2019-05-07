import React, { memo, useRef, useEffect } from 'react';
import CodeMirror, {
  EditorFromTextArea,
  EditorConfiguration,
} from 'codemirror';
import styled from 'styled-components';
import 'codemirror/addon/selection/active-line';
import 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import '../styles/codemirror.css';
import { CLIKE } from '../constants/codemirror';
// clike처리. 일단 임시로
const getModePath = (mode: string) => {
  if (Object.keys(CLIKE).includes(mode)) {
    return 'clike';
  }
  return mode;
};
const getModeOption = (mode: string) => {
  if (Object.keys(CLIKE).includes(mode)) return `text/${CLIKE[mode]}`;
  return mode;
};
const Wrapper = styled.div`
  border: 1px solid #ccc;
`;
const Textarea = styled.textarea`
  display: none;
`;

export interface ICodemirrorProps extends EditorConfiguration {
  setCodeEditor?: (editor: EditorFromTextArea) => void;
}
const Codemirror: React.SFC<ICodemirrorProps> = ({
  mode,
  setCodeEditor,
  ...options
}) => {
  const textarea = useRef<HTMLTextAreaElement>(null);
  const mirror = useRef<EditorFromTextArea | null>(null);
  useEffect(() => {
    if (textarea.current) {
      mirror.current = CodeMirror.fromTextArea(textarea.current, {
        ...options,
        lineNumbers: true,
      });
      setCodeEditor && setCodeEditor(mirror.current);
    }
  }, []);
  useEffect(() => {
    if (mode) {
      const path = getModePath(mode);
      const option = getModeOption(mode);
      import(`codemirror/mode/${path}/${path}`).then(() => {
        if (mirror.current) {
          mirror.current.setOption('mode', option);
        }
      });
    }
  }, [mode]);
  return (
    <Wrapper>
      <Textarea ref={textarea} value={options.value} readOnly />
    </Wrapper>
  );
};

export default memo(Codemirror);
