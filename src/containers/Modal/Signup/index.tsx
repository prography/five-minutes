import React, { memo } from 'react';
import { Formik, FastField, FormikProps } from 'formik';
import Button from '@material-ui/core/Button';
import { string, Schema } from 'yup';
import CustomMuiField from '../CustomMuiField';
import { ModalType } from '../../../models/modal';
import { Form, FakeLink, InputWrapper } from '../style';
import { Title } from '../../../styles/common';
import { ISignupUser } from '../../../models/user';
import { signup } from '../../../api/auth';
import { useApi } from '../../../hooks';

interface SignupProps {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}
const isEmail = string()
  .email('올바른 Email 형식을 입력해주세요.')
  .required('필수 항목입니다.');
const isPassword = string()
  .matches(
    /(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
    '비밀번호는 6자 이상의 영문, 숫자, 특수문자가 필요합니다.',
  )
  .required('필수 항목입니다.');
const isPasswordConfirm = (password: string) => {
  return string()
    .matches(new RegExp(`^${password}$`), '비밀번호와 같아야 합니다.')
    .required('필수 항목입니다.');
};
const isNickname = string()
  .matches(
    /^[a-zA-Z0-9가-힣]{2,10}$/,
    '닉네임은 특수문자 제외 2자 이상이어야 합니다.',
  )
  .required('필수 항목입니다.');

const isGiturl = string()
  .matches(
    /http(s)?:\/\/(www\.)?github\.com\/[A-z0-9_-]+\/?/,
    'github 프로필 url을 적어주세요.',
  )
  .required('필수 항목입니다.');

const initialValues: ISignupUser = {
  nickname: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  githubUrl: '',
};
const validations = {
  nickname: isNickname,
  email: isEmail,
  password: isPassword,
  passwordConfirmation: isPasswordConfirm,
  githubUrl: isGiturl,
};

// schema에 따라 field validation
function validate<T>(schema: Schema<T>) {
  return async (field: T) => {
    try {
      await schema.validate(field);
      return undefined;
    } catch (err) {
      throw err.errors[0];
    }
  };
}
// formik이 validation을 한 field가 바뀌어도 모든 field에 실행함. 이를 방지
function setTouchedOnChange(
  field: keyof typeof initialValues,
  formikProps: FormikProps<typeof initialValues>,
) {
  return (e: React.ChangeEvent<any>) => {
    formikProps.setFieldTouched(field, true);
    formikProps.handleChange(e);
  };
}
const Signup: React.SFC<SignupProps> = ({ openModal, closeModal }) => {
  const { api, status } = useApi(signup);
  const isFetching = status === 'FETCHING';
  return (
    <>
      <Formik
        validateOnBlur={false}
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          // server-side validation
          try {
            const { result } = await api(values);
            if (result) {
              openModal('signin');
            }
          } catch (err) {
            actions.validateForm();
          }
        }}
        render={props => (
          <Form onSubmit={props.handleSubmit}>
            <Title>회원가입</Title>
            <FastField
              validate={props.touched.email && validate(validations.email)}
              label="이메일"
              name="email"
              type="email"
              fullWidth
              component={CustomMuiField}
              onChange={setTouchedOnChange('email', props)}
            />
            <FastField
              validate={
                props.touched.nickname && validate(validations.nickname)
              }
              label="닉네임"
              name="nickname"
              type="text"
              fullWidth
              component={CustomMuiField}
              onChange={setTouchedOnChange('nickname', props)}
            />
            <InputWrapper isLeft>
              <FastField
                validate={
                  props.touched.password && validate(validations.password)
                }
                label="패스워드"
                name="password"
                type="password"
                fullWidth
                component={CustomMuiField}
                onChange={setTouchedOnChange('password', props)}
              />
            </InputWrapper>
            <InputWrapper>
              <FastField
                validate={
                  props.touched.passwordConfirmation &&
                  validate(
                    validations.passwordConfirmation(props.values.password),
                  )
                }
                label="패스워드 확인"
                name="passwordConfirmation"
                type="password"
                fullWidth
                component={CustomMuiField}
                onChange={setTouchedOnChange('passwordConfirmation', props)}
              />
            </InputWrapper>
            <FastField
              validate={
                props.touched.githubUrl && validate(validations.githubUrl)
              }
              label="깃허브 url"
              name="githubUrl"
              type="text"
              fullWidth
              component={CustomMuiField}
              onChange={setTouchedOnChange('githubUrl', props)}
            />
            <Button
              disabled={isFetching}
              variant="contained"
              fullWidth
              color="primary"
              onClick={() => props.handleSubmit()}
              style={{ margin: '1rem 0' }}
            >
              완료
            </Button>
          </Form>
        )}
      />
      <p style={{ textAlign: 'center' }}>
        이미 아이디가 있으신가요?{' '}
        <FakeLink onClick={() => openModal('signin')}>로그인</FakeLink>
      </p>
    </>
  );
};

export default memo(Signup);
