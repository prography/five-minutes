import React, { memo } from 'react';
import styled from 'styled-components';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

type MessageType = 'default' | 'error' | 'info' | 'success';
const colorByType = {
  default: blue,
  error: red,
  info: yellow,
  success: green,
};
const BaseMessage = styled.div`
  width: 100%;
  border-radius: 5px;
  margin: 1rem 0;

  padding: 15px 20px;
`;

const ColorMessage = styled(BaseMessage)<{ type: MessageType }>`
  border: 1px solid ${({ type }) => colorByType[type][200]};
  background-color: ${({ type }) => colorByType[type][50]};
`;

export interface IMessageProps {
  type: MessageType;
  children: React.ReactNode;
}
const Message: React.SFC<IMessageProps> = ({ type = 'default', children }) => {
  return <ColorMessage type={type}>{children}</ColorMessage>;
};

export default memo(Message);
