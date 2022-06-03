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
              <div key={comment._id}>
                <div className="comments_point">
                  <LikeComment postId={postId} comment={comment} />
                  <div className="user">
                    {/* <img src={comment.user.profilePicUrl} alt="" /> */}
                  </div>
                  <a href="#" className="create">
                    {comment.user != null ? comment.user.name : 'NOT DEFINED'}
                  </a>{' '}
                  <span className="days">
                    {formatDistanceToNowStrict(new Date(comment.date), {
                      addSuffix: true
                    })}
                  </span>
                  <PinnedComments user={user} comment={comment} post={post} />
                  <ReportsComments />
                </div>
                <h3>{comment.text}</h3>
                <div className="first_reply">
                  <DeleteComment post={post} comment={comment} user={user} />
                  <ReplyComment post={post} comment={comment} />
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
