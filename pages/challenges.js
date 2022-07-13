import React, { useEffect, useState } from 'react';
import baseURL from '@utils/baseURL';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from './AllScript';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';
import ChallengesDisplay from '../components/challenges/ChallengesDisplay';

const challenges = ({ user, data, teams, profile, allteams }) => {
  const [searchText, setSearchText] = useState('');
  const [opponentTeam, setOpponentTeam] = useState(null);
  const [showform, setShowForm] = useState(true);

  const [state, setState] = useState({
    User_team: '',
    game: '',
    players: '',
    opponent_team: null,
    startDate: '',
    startTime: '',
    format: '',
    entry_fee: null,
    challengeType: ''
  });

  const UserTeam = teams.filter((team) => {
    return team._id === parseInt(state.User_team);
  });
  var commonGames = UserTeam[0]?.games.filter(function (val1) {
    return opponentTeam?.games.some(function (val2) {
      return val1.gameId._id === val2.gameId;
    });
  });

  const [filteredData, setFilteredData] = useState([]);
  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setSearchText(searchWord);
    const newFilter = allteams?.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
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

  function onChange(e) {
    if (e.target.options) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setState({ ...state, [e.target.name]: value });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  }

  const handleSelectedTeam = (data) => {
    setSearchText(data.name);
    setShowForm(false);
    state.opponent_team = data._id;
    setOpponentTeam(data);
  };

  const handleEditStat = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/api/challenges/create`, state, {
        headers: {
          Authorization: cookie.get('token'),
          'Content-Type': 'application/json'
        }
      });
      toast.success('The Challenge Has Been Sent');
      $('a.model_close').parent().removeClass('show_model');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  const teamCheck = teams.filter((team) => {
    return data.find((chall) => {
      return team._id === chall.opponent_team?._id;
    });
  });

  const teamFiltered =
    data.filter((val2) => {
      return val2.invites?.some((invi) => {
        return (
          teamCheck.length > 0 &&
          teamCheck[0].players.some((plyr) => {
            return profile.playergames.some((pg) => {
              return (
                pg?.player?._id === invi.playerId?._id &&
                plyr.playerId?._id === invi.playerId?._id
              );
            });
          })
        );
      });
    }).length > 0;

  const teamPlayer = data.filter((val1) => {
    return val1.players.some((ply) => {
      return (
        teamCheck.length > 0 &&
        teamCheck[0].players.some((plyr) => {
          return plyr.playerId?._id === ply?.playerId;
        })
      );
    });
  });

  return (
    <>
      <MetaDash />

      <SignedHeader user={user} />

      <LeftNav user={user} />
      <div className="main_middle profile_middle">
        <div className="discovery_page challenge_page">
          <div className="white_bg">
            <div className="heads">
              <div>
                <h1>Play a challenge</h1>
                <p>
                  Startup a challenge against other players and earn real money
                  in the process!
                </p>
              </div>
              <div>
                <a href="#!" className="model_show_btn btn">
                  <i className="fa fa-plus-circle" aria-hidden="true"></i> Post
                  Challenge
                </a>

                <div className="common_model_box" id="big_poup">
                  <a href="#!" className="model_close">
                    X
                  </a>

                  <div className="inner_model_box">
                    <h3>Post a Challenge</h3>

                    <form className="common_form" onSubmit={handleEditStat}>
                      <div className="form-group">
                        <label> Choose your Team</label>
                        <select
                          name="Userteam"
                          id="teamselect"
                          onChange={onChange}
                        >
                          <option value="">---</option>
                          {teams.map((team, idtx) => (
                            <option value={team._id} key={idtx}>
                              {team.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Opponent Team</label>
                        <input
                          id="challengedTeam"
                          name="challengedTeam"
                          placeholder="Enter Team Name"
                          type="search"
                          value={searchText}
                          onChange={handleFilter}
                          autoComplete="off"
                        />

                        {searchText.length !== 0 && showform === true ? (
                          <div className="custom-rig-tag">
                            <div>
                              {!filteredData || filteredData.length === 0 ? (
                                <p>No Teams found..</p>
                              ) : (
                                filteredData.map((data, idfx) => (
                                  <div
                                    onClick={() => handleSelectedTeam(data)}
                                    key={idfx}
                                  >
                                    <img
                                      src={data.imgUrl}
                                      height={50}
                                      width={50}
                                    />
                                    <p>{data.name}</p>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label>Choose a game</label>
                        <select name="game" id="game" onChange={onChange}>
                          <option value="">---</option>
                          {commonGames?.length === 0 ? (
                            <option value="">
                              No games available between the teams.
                            </option>
                          ) : (
                            commonGames?.map((cG, idcx) => (
                              <option value={cG.gameId?._id} key={idcx}>
                                {cG.gameId?.name}
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="search">Choose Your Team Players</label>
                        <select
                          name="players"
                          id="players"
                          multiple
                          onChange={onChange}
                        >
                          {UserTeam[0]?.players?.map((plyr, idpx) => (
                            <option value={plyr?.playerId?._id} key={idpx}>
                              {plyr.playerId?.apidata
                                ? plyr.playerId.apidata.data.platformInfo
                                    .platformUserHandle
                                : plyr.playerId?.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Format</label>
                        <select name="format" onChange={onChange}>
                          <option value="">---</option>
                          <option value="Best of 3">Best of 3</option>
                          <option value="Best of 5">Best of 5</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Challenge Type</label>
                        <select name="challengeType" onChange={onChange}>
                          <option value="">---</option>
                          <option value="Team Deathmatch">
                            Team Deathmatch
                          </option>
                          <option value="Deathmatch">Deathmatch</option>
                          <option value="Domination">Domination</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          onChange={onChange}
                          value={state.entry_fee}
                          name="entry_fee"
                          placeholder="Enter fees"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="date"
                          onChange={onChange}
                          name="startDate"
                          value={state.startDate}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="time"
                          name="startTime"
                          onChange={onChange}
                          value={state.startTime}
                        />
                      </div>
                      <button className="btn" type="submit">
                        Submit
                      </button>
                    </form>
                  </div>
                  <div className="overlay"></div>
                </div>
              </div>
            </div>
            <h2>GAME</h2>

            <div className="tit">
              <a href="#!" className="model_show_btn">
                <span>
                  <b className="icon">
                    {true ? (
                      <img
                        src="src=/assets/media/ranking/team1.png"
                        alt=""
                        style={{ width: '26px', height: '18px' }}
                      />
                    ) : (
                      <img src="/assets/media/ranking/console.png" alt="" />
                    )}
                  </b>
                  Browse Games
                </span>
                <i className="fa fa-angle-right" aria-hidden="true"></i>

                <div className="hover_games">
                  <div className="other_logo">
                    <img />
                  </div>
                </div>
              </a>
            </div>
            <div className="filter_btns">
              <button className="btn">Challenge Invites</button>
              <button className="btn">Open Matches</button>
              <button className="btn">My Challenges</button>
              <button className="btn">Bounty</button>
              <div className="advance">
                <h3>online matches</h3>
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch1"
                    onClick={() => setShowFavs(!showfavs)}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch1"
                  ></label>
                </div>
              </div>
              <h3>Sort By:</h3> <button className="btn">Day left</button>{' '}
              <button className="btn">Reward</button>
            </div>
          </div>

          <div className="white_bg challenge_card_box">
            <ChallengesDisplay
              challenges={teamPlayer}
              isInvite={teamFiltered}
              user={user}
            />

            <p>Similar players you can challenge.</p>

            <ul className="challenge_card smil_card">
              <li>
                <div className="row1">
                  <div className="card_img">
                    {' '}
                    <div className="img"></div> Sonu sing
                  </div>{' '}
                </div>

                <div className="row1">
                  <span>
                    Game:
                    <img src="/assets/media/challenge/f.png" alt="" />
                  </span>

                  <span>
                    Rank:
                    <img src="/assets/media/challenge/rank.png" alt="" />
                    Platinum
                  </span>
                </div>

                <div className="row1">
                  <button className="btn">Challenge Now</button>
                </div>
              </li>

              <li>
                <div className="row1">
                  <div className="card_img">
                    {' '}
                    <div className="img"></div> Sonu sing
                  </div>{' '}
                </div>

                <div className="row1">
                  <span>
                    Game:
                    <img src="/assets/media/challenge/f.png" alt="" />
                  </span>

                  <span>
                    Rank:
                    <img src="/assets/media/challenge/rank.png" alt="" />
                    Platinum
                  </span>
                </div>

                <div className="row1">
                  <button className="btn">Challenge Now</button>
                </div>
              </li>
              <li>
                <div className="row1">
                  <div className="card_img">
                    {' '}
                    <div className="img"></div> Sonu sing
                  </div>{' '}
                </div>

                <div className="row1">
                  <span>
                    Game:
                    <img src="/assets/media/challenge/f.png" alt="" />
                  </span>

                  <span>
                    Rank:
                    <img src="/assets/media/challenge/rank.png" alt="" />
                    Platinum
                  </span>
                </div>

                <div className="row1">
                  <button className="btn">Challenge Now</button>
                </div>
              </li>
              <li>
                <div className="row1">
                  <div className="card_img">
                    {' '}
                    <div className="img"></div> Sonu sing
                  </div>{' '}
                </div>

                <div className="row1">
                  <span>
                    Game:
                    <img src="/assets/media/challenge/f.png" alt="" />
                  </span>

                  <span>
                    Rank:
                    <img src="/assets/media/challenge/rank.png" alt="" />
                    Platinum
                  </span>
                </div>

                <div className="row1">
                  <button className="btn">Challenge Now</button>
                </div>
              </li>
              <li>
                <div className="row1">
                  <div className="card_img">
                    {' '}
                    <div className="img"></div> Sonu sing
                  </div>{' '}
                </div>

                <div className="row1">
                  <span>
                    Game:
                    <img src="/assets/media/challenge/f.png" alt="" />
                  </span>

                  <span>
                    Rank:
                    <img src="/assets/media/challenge/rank.png" alt="" />
                    Platinum
                  </span>
                </div>

                <div className="row1">
                  <button className="btn">Challenge Now</button>
                </div>
              </li>
              <li>
                <div className="row1">
                  <div className="card_img">
                    {' '}
                    <div className="img"></div> Sonu sing
                  </div>{' '}
                </div>

                <div className="row1">
                  <span>
                    Game:
                    <img src="/assets/media/challenge/f.png" alt="" />
                  </span>

                  <span>
                    Rank:
                    <img src="/assets/media/challenge/rank.png" alt="" />
                    Platinum
                  </span>
                </div>

                <div className="row1">
                  <button className="btn">Challenge Now</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const response = await fetch(`${baseURL}/api/challenges`);
  const data = await response.json();

  const res = await fetch(`${baseURL}/api/all/teams`);
  const allteams = await res.json();

  return {
    props: { data, allteams }
  };
};

export default challenges;
