import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import { Spinner } from 'gestalt';

export const LoadingWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.5);

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  border-radius: 5px;
`;

const DefaultButton = styled.button`
  position: relative;
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
interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  invert?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}
const Button: React.SFC<IButtonProps> = ({
  color = 'primary',
  invert = false,
  loading = false,
  children,
  ...props
}) => {
  const LoadingComponent = useMemo(
    () =>
      loading ? (
        <LoadingWrapper>
          <Spinner show accessibilityLabel="loading..." />
        </LoadingWrapper>
      ) : null,
    [loading],
  );
  if (invert) {
    return (
      <InvertButton disabled={loading} color={color} {...props}>
        {children}
        {LoadingComponent}
      </InvertButton>
    );
  }
  return (
    <DefaultButton disabled={loading} color={color} {...props}>
      {children}
      {LoadingComponent}
    </DefaultButton>
  );
};
export default memo(Button);
