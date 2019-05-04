import { ChangeEvent, useCallback, useState } from 'react';

const useInput = (
  initialValue: string,
): [string, typeof onChange, typeof setValue] => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setValue(e.target.value);
    },
    [],
  );
  return [value, onChange, setValue];
};

export default useInput;
