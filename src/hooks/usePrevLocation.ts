import { useContext } from 'react';
import PrevLocationContext from '../context/PrevLocation';

const usePrevLocation = () => {
  return useContext(PrevLocationContext);
};

export default usePrevLocation;
