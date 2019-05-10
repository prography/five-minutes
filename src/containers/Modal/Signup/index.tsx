import React from 'react';
import { Formik, FastField, FormikProps } from 'formik';
import Button from '@material-ui/core/Button';
import { string, object, Schema } from 'yup';
import CustomMuiField from '../CustomMuiField';
import { ModalType } from '../../../models/modal';
import { Form, FakeLink } from '../style';
import { Title } from '../../../styles/common';
import { ISignupUser } from '../../../models/user';

interface SignupProps {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const initialValues: ISignupUser & { passwordConfirmation: string } = {
  nickname: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  githubUrl: '',
};
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
  return (
    <>
      <Formik
        validateOnBlur={false}
        initialValues={initialValues}
        onSubmit={values => {
          // server-side validation
          console.log(values);
        }}
        render={props => (
          <Form onSubmit={props.handleSubmit}>
            <Title>회원가입</Title>
            <FastField
              validate={props.touched.email && validate(isEmail)}
              label="E-mail"
              name="email"
              type="email"
              component={CustomMuiField}
              onChange={setTouchedOnChange('email', props)}
            />
            <FastField
              validate={props.touched.password && validate(isPassword)}
              label="Password"
              name="password"
              type="password"
              component={CustomMuiField}
              onChange={setTouchedOnChange('password', props)}
            />
            <FastField
              validate={
                props.touched.passwordConfirmation &&
                validate(isPasswordConfirm(props.values.password))
              }
              label="Password Confirm"
              name="passwordConfirmation"
              type="password"
              component={CustomMuiField}
              onChange={setTouchedOnChange('passwordConfirmation', props)}
            />
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={() => props.handleSubmit()}
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

export default Signup;
