import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import Head from 'next/head'
import MetaDash from '../components/MetaDash';
import SignedHeader from '../components/SignedHeader';
import LeftNav from '../components/LeftNav';
import TeamProfileBox from '../components/team/TeamProfileBox';
import TeamTabs from '../components/team/TeamTabs';
import TeamProfileData from '../components/team/TeamProfileData';


import FooterMain from '../components/FooterMain';
import { useRouter } from 'next/router'

import SignOut from '../pages/user/signout'


function Team() {

  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {

    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log(user);
        setUser(user)
      })
      .catch(
        err => router.push("/")
        
        )
  }, [])


  return (

  <div>

    <MetaDash />

    <SignedHeader />

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

export default Team
