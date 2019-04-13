import React, { useCallback, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { EditorFromTextArea } from 'codemirror';
import { PageLayout, Title } from '../styles/common';
import { CodeEditor, Question } from '../containers/Ask';
import { Header } from '../containers';
import { init } from '../actions/auth';

const Text = styled.textarea`
  width: 100%;
  min-height: 200px;

  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
export interface IAskProps {
  initAction: typeof init;
}
const Ask: React.SFC<IAskProps> = ({ initAction }) => {
  const codeEditor = useRef<EditorFromTextArea | null>(null);
  const setCodeEditor = useCallback((editor: EditorFromTextArea) => {
    codeEditor.current = editor;
  }, []);
  return (
    <>
      <Header />
      <PageLayout>
        <Title>코드 질문 올리기</Title>
        <Question
          title="1. 질문에 대해 적어주세요."
          subTitle="(요약하면 어떤 문제인가요? 해결하기 위해 시도했던 것들을 말해주세요. 결과물이 어떻게 나오면 좋겠나요?)"
        >
          <Text placeholder="내용을 입력해주세요." />
        </Question>
        <Question title="2. 코드를 올려주세요">
          <CodeEditor setCodeEditor={setCodeEditor} />
        </Question>
        <Question
          title="3. 태그를 입력해주세요."
          subTitle="( 스페이스바 또는 , 키를 입력하면 작성이 됩니다. )"
        >
          <p>태그 폼</p>
        </Question>
      </PageLayout>
    </>
  );
};

export default connect(
  null,
  {
    initAction: init,
  },
)(Ask);
