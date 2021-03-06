import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import Codemirror, { ICodemirrorProps } from '../components/Codemirror';
import { ValueType } from 'react-select/lib/types';
import { IOptionValue } from '../models/select';
import { makeSelectable } from '../utils/select';
import { getModeNames } from '../utils/codemirror';

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

const OPTIONS = makeSelectable(getModeNames());
interface ICodeEditorProps extends ICodemirrorProps {
  setMode: (value: string) => void;
}
const CodeEditor: React.SFC<ICodeEditorProps> = ({
  mode = 'Plain Text',
  setMode,
  setCodeEditor,
  ...props
}) => {
  const defaultValue = useMemo(() => ({ label: mode, value: mode }), [mode]);
  const handleModeChange = useCallback(
    (option: ValueType<IOptionValue>) => {
      if (option && !('length' in option)) {
        setMode(option.value);
      }
    },
    [setMode],
  );
  return (
    <>
      <Codemirror mode={mode} setCodeEditor={setCodeEditor} {...props} />
      <SelectWrapper>
        <SelectMode>
          <Select
            defaultValue={defaultValue}
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
