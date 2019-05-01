import React, { useCallback, useRef, useEffect } from 'react';
import { History } from 'history';

export interface IScrollCheckerProps {
  history: History;
}

const MAX_SYNC_ATTEMPT = 5;

const ScrollChecker: React.SFC<IScrollCheckerProps> = ({
  children,
  history,
}) => {
  // scroll 시 현재 x, y offset를 history state에 저장.
  useEffect(() => {
    const onScroll = () => {
      requestAnimationFrame(() => {
        const { pageXOffset, pageYOffset, location } = window;
        const { state: prevState = {} } = window.history;
        window.history.replaceState(
          {
            ...prevState,
            scroll: {
              x: pageXOffset,
              y: pageYOffset,
            },
          },
          '',
          location.pathname,
        );
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  // scroll Sync를 requestAnimationFrame 단위로 시도.
  // y가 전체 height보다 작고 x와 y가 다르면 재귀적으로 계속 시도해봄.
  const scrollSync = useCallback((x: number, y: number, attempt: number) => {
    requestAnimationFrame(() => {
      if (attempt < 1) {
        return;
      }
      const { pageXOffset, pageYOffset } = window;
      if (
        y < window.document.body.scrollHeight &&
        (x !== pageXOffset || y !== pageYOffset)
      ) {
        window.scrollTo(x, y);
        scrollSync(x, y, attempt - 1);
      }
    });
  }, []);
  // POP일 때만 scrollSync를 시도.
  // 기본 attempt는 일단 5로 지정.
  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      if (action === 'POP' && window.history.state.scroll) {
        const {
          x,
          y,
          attempt = MAX_SYNC_ATTEMPT,
        } = window.history.state.scroll;
        scrollSync(x, y, attempt);
      }
    });
    return unlisten;
  }, []);
  return <>{children}</>;
};

export default ScrollChecker;
