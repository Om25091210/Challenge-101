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

const Profile = ({ user, Userdata }) => {
  const router = useRouter();

  if (Userdata[0]) {
    return (
      <>
        <MetaDash />
        <SignedHeader user={user} />
        <LeftNav />

        <div className="main_middle profile_middle">
          <ProfileBox user={user} Userdata={Userdata} />
          <ProfileTabs />
          <ProfileData user={Userdata} />
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

  return {
    props: { Userdata }
  };
};

export default Profile;