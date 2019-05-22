import { useSelector } from 'react-redux';
import { IRootState } from '../reducers';
import { IUser } from '../models/user';

function pick<T extends object, U extends keyof T>(
  obj: T,
  paths: Array<U>,
): Pick<T, U> {
  return paths.reduce((o, k) => {
    o[k] = obj[k];
    return o;
  }, Object.create(null));
}
const useMe = <T extends keyof IUser>(keys?: T[]) => {
  return useSelector((state: IRootState) => {
    if (!state.auth.me.isLoggedIn) return null;
    if (!keys) return state.auth.me.user;
    return pick(state.auth.me.user, keys);
  });
};

export default useMe;
