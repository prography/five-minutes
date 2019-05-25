import { put, call } from 'redux-saga/effects';

export interface Entity<R, S, F> {
  request: R;
  success: S;
  failure: F;
}

export const fetchEntity = <
  R extends Function,
  S extends Function,
  F extends Function,
  Param extends any[],
  Res
>(
  entitiy: Entity<R, S, F>,
  api: ApiCall<Param, Res>,
) => {
  return function*(...p: Param) {
    try {
      const data = yield call(api, ...p);
      yield put(entitiy.success(data));
    } catch ({ response = {} }) {
      yield put(entitiy.failure(response.data || ''));
    }
  };
};
