import React, { memo, useMemo, useState, useEffect } from 'react';
import { Divider } from '../../components';
import Answer from './Answer';
import { IQuestion } from '../../models/question';
import { EditorFromTextArea } from 'codemirror';
import { ListHeader, ListCount, ListActions } from './style';

interface IAnswerListProps extends Pick<IQuestion, 'comments' | 'language'> {
  codeRef: EditorFromTextArea | undefined;
}

const AnswerList: React.SFC<IAnswerListProps> = ({
  codeRef,
  comments,
  language,
}) => {
  const count = useMemo(() => comments.length, [comments]);
  return (
    <div>
      <ListHeader>
        <ListCount>{count} Answer</ListCount>
        <ListActions>Popular Newest</ListActions>
      </ListHeader>
      <Divider withMargin />
      {comments.map(comment => (
        <Answer
          key={comment.id}
          {...comment}
          language={language}
          codeRef={codeRef}
        />
      ))}
    </div>
  );
};

export default memo(AnswerList);
