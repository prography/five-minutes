import { object, string, Schema } from 'yup';
import { IPostQuestion } from '../models/question';

const MSG = {
  subject: '제목은 두 글자 이상이어야 합니다.',
  content: '질문을 반드시 적어주세요!',
  code: '코드를 반드시 적어주세요!',
};

export const subjectSchema = string()
  .trim()
  .required(MSG.subject)
  .min(2, '제목은 두 글자 이상이어야 합니다.');
export const contentSchema = string().required(MSG.content);
export const codeSchema = string().required(MSG.code);

const questionFormSchema = object({
  subject: subjectSchema,
  content: string()
    .trim()
    .when('subject', (subject: boolean, schema: Schema<string>) =>
      subject ? contentSchema : schema,
    ),
  code: string()
    .trim()
    .when(
      ['subject', 'content'],
      (subject: boolean, content: boolean, schema: Schema<string>) =>
        subject && content ? codeSchema : schema,
    ),
});
export const validateQuestionForm = (question: Partial<IPostQuestion>) => {
  return questionFormSchema.validate(question, { stripUnknown: true });
};

export const isEmail = string()
  .email('올바른 Email 형식을 입력해주세요.')
  .required('필수 항목입니다.');
export const isPassword = string()
  .matches(
    /(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
    '비밀번호는 6자 이상의 영문, 숫자, 특수문자가 필요합니다.',
  )
  .required('필수 항목입니다.');
export const isPasswordConfirm = (password: string) => {
  return string()
    .matches(new RegExp(`^${password}$`), '비밀번호와 같아야 합니다.')
    .required('필수 항목입니다.');
};
export const isNickname = string()
  .matches(
    /^[a-zA-Z0-9가-힣]{2,}$/,
    '닉네임은 특수문자 제외 2자 이상이어야 합니다.',
  )
  .required('필수 항목입니다.');

export const isGiturl = string()
  .matches(
    /http(s)?:\/\/(www\.)?github\.com\/[A-z0-9_-]+\/?/,
    'github 프로필 url을 적어주세요.',
  )
  .required('필수 항목입니다.');
