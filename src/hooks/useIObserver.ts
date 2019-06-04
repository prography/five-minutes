import { useEffect } from 'react';

const useIObserver = (
  callback: IntersectionObserverCallback,
  option: IntersectionObserverInit,
  target: React.RefObject<Element>,
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, option);
    const current = target.current;
    current && observer.observe(current);
    if (current) {
      return () => observer.unobserve(current);
    }
  }, [callback, option, target]);
};

export default useIObserver;
