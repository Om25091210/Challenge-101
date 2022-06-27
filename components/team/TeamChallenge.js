import axios from 'axios';
import React, { useState } from 'react';
import baseURL from '../../utils/baseURL';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';

const TeamChallenge = ({ teams, team }) => {
  const [state, setState] = useState({
    Userteam: '',
    game: '',
    players: '',
    challengerTeam: team._id,
    startDate: '',
    startTime: ''
  });

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

  const UserTeam = teams.filter((team) => {
    return team._id === parseInt(state.Userteam);
  });

  var commonGames = UserTeam[0]?.games.filter(function (val1) {
    return team.games.some(function (val2) {
      return val1.gameId._id === val2.gameId;
    });
  });

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
      <a href="#!" className="model_show_btn">
        <button>Challenge</button>
      </a>
      <div className="common_model_box">
        <a href="#!" className="model_close btn">
          X
        </a>

        <div className="inner_model_box">
          <h3>Challenge the team {team.name}</h3>

          <form onSubmit={handleEditStat} className="common_form personal_form">
            <select name="Userteam" id="teamselect" onChange={onChange}>
              <option value="">---</option>
              {teams.map((team) => (
                <option value={team._id}>{team.name}</option>
              ))}
            </select>
            <select name="game" id="game" onChange={onChange}>
              <option value="">---</option>
              {commonGames?.length === 0 ? (
                <option value="">No games available between the teams.</option>
              ) : (
                commonGames?.map((cG) => (
                  <option value={cG.gameId?._id}>{cG.gameId?.name}</option>
                ))
              )}
            </select>
            <select name="players" id="players" multiple onChange={onChange}>
              {UserTeam[0]?.players?.map((plyr) => (
                <option value={plyr?.playerId?._id}>
                  {plyr.playerId?.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              onChange={onChange}
              name="startDate"
              value={state.startDate}
            />
            <input
              type="time"
              name="startTime"
              onChange={onChange}
              value={state.startTime}
            />
            <button className="btn" type="submit">
              Done
            </button>
          </form>
        </div>
        <div className="overlay"></div>
      </div>
    </>
  );
};

export default TeamChallenge;
