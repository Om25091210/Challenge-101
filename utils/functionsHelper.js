import axios from 'axios';
import Router from 'next/router';
import cookie from 'js-cookie';

import baseURL from './baseURL';
import catchErrors from './catchErrors';



export const searchTournaments = async (
  { search, filters },
  setError,
  setLoading,
  toast,
  setStatus,
) => {
  setLoading(true);
  try {


    const res = await axios.post(`${baseURL}/api/tournaments/search`, {
      search,
      filters,
    });
    toast.info(res.data.msg);
    setStatus('confirm');
    return res.data;
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
    toast.error(errorMsg);
  }
  setLoading(false);
};


export const logoutUser = () => {
  cookie.remove('token');
  Router.push('/login');
};


export const getTournaments = async () => {
  const { data } = await axios.get(`${baseURL}/api/tournaments`, {
  });
  return data;
};

//Get Teams, Ranking, Tournaments
export const getTeamsRankingTournaments = async (filters) => {
    const gameId = 'undefined'
    const  teamIds  = await axios.get(`${baseURL}/api/teams/teamsbygame/${gameId}`, {
    });

  return teamIds.data;
};


export const getTournament = async (tournamentid) => {
  const { data } = await axios.get(`${baseURL}/api/tournaments/${tournamentid}`, {
  });
  return data;
};
