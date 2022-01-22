import axios from 'axios';
import React, { Component } from 'react';
import cookie from 'js-cookie';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import baseURL from '@utils/baseURL';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import SignedMainContent from '@components/dashboard/SignedMainContent';
import RightSection from '@components/dashboard/RightSection';
import AllScript from './AllScript';
import { parseCookies } from 'nookies';

const scrollToBottom = (divRef) => {
  divRef.current && divRef.current.scrollIntoView({ behaviour: 'smooth' });
};

const Dashboard = ({ user, profile, posts, suggplayers, matches }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/chats`, {
        headers: {
          Authorization: cookie.get('token')
        }
      })
      .then((res) => {
        console.log(res.data);
        setChats(res.data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const router = useRouter();
  const { chat } = router.query;

  const [messages, setMessages] = useState([]);

  return (
    <>
      <MetaDash />

      <SignedHeader user={user} />

      <LeftNav />

      <SignedMainContent posts={posts} user={user} profile={profile} />

      <RightSection
        user={user}
        suggestedplayers={suggplayers}
        profile={profile}
        matches={matches}
      />

      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const response = await fetch(`${baseURL}/api/posts`);
  const data = await response.json();
  const posts = data.posts;

  const { token } = parseCookies(context);

  const res = await fetch(`${baseURL}/api/profile/suggested/players`, {
    method: 'post',
    headers: {
      Authorization: token
    }
  });
  const suggplayers = await res.json();

  const resma = await fetch(`${baseURL}/api/matches/topmatches`, { method: 'get'});
  const matches = await resma.json();
  console.log('in dashboard server props');

  console.log(matches);

  return {
    props: { posts, suggplayers, matches }
  };
};

export default Dashboard;
