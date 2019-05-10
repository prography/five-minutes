import { ModalType } from '../models/modal';
import { ModalAction } from '../actions/modal';
import produce from 'immer';
import { OPEN_MODAL, CLOSE_MODAL } from '../constants/ActionTypes';

export interface IModalState {
  modalType: ModalType | null;
}
const initialState: IModalState = {
  modalType: null,
};

export default function modalReducer(
  state: IModalState = initialState,
  action: ModalAction,
) {
  return produce(state, draft => {
    switch (action.type) {
      case OPEN_MODAL: {
        draft.modalType = action.payload;
        return draft;
      }
      case CLOSE_MODAL: {
        draft.modalType = null;
        return draft;
      }
    }
  });
}
