import { object, string, Schema } from 'yup';
import { IPostQuestion } from '../models/question';

const MSG = {
  subject: '제목은 두 글자 이상이어야 합니다.',
  content: '질문을 반드시 적어주세요!',
  code: '코드를 반드시 적어주세요!'
}

export const subjectSchema = string().required(MSG.subject).min(2);
export const contentSchema = string().required(MSG.content);
export const codeSchema = string().required(MSG.code);

const questionFormSchema = object({
  subject: subjectSchema,
  content: string().when('subject', (subject: boolean, schema: Schema<string>) => subject ? contentSchema : schema),
  code: string().when(['subject', 'content'], (subject: boolean, content: boolean, schema: Schema<string>) => subject && content ? codeSchema : schema),
});
export const validateQuestionForm = (question: Partial<IPostQuestion>) => {
  return questionFormSchema.validate(question, { stripUnknown: true, });
}