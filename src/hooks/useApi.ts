import { useCallback } from 'react';
import { useSetState } from '.';

// TODO: 타이핑 개선.
// extends ApiCall<T, P> 로 제네릭 주면 좋을듯 (useInitialFetch 처럼)
type AsyncApi = (...args: any[]) => Promise<any>;
interface IUseApiState {
  status: Status;
  error: string;
}
interface IUseApi {
  <T extends AsyncApi>(api: T): IUseApiState & {
    api: T;
  };
  <T extends AsyncApi, S = UnpackPromise<ReturnType<T>>>(
    api: T,
    defaultData: S,
  ): { api: T; data: S };
}

const useApi: IUseApi = (api: any, defaultData?: any) => {
  const [state, setState] = useSetState<{
    status: Status;
    error: string;
    data: any;
  }>({
    status: 'INIT',
    error: '',
    data: defaultData,
  });

  const callApi = useCallback(
    async (...args: any[]) => {
      setState({ status: 'FETCHING' });
      try {
        const result = await api(...args);
        setState({ status: 'SUCCESS', data: result });
        return result;
      } catch (err) {
        setState({
          status: 'FAILURE',
          error: err.response ? err.response.data : '',
        });
      }
    },
    [api],
  );
  return {
    ...state,
    api: callApi,
  };
};

export default useApi;
