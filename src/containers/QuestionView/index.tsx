import React, { memo, useState, useEffect } from 'react';
import { Divider } from 'gestalt';
import { EditorFromTextArea } from 'codemirror';
import { Codemirror, TagList } from '../../components';
import { IQuestion } from '../../models/question';
import { useDateFormat, useMarkdown } from '../../hooks';
import {
  Header,
  Info,
  Date,
  Footer,
} from '../../containers/QuestionListItem/style';
import { Container, Subject, Body, Content, Code } from './style';
import { notifier } from '../../utils/renoti';
import { history } from '../../utils/history';

export interface IQuestionViewProps extends IQuestion {}

const QuestionView: React.SFC<IQuestionViewProps> = ({
  subject,
  content,
  tags,
  createdAt,
  code,
  language,
}) => {
  const [codeRef, setCodeRef] = useState<EditorFromTextArea>();
  const fmContent = useMarkdown(content);
  const fmDate = useDateFormat(createdAt, 'YYYY-MM-DD');

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
      <Divider />
      <Body>
        <Content dangerouslySetInnerHTML={{ __html: fmContent }} />
        <Code>
          <Codemirror
            readOnly
            value={code}
            mode={language}
            setCodeEditor={setCodeRef}
          />
        </Code>
      </Body>
      <Footer>
        <TagList tags={tags} />
      </Footer>
    </Container>
  );
};

export default memo(QuestionView);
