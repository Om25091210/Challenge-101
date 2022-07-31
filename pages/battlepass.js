import React, { useEffect, useState } from 'react';
import baseURL from '@utils/baseURL';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from './AllScript';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';

const battlepass = ({ user, data }) => {
  const [bpData, setBpData] = useState(data);

  return (
    <>
      <MetaDash />

      <SignedHeader user={user} />

      <LeftNav user={user} />

      <div className="main_middle profile_middle">
        <div className="season_box">
          <div className="season_header">
            <div>
              <img src="/assets/media/logo-new.png" alt="" />
              <h1>SEASON 1</h1>
              <p>Ends in 52 day(s)</p>
            </div>
            <div>
              <img src="/assets/media/season/pass-btn.png" alt="" />
              <ul>
                <li>Access to Multiplayr Premium Tournaments/Ladders.</li>
                <li>Access to unlimited number of tournaments</li>
                <li>Win amazing rewards, bonuses on every level. </li>
              </ul>
            </div>
          </div>

          <div className="left_season">
            <div className="top_raw">
              <div className="numbg_box">
                <span className="num_img">3</span>

                <span className="level">3/25 levels</span>
                <span className="numbg">
                  3800 / 4000 <b>XP</b>
                </span>
              </div>

              <div className="pages">
                {' '}
                page 1/5
                <span>
                  {' '}
                  <i class="fa fa-chevron-left" aria-hidden="true"></i>{' '}
                </span>
                <span>
                  {' '}
                  <i class="fa fa-chevron-right" aria-hidden="true"></i>{' '}
                </span>
              </div>
            </div>
            <div className="bottom_raw">
              <div className="left_two_box">
                <span className="free">
                  <b>Free</b>
                </span>
                <span className="battle">
                  <b>
                    BATTLE PASS <i class="fa fa-lock" aria-hidden="true"></i>
                  </b>
                </span>
              </div>
              <div className="steps_box">
                <ul className="boxes">
                  <li>
                    <img src="/assets/media/season/gift1.png" alt="" />
                    <p>Season bridge 1</p>
                    <button>Compare 1</button>
                  </li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li>
                    <img src="/assets/media/season/gift3.png" alt="" />
                    <p>Season bridge 1</p>
                    <button>Compare 1</button>
                  </li>
                </ul>

                <ul className="step_line">
                  <li className="active">
                    <span>1</span>
                  </li>
                  <li className="active">
                    <span>2</span>
                  </li>
                  <li className="active">
                    <span>3</span>
                  </li>
                  <li>
                    <span>4</span>
                  </li>
                  <li>
                    <span>5</span>
                  </li>
                </ul>

                <ul className="boxes">
                  <li>
                    <img src="/assets/media/season/gift1.png" alt="" />
                    <p>Season bridge 1</p>
                    <button>Compare 1</button>
                  </li>
                  <li>
                    <img src="/assets/media/season/gift2.png" alt="" />
                    <p>Season bridge 1</p>
                    <button>Compare 1</button>
                  </li>
                  <li>
                    <img src="/assets/media/season/gift3.png" alt="" />
                    <p>Season bridge 1</p>
                    <button>Compare 1</button>
                  </li>
                  <li>
                    <img src="/assets/media/season/gift2.png" alt="" />
                    <p>Season bridge 1</p>
                    <button>Compare 1</button>
                  </li>
                  <li>
                    <img src="/assets/media/season/gift4.png" alt="" />
                    <p>Season bridge 1</p>
                    <button>Compare 1</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="right_season">
            <h2>Tasks</h2>

            <ul class="profile_tab_btn three_nav">
              <li class="active">
                <a href="#!" rel="week1">
                  Week1
                </a>
              </li>
              <li class="">
                <a href="#!" rel="week2">
                  Week2
                </a>
              </li>
            </ul>

            <div className="prfoile_tab_data">
              <div className="tab " id="week1">
                <ul>
                  <li>
                    <span>Connect a game account </span>
                    <span> 25XP</span>
                  </li>

                  <li>
                    <span>Connect a game account </span>
                    <span> 25XP</span>
                  </li>

                  <li>
                    <span>Connect a game account </span>
                    <span> 25XP</span>
                  </li>

                  <li>
                    <span>Connect a game account </span>
                    <span> 25XP</span>
                  </li>
                </ul>
              </div>
              <div className="tab hide" id="week2">
                Secod
              </div>
            </div>
          </div>
        </div>
      </div>
      <AllScript />
    </>
  );
};

export default battlepass;
