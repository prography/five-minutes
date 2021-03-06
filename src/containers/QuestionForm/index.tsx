import React, { useCallback, useRef, useState, useEffect } from 'react';
import { EditorFromTextArea } from 'codemirror';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import isEqual from 'lodash/isEqual';
import { useInput, useImageUploader, useCommand } from '../../hooks';
import { Title } from '../../styles/common';
import { ButtonWrapper } from './styles';
import { ImageUploader, Message } from '../../components';
import { CodeEditor, Editor, Question, TagSelect } from '..';
import Toolbar from '../Editor/Toolbar';
import { CommandType } from '../../models/command';
import { questionUploader } from '../../utils/cloudinary';
import { IPostQuestion } from '../../models/question';
import { validateQuestionForm } from '../../utils/validation';
import { useScrollEl } from '../../hooks';

const INIT_MODE = 'Plain Text';
const COMMAND_TYPES = ['bold' as const, 'italic' as const, 'link' as const, 'image' as const];

const INITIAL_FORM: IPostQuestion = {
  code: '',
  content: '',
  subject: '',
  tags: [],
  language: INIT_MODE,
};

const INITIAL_ERROR = { subject: '', content: '', code: '' };
type FieldWithError = keyof (typeof INITIAL_ERROR);

export interface QuestionForm {
  handleSubmit: (form: IPostQuestion) => void;
  loading?: boolean;
  initialForm?: IPostQuestion;
  isCodeEditable?: boolean;
}

const QuestionForm: React.SFC<QuestionForm> = ({
  initialForm = INITIAL_FORM,
  loading = false,
  handleSubmit,
  isCodeEditable = true,
}) => {
  // error handling
  const [errors, setErrors] = useState(INITIAL_ERROR);
  const [subjectPoint, scrollToSubject] = useScrollEl();
  const [contentPoint, scrollToContent] = useScrollEl();
  const [codePoint, scrollToCode] = useScrollEl();
  const [scrollHandler] = useState({
    subject: scrollToSubject,
    content: scrollToContent,
    code: scrollToCode,
  });
  const initError = useCallback(() => setErrors(INITIAL_ERROR), []);
  useEffect(() => {
    Object.entries(errors).some(([key, value]) => {
      if (!!value) {
        scrollHandler[key as FieldWithError]();
      }
      return !!value;
    })
  }, [errors, scrollHandler]);

  // 등록모드 / 수정모드
  const [titleMessage] = useState(() =>
    isEqual(initialForm, INITIAL_FORM) ? '등록' : '수정',
  );
  const codeEditor = useRef<EditorFromTextArea | null>(null);
  const setCodeEditor = useCallback((editor: EditorFromTextArea) => {
    codeEditor.current = editor;
  }, []);

  useEffect(() => {
    if (codeEditor.current) {
      codeEditor.current.on('focus', initError);
    }
  }, [codeEditor, initError]);

  // Form field
  const [subject, handleSubjectChange] = useInput(initialForm.subject);
  const [content, handleContentChange, setContent] = useInput(
    initialForm.content,
  );
  const [mode, setMode] = useState(initialForm.language);
  const [tags, setTags] = useState<string[]>(initialForm.tags);

  // 질문 content
  const uploaderRef = useRef<HTMLInputElement>(null);
  const [contentRef, setContentRef] = useState<HTMLTextAreaElement>();
  const { handleFormat, handleLink, setSelection, getCurrentSelection } = useCommand(contentRef, setContent);
  const handleImageUpload = useCallback(
    async (err, url?: string) => {
      if (contentRef && url) {
        const pos = getCurrentSelection(contentRef);
        const format = 'image';
        setContent(
          prev => `${prev.slice(0, pos)}![${format}](${url}) ${prev.slice(pos)}`,
        );
        setSelection([pos + 2, pos + format.length + 2]);
      }
    },
    [contentRef, setContent, setSelection, getCurrentSelection],
  );
  const [openImageUploader, handleImageChange, isLoading] = useImageUploader(
    uploaderRef,
    questionUploader,
    handleImageUpload,
  );
  const handleCommand = useCallback(
    (command: CommandType) => {
      switch (command) {
        case 'bold':
        case 'italic': {
          handleFormat(command);
          break;
        }
        case 'link': {
          handleLink();
          break;
        }
        case 'image': {
          openImageUploader();
          break;
        }
      }
      if (command === 'image') {
        openImageUploader();
      }
    },
    [openImageUploader, handleFormat, handleLink],
  );
  // 질문등록
  const handleFormSubmit = async () => {
    if (loading) {
      return;
    }
    const code = codeEditor.current ? codeEditor.current.getValue() : '';
    const form = {
      subject,
      content,
      tags,
      code,
      language: mode,
    };
    try {
      await validateQuestionForm(form);
    }
    catch (err) {
      const { path, message }: { path: FieldWithError, message: string } = err;
      return setErrors(prev => ({ ...prev, [path]: message }));
    }
    handleSubmit(form);
  };
  return (
    <>
      <Title>코드 질문 {titleMessage}</Title>
      <div ref={subjectPoint} />
      <Question title="제목" error={errors.subject}>
        <TextField
          id="subject"
          fullWidth
          value={subject}
          onChange={handleSubjectChange}
          onFocus={initError}
        />
      </Question>
      <div ref={contentPoint} />
      <Question
        title="1. 질문에 대해 적어주세요."
        subTitle="(요약하면 어떤 문제인가요? 해결하기 위해 시도했던 것들을 말해주세요. 결과물이 어떻게 나오면 좋겠나요?)"
        error={errors.content}
      >
        <ImageUploader ref={uploaderRef} onChange={handleImageChange} />
        <Toolbar commandTypes={COMMAND_TYPES} execCommand={handleCommand} editor={contentRef} />
        <Editor
          value={content}
          onChange={handleContentChange}
          onFocus={initError}
          isLoading={isLoading}
          inputRef={setContentRef}
        />
      </Question>
      <div ref={codePoint} />
      <Question title="2. 코드를 올려주세요" error={errors.code}>
        {!isCodeEditable && (
          <Message type="info">
            이미 답변이 달려있는 경우 코드 수정이 불가능 합니다.
            답변을 채택하여 코드를 수정하세요!
          </Message>
        )}
        <CodeEditor
          value={initialForm.code}
          mode={mode}
          setMode={setMode}
          setCodeEditor={setCodeEditor}
          readOnly={!isCodeEditable}
        />
      </Question>
      <Question
        title="3. 태그를 입력해주세요."
        subTitle="( , 키를 입력하면 작성이 됩니다. )"
      >
        <TagSelect
          tags={tags}
          setTags={setTags}
        />
      </Question>
      <ButtonWrapper>
        <Button
          color="primary"
          size="large"
          variant="contained"
          fullWidth
          onClick={handleFormSubmit}
          disabled={loading}
        >
          질문 {titleMessage}
        </Button>
      </ButtonWrapper>
    </>
  );
};

export default QuestionForm;
