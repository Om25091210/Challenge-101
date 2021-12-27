import { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../../../utils/baseURL';
import DeleteReply from './DeleteReply';
import LikeReply from './LikeReply';
import ReactTooltip from 'react-tooltip';

const ReplyList = ({ postId, commentId }) => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/comments/${postId}/${commentId}`)
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
                      <span className="pos">Head of Department</span>
                    </a>
                  </div>
                  <p>{reply.text}</p>
                </div>

                <a
                  data-tip="Report this comment"
                  data-event="click focus"
                  className="report_poup"
                >
                  <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                </a>
                <ReactTooltip globalEventOff="click" />
              </div>
              <div className="social_bar d-flex">
                <LikeReply
                  postId={postId}
                  commentId={commentId}
                  reply={reply}
                />
                <DeleteReply
                  postId={postId}
                  commentId={commentId}
                  replyId={reply._id}
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
