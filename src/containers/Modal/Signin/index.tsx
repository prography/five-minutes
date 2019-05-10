import React from 'react';
import { Formik, Field } from 'formik';
import Button from '@material-ui/core/Button';
import CustomMuiField from '../CustomMuiField';
import { ModalType } from '../../../models/modal';
import { Form, FakeLink } from '../style';
import { Title } from '../../../styles/common';

interface SigninProps {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const Signin: React.SFC<SigninProps> = ({ openModal, closeModal }) => {
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values => {
          console.log(values);
        }}
        render={props => (
          <Form onSubmit={props.handleSubmit}>
            <Title>로그인</Title>
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
        아직 계정이 없으신가요?{' '}
        <FakeLink onClick={() => openModal('signup')}>회원가입</FakeLink>
      </p>
    </>
  );
};

export default Signin;
