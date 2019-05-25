import React, { useState, useMemo, memo, useEffect, useCallback } from 'react';
import { EditorFromTextArea } from 'codemirror';
import ThumbUp from '@material-ui/icons/ThumbUpOutlined';
import ThumbDown from '@material-ui/icons/ThumbDownOutlined';
import { Codemirror, ProfilePhoto } from '../../components';
import { IQuestion } from '../../models/question';
import { IComment } from '../../models/comment';
import { useMarkdown, useLike } from '../../hooks';
import {
  AnswerItem,
  AnswerLike,
  AnswerMain,
  AnswerUser,
  AnswerSide,
  ActionButton,
} from './style';
import { likeComment, dislikeComment } from '../../api/comment';

interface IAnswerProps extends IComment, Pick<IQuestion, 'language'> {
  codeRef: EditorFromTextArea | undefined;
}
const Answer: React.SFC<IAnswerProps> = ({
  id,
  codeRef,
  codeline,
  content,
  language,
  user,
  likedUsers = [],
  dislikedUsers = [],
}) => {
  const [codelineRef, setCodelineRef] = useState<EditorFromTextArea>();
  // 답변의 코드라인 설정
  const code = useMemo(() => {
    if (codeRef) {
      return codeRef.getDoc().getLine(codeline);
    }
    return '';
  }, [codeRef]);
  useEffect(() => {
    if (codelineRef) {
      codelineRef.setValue(code);
    }
  }, [code]);

  // Like
  const {
    likeCount,
    dislikeCount,
    hasLiked,
    hasDisliked,
    handleLike,
    handleDislike,
  } = useLike(id, likeComment, dislikeComment, likedUsers, dislikedUsers);
  // 마크다운 content
  const mdContent = useMarkdown(content);

  return (
    <AnswerItem>
      <AnswerLike>
        <div>
          <ActionButton
            onClick={handleLike}
            status={hasLiked ? 'like' : 'normal'}
          >
            <ThumbUp />
            <div>{likeCount}</div>
          </ActionButton>
        </div>
        <div>
          <ActionButton
            onClick={handleDislike}
            status={hasDisliked ? 'dislike' : 'normal'}
          >
            <ThumbDown />
            <div>{dislikeCount}</div>
          </ActionButton>
        </div>
      </AnswerLike>
      <AnswerMain>
        <Codemirror
          readOnly
          value={code}
          mode={language}
          setCodeEditor={setCodelineRef}
        />
        <p dangerouslySetInnerHTML={{ __html: mdContent }} />
      </AnswerMain>
      <AnswerSide>
        <AnswerUser>
          <ProfilePhoto />
          {user.nickname}
        </AnswerUser>
      </AnswerSide>
    </AnswerItem>
  );
};
export default memo(Answer);
