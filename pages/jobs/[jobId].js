import MetaDash from '@components/MetaDash';
import baseURL from '../../utils/baseURL';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';

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
                <i class="fa fa-briefcase" aria-hidden="true"></i> :{' '}
                {data.experience} Years
              </span>
              <span>
                <i class="fa fa-map-marker" aria-hidden="true"></i>{' '}
                {data.location.map((loc) => (
                  <b>{loc}</b>
                ))}
              </span>
              <span>
                <i class="fa fa-money" aria-hidden="true"></i> Not Disclosed
              </span>
              <span>
                {' '}
                Status: {data.status ? 'Available' : 'Closed'}
                {/* {data.languages.map((lan) => (
          <b> Languages: {lan} </b>
        ))} */}
              </span>
            </div>

            <p className="emp_type">Employment Type : Full Time, Permanent</p>

            <h2>Job Description</h2>

            <ul>
              <li>
                {' '}
                Contribute to implementing highly efficient applications, with
                focus on code quality and performance.
              </li>
              <li>
                {' '}
                Implement quality code with focus on reusability and good code
                coverage.
              </li>
              <li> Be a part of Agile teams and help deliver sprint goals.</li>
              <li>
                {' '}
                Collaborating with scrum masters and project managers to
                identify and mitigate risks, issues, as well as to find
                innovative ways to improve the application development.
              </li>
              <li> Embrace emerging technologies and solutions to ensure ou</li>
            </ul>

            <h2>Desired Candidate Profile</h2>

            <ul>
              <li> 4-9 years of experience in UI/frontend development.</li>
              <li>
                {' '}
                Sound knowledge of front-end development languages, tools and
                methodologies HTML5, CSS3, JavaScript and associated
                technologies and toolsets (e.g. jQuery, Sass)
              </li>
              <li>
                {' '}
                Hands-on experience of using a front-end development framework,
                such as <strong>Angular, React or Vue</strong>. Our preference
                is Angular, but experience in any of them is a plus.
              </li>
              <li>
                {' '}
                Able to write front-end code that is cross-browser and
                cross-device friendly, through responsive or adaptive techniques
                is essential.
              </li>
              <li> Delivery of small complete changes at high cadence.</li>
              <li>
                {' '}
                Experience using Continuous Integration (CI) / Continuous
                Delivery (CD) systems for development and deployment.
              </li>
              <li> Proven knowledge of Behavioral Driven Development (BDD).</li>
              <li> Proven knowledge of Test Driven Development (TDD).</li>
            </ul>

            <h2>Education</h2>

            <div class="details">
              <label>UG :</label>
              <span class="">B.Tech/B.E. in Any Specialization</span>
            </div>
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
