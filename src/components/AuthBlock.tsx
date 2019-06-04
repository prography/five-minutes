import React, { useCallback } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { ShadowBox } from '../styles/common';
import { openModal } from '../actions/modal';

const Container = styled(ShadowBox)`
  margin-top: 20px;
  text-align: center;
`;

const SignActions = styled.div`
  margin-top: 1rem;
`;

export interface IAuthBlockProps {
  children?: React.ReactNode;
}
const AuthBlock: React.SFC<IAuthBlockProps> = ({ children }) => {
  const dispatch = useDispatch();
  const openSigninModal = useCallback(() => {
    dispatch(openModal('signin'));
  }, [dispatch]);
  return (
    <Container>
      {children}
      <SignActions>
        <Button variant="outlined" color="primary" onClick={openSigninModal}>
          로그인
        </Button>
      </SignActions>
    </Container>
  );
};

export default AuthBlock;
