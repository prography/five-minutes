import React, { useState, useEffect, useCallback } from 'react';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import { EditorFromTextArea } from 'codemirror';
import { useDispatch } from 'react-redux';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useInput, useSetState, useApi } from '../../hooks';
import { CodeSelect, CommandMenu, Editor } from '../';
import { Codemirror, Divider } from '../../components';
import { IQuestion } from '../../models/question';
import getCursorXY from '../../utils/caret';
import { KEYMAP } from '../../utils/keyboard';
import { ICommand, CommandType } from '../../models/command';
import Toolbar from '../Editor/Toolbar';
import { EditorWithToolbar } from './styles';
import { postComment } from '../../api/question';
import { addComment } from '../../actions/question';

interface IAnswerFormProps extends IQuestion {}

const initialCommand = {
  command: '',
  slashPos: -1,
  show: false,
  top: 0,
  left: 0,
};
const initialCodelineState: CodelineState = {
  codelineRef: undefined,
  codeline: -1,
  code: '',
  show: false,
};
type CodelineState = {
  codelineRef: EditorFromTextArea | undefined;
  codeline: number;
  code: string;
  show: boolean;
};
// 일단 하나만.
const COMMANDS: ICommand[] = [
  { type: 'codeline', description: '코드 라인을 정합니다.' },
];

const AnswerForm: React.SFC<IAnswerFormProps> = ({ id, code, language }) => {
  // 코드 라인 커맨드
  const [codelineState, setCodelineState] = useSetState<CodelineState>(
    initialCodelineState,
  );
  const showCodeline = useCallback((show: boolean) => {
    setCodelineState({ show });
  }, []);
  const setCodelineRef = useCallback(
    (editor: EditorFromTextArea) => setCodelineState({ codelineRef: editor }),
    [],
  );
  const clearCodelineState = useCallback(() => {
    setCodelineState(initialCodelineState);
  }, []);
  const onCodeSelect = useCallback((code, line) => {
    setCodelineState({ code: code, codeline: line, show: false });
  }, []);
  useEffect(() => {
    const { code, codelineRef } = codelineState;
    if (codelineRef) {
      codelineRef.getDoc().setValue(code);
    }
  }, [codelineState.code]);

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
          if (!!e.shiftKey) return;
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

  // comment 등록
  const dispatch = useDispatch();
  const { api } = useApi(postComment);
  const post = async () => {
    try {
      const { result } = await api({
        questionId: id,
        comment: {
          content: answer,
          codeline: codelineState.codeline,
        },
      });
      dispatch(addComment(result));
    } catch (err) {}
  };
  const { show, code: codelineCode } = codelineState;
  return (
    <>
      <h3>내 답변</h3>
      <Divider withMargin />
      {codelineCode && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <Codemirror
              setCodeEditor={setCodelineRef}
              readOnly
              value={codelineCode}
              mode={language}
            />
          </div>
          <div>
            <IconButton aria-label="Delete" onClick={clearCodelineState}>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
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
      <Button variant="outlined" color="primary" onClick={post}>
        답변 등록
      </Button>
    </>
  );
};

export default AnswerForm;
