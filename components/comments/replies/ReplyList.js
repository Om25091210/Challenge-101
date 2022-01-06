import { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../../../utils/baseURL';
import DeleteReply from './DeleteReply';
import LikeReply from './LikeReply';
import ReportsComments from '../report';

const ReplyList = ({ post, comment, user }) => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/comments/${post._id}/${comment._id}`)
      .then((res) => {
        setReplies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {replies.length === 0 ? null : (
        <div className="reply_list">
          {replies.map((reply) => (
            <article key={reply._id}>
              <div className="reply_comment_item d-flex">
                <a href="#">
                  <span className="avtar">
                    <img src={reply.user.profilePicUrl} />
                  </span>
                </a>
                <div className="comments_data">
                  <div className="member_profile">
                    <a href="#">
                      <h3>{reply.user.name}</h3>{' '}
                    </a>
                  </div>
                  <p>{reply.text}</p>
                </div>

                <ReportsComments />
              </div>
              <div className="social_bar d-flex">
                <LikeReply
                  postId={post._id}
                  commentId={comment._id}
                  reply={reply}
                />
                <DeleteReply
                  post={post}
                  comment={comment}
                  replyId={reply._id}
                  user={user}
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
};

export default ReplyList;
