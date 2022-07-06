import PropTypes from 'prop-types';
import Head from 'next/head';
import RecruitmentCard from '../common/RecruitmentCard';

const GamesDetails = ({ user }) => (
  <div className="games_details">
    <ul>
      <li>
        <span className="nm">Game: </span>{' '}
        <img src="/assets/media/profile/game1.png" alt="" />
      </li>
      <li>
        <span className="nm">Roles: </span>{' '}
        <span className="task">Assault/Sniper</span>{' '}
      </li>
      <li>
        <span className="nm">Mic:</span> <span className="task"> On</span>
      </li>
      <li>
        <span className="nm">Platform:</span> <span className="task"> PC</span>
      </li>
      <li>
        <span className="nm">Language:</span>{' '}
        <span className="task"> ENG, RU, HINDI</span>
      </li>
      <li>
        <span className="nm">Win rate/KDA:</span>{' '}
        <span className="task"> 67% / 2.9 </span>
      </li>
      <li>
        <span className="nm">MMR:</span> <span className="task"> 3211 </span>
      </li>
      <li>
        <span className="nm">Availablilty:</span>{' '}
        <span className="task"> 4 hours per day 7 days a week </span>
      </li>
    </ul>

    <div className="chart_box">
      <img src="/assets/media/profile/chart.jpg" alt="" />
    </div>

    <button className="game_btn">INVITE TO TEAM</button>
    <RecruitmentCard type="PROFILE" user={user} />
  </div>
);

export default GamesDetails;
