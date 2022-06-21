import baseURL from '@utils/baseURL';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const TeamJobs = ({ jobs, team, isManager, isAdmin }) => {
  const [showform, setShowForm] = useState(false);
  const [jobdata, setJobData] = useState({
    position: '',
    experience_start: 0,
    experience_end: 0,
    location: '',
    // languages: '',
    job_role: '',
    currency: '',
    salary_start: 0,
    salary_end: 0,
    employment_type: '',
    job_description: '',
    candidate_profile: '',
    education: ''
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
      toast.success('Your job is created Successfully');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshData();
  };

  let previousLength = 0;

  const handleInput = (e) => {
    const bullet = '\u2022';
    const newLength = e.target.value.length;
    const characterCode = e.target.value.substr(-1).charCodeAt(0);

    if (newLength > previousLength) {
      if (characterCode === 10) {
        e.target.value = `${e.target.value}${bullet} `;
      } else if (newLength === 1) {
        e.target.value = `${bullet} ${e.target.value}`;
      }
    }

    previousLength = newLength;
  };
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
                <form className="common_form">
                  <div className="form-group form_flex mr20">
                    <div className="colm">
                      <label htmlFor="position">Position:</label>
                      <input
                        type="text"
                        placeholder="Enter Position"
                        name="position"
                        value={jobdata.position}
                        onChange={onChange}
                      ></input>
                    </div>

                    <div className="colm">
                      <label htmlFor="job_role">Job Role:</label>
                      <input
                        type="text"
                        placeholder="Enter Job Role"
                        name="job_role"
                        value={jobdata.job_role}
                        onChange={onChange}
                      ></input>
                    </div>

                    <div className="colm">
                      <label htmlFor="experience_start">
                        Minimun Experience:
                      </label>
                      <input
                        type="number"
                        placeholder="Enter experience"
                        name="experience_start"
                        value={jobdata.experience_start}
                        onChange={onChange}
                        className="form-control"
                      />
                    </div>

                    <div className="colm">
                      <label htmlFor="experience_end">
                        Maximum Experience:
                      </label>
                      <input
                        type="number"
                        placeholder="Enter experience"
                        name="experience_end"
                        value={jobdata.experience_end}
                        onChange={onChange}
                        className="form-control"
                      />
                    </div>
                    <div className="colm">
                      <label htmlFor="location">Location:</label>
                      <input
                        type="text"
                        placeholder="Enter Location"
                        name="location"
                        onChange={onChange}
                        value={jobdata.location}
                      ></input>
                    </div>
                    <div className="colm">
                      <label htmlFor="location">Currency:</label>
                      <select
                        name="currency"
                        id="currency"
                        onChange={onChange}
                        value={jobdata.currency}
                      >
                        <option value="USD">USD($)- Dollars</option>
                        <option value="INR">INR (Rs) - Rupees</option>
                      </select>
                    </div>
                    <div className="colm">
                      <label htmlFor="salary_start">Minimum Salary:</label>
                      <input
                        type="number"
                        placeholder="Enter min Salary"
                        name="salary_start"
                        onChange={onChange}
                        value={jobdata.salary_start}
                        className="form-control"
                      />
                    </div>
                    <div className="colm">
                      <label htmlFor="salary_end">Maximum Salary:</label>
                      <input
                        type="number"
                        placeholder="Enter max Salary"
                        name="salary_end"
                        onChange={onChange}
                        value={jobdata.salary_end}
                        className="form-control"
                      />
                    </div>

                    <div className="colm">
                      <label htmlFor="employment_type">Employement type:</label>
                      <select
                        name="employment_type"
                        placeholder="Employement Type"
                        className="form-control"
                        value={jobdata.employment_type}
                        onChange={onChange}
                      >
                        <option value="--">--</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Permanent">Pernament</option>
                        <option value="Part Time">Part Time</option>
                      </select>
                    </div>
                    <div className="colm">
                      <label htmlFor="job_description">Job Description:</label>
                      <textarea
                        onInput={(e) => handleInput(e)}
                        rows="10"
                        name="job_description"
                        value={jobdata.job_description}
                        onChange={onChange}
                        placeholder="Job Description"
                      ></textarea>
                    </div>
                    <div className="colm">
                      <label htmlFor="candidate_profile">
                        Candidate Profile
                      </label>
                      <textarea
                        onInput={(e) => handleInput(e)}
                        rows="10"
                        name="candidate_profile"
                        value={jobdata.candidate_profile}
                        onChange={onChange}
                        placeholder="Candidate Profile"
                      ></textarea>
                    </div>
                    <div className="colm">
                      <label htmlFor="education">Education:</label>
                      <input
                        type="text"
                        placeholder="Enter Education Qualifications"
                        name="education"
                        onChange={onChange}
                        value={jobdata.education}
                      />
                    </div>
                    <button onClick={(e) => handleEditStat(e)} className="btn">
                      Confirm
                    </button>
                  </div>
                </form>
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
