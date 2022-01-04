import { useState } from 'react';
import baseURL from '../../../utils/baseURL';
import { useMutation } from 'react-query';
import cookie from 'js-cookie';


const Like_Reply = ({ postId, commentId, reply }) => {
  const [likereplies, setLikeReplies] = useState(false);

  const likehandlesubmit = async (e) => {
    e.preventDefault();
    mutate({ likereplies });
    setLikeReplies(true);
  };
  const addLikeComment = async () => {
    await fetch(
      `${baseURL}/api/comments/like/${postId}/${commentId}/${reply._id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: cookie.get('token')
        }
      }
    );
  };

  const { mutate } = useMutation(addLikeComment);

  return (
    <div className="reply_like">
      <button onClick={likehandlesubmit}>
        <img src="/assets/media/dash/fire.png" alt="" />{' '}
        <span>{reply.likes.length}</span>
      </button>
    </div>
  );
};

export default Like_Reply;