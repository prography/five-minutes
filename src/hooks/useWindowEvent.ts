import { useRef, useEffect } from 'react';

type EventListener<T extends keyof WindowEventMap> = (
  this: Window,
  event: WindowEventMap[T],
) => any;

type UseWindowEvent = <T extends keyof WindowEventMap>(
  type: T,
  listener: EventListener<T>,
  option?: boolean | AddEventListenerOptions,
) => any;

const useWindowEvent: UseWindowEvent = (type, listener, option) => {
  const listenerRef = useRef(listener);
  useEffect(() => {
    listenerRef.current = listener;
  }, [listener]);
  useEffect(() => {
    const memoListener = (event: any) => {
      listenerRef.current.call(window, event);
    };
    window.addEventListener(type, memoListener, option);
    return () => window.removeEventListener(type, memoListener);
  }, [type, option]);
};

export default useWindowEvent;
