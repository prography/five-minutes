import React, { useState, useMemo, memo, useEffect } from 'react';
import { EditorFromTextArea } from 'codemirror';
import Paper from '@material-ui/core/Paper';
import {
  Codemirror,
  ProfilePhoto,
  ProfileLink,
  LikeAndDislike,
} from '../../components';
import { IQuestion } from '../../models/question';
import { IComment } from '../../models/comment';
import { useMarkdown, useDateFormat } from '../../hooks';
import { AnswerItem, AnswerLeft, AnswerRight, UserInfo, Date } from './style';
import { likeComment, dislikeComment } from '../../api/comment';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(3, 0.5),
    },
  }),
);

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
}) => {
  const [codelineRef, setCodelineRef] = useState<EditorFromTextArea>();
  // 답변의 코드라인 설정
  const code = useMemo(() => {
    if (codeRef) {
      return codeRef.getDoc().getLine(codeline) || '';
    }
    return '';
  }, [codeRef, codeline]);
  useEffect(() => {
    if (codelineRef) {
      codelineRef.setValue(code);
    }
  }, [codelineRef, code]);

  // 마크다운 content
  const mdContent = useMarkdown(content);
  const date = useDateFormat(createdAt);

  // paper style
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={1}>
      <UserInfo>
        <AnswerLeft>
          <ProfilePhoto src={user.image} />
        </AnswerLeft>
        <AnswerRight>
          <div>
            <ProfileLink id={user.id}>{user.nickname}</ProfileLink>
          </div>
          <Date>{date}</Date>
        </AnswerRight>
      </UserInfo>
      <AnswerItem>
        <AnswerLeft>
          <LikeAndDislike
            id={id}
            likedUsers={likedUsers}
            dislikedUsers={dislikedUsers}
            likeApi={likeComment}
            dislikeApi={dislikeComment}
          />
        </AnswerLeft>
        <AnswerRight>
          {code && (
            <Codemirror
              readOnly
              value={code}
              mode={language}
              setCodeEditor={setCodelineRef}
            />
          )}
          <p dangerouslySetInnerHTML={{ __html: mdContent }} />
        </AnswerRight>
      </AnswerItem>
    </Paper>
  );
};
export default memo(Answer);
