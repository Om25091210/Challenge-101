import React, { useEffect, useState } from 'react';
import baseURL from '@utils/baseURL';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from './AllScript';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';
import PremiumPass from '../components/crypto/PremiumPass';

const challenges = ({ user, data, teams }) => {
  const [searchText, setSearchText] = useState('');
  const [opponentTeam, setOpponentTeam] = useState(null);
  const [showform, setShowForm] = useState(true);

  const [state, setState] = useState({
    Userteam: '',
    game: '',
    players: '',
    challengerTeam: null,
    startDate: '',
    startTime: ''
  });

  const UserTeam = teams.filter((team) => {
    return team._id === parseInt(state.Userteam);
  });

  var commonGames = UserTeam[0]?.games.filter(function (val1) {
    return opponentTeam?.games.some(function (val2) {
      return val1.gameId._id === val2.gameId._id;
    });
  });

  const [filteredData, setFilteredData] = useState([]);
  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setSearchText(searchWord);
    const newFilter = teams?.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);

  function onChange(e) {
    if (e.target.options) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setState({ ...state, [e.target.name]: value });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  }

  const handleSelectedTeam = (data) => {
    setSearchText(data.name);
    setShowForm(false);
    state.challengerTeam = data._id;
    setOpponentTeam(data);
  };

  const handleEditStat = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/api/challenges/create`, state, {
        headers: {
          Authorization: cookie.get('token'),
          'Content-Type': 'application/json'
        }
      });
      toast.success('The Challenge Has Been Sent');
      $('a.model_close').parent().removeClass('show_model');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  return (
    <>
      <MetaDash />

      <SignedHeader user={user} />

      <LeftNav user={user} />
      <div className="main_middle profile_middle">
        <a href="#!" className="model_show_btn btn add_sqd">
          <i className="fa fa-plus-circle" aria-hidden="true"></i> Post
          Challenge
        </a>

        <div className="common_model_box">
          <a href="#!" className="model_close">
            X
          </a>

          <div className="inner_model_box">
            <h3>Post a Challenge</h3>

            <form className="common_form" onSubmit={handleEditStat}>
              <div className="colm rows">
                <label> Choose your Team</label>
                <select name="Userteam" id="teamselect" onChange={onChange}>
                  <option value="">---</option>
                  {teams.map((team) => (
                    <option value={team._id}>{team.name}</option>
                  ))}
                </select>
              </div>
              <div className="colm rows">
                <label>Opponent Team</label>
                <input
                  id="challengedTeam"
                  name="challengedTeam"
                  placeholder="Enter Team Name"
                  type="search"
                  value={searchText}
                  onChange={handleFilter}
                  autoComplete="off"
                />

                {searchText.length !== 0 && showform === true ? (
                  <div className="custom-rig-tag">
                    <div>
                      {!filteredData || filteredData.length === 0 ? (
                        <p>No Teams found..</p>
                      ) : (
                        filteredData.map((data) => (
                          <div
                            onClick={() => handleSelectedTeam(data)}
                            key={data._id}
                          >
                            <img src={data.imgUrl} height={50} width={50} />
                            <p>{data.name}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
              <select name="game" id="game" onChange={onChange}>
                <option value="">---</option>
                {commonGames?.length === 0 ? (
                  <option value="">
                    No games available between the teams.
                  </option>
                ) : (
                  commonGames?.map((cG) => (
                    <option value={cG.gameId?._id}>{cG.gameId?.name}</option>
                  ))
                )}
              </select>
              <div className="colm rows">
                <label htmlFor="search">Choose Your Team Players</label>
                <select
                  name="players"
                  id="players"
                  multiple
                  onChange={onChange}
                >
                  {UserTeam[0]?.players?.map((plyr) => (
                    <option value={plyr?.playerId?._id}>
                      {plyr.playerId?.apidata
                        ? plyr.playerId.apidata.data.platformInfo
                            .platformUserHandle
                        : plyr.playerId?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="colm rows">
                <input
                  type="date"
                  onChange={onChange}
                  name="startDate"
                  value={state.startDate}
                />
              </div>
              <div className="colm rows">
                <input
                  type="time"
                  name="startTime"
                  onChange={onChange}
                  value={state.startTime}
                />
              </div>
              <button className="btn" type="submit">
                Submit
              </button>
            </form>
          </div>
          <div className="overlay"></div>
        </div>
        {data.map((challenge) => (
          <p>{challenge.challenger.name}</p>
        ))}
      </div>
      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const response = await fetch(`${baseURL}/api/challenges`);
  const data = await response.json();

  return {
    props: { data }
  };
};

export default challenges;
