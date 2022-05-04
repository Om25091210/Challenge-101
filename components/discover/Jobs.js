import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import Filters from '../common/Filters';
import FileDropzone from '@components/common/FileDropzone';
import cookie from 'js-cookie';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

const Jobs = ({ user, profile, myState }) => {
  const [jobs, setJobs] = useState([]);
  const [files, setFiles] = useState([]);

  var ftype = 'JOBS';

  const mutation = useMutation(
    async (formdata) =>
      await axios.post(`${baseURL}/api/uploads/uploadfile`, formdata, {
        headers: {
          Authorization: cookie.get('token'),
          'Content-Type': 'multipart/form-data'
        }
      })
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    for (const key of Object.keys(files)) {
      formdata.append('file', files[key]);
    }
    try {
      await mutation.mutateAsync(formdata);
      toast.success('Your file has been successfully uploaded');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your upload');
    }
  };

  useEffect(() => {
    console.log(myState.filteredResults);
    if (myState.filteredResults.length > 0) {
      setJobs(myState.filteredResults);
    } else {
      axios.get(`${baseURL}/api/all/jobs`).then((res) => setJobs(res.data));
    }
  }, [myState]);

  if (jobs) {
    return (
      <div className="tab" id="jobs">
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

          <Filters filterType={'JOBS'} myState={myState} />
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
                <div className="logo_box jobs_img">
                  <a href={`jobs/${job._id}`}>
                    <img src={job.job_by?.imgUrl} alt="" />
                    <h3>{job.job_by ? job.job_by.name : 'Not Defined'}</h3>
                  </a>
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
                <FileDropzone setFiles={setFiles} />
                {files.map((file, idx) => (
                  <>
                    {' '}
                    {file.name} :{' '}
                    <a href="#!" onClick={onSubmit} className="btn btn_width">
                      APPLY NOW{' '}
                    </a>
                  </>
                ))}{' '}
              </div>
            </div>
          ))
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default Jobs;
