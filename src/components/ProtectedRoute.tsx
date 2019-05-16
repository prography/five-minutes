import React, { useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../actions/modal';
import { Dispatch } from 'redux';
import { IRootState } from '../reducers';
import { ModalType } from '../models/modal';
import { history } from '../utils/history';
import { usePrevious, usePrevLocation } from '../hooks';

export interface IProtectedRouteProps extends RouteProps {
  modalType: ModalType | null;
  isLoggedIn: boolean;
  dispatch: Dispatch;
}
const ProtectedRoute: React.SFC<IProtectedRouteProps> = ({
  path,
  modalType,
  isLoggedIn,
  dispatch,
  ...props
}) => {
  const prevLocation = usePrevLocation();
  // 초기 진입시 로그인 안되어있을 경우 로그인 모달
  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(openModal('signin'));
    }
    return () => {
      dispatch(closeModal());
    };
  }, []);
  // 로그인을 하지 않고 모달을 닫았을 경우, prevLocation 있으면 뒤로. 없으면 홈으로
  const prevModal = usePrevious(modalType);
  useEffect(() => {
    if (!isLoggedIn && prevModal && !modalType) {
      prevLocation ? history.goBack() : history.push(prevLocation);
    }
  }, [modalType]);
  if (isLoggedIn) {
    return <Route {...props} path={path} />;
  }
  return null;
};

const mapStateToProps = (state: IRootState) => ({
  isLoggedIn: state.auth.profile.isLoggedIn,
  modalType: state.modal.modalType,
});

export default connect(mapStateToProps)(ProtectedRoute);
