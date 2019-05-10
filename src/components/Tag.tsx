import React, { memo } from 'react';
import styled from 'styled-components';
import { CustomLink } from '.';
import { ITag } from '../models/tag';

const Wrapper = styled.span`
  color: ${props => props.theme.palette.secondary.contrastText};
  background-color: ${props => props.theme.palette.secondary.main};
  font-size: 11px;

  margin-right: 0.3rem;
  padding: 0.5rem;

  border-radius: 15px;
  transition: background-color 0.2s ease;
 
  &:hover {
    background-color: #4597AF;
  }
`;

// TODO: 태그 검색으로 Link 추가.
const Tag: React.SFC<ITag> = ({ name }) => {
  return <Wrapper>{name}</Wrapper>;
};

export default memo(Tag);
