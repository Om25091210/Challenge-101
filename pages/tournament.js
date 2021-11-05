import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import Head from 'next/head'
import MetaDash from '../components/MetaDash';
import SignedHeader from '../components/SignedHeader';
import LeftNav from '../components/LeftNav';
import TeamFilter from '../components/ranking/TeamFilter';
import TeamRows from '../components/tournament/TeamRows';


import FooterMain from '../components/FooterMain';
import { useRouter } from 'next/router'

import SignOut from '../pages/user/signout'


function Tournament() {

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
        <b className="icon"><img src="/assets/media/ranking/console.png" alt=""/></b> Browse Games</span>
         <i className="fa fa-angle-right" aria-hidden="true"></i> 
         <span className="other_logo"><img src="/assets/media/team1.png" alt=""/></span>
         <span className="other_logo"><img src="/assets/media/team1.png" alt=""/></span>
        
        </a> 
        
        </div>
    <div className="white_bg">
      <div className="team_search" >
        <div className="searchbox">
          <h3>Search</h3>
          <input type="search" value="" placeholder="Search"/>
          <input type="submit" value=""/>
        </div>
        <div className="advance">
          <h3>Favourite</h3>
          <div className="custom-control custom-switch">
            <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
            <label className="custom-control-label" for="customSwitch1"></label>
          </div>
        </div>
      </div>
      
      <div className="team_filter">
        <div className="drop_downs">
          <div className="button-group">
            <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name">Tier </span> <span className="caret"></span> </button>
            <ul className="dropdown-menu">
              <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                <input type="checkbox"/>
                Sniper</a></li>
              <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                <input type="checkbox"/>
                AR</a></li>
              <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                <input type="checkbox"/>
                Shotgun</a></li>
              <li><a href="#" className="small" data-value="option4" tabIndex="-1">
                <input type="checkbox"/>
                Pistol</a></li>
              <li><a href="#" className="small" data-value="option5" tabIndex="-1">
                <input type="checkbox"/>
                Marksman Rifile</a></li>
              <li><a href="#" className="small" data-value="option6" tabIndex="-1">
                <input type="checkbox"/>
                SMGs</a></li>
            </ul>
          </div>
          <div className="button-group">
            <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name"> STATUS </span> <span className="caret"></span> </button>
            <ul className="dropdown-menu">
              <li><a href="#" className="small" data-value="option1" tabIndex="-1"> Assam
                <input type="checkbox"/>
                </a></li>
              <li><a href="#" className="small" data-value="option2" tabIndex="-1"> Arunachal Pradesh
                <input type="checkbox"/>
                </a></li>
              <li><a href="#" className="small" data-value="option3" tabIndex="-1"> Karnataka
                <input type="checkbox"/>
                </a></li>
              <li><a href="#" className="small" data-value="option4" tabIndex="-1"> Delhi
                <input type="checkbox"/>
                </a></li>
              <li><a href="#" className="small" data-value="option5" tabIndex="-1"> Maharasthra
                <input type="checkbox"/>
                </a></li>
            </ul>
          </div>
          <div className="button-group">
            <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name"> format</span> <span className="caret"></span> </button>
            <ul className="dropdown-menu">
              <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                <input type="checkbox"/>
                PC</a></li>
              <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                <input type="checkbox"/>
                Console</a></li>
              <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                <input type="checkbox"/>
                Mobile</a></li>
            </ul>
          </div>
          <div className="button-group">
            <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name"> category </span> <span className="caret"></span> </button>
            <ul className="dropdown-menu">
              <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                <input type="checkbox"/>
                PC</a></li>
              <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                <input type="checkbox"/>
                Console</a></li>
              <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                <input type="checkbox"/>
                Mobile</a></li>
            </ul>
          </div>
          <div className="button-group">
            <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name"> date </span> <span className="caret"></span> </button>
            <ul className="dropdown-menu">
              <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                <input type="checkbox"/>
                PC</a></li>
              <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                <input type="checkbox"/>
                Console</a></li>
              <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                <input type="checkbox"/>
                Mobile</a></li>
            </ul>
          </div>
          <div className="button-group">
            <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name"> PLATFORM</span> <span className="caret"></span> </button>
            <ul className="dropdown-menu">
              <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                <input type="checkbox"/>
                PC</a></li>
              <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                <input type="checkbox"/>
                Console</a></li>
              <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                <input type="checkbox"/>
                Mobile</a></li>
            </ul>
          </div>
        </div>
        <div className="filters"> <a href="#" className="close1">X</a>
          <h3>Filters</h3>
          <div className="filter_list"> <span className="filter1"> Games: Call of Duty <a href="#" className="close2">X</a></span> <span className="filter1"> Category: LAN <a href="#" className="close2">X</a></span> <span className="filter1"> Type: Pro <a href="#" className="close2">X</a></span> <span className="filter1"> Rank: Legend <a href="#" className="close2">X</a></span> <span className="filter1"> Platform: Mobile <a href="#" className="close2">X</a></span> </div>
        </div>
      </div>
    </div>
  </div>

  <TeamRows />


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

export default Tournament
