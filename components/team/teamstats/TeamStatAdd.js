import React from 'react';
import { useState } from 'react';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';

const TeamStatAdd = ({ showform }) => {
  console.log(showform);
  const [editFormData, setEditFormData] = useState({
    tournamentId: '',
    place: '',
    mp: '',
    wins: '',
    loss: '',
    w_streak: ''
  });
  const onChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditStat = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${baseURL}/api/tournamentstat/`, editFormData, {
        headers: {
          Authorization: cookie.get('token'),
          'Content-Type': 'application/json'
        }
      });
      toast.success('Tournament Stats has added.');
      window.setTimeout(function () {
        location.reload();
      }, 4000);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  return (
    <>
      {showform ? (
        <>
          <td>
            <input
              type="text"
              placeholder="Enter Tournament Id"
              name="tournamentId"
              value={editFormData?.tournamentId}
              onChange={onChange}
            ></input>
          </td>
          <td>
            <input
              type="text"
              placeholder="Enter place"
              name="place"
              value={editFormData?.place}
              onChange={onChange}
            ></input>
          </td>
          <td>
            <input
              type="text"
              placeholder="Enter the MP"
              name="mp"
              value={editFormData?.mp}
              onChange={onChange}
            ></input>
          </td>
          <td>
            <input
              type="text"
              placeholder="Enter the Wins"
              name="wins"
              value={editFormData?.wins}
              onChange={onChange}
            ></input>
          </td>
          <td>
            <input
              type="text"
              placeholder="Enter the Losses"
              name="loss"
              value={editFormData?.loss}
              onChange={onChange}
            ></input>
          </td>
          <td>69%</td>
          <td>
            <input
              type="text"
              placeholder="Enter the Win Streak"
              name="w_streak"
              value={editFormData?.w_streak}
              onChange={onChange}
            ></input>
          </td>
          <td>
            <button
              type="submit"
              onClick={(e) => handleEditStat(e)}
              className="btn"
            >
              Add
            </button>
          </td>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default TeamStatAdd;
