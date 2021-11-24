import { useState, useEffect } from 'react'
import Head from 'next/head'
import MetaDash from '../components/MetaDash';
import SignedHeader from '../components/SignedHeader';
import LeftNav from '../components/LeftNav';
import Date from '../components/calendar/date';
import Match from '../components/calendar/match';


import FooterMain from '../components/FooterMain';


const Calendar = ({ user }) => {

  return (

  <div>

    <MetaDash />

    <SignedHeader user={user}/>

    <LeftNav />



<div className="main_middle profile_middle">
<<<<<<< HEAD
<div className="calendar_page">
    <div className="white_bg">
=======
<div class="calendar_page discovery_page">
    <div class="white_bg">
>>>>>>> 392d1d5178f226f5c3fea2dbdaee459fa0bd5865
      <h2>GAME</h2>
      <div className="tit"> <a href="#"><span> <b className="icon">
          <img src="/assets/media/ranking/console.png" alt="" /></b> Browse Games</span> 
          <i className="fa fa-angle-right" aria-hidden="true" ></i> <span className="other_logo">
              <img src="/assets/media/team1.png" alt="" /></span> <span className="other_logo">
                  <img src="/assets/media/team1.png" alt="" /></span> </a> </div>


   
<Date />


     <Match />
    </div>
  </div>
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

export default Calendar
