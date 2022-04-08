import baseURL from '@utils/baseURL';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const TeamJobs = ({ jobs, team, isTeamPlayer }) => {
  const [showform, setShowForm] = useState(false);
  const [jobdata, setJobData] = useState({
    position: '',
    experience: '',
    location: '',
    languages: '',
    job_role: ''
  });

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const onChange = (e) => {
    setJobData({ ...jobdata, [e.target.name]: e.target.value });
  };

  const toggleShowform = () => {
    if (showform) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };
  const handleEditStat = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${baseURL}/api/jobs/${team._id}`, jobdata, {
        headers: {
          Authorization: cookie.get('token'),
          'Content-Type': 'application/json'
        }
      });
      toast.success('Tournament Stats has added.');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshData();
  };
  return (
    <>
      {isTeamPlayer ? (
        <button onClick={toggleShowform} className="btn">
          Add Job
        </button>
      ) : null}
      {showform ? (
        <>
          <form>
            <div>
              <input
                type="text"
                placeholder="Enter Position"
                name="position"
                value={jobdata.position}
                onChange={onChange}
              ></input>
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter experience"
                name="experience"
                value={jobdata.experience}
                onChange={onChange}
              ></input>
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter Location"
                name="location"
                onChange={onChange}
                value={jobdata.location}
              ></input>
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter Language"
                name="languages"
                onChange={onChange}
                value={jobdata.languages}
              ></input>
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter Job Role"
                name="job_role"
                value={jobdata.job_role}
                onChange={onChange}
              ></input>
            </div>
            <button onClick={(e) => handleEditStat(e)} className="btn">
              Confirm
            </button>
          </form>
        </>
      ) : null}
      {jobs.length === 0 ? (
        <p>No Jobs defined...</p>
      ) : (
        jobs.map((job, index) => (
          <div className="team_row arena_team_row" key={index}>
            <div className="inner_team">
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
              <div className="mores">
                <p>
                  <b>POSITION:</b> {job.position}
                </p>
                <p>
                  <b>EXPERIENCE:</b> {job.experience}
                </p>
                <p>
                  <b> LOCATION:</b>

                  {job.location}
                </p>
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
