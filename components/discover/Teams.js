import Filters from '../common/Filters';

import axios from 'axios';
import { useState, useEffect } from 'react';
import baseURL from '@utils/baseURL';

const Teams = ({ user }) => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/api/teams`).then((res) => setTeam(res.data));
  }, []);

  return (
    <div className="tab" id="teams">
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

        <Filters ftype={'TEAMS'} />
      </div>

      {team.map((team) => (
        <div className="team_row">
          <div className="stars">
            <i className="fa fa-star" aria-hidden="true"></i>
          </div>
          <div className="inner_team">
            <div className="logo_box">
              {' '}
              <img src="/assets/media/discover/team1.png" alt="" />
              <h3>{team.team.name}</h3>
              <img
                src="/assets/media/discover/country.png"
                alt={team.team.name}
              />{' '}
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
        </div>
      ))}

      <div className="overview_box">
        <div className="team_row">
          <div className="stars disable">
            <i className="fa fa-star" aria-hidden="true"></i>
          </div>
          <div className="inner_team">
            <div className="logo_box">
              {' '}
              <img src="/assets/media/discover/team1.png" alt="" />
              <h3>Kingsmen</h3>
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
        </div>
        <h2>Team Overview</h2>
        <div className="team_overview">
          <div className="over_prof">
            <div className="pics"> </div>
            <h3>The Lone Wolves</h3>
          </div>

          <div className="ranking">
            <h4>Ranking</h4>
            <div>
              <span>
                <i className="fa fa-sort-asc" aria-hidden="true"></i> 58
              </span>
              Country
            </div>
            <div>
              <span>
                <i className="fa fa-sort-asc" aria-hidden="true"></i> 4219
              </span>
              Worldwide
            </div>
            <h4>country</h4>
            <p>
              <img src="/assets/media/discover/country.png" alt="" />
            </p>
            <h4>Established</h4>
            <p>March 2007</p>
          </div>
          <div className="match">
            <h4>Matches Played</h4>
            <p>156 Games</p>
            <h4>Matches Won</h4>
            <p>131 Victories</p>
            <h4>Manager</h4>
            <p>Sonu "TheMadTitan" Singh</p>
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
            <img src="/assets/media/discover/percentage.png" alt="" />{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
