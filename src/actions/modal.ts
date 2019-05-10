import { OPEN_MODAL, CLOSE_MODAL } from '../constants/ActionTypes';
import { createActionCreator } from '../utils/redux';
import { ModalType } from '../models/modal';

export const openModal = createActionCreator(OPEN_MODAL)<ModalType | null>();
export const closeModal = () =>
  ({
    type: CLOSE_MODAL,
  } as const);

export type OpenModal = ReturnType<typeof openModal>;
export type CloseModal = ReturnType<typeof closeModal>;

export type ModalAction = OpenModal | CloseModal;
