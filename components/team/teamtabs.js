import PropTypes from 'prop-types';
import Head from 'next/head'

const TeamTabs = (props) => (

  
  <ul className="profile_tab_btn">
	<li className="active"><a href="#!" rel="feed">FEED</a></li>
	<li><a href="#!" rel="statistics">STATISTICS</a></li>
	<li><a href="#!" rel="achievement"> ACHIEVEMENTS</a></li>
	<li><a href="#!" rel="matches">MATCHES</a></li>
  <li><a href="#!" rel="merchandise">merchandise</a></li>
  <li><a href="#!" rel="steams">STREAMS</a></li>
  <li><a href="#!" rel="photos">Photos</a></li>
  <li><a href="#!" rel="video">Videos/streams</a></li>
  <li><a href="#!" rel="sponsors">SPONSORS</a></li>
  <li><a href="#!" rel="rigs">rigs</a></li>
</ul>


);

export default TeamTabs;