import React, { memo, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import { EditorFromTextArea } from 'codemirror';
import {
  Codemirror,
  CustomLink,
  TagList,
  LikeAndDislike,
  ProfileBox,
} from '../../components';
import { IQuestion } from '../../models/question';
import { useDateFormat, useMarkdown } from '../../hooks';
import { Header, Info, Date } from '../../containers/QuestionListItem/style';
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
  tags,
  createdAt,
  code,
  language,
  codeRef,
  setCodeRef,
  likedUsers = [],
  dislikedUsers = [],
  isMyQuestion = false,
}) => {
  const fmContent = useMarkdown(content);
  const fmDate = useDateFormat(createdAt);
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
        <Info>
          <Date>{fmDate}</Date>
        </Info>
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
                <CustomLink to={`/question/${id}/edit`}>수정</CustomLink>
              )}
            </ActionWrapper>
            <ProfileBox {...user} />
          </Footer>
        </BodyMain>
      </Body>
    </Container>
  );
};

export default memo(QuestionView);
