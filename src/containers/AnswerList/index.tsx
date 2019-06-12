import React, { memo, useMemo, useState, useCallback } from 'react';
import { EditorFromTextArea } from 'codemirror';
import { Divider } from '../../components';
import Answer from './Answer';
import CorrectCode from './CorrectCode';
import { IQuestion } from '../../models/question';
import { ListHeader, ListCount, ListActions } from './style';

interface IAnswerListProps extends Pick<IQuestion, 'comments' | 'language' | 'id'> {
  codeRef: EditorFromTextArea | undefined;
  isMyQuestion?: boolean;
}

const AnswerList: React.SFC<IAnswerListProps> = ({
  id,
  codeRef,
  comments,
  language,
  isMyQuestion = false,
}) => {
  const [resolveCommentId, setResolveCommentId] = useState('');
  const count = useMemo(() => comments.length, [comments]);

  const handleResolve = useCallback((commentId: string) => setResolveCommentId(commentId), []);
  const handleCloseCorrect = useCallback(() => setResolveCommentId(''), []);

  const isCorrectingCode = !!codeRef && !!resolveCommentId; // ts가 지원을 안해주네.. 밑에 codeRef에 !준거 참고
  if (count === 0) return null;
  return (
    <div>
      <ListHeader>
        <ListCount>{count} 답변</ListCount>
        <ListActions>Popular Newest</ListActions>
      </ListHeader>
      <Divider />
      {comments.map(comment => (
        <Answer
          key={comment.id}
          {...comment}
          language={language}
          codeRef={codeRef}
          isMyQuestion={isMyQuestion}
          handleResolve={handleResolve}
        />
      ))}
      {isCorrectingCode && (
        <CorrectCode codeRef={codeRef!} questionId={id} commentId={resolveCommentId} handleClose={handleCloseCorrect} />
      )}
    </div>
  );
};

export default memo(AnswerList);
