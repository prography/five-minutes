import React, { useCallback, useRef, useState } from 'react';
import { EditorFromTextArea } from 'codemirror';
import { TextField } from 'gestalt';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { useApi, useInput } from '../../hooks';
import { Title } from '../../styles/common';
import { ButtonWrapper } from './styles';
import { Button } from '../../components';
import { CodeEditor, Editor, Question, TagSelect } from '..';
import * as questionApi from '../../api/question';
import { Dispatch } from 'redux';

export interface QuestionForm {
  dispatch: Dispatch;
}
const QuestionForm: React.SFC<QuestionForm> = ({ dispatch }) => {
  const codeEditor = useRef<EditorFromTextArea | null>(null);
  const setCodeEditor = useCallback((editor: EditorFromTextArea) => {
    codeEditor.current = editor;
  }, []);

  // Form field
  const [subject, _, handleSubjectChange] = useInput('');
  const [content, __, handleContentChange] = useInput('');
  const [tags, setTags] = useState<string[]>([]);

  // 질문 올리는 Api
  const { status, api } = useApi(questionApi.postQuestion);

  const handlePostQuestion = async () => {
    if (status !== 'INIT') {
      return;
    }
    let code = '';
    let language = '';
    if (codeEditor.current) {
      code = codeEditor.current.getValue();
      language = codeEditor.current.getOption('mode');
    }
    const newQuestion = {
      subject,
      content,
      tags,
      code,
      language,
      user: 1, // 임시
    };
    const { result } = await api(newQuestion);
    if (result) {
      dispatch(push(`/question/${result.id}`, { new: true }));
    }
  };
  const isLoading = status === 'FETCHING';
  return (
    <>
      <Title>코드 질문 올리기</Title>
      <Question title="제목">
        <TextField
          id="subject"
          value={subject}
          onChange={({ value }) => handleSubjectChange(value)}
        />
      </Question>
      <Question
        title="1. 질문에 대해 적어주세요."
        subTitle="(요약하면 어떤 문제인가요? 해결하기 위해 시도했던 것들을 말해주세요. 결과물이 어떻게 나오면 좋겠나요?)"
      >
        <Editor
          placeholder="내용을 입력해주세요."
          value={content}
          handleChange={handleContentChange}
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
      <ButtonWrapper>
        <Button
          onClick={handlePostQuestion}
          style={{ width: 200 }}
          loading={isLoading}
        >
          질문 올리기
        </Button>
      </ButtonWrapper>
    </>
  );
};

export default connect()(QuestionForm);
