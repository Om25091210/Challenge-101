import React from 'react';
import baseURL from '../../utils/baseURL';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';

const TeamFollow = ({ team, user }) => {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const followhandlesubmit = async (teamId) => {
    await fetch(`${baseURL}/api/teams/follow/team/${teamId}`, {
      method: 'PUT',
      headers: {
        Authorization: cookie.get('token')
      }
    });
    refreshData();
  };

  const isFollow =
    team &&
    team.followers
      ?.filter((team) => team?.user === user?._id)
      .map((team) => team?.user).length > 0;

  return (
    <>
      <button onClick={() => followhandlesubmit(team?._id)}>
        {isFollow === true ? 'Following' : 'Follow'}
      </button>
    </>
  );
};

export default TeamFollow;
