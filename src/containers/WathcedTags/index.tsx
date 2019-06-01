import React, { useState, useCallback, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Close';
import BuildIcon from '@material-ui/icons/Build';
import { TagSelect } from '..';
import { AntSwitch, Tag, Divider } from '../../components';
import { addTag, removeTag } from '../../api/user';
import {
  Container,
  ContainerTitle,
  ContainerContents,
  TagSelectWrapper,
  TagWrapper,
  EditIcon,
} from './style';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../reducers';
import { setWatchedTags } from '../../actions/auth';
import { setQuestionSearchMode } from '../../actions/question';

const WatchedTags = () => {
  const { isLoggedIn, id, tags, isTagSearch } = useSelector(
    (state: IRootState) => ({
      isLoggedIn: state.auth.me.isLoggedIn,
      id: state.auth.me.user.id,
      tags: state.auth.me.user.tags,
      isTagSearch: state.question.search.isTagSearch,
    }),
  );
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
  const setTagSearchMode = (isTagSearch: boolean) => () => {
    dispatch(setQuestionSearchMode(!isTagSearch));
  };
  // 태그 검색 해제됐을 때 edit 모드면 해제
  useEffect(() => {
    if (!isTagSearch && isEdit) {
      toggleEditMode();
    }
  }, [isTagSearch]);

  if (!isLoggedIn) return null;
  return (
    <>
      <Container>
        <ContainerTitle>
          <div style={{ flex: 1 }}>
            관심 태그{' '}
            <AntSwitch
              checked={isTagSearch}
              onChange={setTagSearchMode(isTagSearch)}
            />
          </div>
          {
            <div>
              <IconButton
                onClick={toggleEditMode}
                size="small"
                disabled={!isTagSearch}
              >
                <EditIcon isEditing={isEdit}>
                  <BuildIcon fontSize="inherit" />
                </EditIcon>
              </IconButton>
            </div>
          }
        </ContainerTitle>
        <Divider />
        <ContainerContents isActive={isTagSearch}>
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
