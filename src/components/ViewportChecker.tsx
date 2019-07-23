import React, { useState, useEffect } from 'react';
import { checkSize, DeviceType } from '../utils/device';
import Viewport from '../context/ViewportChecker';


const ViewportChecker: React.SFC = ({ children }) => {
  const [device, setDevice] = useState<DeviceType>(checkSize(window.innerWidth));
  useEffect(() => {
    const handler = () => {
      const newDivice = checkSize(window.innerWidth);
      if (device !== newDivice) {
        setDevice(newDivice);
      }
    }
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [device]);

  return (
    <Viewport.Provider value={device}>
      {children}
    </Viewport.Provider>
  )
}

export default ViewportChecker;