import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';
import baseURL from '@utils/baseURL';

const Games = ({ user, games }) => {
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} />
      <LeftNav />

      <div style={{ marginLeft: '250px', marginTop: '80px' }}>
        {games.map((games) => (
          <>
            <div>
              <ul>
                <li key={games._id}>
                  <a href={`/games/${games._id}`}>
                    <img src={games.imgUrl} alt={games.name} />
                    <h3>{games.name}</h3>
                    <p>{games.description}</p>
                  </a>
                </li>
              </ul>
            </div>
          </>
        ))}
      </div>

      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const response = await fetch(`${baseURL}/api/all/games`);
  const games = await response.json();

  return {
    props: { games }
  };
};

export default Games;
