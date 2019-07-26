import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MainLayout, Title } from '../styles/common';
import { getHonor } from '../api/event';
import { useApi } from '../hooks';

const MEDAL = ['🥇', '🥈', '🥉'];

const Box = styled.div`
  margin: 1.4rem 0;
  padding: 1.4rem;
  border-radius: 5px;
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.1);
`;

const Honor: React.SFC = () => {
  const { api, data } = useApi(getHonor);
  const checkPrize = (index: number) => {
    return index < 3 ? (
      <span role="img" aria-label={`${index} medal`}>
        {MEDAL[index]}
      </span>
    ) : (
      ''
    );
  };
  useEffect(() => {
    api();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);
  const users = data ? data.items : [];
  return (
    <MainLayout>
      <Title>
        명예의 전당{' '}
        <span role="img" aria-label="trophy">
          🏆
        </span>
      </Title>
      {users.map((user, i) => (
        <Box key={user.id}>
          <h2>{checkPrize(i)}</h2>
          <h3>{user.name}</h3>
          <p>걸린시간 : {(user.duration / 1000).toFixed(2)} 초</p>
        </Box>
      ))}
    </MainLayout>
  );
};

export default Honor;
