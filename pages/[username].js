import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import ProfileBox from '@components/profile/ProfileBox';
import ProfileTabs from '../components/profile/ProfileTabs';
import ProfileData from '../components/profile/ProfileData';
import AllScript from './AllScript';
import baseURL from '@utils/baseURL';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Profile = ({ user, Userdata, games }) => {
  const router = useRouter();

  if (Userdata) {
    return (
      <>
        <MetaDash />
        <SignedHeader user={user} />
        <LeftNav />

        <div className="main_middle profile_middle">
          <ProfileBox user={user} Userdata={Userdata} games={games}/>
          <ProfileTabs />
          <ProfileData user={user} Userdata={Userdata} />
        </div>

        <AllScript />
      </>
    );
  } else {
    return null;
  }
};


export const getServerSideProps = async (context) => {
  const { username } = context.params;

  const response = await fetch(`${baseURL}/api/profile/${username}`);
  const Userdata = await response.json();

  const res = await fetch(`${baseURL}/api/all/games`);
  const games = await res.json();

  return {
    props: { Userdata, games }
  };
};

export default Profile;
