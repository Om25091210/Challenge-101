import { useState, useEffect } from 'react';
import Head from 'next/head';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import DateCal from '@components/calendar/DateCal';
import Match from '@components/calendar/match';
import FooterMain from '@components/FooterMain';
import AllScript from './AllScript';

const Calendar = ({ user }) => {
  return (
    <>
      <MetaDash />

      <SignedHeader user={user} />

      <LeftNav />

      <div className="main_middle profile_middle">
        <div className="calendar_page discovery_page">
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
                  <div className="other_logo">
                    <img src="/assets/media/team1.png" alt="" />
                  </div>
                </div>
              </a>

              <div id="more_games" style={{ display: 'none' }}>
                <ul>
                  <li>
                    <div className="game_pic">
                      <img src="/assets/media/team1.png" alt="" />
                    </div>
                    <p>Test</p>
                  </li>
                </ul>
              </div>
            </div>

            <DateCal />
          </div>
        </div>
      </div>

      <AllScript />
    </>
  );
};

export default Calendar;
