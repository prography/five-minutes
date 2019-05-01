import React, { memo, useState, useEffect } from 'react';
import { Divider } from 'gestalt';
import { Codemirror, TagList } from '../../components';
import { IQuestion } from '../../models/question';
import { useDateFormat, useMarkdown } from '../../hooks';
import {
  Header,
  Info,
  Date,
  Footer,
} from '../../containers/QuestionListItem/style';
import { Container, Subject, Body, Content } from './style';
import { EditorFromTextArea } from 'codemirror';

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
        <Codemirror
          readOnly
          value={code}
          mode={language}
          setCodeEditor={setCodeRef}
        />
      </Body>
      <Footer>
        <TagList tags={tags} />
      </Footer>
    </Container>
  );
};

export default memo(QuestionView);
