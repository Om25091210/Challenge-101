import { useState, useEffect } from 'react';
import Head from 'next/head';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';

import AllScript from './AllScript';

const NFTGamesList = ({ user }) => {
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} />
      <LeftNav user={user} />
      <div className="main_middle profile_middle">
        <div className="join_game_box">
          <h1>Multiplayr Weekly Series ||</h1>
          <div className="points">
            <span>Match room Best of 3</span> <span> 09/May/2022</span>{' '}
            <span>4:30PM</span>
          </div>
          <div className="vs_box">
            <div className="team1">
              <div className="imgs"></div>
              <span>Team one</span>{' '}
            </div>
            <div className="vs">VS</div>
            <div className="team2">
              <div className="imgs"></div>
              <span>Team Two</span>{' '}
            </div>
          </div>
          <div className="show_name_game">
            <h3>CS:GO</h3>
            <span className="rounds">DE_Dust2</span>{' '}
            <span className="rounds">16 rounds</span>{' '}
          </div>
          <div className="time_connect">
            <h2>Time to connect</h2>
            <div className="time">04:30</div>
            <div className="left_games">
              <ul>
                <li>
                  <div className="games_names">
                    <div className="img"></div>
                    <div className="tit">
                      TheMadTitan
                      <b>
                        <i className="fa fa-steam" aria-hidden="true"></i> Z3US360
                      </b>
                    </div>
                  </div>
                  <div className="ready">Ready</div>
                </li>
                <li>
                  <div className="games_names">
                    <div className="img"></div>
                    <div className="tit">
                      TheMadTitan
                      <b>
                        <i className="fa fa-steam" aria-hidden="true"></i> Z3US360
                      </b>
                    </div>
                  </div>
                  <div className="ready">Ready</div>
                </li>
                <li>
                  <div className="games_names">
                    <div className="img"></div>
                    <div className="tit">
                      TheMadTitan
                      <b>
                        <i className="fa fa-steam" aria-hidden="true"></i> Z3US360
                      </b>
                    </div>
                  </div>
                  <div className="ready">Ready</div>
                </li>
                <li>
                  <div className="games_names">
                    <div className="img"></div>
                    <div className="tit">
                      TheMadTitan
                      <b>
                        <i className="fa fa-steam" aria-hidden="true"></i> Z3US360
                      </b>
                    </div>
                  </div>
                  <div className="ready">Ready</div>
                </li>
                <li>
                  <div className="games_names">
                    <div className="img"></div>
                    <div className="tit">
                      TheMadTitan
                      <b>
                        <i className="fa fa-steam" aria-hidden="true"></i> Z3US360
                      </b>
                    </div>
                  </div>
                  <div className="ready">Ready</div>
                </li>
              </ul>
            </div>

            <div className="btn">Connect to the server</div>

            <div className="right_games">
              <ul>
                <li>
                  <div className="games_names">
                    <div className="img"></div>
                    <div className="tit">
                      TheMadTitan
                      <b>
                        <i className="fa fa-steam" aria-hidden="true"></i> Z3US360
                      </b>
                    </div>
                  </div>
                  <div className="ready">Ready</div>
                </li>

                <li>
                  <div className="games_names">
                    <div className="img"></div>
                    <div className="tit">
                      TheMadTitan
                      <b>
                        <i className="fa fa-steam" aria-hidden="true"></i> Z3US360
                      </b>
                    </div>
                  </div>
                  <div className="ready">Ready</div>
                </li>

                <li>
                  <div className="games_names">
                    <div className="img"></div>
                    <div className="tit">
                      TheMadTitan
                      <b>
                        <i className="fa fa-steam" aria-hidden="true"></i> Z3US360
                      </b>
                    </div>
                  </div>
                  <div className="ready">Ready</div>
                </li>
                <li>
                  <div className="games_names">
                    <div className="img"></div>
                    <div className="tit">
                      TheMadTitan
                      <b>
                        <i className="fa fa-steam" aria-hidden="true"></i> Z3US360
                      </b>
                    </div>
                  </div>
                  <div className="ready">Ready</div>
                </li>
                <li>
                  <div className="games_names">
                    <div className="img"></div>
                    <div className="tit">
                      TheMadTitan
                      <b>
                        <i className="fa fa-steam" aria-hidden="true"></i> Z3US360
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

export default NFTGamesList;
