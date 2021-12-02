import { useState, useEffect } from 'react'
import Head from 'next/head'
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import TeamProfileBox from '@components/team/TeamProfileBox';
import TeamTabs from '@components/team/TeamTabs';
import TeamProfileData from '@components/team/TeamProfileData';


import FooterMain from '@components/FooterMain';

const Team = ({ user }) => {

  return (

  <div>

    <MetaDash />

    <SignedHeader user={user}/>

    <LeftNav />


<div className="main_middle profile_middle"> 
 

	    <TeamProfileBox />

	    <TeamTabs />

	    <TeamProfileData />


 
   
  
</div>



<script src="/assets/plugins/global/plugins.bundle.js"/>
<script src="/assets/js/scripts.bundle.js"/>
<script src="/assets/js/dash/jquery.mCustomScrollbar.js"/>
<script src="/assets/js/dash/slick.js"/>
<script src="/assets/js/dash/custom.js"/>



</div>

  )
}

export default Team;



