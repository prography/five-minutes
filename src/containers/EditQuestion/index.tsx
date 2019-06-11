import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import { IRootState } from '../../reducers';
import { QuestionForm } from '..';
import { useApi } from '../../hooks';
import { updateQuestion } from '../../api/question';
import { IPostQuestion } from '../../models/question';

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
        console.log(result);
      } catch (err) {}
    },
    [api, id],
  );
  return (
    <QuestionForm
      initialForm={editableQuestion}
      handleSubmit={handleSubmit}
      loading={status === 'FETCHING'}
    />
  );
};

export default EditQuestion;
