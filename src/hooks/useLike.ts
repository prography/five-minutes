import { useCallback, useState, useMemo } from 'react';
import { useMe } from '.';
import { IUser } from '../models/user';
interface ILikeModel {
  likedUsers: IUser[];
  dislikedUsers: IUser[];
}
type LikeApi<R> = (id: string) => Promise<ApiResponse<R>>;

const useLike = <R extends ILikeModel>(
  id: string,
  likeApi: LikeApi<R>,
  dislikeApi: LikeApi<R>,
  defaultLiked: IUser[] = [],
  defaultDisliked: IUser[] = [],
) => {
  const [liked, setLiked] = useState(defaultLiked);
  const [disliked, setDisliked] = useState(defaultDisliked);
  const me = useMe(['id']);
  const likeCount = useMemo(() => liked.length, [liked]);
  const dislikeCount = useMemo(() => disliked.length, [disliked]);
  const hasLiked = useMemo(() => me && liked.some(like => like.id === me.id), [
    liked,
    me,
  ]);
  const hasDisliked = useMemo(
    () => me && disliked.some(dislike => dislike.id === me.id),
    [disliked, me],
  );
  const handleLike = useCallback(async () => {
    if (!me) return null; // 로그인 안된 유저 처리
    try {
      const { result } = await likeApi(id);
      setLiked(result.likedUsers);
    } catch (err) {}
  }, [liked, likeApi, me]);
  const handleDislike = useCallback(async () => {
    if (!me) return null; // 로그인 안된 유저 처리
    try {
      const { result } = await likeApi(id);
      setDisliked(result.dislikedUsers);
    } catch (err) {}
  }, [disliked, dislikeApi, me]);

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
