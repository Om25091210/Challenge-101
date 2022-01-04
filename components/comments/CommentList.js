import { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import LikeComment from './LikeComment';
import DeleteComment from './DeleteComment';

import ReplyComment from './replies/ReplyComment';
import ReplyList from './replies/ReplyList';
import { formatDistanceToNowStrict } from 'date-fns';

const CommentList = ({ post }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/comments/${post._id}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [post._id]);

  const postId = post._id;

  return (
    <div>
      <div className="post_comments">
        <div className="pop_comment">Popular Comments</div>
        {comments.length === 0 ? (
          <p>There are no comments for this post.</p>
        ) : (
          <div>
            {comments.map((comment) => (
              <div key={comment._id}>
                <div className="comments_point">
                  <LikeComment postId={postId} comment={comment} />
                  <div className="user">
                    <img src="/assets/media/dash/user.jpg" alt="" />
                  </div>
                  <a href="#" className="create">
                    {comment.user.name}
                  </a>{' '}
                  <span className="days">
                    {formatDistanceToNowStrict(new Date(comment.date), {
                      addSuffix: true
                    })}
                  </span>{' '}
                  <a href="#" className="pinned">
                    Pinned by Creator
                  </a>{' '}
                </div>
                <h3>{comment.text}</h3>
                <div className="first_reply">
                  <DeleteComment postId={postId} comment={comment} />
                  <ReplyComment postId={postId} commentId={comment._id} />
                </div>

                <ReplyList postId={postId} commentId={comment._id} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="thx_msg">
        <p>Thank you everyone for all of your support.</p>
      </div>
      <div className="loadmore">
        <a href="#">
          Load comments <i className="fa fa-angle-down" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
};

export default CommentList;
