import { useRef, useEffect } from 'react';

const usePrevious = <T>(value: T): T => {
  const prev = useRef(value);
  useEffect(() => {
    prev.current = value;
  }, [value]);
  return prev.current;
};

export default usePrevious;
