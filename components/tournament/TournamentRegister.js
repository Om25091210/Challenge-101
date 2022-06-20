import React, { useState } from 'react';
import baseURL from '@utils/baseURL';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';

const Tournament_Reg = ({ user, tournament }) => {
  const router = useRouter();
  const refreshPage = () => {
    setTimeout(function () {
      window.location.reload(true);
    }, 1500);
  };
  const isRegistered =
    tournament?.registered?.filter((tour) => {
      return tour?.user?._id === user?._id;
    }).length > 0;

  const reghandlesubmit = async (e) => {
    e.preventDefault();
    try {
      axios.put(
        `${baseURL}/api/tournaments/register/${tournament._id}/${user._id}`
      );
      if (!isRegistered) {
        toast.success('Registered Successfully');
      } else {
        toast.success('Left Tournament');
      }
      refreshPage();
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  return (
    <>
      {isRegistered ? (
        <button className="join" onClick={reghandlesubmit}>
          REGISTERED
        </button>
      ) : (
        <button onClick={reghandlesubmit} className="join">
          REGISTER
        </button>
      )}
    </>
  );
};

export default Tournament_Reg;
