import Filters from '../common/Filters';
import baseURL from '@utils/baseURL';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Arenas = ({ user }) => {
  const [arenas, setArenas] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/api/arenas`).then((res) => setArenas(res.data));
  }, []);

  return (
    <div className="tab hide" id="arenas">
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

        <Filters ftype={'ARENAS'} />
      </div>

      {arenas.map((ara, idx) => (
        <div className="team_row arena_team_row" key={idx}>
          <div className="inner_team">
            <div className="logo_box">
              <div className="role_pic">
                {' '}
                <img src={ara.logoUrl} alt="" />
              </div>
              <h3>
                {' '}
                {ara.name}{' '}
                <b>
                  <i className="fa fa-map-marker" aria-hidden="true"></i>{' '}
                  {ara.location}
                </b>
              </h3>
              <p></p>
            </div>
            <span className="remarks">
              <img src="/assets/media/discover/logos.png" alt="" />
            </span>
            <div className="mores">
              <span>
                <img src="/assets/media/discover/icons.png" alt="" />
              </span>
            </div>
            <a href="#" className="join">
              Book Seats
            </a>{' '}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Arenas;
