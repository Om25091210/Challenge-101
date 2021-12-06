import { useState, useEffect } from 'react';
import Head from 'next/head';
import MetaDash from '../components/MetaDash';
import SignedHeader from '../components/SignedHeader';
import LeftNav from '../components/LeftNav';
import Teams from '../components/discover/Teams';
import Coaches from '../components/discover/Coaches';
import Players from '../components/discover/Players';
import Arenas from '../components/discover/Arenas';
import Jobs from '../components/discover/Jobs';

import FooterMain from '../components/FooterMain';
import AllScript from './AllScript';

const Discover = ({ user }) => {
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
              <a href="#">
                <span>
                  <b className="icon">
                    <img src="/assets/media/ranking/console.png" alt="" />
                  </b>{' '}
                  Browse Games
                </span>
                <i className="fa fa-angle-right" aria-hidden="true"></i>
                <span className="other_logo">
                  <img src="/assets/media/team1.png" alt="" />
                </span>
                <span className="other_logo">
                  <img src="/assets/media/team1.png" alt="" />
                </span>
              </a>
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
            <Teams />

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

export default Discover;
