import React, { memo } from 'react';
import { Tag, Divider } from '../../../components';
import { IUser } from '../../../models/user';
import {
  Container,
  ContainerTitle,
  ContainerContents,
  TagWrapper,
} from './style';

interface ITagsProps extends Pick<IUser, 'tags'> {}

const Tags: React.SFC<ITagsProps> = ({ tags }) => {
  return (
    <>
      <Container>
        <ContainerTitle>
          <div style={{ flex: 1 }}>관심 태그</div>
        </ContainerTitle>
        <Divider />
        <ContainerContents>
          {tags.map(tag => (
            <TagWrapper key={tag.id}>
              <Tag {...tag} />
            </TagWrapper>
          ))}
        </ContainerContents>
      </Container>
    </>
  );
};

export default memo(Tags);
