import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';

import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { useQuery, useMutation } from 'react-query';
import { getTournament } from '@utils/functionsHelper';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { useState, useEffect } from 'react';
import {MPNumberFormat} from '@utils/helpers'
import { format } from 'date-fns';


const TournamentDetail = ({ user , data }) => {

  if (data) {

  return (
    <>
      <MetaDash />
      <SignedHeader user={user} />
      <LeftNav />

      <div>
        <div className="main_middle profile_middle">
          <div className="profile_box">
            <div className="profile_cover_photo">
              {' '}
              <img
                src="/assets/media/profile/cover_bg.jpg"
                alt="cover image"
              />{' '}
            </div>
            <div className="profile_dp_box">
              <div className="profile_pic">
                {' '}
                <img src="/assets/media/tournament/1.png" alt="" />{' '}
              </div>
              <div className="profile_details">
                <div className="top_details">
                  <div className="name_box">
                    {' '}
                    <span className="game_name">
                      {' '}
                      {data.tournament.name}{' '}
                    </span>{' '}
                    <span className="name">
                      Indoor Stadium, Bangalore Feb 18th - 20th 10 AM IST
                    </span>{' '}
                    <span className="follower">
                      {data.tournament.description}
                    </span>{' '}
                  </div>
                  <div className="flag">
                    <img src="/assets/media/profile/flag.png" alt="flag" />
                  </div>
                  <div className="tick">
                    <span className="active">
                      <i className="fa fa-check" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="button">
                    <a href="#" className="btn">
                      FOLLOW
                    </a>
                  </div>
                </div>
                <div className="bottom_details">
                  <div className="two_btns">
                    <a href="#" className="btn">
                      REGISTER
                    </a>{' '}
                    <a href="#" className="btn">
                      BOOK TICKETS
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="tournament_sponsers">
              <div className="logos">
                <h5>SPONSORS</h5>
			
			        <>
			          {data.sponsors.map((item, index) => (
			            <span key={index}>			              
			                <img src={item.imgUrl} alt={item.sponsorId} />
			            </span>
			          ))}
			        </>

              </div>

              <div className="logos">
                <h5>Price</h5>
                <span><MPNumberFormat value={data.tournament.prizepool} currency={data.tournament.currency} /></span>

              </div>
            </div>
            <div className="bio_box team_bio arena_bio">
              <div className="left_bio">
                <div className="top_bio">
                  <h3>ABOUT THE TOURNAMENT</h3>
                  <div className="socail">
                    <a href="https://www.facebook.com/" target="_blank">
                      <i
                        className="fa fa-facebook-official"
                        aria-hidden="true"
                      ></i>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank">
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                    <a href="https://www.twitch.tv/" target="_blank">
                      <i className="fa fa-twitch" aria-hidden="true"></i>
                    </a>
                    <a href="https://store.steampowered.com/" target="_blank">
                      <i className="fa fa-steam-square" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
                <p>
                  {data.tournament.detaildescription ? data.tournament.detaildescription : data.tournament.description}
                </p>

                <div className="games">
                  <h3>organizer:</h3>
                  
			        <>
			          {data.organizers.map((item, index) => (
			            <span key={index}>			              
			                <img src={item.imgUrl} alt={item.name} /> {item.name}
			            </span>
			          ))}
			        </>

                </div>

                <div className="games">
                  <h3>PARTICIPANTS: </h3>
                  <a href="#">
                    <img src="/assets/media/category/1.png" alt="" />
                  </a>
                  <a href="#">
                    <img src="/assets/media/category/2.png" alt="" />
                  </a>
                  <a href="#">
                    <img src="/assets/media/category/3.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="right_team_bio">
                <div className="games">
                  <h2>GAMES</h2>

                  	<>
			          {data.games.map((item, index) => (
			            <span key={index}>			              
			                <img src={item.imgUrl} alt={item.name} /> {item.name}
			            </span>
			          ))}
			        </>

                </div>
                <div className="internet">
                  <ul>
                    <li>
                      <b>CATEGORY</b>LAN{' '}
                    </li>
                    <li>
                      <b>REGISTRATION </b> FREE
                    </li>
                    <li>
                      {' '}
                      <b>PLAYOUT </b> ROUND ROBIN{' '}
                    </li>
                    <li>
                      <b>ELIMINATION </b> dOUBLE
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <ul className="profile_tab_btn">
            <li className="active">
              <a href="javascript:void(0);" rel="overview">
                Overview
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" rel="series">
                TOURNAMENT SERIES
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" rel="participants">
                {' '}
                PARTICIPANTS
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" rel="matches">
                Matches
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" rel="result">
                SCHEDULE/RESULTS
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" rel="store">
                {' '}
                Store
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" rel="video">
                VIDEOS/STREAMS{' '}
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" rel="media">
                MEDIA
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" rel="jobs">
                Jobs
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" rel="about">
                About
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" rel="sponsors">
                Sponsors
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" rel="rigs">
                Rigs
              </a>
            </li>
          </ul>
          <div className="prfoile_tab_data">
            <div className="tab" id="overview">
              Overview
            </div>
            <div className="tab hide" id="series">
              <h2>squads</h2>
            </div>
            <div className="tab hide" id="participants">
              <div className="participants">
                <div className="selections">
                  <div className="button-group">
                    {' '}
                    <span className="drop_name">All</span>
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="All"
                      />
                      <label className="custom-control-label" for="All"></label>
                    </div>
                  </div>
                  <div className="button-group">
                    {' '}
                    <span className="drop_name">Fortnite</span>
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="Fortnite"
                      />
                      <label
                        className="custom-control-label"
                        for="Fortnite"
                      ></label>
                    </div>
                  </div>
                  <div className="button-group">
                    {' '}
                    <span className="drop_name">Call of Duty WW2</span>
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="Call"
                      />
                      <label
                        className="custom-control-label"
                        for="Call"
                      ></label>
                    </div>
                  </div>
                  <div className="button-group">
                    {' '}
                    <span className="drop_name">Fifa 2018</span>
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="Fifa"
                      />
                      <label
                        className="custom-control-label"
                        for="Fifa"
                      ></label>
                    </div>
                  </div>
                </div>
                <div className="banner">
                  {' '}
                  <img src="/assets/media/squads/banner.jpg" alt="" />
                  <h2>DOTA 2</h2>
                </div>
                <div className="groupds_box">
                  <div className="group">
                    <div className="title_bg">Group A</div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Competitor</th>
                          <th scope="col">
                            <b>M</b> <b>W</b> <b>D</b> <b>L</b> <b>P</b>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <img src="/assets/media/teams/team1.png" alt="" />{' '}
                            <strong>Team Flawed Bot</strong>
                          </td>
                          <td>
                            <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img src="/assets/media/teams/team2.png" alt="" />{' '}
                            <strong>Wings Gaming</strong>
                          </td>
                          <td>
                            <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img src="/assets/media/teams/team3.png" alt="" />{' '}
                            <strong>Fnatic eSports</strong>
                          </td>
                          <td>
                            <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img src="/assets/media/teams/team4.png" alt="" />{' '}
                            <strong>inictus Gaming</strong>
                          </td>
                          <td>
                            <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img src="/assets/media/teams/team5.png" alt="" />{' '}
                            <strong>Fortuna eSports</strong>
                          </td>
                          <td>
                            <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img src="/assets/media/teams/team6.png" alt="" />{' '}
                            <strong>Gambit Gaming</strong>
                          </td>
                          <td>
                            <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="group">
                    <div className="title_bg">Group B</div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Competitor</th>
                          <th scope="col">
                            <b>M</b> <b>W</b> <b>D</b> <b>L</b> <b>P</b>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <img src="/assets/media/teams/team1.png" alt="" />{' '}
                            <strong>Team Flawed Bot</strong>
                          </td>
                          <td>
                            <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img src="/assets/media/teams/team2.png" alt="" />{' '}
                            <strong>Wings Gaming</strong>
                          </td>
                          <td>
                            <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img src="/assets/media/teams/team3.png" alt="" />{' '}
                            <strong>Fnatic eSports</strong>
                          </td>
                          <td>
                            <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img src="/assets/media/teams/team4.png" alt="" />{' '}
                            <strong>inictus Gaming</strong>
                          </td>
                          <td>
                            <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img src="/assets/media/teams/team5.png" alt="" />{' '}
                            <strong>Fortuna eSports</strong>
                          </td>
                          <td>
                            <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img src="/assets/media/teams/team6.png" alt="" />{' '}
                            <strong>Gambit Gaming</strong>
                          </td>
                          <td>
                            <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab hide" id="matches">
              <h2>matches</h2>
            </div>
            <div className="tab hide" id="result">
              <h2>statistics</h2>
            </div>
            <div className="tab hide" id="store"></div>
            <div className="tab hide" id="video">
              <h2>streams</h2>
            </div>
            <div className="tab hide" id="media">
              <h2>Media</h2>
            </div>
            <div className="tab hide" id="jobs">
              <h2>Jobs</h2>
            </div>
            <div className="tab hide" id="about">
              <h2>About</h2>
            </div>
            <div className="tab hide" id="sponsors">
              <h2>Sponsors</h2>
            </div>
            <div className="tab hide" id="rigs">
              <h2>Rigs</h2>
            </div>
          </div>
        </div>
      </div>

      <AllScript />
    </>
  );
} else {
	return null
}
};

export const getServerSideProps = async ({ query }) => {
  try {
  
    const response = await fetch(`${baseURL}/api/tournaments/${query.tournamentid}`);
    const data = await response.json();

    return {
      props: { data }
    };
  } catch {
    return {
      props: {}
    };
  }
};

export default TournamentDetail;
