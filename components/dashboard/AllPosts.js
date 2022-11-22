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
import TeamFollow from '../team/TeamFollow';
import { toast } from 'react-toastify';

const AllPosts = ({ post, user, profiledata, type, team }) => {
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

  const isFollow =
    profiledata &&
    profiledata.following
      ?.filter((profile) => profile.user === post.user?._id)
      .map((profile, ind) => profile.user).length > 0;

  const followhandlesubmit = async (Uid) => {
    await fetch(`${baseURL}/api/profile/follow/${Uid}`, {
      method: 'POST',
      headers: {
        Authorization: cookie.get('token')
      }
    });
    if (isFollow == true) {
      toast.success(`You Unfollowed ${post.user.username}`);
    } else {
      toast.success(`You are Following ${post.user.username}`);
    }
  };

  const isLoggedInUser = post.user !== '' && post.user?._id === user._id;

  const isLiked =
    post.likes.filter((like) => {
      return like.user === user._id;
    }).length > 0;

  const isShared =
    post.shares?.filter((share) => {
      return share.user?._id === user._id;
    }).length > 0;

  return (
    <div key={post._id}>
      <div className="post">
        <div className="heads">
          <div className="user">
            <img src={post?.profilepic} alt="" />
          </div>
          <div className="user_name_disc">
            <div className="title_follow">
              {post.game_tag[0]?.gameId === null ? (
                <>
                  {post.post_type === 'Team' ||
                  post.post_type === 'Tournament' ||
                  post.post_type === 'Brand' ? (
                    <a
                      href={`/${post.post_type === 'Team' ? 'team' : 'tour'}/${
                        post.post_type === 'Team'
                          ? post?.teamId
                          : post?.username
                      }`}
                    >
                      <h4>{post.username}</h4>
                    </a>
                  ) : (
                    <>
                      <a href={`/user/${post.user?.username}`}>
                        <h4>{post.username}</h4>
                        <p>@{post.user?.username}</p>
                      </a>
                    </>
                  )}
                </>
              ) : (
                <h4>
                  <a href={`/user/${post.user?.username}`}>
                    {post.username}
                    {/* <p>@{post.user?.username}</p> */}
                  </a>
                  is playing
                  <a href={`/games/${post.game_tag[0]?.gameId}`}>
                    {' '}
                    {post.game_tag[0]?.name}
                  </a>
                </h4>
              )}
              {post?.post_type === 'Team' ? (
                <button>
                  <TeamFollow team={team} user={user} />
                </button>
              ) : isLoggedInUser === false ? (
                <button
                  className="btn"
                  onClick={() => followhandlesubmit(post.user._id)}
                >
                  {isFollow === true ? 'Unfollow' : 'Follow'}
                </button>
              ) : null}
            </div>
            <div className="date">
              <p> {Moment(post.createdAt).format('MMMM, DD, YYYY hh:mm A')} </p>
            </div>
            <div className="three_dots">
              <a href="#!">
                {' '}
                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
              </a>
              <CustomPost post={post} />
            </div>
          </div>

          {post.images.toString().length === 0 ? null : (
            <div className="post_discp ">
              <p>{post.description}</p>
            </div>
          )}
        </div>

        <div className="right_details">
          <div className="left_details">
            {' '}
            <a
              href="#!"
              data-tip={post.likes.map((like, iidx) => {
                return like.user?.username;
              })}
              data-for="toolTip1"
              data-place="top"
            >
              {/* <i className="fa fa-heart" aria-hidden="true"></i>{' '} */}
              <span className="likes"></span>
              <span>{post.likes.length}</span>
            </a>
            <ReactTooltip id="toolTip1" html={true} />
            <a href="#">
              {' '}
              {/* <i className="fa fa-eye" aria-hidden="true"></i> */}
              <span className="eyes"></span>
              <span>{post.views}</span>{' '}
            </a>{' '}
            <a href="#">
              {' '}
              {/* <i className="fa fa-commenting" aria-hidden="true"></i>{' '} */}
              <span className="comments-icon"></span>
              <span>{comments?.length}</span>{' '}
            </a>{' '}
          </div>
          {post?.images.toString().length === 0 ? (
            <div className="post_discp disc_without_img">
              <p>{post.description}</p>
            </div>
          ) : (
            <div className="post_data">
              <img src={post.images} alt="" />
            </div>
          )}
          <div className="users_share_box">
            {post.shares.length === 0 ? (
              <p>No Shares for this post yet</p>
            ) : (
              <div className="more_user">
                {post.shares &&
                  post.shares.slice(0, 2).map((share) => (
                    <a href="#">
                      <img
                        src={share.user?.profilePicUrl}
                        alt={share.user?.username}
                      />
                      <span className="online"></span>
                    </a>
                  ))}
                {post.shares.length < 3 ? null : (
                  <a href="#!" className="model_show_btn more">
                    +{post.shares.length - 2}
                  </a>
                )}

                <div className="common_model_box" id="share_prof">
                  <a href="#!" className="model_close">
                    X
                  </a>

                  <div className="inner_model_box">
                    <h3>Shares</h3>
                    <ul>
                      {post.shares &&
                        post.shares.map((ppl) => (
                          <li>
                            {' '}
                            <div className="game_pic">
                              <img
                                src={ppl.user?.profilePicUrl}
                                alt={ppl.user?.name}
                              />
                            </div>
                            <a href={`/user/${ppl.user.username}`}>
                              <p>{ppl.user.name}</p>
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="overlay"></div>
                </div>

                <span className="others">
                  {post.shares &&
                    post.shares.slice(0, 2).map((share) => (
                      <span>
                        <a href={`/user/${share.user.username}`}>
                          {share.user.username}
                        </a>
                        ,
                      </span>
                    ))}{' '}
                  {post.shares.length > 2 ? (
                    <span>
                      and <b>{post.shares.length - 2}</b> others
                    </span>
                  ) : null}{' '}
                  have shared your post.
                </span>
              </div>
            )}
            <div className="shere">
              {' '}
              <LikePost postId={post._id} isLiked={isLiked} />{' '}
              <a href="#!">
                {' '}
                <SharePost postId={post._id} isShared={isShared} />
              </a>
            </div>
          </div>

          <CommentForm post={post} user={user} />
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
