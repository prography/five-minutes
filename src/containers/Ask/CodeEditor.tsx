import React, { useState } from 'react';
import styled from 'styled-components';
import { MODES } from '../../constants/codemirror';
import Codemirror, { ICodemirrorProps } from '../../components/Codemirror';

const SelectMode = styled.div`
  margin: 20px 0;
  text-align: right;
`;
const CodeEditor: React.SFC<ICodemirrorProps> = ({
  mode: modeInit = 'javascript',
  setCodeEditor,
}) => {
  const [mode, setMode] = useState(modeInit);

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value);
  };
  return (
    <>
      <Codemirror mode={mode} setCodeEditor={setCodeEditor} />
      <SelectMode>
        <select value={mode} onChange={handleModeChange}>
          {MODES.map(mode => {
            return (
              <option key={mode} value={mode}>
                {mode}
              </option>
            );
          })}
        </select>
      </SelectMode>
    </>
  );
};

export default CodeEditor;
