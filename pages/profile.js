import MetaDash from '../components/MetaDash';
import SignedHeader from '../components/SignedHeader';
import LeftNav from '../components/LeftNav';
import ProfileBox from '../components/profile/ProfileBox';
import ProfileTabs from '../components/profile/ProfileTabs';
import ProfileData from '../components/profile/ProfileData';
import AllScript from './AllScript';

const Profile = ({ user }) => {
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} />
      <LeftNav />

      <div className="main_middle profile_middle">
        <ProfileBox user={user} />
        <ProfileTabs />
        <ProfileData user={user} />
      </div>

      <AllScript />
    </>
  );
};

export default Profile;
