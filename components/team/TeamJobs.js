import baseURL from '@utils/baseURL';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import TeamJobCreate from './TeamJobCreate';
import ReactCountryFlag from 'react-country-flag';

const TeamJobs = ({ jobs, team, isManager, isAdmin, user, profile }) => {
  return (
    <>
      <span>
        <div className="loc_box">
          {' '}
          {isManager || isAdmin ? (
            <a href="#!" className="model_show_btn">
              <button className="btn">
                <i className="fa fa-plus-circle" aria-hidden="true"></i> Add
                Jobs
              </button>
            </a>
          ) : null}
          <div className="common_model_box" id="big_poup">
            <a href="#!" className="model_close">
              X
            </a>

            <div className="inner_model_box">
              <h3>Job Detail's</h3>

              <div className="add_jobs_height">
                <TeamJobCreate user={user} profile={profile} />
              </div>
            </div>
            <div className="overlay"></div>
          </div>
        </div>
      </span>

      {jobs.length === 0 ? (
        <p>No Jobs defined...</p>
      ) : (
        jobs.map((job, index) => (
          <div className="team_row arena_team_row" key={index}>
            <div className="inner_team">
              <div className="mores jobss">
                <h3>{job.job_type}</h3>

                <p>
                  <b>EXPERIENCE: -- </b>
                </p>
                <p>
                  <b> LOCATION:</b>
                  <p>{job.location?.name}</p>
                  <ReactCountryFlag
                    countryCode={job.location?.iso}
                    svg
                    style={{
                      width: '2em',
                      height: '2em'
                    }}
                  />
                </p>
                <p>
                  <b>Salary:</b>
                  {job.salary === 0 ? (
                    'Not Disclosed'
                  ) : (
                    <>
                      {job.currency} {job.salary}{' '}
                    </>
                  )}
                </p>
              </div>
              <div className="logo_box">
                <img
                  src={
                    job.job_owner.imgUrl != ''
                      ? job.job_owner.imgUrl
                      : '/assets/media/discover/lxg.png'
                  }
                  className="thumb_img"
                  alt=""
                />
                <h3>{job.job_owner.name}</h3>
              </div>
              <a href={`/jobs/${job._id}`} className="join">
                APPLY NOW
              </a>{' '}
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default TeamJobs;
