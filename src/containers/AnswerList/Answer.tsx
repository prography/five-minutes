import React, { useState, useMemo, memo, useEffect, useCallback } from 'react';
import { EditorFromTextArea } from 'codemirror';
import {
  Codemirror,
  ProfilePhoto,
  ProfileLink,
  LikeAndDislike,
} from '../../components';
import { IQuestion } from '../../models/question';
import { IComment } from '../../models/comment';
import { useMarkdown, useDateFormat } from '../../hooks';
import {
  AnswerItem,
  AnswerLike,
  AnswerMain,
  AnswerUser,
  AnswerSide,
  AnswerInfo,
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
  createdAt,
  updatedAt,
}) => {
  const [codelineRef, setCodelineRef] = useState<EditorFromTextArea>();
  // 답변의 코드라인 설정
  const code = useMemo(() => {
    if (codeRef) {
      return codeRef.getDoc().getLine(codeline) || '';
    }
    return '';
  }, [codeRef]);
  useEffect(() => {
    if (codelineRef) {
      codelineRef.setValue(code);
    }
  }, [code]);

  // 마크다운 content
  const mdContent = useMarkdown(content);
  const date = useDateFormat(createdAt);
  return (
    <AnswerItem>
      <AnswerLike>
        <LikeAndDislike
          id={id}
          likedUsers={likedUsers}
          dislikedUsers={dislikedUsers}
          likeApi={likeComment}
          dislikeApi={dislikeComment}
        />
      </AnswerLike>
      <AnswerMain>
        {code && (
          <Codemirror
            readOnly
            value={code}
            mode={language}
            setCodeEditor={setCodelineRef}
          />
        )}
        <p dangerouslySetInnerHTML={{ __html: mdContent }} />
      </AnswerMain>
      <AnswerSide>
        <ProfileLink id={user.id}>
          <AnswerUser>
            <ProfilePhoto />
            {user.nickname}
          </AnswerUser>
        </ProfileLink>
        <AnswerInfo>{date}</AnswerInfo>
      </AnswerSide>
    </AnswerItem>
  );
};
export default memo(Answer);
