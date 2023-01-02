import { useState, useEffect } from 'react';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import Teams from '@components/discover/Teams';
import Coaches from '@components/discover/Coaches';
import Players from '@components/discover/Players';
import Arenas from '@components/discover/Arenas';
import Jobs from '@components/discover/Jobs';
import baseURL from '@utils/baseURL';
import AllScript from '../AllScript';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const General = ({ user, profile }) => {
  const [selectedGame, setSelectedGame] = useState();
  const [showGameBox, setShowGameBox] = useState(true);
  const [games, setGames] = useState([]);
  const [step1, setStep1] = useState(true);
  const [states, setStates] = useState({
    facebook: profile.social?.facebook || '',
    instagram: profile.social?.instagram || '',
    twitch: profile.social?.twitch || '',
    youtube: profile.social?.youtube || '',
    discord: profile.social?.discord || '',
    website: profile.social?.website || '',
    userIgn: '',
    gameId: selectedGame?.game._id
  });

  useEffect(() => {
    axios.get(`${baseURL}/api/all/games`).then((res) => setGames(res.data));
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

  const handleSelectGame = async (obj) => {
    setStates({ ...states, gameId: obj._id });
    setStep1(false);
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
    setShowGameBox(false);
  };

  const addgames =
    games &&
    games.filter(
      ({ _id }) => !profile.playergames.some((x) => x.game?._id == _id)
    );

  const handleUpdate = (e) => {
    e.preventDefault();
    try {
      axios
        .put(`${baseURL}/api/profile/settings/ACCOUNTS`, states, {
          headers: {
            Authorization: Cookies.get('token')
          }
        })
        .then(toast.success('Updated User'));
    } catch (err) {
      console.log(err);
      toast.error('Cannot Update User');
    }
  };

  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);

  return (
    <>
      <MetaDash />

      <SignedHeader user={user} profile={profile} />

      <LeftNav user={user} />

      <div className="main_middle profile_middle">
        <div className="setting_pages">
          <div className="white_bg">
            <div className="left_setting_menu">
              <div className="menu_bloc">
                <i class="fa fa-cog" aria-hidden="true"></i>
                <Link href={`/settings/general`}> General</Link>
                <ul>
                  <li>
                    {' '}
                    <Link href={`/settings/general#profile`}>Profile</Link>
                  </li>
                  <li>
                    <Link href={`/settings/general#personal`}>
                      Personal Information
                    </Link>
                  </li>
                  <li>
                    <Link href={`/settings/general#contact`}>
                      Contact Details
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="menu_bloc">
                <i class="fa fa-user" aria-hidden="true"></i>
                <Link href={`/settings/accounts`} className="active">
                  Accounts
                </Link>
                <ul>
                  <li>
                    {' '}
                    <Link href={`/settings/accounts#gaming`}>
                      Gaming Accounts
                    </Link>
                  </li>
                  <li>
                    <Link href={`/settings/accounts#social`}>Social Links</Link>
                  </li>
                </ul>
              </div>

              <div className="menu_bloc">
                <i class="fa fa-shield" aria-hidden="true"></i>
                <Link href={`/settings/security`}>Security & Privacy</Link>
                <ul>
                  <li>
                    {' '}
                    <Link href={`/settings/security#change`}>
                      Change Password
                    </Link>
                  </li>
                  {/* <li>
                    <Link href={`/settings/`}>Two-factor Authentication</Link>
                  </li> */}
                  <li>
                    <Link href={`/settings/security#block`}>Blocked Users</Link>
                  </li>
                  <li>
                    <Link href={`/settings/security#privacy`}>Privacy</Link>
                  </li>
                  {/* <li>
                    <Link href={`/settings/`}>Cookies</Link>
                  </li> */}
                  <li>
                    <Link href={`/settings/security#delete`}>
                      Delete Account
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="right_setting_data">
              <h1 id="gaming">Gaming Accounts</h1>

              <div className="blokes">
                <div className="flex1 accountbg">
                  {/* <div className="gameLogo flex1">
                    <img src="/assets/media/team1.png" alt="" />
                    <img src="/assets/media/link.png" alt="" />
                    <img src="/assets/media/team2.png" alt="" />
                  </div> */}

                  {/* <p>
                    <p>
                      {' '}
                      <strong>Fortnite</strong>{' '}
                    </p>
                    Connect your Epic games account for fetching your personal
                    Fortnite statistics.
                  </p> */}

                  {profile.playergames &&
                    profile.playergames.map((game) => (
                      <>
                        <span>
                          {' '}
                          <img
                            style={{ height: '40px', width: '40px' }}
                            src={game.game?.imgUrl}
                            alt={game.game?.name}
                          />
                        </span>
                      </>
                    ))}

                  <div className="rightBox">
                    <div className="form-group">
                      <div className="prof_games">
                        <div className="games">
                          <div className="tit">
                            <a href="#!" className="model_show_btn">
                              <i
                                className="fa fa-plus-circle btn"
                                aria-hidden="true"
                              >
                                {' '}
                                Connect
                              </i>

                              <div className="hover_games">
                                <div className="other_logo">
                                  <img
                                    src={
                                      selectedGame ? selectedGame.imgUrl : ''
                                    }
                                    alt={selectedGame ? selectedGame.name : ''}
                                  />
                                </div>
                              </div>
                            </a>
                            {showGameBox ? (
                              <div
                                className="common_model_box prof_edit"
                                id="more_games"
                              >
                                <a href="#!" className="model_close">
                                  X
                                </a>
                                <div className="inner_model_box">
                                  <div
                                    className="form w-100 add_game_box"
                                    noValidate="novalidate"
                                    id="edit_pro_add_game"
                                  >
                                    {step1 ? (
                                      <div className="poup_height msScroll_all">
                                        <ul>
                                          {addgames &&
                                            addgames.map((game) => (
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
                                            onChange={handleSubmit}
                                            value={states.userIgn}
                                          />
                                        </div>

                                        <button
                                          type="submit"
                                          className="btn"
                                          onClick={gamehandleSubmit}
                                        >
                                          <span className="indicator-label">
                                            Add Game
                                          </span>
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="overlay"></div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="blokes">
                <div className="flex1 accountbg">
                  <div className="gameLogo flex1">
                    <img src="/assets/media/team1.png" alt="" />
                    <img src="/assets/media/link.png" alt="" />
                    <img src="/assets/media/team2.png" alt="" />
                  </div>

                  <p>
                    <p>
                      {' '}
                      <strong>DOTA 2 & CS GO</strong>{' '}
                    </p>
                    Connect your Epic games account for fetching your personal
                    Fortnite statistics.
                  </p>
                  <div className="rightBox">
                    <button className="btn">Connect</button>
                  </div>
                </div>
              </div>

              <div className="blokes">
                <div className="flex1 accountbg">
                  <div className="gameLogo flex1">
                    <img src="/assets/media/team1.png" alt="" />
                    <img src="/assets/media/link.png" alt="" />
                    <img src="/assets/media/team2.png" alt="" />
                  </div>

                  <p>
                    <p>
                      {' '}
                      <strong>League of Legends</strong>{' '}
                    </p>
                    Connect your Epic games account for fetching your personal
                    Fortnite statistics.
                  </p>
                  <div className="rightBox">
                    <button className="btn">Connect</button>
                  </div>
                </div>
              </div>

              <h2 id="social">Social Links</h2>
              <form className="common_form">
                <div className="form-group">
                  <label for="">Facebook</label>
                  <input
                    type="text"
                    name="facebook"
                    value={states.facebook}
                    onChange={handleChangeCheck}
                    className="form-control facebook"
                  />
                </div>
                <div className="form-group">
                  <label for="">Instagram</label>
                  <input
                    type="text"
                    name="instagram"
                    value={states.instagram}
                    onChange={handleChangeCheck}
                    className="form-control instagram"
                  />
                </div>
                <div className="form-group">
                  <label for="">Twitch</label>
                  <input
                    type="text"
                    name="twitch"
                    value={states.twitch}
                    onChange={handleChangeCheck}
                    className="form-control twitch"
                  />
                </div>
                <div className="form-group">
                  <label for="">Youtube</label>
                  <input
                    type="text"
                    name="youtube"
                    value={states.youtube}
                    onChange={handleChangeCheck}
                    className="form-control youtube"
                  />
                </div>
                <div className="form-group">
                  <label for="">Discord</label>
                  <input
                    type="text"
                    name="discord"
                    value={states.discord}
                    onChange={handleChangeCheck}
                    className="form-control discord"
                  />
                </div>
                <div className="form-group">
                  <label for="">Website</label>
                  <input
                    type="text"
                    name="website"
                    value={states.website}
                    onChange={handleChangeCheck}
                    className="form-control website"
                  />
                </div>
              </form>
              <button className="btn" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <AllScript />
    </>
  );
};

export default General;
