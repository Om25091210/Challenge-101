import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import ProfileBox from '@components/profile/ProfileBox';
import ProfileTabs from '@components/profile/ProfileTabs';
import ProfileData from '@components/profile/ProfileData';
import AllScript from '../AllScript';
import baseURL from '@utils/baseURL';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getData } from '@utils/fetchData'

const Profile = ({ user, Userdata, games, player, products}) => {
  const router = useRouter();

  if (Userdata) {
    return (
      <>
        <MetaDash />
        <SignedHeader user={user} />
        <LeftNav user={user} />

        <div className="main_middle profile_middle">
          <ProfileBox user={user} Userdata={Userdata} games={games} player={player}/>
          <ProfileTabs />
          <ProfileData user={user} Userdata={Userdata} products={products}/>
        </div>

        <AllScript />
      </>
    );
  } else {
    return null;
  }
};


export const getServerSideProps = async (context, query) => {
  const { id } = context.params;
  const page = query ? (query.page || 1) : 1
  const category = query ? (query.category || 'all' ) : 'all'
  const sort = query ? (query.sort || '' ) : ''
  const search = query ? (query.search || 'all') : 'all'

  try {
  const response = await fetch(`${baseURL}/api/profile/${id}`);
  const Userdata = await response.json();

  const res = await fetch(`${baseURL}/api/all/games`);
  const games = await res.json();

  const player = [];

  const resprod = await getData(
      `product?limit=${page * 6}&category=${category}&sort=${sort}&title=${search}`
    )

  return {
    props: { Userdata, games, player, products: resprod.products, result: resprod.result}
  };
  } catch {
    return {
      props: {}
    };
  }  
};


export default Profile;
