import { object, string, Schema } from 'yup';
import { IPostQuestion } from '../models/question';

const MSG = {
  subject: '제목은 두 글자 이상이어야 합니다.',
  content: '질문을 반드시 적어주세요!',
  code: '코드를 반드시 적어주세요!'
}

const questionFormSchema = object({
  subject: string().required(MSG.subject).min(2),
  content: string().when('subject', (subject: boolean, schema: Schema<string>) => subject ? schema.required(MSG.content) : schema),
  code: string().when(['subject', 'content'], (subject: boolean, content: boolean, schema: Schema<string>) => subject && content ? schema.required(MSG.code) : schema),
});
export const validateQuestionForm = (question: Partial<IPostQuestion>) => {
  return questionFormSchema.validate(question, { stripUnknown: true, });
}