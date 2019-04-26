import { useEffect } from 'react';

const useIObserver = (
  callback: IntersectionObserverCallback,
  option: IntersectionObserverInit,
  target: React.RefObject<Element>,
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, option);
    target.current && observer.observe(target.current);
    if (target.current) {
      return () => observer.unobserve(target.current!);
    }
  }, []);
};

export default useIObserver;
