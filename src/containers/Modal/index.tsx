import React, { useCallback } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Signin from './Signin';
import Signup from './Signup';
import { openModal, closeModal } from '../../actions/modal';
import { ModalType } from '../../models/modal';
import { IRootState } from '../../reducers';
import { Inner } from './style';

const MODAL_TYPES = {
  signin: Signin,
  signup: Signup,
};

interface IModalProps {
  dispatch: Dispatch;
  modalType: ModalType | null;
}

const Modal: React.SFC<IModalProps> = ({ dispatch, modalType }) => {
  const CurrentModal = modalType ? MODAL_TYPES[modalType] : null;
  const onOpen = useCallback(
    (type: ModalType) => {
      dispatch(openModal(type));
    },
    [dispatch],
  );
  const onClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);
  if (!CurrentModal) {
    return null;
  }
  return (
    <Dialog open={true} onClose={onClose}>
      <Inner>
        <CurrentModal openModal={onOpen} closeModal={onClose} />
      </Inner>
    </Dialog>
  );
};

const mapStateToProps = (state: IRootState) => ({
  modalType: state.modal.modalType,
});
export default connect(mapStateToProps)(Modal);
