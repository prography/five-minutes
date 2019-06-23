import React from 'react';
import uniq from 'lodash/uniq';
import { IUpdateUser } from '../../models/user';
import { Tag, Divider } from '../../components';
import { TagSelect } from '..';

interface ITagEditProps {
  tags: string[];
  handleUpdateUser: (userDraft: IUpdateUser) => void;
}

const TagEdit: React.SFC<ITagEditProps> = ({ tags, handleUpdateUser }) => {
  const handleTagAdd = (newTags: string[]) => {
    handleUpdateUser({ tags: uniq([...tags, ...newTags]) });
  }
  const handleTagDelete = (tag: string) => () => {
    handleUpdateUser({ tags: tags.filter(prev => prev !== tag) });
  };
  return (
    <div>
      <TagSelect tags={[]} value={[]} setTags={handleTagAdd} />
      <Divider withMargin />
      {
        tags.map(tag => <Tag key={tag} name={tag} onDelete={handleTagDelete(tag)} />)
      }
    </div>
  )
}

export default TagEdit;