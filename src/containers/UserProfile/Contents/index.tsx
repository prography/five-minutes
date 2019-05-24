import React, { useState, useEffect, useCallback } from 'react';
import queryString from 'query-string';
import Content from './Content';
import * as St from './style';
import { history } from '../../../utils/history';

const TABS = ['Questions', 'Answers'];

interface IContentsProps {
  currentTab: string;
}
const Contents: React.SFC<IContentsProps> = ({ currentTab }) => {
  const [selectedTab, setSelectedTab] = useState<string>(currentTab);
  useEffect(() => {
    if (TABS.includes(currentTab)) {
      setSelectedTab(currentTab);
    }
  }, [currentTab]);

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
              selected={selectedTab === tab}
              onClick={() => selectTab(tab)}
            >
              {tab}
            </St.Tab>
          ))}
        </St.Tabs>
      </St.Side>
      <St.Content>
        <Content currentTab={selectedTab} />
      </St.Content>
    </St.Container>
  );
};
export default Contents;
