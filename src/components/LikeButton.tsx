import React from 'react';
import styled from 'styled-components';
import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti';

type LikeType = 'like' | 'dislike';
const COLOR = {
  default: '#d1d5da',
  like: {
    hover: '#5e9ce5',
    active: '#1e69b5',
  },
  dislike: {
    hover: '#ea949d',
    active: '#da3d4d',
  },
} as const;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  color: ${COLOR.default};
  text-align: center;
`;

const LikeOrDislike = styled(Button) <{ likeType: LikeType; active?: boolean }>`
  font-size: 1em;
  ${props => props.active && `color: ${COLOR[props.likeType].active};`}
  &:hover {
    color: ${props => COLOR[props.likeType].hover};
    transition: color 0.1s;
  }
`;

interface ILikeButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  likeType: LikeType;
  active?: boolean;
  count?: number;
}

const LikeButton: React.SFC<ILikeButtonProps> = ({
  likeType,
  active,
  count,
  ...buttonProps
}) => {
  return (
    <LikeOrDislike likeType={likeType} active={active} {...buttonProps}>
      {likeType === 'like' ? (
        <TiThumbsUp size={30} />
      ) : (
          <TiThumbsDown size={30} />
        )}
      {typeof count !== 'undefined' && <div>{count}</div>}
    </LikeOrDislike>
  );
};

export default LikeButton;
