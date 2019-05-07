import React, { memo, useState, useEffect, useCallback } from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Editor, EditorFromTextArea } from 'codemirror';
import { Codemirror } from '../../components';

interface ICodeSelectProps extends DialogProps {
  code: string;
  language: string;
  onCodeSelect: (code: string) => void;
  showCodeSelect: (show: boolean) => void;
}
const CodeSelect: React.SFC<ICodeSelectProps> = ({
  code,
  language,
  onCodeSelect,
  showCodeSelect,
  ...dialogProps
}) => {
  const [codeRef, setCodeRef] = useState<EditorFromTextArea>();
  useEffect(() => {
    if (codeRef) {
      const selectCodeline = (line: number) => {
        onCodeSelect(codeRef.getDoc().getLine(line));
      };
      codeRef.on('dblclick', editor =>
        selectCodeline(editor.getDoc().getCursor().line),
      );
      codeRef.on('keydown', (editor: Editor, e: Event) => {
        if ((e as KeyboardEvent).keyCode === 13) {
          selectCodeline(editor.getDoc().getCursor().line);
        }
      });
    }
  }, [codeRef]);
  const close = useCallback(() => {
    showCodeSelect(false);
  }, []);
  return (
    <Dialog onClose={close} {...dialogProps}>
      <DialogTitle>라인을 선택해주세요.</DialogTitle>
      <DialogContent>
        {code && (
          <Codemirror
            readOnly
            autofocus
            value={code}
            mode={language}
            setCodeEditor={setCodeRef}
            styleActiveLine
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default memo(CodeSelect);
