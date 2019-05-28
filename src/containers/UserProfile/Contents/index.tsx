import React, { useState, useEffect, useCallback, useMemo } from 'react';
import queryString from 'query-string';
import Content from './Content';
import * as St from './style';
import { history } from '../../../utils/history';

export const TABS = ['Questions', 'Answers'] as const;

const isValidTab = (
  currentTab: string,
): currentTab is 'Questions' | 'Answers' =>
  TABS.some(tab => tab === currentTab);
interface IContentsProps {
  currentTab: string;
}
const Contents: React.SFC<IContentsProps> = ({ currentTab }) => {
  const validTab = useMemo(
    () => (isValidTab(currentTab) ? currentTab : 'Questions'),
    [currentTab],
  );
  const selectTab = useCallback(tab => {
    history.push(
      `${history.location.pathname}?${queryString.stringify({ tab })}`,
    );
  }, []);
  return (
    <St.Container>
      <St.Side>
        <St.Tabs>
          {TABS.map(tab => (
            <St.Tab
              key={tab}
              selected={validTab === tab}
              onClick={() => selectTab(tab)}
            >
              {tab}
            </St.Tab>
          ))}
        </St.Tabs>
      </St.Side>
      <St.Content>
        <Content currentTab={validTab} />
      </St.Content>
    </St.Container>
  );
};
export default Contents;
