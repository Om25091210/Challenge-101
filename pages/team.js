import { useState, useEffect } from 'react';
import Head from 'next/head';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import TeamProfileBox from '@components/team/teamprofilebox';
import TeamTabs from '@components/team/TeamTabs';
import TeamProfileData from '@components/team/TeamProfileData';
import FooterMain from '@components/FooterMain';
import AllScript from './AllScript';
import baseURL from '@utils/baseURL';

const Team = ({ user, data }) => {
  console.log(data);

  if (data) {
    return (
      <>
        <MetaDash />

        <SignedHeader user={user} />

        <LeftNav />

        <div className="main_middle profile_middle">
          <TeamProfileBox user={user} data={data} />

          <TeamTabs user={user} data={data} />

          <TeamProfileData user={user} data={data} />
        </div>

        <AllScript />
      </>
    );
  } else {
    return null;
  }
};

export const getServerSideProps = async () => {
  try {
    const teamId = '6191520fd802397e7abf218d';
    const response = await fetch(`${baseURL}/api/teams/${teamId}`);
    const data = await response.json();

    return {
      props: { data }
    };
  } catch {
    return {
      props: {}
    };
  }
};

export default Team;
