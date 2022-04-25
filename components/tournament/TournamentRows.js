import Head from 'next/head';
import { MPNumberFormat } from '../../utils/helpers';
import { format } from 'date-fns';
import Link from 'next/link';
import FavTournament from './FavTournament';

const TournamentRows = ({
  tournaments,
  searchResults,
  user,
  favouriteTournaments,
  showfavs
}) => {
  if (searchResults.length > 0) {
    tournaments = searchResults;
  }

  if (tournaments) {
    return (
      <div>
        {!tournaments || tournaments.length === 0 ? (
          <div className="activity_tag">
            <span className="act_name">No new tournaments ...</span>
          </div>
        ) : showfavs === true ? (
          favouriteTournaments.map((result, idx) => (
            <div className="game_row" key={idx}>
              <FavTournament tournament={result} user={user} />
              <div className="game_pos">
                <div className="game_loc">
                  {' '}
                  <img src="/assets/media/category/game_loc.jpg" alt="" />
                </div>

                <span className="tour_logo">
                  {' '}
                  <img src={result.imgUrl} alt="" />
                </span>
              </div>
              <div className="right_game_details">
                <div className="top_game">
                  <div className="date">
                    <Link href={`/tournament/${result._id}`}>
                      <a>
                        <h3>{result.name}</h3>
                      </a>
                    </Link>
                    {result.startDate
                      ? format(new Date(result.startDate), 'd.MMM.yyyy')
                      : 'Not defined'}
                  </div>
                  <div className="reg">
                    <button className="active">
                      {result.status ? result.status : 'REGISTERED'}
                    </button>
                  </div>
                </div>
                <div className="bottom_game">
                  <div className="users">
                    <img src="/assets/media/category/users.png" alt="" />
                  </div>
                  <div className="games">
                    <h3>Games:</h3>

                    {result.games &&
                      result.games.map((gam, idxg) => (
                        <div className="game_logo" key={idxg}>
                          <img src={gam.imgUrl} alt={gam.name} /> {gam.name}
                        </div>
                      ))}
                  </div>
                  <div className="prize">
                    <div>
                      <h3>ENTRY FEE:</h3>
                      <span>Free </span>
                    </div>
                    <div>
                      <h3>PRIZE POOL:</h3>
                      {result.prizepool ? (
                        <MPNumberFormat
                          value={result.prizepool}
                          currency={result.currency}
                        />
                      ) : (
                        'Not Available'
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          tournaments.map((result, idx) => (
            <div className="game_row" key={idx}>
              <FavTournament tournament={result.tournament} user={user} />
              <div className="game_pos">
                <div className="game_loc">
                  {' '}
                  <img src="/assets/media/category/game_loc.jpg" alt="" />
                </div>

                <span className="tour_logo">
                  {' '}
                  <img src={result.tournament.imgUrl} alt="" />
                </span>
              </div>
              <div className="right_game_details">
                <div className="top_game">
                  <div className="date">
                    <Link href={`/tournament/${result.tournament._id}`}>
                      <a>
                        <h3>{result.tournament.name}</h3>
                      </a>
                    </Link>
                    {result.tournament.startDate
                      ? format(
                          new Date(result.tournament.startDate),
                          'd.MMM.yyyy'
                        )
                      : 'Not defined'}
                  </div>
                  <div className="reg">
                    <button className="active">
                      {result.tournament.status
                        ? result.tournament.status
                        : 'REGISTERED'}
                    </button>
                  </div>
                </div>
                <div className="bottom_game">
                  <div className="users">
                    <img src="/assets/media/category/users.png" alt="" />
                  </div>
                  <div className="games">
                    <h3>Games:</h3>

                    {result.games &&
                      result.games.map((gam, idxg) => (
                        <div className="game_logo" key={idxg}>
                          <img src={gam.imgUrl} alt={gam.name} /> {gam.name}
                        </div>
                      ))}
                  </div>
                  <div className="prize">
                    <div>
                      <h3>ENTRY FEE:</h3>
                      <span>Free </span>
                    </div>
                    <div>
                      <h3>PRIZE POOL:</h3>
                      {result.tournament.prizepool ? (
                        <MPNumberFormat
                          value={result.tournament.prizepool}
                          currency={result.tournament.currency}
                        />
                      ) : (
                        'Not Available'
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default TournamentRows;
