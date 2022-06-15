import PropTypes from 'prop-types';
import Head from 'next/head';

const ProfileTabs = (props) => (
  <ul className="profile_tab_btn">
    <li>
      <a href="#!" className="active" rel="feed">
        FEED
      </a>
    </li>
    <li>
      <a href="#!" className="active" rel="statistics">
        Statistics
      </a>
    </li>
    <li>
      <a href="#!" className="active" rel="teams">
        Teams
      </a>
    </li>
    <li>
      <a href="#!" className="active" rel="tournaments">
        Tournaments
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
      <a href="#!" rel="store">
        merchandise
      </a>
    </li>
    <li>
      <a href="#!" rel="photos">
        Photos
      </a>
    </li>
    <li>
      <a href="#!" rel="video">
        Videos/streams
      </a>
    </li>
    <li>
      <a href="#!" rel="sponsors">
        SPONSORS
      </a>
    </li>
    <li>
      <a href="#!" rel="rigs">
        rigs
      </a>
    </li>
  </ul>
);

export default ProfileTabs;
