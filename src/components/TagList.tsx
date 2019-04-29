import React, { memo } from 'react';
import { ITag } from '../models/tag';
import Tag from './Tag';

export interface ITagListProps {
  tags: ITag[];
}
const TagList: React.SFC<ITagListProps> = ({ tags }) => {
  return (
    <>
      {tags.map(tag => (
        <Tag key={tag.id} {...tag} />
      ))}
    </>
  );
};

export default memo(TagList);
