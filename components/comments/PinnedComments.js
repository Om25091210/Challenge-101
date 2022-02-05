import { useState, useEffect } from 'react';
import baseURL from '../../utils/baseURL';
import { useMutation } from 'react-query';
import cookie from 'js-cookie';

const PinnedComments = ({ post, comment, user }) => {
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

  const isAuthorized = post.user._id === user._id;

  const addPinComment = async () => {
    const { data } = await fetch(
      `${baseURL}/api/comments/pin/${post._id}/${comment._id}`,
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
      {isPinned ? (
        <button className="pinned" onClick={pincommenthandlesubmit}>
          <span>Pinned By Creator</span>
        </button>
      ) : (
        isAuthorized && (
          <button className="pinned" onClick={pincommenthandlesubmit}>
            <i class="fa fa-thumb-tack" aria-hidden="true"></i>
          </button>
        )
      )}
    </>
  );
};

export default PinnedComments;
