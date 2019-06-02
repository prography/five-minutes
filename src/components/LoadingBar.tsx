import React from 'react';
import styled from 'styled-components';
import LinearProgress, {
  LinearProgressProps,
} from '@material-ui/core/LinearProgress';

const Top = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
`;

const LoadingBar: React.SFC<LinearProgressProps> = props => (
  <Top>
    <LinearProgress color="primary" {...props} />
  </Top>
);

export default LoadingBar;
