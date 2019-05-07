import React, { useState, useEffect } from 'react';
import { EditorFromTextArea, Editor as EditorType } from 'codemirror';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Popper from '@material-ui/core/Popper';
import { useInput, useSetState } from '../../hooks';
import { CommandMenu, Editor } from '../';
import { Codemirror } from '../../components';
import { IQuestion } from '../../models/question';
import getCursorXY from '../../utils/caret';
import { Commands } from './styles';

interface IAnswerFormProps extends IQuestion {}
const AnswerForm: React.SFC<IAnswerFormProps> = ({ code, language }) => {
  const [codeRef, setCodeRef] = useState<EditorFromTextArea>();
  const [previewRef, setPreviewRef] = useState<EditorFromTextArea>();
  const [answer, setAnswer, setAnswerValue] = useInput('');
  const [open, setOpen] = useState(false);
  const [codeline, setCodeline] = useState('');
  useEffect(() => {
    if (codeRef) {
      const selectCodeline = (line: number) => {
        setCodeline(codeRef.getDoc().getLine(line));
        setOpen(false);
      };
      codeRef.on('dblclick', editor =>
        selectCodeline(editor.getDoc().getCursor().line),
      );
      codeRef.on('keydown', (editor: EditorType, e: Event) => {
        if ((e as KeyboardEvent).keyCode === 13) {
          selectCodeline(editor.getDoc().getCursor().line);
        }
      });
    }
  }, [codeRef]);
  useEffect(() => {
    if (previewRef) {
      previewRef.getDoc().setValue(codeline);
    }
  }, [previewRef, codeline]);
  useEffect(() => {
    if (open && codeRef) {
      codeRef.focus();
      codeRef.getDoc().setCursor({ line: 0, ch: 0 });
    }
  }, [codeRef, open]);
  const [editorRef, setEditorRef] = useState<HTMLTextAreaElement>();
  const [commands, setCommands] = useSetState({
    command: '',
    show: false,
    top: 0,
    left: 0,
  });
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 191) {
      // slash
      if (editorRef) {
        const caretPos = getCursorXY(editorRef, editorRef.selectionEnd);
        setCommands({
          show: true,
          top: Math.min(caretPos.top, editorRef.clientHeight - caretPos.height) - 5,
          left: caretPos.left + 5,
        });
      }
    }
    if (e.keyCode === 27) {
      // esc
      setCommands({ show: false, top: 0, left: 0, command: '' });
    }
    if (e.keyCode === 8) {
      if (!commands.command) {
        setCommands({
          show: false,
          top: 0,
          left: 0,
          command: '',
        });
      }
    }
  };
  useEffect(() => {
    if (commands.show && answer) {
      setCommands(prev => ({
        ...prev,
        command: answer.substring(answer.lastIndexOf("/") + 1),
      }));
    }
  }, [answer, commands.show]);
  const execCommand = (command: string) => {
    setCommands({
      show: false,
      command: '',
    });
    setOpen(true);
    setAnswerValue(prev => prev.slice(0, -(commands.command.length + 1)));
  }
  return (
    <>
      <button onClick={() => setOpen(true)}>open</button>
      {codeline && <Codemirror setCodeEditor={setPreviewRef} readOnly value={codeline} mode={language} />}
      <Editor
        inputRef={setEditorRef}
        value={answer}
        onChange={setAnswer}
        onKeyDown={handleKeyDown}
        rows={4}
        variant="outlined"
      />
      <Popper
        placement="top-start"
        anchorEl={editorRef}
        open={commands.show}
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
      >
        <CommandMenu command={commands.command} execCommand={execCommand} />
      </Popper>
      <Dialog open={open} scroll="paper" onClose={() => setOpen(false)}>
        <DialogTitle>라인을 선택해주세요.</DialogTitle>
        <DialogContent>
          {code && (
            <Codemirror
              readOnly
              value={code}
              mode={language}
              setCodeEditor={setCodeRef}
              styleActiveLine
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AnswerForm;
