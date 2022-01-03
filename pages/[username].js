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

const Profile = ({ user, Userdata, games, player }) => {
  const router = useRouter();

  if (Userdata) {
    return (
      <>
        <MetaDash />
        <SignedHeader user={user} />
        <LeftNav />

        <div className="main_middle profile_middle">
          <ProfileBox user={user} Userdata={Userdata} games={games} player={player}/>
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

  const plyres = await fetch(`${baseURL}/api/pubg/player/WackyJacky101A`);
  console.log(plyres)
  const player = await plyres.json();
  

  return {
    props: { Userdata, games, player }
  };
};

export default Profile;
