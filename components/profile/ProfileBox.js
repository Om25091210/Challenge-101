import PropTypes from 'prop-types';
import Head from 'next/head';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import Badges from './badges';

const ProfileBox = ({ user, Userdata, games }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [bio, setBio] = useState(Userdata.profile.bio);
  const [showform, setShowForm] = useState(false);
  const [showgames, setShowgames] = useState(true);

  const [follow, setFollow] = useState(false);
  const followhandlesubmit = async (e) => {
    e.preventDefault();
    mutate({ follow });
    setFollow(true);
  };

  const addFollow = async () => {
    const res = await fetch(`${baseURL}/api/profile/follow/${SrhUser._id}`, {
      method: 'POST',
      headers: {
        Authorization: cookie.get('token')
      }
    });
  };

  const { mutate } = useMutation(addFollow);

  const SrhUser = Userdata.profile.user;
  const profileId = Userdata.profile._id;
  const isLoggedInUser = user._id === SrhUser._id;

  const isFollow = Userdata.followers
    .filter((x) => x.user === user._id)
    .map((x) => x.user);

  const mutation = useMutation(async (formdata) => {
    await axios.put(`${baseURL}/api/auth`, formdata, {
      headers: {
        Authorization: cookie.get('token'),
        'Content-Type': 'multipart/form-data'
      }
    });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('profilePic', profilePic);
    try {
      await mutation.mutateAsync(formdata);
      toast.success('User settings have been updated');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  const onChange = (e) => {
    setBio(e.target.value);
  };

  const addingBio = async () => {
    const res = await fetch(`${baseURL}/api/profile/${profileId}`, {
      method: 'PUT',
      body: JSON.stringify({
        bio
      }),
      headers: {
        'Content-type': 'application/json',
        Authorization: cookie.get('token')
      }
    });
    return res.json();
  };

  const toggleShowform = () => {
    if (showform) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };

  const toggleShowgames = () => {
    if (showgames) {
      setShowgames(false);
    } else {
      setShowgames(true);
    }
  };

  const handleButtonForm = () => {
    addingBio();
    setBio('');
    setShowForm(false);
    setShowgames(false);
    window.setTimeout(function () {
      location.reload();
    }, 400);
  };

  useEffect(() => {
    $('.common_poup').fancybox({
      wrapCSS: 'common_poup_wrap',
      autoSize: true
    });
  }, []);

  return (
    <>
      <div className="profile_box">
        <div className="profile_cover_photo">
          <img src="/assets/media/profile/cover_bg.jpg" alt="cover image" />
        </div>

        <div className="profile_dp_box">
          <div className="profile_pic">
            <form onSubmit={handleSubmit}>
              <img
                className="rounded-full h-full w-full object-cover"
                src={
                  profilePic
                    ? URL.createObjectURL(profilePic)
                    : SrhUser.profilePicUrl
                }
                alt={SrhUser.name}
              />
              {isLoggedInUser ? (
                <div className="edit_photo">
                  <label htmlFor="user-photo" className="edit_label">
                    {' '}
                    Update photo
                  </label>
                  <input
                    id="user-photo"
                    name="user-photo"
                    type="file"
                    className="custom-file-input"
                    onChange={(e) => {
                      setProfilePic(e.target.files[0]);
                      handleSubmit(e);
                    }}
                  />
                </div>
              ) : null}
            </form>
          </div>

          <div className="profile_details">
            <div className="top_details">
              <div className="name_box">
                <span className="game_name"> {SrhUser.username} </span>
                <span className="name">{SrhUser.name}</span>
                <span className="follower">
                  {Userdata.followers.length} Followers
                </span>
              </div>
              <div className="flag">
                <img src="/assets/media/profile/flag.png" alt="flag" />
              </div>
              <div className="tick">
                <span className="active">
                  <i className="fa fa-check" aria-hidden="true"></i>
                </span>
              </div>
              {isLoggedInUser ? null : (
                <div className="button">
                  <button className="btn" onClick={followhandlesubmit}>
                    {isFollow.length === 0 ? 'Follow' : 'UnFollow'}
                  </button>{' '}
                  <a href="#" className="btn">
                    MESSAGE
                  </a>
                </div>
              )}
            </div>

            <div className="bottom_details">
              <div className="current_status">
                <div className="current_team">
                  <span className="ct"> Current Team</span>
                  <span className="were">
                    The Werewolves{' '}
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                  </span>
                </div>
                <div className="game_role">
                  <span className="ct"> In Game Role</span>
                  <span className="were">Captain - CS GO</span>
                </div>
              </div>

              <Badges Userdata={Userdata} />
            </div>
          </div>
        </div>

        <div className="bio_box">
          <div className="left_bio">
            <div className="top_bio">
              <h3>BIO</h3>
              <div className="socail">
                <a href="#">
                  <i className="fa fa-facebook-official" aria-hidden="true"></i>
                </a>
                <a href="#">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
                <a href="#">
                  <i className="fa fa-facebook-official" aria-hidden="true"></i>
                </a>
                <a href="#">
                  <i className="fa fa-facebook-official" aria-hidden="true"></i>
                </a>
              </div>
            </div>

            {!showform ? <p> {Userdata.profile.bio} </p> : null}

            {showform ? (
              <form onSubmit={(e) => e.preventDefault()}>
                <textarea
                  name="text"
                  value={bio}
                  onChange={onChange}
                ></textarea>
                <button onClick={handleButtonForm} className="btn">
                  Update
                </button>
              </form>
            ) : (
              ''
            )}

            {isLoggedInUser ? (
              <button className="bio_edit" onClick={toggleShowform}>
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </button>
            ) : null}

            <div className="games">
              <h2>GAMES</h2>

              {!showgames ? (
                <>
                  <ul className="games_btn">
                    {Userdata.games.map((item, index) => (
                      <>
                        <li
                          className={`${
                            `item${index}` == 'item0' ? 'active' : ''
                          }`}
                          key={index}
                        >
                          <a href="javascript:void(0);" rel={`item${index}`}>
                            <span key={index}>
                              <img src={item.imgUrl} alt={item.name} />{' '}
                              <p>{item.name}</p>
                            </span>
                          </a>
                        </li>
                      </>
                    ))}
                  </ul>
                </>
              ) : null}

              {showgames ? (
                <div className="profile_hover_games">
                  <div className="tit">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <a href="#more_games" className="common_poup">
                        <span>
                          <b className="icon">
                            <img
                              src="/assets/media/ranking/console.png"
                              alt=""
                            />
                          </b>{' '}
                          Browse Games
                        </span>
                        <i className="fa fa-angle-right" aria-hidden="true"></i>

                        <div className="hover_games">
                          {games.map((game, idx) => (
                            <div className="other_logo">
                              <img src={game.imgUrl} alt={game.name} />
                            </div>
                          ))}
                        </div>
                      </a>

                      <div id="more_games" style={{ display: 'none' }}>
                        <ul>
                          {games.map((game, idx) => (
                            <li>
                              <div className="game_pic">
                                <img src={game.imgUrl} alt={game.name} />
                              </div>
                              <p>{game.name}</p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={handleButtonForm}
                        className="btn"
                        style={{ display: 'none' }}
                      >
                        Update
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                ''
              )}

              {isLoggedInUser ? (
                <button
                  className="btn"
                  onClick={toggleShowgames}
                  style={{ display: 'none' }}
                >
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
              ) : null}
            </div>
          </div>

          <div className="right_bio">
            <div className="games_data white_bg">
              {Userdata.games.length === 0 ? (
                <div>No Games for {SrhUser.username}</div>
              ) : (
                Userdata.games.map((item, index) => (
                  <>
                    <div
                      className={`tab ${
                        `item${index}` == 'item0' ? '' : 'hide1'
                      }`}
                      id={`item${index}`}
                      key={index}
                    >
                      <div key={index} className="game_btn">
                        {item.name}
                      </div>
                      <ul>
                        <li>
                          <img src="/assets/media/profile/kill.png" alt="" />
                          <span className="name">Kills </span>
                          <span className="num">200</span>
                        </li>
                        <li>
                          <img src="/assets/media/profile/kdr.png" alt="" />
                          <span className="name">KDR </span>
                          <span className="num">1.04</span>
                        </li>
                        <li>
                          <img
                            src="/assets/media/profile/headshot.png"
                            alt=""
                          />
                          <span className="name"> HEADSHOTS </span>
                          <span className="num">75</span>
                        </li>
                        <li>
                          <img src="/assets/media/profile/ace.png" alt="" />

                          <span className="name"> Won </span>
                          <span className="num">100</span>
                        </li>
                      </ul>
                    </div>
                  </>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBox;
