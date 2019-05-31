import React, { useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Close';
import { TagSelect } from '..';
import { Tag, Divider } from '../../components';
import { addTag, removeTag } from '../../api/user';
import {
  Container,
  ContainerTitle,
  ContainerContents,
  TagSelectWrapper,
  TagWrapper,
} from './style';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../reducers';
import { setWatchedTags } from '../../actions/auth';

const WatchedTags = () => {
  const { isLoggedIn, id, tags } = useSelector((state: IRootState) => ({
    isLoggedIn: state.auth.me.isLoggedIn,
    id: state.auth.me.user.id,
    tags: state.auth.me.user.tags,
  }));
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const onTagSelect = useCallback(
    async (tags: string[]) => {
      const {
        result: { user },
      } = await addTag(id, tags[0]);
      dispatch(setWatchedTags(user.tags));
    },
    [id, dispatch],
  );
  const onTagDelete = useCallback(
    (tag: string) => async () => {
      const {
        result: { user },
      } = await removeTag(id, tag);
      dispatch(setWatchedTags(user.tags));
    },
    [id, dispatch],
  );
  const toggleEditMode = useCallback(() => setIsEdit(prev => !prev), []);
  if (!isLoggedIn) return null;
  return (
    <>
      <Container>
        <ContainerTitle>
          <div style={{ flex: 1 }}>관심 태그</div>
          {
            <div>
              <Button onClick={toggleEditMode}>
                {isEdit ? '완료' : '수정'}
              </Button>
            </div>
          }
        </ContainerTitle>
        <Divider />
        <ContainerContents>
          {isEdit && (
            <TagSelectWrapper>
              <TagSelect tags={[]} value={[]} setTags={onTagSelect} />
            </TagSelectWrapper>
          )}
          {tags.map(tag => (
            <TagWrapper key={tag.id}>
              <Tag {...tag} />
              {isEdit && (
                <DeleteIcon
                  onClick={onTagDelete(tag.name)}
                  style={{ verticalAlign: 'center' }}
                  fontSize="inherit"
                />
              )}
            </TagWrapper>
          ))}
        </ContainerContents>
      </Container>
    </>
  );
};

export default WatchedTags;
