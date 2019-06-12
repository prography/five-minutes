import React, { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import CustomMuiField from '../CustomMuiField';
import { ModalType } from '../../../models/modal';
import { Form, FakeLink } from '../style';
import { Title } from '../../../styles/common';
import { signinActions } from '../../../actions/auth';
import { IRootState } from '../../../reducers';
import { Dispatch } from 'redux';
import { Message } from '../../../components';
import { usePrevious } from '../../../hooks';

interface SigninProps {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  signinStatus: Status;
  dispatch: Dispatch;
}

const Signin: React.SFC<SigninProps> = ({
  openModal,
  signinStatus,
  dispatch,
}) => {
  const [showError, setShowError] = useState(false);
  // fetching -> failure 일 때만 에러가 나오도록.
  const prevStatus = usePrevious(signinStatus);
  useEffect(() => {
    if (prevStatus !== signinStatus && signinStatus === 'FAILURE') {
      setShowError(true);
    }
  }, [prevStatus, signinStatus]);

  const isFetching = signinStatus === 'FETCHING';
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values => {
          dispatch(signinActions.request(values));
        }}
      >
        {props => (
          <Form
            onSubmit={e => {
              e.preventDefault();
              props.handleSubmit();
            }}
          >
            <Title>로그인</Title>
            {showError && (
              <Message type="error">
                아이디 혹은 비밀번호가 잘못되었습니다.
              </Message>
            )}
            <Field
              label="이메일"
              name="email"
              type="email"
              fullWidth
              component={CustomMuiField}
            />
            <Field
              label="패스워드"
              name="password"
              type="password"
              fullWidth
              component={CustomMuiField}
            />
            <Button
              type="submit"
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
      </Formik>
      <p style={{ textAlign: 'center' }}>
        아직 계정이 없으신가요?{' '}
        <FakeLink onClick={() => openModal('signup')}>회원가입</FakeLink>
      </p>
    </>
  );
};

const mapStateToProps = (state: IRootState) => ({
  signinStatus: state.auth.signin.status,
});
export default connect(mapStateToProps)(Signin);
