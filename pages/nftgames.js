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
        <div className="play_game_list">
          <h1>Play Game</h1>

          <ul className="play_games">
            <li>
              <a href="/nft/carslane">
                <button className="">
                  <img src="/assets/media/play/cars.jpg" alt="" />
                </button>
                <h2> Cars Lane</h2>
              </a>
            </li>

            <li>
              <a href="#/dodgerocks">
                <button className="">
                  <img src="/assets/media/play/rocks.jpg" alt="" />

                  <h2>Dodge Rocks</h2>
                </button>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <AllScript />
    </>
  );
};

export default NFTGamesList;
