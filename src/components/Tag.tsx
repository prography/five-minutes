import React from 'react';
import styled from 'styled-components';
import { CustomLink } from '.';
import { ITag } from '../models/tag';

const Wrapper = styled.span`
  color: ${props => props.theme.colors.sub};
  background-color: ${props => props.theme.colors.secondary};
  font-size: 12px;
`;
// TODO: 태그 검색으로 Link 추가.
const Tag: React.SFC<ITag> = ({ name }) => {
  return <Wrapper>{name}</Wrapper>;
};

export default Tag;
