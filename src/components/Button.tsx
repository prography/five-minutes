import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

type ColorType = 'primary' | 'secondary' | 'tertiary';
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

const DefaultButton = styled.button<{ color?: ColorType }>`
  position: relative;
  min-width: 120px;
  min-height: 60px;
  padding: 20px 5px;
  margin-left: 20px;

  outline: none;
  border: none;
  border-radius: 5px;

  cursor: pointer;
  font-size: 16px;
  color: ${props => props.theme.palette.primary.contrastText};
  background-color: ${props =>
    props.color
      ? props.theme.palette[props.color].main
      : props.theme.palette.primary.main};
  text-align: center;
`;

const InvertButton = styled(DefaultButton)`
  border: 1px solid
    ${props =>
      props.color
        ? props.theme.palette[props.color].main
        : props.theme.palette.primary.main};
  color: ${props =>
    props.color
      ? props.theme.palette[props.color].main
      : props.theme.palette.primary.main};
  background-color: white;
`;
interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ColorType;
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
          <CircularProgress />
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
