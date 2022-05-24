import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import TeamAboutEdit from './TeamAboutEdit';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';

const TeamAbout = ({ tmdata, isManager }) => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState({
    employee: '',
    role: ''
  });
  const [teamroles, setTeamRoles] = useState([]);
  const [showform, setShowForm] = useState(false);
  const [desc, setDesc] = useState(
    tmdata.about ? tmdata.about.description : null
  );

  const { data, isLoading, isSuccess } = useQuery(
    ['search', searchText],
    async () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      const promise = await axios.get(`${baseURL}/api/search/${searchText}`, {
        cancelToken: source.token
      });

      promise.cancel = () => {
        source.cancel();
      };

      return promise.data;
    },
    {
      enabled: !!searchText
    }
  );

  function handleChangeAbt(e) {
    setResults({ ...results, [e.target.name]: e.target.value });
  }
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const toggleShowform = () => {
    if (showform) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };

  const onChange = (e) => {
    setDesc(e.target.value);
  };

  const addingDesc = async () => {
    const res = await fetch(`${baseURL}/api/teams/desc/${tmdata._id}`, {
      method: 'PUT',
      body: JSON.stringify({
        desc
      }),
      headers: {
        'Content-type': 'application/json'
      }
    });
    return res.json();
  };
  const handleButtonForm = (e) => {
    addingDesc();
    setShowForm(false);
    refreshData();
  };

  const handleSubmitAbout = async (e) => {
    e.preventDefault();
    try {
      axios.post(`${baseURL}/api/teams/ins/about/${tmdata._id}`, results);
      toast.success('Member Added Successfully');
      refreshData();
    } catch (error) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      axios.delete(
        `${baseURL}/api/teams/del/about/${tmdata._id}/${employeeId}`,
        {
          headers: {
            Authorization: cookie.get('token')
          }
        }
      );
      toast.success('The member has been removed.');
      refreshData();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/all/teamroles`)
      .then((res) => setTeamRoles(res.data));
  }, []);
  return (
    <div className="tab hide" id="about">
      <div className="our_team">
        <div className="about_team">
          <div className="about">
            <h2>OUR TEAM</h2>
            {isManager ? (
              <button className="bio_edit" onClick={toggleShowform}>
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </button>
            ) : null}

            {!showform ? (
              <p> {tmdata.about ? tmdata.about.description : ''} </p>
            ) : null}

            {showform ? (
              <form onSubmit={(e) => e.preventDefault()}>
                <textarea
                  name="text"
                  value={desc}
                  onChange={onChange}
                ></textarea>
                <button onClick={handleButtonForm} className="btn">
                  Update
                </button>
              </form>
            ) : (
              ''
            )}
          </div>
          <span>
            <div className="loc_box">
              {' '}
              <a href="#!" className="model_show_btn">
                {isManager ? (
                  <button className="btn">
                    <i
                      aria-hidden="true"
                      style={{ color: 'white', fontSize: '25px' }}
                    >
                      Add Members
                    </i>
                  </button>
                ) : null}
              </a>
              <div className="common_model_box" style={{ height: '12rem' }}>
                <a href="#!" className="model_close">
                  X
                </a>
                <div className="inner_model_box">
                  <h3>Add Members</h3>
                  <form className="common_form" onSubmit={handleSubmitAbout}>
                    <div className="form-group">
                      <div className="colm">
                        <div>
                          <div>
                            <label htmlFor="search">Search</label>
                            <div>
                              <input
                                id="search"
                                name="search"
                                placeholder="Search for users"
                                type="search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                              />

                              {searchText.trim() !== '' &&
                                !isLoading &&
                                isSuccess && (
                                  <div>
                                    <h1>Users</h1>
                                    <div>
                                      {!data.users ||
                                      data.users.length === 0 ? (
                                        <p>No users found..</p>
                                      ) : (
                                        data.users.map((user) => (
                                          <div
                                            onClick={() => {
                                              setSearchText(user.name);
                                              setResults({
                                                employee: user._id
                                              });
                                            }}
                                            key={user._id}
                                          >
                                            <img
                                              src={user.profilePicUrl}
                                              height={30}
                                              width={30}
                                            />
                                            <p>
                                              {user.name.length > 20
                                                ? user.name.substring(0, 20) +
                                                  '...'
                                                : user.name}
                                            </p>
                                          </div>
                                        ))
                                      )}
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                        <label htmlFor="exampleFormControlInput1">Roles</label>
                        <select
                          name="role"
                          className="form-control"
                          onChange={handleChangeAbt}
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
                      <button className="btn">Add</button>
                    </div>
                  </form>
                </div>
                <div className="overlay"></div>
              </div>
            </div>
          </span>

          {tmdata.about &&
            tmdata.about?.contacts.map((itm, index) => (
              <div className="team_mails" key={index}>
                <h3>
                  <i className="fa fa-life-ring" aria-hidden="true"></i>{' '}
                  {itm.emailname}
                </h3>
                <a href="#">{itm.emailaddress}</a>{' '}
              </div>
            ))}
        </div>
        <div className="team_member">
          <ul>
            {!tmdata?.employees || tmdata.employees.length === 0 ? (
              <li>
                <div className="dp">No employees defined..</div>
              </li>
            ) : (
              tmdata?.employees.map((emp, idx) => (
                <li key={idx}>
                  <div className="dp">
                    {' '}
                    <img src={emp.employeeId?.profilePicUrl} alt="" />{' '}
                  </div>
                  <h3>{emp.role.toUpperCase()}</h3>
                  <h4>{emp.employeeId?.name} </h4>
                  {isManager ? (
                    <button
                      className="btn"
                      onClick={() => handleDelete(emp._id)}
                    >
                      Delete
                    </button>
                  ) : null}
                  <TeamAboutEdit
                    employeeData={emp}
                    team={tmdata}
                    isManager={isManager}
                  />
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamAbout;
