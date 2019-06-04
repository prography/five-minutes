import React, { useCallback, useEffect } from 'react';
import { History } from 'history';
import debounce from 'lodash/debounce';
import { useWindowEvent } from '../hooks';
export interface IScrollCheckerProps {
  history: History;
}

const MAX_SYNC_ATTEMPT = 5;

const ScrollChecker: React.SFC<IScrollCheckerProps> = ({
  children,
  history,
}) => {
  // scroll 시 현재 x, y offset를 history state에 저장.
  const onScroll = useCallback(() => {
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
        `${location.pathname}${
          history.location.search ? `${history.location.search}` : ''
        }`,
      );
    });
  }, [history.location.search]);
  useWindowEvent('scroll', onScroll);
  // scroll Sync를 requestAnimationFrame 단위로 시도.
  // y가 전체 height보다 작고 x와 y가 다르면 재귀적으로 계속 시도해봄.
  // debounce로 async를 조금 피한다.
  const syncScroll = useCallback(
    debounce((x: number, y: number, attempt: number) => {
      requestAnimationFrame(() => {
        if (attempt < 1) {
          return;
        }
        const { pageXOffset, pageYOffset } = window;
        if (x !== pageXOffset || y !== pageYOffset) {
          window.scrollTo(x, y);
          syncScroll(x, y, attempt - 1);
        }
      });
    }, 100),
    [],
  );
  // POP일 때는 scrollSync를 시도.
  // 기본 attempt는 일단 20으로 지정.
  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      const { state } = window.history;
      if (action === 'POP' && state && state.scroll) {
        const { x, y, attempt = MAX_SYNC_ATTEMPT } = state.scroll;
        syncScroll(x, y, attempt);
      }
    });
    return unlisten;
  }, [history, syncScroll]);
  return <>{children}</>;
};

export default ScrollChecker;
