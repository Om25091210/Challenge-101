import { useState, useEffect } from 'react'
import Head from 'next/head'
import MetaDash from '../components/MetaDash';
import SignedHeader from '../components/SignedHeader';
import LeftNav from '../components/LeftNav';

import MatchTable from '../components/matches/matchtable';
import MatchBoard from '../components/matches/MatchBoard';
import StatsChart from '../components/matches/statschart';


import FooterMain from '../components/FooterMain';


const Matches = ({ user }) => {

  return (

  <div>

    <MetaDash />

    <SignedHeader user={user}/>

    <LeftNav />


    <div className="main_middle profile_middle">
<div className="match_page">

  

  <MatchBoard />
 <MatchTable />
 <StatsChart />
  
 
  



</div>
</div>



<script src="/assets/plugins/global/plugins.bundle.js"/>
<script src="/assets/js/scripts.bundle.js"/>
<script src="/assets/plugins/global/plugins.bundle.js"/>
<script src="/assets/js/dash/bootstrap.bundle.min.js"></script>
<script src="/assets/js/dash/jquery.mCustomScrollbar.js"/>
<script src="/assets/js/dash/slick.js"/>
<script src="/assets/js/dash/custom.js"/>



</div>

  )
}

export default Matches
