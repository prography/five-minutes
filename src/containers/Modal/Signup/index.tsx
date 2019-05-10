import React from 'react';
import { Formik, Field } from 'formik';
import Button from '@material-ui/core/Button';
import CustomMuiField from '../CustomMuiField';
import { ModalType } from '../../../models/modal';
import { Form, FakeLink } from '../style';
import { Title } from '../../../styles/common';

interface SignupProps {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const Signup: React.SFC<SignupProps> = ({ openModal, closeModal }) => {
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          nickname: '',
          password: '',
          passwordConfirmation: '',
          githubUrl: '',
        }}
        onSubmit={values => {
          console.log(values);
        }}
        render={props => (
          <Form onSubmit={props.handleSubmit}>
            <Title>회원가입</Title>
            <Field
              label="E-mail"
              name="email"
              type="email"
              component={CustomMuiField}
            />
            <Field
              label="Password"
              name="password"
              type="password"
              component={CustomMuiField}
            />
            <Field
              label="Password Confirm"
              name="passwordConfirmation"
              type="password"
              component={CustomMuiField}
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
