import React, { memo, useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import { EditorFromTextArea } from 'codemirror';
import { Codemirror, TagList, LikeAndDislike } from '../../components';
import { IQuestion } from '../../models/question';
import { useDateFormat, useMarkdown } from '../../hooks';
import {
  Header,
  Info,
  Date,
  Footer,
} from '../../containers/QuestionListItem/style';
import {
  Container,
  Subject,
  Body,
  Content,
  Code,
  BodySide,
  BodyMain,
} from './style';
import { notifier } from '../../utils/renoti';
import { history } from '../../utils/history';
import { likeQuestion, dislikeQuestion } from '../../api/question';

export interface IQuestionViewProps extends IQuestion {
  codeRef: EditorFromTextArea | undefined;
  setCodeRef: React.Dispatch<
    React.SetStateAction<EditorFromTextArea | undefined>
  >;
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
        </BodyMain>
      </Body>
      <Footer>
        <TagList tags={tags} />
      </Footer>
    </Container>
  );
};

export default memo(QuestionView);
