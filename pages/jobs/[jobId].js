import MetaDash from '@components/MetaDash';
import baseURL from '../../utils/baseURL';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';
import { MPNumberFormat } from '@utils/helpers';

const Job = ({ data, user }) => {
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} />

      <LeftNav user={user} />
      <div className="main_middle profile_middle">
        <div className="jobs_box">
          <div className="left_jobs">
            <h1>
              {' '}
              {data.position} - {data.job_role}
            </h1>

            <div className="job_profile1">
              <span>
                <i className="fa fa-briefcase" aria-hidden="true"></i> :{' '}
                {data?.experience_start} - {data?.experience_end} Years
              </span>
              <span>
                <i className="fa fa-map-marker" aria-hidden="true"></i>{' '}
                {data.location.map((loc) => (
                  <b>{loc}</b>
                ))}
              </span>
              <i className="fa fa-money" aria-hidden="true"></i>
              <span className="">
                {data.salary_start === '0' || data.salary_end === '0'
                  ? 'Not Disclosed'
                  : (
                      <MPNumberFormat
                        value={
                          data.salary_start
                            ? data.salary_start
                            : 'Not Disclosed'
                        }
                        currency={data.currency}
                      />
                    ) -
                    (
                      <MPNumberFormat
                        value={
                          data.salary_end ? data.salary_end : 'Not Disclosed'
                        }
                        currency={data.currency}
                      />
                    )}
              </span>
              <span>
                {' '}
                Status: {data.status ? 'Available' : 'Closed'}
                {/* {data.languages.map((lan) => (
          <b> Languages: {lan} </b>
        ))} */}
              </span>
            </div>

            <p className="emp_type">Employment Type : {data.employment_type}</p>

            <h2>Job Description</h2>

            <ul>{data?.job_description}</ul>

            <h2>Desired Candidate Profile</h2>

            {data?.candidate_profile}

            <h2>Education</h2>

            <div className="details">{data?.education}</div>
          </div>

          <div className="right_job">
            <h1> About Company</h1>

            <div className="logo">
              <img src="/assets/media/flip-kart.png" />
            </div>

            <p>Flipkart internet Private Limited</p>

            <div className="address_box">
              <h3>Company about info</h3>
              <div className="address">
                <h4>Address</h4>
                <p>
                  {' '}
                  Alyssa, Begonia
                  <br />
                  Clover,SyNo.12/4,12/6 to,
                  <br />
                  Bangalore, Karnataka, India
                </p>
              </div>
            </div>

            <button className="btn">Apply On Comapany Site</button>
          </div>
        </div>
      </div>
      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { jobId } = context.params;
  try {
    const response = await fetch(`${baseURL}/api/jobs/${jobId}`);
    const data = await response.json();
    return {
      props: { data }
    };
  } catch {
    return {
      props: {}
    };
  }
};

export default Job;
