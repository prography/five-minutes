import React from 'react';
import { connect } from 'react-redux';
import { init } from '../actions/auth';

export interface IAskProps {
  initAction: typeof init;
}
const Ask: React.SFC<IAskProps> = ({ initAction }) => {
  return (
    <div>
      Ask<button onClick={initAction}>saga test</button>
    </div>
  );
};

export default connect(
  null,
  {
    initAction: init,
  },
)(Ask);
