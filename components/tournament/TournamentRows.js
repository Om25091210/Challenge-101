import Head from 'next/head';
import { MPNumberFormat } from '../../utils/helpers';
import { format } from 'date-fns';
import Link from 'next/link';

const TournamentRows = ({ tournaments, searchResults}) => {

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
        ) : (
          tournaments.map((result, idx) => (
            <div className="game_row" key={idx}>
              {' '}
              <span className="star live">
                <i className="fa fa-star" aria-hidden="true"></i>
              </span>
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
                          'd MMM yyyy, hh:mm a'
                        )
                      : 'Not defined'}
                  </div>
                  <div className="reg">
                    <button className="active">
                      {result.tournament.status}
                    </button>
                  </div>
                </div>
                <div className="bottom_game">
                  <div className="users">
                    <img src="/assets/media/category/users.png" alt="" />
                  </div>
                  <div className="games">
                    <h3>Games:</h3>

                    {result.games && result.games.map((gam, idxg) => ( 

                      <div className="game_logo" key={idxg}>
                        <img src={gam.imgUrl} alt={gam.name} /> {gam.name}
                      </div> 
                    ))}

                  </div>
                  <div className="prize">
                    <h3>PRIZE POOL:</h3>
                    <MPNumberFormat
                      value={result.tournament.prizepool}
                      currency={result.tournament.currency}
                    />
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
