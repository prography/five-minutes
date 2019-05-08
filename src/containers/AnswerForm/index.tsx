import React, { useState, useEffect, useCallback } from 'react';
import Popper from '@material-ui/core/Popper';
import { EditorFromTextArea } from 'codemirror';
import { useInput, useSetState } from '../../hooks';
import { CodeSelect, CommandMenu, Editor } from '../';
import { Codemirror } from '../../components';
import { IQuestion } from '../../models/question';
import getCursorXY from '../../utils/caret';
import { KEYMAP } from '../../utils/keyboard';
import { ICommand, CommandType } from '../../models/command';
import Toolbar from '../Editor/Toolbar';
import { EditorWithToolbar } from './styles';
import { Title } from '../../styles/common';

interface IAnswerFormProps extends IQuestion {}

const initialCommand = {
  command: '',
  slashPos: -1,
  show: false,
  top: 0,
  left: 0,
};
type CodelineState = {
  codelineRef: EditorFromTextArea | undefined;
  codeline: string;
  show: boolean;
};
// 일단 하나만.
const COMMANDS: ICommand[] = [
  { type: 'codeline', description: '코드 라인을 정합니다.' },
];

const AnswerForm: React.SFC<IAnswerFormProps> = ({ code, language }) => {
  // 코드 라인 커맨드
  const [codelineState, setCodelineState] = useSetState<CodelineState>({
    codelineRef: undefined,
    codeline: '',
    show: false,
  });
  const showCodeline = useCallback((show: boolean) => {
    setCodelineState({ show });
  }, []);
  const setCodelineRef = useCallback(
    (editor: EditorFromTextArea) => setCodelineState({ codelineRef: editor }),
    [],
  );
  const onCodeSelect = useCallback(code => {
    setCodelineState({ codeline: code, show: false });
  }, []);
  useEffect(() => {
    const { codeline, codelineRef } = codelineState;
    if (codelineRef) {
      codelineRef.getDoc().setValue(codeline);
    }
  }, [codelineState.codeline]);

  // Answer 폼
  const [answer, setAnswer, setAnswerValue] = useInput('');

  // Command 관리
  const [editorRef, setEditorRef] = useState<HTMLTextAreaElement>();
  const [commands, setCommands] = useSetState(initialCommand);
  // Command clear
  const clearCommand = useCallback(
    (removeCommand: boolean = false) => {
      // removeCommand true일 시 slash 뒤 삭제
      if (removeCommand) {
        setAnswerValue(prev => {
          const lastCommandIndex = commands.slashPos;
          return lastCommandIndex === -1
            ? prev
            : prev.substring(0, lastCommandIndex);
        });
      }
      // command init
      setCommands(initialCommand);
    },
    [commands.slashPos],
  );
  // Command helper keymapping
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (KEYMAP[e.keyCode]) {
        case 'ESCAPE': {
          !commands.command && clearCommand();
          return;
        }
        case 'ESC': {
          clearCommand();
          return;
        }
        case 'SLASH': {
          if (editorRef) {
            const { top, left, height } = getCursorXY(
              editorRef,
              editorRef.selectionEnd,
            );
            setCommands({
              slashPos: (e.target as HTMLTextAreaElement).value.length, // mui 타입 오류
              show: true,
              top: Math.min(top, editorRef.clientHeight - height) - 5,
              left: left + 5,
            });
          }
          return;
        }
      }
    },
    [commands.command, editorRef],
  );
  // slash 시작부터 command 업데이트. answer이 업데이트할 때만 실행하도록하는 이유는 show가 true일 때 answer이 아직 업데이트 안되어있을 때
  // 나오는 에러 방지
  useEffect(() => {
    if (commands.show) {
      if (answer.length <= commands.slashPos) {
        setCommands(initialCommand);
        return;
      }
      setCommands({
        command: answer.substring(commands.slashPos + 1),
      });
    }
  }, [answer]);
  // Command 실행
  const execCommand = useCallback(
    (command: CommandType) => {
      switch (command) {
        case 'codeline': {
          setCodelineState({ show: true });
        }
      }
      clearCommand(true);
    },
    [clearCommand],
  );
  const { show, codeline } = codelineState;
  return (
    <>
      <Title>답변 작성</Title>
      {codeline && (
        <Codemirror
          setCodeEditor={setCodelineRef}
          readOnly
          value={codeline}
          mode={language}
        />
      )}
      <EditorWithToolbar>
        <Toolbar commands={COMMANDS} execCommand={execCommand} />
        <Editor
          value={answer}
          inputRef={setEditorRef}
          onChange={setAnswer}
          onKeyDown={handleKeyDown}
          rows={4}
          margin="none"
          variant="outlined"
          placeholder="내용을 입력해주세요."
        />
      </EditorWithToolbar>
      <Popper
        anchorEl={editorRef}
        open={commands.show}
        placement="top-start"
        modifiers={{
          flip: {
            enabled: false,
          },
          offset: {
            offset: `${commands.left}, -${commands.top}`,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'viewport',
          },
        }}
        disablePortal={false}
      >
        <CommandMenu
          commands={COMMANDS}
          command={commands.command}
          execCommand={execCommand}
          clearCommand={clearCommand}
        />
      </Popper>
      <CodeSelect
        open={show}
        code={code}
        language={language}
        onCodeSelect={onCodeSelect}
        showCodeSelect={showCodeline}
      />
    </>
  );
};

export default AnswerForm;
