import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import Head from 'next/head'
import MetaDash from '../components/MetaDash';
import SignedHeader from '../components/SignedHeader';
import LeftNav from '../components/LeftNav';
import ProfileBox from '../components/profile/ProfileBox';
import ProfileTabs from '../components/profile/ProfileTabs';
import ProfileData from '../components/profile/ProfileData';


import FooterMain from '../components/FooterMain';
import { useRouter } from 'next/router'

import SignOut from '../pages/user/signout'


function Profile() {

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
 

	    <ProfileBox />

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
