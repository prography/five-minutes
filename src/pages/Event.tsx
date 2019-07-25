import React, { useState, useMemo, useCallback } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { MainLayout, Title } from '../styles/common';
import { Codemirror, Confirm } from '../components';
import { EditorFromTextArea } from 'codemirror';
import { MODE_INFO } from '../constants/codemirror';
import { makeSelectable } from '../utils/select';
import { ValueType } from 'react-select/lib/types';
import { IOptionValue } from '../models/select';

const EVENT_MODES = ['javascript', 'typescript', 'python'];

const SELECTABLE_MODES = makeSelectable(
  MODE_INFO.filter(info =>
    EVENT_MODES.some(mode => mode === info.name.toLowerCase()),
  ).map(info => info.name),
);

const Submit = styled.div`
  margin: 10px 0;
  text-align: right;
`;

const Event: React.SFC = () => {
  const [editor, setEditor] = useState<EditorFromTextArea | null>(null);
  const [mode, setMode] = useState('JavaScript');
  const [confirm, setConfirm] = useState(false);
  const defaultValue = useMemo(() => ({ label: mode, value: mode }), [mode]);
  const openConfirm = useCallback(() => setConfirm(true), []);
  const closeConfirm = useCallback(() => setConfirm(false), []);
  const handleModeChange = useCallback(
    (option: ValueType<IOptionValue>) => {
      if (option && !('length' in option)) {
        setMode(option.value);
      }
    },
    [setMode],
  );
  return (
    <MainLayout>
      <Title>이벤트 🏆</Title>
      <Codemirror value="" mode={mode} setCodeEditor={setEditor} />
      <Select
        options={SELECTABLE_MODES}
        defaultValue={defaultValue}
        onChange={handleModeChange}
      />
      <Submit>
        <Button color="primary" variant="contained" onClick={openConfirm}>
          제출하기
        </Button>
      </Submit>
      <Confirm
        open={confirm}
        title="정말 제출하시겠습니까?"
        message="제출하면 더 이상 코드를 수정할 수 없습니다."
        onClose={closeConfirm}
        onDisagree={closeConfirm}
      />
    </MainLayout>
  );
};

export default Event;
