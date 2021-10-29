import PropTypes from 'prop-types';
import Head from 'next/head'

const TeamTabs = (props) => (

  
  <ul className="profile_tab_btn">
	<li className="active"><a href="javascript:void(0);" rel="feed">FEED</a></li>
	<li><a href="javascript:void(0);" rel="statistics">STATISTICS</a></li>
	<li><a href="javascript:void(0);" rel="achievement"> ACHIEVEMENTS</a></li>
	<li><a href="javascript:void(0);" rel="matches">MATCHES</a></li>
    <li><a href="javascript:void(0);" rel="merchandise">merchandise</a></li>
    <li><a href="javascript:void(0);" rel="steams">STREAMS</a></li>
    <li><a href="javascript:void(0);" rel="photos">Photos</a></li>
    <li><a href="javascript:void(0);" rel="video">Videos/streams</a></li>
    <li><a href="javascript:void(0);" rel="sponsors">SPONSORS</a></li>
    <li><a href="javascript:void(0);" rel="rigs">rigs</a></li>
</ul>


);

export default TeamTabs;