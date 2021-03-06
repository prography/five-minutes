import React, { useState, useMemo } from 'react';
import { EditorFromTextArea } from 'codemirror';
import { Codemirror, Message } from '../../components';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useApi } from '../../hooks';
import { correctComment } from '../../api/question';
import { useDispatch, batch } from 'react-redux';
import { updateComment, updateQuestion } from '../../actions/question';
import { notifier } from '../../utils/renoti';
import { codeSchema } from '../../utils/validation';
import { getModeInfoByMime } from '../../utils/codemirror';

interface ICorrectCodeProps {
  codeRef: EditorFromTextArea;
  questionId: string;
  commentId: string;
  handleClose: () => void;
}

const CorrectCode: React.SFC<ICorrectCodeProps> = ({ codeRef: originCodeRef, questionId, commentId, handleClose }) => {
  const [originRef] = useState(originCodeRef);
  const [error, setError] = useState('');
  const [codeRef, setCodeRef] = useState<EditorFromTextArea | null>(null);
  const code = useMemo(() => originRef.getValue(), [originRef]);
  const mode = useMemo(() => {
    const modeInfo = getModeInfoByMime(originRef.getDoc().getMode().helperType);
    return modeInfo ? modeInfo.name : originRef.getDoc().getMode().name;
  }, [originRef]);
  const dispatch = useDispatch();
  const { api, status } = useApi(correctComment);
  const onCorrect = async () => {
    if (!codeRef) return null;
    const code = codeRef.getValue();
    try {
      await codeSchema.validate(code);
    }
    catch (err) {
      return setError(err.message);
    }
    try {
      const { result } = await api(questionId, commentId, code);
      batch(() => {
        dispatch(updateQuestion({ id: questionId, code }));
        dispatch(updateComment(result));
      })
      notifier.notify({ type: 'success', message: '코드 수정이 완료되었습니다!' });
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };
  const isLoading = status === 'FETCHING';
  const isError = !!error;
  return (
    <Dialog open onClose={isLoading ? undefined : handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        리뷰에 따라 코드를 수정합니다.
      </DialogTitle>
      <DialogContent>
        {isError && <Message type="error">{error}</Message>}
        <Codemirror autofocus value={code} mode={mode} setCodeEditor={setCodeRef} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default">
          취소
        </Button>
        <Button onClick={onCorrect} color="primary" disabled={isLoading}>
          완료
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CorrectCode;