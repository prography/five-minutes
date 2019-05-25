import { useEffect } from 'react';
import { useSetState } from '.';

interface IFetchState<R> {
  status: Status;
  data: R | null;
  error: string;
}
const useInitialFetch = <T extends any[], R>(
  api: ApiCall<T, R>,
  ...params: T
) => {
  const [state, setState] = useSetState<IFetchState<R>>({
    status: 'INIT',
    data: null,
    error: '',
  });

  useEffect(() => {
    setState({
      status: 'FETCHING',
    });
    api(...params)
      .then((res: R) => {
        setState({
          status: 'SUCCESS',
          data: res,
        });
      })
      .catch(err => {
        setState({
          status: 'FAILURE',
          error: err.response ? err.response.data : '',
        });
      });
  }, []);

  return [state];
};

export default useInitialFetch;
