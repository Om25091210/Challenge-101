import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import SocialLink from '../common/SocialLink';
import { profileformvalidate } from '@utils/valid';
import Moment from 'moment';

const ProfileEdit = ({ profile, user, games, allteams }) => {
  const name = user.name.split(' ');
  const [online, setOnline] = useState(false);
  const [allroles, setAllroles] = useState([]);
  const [showIgn, setShowIgn] = useState('none');
  const [userIgn, setUserIgn] = useState(null);
  const [step1, setStep1] = useState(true);
  const [selectedGame, setSelectedGame] = useState();
  const [openForm, setOpenForm] = useState(false);
  const [type, setType] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const toggleMic = () => {
    if (online === false) {
      setOnline(true);
    } else {
      setOnline(false);
    }
  };

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const [states, setStates] = useState({
    profileType: 'Gamer',
    firstName: name[0],
    lastName: name[1],
    username: user.username,
    bio: profile.bio,
    Online: online,
    team: '',
    role: profile?.headline?.inGameRole,
    b_role: profile?.headline?.business_role,
    startDate: Moment(profile?.headline.startDate).format('yyyy-MM-DD') || '',
    game: profile?.headline?.game?._id,
    company: profile?.headline?.company,
    industry: profile?.headline?.industry,
    link: profile?.headline?.link,
    streamingPlatform: profile?.headline?.streamingPlatform,
    socialLinks: []
  });

  const handleSelectGame = async (obj) => {
    setSelectedGame({ game: obj });
    setStep1(false);
    setShowIgn('');
  };
  const handleopenForm = async (data) => {
    setOpenForm(true);
    setType(data);
  };
  const handleRoleForm = (e) => {
    setOpenForm(true);
    setType('');
  };
  const gamehandleSubmit = async (e) => {
    e.preventDefault();
    var gameId = selectedGame?.game._id;
    try {
      await axios.patch(
        `${baseURL}/api/profile/addgame/${Userdata.profile._id}`,
        {
          gameId,
          userIgn
        },
        {
          headers: {
            Authorization: cookie.get('token'),
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success(`${selectedGame.game.name} has been added to your games`);
      $('a.model_close').parent().removeClass('show_model');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshData();
    setUserIgn(null);
    setStep1(true);
  };

  function handleUserIgnChange(e) {
    setUserIgn(e.target.value);
  }

  useEffect(() => {
    axios
      .get(`${baseURL}/api/all/teamroles`)
      .then((res) => setAllroles(res.data));
  }, []);

  const handleChangeCheck = (e) => {
    setStates({ ...states, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    if (e.target.options) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setStates({ ...states, [e.target.name]: value });
    } else if (e.target.files) {
      console.log(e.target.files[0]);
      setStates({ ...states, [e.target.name]: e.target.files[0] });
    } else {
      setStates({ ...states, [e.target.name]: e.target.value });
    }
  }

  const handleProfileEdit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      try {
        axios.put(`${baseURL}/api/profile/type/${profile?._id}`, states);
        toast.success('Profile Updated');
        $('a.model_close').parent().removeClass('show_model');
      } catch (err) {
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
      refreshData();
    }
  };

  const User_team =
    allteams &&
    allteams.filter((tem) => {
      return tem.team?._id === parseInt(states.team);
    });

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [teamData, setTeamData] = useState([]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setSearchText(searchWord);
    const newFilter = teamData?.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleSelectedTeam = (data) => {
    setSearchText(data.name);
    states.team = data._id;
  };

  useEffect(() => {
    axios.get(`${baseURL}/api/all/teams/`).then((res) => setTeamData(res.data));
  }, []);

  return (
    <>
      <div className="loc_box edit_pof">
        {profile.user._id === user._id ? (
          <a href="#!" className="model_show_btn">
            <button className="btn">
              {' '}
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
              Profile Edit
            </button>
          </a>
        ) : null}
        <div className="common_model_box edit_profile" id="big_poup">
          <a href="#!" className="model_close">
            X
          </a>
          <div className="inner_model_box">
            <div className="add_job_height">
              <h3>Profile Edit</h3>
              <form className="common_form" onSubmit={handleProfileEdit}>
                <div className="form-group">
                  <label for="exampleFormControlTextarea1">
                    Profile Category
                  </label>
                  <div className="btn_selection">
                    <div className="big_btn">
                      <span class="form-check-label terms">Gamer</span>
                      <input
                        type="checkbox"
                        name="profileType"
                        value="Gamer"
                        onChange={handleChangeCheck}
                      />
                    </div>

                    <div className="big_btn">
                      <span class="form-check-label terms">Coach</span>
                      <input
                        type="checkbox"
                        name="profileType"
                        value="Coach"
                        onChange={handleChangeCheck}
                      />
                    </div>

                    <div className="big_btn">
                      <span class="form-check-label terms">Streamer</span>
                      <input
                        type="checkbox"
                        name="profileType"
                        value="Streamer"
                        onChange={handleChangeCheck}
                      />
                    </div>
                    <div className="big_btn">
                      <span class="form-check-label terms">Business</span>
                      <input
                        type="checkbox"
                        name="profileType"
                        value="Business"
                        onChange={handleChangeCheck}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    onChange={handleChangeCheck}
                    value={states.firstName}
                  />
                  <p>{formErrors.firstName}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    onChange={handleChangeCheck}
                    value={states.lastName}
                  />
                  <p>{formErrors.lastName}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">User name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    onChange={handleChangeCheck}
                    value={states.username}
                  />
                  <p>{formErrors.username}</p>
                </div>

                <h2>
                  <label htmlFor="exampleFormControlInput1">Headline</label>
                </h2>
                <div className="edit_four">
                  {states.profileType === 'Business' ? (
                    <>
                      <div className="form-group">
                        <input
                          type="text"
                          name="company"
                          value={states.company}
                          onChange={handleChangeCheck}
                          placeholder="Company"
                          className="form-control"
                        />
                        <p>{formErrors.company}</p>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="industry"
                          value={states.industry}
                          onChange={handleChangeCheck}
                          placeholder="industry"
                          className="form-control"
                        />
                        <p>{formErrors.industry}</p>
                      </div>
                    </>
                  ) : null}
                  {states.profileType === 'Gamer' ? (
                    <>
                      <div className="form-group">
                        <select
                          name="team"
                          id="team"
                          value={states.team}
                          onChange={handleSubmit}
                          placeholder="Team Name"
                        >
                          <option value="--">--</option>
                          {allteams &&
                            allteams.map((tem) => (
                              <option value={tem.team?._id}>
                                {tem.team?.name}
                              </option>
                            ))}
                        </select>
                        <p>{formErrors.team}</p>
                      </div>
                    </>
                  ) : states.profileType === 'Coach' ? (
                    <div className="form-group">
                      <input
                        type="search"
                        id="team"
                        name="team"
                        className="form-control"
                        placeholder={`Enter team name`}
                        value={searchText}
                        onChange={handleFilter}
                        autoComplete="off"
                      />
                      {searchText.length !== 0 ? (
                        <div className="custom-rig-tag">
                          <div>
                            {!filteredData || filteredData.length === 0 ? (
                              <p>No team found..</p>
                            ) : (
                              filteredData.map((data) => (
                                <div
                                  onClick={() => handleSelectedTeam(data)}
                                  key={data._id}
                                >
                                  <img
                                    src={data?.imgUrl}
                                    height={50}
                                    width={50}
                                  />
                                  <p>
                                    {data.name.length > 20
                                      ? data.name.substring(0, 20) + '...'
                                      : data.name}
                                  </p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      ) : null}
                      <p>{formErrors.Cteam}</p>
                    </div>
                  ) : null}
                  {states.profileType === 'Gamer' ||
                  states.profileType === 'Coach' ? (
                    <>
                      <div className="form-group">
                        <select
                          name="game"
                          id="team"
                          value={states.game}
                          onChange={handleChangeCheck}
                        >
                          <option value="--">--</option>
                          {User_team &&
                            User_team[0]?.team?.games.map((game) => (
                              <option value={game.gameId._id}>
                                {game.gameId.name}
                              </option>
                            ))}
                        </select>
                        <p>{formErrors.Ggame}</p>
                        <p>{formErrors.Cgame}</p>
                      </div>
                    </>
                  ) : states.profileType === 'Streamer' ? (
                    <>
                      <div className="form-group">
                        <select
                          name="game"
                          id="team"
                          value={states.game}
                          onChange={handleChangeCheck}
                        >
                          {games &&
                            games.map((game) => (
                              <option value={game._id}>{game.name}</option>
                            ))}
                        </select>
                        <p>{formErrors.Sgame}</p>
                      </div>
                    </>
                  ) : null}

                  {states.profileType === 'Streamer' ? (
                    <>
                      <div className="form-group">
                        <input
                          type="text"
                          name="streamPlatform"
                          value={states.streamingPlatform}
                          onChange={handleChangeCheck}
                          placeholder="Streaming Platform"
                          className="form-control"
                        />
                        <p>{formErrors.platform}</p>
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          name="streamLink"
                          value={states.link}
                          onChange={handleChangeCheck}
                          className="form-control"
                          placeholder="Stream Link"
                        />
                        <p>{formErrors.link}</p>
                      </div>
                    </>
                  ) : null}

                  {states.profileType === 'Gamer' ? (
                    <>
                      <div className="form-group">
                        <select
                          name="role"
                          value={states.role}
                          onChange={handleChangeCheck}
                        >
                          <option value="--">--</option>
                          {allroles &&
                            allroles.map((role) => (
                              <option value={role}>{role}</option>
                            ))}
                        </select>
                        <p>{formErrors.Grole}</p>
                      </div>
                    </>
                  ) : states.profileType === 'Business' ? (
                    <>
                      <div className="form-group">
                        <select
                          name="b_role"
                          value={states.b_role}
                          onChange={handleChangeCheck}
                        >
                          <option value="--">--</option>
                          {allroles &&
                            allroles.map((role) => (
                              <option value={role}>{role}</option>
                            ))}
                        </select>
                        <p>{formErrors.b_role}</p>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  <div className="form-group">
                    <input
                      type="date"
                      name="startDate"
                      value={states.startDate}
                      onChange={handleChangeCheck}
                      placeholder="Start Date"
                      className="form-control"
                    />
                  </div>
                  <p>{formErrors.startDate}</p>
                </div>

                <div className="form-group textarea">
                  <label htmlFor="exampleFormControlInput1">Bio</label>
                  <textarea
                    type="textarea"
                    className="form-control"
                    name="bio"
                    onChange={handleChangeCheck}
                    value={states.bio}
                  ></textarea>
                  <p>{formErrors.bio}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Games</label>
                  <div className="prof_games">
                    <div className="games">
                      <div className="tit">
                        {profile.playergames &&
                          profile.playergames.map((game) => (
                            <>
                              <span>
                                {' '}
                                <img
                                  src={game.game.imgUrl}
                                  alt={game.game.name}
                                />
                              </span>
                            </>
                          ))}
                        <a href="#!" className="model_show_btn">
                          <i
                            className="fa fa-plus-circle"
                            aria-hidden="true"
                          ></i>

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
                            <form
                              className="form w-100 add_game_box"
                              noValidate="novalidate"
                              id="kt_sign_up_form"
                              onSubmit={gamehandleSubmit}
                            >
                              {step1 ? (
                                <div className="poup_height msScroll_all">
                                  <ul>
                                    {games &&
                                      games.map((game) => (
                                        <li>
                                          <div className="game_pic">
                                            <a
                                              href="#!"
                                              onClick={() =>
                                                handleSelectGame(game)
                                              }
                                            >
                                              <img
                                                src={game.imgUrl}
                                                alt={game.name}
                                              />
                                            </a>
                                          </div>
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              ) : (
                                <>
                                  <button
                                    className="btn"
                                    onClick={() => setStep1(true)}
                                  >
                                    Back
                                  </button>
                                  <div className="add_game_poup">
                                    <img
                                      src={selectedGame?.game.imgUrl}
                                      alt={selectedGame?.game.name}
                                    />

                                    <input
                                      type="text"
                                      name="userIgn"
                                      onChange={handleUserIgnChange}
                                      value={userIgn}
                                    />
                                  </div>

                                  <button type="submit" className="btn">
                                    <span className="indicator-label">
                                      Add Game
                                    </span>
                                  </button>
                                </>
                              )}
                            </form>
                          </div>
                          <div className="overlay"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="">Social Links</label>
                  <div className="socail">
                    <button
                      type="button"
                      onClick={() => handleopenForm('Facebook')}
                    >
                      <i
                        className="fa fa-facebook-official"
                        aria-hidden="true"
                      ></i>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleopenForm('Instagram')}
                    >
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleopenForm('Twitch')}
                    >
                      <i className="fa fa-twitch" aria-hidden="true"></i>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleopenForm('Youtube')}
                    >
                      <i className="fa fa-youtube"></i>
                    </button>

                    <span onClick={(e) => handleRoleForm(e)}>
                      <i className="fa fa-plus-circle" aria-hidden="true"></i>
                    </span>
                  </div>

                  <div className="edit_four">
                    <div className="form-group">
                      <input
                        type="text"
                        name=""
                        value=""
                        placeholder=""
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name=""
                        value=""
                        placeholder=""
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name=""
                        value=""
                        placeholder=""
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name=""
                        value=""
                        placeholder=""
                        className="form-control"
                      />
                    </div>
                  </div>

                  {openForm && (
                    <SocialLink
                      type={type}
                      socialLink={states.socialLinks}
                      closeForm={setOpenForm}
                    />
                  )}
                </div>
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch1"
                    onClick={() => setOnline(toggleMic)}
                    value={states.Online}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch1"
                  >
                    Online Status
                  </label>
                </div>
                <button
                  className="btn"
                  onClick={() => setFormErrors(profileformvalidate(states))}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
          <div className="overlay"></div>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
