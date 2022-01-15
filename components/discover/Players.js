import Filters from '../common/Filters';
import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import cookie from 'js-cookie';

const Players = ({ user, profile , myState}) => {
  const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
    console.log(myState.filteredResults);
    if (myState.filteredResults.length > 0 ){
      setPlayerData(myState.filteredResults);
     } else { 
      axios.get(`${baseURL}/api/player`).then((res) => setPlayerData(res.data));
     }

    console.log(playerData);
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

        <Filters filterType={'PLAYERS'} myState={myState}/>
      </div>

      {playerData.map((plyr) => (
        <div className="team_row">
          <div className="stars">
            <i className="fa fa-star" aria-hidden="true"></i>
          </div>
          <div className="inner_team">
            <div className="logo_box">
              {' '}
              <img src="/assets/media/discover/team1.png" alt="" />
              <h3>{plyr.players ? plyr.players.nickName : 'No nickname'}</h3>
              <img src="/assets/media/discover/country.png" alt="" />{' '}
            </div>
            <span className="logo">
              <img src="/assets/media/discover/apex.png" alt="" />
            </span>{' '}
            <span className="remarks">
              <h4>ROLE</h4>
              <p>Support Scout Sniper Driver Fragger Ingame leader</p>
            </span>
            <div className="mores">
              {' '}
              <span>
                <img src="/assets/media/discover/desk.png" alt="" />
              </span>{' '}
              <span>
                <img src="/assets/media/discover/mice.png" alt="" /> <b>On</b>
              </span>{' '}
              <span>
                <img src="/assets/media/discover/translator.png" alt="" />{' '}
                <b>EN, HI</b>
              </span>{' '}
            </div>
            <a href="#" className="join">
              REQUEST TO JOIN
            </a>{' '}
          </div>

          <div className="overview_box">
            <h2>Players Overview</h2>
            <div className="team_overview">
              <div className="over_prof">
                <div className="pics">
                  {' '}
                  <img src="/assets/media/discover/team1.png" alt="" />{' '}
                </div>
                <h3>{plyr.players ? plyr.players.nickName : 'no nickname'}</h3>
              </div>

              <div className="ranking">
                <h4>Past Team</h4>
                <div className="past">
                  <img src="/assets/media/discover/icon1.png" alt="" />{' '}
                  <b>{plyr.team ? plyr.team.map((tm) => tm.name) : 'NO TEAM'}</b>{' '}
                  <img src="/assets/media/discover/country.png" alt="" />{' '}
                </div>
                <h4>MMR Rating</h4>
                <p>4790</p>
                <h4>Experience:</h4>
                <p>Local Lans, Competitive</p>
              </div>
              <div className="match">
                <h4>Matches Played</h4>
                <p>{plyr.players ? plyr.players.total_games_played : '0'} Games</p>
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
      ))}
    </div>
  );
};

export default Players;
