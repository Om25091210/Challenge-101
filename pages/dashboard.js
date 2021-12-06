import { useState, useEffect } from 'react';
import Head from 'next/head';
import MetaDash from '../components/MetaDash';
import SignedHeader from '../components/SignedHeader';
import LeftNav from '../components/LeftNav';
import SignedMainContent from '../components/dashboard/SignedMainContent';
import RightSection from '../components/RightSection';
import FooterMain from '../components/FooterMain';
import AllScript from './AllScript';

const Dashboard = ({ user }) => {
  console.log(user);

  return (
    <>
      <MetaDash />

      <SignedHeader user={user} />

      <LeftNav />

      <SignedMainContent />

      <RightSection user={user} />

      <AllScript />
    </>
  );
};

export default Dashboard;
