import { useState } from 'react';
import baseURL from '../../utils/baseURL';
import { useMutation } from 'react-query';
import cookie from 'js-cookie';

const Like_Comment = ({ postId, comment, user }) => {
  const isLiked =
    user && comment.likes.filter((like) => like.user === user._id).length > 0;
  const [likecomment, setLikeComment] = useState(isLiked);

  const likehandlesubmit = async (e) => {
    e.preventDefault();
    mutate({ likecomment });
    setLikeComment(true);
  };

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

export default Like_Comment;
