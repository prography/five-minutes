import React, { memo, useState, useEffect, useCallback } from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Editor, EditorFromTextArea } from 'codemirror';
import { Codemirror } from '../../components';

interface ICodeSelectProps extends DialogProps {
  code: string;
  language: string;
  onCodeSelect: (code: string, line: number) => void;
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
        onCodeSelect(codeRef.getDoc().getLine(line), line);
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
  }, [onCodeSelect, codeRef]);
  const close = useCallback(() => {
    showCodeSelect(false);
  }, [showCodeSelect]);
  return (
    <Dialog fullWidth maxWidth="sm" onClose={close} {...dialogProps}>
      <DialogTitle>라인을 선택해주세요.</DialogTitle>
      <DialogContent>라인을 더블클릭 하거나 엔터를 눌러주세요.</DialogContent>
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
