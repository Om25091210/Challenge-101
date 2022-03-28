import Filters from '../common/Filters';
import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import cookie from 'js-cookie';
import ReactCountryFlag from 'react-country-flag';

const Players = ({ user, profile, myState, selectedGame }) => {
  const [playerData, setPlayerData] = useState([]);
  const [sessionPlayer, setSessionPlayer] = useState({
    key: null,
    value: null
  });

  useEffect(() => {
    var sg = undefined;
    if (selectedGame != null) {
      sg = selectedGame._id;
    }

    if (myState.selectedFilters.length > 0) {
      setPlayerData(myState.filteredResults);
    } else {
      if (sessionPlayer.key === null) {
        axios.get(`${baseURL}/api/player/playersbygame/${sg}`).then((res) => {
          setPlayerData(res.data);
          setSessionPlayer({ key: sg, value: res.data });
        });
      } else {
        if (sessionPlayer.key != sg) {
          axios.get(`${baseURL}/api/player/playersbygame/${sg}`).then((res) => {
            setPlayerData(res.data);
            setSessionPlayer({ key: sg, value: res.data });
          });
        } else {
          //setPlayerData (sessionPlayer.get(sg));
        }
      }

      //myState.setFilteredResults(team);
      //console.log(team);
    }
  }, [myState, playerData]);

  return (
    <div className="tab" id="players">
      <div className="white_bg">
        <div className="team_search">
          <div className="searchbox">
            <h3>Search</h3>
            <input type="search" placeholder="Search" />
            <input type="submit" />
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
              />
              <label
                className="custom-control-label"
                htmlFor="customSwitch1"
              ></label>
            </div>
          </div>
        </div>

        <Filters
          filterType={'PLAYERS'}
          myState={myState}
          selectedGame={selectedGame}
        />
      </div>

      {playerData.length == 0 ? (
        <div className="team_row">
          {' '}
          <p>No results for the selected criteria. Please refine.</p>
        </div>
      ) : (
        playerData.map((plyr, idx) => (
          <div className="team_row" key={idx}>
            <div className="stars">
              <i className="fa fa-star" aria-hidden="true"></i>
            </div>
            <div className="inner_team">
              <div className="logo_box">
                {' '}
                {plyr.players.imgUrl ? (
                  <img
                    src={plyr.players.imgUrl}
                    alt=""
                    style={{ width: '150px' }}
                  />
                ) : (
                  ''
                )}
                <a href="#!">
                  <h3>{plyr.players ? plyr.players.name : 'No nickname'}</h3>
                </a>
                <ReactCountryFlag
                  countryCode={plyr.players?.nationality}
                  svg
                  style={{
                    width: '2em',
                    height: '2em'
                  }}
                />
              </div>
              <>
                <span className="logo">
                  <img
                    src={plyr.players.current_videogame?.imgUrl}
                    alt="NO GAME"
                  />
                </span>{' '}
              </>
              <span className="remarks">
                <h4>ROLE</h4>
                <p>Support Scout Sniper Driver Fragger Ingame leader</p>
              </span>
              <div className="mores">
                {' '}
                <span>
                  {plyr.players.attributes?.platform === 'PC' ? (
                    <img src="/assets/media/discover/desk.png" alt="" />
                  ) : plyr.players.attributes?.platform === 'Console' ? (
                    <img src="/assets/media/discover/console.png" alt="" />
                  ) : plyr.players.attributes?.platform === 'Mobile' ? (
                    <img src="/assets/media/discover/mobile_game.png" alt="" />
                  ) : (
                    <p>No Platform mentioned</p>
                  )}
                </span>{' '}
                <span>
                  <img src="/assets/media/discover/mice.png" alt="" /> <b>On</b>
                </span>{' '}
                <span>
                  <img src="/assets/media/discover/translator.png" alt="" />{' '}
                  {plyr.players.attributes?.language.length > 0 ? (
                    <>
                      {plyr.players.attributes?.language.map((tem) => (
                        <b>{tem}</b>
                      ))}
                    </>
                  ) : (
                    <p>No Language Available</p>
                  )}
                </span>{' '}
              </div>
              <a href="#" className="join">
                Invite to team
              </a>{' '}
            </div>

            <div className="overview_box">
              <h2>Players Overview</h2>
              <div className="team_overview">
                <div className="over_prof">
                  <div className="pics">
                    {' '}
                    {plyr.players.current_team ? (
                      <img src={plyr.players.current_team.image_url} alt="" />
                    ) : (
                      <img src="/assets/media/discover/team1.png" alt="" />
                    )}{' '}
                  </div>
                  <h3>
                    {plyr.players ? plyr.players.nickName : 'no nickname'}
                  </h3>
                </div>

                <div className="ranking">
                  <h4>Current Team</h4>
                  <div className="past">
                    <img src="/assets/media/discover/icon1.png" alt="" />{' '}
                    <b>
                      {plyr.players.current_team
                        ? plyr.players.current_team.name
                        : 'NO TEAM'}
                    </b>{' '}
                    <ReactCountryFlag
                      countryCode={plyr.players?.nationality}
                      svg
                      style={{
                        width: '2em',
                        height: '2em'
                      }}
                    />
                  </div>
                  <h4>MMR Rating</h4>
                  <p>4790</p>
                  <h4>Experience:</h4>
                  <p>Local Lans, Competitive</p>
                </div>
                <div className="match">
                  <h4>Matches Played</h4>
                  <p>
                    {plyr.players ? plyr.players.total_games_played : '0'} Games
                  </p>
                  <h4>Matches Won</h4>
                  <p>{plyr.players ? plyr.players.won : '0'} Victories</p>
                  <h4>Trophies</h4>
                  <p>78</p>
                </div>
                <div className="percentage">
                  {' '}
                  <img
                    src="/assets/media/discover/chart.png"
                    style={{ width: '400px' }}
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

export default Players;
