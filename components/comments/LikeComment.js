import { useState, useEffect } from 'react';
import baseURL from '../../utils/baseURL';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import cookie from 'js-cookie';

const queryClient = new QueryClient();

export default function LikeComment({ postId, comment }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Like_Comment postId={postId} comment={comment} />
    </QueryClientProvider>
  );
}

const Like_Comment = ({ postId, comment, user }) => {
  const [likecomment, setLikeComment] = useState(false);

  const likehandlesubmit = async (e) => {
    e.preventDefault();
    mutate({ likecomment });
    setLikeComment(true);
  };

  const isLiked =
    user && comment.likes.filter((like) => like.user === user._id).length > 0;
  const addLikeComment = async () => {
    const { data } = await fetch(
      `${baseURL}/api/comments/like/${postId}/${comment._id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: cookie.get('token')
        }
      }
    );
    return data;
  };

  const { mutate } = useMutation(addLikeComment, {
    onSuccess: (data) => {
      const old = queryClient.getQueryData(['comments', comment._id]);
      queryClient.setQueryData(['comments', comment._id], {
        ...old,
        likes: data.likes
      });
    }
  });

  return (
    <div className="like_btn">
      <button onClick={likehandlesubmit}>
        <img src="/assets/media/dash/fire.png" alt="" />{' '}
        <span>{comment.likes.length}</span>
      </button>
    </div>
  );
};
