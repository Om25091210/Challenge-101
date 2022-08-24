import React, { useEffect, useState } from 'react';
import baseURL from '@utils/baseURL';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from './AllScript';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';
import ChallengesDisplay from '../components/challenges/ChallengesDisplay';
import { parseCookies } from 'nookies';
import PostChallenge from '../components/challenges/PostChallenge';

const challenges = ({ user, data, teams, profile }) => {
  const [challenges, setChallenges] = useState([]);
  let type = 'opponent_team';
  useEffect(() => {
    axios
      .get(`${baseURL}/api/challenges/userchallenges/${type}/${profile._id}`)
      .then((res) => {
        setChallenges(res.data);
      });
  }, []);

  let allchallenges = [...challenges, ...data.challenge];

  return (
    <>
      <MetaDash />

      <SignedHeader user={user} />

      <LeftNav user={user} />
      <div className="main_middle profile_middle">
        <div className="discovery_page challenge_page">
          <div className="white_bg">
            <div className="heads">
              <div>
                <h1>Play a challenge</h1>
                <p>
                  Startup a challenge against other players and earn real money
                  in the process!
                </p>
              </div>
              <PostChallenge games={data.games} teams={teams} />
            </div>
            <h2>GAME</h2>

            <div className="tit">
              <a href="#!" className="model_show_btn">
                <span>
                  <b className="icon">
                    <img src="/assets/media/ranking/console.png" alt="" />
                  </b>
                  Browse Games
                </span>
                <i className="fa fa-angle-right" aria-hidden="true"></i>

                <div className="hover_games">
                  <div className="other_logo">
                    <img />
                  </div>
                </div>
              </a>
            </div>
            {/* <div className="filter_btns">
              <button className="btn">Challenge Invites</button>
              <button className="btn">Open Matches</button>
              <button className="btn">My Challenges</button>
              <button className="btn">Bounty</button>
              <div className="advance">
                <h3>online matches</h3>
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch1"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch1"
                  ></label>
                </div>
              </div>
              <h3>Sort By:</h3> <button className="btn">Day left</button>{' '}
              <button className="btn">Reward</button>
            </div> */}
          </div>

          <div className="white_bg challenge_card_box">
            <ul className="challenge_card">
              {!allchallenges || allchallenges.length === 0 ? (
                <div>
                  <span>No Challenges for you</span>
                </div>
              ) : (
                allchallenges.map((chall) => (
                  <ChallengesDisplay
                    user={user}
                    chall={chall}
                    profile={profile}
                  />
                ))
              )}
            </ul>

            {/* <p>Similar players you can challenge.</p>

            <ul className="challenge_card smil_card">
              <li>
                <div className="row1">
                  <div className="card_img">
                    {' '}
                    <div className="img"></div> Sonu sing
                  </div>{' '}
                </div>

                <div className="row1">
                  <span>
                    Game:
                    <img src="/assets/media/challenge/rank.png" alt="" />
                  </span>

                  <span>
                    Rank:
                    <img src="/assets/media/challenge/rank.png" alt="" />
                    Platinum
                  </span>
                </div>

                <div className="row1">
                  <button className="btn">Challenge Now</button>
                </div>
              </li>

              <li>
                <div className="row1">
                  <div className="card_img">
                    {' '}
                    <div className="img"></div> Sonu sing
                  </div>{' '}
                </div>

                <div className="row1">
                  <span>
                    Game:
                    <img src="/assets/media/challenge/f.png" alt="" />
                  </span>

                  <span>
                    Rank:
                    <img src="/assets/media/challenge/rank.png" alt="" />
                    Platinum
                  </span>
                </div>

                <div className="row1">
                  <button className="btn">Challenge Now</button>
                </div>
              </li>
              <li>
                <div className="row1">
                  <div className="card_img">
                    {' '}
                    <div className="img"></div> Sonu sing
                  </div>{' '}
                </div>

                <div className="row1">
                  <span>
                    Game:
                    <img src="/assets/media/challenge/f.png" alt="" />
                  </span>

                  <span>
                    Rank:
                    <img src="/assets/media/challenge/rank.png" alt="" />
                    Platinum
                  </span>
                </div>

                <div className="row1">
                  <button className="btn">Challenge Now</button>
                </div>
              </li>
              <li>
                <div className="row1">
                  <div className="card_img">
                    {' '}
                    <div className="img"></div> Sonu sing
                  </div>{' '}
                </div>

                <div className="row1">
                  <span>
                    Game:
                    <img src="/assets/media/challenge/f.png" alt="" />
                  </span>

                  <span>
                    Rank:
                    <img src="/assets/media/challenge/rank.png" alt="" />
                    Platinum
                  </span>
                </div>

                <div className="row1">
                  <button className="btn">Challenge Now</button>
                </div>
              </li>
              <li>
                <div className="row1">
                  <div className="card_img">
                    {' '}
                    <div className="img"></div> Sonu sing
                  </div>{' '}
                </div>

                <div className="row1">
                  <span>
                    Game:
                    <img src="/assets/media/challenge/f.png" alt="" />
                  </span>

                  <span>
                    Rank:
                    <img src="/assets/media/challenge/rank.png" alt="" />
                    Platinum
                  </span>
                </div>

                <div className="row1">
                  <button className="btn">Challenge Now</button>
                </div>
              </li>
              <li>
                <div className="row1">
                  <div className="card_img">
                    {' '}
                    <div className="img"></div> Sonu sing
                  </div>{' '}
                </div>

                <div className="row1">
                  <span>
                    Game:
                    <img src="/assets/media/challenge/f.png" alt="" />
                  </span>

                  <span>
                    Rank:
                    <img src="/assets/media/challenge/rank.png" alt="" />
                    Platinum
                  </span>
                </div>

                <div className="row1">
                  <button className="btn">Challenge Now</button>
                </div>
              </li>
            </ul> */}
          </div>
        </div>
      </div>
      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);

  const response = await fetch(`${baseURL}/api/challenges`, {
    method: 'get',
    headers: {
      Authorization: token
    }
  });

  const data = await response.json();

  return {
    props: { data }
  };
};

export default challenges;
