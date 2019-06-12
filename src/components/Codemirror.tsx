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
import { getModeInfoByName } from '../utils/codemirror';

const Wrapper = styled.div`
  border: 1px solid #ccc;
  margin: 10px 0;
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
  const initialOptions = useRef(options);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const mirror = useRef<EditorFromTextArea | null>(null);
  useEffect(() => {
    if (textarea.current) {
      mirror.current = CodeMirror.fromTextArea(textarea.current, {
        ...initialOptions.current,
        lineNumbers: true,
      });
      setCodeEditor && setCodeEditor(mirror.current);
    }
  }, [setCodeEditor]);
  useEffect(() => {
    if (mode) {
      const info = getModeInfoByName(mode);
      if (!info) return;
      const modeOption = info.mime
        ? info.mime
        : Array.isArray(info.mimes)
        ? info.mimes[0]
        : '';
      if (!info.mode || info.mode === 'null') return; // Plain Text
      import(`codemirror/mode/${info.mode}/${info.mode}`).then(() => {
        if (mirror.current) {
          mirror.current.setOption('mode', modeOption);
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
