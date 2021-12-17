
import Head from 'next/head'
import {MPNumberFormat} from '../../utils/helpers'
import { format } from 'date-fns';
import Link from "next/link"

const TournamentRows = ({tournaments , searchResults}) => {

    if (searchResults.length>0) {
      tournaments = searchResults
    }

   if (tournaments) {

  return (

<div>
              
             {!tournaments || tournaments.length === 0 ? (
              <div className="activity_tag">
               <span className="act_name">No new tournaments ...</span>
               </div>
             ) : (
               tournaments.map((result) => (

                <div className="game_row"> <span className="star live"><i className="fa fa-star" aria-hidden="true"></i></span>
                  <div className="game_pos"></div>
                  <div className="right_game_details">
                    <div className="top_game">
                      <div className="date">
                        <Link href={`/tournament/${result.tournament._id}`}>
                          <a><h3>{result.tournament.name}</h3></a>
                        </Link>
                        {result.tournament.startDate ? format(new Date(result.tournament.startDate), 'd MMM yyyy, hh:mm a') : 'Not defined'}
                        </div>
                      <div className="reg">
                        <button className="active">{result.tournament.status}</button>
                      </div>
                    </div>
                    <div className="bottom_game">
                      <div className="users"><img src="/assets/media/category/users.png" alt=""/></div>
                      <div className="games">
                        <h3>Games:</h3>
                        <div className="game_logo"><img src="/assets/media/category/game1.png" alt=""/> COD 4,</div>
                        <div className="game_logo"><img src="/assets/media/category/game2.png" alt=""/> DOTA 2,</div>
                        <div className="game_logo"><img src="/assets/media/category/game3.png" alt=""/> CSGO</div>
                      </div>
                      <div className="prize">
                        <h3>PRIZE POOL:</h3>
                        <MPNumberFormat value={result.tournament.prizepool} currency={result.tournament.currency} />
                        </div>
                    </div>
                  </div>
                </div>

                ))


               )}

</div>

) } else {

                return null
               }
    }

export default TournamentRows;
