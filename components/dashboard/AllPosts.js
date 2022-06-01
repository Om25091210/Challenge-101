import React, { useState, useEffect } from 'react';
import LikePost from '@components/postLikes/LikePost';
import CustomPost from './CustomPost';
import ReactTooltip from 'react-tooltip';
import Moment from 'moment';
import CommentForm from '@components/comments/CommentForm';
import baseURL from '@utils/baseURL';
import cookie from 'js-cookie';
import axios from 'axios';
import SharePost from './SharePost';

const AllPosts = ({ post, user, profiledata }) => {
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/comments/${post._id}`)
      .then((res) => {
        setCommentsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const followhandlesubmit = async (Uid) => {
    await fetch(`${baseURL}/api/profile/follow/${Uid}`, {
      method: 'POST',
      headers: {
        Authorization: cookie.get('token')
      }
    });
  };

  const isFollow =
    profiledata &&
    profiledata.following
      ?.filter((profile) => profile.user === post.user?._id)
      .map((profile, ind) => profile.user).length > 0;

  const isLoggedInUser = post.user !== '' && post.user?._id === user._id;

  const isLiked =
    post.likes.map((like) => {
      return (like.user = user._id);
    }).length > 0;

  const isShared =
    post.shares?.map((share) => {
      return (share.user = user._id);
    }).length > 0;

  return (
    <div key={post._id}>
      <div className="post">
        <div className="heads">
          <div className="user">
            <img src={post.profilepic} alt="" />
          </div>
          <div className="user_name_disc">
            <div className="title_follow">
              {post.game_tag[0]?.gameId === null ? (
                <a href={`user/${post.user?._id}`}>
                  <h4>{post.username}</h4>
                </a>
              ) : (
                <h4>
                  <a href={`user/${post.user?._id}`}>{post.username} </a>
                  is playing
                  <a href={`games/${post.game_tag[0]?.gameId}`}>
                    {' '}
                    {post.game_tag[0]?.name}
                  </a>
                </h4>
              )}
              {isLoggedInUser === false ? (
                <button
                  className="btn"
                  onClick={() => followhandlesubmit(post.user._id)}
                >
                  {isFollow === true ? 'UnFollow' : 'Follow'}
                </button>
              ) : null}
            </div>
            <div className="date">
              {post.createdAt === post.updatedAt ? (
                <p>
                  {' '}
                  {Moment(post.createdAt).format('MMMM, DD, YYYY hh:mm A')}{' '}
                </p>
              ) : (
                <p>
                  {' '}
                  {Moment(post.updatedAt).format('MMMM, DD, YYYY hh:mm A')}{' '}
                </p>
              )}
            </div>
          </div>

          {post.images.length === 0 ? (
            <div className="post_discp disc_without_img">
              <p>{post.description}</p>
            </div>
          ) : (
            <div className="post_discp ">
              <p>{post.description}</p>
            </div>
          )}
        </div>
        <div className="left_details">
          {' '}
          <a
            href="#!"
            data-tip={post.likes.map((like, iidx) => {
              return like.user.username;
            })}
            data-for="toolTip1"
            data-place="top"
          >
            <i className="fa fa-heart" aria-hidden="true"></i>{' '}
            <span>{post.likes.length}</span>
          </a>
          <ReactTooltip id="toolTip1" html={true} />
          <a href="#">
            {' '}
            <i className="fa fa-eye" aria-hidden="true"></i>{' '}
            <span>{post.views}</span>{' '}
          </a>{' '}
          <a href="#">
            {' '}
            <i className="fa fa-commenting" aria-hidden="true"></i>{' '}
            <span>{commentsData.comments?.length}</span>{' '}
          </a>{' '}
        </div>
        <div className="right_details">
          {post?.images.length === 0 ? null : (
            <div className="post_data">
              <img src={post.images} alt="" />
            </div>
          )}
          <div className="users_share_box">
            <div className="more_user">
              {' '}
              <a href="#">
                <img src="/assets/media/dash/1.jpg" alt="user" />
                <span className="online"></span>
              </a>{' '}
              <a href="#">
                <img src="/assets/media/dash/2.jpg" alt="user" />
                <span className="online"></span>
              </a>{' '}
              <a href="#">
                <img src="/assets/media/dash/3.jpg" alt="user" />
                <span className="offiline"></span>
              </a>{' '}
              <a href="#" className="more">
                +3
              </a>{' '}
              <span className="others">
                Ashwin, George and 5 others have shared your post.
              </span>{' '}
            </div>
            <div className="shere">
              {' '}
              <LikePost postId={post._id} isLiked={isLiked} />{' '}
              <a href="#">
                {' '}
                <SharePost postId={post._id} isShared={isShared} />
              </a>
              <div className="three_dots">
                <a href="#!">
                  {' '}
                  <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                </a>
                <CustomPost post={post} />
              </div>
            </div>
          </div>

          <CommentForm post={post} user={user} commentsData={commentsData} />
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
