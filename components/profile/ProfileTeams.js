import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const ProfileTeams = ({
  Userdata,
  profile,
  user,
  teamsData,
  allGames,
  teamroles
}) => {
  const [filteredData, setFilteredData] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    axios.get(`${baseURL}/api/all/teams`).then((res) => setAllTeams(res.data));
  }, []);

  const [team, setTeam] = useState({
    teamId: null,
    game: '',
    role: '',
    teamStartDate: '',
    teamEndDate: ''
  });

  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setSearchText(searchWord);
    const newFilter = allTeams?.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleSelected = (data) => {
    setSearchText(data.name);
    team.teamId = data._id;
  };

  function handleAddTeam(e) {
    if (e.target.options) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setTeam({ ...team, [e.target.name]: value });
    } else if (e.target.files) {
      setTeam({ ...team, [e.target.name]: e.target.files[0] });
    } else {
      setTeam({ ...team, [e.target.name]: e.target.value });
    }
  }

  const onChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  const handleAddTeamSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.post(`${baseURL}/api/profile/team/${profile?._id}`, team);
      toast.success('Added Team Successfully');
      $('a.model_close').parent().removeClass('show_model');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshData();
  };

  return (
    <>
      <div className="tab hide" id="teams">
        <div className="sponser_btn">
          {' '}
          {Userdata.profile.user._id === user._id ? (
            <a href="#!" className="model_show_btn">
              <button className="btn">
                {' '}
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
                Add Team
              </button>
            </a>
          ) : null}
          <div className="common_model_box">
            {' '}
            <a href="#!" className="model_close">
              {' '}
              X{' '}
            </a>
            <div className="inner_model_box">
              <h3>Team</h3>
              <form className="common_form" onSubmit={handleAddTeamSubmit}>
                <div className="form-group">
                  <div className="colm">
                    <label htmlFor="exampleFormControlInput1">Team</label>
                    <input
                      type="search"
                      id="team"
                      name="team"
                      placeholder="Enter Team Name"
                      value={searchText}
                      onChange={handleFilter}
                      autoComplete="off"
                    />
                    {searchText.length !== 0 ? (
                      <div className="custom-rig-tag">
                        <div>
                          {!filteredData || filteredData.length === 0 ? (
                            <p>No Team found..</p>
                          ) : (
                            filteredData.map((data) => (
                              <div
                                onClick={() => handleSelected(data)}
                                key={data._id}
                              >
                                <img
                                  src={data?.imgUrl}
                                  height={50}
                                  width={50}
                                />
                                <p>
                                  {data.name.length > 20
                                    ? data.name.substring(0, 20) + '...'
                                    : data.name}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Games</label>

                    <select
                      className="form-control game_search_result"
                      multiple={true}
                      name="game"
                      value={team.game}
                      onChange={handleAddTeam}
                    >
                      {allGames.map((game, idx) => (
                        <option key={idx} value={game._id}>
                          {' '}
                          {game.name}{' '}
                        </option>
                      ))}
                    </select>
                  </div>

                  <label htmlFor="exampleFormControlInput1">Roles</label>
                  <select
                    name="role"
                    className="form-control"
                    onChange={onChange}
                    value={team.role}
                  >
                    {teamroles.map((tr, idx) => (
                      <option key={idx} value={tr}>
                        {tr}
                      </option>
                    ))}
                  </select>

                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Start Date"
                      name="teamStartDate"
                      onChange={handleAddTeam}
                      value={team.teamStartDate}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="End Date"
                      name="teamEndDate"
                      onChange={handleAddTeam}
                      value={team.teamEndDate}
                    />
                  </div>
                  <button className="btn">Update</button>
                </div>
              </form>
            </div>
            <div className="overlay"></div>
          </div>
        </div>
        <div>
          <ul className="stats_card">
            {teamsData && teamsData.length === 0 ? (
              <p>{profile.user.name} has no teams.</p>
            ) : (
              teamsData &&
              teamsData.map((team) => (
                <li>
                  <div className="card_img">
                    {' '}
                    <img src={team.imgUrl} alt="" />{' '}
                  </div>
                  <div className="right_data">
                    <div className="card_games_tit">
                      <h3>
                        <a href={`/team/${team._id}`}>
                          Team {team.name} <br />{' '}
                        </a>
                        {Moment(team.founded).format('MMM YYYY')}
                      </h3>
                      <div className="gamer_pos">Caption|Assault</div>
                    </div>
                    <div className="card_details">
                      <div className="once">
                        <p>kills avg</p>
                        <span className="big_name"> 1.33 </span>{' '}
                      </div>
                      <div className="once">
                        <p>headchange avg</p>
                        <span className="big_name"> 1.1 </span>{' '}
                      </div>
                      <div className="once">
                        <p>Gammer ceaton avg</p>
                        <span className="big_name"> 473.29 </span>{' '}
                      </div>
                      <div className="once">
                        <p>kills avg</p>
                        <span className="big_name">50% </span>{' '}
                      </div>
                    </div>
                  </div>
                  <div className="comp_btn">
                    <i class="fa fa-compress" aria-hidden="true"></i> Compare
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfileTeams;
