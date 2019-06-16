import { useRef } from 'react';

const useScrollEl = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const scrollToEl = () => {
    if (ref && ref.current) {
      window.scrollTo(0, ref.current.offsetTop);
    }
  }
  return [ref, scrollToEl] as const;
}

export default useScrollEl;