import React from 'react';
import styled from 'styled-components';
import PureDivider, { DividerProps } from '@material-ui/core/Divider';

const DividerWrapper = styled.div<{ withMargin: boolean }>`
  ${props =>
    props.withMargin &&
    `
    margin: 1rem 0;
  `}
`;
interface IDividerProps extends DividerProps {
  withMargin: boolean;
}
const Divider: React.SFC<IDividerProps> = ({ withMargin, ...dividerProps }) => {
  return (
    <DividerWrapper withMargin={withMargin}>
      <PureDivider {...dividerProps} />
    </DividerWrapper>
  );
};

export default Divider;
