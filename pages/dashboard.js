import { useState, useEffect } from 'react'
import Head from 'next/head'
import MetaDash from '../components/MetaDash';
import SignedHeader from '../components/SignedHeader';
import LeftNav from '../components/LeftNav';
import SignedMainContent from '../components/dashboard/SignedMainContent';
import RightSection from '../components/RightSection';
import FooterMain from '../components/FooterMain';

const Dashboard = ({ user }) => {


  return (

  <>

    <MetaDash />


    <SignedHeader user={user}/>
    

    <LeftNav />

    <SignedMainContent />


    <RightSection user={user}/>
   
    <script src="/assets/js/dash/jquery-2.1.4.min.js"/>
  <script src="/assets/plugins/global/plugins.bundle.js"/>
  <script src="/assets/js/scripts.bundle.js"/>

  <script src="/assets/plugins/global/plugins.bundle.js"/>
  <script src="/assets/js/dash/jquery.mCustomScrollbar.js"/>
  <script src="/assets/js/dash/slick.js"/>
  <script src="/assets/js/dash/custom.js"/>



</>

  )
}

export default Dashboard
