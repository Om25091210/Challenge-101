import PropTypes from 'prop-types';
import Head from 'next/head';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import Badges from './badges';
import { locationformvalidate } from '@utils/valid';
import ProfileGameStat from './ProfileGameStat';
import { useRouter } from 'next/router';

const ProfileBox = ({ user, Userdata, games }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [bio, setBio] = useState(
    Userdata.profile ? Userdata.profile.bio : null
  );
  const [showform, setShowForm] = useState(false);
  const [showlocation, setShowlocation] = useState(false);
  const [showLocModal, setShowLocModal] = useState(true);
  const [selectedGame, setSelectedGame] = useState({});
  const [showIgn, setShowIgn] = useState('none');

  const [search, setSearch] = useState('');
  const [players, setPlayers] = useState([]);

  const [coverPic, setCoverPic] = useState(null);
  const [userIgn, setUserIgn] = useState(null);

  const [address, setAddress] = useState(Userdata.profile?.address);
  const [phno, setPhno] = useState(user?.phone_number);

  const [attr, setAttr] = useState(
    Userdata.profile.playergames[0]?.player?.attributes
  );

  const [follow, setFollow] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const followhandlesubmit = async (e) => {
    e.preventDefault();
    mutate({ follow });
    setFollow(true);
  };

  const handleSubmitphno = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseURL}/api/profile/phone/${user._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          phno
        }),
        headers: {
          'Content-type': 'application/json'
        }
      });
      toast.success('Your Phone Number has been Updated successfully! ');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    $('a.model_close').parent().removeClass('show_model');
    refreshData();
  };

  function handleChangephno(e) {
    setPhno(e.target.value);
  }

  const addFollow = async () => {
    const res = await fetch(`${baseURL}/api/profile/follow/${SrhUser._id}`, {
      method: 'POST',
      headers: {
        Authorization: cookie.get('token')
      }
    });
  };

  const { mutate } = useMutation(addFollow);

  const SrhUser = Userdata.profile?.user;
  const profileId = Userdata.profile?._id;
  const isLoggedInUser = user._id === SrhUser?._id;

  const isFollow = Userdata.followers
    ?.filter((x) => x.user === user._id)
    .map((x) => x.user);

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
    try {
      const res = await fetch(`${baseURL}/api/profile/phone/${user._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          phno
        }),
        headers: {
          'Content-type': 'application/json'
        }
      });
      toast.success('Your Phone Number has been Updated successfully! ');
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

  function handleUserIgnChange(e) {
    setUserIgn(e.target.value);
  }

  function handleSearchChange(e) {
    setSearch(e.target.value);
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

  const handleAddressForm = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length === 0) {
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
      $('a.model_close').parent().removeClass('show_model');
      refreshData();
    }
  };

  const handleAttrForm = async (e) => {
    e.preventDefault();

    if (
      attr.roles === '' ||
      attr.regions === '' ||
      attr.playertype === '' ||
      attr.platform === '' ||
      attr.language === '' ||
      attr.paid === ''
    ) {
      toast.warning('Please enter all fields or check your inputs');
    } else {
      try {
        await axios.put(
          `${baseURL}/api/all/attribute/${Userdata.profile.playergames[0]?.player._id}`,
          attr,
          {
            headers: {
              Authorization: cookie.get('token'),
              'Content-Type': 'application/json'
            }
          }
        );
        toast.success("Detail's successfully have been updated");
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
      $('a.model_close').parent().removeClass('show_model');
      refreshData();
    }
  };

  const handleButtonForm = () => {
    addingBio();
    setBio('');
    setShowForm(false);
    refreshData();
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

  const handleSelectGame = async (obj) => {
    setSelectedGame({ game: obj, userign: userIgn });
    setShowIgn('');
    if (userIgn && userIgn.length > 4) {
      //myState.setFilteredResults([]);
      $('a.model_close').parent().removeClass('show_model');
    } else {
      toast.error('Please enter your valid User In Game Name (IGN)');
    }
  };

  function handleChangeaddress(e) {
    setAddress({ ...address, [e.target.name]: e.target.value });
  }

  function handleChangeAttr(e) {
    setAttr({ ...attr, [e.target.name]: e.target.value });
  }

  function handleChange(e) {
    if (e.target.options) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setAttr({ ...attr, [e.target.name]: value });
    } else {
      setAttr({ ...attr, [e.target.name]: e.target.value });
    }
  }

  useEffect(() => {
    $('a.model_show_btn').click(function () {
      setShowIgn('none');
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (search === '') {
      toast.warning('Please enter all fields or check your inputs');
    } else {
      try {
        await axios
          .get(`${baseURL}/api/player/getplayers/${search}`)
          .then((res) => setPlayers(res.data));
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
    }
  };

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
                coverPic ? URL.createObjectURL(coverPic) : SrhUser?.coverPicUrl
              }
              alt={SrhUser?.name}
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
        )
        <div className="edit_phone ">
          <div className="">
            {' '}
            <a href="#!" className="model_show_btn" alt="personal details">
              <button className="btn">
                <i className="fa fa-phone" aria-hidden="true"></i>
              </button>
            </a>
            <div className="common_model_box">
              <a href="#!" className="model_close">
                X
              </a>
              <div className="inner_model_box">
                <h3>Phone Number</h3>
                <form onSubmit={handleSubmitphno} className="common_form">
                  <div className="form-group">
                    <div className="">
                      <label htmlFor="exampleFormControlInput1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="phone_number"
                        name="phno"
                        onChange={handleChangephno}
                        value={phno}
                      />
                    </div>
                    <button className="btn">Update</button>
                  </div>
                </form>
              </div>
              <div className="overlay"></div>
            </div>
          </div>
        </div>
        {isLoggedInUser ? (
          <div className="edit_add ">
            <div className="">
              {' '}
              {/* <span className="ct" >Detail's</span>{' '} */}
              <a href="#!" className="model_show_btn" alt="personal details">
                <button className="btn">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                </button>
              </a>
              <div className="common_model_box">
                <a href="#!" className="model_close">
                  X
                </a>

                <div className="inner_model_box">
                  <h3>Personal Detail's</h3>

                  <form
                    onSubmit={handleAttrForm}
                    className="common_form personal_form"
                  >
                    <div className="form-group">
                      <div className="colm">
                        <label htmlFor="exampleFormControlInput1">Role</label>
                        <select
                          id="roles"
                          name="roles"
                          onChange={handleChangeAttr}
                          value={attr?.roles}
                          className="custom-select text-capitalize"
                        >
                          <option value="Player">Player</option>
                          <option value="Front">Front</option>
                          <option value="Back">Back</option>
                          <option value="Gunman">Gunman</option>
                          <option value="Strategy">Strategy</option>
                        </select>
                      </div>
                      <div className="colm">
                        <label htmlFor="exampleFormControlInput1">Region</label>
                        <select
                          id="regions"
                          name="regions"
                          onChange={handleChangeAttr}
                          value={attr?.regions}
                          className="custom-select text-capitalize"
                        >
                          <option value="India">India</option>
                          <option value="USA">USA</option>
                          <option value="Asia">Asia</option>
                          <option value="China">China</option>
                          <option value="Japan">Japan</option>
                          <option value="Europe">Europe</option>
                        </select>
                      </div>
                      <div className="colm">
                        <label htmlFor="exampleFormControlInput1">
                          Player Type
                        </label>
                        <select
                          id="playertype"
                          name="playertype"
                          onChange={handleChangeAttr}
                          value={attr?.playertype}
                          className="custom-select text-capitalize"
                        >
                          <option value="Casual">Casual</option>
                          <option value="SemiPro">SemiPro</option>
                          <option value="Pro">Pro</option>
                          <option value="Gunman">Gunman</option>
                          <option value="Local Lan">Local Lan</option>
                        </select>
                      </div>
                      <div className="colm">
                        <label htmlFor="exampleFormControlInput1">
                          Platform
                        </label>
                        <select
                          id="platform"
                          name="platform"
                          onChange={handleChangeAttr}
                          value={attr?.platform}
                          className="custom-select text-capitalize"
                        >
                          <option value="PC">PC</option>
                          <option value="Front">Front</option>
                          <option value="Console">Console</option>
                          <option value="Mobile">Mobile</option>
                        </select>
                      </div>

                      <div className="colm">
                        <label htmlFor="exampleFormControlInput1">
                          Language
                        </label>
                        <select
                          id="language"
                          name="language"
                          onChange={handleChange}
                          value={attr?.language}
                          className="custom-select text-capitalize"
                          multiple={true}
                        >
                          <option value="English">English</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Telagu">Telagu</option>
                          <option value="Tamil">Tamil</option>
                        </select>
                      </div>

                      <div className="colm">
                        <label htmlFor="exampleFormControlInput1">Paid</label>
                        <select
                          id="paid"
                          name="paid"
                          onChange={handleChangeAttr}
                          value={attr?.paid}
                          className="custom-select text-capitalize"
                        >
                          <option value="Paid">Paid</option>
                          <option value="Unpaid">Unpaid</option>
                        </select>
                      </div>
                      <div className="colm pphone">
                        <label htmlFor="exampleFormControlInput1">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          className="custom-select text-capitalize"
                          id="exampleFormControlInput1"
                          placeholder="phone_number"
                          name="phno"
                          onChange={handleChangephno}
                          value={phno}
                        />
                      </div>
                      <button className="btn">Update</button>
                    </div>
                  </form>
                </div>
                <div className="overlay"></div>
              </div>
            </div>
          </div>
        ) : null}
        <div className="profile_dp_box">
          <div className="profile_pic">
            <form onSubmit={handleSubmit}>
              <img
                className="rounded-full h-full w-full object-cover"
                src={
                  profilePic
                    ? URL.createObjectURL(profilePic)
                    : SrhUser?.profilePicUrl
                }
                alt={SrhUser.name}
              />
              {isLoggedInUser ? (
                <div className="edit_photo">
                  <label htmlFor="user-photo" className="edit_label">
                    <i className="fa fa-picture-o" aria-hidden="true"></i>
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
            <span className="online_icon"></span>
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
                    {isLoggedInUser ? (
                      <a href="#!" className="model_show_btn">
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </a>
                    ) : null}
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
                                className="custom-select text-capitalize"
                                id="exampleFormControlInput1"
                                placeholder="address line1"
                                name="line1"
                                onChange={handleChangeaddress}
                                value={address?.line1}
                              />
                              <p>{formErrors.line1}</p>
                            </div>

                            <div className="colm">
                              <label htmlFor="exampleFormControlInput1">
                                Address Line 2
                              </label>
                              <input
                                type="text"
                                className="custom-select text-capitalize"
                                id="exampleFormControlInput1"
                                placeholder="address line2"
                                name="line2"
                                onChange={handleChangeaddress}
                                value={address?.line2}
                              />
                              <p>{formErrors.line2}</p>
                            </div>

                            <div className="colm">
                              <label htmlFor="exampleFormControlInput1">
                                City
                              </label>
                              <input
                                type="text"
                                className="custom-select text-capitalize"
                                id="exampleFormControlInput1"
                                placeholder="city "
                                name="city"
                                onChange={handleChangeaddress}
                                value={address?.city}
                              />
                              <p>{formErrors.city}</p>
                            </div>

                            <div className="colm">
                              <label htmlFor="exampleFormControlInput1">
                                State
                              </label>
                              <input
                                type="text"
                                className="custom-select text-capitalize"
                                id="exampleFormControlInput1"
                                placeholder="state"
                                name="state"
                                onChange={handleChangeaddress}
                                value={address?.state}
                              />
                              <p>{formErrors.state}</p>
                            </div>

                            <div className="colm">
                              <label htmlFor="exampleFormControlInput1">
                                Country
                              </label>
                              <input
                                type="text"
                                className="custom-select text-capitalize"
                                id="exampleFormControlInput1"
                                placeholder="country"
                                name="country"
                                onChange={handleChangeaddress}
                                value={address?.country}
                              />
                              <p>{formErrors.country}</p>
                            </div>

                            <div className="colm">
                              <label htmlFor="exampleFormControlInput1">
                                Zipcode
                              </label>
                              <input
                                type="text"
                                className="custom-select text-capitalize"
                                id="exampleFormControlInput1"
                                placeholder="zip code"
                                name="zipcode"
                                onChange={handleChangeaddress}
                                value={address?.zipcode}
                              />
                              <p>{formErrors.zipcode}</p>
                            </div>

                            <button
                              className="btn"
                              onClick={() =>
                                setFormErrors(locationformvalidate(address))
                              }
                            >
                              Update
                            </button>
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
                <a href="https://www.facebook.com/" target="_blank">
                  <i className="fa fa-facebook-official" aria-hidden="true"></i>
                </a>
                <a href="https://www.instagram.com/" target="_blank">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
                <a href="https://www.twitch.tv/" target="_blank">
                  <i className="fa fa-twitch" aria-hidden="true"></i>
                </a>
                <a href="https://discord.com/" target="_blank">
                  <img
                    src="/assets/media/social/discord.png"
                    height="20px"
                    width="20px"
                  />
                </a>
              </div>
            </div>
            {!showform ? (
              <p> {Userdata.profile ? Userdata.profile.bio : ''} </p>
            ) : null}

            {isLoggedInUser ? (
              <button className="bio_edit" onClick={toggleShowform}>
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </button>
            ) : null}

            <div className="discovery_page">
              <div className="white_bg">
                <h2>GAMES</h2>

                <div className="tit">
                  <a href="#!" className="model_show_btn">
                    <span>
                      <b className="icon">
                        <img src="/assets/media/ranking/console.png" alt="" />
                      </b>{' '}
                      Browse Games
                    </span>
                    <i className="fa fa-angle-right" aria-hidden="true"></i>

                    <div className="hover_games">
                      <div className="other_logo">
                        <img
                          src={selectedGame ? selectedGame.imgUrl : ''}
                          alt={selectedGame ? selectedGame.name : ''}
                        />
                      </div>
                    </div>
                  </a>

                  <div className="common_model_box" id="more_games">
                    <a href="#!" className="model_close">
                      X
                    </a>
                    <div className="inner_model_box">
                      <h3>Games</h3>

                      <div className="team_search">
                        <div className="searchbox">
                          <h3>Search </h3>

                          <form
                            className="form w-100"
                            noValidate="novalidate"
                            onSubmit={handleSearchSubmit}
                          >
                            <input
                              id="search"
                              name="search"
                              className=""
                              placeholder="Search your player name or user IGN..."
                              type="search"
                              value={search}
                              onChange={handleSearchChange}
                              autoComplete="off"
                            />
                            <input
                              type="text"
                              className="form-control"
                              placeholder="User IGN"
                              name="userIgn"
                              onChange={handleUserIgnChange}
                              value={userIgn}
                            />
                            <input type="submit" value="" />
                          </form>
                        </div>
                      </div>

                      <ul className="">
                        {players &&
                          players.map((player, idx) => (
                            <li key={idx}>
                              <div className="game_pic">
                                <a
                                  href="#!"
                                  onClick={() => handleSelectGame(game)}
                                >
                                  {' '}
                                  <img
                                    src={player.imgUrl}
                                    alt={player.name}
                                  />{' '}
                                </a>
                              </div>
                              <p>{player.name}</p>
                            </li>
                          ))}
                      </ul>

                      <div className="form-group" style={{ display: showIgn }}>
                        <label htmlFor="exampleFormControlInput1">
                          Please enter your in game name (IGN)
                        </label>
                      </div>
                      <div className="poup_height msScroll_all">
                        <ul className="">
                          {games &&
                            games.map((game, idx) => (
                              <li key={idx}>
                                <div className="game_pic">
                                  <a
                                    href="#!"
                                    onClick={() => handleSelectGame(game)}
                                  >
                                    {' '}
                                    <img
                                      src={game.imgUrl}
                                      alt={game.name}
                                    />{' '}
                                  </a>
                                </div>
                                <p>{game.name}</p>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                    <div className="overlay"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ProfileGameStat
            user={user}
            Userdata={Userdata}
            selectedGame={selectedGame}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileBox;
