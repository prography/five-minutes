import React, { memo } from 'react';
import styled from 'styled-components';

const DefaultButton = styled.button`
  min-width: 120px;
  height: 100%;
  min-height: 60px;
  padding: 20px 5px;
  margin-left: 20px;

  outline: none;
  border: none;
  border-radius: 5px;

  cursor: pointer;
  font-size: 16px;
  color: white;
  background-color: ${props => props.theme.colors[props.color || 'primary']};
  text-align: center;
`;

const InvertButton = styled(DefaultButton)`
  border: 1px solid ${props => props.theme.colors[props.color || 'primary']};
  color: ${props => props.theme.colors[props.color || 'primary']};
  background-color: white;
`;
interface IButtonProps {
  color?: string;
  invert?: boolean;
  children: React.ReactNode;
}
const Button: React.SFC<IButtonProps> = ({
  color = 'primary',
  invert = false,
  children,
  ...props
}) => {
  if (invert) {
    return (
      <InvertButton color={color} {...props}>
        {children}
      </InvertButton>
    );
  }
  return (
    <DefaultButton color={color} {...props}>
      {children}
    </DefaultButton>
  );
};
export default memo(Button);
