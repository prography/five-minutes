import React, { useCallback, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { EditorFromTextArea } from 'codemirror';
import { Label, TextField } from 'gestalt';
import { useInput } from '../hooks';
import { PageLayout, Title } from '../styles/common';
import { CodeEditor, Editor, Question, TagSelect } from '../containers/Ask';
import { Header } from '../containers';

export interface IAskProps {}
const Ask: React.SFC<IAskProps> = ({}) => {
  const codeEditor = useRef<EditorFromTextArea | null>(null);
  const setCodeEditor = useCallback((editor: EditorFromTextArea) => {
    codeEditor.current = editor;
  }, []);

  // Form field
  const [title, _, handleTitleChange] = useInput('');
  const [question, __, handleQuestionChange] = useInput('');
  const [tags, setTags] = useState<string[]>([]);
  return (
    <>
      <Header />
      <PageLayout>
        <Title>코드 질문 올리기</Title>
        <Question title="제목">
          <TextField
            id="title"
            value={title}
            onChange={({ value }) => handleTitleChange(value)}
          />
        </Question>
        <Question
          title="1. 질문에 대해 적어주세요."
          subTitle="(요약하면 어떤 문제인가요? 해결하기 위해 시도했던 것들을 말해주세요. 결과물이 어떻게 나오면 좋겠나요?)"
        >
          <Editor
            placeholder="내용을 입력해주세요."
            value={question}
            handleChange={handleQuestionChange}
          />
        </Question>
        <Question title="2. 코드를 올려주세요">
          <CodeEditor setCodeEditor={setCodeEditor} />
        </Question>
        <Question
          title="3. 태그를 입력해주세요."
          subTitle="( , 키를 입력하면 작성이 됩니다. )"
        >
          <TagSelect
            tags={tags}
            setTags={setTags}
            placeholder="태그를 입력해주세요."
          />
        </Question>
      </PageLayout>
    </>
  );
};

export default connect(
  null,
  null,
)(Ask);
