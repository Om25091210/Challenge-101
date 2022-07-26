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

  const isAdmin =
    team &&
    team.employees.filter(
      (emp) => emp.role === 'Admin' && emp.employeeId?._id === user?._id
    ).length > 0;

  const isManager =
    team?.employees.filter(
      (emp) => emp.role === 'Manager' && emp.employeeId._id === user._id
    ).length > 0;

  return (
    <>
      {isAdmin || isManager ? null : (
        <button className="btn" onClick={() => followhandlesubmit(team?._id)}>
          {isFollow === true ? 'Following' : 'Follow'}
        </button>
      )}
    </>
  );
};

export default TeamFollow;
