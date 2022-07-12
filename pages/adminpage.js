import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import baseURL from '@utils/baseURL';
import AllScript from './AllScript';
import AdminTournaments from '../components/adminfiles/AdminTournaments';
import AdminChallenges from '../components/adminfiles/AdminChallenges';

const Adminpage = ({ user, data }) => {
  console.log(data);
  return (
    <>
      <MetaDash />

      <SignedHeader user={user} />

      <LeftNav user={user} />

      <div className="main_middle profile_middle">
        <AdminTournaments tournaments={data.tournaments} />
        <br /> <br />
        <AdminChallenges challenges={data.challenges} />
      </div>

      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const response = await fetch(`${baseURL}/api/admin/admindata`);
  const data = await response.json();

  return {
    props: { data }
  };
};

export default Adminpage;
