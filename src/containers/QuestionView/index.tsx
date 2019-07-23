import React, { memo, useEffect, useCallback, useMemo, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import { EditorFromTextArea } from 'codemirror';
import {
  Codemirror,
  CustomLink,
  TagList,
  LikeAndDislike,
  ProfileBox,
  Confirm,
} from '../../components';
import { IQuestion } from '../../models/question';
import { useDateFormat, useMarkdown } from '../../hooks';
import { Header, Info } from '../../containers/QuestionListItem/style';
import {
  Container,
  Subject,
  Body,
  Content,
  Code,
  BodySide,
  BodyMain,
  Footer,
  ActionWrapper,
  TagWrapper,
} from './style';
import { notifier } from '../../utils/renoti';
import { history } from '../../utils/history';
import { likeQuestion, dislikeQuestion } from '../../api/question';
import { useDispatch } from 'react-redux';
import { deleteQuestion } from '../../actions/question';

export interface IQuestionViewProps extends IQuestion {
  codeRef: EditorFromTextArea | undefined;
  setCodeRef: React.Dispatch<
    React.SetStateAction<EditorFromTextArea | undefined>
  >;
  isMyQuestion?: boolean;
}

const QuestionView: React.SFC<IQuestionViewProps> = ({
  id,
  user,
  subject,
  content,
  comments,
  tags,
  hits,
  createdAt,
  code,
  language,
  codeRef,
  setCodeRef,
  likedUsers = [],
  dislikedUsers = [],
  isMyQuestion = false,
}) => {
  const [confirm, setConfirm] = useState(false);
  const fmContent = useMarkdown(content);
  const fmDate = useDateFormat(createdAt);
  /* 컨펌 모달 */
  const openConfirm = useCallback(() => setConfirm(true), []);
  const closeConfirm = useCallback(() => setConfirm(false), []);
  /* 글 삭제 */
  const isDeleteAble = useMemo(() => comments.length === 0, [comments]);
  const dispatch = useDispatch();
  const handleDeleteQuestion = useCallback(() => {
    closeConfirm();
    if (isDeleteAble) {
      return dispatch(deleteQuestion(id));
    }
    return notifier.notify({
      type: 'error',
      message: '이미 답변이 달린 게시물은 삭제할 수 없습니다.',
    });
  }, [closeConfirm, dispatch, id, isDeleteAble]);
  /* 글 등록으로 부터 들어온 경우 */
  useEffect(() => {
    const { pathname, state = {} } = history.location;
    if (state.new) {
      notifier.notify({
        message: '새 글이 등록되었습니다!',
      });
      history.replace(pathname, { ...state, new: false });
    }
  }, []);
  // Test
  useEffect(() => {
    if (codeRef) {
      codeRef.on('gutterClick', (_, line) => console.log(line));
    }
  }, [codeRef]);
  useEffect(() => {
    codeRef && codeRef.setValue(code);
  }, [codeRef, code]);
  return (
    <Container>
      <Header>
        <Subject>{subject}</Subject>
        <Info>조회수: {hits}</Info>
      </Header>
      <Divider light />
      <Body>
        <BodySide>
          <LikeAndDislike
            id={id}
            authorId={user.id}
            likedUsers={likedUsers}
            dislikedUsers={dislikedUsers}
            likeApi={likeQuestion}
            dislikeApi={dislikeQuestion}
          />
        </BodySide>
        <BodyMain>
          <Content dangerouslySetInnerHTML={{ __html: fmContent }} />
          <Code>
            <Codemirror
              readOnly
              value={code}
              mode={language}
              setCodeEditor={setCodeRef}
            />
          </Code>
          <TagWrapper>
            <TagList tags={tags} />
          </TagWrapper>
          <Footer>
            <ActionWrapper>
              {isMyQuestion && (
                <div>
                  <CustomLink to={`/question/${id}/edit`}>수정</CustomLink>
                  <CustomLink to="#" role="button" onClick={openConfirm}>
                    삭제
                  </CustomLink>
                </div>
              )}
            </ActionWrapper>
            <ProfileBox {...user} activeTime={fmDate} />

          </Footer>
        </BodyMain>
      </Body>
      <Confirm
        open={confirm}
        title="정말 삭제하시겠습니까?"
        message="이 요청은 되돌릴 수 없습니다. 영구적으로 이 질문을 삭제합니다."
        agreeLabel="네. 삭제하겠습니다."
        onClose={closeConfirm}
        onAgree={handleDeleteQuestion}
        onDisagree={closeConfirm}
      />
    </Container>
  );
};

export default memo(QuestionView);
