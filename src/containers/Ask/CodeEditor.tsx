import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { MODES } from '../../constants/codemirror';
import Codemirror, { ICodemirrorProps } from '../../components/Codemirror';
import { ValueType } from 'react-select/lib/types';
import { IOptionValue } from '../../models/select';

const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const SelectMode = styled.div`
  width: 200px;
  margin: 20px 0;
  text-align: center;
`;

const makeOption = (option: string): IOptionValue => {
  return {
    label: option,
    value: option,
  };
};
const OPTIONS = MODES.map(makeOption);
const CodeEditor: React.SFC<ICodemirrorProps> = ({
  mode: modeInit = 'javascript',
  setCodeEditor,
}) => {
  const [mode, setMode] = useState(modeInit);

  const handleModeChange = useCallback((option: ValueType<IOptionValue>) => {
    if (option && !Array.isArray(option)) {
      setMode(option.value);
    }
  }, []);
  return (
    <>
      <Codemirror mode={mode} setCodeEditor={setCodeEditor} />
      <SelectWrapper>
        <SelectMode>
          <Select
            placeholder="Select language"
            options={OPTIONS}
            onChange={handleModeChange}
          />
        </SelectMode>
      </SelectWrapper>
    </>
  );
};

export default CodeEditor;
