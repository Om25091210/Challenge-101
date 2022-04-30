import Filters from '../common/Filters';
import Link from 'next/link';

import axios from 'axios';
import { useState, useEffect } from 'react';
import baseURL from '@utils/baseURL';
import TeamRequest from './invites/TeamRequest';
import ReactCountryFlag from 'react-country-flag';
import FavTeam from '../team/FavTeam';
import Cookies from 'js-cookie';
import LoadingSpinner from '../LoadingSpinner';
import Moment from 'moment';
import { searchTeams } from '@utils/functionsHelper';
import { toast } from 'react-toastify';

const Teams = ({ user, profile, myState, selectedGame }) => {
  var [team, setTeam] = useState([]);
  const [sessionTeam, setSessionTeam] = useState({ key: null, value: null });
  const [favouriteTeams, setfavouriteTeams] = useState([]);
  const [showfavs, setShowFavs] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchObj, setSearchObj] = useState({
    search: '',
    filters: ''
  });
  const [filteredResults, setFilteredResults] = useState([]);
  const [status, setStatus] = useState('confirm');
  const [error, setError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const { search, filters } = searchObj;

  myState.filteredResults = filteredResults;
  myState.setFilteredResults = setFilteredResults;

  useEffect(() => {
    var sg = undefined;
    if (selectedGame != null) {
      sg = selectedGame._id;
    }

    if (myState.selectedFilters.length > 0) {
      setTeam(myState.filteredResults);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      if (sessionTeam.key === null) {
        axios.get(`${baseURL}/api/teams/teamsbygame/${sg}`).then((res) => {
          setTeam(res.data);
          setSessionTeam({ key: sg, value: team });
          setIsLoading(false);
        });
      } else {
        if (sessionTeam.key != sg) {
          axios.get(`${baseURL}/api/teams/teamsbygame/${sg}`).then((res) => {
            setTeam(res.data);
            setSessionTeam({ key: sg, value: team });
            setIsLoading(false);
          });
        } else {
          //setTeam (sessionTeam.get(sg));
        }
      }

      //myState.setFilteredResults(team);
      //console.log(team);
    }
  }, [myState, team]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/teams/favourites/team`, {
        headers: {
          Authorization: Cookies.get('token')
        }
      })
      .then((res) => {
        setfavouriteTeams(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var sdata;

  const handleChange = (e) => {
    setSearchObj((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sdata = await searchTeams(
      searchObj,
      setError,
      setFormLoading,
      toast,
      setStatus
    );
    setTeam(sdata);
    setIsLoading(false);
  };

  return (
    <div className="tab" id="teams">
      <div className="white_bg">
        <div className="team_search">
          <div className="searchbox">
            <h3>Search</h3>
            <form
              className="form w-100"
              noValidate="noValidate"
              onSubmit={handleSubmit}
            >
              <input
                type="search"
                placeholder="Search For Teams..."
                id="search"
                name="search"
                value={search}
                onChange={handleChange}
                autoComplete="off"
              />
              <input type="submit" />
            </form>
          </div>
          <div className="advance">
            <div className="views">
              <h3>ADVANCED FILTER </h3>
              EXCLUDE “ALREADY VIEWED”
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label
                  className="custom-control-label"
                  htmlFor="customCheck1"
                ></label>
              </div>
            </div>
            <h3>Favourite</h3>
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
        </div>

        <Filters
          filterType={'TEAMS'}
          myState={myState}
          selectedGame={selectedGame}
        />
      </div>
      {team.length == 0 ? (
        <div className="team_row">
          <LoadingSpinner />
        </div>
      ) : showfavs === true ? (
        favouriteTeams.map((team, idx) => (
          <div className="team_row" key={idx}>
            <FavTeam team={team} profile={profile} />
            <div className="inner_team">
              <div className="logo_box">
                {' '}
                <div className="role_pic">
                  <img src={team.imgUrl} alt="" />
                </div>
                <a href={`/team/${team._id}`}>
                  <h3>{team.name}</h3>
                </a>
                <ReactCountryFlag
                  countryCode={team.region}
                  svg
                  style={{
                    width: '2em',
                    height: '2em'
                  }}
                />
              </div>
              {team.games.length <= 0 ? (
                <p>No Game for this team</p>
              ) : (
                <>
                  <span className="logo">
                    {team.games.map((im) => (
                      <>
                        <img src={im.gameId?.imgUrl} alt="" />
                      </>
                    ))}
                  </span>
                </>
              )}
              <span className="remarks">
                <h4>ROLE:</h4>
                {team.attributes.roles.length > 0 ? (
                  <p>{team.attributes.roles}</p>
                ) : (
                  'No Role Specified'
                )}
              </span>
              <div className="mores plateform">
                {' '}
                <span>
                  {team.attributes?.platform === 'PC' ? (
                    <img src="/assets/media/discover/desk.png" alt="" />
                  ) : team.attributes?.platform === 'Console' ? (
                    <img src="/assets/media/discover/console.png" alt="" />
                  ) : team.attributes?.platform === 'Mobile' ? (
                    <img src="/assets/media/discover/mobile_game.png" alt="" />
                  ) : (
                    <p>No Platform mentioned</p>
                  )}
                </span>{' '}
                <span>
                  {team.attributes.mic ? (
                    <>
                      <img src="/assets/media/discover/mice.png" alt="" />{' '}
                      <b>On</b>
                    </>
                  ) : (
                    <>
                      {' '}
                      <img src="/assets/media/discover/mice.png" alt="" />
                      <b>Off</b>{' '}
                    </>
                  )}
                </span>{' '}
                <span>
                  <img src="/assets/media/discover/translator.png" alt="" />{' '}
                  {team.attributes?.language.length > 0 ? (
                    <>
                      {team.attributes?.language.map((tem) => (
                        <b>{tem}</b>
                      ))}
                    </>
                  ) : (
                    <p>No Language Available</p>
                  )}
                </span>{' '}
              </div>
              <TeamRequest team={team} user={user} profile={profile} />
            </div>

            <div className="overview_box">
              <h2>Team Overview</h2>
              <div className="team_overview">
                <div className="over_prof">
                  <div className="pics">
                    {' '}
                    <img src={team.imgUrl} alt="" />{' '}
                  </div>
                  <h3>{team.name}</h3>
                </div>

                <div className="ranking">
                  <h4>Ranking</h4>

                  {!team.ranks || team.ranks.length === 0 ? (
                    <p>No ranks defined..</p>
                  ) : (
                    team.ranks.map((item, index) => (
                      <div key={index} className="current_team">
                        <span className="ct">
                          {' '}
                          <i
                            className="fa fa-sort-asc"
                            aria-hidden="true"
                          ></i>{' '}
                          {item.rank}
                        </span>
                        <span className="were">{item.rankType} </span>
                      </div>
                    ))
                  )}

                  <h4>country</h4>
                  <p>
                    <ReactCountryFlag
                      countryCode={team.region}
                      svg
                      style={{
                        width: '2em',
                        height: '2em'
                      }}
                    />
                  </p>
                  <h4>Established</h4>
                  <p>{Moment(team.founded).format('MMM YYYY')}</p>
                </div>
                <div className="match">
                  <h4>Matches Played</h4>
                  <p>156 Games</p>
                  <h4>Matches Won</h4>
                  <p>131 Victories</p>
                  <h4>Manager</h4>
                  {team.employees.length !== 0 ? (
                    team.employees.map(
                      (role) =>
                        role.role === 'manager' && (
                          <p>{role.employeeId.username}</p>
                        )
                    )
                  ) : (
                    <p>Not Available</p>
                  )}
                </div>
                <div className="other">
                  <h4>From</h4>
                  <p>
                    <span className="red round"></span>{' '}
                    <span className="green round"></span>{' '}
                    <span className="red round"></span>{' '}
                  </p>
                  <h4>Trophies</h4>
                  <p>4</p>
                  <h4>Prize Earned</h4>
                  <p>USD 912.804</p>
                </div>
                <div className="percentage">
                  {' '}
                  <img
                    src="/assets/media/discover/percentage.png"
                    alt=""
                  />{' '}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        team.map((team, idx) => (
          <div className="team_row" key={idx}>
            <FavTeam team={team.team} profile={profile} />
            <div className="inner_team">
              <div className="logo_box">
                {' '}
                <div className="role_pic">
                  <img src={team.team.imgUrl} alt="" />
                </div>
                <a href={`/team/${team.team._id}`}>
                  <h3>{team.team.name}</h3>
                </a>
                <ReactCountryFlag
                  countryCode={team.team.region}
                  svg
                  style={{
                    width: '2em',
                    height: '2em'
                  }}
                />
              </div>
              {team.team.games.length <= 0 ? (
                <p>No Game for this team</p>
              ) : (
                <>
                  <span className="logo">
                    {team.team.games.map((im) => (
                      <>
                        <img src={im.gameId?.imgUrl} alt="" />
                      </>
                    ))}
                  </span>
                </>
              )}
              <span className="remarks">
                <h4>ROLE:</h4>
                {team.team.attributes.roles.length > 0 ? (
                  <p>{team.team.attributes.roles}</p>
                ) : (
                  'No Role Specified'
                )}
              </span>
              <div className="mores plateform">
                {' '}
                <span>
                  {team.team.attributes?.platform === 'PC' ? (
                    <img src="/assets/media/discover/desk.png" alt="" />
                  ) : team.team.attributes?.platform === 'Console' ? (
                    <img src="/assets/media/discover/console.png" alt="" />
                  ) : team.team.attributes?.platform === 'Mobile' ? (
                    <img src="/assets/media/discover/mobile_game.png" alt="" />
                  ) : (
                    <p>No Platform mentioned</p>
                  )}
                </span>{' '}
                <span>
                  {team.team.attributes.mic ? (
                    <>
                      <img src="/assets/media/discover/mice.png" alt="" />{' '}
                      <b>On</b>
                    </>
                  ) : (
                    <>
                      {' '}
                      <img src="/assets/media/discover/mice.png" alt="" />
                      <b>Off</b>{' '}
                    </>
                  )}
                </span>{' '}
                <span>
                  <img src="/assets/media/discover/translator.png" alt="" />{' '}
                  {team.team.attributes?.language.length > 0 ? (
                    <>
                      {team.team.attributes?.language.map((tem) => (
                        <b>{tem}</b>
                      ))}
                    </>
                  ) : (
                    <p>No Language Available</p>
                  )}
                </span>{' '}
              </div>
              <TeamRequest team={team.team} user={user} profile={profile} />
            </div>

            <div className="overview_box">
              <h2>Team Overview</h2>
              <div className="team_overview">
                <div className="over_prof">
                  <div className="pics">
                    {' '}
                    <img src={team.team.imgUrl} alt="" />{' '}
                  </div>
                  <h3>{team.team.name}</h3>
                </div>

                <div className="ranking">
                  <h4>Ranking</h4>

                  {!team.team.ranks || team.team.ranks.length === 0 ? (
                    <p>No ranks defined..</p>
                  ) : (
                    team.team.ranks.map((item, index) => (
                      <div key={index} className="current_team">
                        <span className="ct">
                          {' '}
                          <i
                            className="fa fa-sort-asc"
                            aria-hidden="true"
                          ></i>{' '}
                          {item.rank}
                        </span>
                        <span className="were">{item.rankType} </span>
                      </div>
                    ))
                  )}

                  <h4>country</h4>
                  <p>
                    <ReactCountryFlag
                      countryCode={team.team.region}
                      svg
                      style={{
                        width: '2em',
                        height: '2em'
                      }}
                    />
                  </p>
                  <h4>Established</h4>
                  <p>{Moment(team.team.founded).format('MMM YYYY')}</p>
                </div>
                <div className="match">
                  <h4>Matches Played</h4>
                  <p>156 Games</p>
                  <h4>Matches Won</h4>
                  <p>131 Victories</p>
                  <h4>Manager</h4>
                  {team.team.employees.length !== 0 ? (
                    team.team.employees.map(
                      (role) =>
                        role.role === 'manager' && (
                          <p>{role.employeeId.username}</p>
                        )
                    )
                  ) : (
                    <p>Not Available</p>
                  )}
                </div>
                <div className="other">
                  <h4>From</h4>
                  <p>
                    <span className="red round"></span>{' '}
                    <span className="green round"></span>{' '}
                    <span className="red round"></span>{' '}
                  </p>
                  <h4>Trophies</h4>
                  <p>4</p>
                  <h4>Prize Earned</h4>
                  <p>USD 912.804</p>
                </div>
                <div className="percentage">
                  {' '}
                  <img
                    src="/assets/media/discover/percentage.png"
                    alt=""
                  />{' '}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Teams;
