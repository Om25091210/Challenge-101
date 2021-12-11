import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { useForm } from 'react-hook-form';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import cookie from 'js-cookie';

const Jobs = () => {
  const [data, setData] = useState(null);

  var ftype = 'JOBS';
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseURL}/api/filters/${ftype}`);
      const newData = await response.json();
      setData(newData);
    };
    fetchData();
  }, []);

  console.log(data);

  if (data) {
    return (
      <div className="tab hide" id="jobs">
        <div className="white_bg">
          <div className="team_search">
            <div className="searchbox">
              <h3>Search</h3>
              <input type="search" value="" placeholder="Search" />
              <input type="submit" value="" />
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

          <div className="team_filter job_filter">
            <div className="drop_downs">
              {data.filter.metadata.map((filter, index) => (
                <div key={index} className="button-group">
                  <span className="drop_name">{filter.key}</span>

                  {filter.value.map((val, idx) => (
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id={val}
                      />
                      <label className="custom-control-label" for={val}></label>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="filters">
              {' '}
              <a href="#" className="close1">
                X
              </a>
              <h3>Filters</h3>
              <div className="filter_list">
                {' '}
                <span className="filter1">
                  {' '}
                  Games: Call of Duty{' '}
                  <a href="#" className="close2">
                    X
                  </a>
                </span>{' '}
                <span className="filter1">
                  {' '}
                  Category: LAN{' '}
                  <a href="#" className="close2">
                    X
                  </a>
                </span>{' '}
                <span className="filter1">
                  {' '}
                  Type: Pro{' '}
                  <a href="#" className="close2">
                    X
                  </a>
                </span>{' '}
                <span className="filter1">
                  {' '}
                  Rank: Legend{' '}
                  <a href="#" className="close2">
                    X
                  </a>
                </span>{' '}
                <span className="filter1">
                  {' '}
                  Platform: Mobile{' '}
                  <a href="#" className="close2">
                    X
                  </a>
                </span>{' '}
              </div>
            </div>
          </div>
        </div>

        <div className="team_row arena_team_row">
          <div className="inner_team">
            <div className="logo_box">
              <img src="/assets/media/discover/lxg.png" alt="" />
              <h3>AFK GAMING PVT LTD</h3>
            </div>
            <div className="mores">
              <p>
                <b>POSITION:</b> SENIOR DEVELOPER
              </p>
              <p>
                <b>EXPERIENCE:</b> 10 YEARS
              </p>
              <p>
                <b> LOCATION:</b> BANGALORE{' '}
              </p>
            </div>
            <a href="#" className="join">
              APPLY NOW
            </a>{' '}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Jobs;
