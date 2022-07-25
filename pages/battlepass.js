import React, { useEffect, useState } from 'react';
import baseURL from '@utils/baseURL';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from './AllScript';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';

const battlepass = ({ user, data }) => {
  const [bpData, setBpData] = useState(data);

  return (
    <>
      <MetaDash />

      <SignedHeader user={user} />

      <LeftNav user={user} />
      <div className="main_middle profile_middle">
        <h2>
          {bpData.title} - {bpData.user.name}
        </h2>
        <p>XP - {bpData.xp_points}</p>
        <p>Level - {bpData.levels}</p>
      </div>
      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);
  const response = await fetch(`${baseURL}/api/battlepass`, {
    method: 'GET',
    headers: {
      Authorization: token
    }
  });
  const data = await response.json();

  return {
    props: { data }
  };
};

export default battlepass;
