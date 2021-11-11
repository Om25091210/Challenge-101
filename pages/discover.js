import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import Head from 'next/head'
import MetaDash from '../components/MetaDash';
import SignedHeader from '../components/SignedHeader';
import LeftNav from '../components/LeftNav';
import Teams from '../components/discover/Teams';
import Coaches from '../components/discover/Coaches';
import Players from '../components/discover/Players';
import Arenas from '../components/discover/Arenas';
import Jobs from '../components/discover/Jobs';


import FooterMain from '../components/FooterMain';
import { useRouter } from 'next/router'

import SignOut from '../pages/user/signout'


function Discover() {

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
 
  <div className="discovery_page">

  <div className="white_bg">
    <h2>GAME</h2>
   

    <div className="tit">
      <a href="#"><span>
        <b className="icon"><img src="/assets/media/ranking/console.png" alt="" /></b> Browse Games</span>
         <i className="fa fa-angle-right" aria-hidden="true"></i> 
         <span className="other_logo"><img src="/assets/media/team1.png" alt="" /></span>
         <span className="other_logo"><img src="/assets/media/team1.png" alt="" /></span>
        
        </a> 
        
        </div>


    <ul className="profile_tab_btn discover_tab_btn">
      <li className="active"><a href="javascript:void(0);" rel="teams">TEAMS </a></li>
      <li><a href="javascript:void(0);" rel="players"> PLAYERS</a></li>
      <li><a href="javascript:void(0);" rel="coaches"> COACHES </a></li>
      <li><a href="javascript:void(0);" rel="arenas"> ARENAS</a></li>
      <li><a href="javascript:void(0);" rel="jobs"> JOBS </a></li>
    </ul>
    </div>

	 <div className="prfoile_tab_data ">
	 
	 	<Teams/>

	 	<Players/>

	 	<Coaches />

	 	<Arenas />

	 	<Jobs />

	 </div>

   
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

export default Discover
