import baseURL from '@utils/baseURL';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { teamsquadformvalidate } from '@utils/valid';
import { useRouter } from 'next/router';

const TeamSquadEdit = ({ teamplayers, squad, isManager }) => {
  const [editSquadData, setEditSquadData] = useState({
    name: squad.name,
    location: squad.location,
    players: squad.players.map((plr) => plr.playerId),
    imgUrl: '/assets/media/default/tournament.jpg'
  });
  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
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
      setEditSquadData({ ...editSquadData, [e.target.name]: value });
    } else if (e.target.files) {
      console.log(e.target.files[0]);
      setEditSquadData({
        ...editSquadData,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setEditSquadData({ ...editSquadData, [e.target.name]: e.target.value });
    }
  }

  const handleEditStat = async (e) => {
    e.preventDefault();

    if (Object.keys(formErrors).length === 0) {
      try {
        await axios.patch(`${baseURL}/api/squads/${squad._id}`, editSquadData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        toast.success('The Record has been Updated.');
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
  return (
    <div>
      {isManager ? (
        <a href="#!" className="model_show_btn btn">
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </a>
      ) : null}
      <div className="common_model_box">
        <a href="#!" className="model_close">
          X
        </a>

        <div className="inner_model_box">
          <h3>Edit A Squad</h3>

          <form className="common_form" onSubmit={handleEditStat}>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={editSquadData.name}
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
              value={editSquadData.location}
              onChange={onChange}
            ></input>
            <p>{formErrors.location}</p>
            <select
              className="custom-select text-capitalize"
              multiple={true}
              name="players"
              value={editSquadData.players}
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
              onClick={() =>
                setFormErrors(teamsquadformvalidate(editSquadData))
              }
              className="btn"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="overlay"></div>
      </div>
    </div>
  );
};

export default TeamSquadEdit;
