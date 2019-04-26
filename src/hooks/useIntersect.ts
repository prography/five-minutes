import {
  useRef,
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';

const baseOption = {
  root: null,
  threshold: 0.5,
  rootMargin: '0px',
};
export type OnIntersect = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver,
) => void;

export type UseIntersect = (
  OnIntersect: OnIntersect,
  option?: IntersectionObserverInit,
) => [
  HTMLElement | null,
  Dispatch<SetStateAction<HTMLElement | null>>,
  IntersectionObserver | undefined
];

const useIntersect: UseIntersect = (onIntersect, option = baseOption) => {
  const observer = useRef<IntersectionObserver>();
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const checkIntersect = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        onIntersect(entry, observer);
      }
    },
    [onIntersect],
  );
  useEffect(() => {
    if (ref) {
      observer.current = new IntersectionObserver(checkIntersect, {
        ...baseOption,
        ...option,
      });
      observer.current.observe(ref);
    }
    return () => observer.current && observer.current.disconnect();
  }, [ref, option.root, option.threshold, option.rootMargin, checkIntersect]);
  return [ref, setRef, observer.current];
};

export default useIntersect;
