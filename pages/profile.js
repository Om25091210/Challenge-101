import { useState, useEffect } from 'react'
import Head from 'next/head'
import MetaDash from '../components/MetaDash';
import SignedHeader from '../components/SignedHeader';
import LeftNav from '../components/LeftNav';
import ProfileBox from '../components/profile/ProfileBox';
import ProfileTabs from '../components/profile/ProfileTabs';
import ProfileData from '../components/profile/ProfileData';


import FooterMain from '../components/FooterMain';
import { useRouter } from 'next/router'


const Profile = ({ user }) => {


  return (

  <div>

    <MetaDash />

    <SignedHeader user={user}/>

    <LeftNav />


<div className="main_middle profile_middle"> 
 

	    <ProfileBox user={user}/>

	    <ProfileTabs />

	    <ProfileData />


 
   
  
</div>



<script src="/assets/plugins/global/plugins.bundle.js"/>
<script src="/assets/js/scripts.bundle.js"/>
<script src="/assets/plugins/global/plugins.bundle.js"/>
<script src="/assets/js/dash/jquery.mCustomScrollbar.js"/>
<script src="/assets/js/dash/slick.js"/>
<script src="/assets/js/dash/custom.js"/>



</div>

  )
}

export default Profile
