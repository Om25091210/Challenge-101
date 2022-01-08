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

      <div className="main_middle profile_middle">
        <div className="white_bg">
          <h1>All Games</h1>

          <>
            <ul className="game_list_page">
              {games.map((games) => (
                <li key={games._id}>
                  <a href={`/games/${games._id}`}>
                    <div className="imgs">
                      {' '}
                      <img src={games.imgUrl} alt={games.name} />
                    </div>
                    <div className="bottom_data">
                      <h3>{games.name}</h3>
                      <p>{games.description}</p>
                      <span>
                        <i
                          className="fa fa-long-arrow-right"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </>
        </div>
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
