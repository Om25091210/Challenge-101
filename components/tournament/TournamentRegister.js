import React, { useState } from 'react';
import baseURL from '@utils/baseURL';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';

const Tournament_Reg = ({ user, tournament, profile }) => {
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

  const isTeamRegistered =
    tournament?.teams?.filter((team) => {
      return team?.teamId?._id === profile?.current_team?._id;
    }).length > 0;

  const isRegFull = tournament.registered?.length === tournament.participants;

  const isTeamRegFull = tournament.maxTeams === tournament.teams?.length;

  const reghandlesubmit = async (e) => {
    e.preventDefault();
    try {
      if (tournament.playType === 'PLAYERS') {
        axios.put(
          `${baseURL}/api/tournaments/register/${tournament._id}/${user._id}`
        );
        if (isRegistered === false) {
          toast.success('Registered Successfully');
        } else {
          toast.success('Left Tournament');
        }
      } else {
        axios.put(
          `${baseURL}/api/tournaments/register/team/${tournament._id}/${profile?.current_team._id}`
        );
        if (isTeamRegistered === false) {
          toast.success('Registered Successfully');
        } else {
          toast.success('Left Tournament');
        }
      }
      refreshPage();
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  return (
    <>
      {tournament.playType === 'TEAMS' ? (
        <>
          {isTeamRegistered ? (
            <>
              <button className="join" onClick={reghandlesubmit}>
                REGISTERED
              </button>
            </>
          ) : (
            <>
              {isTeamRegFull !== true ? (
                <>
                  <button onClick={reghandlesubmit} className="join">
                    REGISTER
                  </button>
                </>
              ) : (
                <>
                  <button disabled={true}>Slots Unavailable</button>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {isRegistered ? (
            <>
              <button className="join" onClick={reghandlesubmit}>
                REGISTERED
              </button>
            </>
          ) : (
            <>
              {isRegFull !== true ? (
                <>
                  <button onClick={reghandlesubmit} className="join">
                    REGISTER
                  </button>
                </>
              ) : (
                <>
                  <button disabled={true}>Slots Unavailable</button>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Tournament_Reg;
