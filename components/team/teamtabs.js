import PropTypes from 'prop-types';
import Head from 'next/head'

const TeamTabs = (props) => (

  
  <ul className="profile_tab_btn">
	<li className="active"><a href="#!" rel="overview">OVERVIEW </a></li>
	<li><a href="#!" rel="squads">SQUADS</a></li>
	<li><a href="#!" rel="achievement"> ACHIEVEMENTS</a></li>
	<li><a href="#!" rel="matches">MATCHES</a></li>
  <li><a href="#!" rel="stats">STATISTICS</a></li>
  <li><a href="#!" rel="store"> CLAN STORE  </a></li>
  <li><a href="#!" rel="streams">STREAMS</a></li>
  <li><a href="#!" rel="media">MEDIA</a></li>
  <li><a href="#!" rel="jobs">JOBS</a></li>
  <li><a href="#!" rel="about"> ABOUT</a></li>
  <li><a href="#!" rel="sponsors"> SPONSORS</a></li>
  <li><a href="#!" rel="rigs">  RIGS</a></li>
</ul>


);

export default TeamTabs;