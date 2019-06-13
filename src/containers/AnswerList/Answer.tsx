import React, { useState, memo, useEffect } from 'react';
import { EditorFromTextArea } from 'codemirror';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import ResolveIcon from '@material-ui/icons/Done';
import {
  Codemirror,
  ProfilePhoto,
  ProfileLink,
  LikeAndDislike,
} from '../../components';
import { IQuestion } from '../../models/question';
import { IComment } from '../../models/comment';
import { useMarkdown, useDateFormat } from '../../hooks';
import { AnswerItem, AnswerLeft, AnswerRight, UserInfo, Date, ResolveCheck } from './style';
import { likeComment, dislikeComment } from '../../api/comment';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(3, 0.5),
      boxShadow: '0 0 0 0',
    },
  }),
);

interface IAnswerProps extends IComment, Pick<IQuestion, 'language'> {
  codeRef: EditorFromTextArea | undefined;
  isMyQuestion?: boolean;
  handleResolve?: (commentId: string) => void;
}
const Answer: React.SFC<IAnswerProps> = ({
  id,
  codeRef,
  codeline,
  content,
  language,
  status,
  user,
  likedUsers = [],
  dislikedUsers = [],
  createdAt,
  isMyQuestion = false,
  handleResolve = () => { }
}) => {
  // 답변의 코드라인 설정
  const [code, setCode] = useState('');
  useEffect(() => {
    if (!codeRef) return;
    const handler = (editor: any) => {
      const currentCode = editor.getDoc().getLine(codeline);
      if (currentCode !== code) {
        setCode(currentCode);
      }
    };
    codeRef.on('change', handler);
    return () => codeRef.off('change', handler);
  }, [codeRef, codeline, code, setCode]);
  useEffect(() => {
    if (!codeRef) return;
    const currentCode = codeRef.getDoc().getLine(codeline);
    if (currentCode !== code) {
      setCode(currentCode);
    }
  }, [codeRef, code, setCode, codeline]);
  // 마크다운 content
  const mdContent = useMarkdown(content);
  const date = useDateFormat(createdAt);

  const isResolved = status === 'RESOLVE';
  const onResolveClick = () => { !isResolved && handleResolve(id) };
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
        {isMyQuestion && (
          <Tooltip title={isResolved ? '채택된 답변입니다.' : '답변을 채택합니다.'} aria-label="Resolve">
            <ResolveCheck resolve={isResolved} onClick={onResolveClick}>
              <ResolveIcon />
            </ResolveCheck>
          </Tooltip>
        )}
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
            />
          )}
          <p dangerouslySetInnerHTML={{ __html: mdContent }} />
        </AnswerRight>
      </AnswerItem>
    </Paper>
  );
};
export default memo(Answer);
