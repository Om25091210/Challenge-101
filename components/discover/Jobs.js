import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import Filters from '../common/Filters';

const Jobs = () => {
  const [data, setData] = useState(null);
  const [jobs, setJobs] = useState(null);

  var ftype = 'JOBS';
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseURL}/api/filters/${ftype}`);
      const newData = await response.json();
      setData(newData);

      var res = await fetch(`${baseURL}/api/all/jobs`);
      var ndata = await res.json();
      setJobs(ndata);
    };
    fetchData();
  }, []);

  if (data) {
    return (
      <div className="tab hide" id="jobs">
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

        <Filters ftype={'JOBS'} />
        </div>


{!jobs || jobs.length === 0 ? (

        <div className="team_row arena_team_row">
          <div className="inner_team">
            No active jobs found. Please visit later.
          </div>
        </div>

  ) : (
       jobs.map((job, idx) => ( 
        <div className="team_row arena_team_row" key={idx}>
          <div className="inner_team">
            <div className="logo_box">
              <img src="/assets/media/discover/lxg.png" alt="" />
              <h3>{job.job_by.name}</h3>
            </div>
            <div className="mores">
              <p>
                <b>POSITION:</b> {job.position}
              </p>
              <p>
                <b>EXPERIENCE:</b> {job.experience}
              </p>
              <p>
                <b> LOCATION:</b> {job.location}
              </p>
            </div>
            <a href="#" className="join">
              APPLY NOW
            </a>{' '}
          </div>
        </div>

   ) )) }


      </div>
    );
  } else {
    return null;
  }
};

export default Jobs;
