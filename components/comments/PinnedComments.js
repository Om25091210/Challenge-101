import { useState, useEffect } from 'react';
import baseURL from '../../utils/baseURL';
import { useMutation } from 'react-query';
import cookie from 'js-cookie';

const PinnedComments = ({ postId, comment, user }) => {
  const [pinnedcomment, setPinnedComment] = useState(false);

  const pincommenthandlesubmit = async (e) => {
    e.preventDefault();
    mutate({ pinnedcomment });
    setPinnedComment(true);
  };
  const isPinned =
    user &&
    comment.pinned_comments.filter((pin) => pin.commentId === comment._id)
      .length > 0;

  const addPinComment = async () => {
    const { data } = await fetch(
      `${baseURL}/api/comments/pin/${postId}/${comment._id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: cookie.get('token')
        }
      }
    );
    return data;
  };
  const { mutate } = useMutation(addPinComment, {
    onSuccess: (data) => {
      const old = queryClient.getQueryData(['comments', comment._id]);
      queryClient.setQueryData(['comments', comment._id], {
        ...old,
        pinned_comments: data.pinned_comments
      });
    }
  });

  return (
    <>
      <button className="pinned" onClick={pincommenthandlesubmit}>
        {isPinned ? (
          <span>Pinned By Creator</span>
        ) : (
          <i class="fa fa-thumb-tack" aria-hidden="true"></i>
        )}
      </button>
    </>
  );
};

export default PinnedComments;
