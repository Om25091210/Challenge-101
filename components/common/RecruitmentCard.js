import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import baseURL from '../../utils/baseURL';
import countryList from 'react-select-country-list';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const RecruitmentCard = ({ type, RecruitId }) => {
  const [allgames, setAllgames] = useState([]);
  const [allroles, setAllroles] = useState([]);

  const [states, setStates] = useState({
    RecruitId,
    RecruitType: type,
    games: '',
    role: '',
    region: '',
    Mic: false,
    language: '',
    type: '',
    salary: '',
    rank: '',
    availability: '',
    platform: ''
  });
  const options = useMemo(() => countryList().getData(), []);

  const handleMic = () => {
    if (states.Mic === true) {
      states.Mic = false;
    } else {
      states.Mic = true;
    }
  };

  useEffect(() => {
    axios.get(`${baseURL}/api/all/games`).then((res) => setAllgames(res.data));
    axios
      .get(`${baseURL}/api/all/teamroles`)
      .then((res) => setAllroles(res.data));
  }, []);

  const onChange = (e) => {
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

  const handleSubmitRecruit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/api/recruit/`, states);
      toast.success('Added Recruitment card');
      $('a.model_close').parent().removeClass('show_model');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshData();
  };

  return (
    <>
      <span>
        <div className="loc_box">
          {' '}
          <div className="games_details" style={{ marginTop: '1rem' }}>
            {type === 'TEAM' ? (
              <>
                <p>Looking for Players to Join your team?</p>{' '}
                <p>
                  Create a recruitment card in just few steps and get best
                  talent to play for your team.
                </p>
              </>
            ) : (
              <>
                <p>Looking for a team to play with?</p>{' '}
                <p>
                  Create a recruitment card in just few steps and get invited to
                  play with top ranking teams.
                </p>
              </>
            )}
            <div className="chart_box">
              <img src="/assets/media/profilechart.jpg" alt="" />
            </div>

            <a href="#!" className="model_show_btn">
              <button className="game_btn">
                <i className="fa fa-plus-circle" aria-hidden="true">
                  {type === 'TEAM' ? ' RECRUIT TALENT' : ' GET RECRUITED'}
                </i>
              </button>
            </a>

            <div className="common_model_box">
              <a href="#!" className="model_close">
                X
              </a>

              <div className="inner_model_box">
                <div className="add_jobs_height">
                  <form onSubmit={handleSubmitRecruit}>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">Game</label>
                      <select
                        name="games"
                        id="games"
                        value={states.games}
                        onChange={onChange}
                      >
                        <option value="">--</option>
                        {allgames.map((game) => (
                          <option value={game?._id}>{game.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="colm">
                      <label htmlFor="exampleFormControlInput1">Platform</label>
                      <select
                        id="platform"
                        name="platform"
                        onChange={onChange}
                        value={states.platform}
                        className="form-control text-capitalize"
                      >
                        <option value="--">--</option>
                        <option value="PC">PC</option>
                        <option value="Console">Console</option>
                        <option value="Mobile">Mobile</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">Role</label>
                      <select
                        name="role"
                        onChange={onChange}
                        value={states.role}
                        multiple={false}
                      >
                        {allroles.map((role) => (
                          <option value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">
                        Region
                      </label>
                      <select name="region" onChange={onChange}>
                        {options.map((opt) => (
                          <>
                            <option value={opt.value}>{opt.label}</option>
                          </>
                        ))}
                      </select>
                    </div>

                    <div className="custom-control custom-switch">
                      <label htmlFor="custonSwitch1">Mic</label>
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customSwitch1"
                        onClick={() => handleMic()}
                        value={states.Mic}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customSwitch1"
                      ></label>
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">Language</label>
                      <select
                        name="language"
                        onChange={handleSubmit}
                        multiple={true}
                        value={states.language}
                      >
                        <option value="ENGLISH">English</option>
                        <option value="RUSSIAN">Russian</option>
                        <option value="HINDI">Hindi</option>
                        <option value="TELUGU">Telugu</option>
                        <option value="TAMIL">Tamil</option>
                      </select>
                    </div>

                    <div className="colm">
                      <label htmlFor="exampleFormControlInput1">Type</label>
                      <select
                        id="type"
                        name="type"
                        onChange={onChange}
                        value={states.type}
                        className="form-control text-capitalize"
                      >
                        <option value="--">--</option>
                        <option value="Casual">Casual</option>
                        <option value="SemiPro">SemiPro</option>
                        <option value="Pro">Pro</option>
                        <option value="Gunman">Gunman</option>
                        <option value="Local Lan">Local Lan</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">Salary</label>
                      <select
                        name="salary"
                        id="salary"
                        value={states.salary}
                        onChange={onChange}
                      >
                        <option value="--">--</option>
                        <option value="prize_sharing">Prize Sharing</option>
                        <option value="winner_takes_all">
                          Winner takes all
                        </option>
                      </select>
                    </div>
                    {type === 'TEAM' ? (
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">
                          Minimum rank
                        </label>
                        <input
                          type="text"
                          name="rank"
                          onChange={onChange}
                          value={states.rank}
                        />
                      </div>
                    ) : null}

                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">
                        Availability
                      </label>
                      <input
                        type="date"
                        name="availability"
                        onChange={onChange}
                        value={states.availability}
                      />
                    </div>

                    <input type="submit" value="Confirm" className="btn" />
                  </form>
                </div>
              </div>
              <div className="overlay"></div>
            </div>
          </div>
        </div>
      </span>
    </>
  );
};

export default RecruitmentCard;
