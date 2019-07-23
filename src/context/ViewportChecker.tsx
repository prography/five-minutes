import { createContext } from 'react';
import { checkSize } from '../utils/device';

const viewPortChecker = createContext(checkSize(window.innerWidth));

export default viewPortChecker;