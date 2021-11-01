import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import Head from 'next/head'
import MetaDash from '../components/MetaDash';
import SignedHeader from '../components/SignedHeader';
import LeftNav from '../components/LeftNav';
import SignedMainContent from '../components/SignedMainContent';
import RightSection from '../components/RightSection';


import FooterMain from '../components/FooterMain';
import { useRouter } from 'next/router'

import SignOut from '../pages/user/signout'

import axios from 'axios';
import baseURL from '../utils/baseURL';


function Dashboard(req,res) {

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


  if (user){

// RR

console.log('calling signup axios');

    const email = user.email
    const password = user.password
    const name= user.name
      const res =  axios.post(`${baseURL}/api/signup/`, {
      email,
      password,
      name
    });
// RR

  }

  return (

  <>

    <MetaDash />


    <SignedHeader />

    
    <div className="welcome">
              {user && (
                <>
                  <h1>
                    Welcome, <b>{user.username}</b>
                  </h1>
                </>
              )}
            </div>

    

    <LeftNav />

    <SignedMainContent />


    <RightSection />
   

                


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
