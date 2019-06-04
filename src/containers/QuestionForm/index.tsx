import React, { useCallback, useRef, useState } from 'react';
import { EditorFromTextArea } from 'codemirror';
import TextField from '@material-ui/core/TextField';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { postQuestionActions } from '../../actions/question';
import { useApi, useInput } from '../../hooks';
import { Title } from '../../styles/common';
import { ButtonWrapper } from './styles';
import { Button } from '../../components';
import { CodeEditor, Editor, Question, TagSelect } from '..';
import * as questionApi from '../../api/question';

export interface QuestionForm {
  dispatch: Dispatch;
}
const QuestionForm: React.SFC<QuestionForm> = ({ dispatch }) => {
  const codeEditor = useRef<EditorFromTextArea | null>(null);
  const setCodeEditor = useCallback((editor: EditorFromTextArea) => {
    codeEditor.current = editor;
  }, []);

  // Form field
  const [subject, handleSubjectChange] = useInput('');
  const [content, handleContentChange] = useInput('');
  const [mode, setMode] = useState('javascript');
  const [tags, setTags] = useState<string[]>([]);

  // 질문 올리는 Api
  const { status } = useApi(questionApi.postQuestion);

  const isLoading = status === 'FETCHING';

  const handlePostQuestion = () => {
    if (isLoading) {
      return;
    }
    let code = '';
    if (codeEditor.current) {
      code = codeEditor.current.getValue();
    }
    const newQuestion = {
      subject,
      content,
      tags,
      code,
      language: mode,
    };
    dispatch(postQuestionActions.request(newQuestion));
  };
  return (
    <>
      <Title>코드 질문 올리기</Title>
      <Question title="제목">
        <TextField
          id="subject"
          fullWidth
          value={subject}
          onChange={handleSubjectChange}
        />
      </Question>
      <Question
        title="1. 질문에 대해 적어주세요."
        subTitle="(요약하면 어떤 문제인가요? 해결하기 위해 시도했던 것들을 말해주세요. 결과물이 어떻게 나오면 좋겠나요?)"
      >
        <Editor value={content} onChange={handleContentChange} />
      </Question>
      <Question title="2. 코드를 올려주세요">
        <CodeEditor
          mode={mode}
          setMode={setMode}
          setCodeEditor={setCodeEditor}
        />
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
