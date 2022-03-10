import baseURL from '@utils/baseURL';
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { teamsquadformvalidate } from '@utils/valid';
import { useRouter } from 'next/router';

const TeamSquadAdd = ({ teamplayers, team }) => {
  const [squadData, setSquadData] = useState({
    name: '',
    location: '',
    players: '',
    imgUrl: '/assets/media/default/tournament.jpg',
    teamId: team._id
  });
  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleEditStat = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      try {
        await axios.post(`${baseURL}/api/squads/create`, squadData, {
          headers: {
            Authorization: cookie.get('token'),
            'Content-Type': 'application/json'
          }
        });
        toast.success('Team Squad has being added.');
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
      $('a.model_close').parent().removeClass('show_model');
      refreshData();
    } else {
      toast.error('All fields are required.');
    }
  };
  function onChange(e) {
    if (e.target.options) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setSquadData({ ...squadData, [e.target.name]: value });
    } else if (e.target.files) {
      console.log(e.target.files[0]);
      setSquadData({ ...squadData, [e.target.name]: e.target.files[0] });
    } else {
      setSquadData({ ...squadData, [e.target.name]: e.target.value });
    }
  }
  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);

  return (
    <>
      <a href="#!" className="model_show_btn btn">
        Add Squad
      </a>
      <div className="common_model_box">
        <a href="#!" className="model_close">
          X
        </a>

        <div className="inner_model_box">
          <h3>Add a Squad</h3>

          <form className="common_form" onSubmit={handleEditStat}>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={squadData.name}
              onChange={onChange}
            ></input>
            <p>{formErrors.name}</p>
            <input
              type="file"
              name="imgUrl"
              id="imgUrl"
              className="inputfile"
              onChange={onChange}
            />
            <input
              type="text"
              placeholder="Enter Location"
              name="location"
              value={squadData.location}
              onChange={onChange}
            ></input>
            <p>{formErrors.location}</p>
            <select
              className="custom-select text-capitalize"
              multiple={true}
              name="players"
              value={squadData.players}
              onChange={onChange}
            >
              {teamplayers.map((game, idx) => (
                <option key={idx} value={game._id}>
                  {' '}
                  {game.name}{' '}
                </option>
              ))}
            </select>
            <p>{formErrors.players}</p>
            <button
              onClick={() => setFormErrors(teamsquadformvalidate(squadData))}
              className="btn"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="overlay"></div>
      </div>
    </>
  );
};

export default TeamSquadAdd;
