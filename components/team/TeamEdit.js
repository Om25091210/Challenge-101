import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import countryList from 'react-select-country-list';
import { toast } from 'react-toastify';
import baseURL from '../../utils/baseURL';
import { teamEditFormValidate } from '@utils/valid';
import TeamAbtAdd from './TeamAbtAdd';
import Moment from 'moment';

const TeamEdit = ({ isAdmin, isManager, team }) => {
  const [allarena, setAllarena] = useState([]);
  const [empData, setEmpData] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [states, setStates] = useState({
    teamname: team.name,
    founded: Moment(team.founded).format('yyyy-MM-DD'),
    about: team.description,
    emp: empData,
    arena: '',
    region: team.region
  });

  useEffect(() => {
    axios.get(`${baseURL}/api/arenas/`).then((res) => setAllarena(res.data));
  }, []);

  const options = useMemo(() => countryList().getData(), []);

  const handleChangeCheck = (e) => {
    setStates({ ...states, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    if (e.target.options) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setStates({ ...states, [e.target.name]: value });
    } else if (e.target.files) {
      console.log(e.target.files[0]);
      setStates({ ...states, [e.target.name]: e.target.files[0] });
    } else {
      setStates({ ...states, [e.target.name]: e.target.value });
    }
  }

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleTeamEdit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      try {
        axios.put(`${baseURL}/api/teams/edit/${team?._id}`, states);
        toast.success('teams Updated');
        $('a.model_close').parent().removeClass('show_model');
      } catch (err) {
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
      refreshData();
    }
  };

  return (
    <>
      <div className="loc_box edit_pof">
        {isAdmin || isManager ? (
          <a href="#!" className="model_show_btn">
            <button className="btn">
              {' '}
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
              Team Edit
            </button>
          </a>
        ) : null}
        <div className="common_model_box edit_profile" id="big_poup">
          <a href="#!" className="model_close">
            X
          </a>
          <div className="inner_model_box">
            <div className="add_job_height">
              <h3>Team Edit</h3>
              <form className="common_form" onSubmit={handleTeamEdit}>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Team name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="teamname"
                    onChange={handleChangeCheck}
                    value={states.teamname}
                  />
                  <p>{formErrors.teamName}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Founded</label>
                  <input
                    type="date"
                    className="form-control"
                    name="founded"
                    onChange={handleChangeCheck}
                    value={states.founded}
                  />
                  <p>{formErrors.Tfounded}</p>
                </div>
                <div className="form-group textarea">
                  <label htmlFor="exampleFormControlInput1">About Us</label>
                  <input
                    type="textarea"
                    className="form-control"
                    name="about"
                    onChange={handleChangeCheck}
                    value={states.about}
                  />
                  <p>{formErrors.Tabout}</p>
                </div>

                <TeamAbtAdd role="Manager" rolesData={empData} />
                <TeamAbtAdd role="Coach" rolesData={empData} />

                <div className="form-group">
                  <label htmlFor="search">Arena</label>
                  <select
                    name="arena"
                    value={states.arena}
                    onChange={handleSubmit}
                    multiple={true}
                  >
                    <option value="--">--</option>
                    {allarena &&
                      allarena.map((are) => (
                        <option value={are._id}>{are.name}</option>
                      ))}
                  </select>
                </div>

                <div className="colm rows">
                  <label htmlFor="search">Country</label>
                  <select
                    className="form-control text-capitalize"
                    name="region"
                    value={states.region}
                    onChange={handleChangeCheck}
                  >
                    <option value="">--</option>
                    {options.map((opt) => (
                      <>
                        <option value={opt.value}>{opt.label}</option>
                      </>
                    ))}
                  </select>
                  <p>{formErrors.Tregion}</p>
                </div>

                <button
                  className="btn"
                  onClick={() => setFormErrors(teamEditFormValidate(states))}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
          <div className="overlay"></div>
        </div>
      </div>
    </>
  );
};

export default TeamEdit;