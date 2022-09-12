import axios from 'axios';
import React from 'react';
import baseURL from '../../utils/baseURL';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const TournamentVidDel = ({ collectionId, tournamentId, isUser }) => {
  const router = useRouter();

  const refreshData = () => {
    setTimeout(function () {
      window.location.reload(false);
    }, 1000);
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.delete(
        `${baseURL}/api/tournaments/video/${tournamentId}/${collectionId}`,
        {
          headers: {
            Authorization: cookie.get('token')
          }
        }
      );
      refreshData();
      toast.success('Deleted Successfully');
    } catch (error) {
      console.log(error);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };
  return (
    <>
      {isUser ? (
        <button className="btn" onClick={handleDeleteSubmit}>
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      ) : null}
    </>
  );
};

export default TournamentVidDel;
