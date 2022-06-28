import { useState, useEffect } from 'react';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import baseURL from '../../utils/baseURL';
import Moment from 'moment';

import AllScript from '../AllScript';

const NFTGamesList = ({ user, challenge }) => {
  const teamOne = challenge.players.filter(
    (plr) => plr.teamId === challenge.challenger._id
  );
  const teamTwo = challenge.players.filter(
    (plr) => plr.teamId === challenge.challenged._id
  );

  return (
    <>
      <MetaDash />
      <SignedHeader user={user} />
      <LeftNav user={user} />
      <div className="main_middle profile_middle">
        <div className="join_game_box">
          <h1>Challenge</h1>
          <div className="points">
            <span>{Moment(challenge.startDate).format('DD/MMM/YYYY')}</span>{' '}
            <span>{Moment(challenge.startDate).format('hh:mm A')}</span>
          </div>
          <div className="vs_box">
            <div className="team1">
              <div className="imgs">
                <img
                  src={challenge.challenger.imgUrl}
                  alt={challenge.challenger.name}
                />
              </div>
              <span>{challenge.challenger.name}</span>{' '}
            </div>
            <div className="vs">VS</div>
            <div className="team2">
              <div className="imgs">
                <img
                  src={challenge.challenged.imgUrl}
                  alt={challenge.challenged.name}
                />
              </div>
              <span>{challenge.challenged.name}</span>{' '}
            </div>
          </div>
          <div className="show_name_game">
            <h3>{challenge.game.name}</h3>
            <span className="rounds">
              Platform: {challenge.game?.platform.map((plt) => plt)}{' '}
            </span>{' '}
            {/* <span className="rounds">16 rounds</span>{' '} */}
          </div>
          <div className="time_connect">
            <h2>Time to connect</h2>
            <div className="time"></div>
            <div className="left_games">
              <ul>
                <li>
                  <div className="games_names">
                    <div className="img"></div>

                    <div className="tit">
                      {challenge.challenger.name}
                      <b>
                        <i className="fa fa-steam" aria-hidden="true"></i>{' '}
                        Z3US360
                      </b>
                    </div>
                  </div>
                  <div className="ready">Ready</div>
                </li>
                <li>
                  <div className="games_names">
                    <div className="img"></div>
                    <div className="tit">
                      {challenge.challenger.name}
                      <b>
                        <i className="fa fa-steam" aria-hidden="true"></i>{' '}
                        Z3US360
                      </b>
                    </div>
                  </div>
                  <div className="ready">Ready</div>
                </li>
                <li>
                  <div className="games_names">
                    <div className="img"></div>
                    <div className="tit">
                      {challenge.challenger.name}
                      <b>
                        <i className="fa fa-steam" aria-hidden="true"></i>{' '}
                        Z3US360
                      </b>
                    </div>
                  </div>
                  <div className="ready">Ready</div>
                </li>
                <li>
                  <div className="games_names">
                    <div className="img"></div>
                    <div className="tit">
                      {challenge.challenger.name}
                      <b>
                        <i className="fa fa-steam" aria-hidden="true"></i>{' '}
                        Z3US360
                      </b>
                    </div>
                  </div>
                  <div className="ready">Ready</div>
                </li>
                <li>
                  <div className="games_names">
                    <div className="img"></div>
                    <div className="tit">
                      {challenge.challenger.name}
                      <b>
                        <i className="fa fa-steam" aria-hidden="true"></i>{' '}
                        Z3US360
                      </b>
                    </div>
                  </div>
                  <div className="ready">Ready</div>
                </li>
              </ul>
            </div>

            {challenge.room.roomId > 0 ? (
              <>
                <div className="btn">
                  <p>Room ID: {challenge.room.roomId}</p>
                </div>
                <div className="btn">
                  <p>Room PWD: {challenge.room.roompwd}</p>
                </div>
              </>
            ) : (
              <>
                <div className="btn">
                  <p>Room ID: ---</p>
                </div>
                <div className="btn">
                  <p>Room PWD: ---</p>
                </div>
              </>
            )}

            <div className="right_games">
              <ul>
                <li>
                  <div className="games_names">
                    <div className="img">
                      <img
                        src={
                          teamTwo[0]?.playerId.apidata.data.platformInfo
                            .avatarUrl
                        }
                        alt={
                          teamTwo[0]?.playerId.apidata.data.platformInfo
                            .platformUserHandle
                        }
                      />
                    </div>
                    <div className="tit">
                      {challenge.challenged.name}
                      <b>
                        <i className="fa fa-steam" aria-hidden="true"></i>{' '}
                        {
                          teamTwo[0]?.playerId.apidata.data.platformInfo
                            .platformUserHandle
                        }
                      </b>
                    </div>
                  </div>
                  <div className="ready">Ready</div>
                </li>

                <li>
                  <div className="games_names">
                    <div className="img"></div>
                    <div className="tit">
                      {challenge.challenged.name}
                      <b>
                        <i className="fa fa-steam" aria-hidden="true"></i>{' '}
                        Z3US360
                      </b>
                    </div>
                  </div>
                  <div className="ready">Ready</div>
                </li>

                <li>
                  <div className="games_names">
                    <div className="img"></div>
                    <div className="tit">
                      {challenge.challenged.name}
                      <b>
                        <i className="fa fa-steam" aria-hidden="true"></i>{' '}
                        Z3US360
                      </b>
                    </div>
                  </div>
                  <div className="ready">Ready</div>
                </li>
                <li>
                  <div className="games_names">
                    <div className="img"></div>
                    <div className="tit">
                      {challenge.challenged.name}
                      <b>
                        <i className="fa fa-steam" aria-hidden="true"></i>{' '}
                        Z3US360
                      </b>
                    </div>
                  </div>
                  <div className="ready">Ready</div>
                </li>
                <li>
                  <div className="games_names">
                    <div className="img"></div>
                    <div className="tit">
                      {challenge.challenged.name}
                      <b>
                        <i className="fa fa-steam" aria-hidden="true"></i>{' '}
                        Z3US360
                      </b>
                    </div>
                  </div>
                  <div className="ready">Ready</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const response = await fetch(`${baseURL}/api/challenges/${id}`);
  const challenge = await response.json();

  return {
    props: { challenge }
  };
};

export default NFTGamesList;
