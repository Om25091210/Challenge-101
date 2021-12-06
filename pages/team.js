import { useState, useEffect } from 'react';
import Head from 'next/head';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import TeamProfileBox from '@components/team/TeamProfileBox';
import TeamTabs from '@components/team/TeamTabs';
import TeamProfileData from '@components/team/TeamProfileData';
import FooterMain from '@components/FooterMain';
import AllScript from './AllScript';

const Team = ({ user }) => {
  return (
    <>
      <MetaDash />

      <SignedHeader user={user} />

      <LeftNav />

      <div className="main_middle profile_middle">
        {/* <TeamProfileBox />  */}

        <TeamTabs />

        <TeamProfileData />
      </div>

      <AllScript />
    </>
  );
};

export default Team;
