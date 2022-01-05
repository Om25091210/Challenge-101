import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';
import Game from '@components/Game';

const Games = ({ user }) => {
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} />
      <LeftNav />

      <Game user={user} />

      <AllScript />
    </>
  );
};

export default Games;
