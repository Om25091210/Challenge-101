import PropTypes from 'prop-types';
import Head from 'next/head';

const TeamTabs = ({ user, data }) => {
  const isManager =
    data.team.employees.filter(
      (emp) => emp.role === 'Manager' && emp.employeeId._id === user._id
    ).length > 0;

  return (
    <ul className="profile_tab_btn">
      <li className="active">
        <a href="#!" rel="overview">
          OVERVIEW
        </a>
      </li>
      <li>
        <a href="#!" rel="squads">
          Squads
        </a>
      </li>
      <li>
        <a href="#!" rel="achievement">
          {' '}
          ACHIEVEMENTS
        </a>
      </li>
      <li>
        <a href="#!" rel="matches">
          MATCHES
        </a>
      </li>
      <li>
        <a href="#!" rel="stats">
          STATISTICS
        </a>
      </li>
      <li>
        <a href="#!" rel="store">
          {' '}
          CLAN STORE{' '}
        </a>
      </li>
      <li>
        <a href="#!" rel="photos">
          PHOTOS
        </a>
      </li>
      <li>
        <a href="#!" rel="media">
          MEDIA
        </a>
      </li>
      <li>
        <a href="#!" rel="jobs">
          JOBS
        </a>
      </li>
      <li>
        <a href="#!" rel="about">
          {' '}
          ABOUT
        </a>
      </li>
      <li>
        <a href="#!" rel="sponsors">
          {' '}
          SPONSORS
        </a>
      </li>
      <li>
        <a href="#!" rel="rigs">
          {' '}
          RIGS
        </a>
      </li>
      {isManager ? (
        <li>
          <a href="#!" rel="joines">
            Joines
          </a>
        </li>
      ) : null}
    </ul>
  );
};

export default TeamTabs;
