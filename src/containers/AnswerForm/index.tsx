import React, { useState, useEffect, useCallback, useRef } from 'react';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { TiTimesOutline } from 'react-icons/ti';
import { EditorFromTextArea } from 'codemirror';
import { useDispatch } from 'react-redux';
import { useInput, useSetState, useApi, useImageUploader } from '../../hooks';
import { CodeSelect, CommandMenu, Editor } from '../';
import { Codemirror, ImageUploader, Message } from '../../components';
import { IQuestion } from '../../models/question';
import getCursorXY from '../../utils/caret';
import { KEYMAP } from '../../utils/keyboard';
import { CommandType } from '../../models/command';
import Toolbar from '../Editor/Toolbar';
import { EditorWithToolbar } from './styles';
import { postComment } from '../../api/question';
import { addComment } from '../../actions/question';
import { answerUploader } from '../../utils/cloudinary';
import { notifier } from '../../utils/renoti';

interface IAnswerFormProps extends IQuestion { }

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

const COMMAND_TYPES = ['codeline' as const, 'image' as const];

const AnswerForm: React.SFC<IAnswerFormProps> = ({ id, code, language }) => {
  // Error
  const [error, setError] = useState('');

  // Answer 폼
  const [answer, setAnswer, setAnswerValue] = useInput('');
  const [editorRef, setEditorRef] = useState<HTMLTextAreaElement>();

  // 이미지 커맨드
  const imageUploader = useRef<HTMLInputElement>(null);
  const handleImageUpload = useCallback(
    (err, url?: string) => {
      if (url && editorRef) {
        const pos = editorRef.selectionEnd
          ? editorRef.selectionEnd
          : editorRef.value.length + 1;
        setAnswerValue(
          prev => `${prev.slice(0, pos)} ![image](${url}) ${prev.slice(pos)}`,
        );
      }
    },
    [editorRef, setAnswerValue],
  );
  const [openImageUploader, handleImageChange, isImageLoading] = useImageUploader(
    imageUploader,
    answerUploader,
    handleImageUpload,
  );
  // 코드 라인 커맨드
  const [codelineState, setCodelineState] = useSetState<CodelineState>(
    initialCodelineState,
  );
  const showCodeline = useCallback(
    (show: boolean) => {
      setCodelineState({ show });
    },
    [setCodelineState],
  );
  const setCodelineRef = useCallback(
    (editor: EditorFromTextArea) => setCodelineState({ codelineRef: editor }),
    [setCodelineState],
  );
  const clearCodelineState = useCallback(() => {
    setCodelineState(initialCodelineState);
  }, [setCodelineState]);
  const onCodeSelect = useCallback(
    (code, line) => {
      setCodelineState({ code: code, codeline: line, show: false });
    },
    [setCodelineState],
  );
  useEffect(() => {
    const { code, codelineRef, codeline } = codelineState;
    if (codelineRef) {
      codelineRef.getDoc().setValue(code);
      codelineRef.setOption('firstLineNumber', codeline + 1);
    }
  }, [codelineState]);

  // Command 관리
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
    [commands.slashPos, setAnswerValue, setCommands],
  );
  // Command helper keymapping
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (KEYMAP[e.keyCode]) {
        case 'ESCAPE': {
          if (
            !commands.command ||
            (editorRef && editorRef.selectionStart === 0)
          ) {
            clearCommand();
          }
          return;
        }
        case 'ESC': {
          clearCommand();
          return;
        }
        case 'SLASH': {
          if (!!e.shiftKey) return;
          // slash가 마지막일 때만 커맨드 오픈. 마지막 아니면 닫아버림
          if (editorRef && editorRef.selectionEnd === editorRef.value.length) {
            const { top, left, height } = getCursorXY(
              editorRef,
              editorRef.selectionStart,
            );
            setCommands({
              command: '',
              slashPos: editorRef.selectionStart, // mui 타입 오류
              show: true,
              top: Math.min(top, editorRef.clientHeight - height) - 5,
              left: left + 5,
            });
          } else {
            setCommands(initialCommand);
          }
          return;
        }
      }
    },
    [commands.command, editorRef, clearCommand, setCommands],
  );
  // slash 시작부터 command 업데이트. answer이 업데이트할 때만 실행하도록하는 이유는 show가 true일 때 answer이 아직 업데이트 안되어있을 때
  // 나오는 에러 방지
  useEffect(() => {
    if (commands.show) {
      if (answer.length < commands.slashPos) {
        setCommands(initialCommand);
        return;
      }
      setCommands({
        command: answer.substring(commands.slashPos + 1),
      });
    }
  }, [answer, editorRef, commands.show, commands.slashPos, setCommands]);
  // Command 실행
  const execCommand = useCallback(
    (command: CommandType) => {
      switch (command) {
        case 'codeline': {
          setCodelineState({ show: true });
          break;
        }
        case 'image': {
          openImageUploader();
          break;
        }
      }
      clearCommand(true);
    },
    [openImageUploader, setCodelineState, clearCommand],
  );

  const clearAll = useCallback(() => {
    setAnswerValue('');
    setError('');
    clearCodelineState();
    clearCommand();
  }, [setAnswerValue, clearCodelineState, clearCommand]);
  // comment 등록
  const dispatch = useDispatch();
  const { api } = useApi(postComment);
  const post = async () => {
    if (!answer || !answer.trim()) {
      editorRef && editorRef.focus();
      return setError('답변 내용을 반드시 작성해주세요!');
    }
    try {
      const { result } = await api({
        questionId: id,
        comment: {
          content: answer,
          codeline: codelineState.codeline,
          codestring: codelineState.code,
        },
      });
      dispatch(addComment(result));
      clearAll();
      notifier.notify({ type: 'success', message: '답변이 등록되었습니다!' });
    } catch (err) {
      notifier.notify({
        type: 'error',
        message: '에러가 발생하였습니다. 다시 시도해주세요.',
      });
    }
  };
  const { show, code: codelineCode } = codelineState;
  return (
    <>
      <h3>답변 작성</h3>
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
              <TiTimesOutline />
            </IconButton>
          </div>
        </div>
      )}
      <ImageUploader ref={imageUploader} onChange={handleImageChange} />
      <EditorWithToolbar>
        {!!error && <Message type="error">{error}</Message>}
        <Toolbar commandTypes={COMMAND_TYPES} execCommand={execCommand} />
        <Editor
          value={answer}
          inputRef={setEditorRef}
          onChange={setAnswer}
          onKeyDown={handleKeyDown}
          isLoading={isImageLoading}
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
          commandTypes={COMMAND_TYPES}
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
