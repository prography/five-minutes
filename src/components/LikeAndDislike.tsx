import React from 'react';
import { LikeButton } from '.';
import { useLike } from '../hooks';
import { IUser } from '../models/user';

type LikeApi = ApiCall<
  [string],
  ApiResponse<{ likedUsers: IUser[]; dislikedUsers: IUser[] }>
>;

interface ILikeAndDislikeProps {
  id: string;
  likedUsers: IUser[];
  dislikedUsers: IUser[];
  likeApi: LikeApi;
  dislikeApi: LikeApi;
}
const LikeAndDislike: React.SFC<ILikeAndDislikeProps> = ({
  id,
  likedUsers,
  dislikedUsers,
  likeApi,
  dislikeApi,
}) => {
  const {
    likeCount,
    handleLike,
    hasLiked,
    dislikeCount,
    handleDislike,
    hasDisliked,
  } = useLike(id, likeApi, dislikeApi, likedUsers, dislikedUsers);

  return (
    <>
      <div>
        <LikeButton
          likeType="like"
          active={!!hasLiked}
          count={likeCount}
          onClick={handleLike}
        />
      </div>
      <div>
        <LikeButton
          likeType="dislike"
          active={!!hasDisliked}
          count={dislikeCount}
          onClick={handleDislike}
        />
      </div>
    </>
  );
};

export default LikeAndDislike;
