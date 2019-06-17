import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import { IRootState } from '../../reducers';
import { QuestionForm } from '..';
import { useApi } from '../../hooks';
import { updateQuestion } from '../../api/question';
import { IPostQuestion } from '../../models/question';
import { history } from '../../utils/history';
import { notifier } from '../../utils/renoti';

const EditQuestion = () => {
  const question = useSelector(
    (state: IRootState) =>
      pick(state.question.get.question!, [
        'id',
        'content',
        'subject',
        'tags',
        'language',
        'code',
      ]),
    isEqual,
  );
  // comments가 하나라도 달려있을 경우 수정 불가.
  const isCodeEditable = useSelector((state: IRootState) => {
    const { question } = state.question.get;
    if (!question) return true;
    return question.comments.length === 0;
  });
  const { id, content, subject, code, language, tags } = question;
  const editableQuestion = {
    content,
    subject,
    code,
    language,
    tags: tags.map(tag => tag.name),
  };
  const { api, status } = useApi(updateQuestion);
  const handleSubmit = useCallback(
    async (question: IPostQuestion) => {
      try {
        const { result } = await api(id, question);
        history.replace(`/question/${result.id}`);
        notifier.notify({
          type: 'success',
          message: '수정이 완료되었습니다.',
        });
      } catch (err) {
        notifier.notify({
          type: 'error',
          message: '수정에 실패하였습니다. 다시 시도해주세요.',
        });
      }
    },
    [api, id],
  );
  return (
    <QuestionForm
      initialForm={editableQuestion}
      handleSubmit={handleSubmit}
      loading={status === 'FETCHING'}
      isCodeEditable={isCodeEditable}
    />
  );
};

export default EditQuestion;
