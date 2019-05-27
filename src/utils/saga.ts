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
  entity: Entity<R, S, F>,
  api: ApiCall<Param, Res>,
) => {
  return function*(...p: Param) {
    yield put(entity.request(...p));
    try {
      const data = yield call(api, ...p);
      yield put(entity.success(data));
    } catch ({ response = {} }) {
      yield put(entity.failure(response.data || ''));
    }
  };
};
