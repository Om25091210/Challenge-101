import baseURL from '@utils/baseURL';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import TeamJobCreate from './TeamJobCreate';

const TeamJobs = ({ jobs, team, isManager, isAdmin, user, profile }) => {
  return (
    <>
      <span>
        <div className="loc_box">
          {' '}
          {isManager || isAdmin ? (
            <a href="#!" className="model_show_btn">
              <button className="btn">
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
              </button>
            </a>
          ) : null}
          <div className="common_model_box">
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
                <h3>{job.position}</h3>

                <p>
                  <b>EXPERIENCE:</b> {job.experience_start} -{' '}
                  {job.experience_end} Years
                </p>
                <p>
                  <b> LOCATION:</b>
                  {job.location}
                </p>
                <p>
                  <b>Salary:</b> Not Disclosed
                </p>
              </div>
              <div className="logo_box">
                <img
                  src={
                    team.imgUrl != ''
                      ? team.imgUrl
                      : '/assets/media/discover/lxg.png'
                  }
                  className="thumb_img"
                  alt=""
                />
                <h3>{team.name}</h3>
              </div>
              <a href="#" className="join">
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
