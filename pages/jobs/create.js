import { useState, useEffect, useMemo } from 'react';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';
import baseURL from '@utils/baseURL';
import axios from 'axios';
import countryList from 'react-select-country-list';
import 'rc-time-picker/assets/index.css';
import { toast } from 'react-toastify';

const CreateJobs = ({ user }) => {
  const [profile, setProfile] = useState([]);
  const [showbtn, setShowbtn] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [teamroles, setTeamRoles] = useState([]);

  const [state, setState] = useState({
    name: '',
    role: '',
    owner: '',
    location: '',
    startDate: '',
    endDate: '',
    salary: '',
    availPos: '',
    description: '',
    currency: ''
  });

  const options = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    //TeamRole
    axios
      .get(`${baseURL}/api/all/teamroles`)
      .then((res) => setTeamRoles(res.data));

    axios
      .get(`${baseURL}/api/profile/${user._id}`)
      .then((res) => setProfile(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let jobData = state;

    try {
      console.log(jobData);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      };
      const dt = fetch(
        `${baseURL}/api/jobs/create`,
        requestOptions
      ).then((data) => data.json());

      toast.success('Your Job has been successfully created!! ');
      // Router.push('/Discover');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  function handleChange(e) {
    if (e.target.options) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setState({ ...state, [e.target.name]: value });
    } else if (e.target.files) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  }

  const handleChangeCheck = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <>
      <MetaDash />
      <SignedHeader user={user} />
      <LeftNav user={user} />
      <div className="main_middle create_main_middle">
        <div className="white_bg ">
          <div className="create_form_box">
            <div className="left_create_form">
              <img src="/assets/media/create_left_img.jpg" />

              <div className="create_heads">
                <h1>Create a Jobs</h1>
                <p>
                  Post a free job and get the best talent that suits your
                  organization
                </p>
              </div>
            </div>

            <div className="create_tournament">
              <form onSubmit={handleSubmit}>
                <>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Job Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Job Title..."
                      name="name"
                      onChange={handleChange}
                      value={state.name}
                    />
                    <p>{formErrors.name}</p>
                  </div>

                  <div className="form-group">
                    <label for="exampleFormControlInput1">Job Type</label>
                    <select
                      name="role"
                      className="form-control"
                      onChange={handleChange}
                      value={state.role}
                    >
                      {teamroles.map((tr) =>
                        tr.role.map((rol, idx) => (
                          <option key={idx} value={rol}>
                            {rol}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <div className="form-group">
                    <label for="exampleFormControlInput1">Job Owner</label>
                    <select
                      className="game_search_result mscrollbar"
                      name="owner"
                      value={state.owner}
                      onChange={handleChange}
                    >
                      <option value="--">--</option>
                      <option value={profile.profile?.current_team?._id}>
                        {profile.profile?.current_team?.name}
                      </option>
                    </select>
                    <p>{formErrors.game}</p>
                  </div>

                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Location (Optional)
                    </label>
                    <select
                      className="game_search_result mscrollbar"
                      name="location"
                      placeholder="Select Opportunity Type..."
                      value={state.location}
                      onChange={handleChange}
                    >
                      {options.map((opt) => (
                        <>
                          <option value={opt.value}>{opt.label}</option>
                        </>
                      ))}
                    </select>
                    {/* <p>{formErrors.game}</p> */}
                  </div>

                  <div className="colm">
                    <label htmlFor="startDate">application Start Date:</label>
                    <input
                      type="date"
                      placeholder="MM/DD/YYYY"
                      name="startDate"
                      onChange={handleChange}
                      value={state.startDate}
                      className="form-control"
                    />
                  </div>

                  <div className="colm">
                    <label htmlFor="endDate">application End Date:</label>
                    <input
                      type="date"
                      placeholder="MM/DD/YYYY"
                      name="endDate"
                      onChange={handleChange}
                      value={state.endDate}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Money Included (Optional)
                    </label>
                    <div className="prize_box">
                      {' '}
                      <a href="#">
                        <img src="/assets/media/games/tournament1.png" />
                      </a>
                      <select
                        name="currency"
                        id="currency"
                        onChange={handleChange}
                        value={state.currency}
                      >
                        <option value="USD">USD($)- Dollars</option>
                        <option value="INR">INR (Rs) - Rupees</option>
                      </select>
                      <input
                        type="number"
                        className="form-control"
                        placeholder=""
                        name="salary"
                        onChange={handleChange}
                        value={state.salary}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Positions Available
                    </label>
                    <select
                      className="game_search_result mscrollbar"
                      name="availPos"
                      placeholder="Select Opportunity Type..."
                      value={state.availPos}
                      onChange={handleChange}
                      multiple={true}
                    >
                      {teamroles.map((tr) =>
                        tr.role.map((role, idx) => (
                          <option key={idx} value={role}>
                            {role}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <input
                    type="textarea"
                    onChange={handleChange}
                    name="description"
                    value={state.description}
                  />

                  <input type="submit" className="btn" value="Create Job" />
                </>
              </form>

              <button className={`btn rgtside ${showbtn ? '' : 'd-none'}`}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
      <AllScript />
      <script></script>
    </>
  );
};

export default CreateJobs;
