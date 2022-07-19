import { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import LikeComment from './LikeComment';
import DeleteComment from './DeleteComment';

import ReplyComment from './replies/ReplyComment';
import ReplyList from './replies/ReplyList';
import { formatDistanceToNowStrict } from 'date-fns';
import PinnedComments from './PinnedComments';
import ReportsComments from './report';

const CommentList = ({ post, user, commentsData }) => {
  const postId = post._id;

  return (
    <div>
      <div className="post_comments">
        <div className="pop_comment">
          <select
            name="comments"
            id="comm"
            className="custom-select text-capitalize"
          >
            <option value="popular_comments" rel="popC">
              Popular Comments
            </option>
            <option value="newest_comments">Newest Comments</option>
            <option value="pinned_essages">Pinned Messages</option>
          </select>
        </div>
        {commentsData?.comments?.length === 0 ? (
          <p>There are no comments for this post.</p>
        ) : (
          <div>
            {commentsData?.comments?.map((comment) => (
              <div key={comment._id} className="single_comment_sec">
                <div className="comments_point">
                  <LikeComment postId={postId} comment={comment} />
                  <div className="comment_round_box">
                    <div className="user">
                      <img src={comment.user?.profilePicUrl} alt="" />
                    </div>
                    <div className="create">
                      <a href={`/user/${comment?.user?._id}`} className="">
                        {comment.user != null
                          ? comment.user?.name
                          : 'NOT DEFINED'}
                      </a>{' '}
                      <h3>{comment.text}</h3>
                    </div>
                  </div>
                  <PinnedComments user={user} comment={comment} post={post} />
                  {post.user?._id === user._id &&
                  comment.user?._id === user._id ? null : (
                    <ReportsComments />
                  )}
                </div>
                <div className="time_del_rep">
                  <span className="days">
                    {formatDistanceToNowStrict(new Date(comment.date), {
                      addSuffix: true
                    })}
                  </span>
                  <div className="first_reply">
                    <DeleteComment post={post} comment={comment} user={user} />
                    <ReplyComment post={post} comment={comment} />
                  </div>
                </div>

                <ReplyList post={post} comment={comment} user={user} />
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
