import React, { useState, useEffect, memo } from 'react';
import { history } from '../utils/history';
import PrevLocationContext from '../context/PrevLocation';

const { Provider } = PrevLocationContext;

let currentLocation = history.location.pathname;

const PrevLocation: React.SFC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [prevLocation, setPrevLocation] = useState('');
  useEffect(() => {
    const unlisten = history.listen(location => {
      setPrevLocation(currentLocation);
      currentLocation = location.pathname;
    });
    return unlisten;
  }, []);

  return <Provider value={prevLocation}>{children}</Provider>;
};

export default memo(PrevLocation);
