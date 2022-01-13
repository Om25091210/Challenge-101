import { useState, useEffect } from 'react';
import Head from 'next/head';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import Teams from '@components/discover/Teams';
import Coaches from '@components/discover/Coaches';
import Players from '@components/discover/Players';
import Arenas from '@components/discover/Arenas';
import Jobs from '@components/discover/Jobs';
import baseURL from '@utils/baseURL';

import FooterMain from '@components/FooterMain';
import AllScript from './AllScript';


const Discover = ({ user, profile, games }) => {
let myState = {};

  const [filteredResults, setFilteredResults] = useState([]);

  myState.filteredResults = filteredResults;
  myState.setFilteredResults = setFilteredResults;

  return (
    <>
      <MetaDash />

      <SignedHeader user={user} />

      <LeftNav />

      <div className="main_middle profile_middle">
        <div className="discovery_page">
          <div className="white_bg">
            <h2>GAME</h2>

            <div className="tit">
              <a href="#more_games" className="common_poup">
                <span>
                  <b className="icon">
                    <img src="/assets/media/ranking/console.png" alt="" />
                  </b>{' '}
                  Browse Games
                </span>
                <i className="fa fa-angle-right" aria-hidden="true"></i>

                <div className="hover_games">
                  {games.map((game, idx) => (
                    <div className="other_logo">
                      <img src={game.imgUrl} alt={game.name} />
                    </div>
                  ))}
                </div>
              </a>

              <div id="more_games" style={{ display: 'none' }}>
                <ul>
                  {games.map((game, idx) => (
                    <li>
                      <div className="game_pic">
                        <img src={game.imgUrl} alt={game.name} />
                      </div>
                      <p>{game.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <ul className="profile_tab_btn discover_tab_btn">
              <li className="active">
                <a href="#!" rel="teams">
                  TEAMS{' '}
                </a>
              </li>
              <li>
                <a href="#!" rel="players">
                  {' '}
                  PLAYERS
                </a>
              </li>
              <li>
                <a href="#!" rel="coaches">
                  {' '}
                  COACHES{' '}
                </a>
              </li>
              <li>
                <a href="#!" rel="arenas">
                  {' '}
                  ARENAS
                </a>
              </li>
              <li>
                <a href="#!" rel="jobs">
                  {' '}
                  JOBS{' '}
                </a>
              </li>
            </ul>
          </div>

          <div className="prfoile_tab_data ">
            <Teams user={user} profile={profile} myState={myState}/>

            <Players />

            <Coaches />

            <Arenas />

            <Jobs />
          </div>
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

export default Discover;
