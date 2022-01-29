import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';
import Game from '@components/games/Game';
import baseURL from '@utils/baseURL';

const Games = ({ user, data }) => {
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} />
      <LeftNav />

      <Game user={user} data={data} />

      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  try {
    const response = await fetch(`${baseURL}/api/games/${id}`);
    const data = await response.json();

    return {
      props: {
        data
      }
    };
  } catch {
    return {
      props: {}
    };
  }
};

export default Games;
