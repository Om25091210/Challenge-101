import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import baseURL from '../../utils/baseURL';
import { MPNumberFormat } from '../../utils/helpers';
import LoadingSpinner from '../LoadingSpinner';
import FavTournament from './FavTournament';
import Tournament_Reg from './TournamentRegister';
import { format } from 'date-fns';

const TournamentDisplay = ({
  isLoading,
  tournament,
  profile,
  showfavs,
  searchData,
  user
}) => {
  const [favouriteTournaments, setfavouriteTournaments] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/tournaments/favourites/tournament`, {
        headers: {
          Authorization: Cookies.get('token')
        }
      })
      .then((res) => {
        setfavouriteTournaments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="team_row_box">
        {isLoading === true ? (
          <div className="activity_tag">
            <LoadingSpinner />
          </div>
        ) : tournament.length === 0 ? (
          <div className="team_row">
            <p>No such tournaments found.</p>
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
              <div className="right_game_details tour_row">
                <div className="top_game">
                  <div className="date">
                    <div>
                      <Link href={`/tournament/${result._id}`}>
                        <a>
                          <h3>{result.name}</h3>
                        </a>
                      </Link>
                      {result.startDate
                        ? format(new Date(result.startDate), 'dd.MMM.yyyy')
                        : 'Not defined'}
                    </div>

                    {result.Type && result.Type === 'Ladder' ? (
                      <span className="type_img">
                        <img src="/assets/media/tournament/ladder.png" alt="" />
                      </span>
                    ) : result?.Type === 'Tournament' ? (
                      <span className="type_img">
                        <img
                          src="/assets/media/tournament/tournament.png"
                          alt=""
                        />
                      </span>
                    ) : result.Type === 'Competition' ? (
                      <span className="type_img">
                        <img
                          src="/assets/media/tournament/competition.png"
                          alt=""
                        />
                      </span>
                    ) : null}
                  </div>

                  <div className="reg">
                    <Tournament_Reg tournament={result} user={user} />
                  </div>
                </div>
                <div className="bottom_game">
                  <ul className="users">
                    {result?.playType === 'SOLO' ||
                    result.registered.length > 0 ? (
                      <>
                        {result.registered.map((ppl) => (
                          <li>
                            {' '}
                            <img
                              src={ppl.user?.profilePicUrl}
                              alt={ppl.user?.name}
                            />
                            {/* <a href={`/user/${ppl.user?._id}`}>
                              {ppl.user?.name}
                            </a> */}
                          </li>
                        ))}
                      </>
                    ) : (
                      <>
                        {result.teams.slice(0, 4).map((team) => (
                          <li>
                            <img
                              src={team.teamId?.imgUrl}
                              alt={team.teamId?.name}
                            />

                            {/* <a href={`/team/${team.teamId?._id}`}>
                              {team.teamId?.name}
                            </a> */}
                          </li>
                        ))}
                      </>
                    )}

                    {result.playType === 'TEAMS' ? (
                      <li>
                        <p>
                          {result.teams.length} / {result.numberOfTeam}
                          <b>Signed</b>
                        </p>
                      </li>
                    ) : (
                      <>
                        {result.participants > 0 || result.numberOfTeam > 0 ? (
                          <li>
                            <p>
                              {result.registered.length} / {result.participants}
                              <b>Signed</b>
                            </p>
                          </li>
                        ) : (
                          <p>Not Available</p>
                        )}
                      </>
                    )}
                  </ul>
                  <div className="games">
                    <h3>Games:</h3>

                    {result.games &&
                      result.games.map((gam, idxg) => (
                        <div className="game_logo" key={idxg}>
                          <img src={gam.gameId.imgUrl} alt={gam.gameId.name} />{' '}
                        </div>
                      ))}
                  </div>
                  <div className="prize">
                    <div>
                      <h3>ENTRY FEE</h3>
                      {result.entranceFee.length === 0 ? (
                        <span>Free</span>
                      ) : result.entranceFee !== 0 ? (
                        <span>
                          <MPNumberFormat
                            value={result?.entranceFee}
                            currency={result?.currency}
                          />
                        </span>
                      ) : (
                        'Not Available'
                      )}
                    </div>
                    <div>
                      <h3>PRIZE POOL</h3>
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
        ) : searchData.length > 0 ? (
          searchData.map((result, idx) => (
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
              <div className="right_game_details tour_row">
                <div className="top_game">
                  <div className="date">
                    <div>
                      <Link href={`/tournament/${result.tournament._id}`}>
                        <a>
                          <h3>{result.tournament.name}</h3>
                        </a>
                      </Link>
                      {result.tournament.startDate
                        ? format(
                            new Date(result.tournament.startDate),
                            'dd.MMM.yyyy'
                          )
                        : 'Not defined'}
                    </div>
                    {result.tournament.Type &&
                    result.tournament.Type === 'Ladder' ? (
                      <span className="type_img">
                        <img src="/assets/media/tournament/ladder.png" alt="" />
                      </span>
                    ) : result?.tournament.Type === 'Tournament' ? (
                      <span className="type_img">
                        <img
                          src="/assets/media/tournament/tournament.png"
                          alt=""
                        />
                      </span>
                    ) : result.tournament.Type === 'Competition' ? (
                      <span className="type_img">
                        <img
                          src="/assets/media/tournament/competition.png"
                          alt=""
                        />
                      </span>
                    ) : null}
                  </div>

                  <div className="reg">
                    <Tournament_Reg
                      tournament={result.tournament}
                      user={user}
                      profile={profile}
                    />
                  </div>
                </div>
                <div className="bottom_game">
                  <ul className="users">
                    {result.tournament?.playType === 'SOLO' ||
                    result.tournament.registered.length > 0 ? (
                      <>
                        {result.tournament.registered.map((ppl) => (
                          <li>
                            {' '}
                            <img
                              src={ppl.user?.profilePicUrl}
                              alt={ppl.user?.name}
                            />
                            {/* <a href={`/user/${ppl.user?._id}`}>
                              {ppl.user?.name}
                            </a> */}
                          </li>
                        ))}
                      </>
                    ) : (
                      <>
                        {result.tournament.teams.slice(0, 4).map((team) => (
                          <li>
                            <img
                              src={team.teamId?.imgUrl}
                              alt={team.teamId?.name}
                            />

                            {/* <a href={`/team/${team.teamId?._id}`}>
                              {team.teamId?.name}
                            </a> */}
                          </li>
                        ))}
                      </>
                    )}

                    {result.tournament.playType === 'TEAMS' ? (
                      <li>
                        <p>
                          {result.tournament.teams.length} /{' '}
                          {result.tournament.numberOfTeam}
                          <b>Signed</b>
                        </p>
                      </li>
                    ) : (
                      <>
                        {result.tournament.participants > 0 ||
                        result.tournament.numberOfTeam > 0 ? (
                          <li>
                            <p>
                              {result.tournament.registered.length} /{' '}
                              {result.tournament.participants}
                              <b>Signed</b>
                            </p>
                          </li>
                        ) : (
                          <p>Not Available</p>
                        )}
                      </>
                    )}
                  </ul>
                  <div className="games">
                    <h3>Games:</h3>

                    {result.games &&
                      result.games.map((gam, idxg) => (
                        <div className="game_logo" key={idxg}>
                          <img src={gam.imgUrl} alt={gam.name} />
                        </div>
                      ))}
                  </div>
                  <div className="prize">
                    <div>
                      <h3>ENTRY FEE</h3>
                      {result.tournament.entranceFee === 0 ? (
                        <span>Free</span>
                      ) : result.tournament.entranceFee !== 0 ? (
                        <span>
                          <MPNumberFormat
                            value={result.tournament?.entranceFee}
                            currency={result.tournament?.currency}
                          />
                        </span>
                      ) : (
                        'Not Available'
                      )}
                    </div>
                    <div>
                      <h3>PRIZE POOL</h3>
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
        ) : (
          tournament &&
          tournament.map((result, idx) => (
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
              <div className="right_game_details tour_row">
                <div className="top_game">
                  <div className="date">
                    <div>
                      <Link href={`/tournament/${result.tournament._id}`}>
                        <a>
                          <h3>{result.tournament.name}</h3>
                        </a>
                      </Link>
                      {result.tournament.startDate
                        ? format(
                            new Date(result.tournament.startDate),
                            'dd.MMM.yyyy'
                          )
                        : 'Not defined'}
                    </div>
                    {result.tournament.Type &&
                    result.tournament.Type === 'Ladder' ? (
                      <span className="type_img">
                        <img src="/assets/media/tournament/ladder.png" alt="" />
                      </span>
                    ) : result?.tournament.Type === 'Tournament' ? (
                      <span className="type_img">
                        <img
                          src="/assets/media/tournament/tournament.png"
                          alt=""
                        />
                      </span>
                    ) : result.tournament.Type === 'Competition' ? (
                      <span className="type_img">
                        <img
                          src="/assets/media/tournament/competition.png"
                          alt=""
                        />
                      </span>
                    ) : null}
                  </div>

                  <div className="reg">
                    <Tournament_Reg
                      tournament={result.tournament}
                      user={user}
                      profile={profile}
                    />
                  </div>
                </div>
                <div className="bottom_game">
                  <ul className="users">
                    {result.tournament?.playType === 'SOLO' ||
                    result.tournament.registered.length > 0 ? (
                      <>
                        {result.tournament.registered.map((ppl) => (
                          <li>
                            {' '}
                            <img
                              src={ppl.user?.profilePicUrl}
                              alt={ppl.user?.name}
                            />
                            {/* <a href={`/user/${ppl.user?._id}`}>
                              {ppl.user?.name}
                            </a> */}
                          </li>
                        ))}
                      </>
                    ) : (
                      <>
                        {result.tournament.teams.slice(0, 4).map((team) => (
                          <li>
                            <img
                              src={team.teamId?.imgUrl}
                              alt={team.teamId?.name}
                            />

                            {/* <a href={`/team/${team.teamId?._id}`}>
                              {team.teamId?.name}
                            </a> */}
                          </li>
                        ))}
                      </>
                    )}

                    {result.tournament.playType === 'TEAMS' ? (
                      <li>
                        <p>
                          {result.tournament.teams.length} /{' '}
                          {result.tournament.numberOfTeam}
                          <b>Signed</b>
                        </p>
                      </li>
                    ) : (
                      <>
                        {result.tournament.participants > 0 ||
                        result.tournament.numberOfTeam > 0 ? (
                          <li>
                            <p>
                              {result.tournament.registered.length} /{' '}
                              {result.tournament.participants}
                              <b>Signed</b>
                            </p>
                          </li>
                        ) : (
                          <p>Not Available</p>
                        )}
                      </>
                    )}
                  </ul>
                  <div className="games">
                    <h3>Games:</h3>

                    {result.games &&
                      result.games.map((gam, idxg) => (
                        <div className="game_logo" key={idxg}>
                          <img src={gam.imgUrl} alt={gam.name} />
                        </div>
                      ))}
                  </div>
                  <div className="prize">
                    <div>
                      <h3>ENTRY FEE</h3>
                      {result.tournament.entranceFee === 0 ? (
                        <span>Free</span>
                      ) : result.tournament.entranceFee !== 0 ? (
                        <span>
                          <MPNumberFormat
                            value={result.tournament?.entranceFee}
                            currency={result.tournament?.currency}
                          />
                        </span>
                      ) : (
                        'Not Available'
                      )}
                    </div>
                    <div>
                      <h3>PRIZE POOL</h3>
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
    </>
  );
};

export default TournamentDisplay;
