import { useState, useCallback, SetStateAction, Dispatch } from 'react';

const useSetState = <T>(
  initialValue: T,
): [T, Dispatch<SetStateAction<Partial<T>>>] => {
  const [state, hookSetState] = useState(initialValue);
  const setState = useCallback(
    (v: SetStateAction<Partial<T>>) => {
      return hookSetState(prevState => ({
        ...prevState,
        ...(typeof v === 'function' ? v(prevState) : v),
      }));
    },
    [hookSetState],
  );
  return [state, setState];
};

export default useSetState;
