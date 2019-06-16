import { useCallback, useState, useMemo } from 'react';
import { IUser } from '../models/user';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../reducers';
import { openModal } from '../actions/modal';
interface ILikeModel {
  likedUsers: IUser[];
  dislikedUsers: IUser[];
}
export type LikeApi<R> = (id: string) => Promise<ApiResponse<R>>;

const useLike = <R extends ILikeModel>(
  id: string,
  likeApi: LikeApi<R>,
  dislikeApi: LikeApi<R>,
  defaultLiked: IUser[] = [],
  defaultDisliked: IUser[] = [],
) => {
  const userId = useSelector((state: IRootState) => state.auth.me.user.id);
  const isLoggedIn = useSelector((state: IRootState) => state.auth.me.isLoggedIn);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(defaultLiked);
  const [disliked, setDisliked] = useState(defaultDisliked);
  const likeCount = useMemo(() => liked.length, [liked]);
  const dislikeCount = useMemo(() => disliked.length, [disliked]);
  const hasLiked = useMemo(() => liked.some(like => like.id === userId), [
    liked,
    userId,
  ]);
  const hasDisliked = useMemo(
    () => disliked.some(dislike => dislike.id === userId),
    [disliked, userId],
  );
  const handleUnsingedUser = useCallback(() => {
    dispatch(openModal('signin'));
  }, [dispatch]);
  const handleLike = useCallback(async () => {
    if (!isLoggedIn) return handleUnsingedUser(); // 로그인 안된 유저 처리
    try {
      const { result } = await likeApi(id);
      setLiked(result.likedUsers);
    } catch (err) { }
  }, [id, likeApi, isLoggedIn, handleUnsingedUser]);
  const handleDislike = useCallback(async () => {
    if (!isLoggedIn) return handleUnsingedUser(); // 로그인 안된 유저 처리
    try {
      const { result } = await dislikeApi(id);
      setDisliked(result.dislikedUsers);
    } catch (err) { }
  }, [id, dislikeApi, isLoggedIn, handleUnsingedUser]);

  return {
    liked,
    disliked,
    likeCount,
    dislikeCount,
    hasLiked,
    hasDisliked,
    handleLike,
    handleDislike,
  };
};

export default useLike;
