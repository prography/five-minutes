import React, { useState, useMemo, memo, useEffect } from 'react';
import { EditorFromTextArea } from 'codemirror';
import { Codemirror, ProfilePhoto } from '../../components';
import { IQuestion } from '../../models/question';
import { IComment } from '../../models/comment';
import { useMarkdown } from '../../hooks';
import {
  AnswerItem,
  AnswerLike,
  AnswerMain,
  AnswerUser,
  AnswerSide,
} from './style';
import LikeIcon from '../../assets/icon/like.png';

interface IAnswerProps extends IComment, Pick<IQuestion, 'language'> {
  codeRef: EditorFromTextArea | undefined;
}
const Answer: React.SFC<IAnswerProps> = ({
  codeRef,
  codeline,
  content,
  language,
  user,
  likedUsers,
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

  const likeCount = useMemo(() => likedUsers.length, likedUsers);

  // 마크다운 content
  const mdContent = useMarkdown(content);

  return (
    <AnswerItem>
      <AnswerLike>
        <img src={LikeIcon} width={36} />
        <div>{likeCount}</div>
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
