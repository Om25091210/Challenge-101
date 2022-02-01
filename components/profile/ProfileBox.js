import PropTypes from 'prop-types';
import Head from 'next/head';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import Badges from './badges';
import ProfileGameStat from './ProfileGameStat';

const ProfileBox = ({ user, Userdata, games }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [bio, setBio] = useState(
    Userdata.profile ? Userdata.profile.bio : null
  );
  const [showform, setShowForm] = useState(false);
  const [showlocation, setShowlocation] = useState(false);
  const [showLocModal, setShowLocModal] = useState(true);

  const [coverPic, setCoverPic] = useState(null);

  const [address, setAddress] = useState(Userdata.profile.address);

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

  console.log(cookie.get('token'));

  const mutation = useMutation(async (formdata) => {
    await axios.put(`${baseURL}/api/auth/profilePic`, formdata, {
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

  const handleCoverSubmit = async (e) => {
    var img = e.target.files[0];

    if (
      !pixelarity.open(
        img,
        false,
        function (res) {
          $('#result').attr('src', res);
        },
        'jpg',
        1
      )
    ) {
      alert('Whoops! That is not an image!');
    }

    e.preventDefault();
    const formdata = new FormData();
    formdata.append('coverPic', coverPic);
    try {
      await axios.put(`${baseURL}/api/auth/coverPic`, formdata, {
        headers: {
          Authorization: cookie.get('token'),
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('User settings have been updated');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  function handleChange(e) {
    setAddress({ ...address, [e.target.name]: e.target.value });
  }

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

  const toggleShowlocation = () => {
    if (showlocation) {
      setShowlocation(false);
    } else {
      setShowlocation(true);
    }
  };

  console.log(address);
  const handleAddressForm = async (e) => {
    e.preventDefault();

    if (
      address.city === '' ||
      address.state === '' ||
      address.zipcode === '' ||
      address.country === '' ||
      address.line1 === '' ||
      address.line2 === ''
    ) {
      toast.warning('Please enter all fields or check your inputs');
    } else {
      try {
        await axios.put(
          `${baseURL}/api/profile/updateaddress/${Userdata.profile._id}`,
          address,
          {
            headers: {
              Authorization: cookie.get('token'),
              'Content-Type': 'application/json'
            }
          }
        );
        setShowlocation(false);
        toast.success('Address successfully have been updated');
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
      window.setTimeout(function () {
        location.reload();
      }, 800);
    }
  };

  const handleButtonForm = () => {
    addingBio();
    setBio('');
    setShowForm(false);
    window.setTimeout(function () {
      location.reload();
    }, 800);
  };

  // useEffect(() => {
  //   $('.common_poup').fancybox({
  //     wrapCSS: 'common_poup_wrap',

  //     minHeight: 450,
  //     fitToView: true,
  //     autoSize: true,
  //     autoScale: true
  //   });
  // }, []);

  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);

  useEffect(() => {}, []);

  const mscroll = () => {
    setTimeout(() => {
      $('.fancybox-inner').mCustomScrollbar({
        autoHideScrollbar: true
      });
    }, 200);
  };

  return (
    <>
      <div className="profile_box for_profile">
        <div className="profile_cover_photo">
          <form onSubmit={handleCoverSubmit}>
            {/* <img src="/assets/media/profile/cover_bg.jpg" alt="cover image" /> */}

            <img
              className="rounded-full h-full w-full object-cover"
              id="result"
              src={
                coverPic ? URL.createObjectURL(coverPic) : SrhUser.coverPicUrl
              }
              alt={SrhUser.name}
            />

            {isLoggedInUser ? (
              <span className="edit_cover_photo ">
                <div className="style_file_upload">
                  <input
                    type="file"
                    name="coverPhoto"
                    id="coverPhoto"
                    className="custom-file-input"
                    onChange={(e) => {
                      setCoverPic(e.target.files[0]);
                      handleCoverSubmit(e);
                    }}
                  />
                  <label htmlFor="coverPhoto">
                    <span>
                      {' '}
                      <i className="fa fa-camera" aria-hidden="true"></i> Upload
                      Cover Photo
                    </span>
                  </label>
                </div>
              </span>
            ) : null}
          </form>
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

          <div className="profile_details pro_detail_box">
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

                  {Userdata.teamMatchesList.map((result, index) => (
                    <a href={`/team/${result.team._id}`}>
                      <span className="were">
                        {result.team.name}{' '}
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                      </span>
                    </a>
                  ))}
                </div>
                <div className="game_role">
                  {/*
                  <span className="ct"> In Game Role</span>
                  <span className="were">Captain - CS GO</span>
                */}
                </div>
                <div className="game_role profile_address">
                  <div className="loc_box">
                    {' '}
                    <span className="ct"> Location</span>{' '}
                    <a href="#!" className="model_show_btn">
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </a>
                    <div className="common_model_box">
                      <a href="#!" className="model_close">
                        X
                      </a>

                      <div className="inner_model_box">
                        <h3>Locations</h3>

                        <form
                          onSubmit={handleAddressForm}
                          className="common_form"
                        >
                          <div className="form-group">
                            <div className="colm">
                              <label htmlFor="exampleFormControlInput1">
                                Address Line 1
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="address line1"
                                name="line1"
                                onChange={handleChange}
                                value={address?.line1}
                              />
                              {address?.line1.length >= 21 && (
                                <h6>
                                  Address Line 1 cannot be more then 20
                                  characters
                                </h6>
                              )}
                            </div>
                            <div className="colm">
                              <label htmlFor="exampleFormControlInput1">
                                Address Line 2
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="address line2"
                                name="line2"
                                onChange={handleChange}
                                value={address?.line2}
                              />
                              {address?.line2.length >= 21 && (
                                <h6>
                                  Address Line 2 cannot be more then 20
                                  characters
                                </h6>
                              )}
                            </div>
                            <div className="colm">
                              <label htmlFor="exampleFormControlInput1">
                                City
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="city "
                                name="city"
                                onChange={handleChange}
                                value={address?.city}
                              />
                              {address?.city.length >= 21 && (
                                <h6>
                                  City Name cannot be more then 20 characters
                                </h6>
                              )}
                            </div>
                            <div className="colm">
                              <label htmlFor="exampleFormControlInput1">
                                State
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="state"
                                name="state"
                                onChange={handleChange}
                                value={address?.state}
                              />
                              {address?.state.length >= 31 && (
                                <h6>
                                  State name cannot be more then 30 characters
                                </h6>
                              )}
                            </div>
                            <div className="colm">
                              <label htmlFor="exampleFormControlInput1">
                                Country
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="country"
                                name="country"
                                onChange={handleChange}
                                value={address?.country}
                              />
                              {address?.country.length >= 57 && (
                                <h6>
                                  Country name cannot be more then 56 characters
                                </h6>
                              )}
                            </div>
                            <div className="colm">
                              <label htmlFor="exampleFormControlInput1">
                                Zipcode
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="zip code"
                                name="zipcode"
                                onChange={handleChange}
                                value={address?.zipcode}
                              />
                              {address?.zipcode.length >= 7 && (
                                <h6>Zipcode must be 6 digits.</h6>
                              )}
                            </div>
                            <button className="btn">Update</button>
                          </div>
                        </form>
                      </div>
                      <div className="overlay"></div>
                    </div>
                  </div>

                  {!showlocation && Userdata.profile.address ? (
                    <ul className="user_add">
                      <li>{Userdata.profile.address.line1}</li>
                      <li>{Userdata.profile.address.line2}</li>
                      <li>
                        {Userdata.profile.address.city},{' '}
                        {Userdata.profile.address.state}
                      </li>
                      <li>
                        {Userdata.profile.address.country},{' '}
                        {Userdata.profile.address.zipcode}
                      </li>
                    </ul>
                  ) : null}

                  {isLoggedInUser ? (
                    // <button
                    //   className="bio_edit"
                    //   onClick={toggleShowlocation}
                    // >
                    //   <i className="fa fa-pencil" aria-hidden="true"></i>
                    // </button>

                    <>
                      {/* <button onClick={() => setShowLocModal(true)}>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </button> 
                      
                      */}
                    </>
                  ) : null}
                </div>
              </div>

              <Badges Userdata={Userdata} />
            </div>
          </div>
        </div>

        <div className="bio_box profile_bio">
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

            {!showform ? (
              <p> {Userdata.profile ? Userdata.profile.bio : ''} </p>
            ) : null}

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

              <>
                <ul className="games_btn">
                  {Userdata.profile.player?.games.map((item, index) => (
                    <>
                      <li
                        className={`${
                          `item${index}` == 'item0' ? 'active' : ''
                        }`}
                        key={index}
                      >
                        <a href="#!" rel={`item${index}`}>
                          <span key={index}>
                            <img
                              src={item.gameId ? item.gameId.imgUrl : ''}
                              alt={item.gameId ? item.gameId.name : ''}
                            />{' '}
                            <p>
                              {item.gameId ? item.gameId.name : 'Not Defined'}
                            </p>
                          </span>
                        </a>
                      </li>
                    </>
                  ))}
                </ul>
              </>

              <div className="profile_hover_games">
                <div className="tit">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <a
                      href="#more_games"
                      className="common_poup"
                      onClick={mscroll}
                    >
                      <span>
                        <b className="icon">
                          <img src="/assets/media/ranking/console.png" alt="" />
                        </b>{' '}
                        Add more Games (+)
                      </span>
                      <i className="fa fa-angle-right" aria-hidden="true"></i>

                      <div className="hover_games">
                        {games.map((game, idx) => (
                          <div className="other_logo" key={idx}>
                            <img src={game.imgUrl} alt={game.name} />
                          </div>
                        ))}
                      </div>
                    </a>

                    <div
                      id="more_games"
                      className="after_load_scroll"
                      style={{ display: 'none' }}
                    >
                      <div className="inner_model_box">
                        <h3>More Games</h3>
                        <ul>
                          {games.map((game, idx) => (
                            <li key={idx}>
                              <div className="game_pic">
                                <img src={game.imgUrl} alt={game.name} />
                              </div>
                              <p>{game.name}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
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
            </div>
          </div>

          <ProfileGameStat user={user} Userdata={Userdata} />
        </div>
      </div>
    </>
  );
};

export default ProfileBox;
