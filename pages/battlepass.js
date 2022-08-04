import React, { useEffect, useState } from 'react';
import baseURL from '@utils/baseURL';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from './AllScript';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import RewardList from '../components/battlepass/RewardList';
import TaskList from '../components/battlepass/TaskList';
import Moment from 'moment';

const battlepass = ({ user, data }) => {
  const [bpData, setBpData] = useState(data);
  const { battlepass, freelevels, paidlevels } = bpData;
  let x = Moment.duration(
    Moment(battlepass.endDate).diff(Moment().startOf('day'))
  )
    .asDays()
    .toString()
    .slice(0, 2);
  let daysLeft = Number(x);

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
              <h1>{battlepass.title}</h1>
              <p>Ends in {daysLeft} day(s)</p>
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
                <span className="num_img"> {battlepass.level} </span>

                <span className="level"> {battlepass.level} /25 levels</span>
                <span className="numbg">
                  {battlepass.xp_points} / 4000 <b>XP</b>
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
                    BATTLE PASS{' '}
                    {battlepass.isBPUser ? (
                      <i class="fa fa-lock" aria-hidden="true"></i>
                    ) : (
                      <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                    )}
                  </b>
                </span>
              </div>
              <div className="steps_box">
                <ul className="boxes">
                  <RewardList
                    levels={freelevels}
                    battlepass={battlepass}
                    type="free"
                  />
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
                  <RewardList
                    levels={paidlevels}
                    battlepass={battlepass}
                    type="paid"
                  />
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
              <li class="">
                <a href="#!" rel="week3">
                  Week3
                </a>
              </li>
              <li class="">
                <a href="#!" rel="week4">
                  Week4
                </a>
              </li>
              <li class="">
                <a href="#!" rel="week5">
                  Week5
                </a>
              </li>
            </ul>

            <div className="prfoile_tab_data">
              <div className="tab " id="week1">
                <ul>
                  <TaskList week="Week 1" />
                </ul>
              </div>
              <div className="tab hide" id="week2">
                <TaskList week="Week 2" />
              </div>
              <div className="tab hide" id="week3">
                <TaskList week="Week 3" />
              </div>
              <div className="tab hide" id="week4">
                <TaskList week="Week 4" />
              </div>
              <div className="tab hide" id="week5">
                <TaskList week="Week 5" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AllScript />
    </>
  );
};
export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);
  const response = await fetch(`${baseURL}/api/battlepass`, {
    method: 'GET',
    headers: {
      Authorization: token
    }
  });
  const data = await response.json();

  return {
    props: { data }
  };
};
export default battlepass;
