import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';

import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { useQuery, useMutation } from 'react-query';
import { getTournament } from '@utils/functionsHelper';
import axios from 'axios';
import baseEsportsAPIURL from '@utils/baseEsportsAPIURL';
import { useState, useEffect } from 'react';
import { MPNumberFormat } from '@utils/helpers';
import { format } from 'date-fns';
import { getData } from '@utils/fetchData'

import baseURL from '@utils/baseURL';
import TournamentMatches from '@components/tournament/TournamentMatches';
import TournamentVideos from '@components/tournament/TournamentVideos';
import ProductList from '@components/common/ProductList';

const TournamentDetail = ({ user, data, products }) => {

  if (data) {
    return (
      <>
        <MetaDash />
        <SignedHeader user={user} />
        <LeftNav />

        <div>
          <div className="main_middle profile_middle">
            <div className="profile_box tournament_dp_box">
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
                      <div className="flag_tick_flow">
                        <span className="game_name">
                          {' '}
                          {data.tournament.name}{' '}
                        </span>
                        <div className="flag"></div>
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
                      <span className="name">
                        Indoor Stadium, Bangalore Feb 18th - 20th 10 AM IST
                      </span>{' '}
                      <span className="follower">
                        {data.tournament.description}
                      </span>{' '}
                    </div>
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

              <div className="tournament_sponsers">
                <div className="logos">
                  <h5>SPONSORS</h5>

                  <>
                    {data.sponsors &&
                      data.sponsors.map((item, index) => (
                        <span key={index}>
                          <img src={item.imgUrl} alt={item.sponsorId} />
                        </span>
                      ))}
                  </>
                </div>

                <div className="flex prices">
                  <h5>Price</h5>
                  <span className="">
                    <MPNumberFormat
                      value={
                        data.tournament.prizepool
                          ? data.tournament.prizepool
                          : null
                      }
                      currency={data.currency}
                    />
                  </span>
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
                        <i
                          className="fa fa-steam-square"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </div>
                  </div>
                  <p>
                    {data.detaildescription
                      ? data.detaildescription
                      : data.tournament.description}
                  </p>

                  <div className="games">
                    <h3>organizer:</h3>

                    <>
                      {data.organizers &&
                        data.organizers.map((item, index) => (
                          <span key={index}>
                            <img src={item.imgUrl} alt={item.name} />{' '}
                            <b>{item.name}</b>
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
                      {data.games &&
                        data.games.map((item, index) => (
                          <span key={index}>
                            <img src={item.imgUrl} alt={item.name} />
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
                <a href="#!" rel="overview">
                  Overview
                </a>
              </li>
              <li>
                <a href="#!" rel="series">
                  TOURNAMENT SERIES
                </a>
              </li>
              <li>
                <a href="#!" rel="participants">
                  {' '}
                  PARTICIPANTS
                </a>
              </li>
              <li>
                <a href="#!" rel="matches">
                  Matches
                </a>
              </li>
              <li>
                <a href="#!" rel="result">
                  SCHEDULE/RESULTS
                </a>
              </li>
              <li>
                <a href="#!" rel="store">
                  {' '}
                  Store
                </a>
              </li>
              <li>
                <a href="#!" rel="video">
                  VIDEOS/STREAMS{' '}
                </a>
              </li>
              <li>
                <a href="#!" rel="media">
                  MEDIA
                </a>
              </li>
              <li>
                <a href="#!" rel="jobs">
                  Jobs
                </a>
              </li>
              <li>
                <a href="#!" rel="about">
                  About
                </a>
              </li>
              <li>
                <a href="#!" rel="sponsors">
                  Sponsors
                </a>
              </li>
              <li>
                <a href="#!" rel="rigs">
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
                        <label
                          className="custom-control-label"
                          htmlFor="All"
                        ></label>
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
                          htmlFor="Fortnite"
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
                          htmlFor="Call"
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
                          htmlFor="Fifa"
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
              <TournamentMatches data={data} />
              <div className="tab hide" id="result">
                <div className="results_box white_bg">
                  <div className="congratulations">
                    <h1>Congragulations to our winners!</h1>
                    <div className="winner_box">
                      <div className="winner">
                        <div className="heads">
                          <img src="/assets/media/result/teams.jpg" alt="" />
                          <h4>Gambit</h4>
                        </div>
                        <div className="winner_cup cup1">
                          {' '}
                          <img
                            src="/assets/media/result/cup1.jpg"
                            alt=""
                          />{' '}
                        </div>
                      </div>
                      <div className="winner">
                        <div className="heads">
                          <img src="/assets/media/result/teams.jpg" alt="" />
                          <h4>Astralis</h4>
                        </div>
                        <div className="winner_cup cup2">
                          {' '}
                          <img
                            src="/assets/media/result/cup2.jpg"
                            alt=""
                          />{' '}
                        </div>
                      </div>
                      <div className="winner">
                        <div className="heads">
                          <img src="/assets/media/result/teams.jpg" alt="" />
                          <h4>FaZO</h4>
                        </div>
                        <div className="winner_cup cup3">
                          {' '}
                          <img
                            src="/assets/media/result/cup3.jpg"
                            alt=""
                          />{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="group_stage_box">
                    <h2>Group Stage</h2>
                    <div className="group_stage">
                      <div className="match_date">
                        <ul>
                          <li>
                            <a href="#" className="active">
                              Saturday - Day1
                              <p>20 August 2020</p>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              Friday - Day2
                              <p>20 August 2020</p>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              Thursday - Day3
                              <p>20 August 2020</p>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              Saturday - Day4
                              <p>20 August 2020</p>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="match_list">
                        <div className="team_match_row">
                          <div className="all_matches">
                            <div className="first_team">
                              {' '}
                              <img src="/assets/media/teams/team1.png" alt="" />
                              <h3>Fnatic eSports</h3>
                            </div>
                            <div className="vs">VS</div>
                            <div className="second_team">
                              {' '}
                              <img src="/assets/media/teams/team2.png" alt="" />
                              <h3>WingsGaming</h3>
                            </div>
                          </div>
                          <p>@ Statstics At 5;45PM / Group Stage1</p>
                        </div>
                        <div className="team_match_row">
                          <div className="all_matches">
                            <div className="first_team">
                              {' '}
                              <img src="/assets/media/teams/team1.png" alt="" />
                              <h3>Fnatic eSports</h3>
                            </div>
                            <div className="vs">VS</div>
                            <div className="second_team">
                              {' '}
                              <img src="/assets/media/teams/team2.png" alt="" />
                              <h3>WingsGaming</h3>
                            </div>
                          </div>
                          <p>@ Statstics At 5;45PM / Group Stage1</p>
                        </div>
                        <div className="team_match_row">
                          <div className="all_matches">
                            <div className="first_team">
                              {' '}
                              <img src="/assets/media/teams/team1.png" alt="" />
                              <h3>Fnatic eSports</h3>
                            </div>
                            <div className="vs">VS</div>
                            <div className="second_team">
                              {' '}
                              <img src="/assets/media/teams/team2.png" alt="" />
                              <h3>WingsGaming</h3>
                            </div>
                          </div>
                          <p>@ Statstics At 5;45PM / Group Stage1</p>
                        </div>
                        <div className="team_match_row">
                          <div className="all_matches">
                            <div className="first_team">
                              {' '}
                              <img src="/assets/media/teams/team1.png" alt="" />
                              <h3>Fnatic eSports</h3>
                            </div>
                            <div className="vs">VS</div>
                            <div className="second_team">
                              {' '}
                              <img src="/assets/media/teams/team2.png" alt="" />
                              <h3>WingsGaming</h3>
                            </div>
                          </div>
                          <p>@ Statstics At 5;45PM / Group Stage1</p>
                        </div>
                        <div className="team_match_row">
                          <div className="all_matches">
                            <div className="first_team">
                              {' '}
                              <img src="/assets/media/teams/team1.png" alt="" />
                              <h3>Fnatic eSports</h3>
                            </div>
                            <div className="vs">VS</div>
                            <div className="second_team">
                              {' '}
                              <img src="/assets/media/teams/team2.png" alt="" />
                              <h3>WingsGaming</h3>
                            </div>
                          </div>
                          <p>@ Statstics At 5;45PM / Group Stage1</p>
                        </div>
                        <div className="team_match_row">
                          <div className="all_matches">
                            <div className="first_team">
                              {' '}
                              <img src="/assets/media/teams/team1.png" alt="" />
                              <h3>Fnatic eSports</h3>
                            </div>
                            <div className="vs">VS</div>
                            <div className="second_team">
                              {' '}
                              <img src="/assets/media/teams/team2.png" alt="" />
                              <h3>WingsGaming</h3>
                            </div>
                          </div>
                          <p>@ Statstics At 5;45PM / Group Stage1</p>
                        </div>
                      </div>
                    </div>
                    <div className="knockout_matches">
                      <h2>Knowckout-Bracket</h2>
                      <ul>
                        <li>
                          <h4>Round1</h4>
                          <p>April 21 18:00</p>
                        </li>
                        <li>
                          <h4>Round2</h4>
                          <p>April 21 18:00</p>
                        </li>
                        <li>
                          <h4>Semifinals</h4>
                          <p>April 21 18:00</p>
                        </li>
                        <li className="active">
                          <h4>Final</h4>
                          <p>April 21 18:00</p>
                        </li>
                      </ul>
                    </div>
                    <div className="matches_postitions">
                      <div className="section section1">
                        <ul>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team1.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>United State</b>
                              </span>{' '}
                            </div>
                            <div className="points">7</div>
                          </li>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team2.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>UK</b>
                              </span>{' '}
                            </div>
                            <div className="points">7</div>
                          </li>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team3.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">7</div>
                          </li>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team4.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">1</div>
                          </li>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team5.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">7</div>
                          </li>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team6.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">6</div>
                          </li>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team1.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">3</div>
                          </li>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team2.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">4</div>
                          </li>
                        </ul>
                      </div>
                      <div className="section section2">
                        <ul>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team6.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">4</div>
                          </li>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team5.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">4</div>
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team4.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">4</div>
                          </li>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team2.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">4</div>
                          </li>
                        </ul>
                      </div>
                      <div className="section section3">
                        <ul>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team1.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">4</div>
                          </li>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team2.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">4</div>
                          </li>
                        </ul>
                      </div>
                      <div className="section section4">
                        <ul>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team3.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="final_cup">
                              <i
                                className="fa fa-trophy"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <ProductList user={user} productList={products}/>

              <div className="tab hide" id="video">
                    <TournamentVideos user={user} tournament={data} />
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
                <div className="sponsers_box">
                  <ul>
                    {data.sponsors.length === 0 ? (
                      <div>No Sponsors</div>
                    ) : (
                      data.sponsors.map((spons, index) => {
                        return (
                          <li key={index}>
                            <div className="sponser_name">
                              <img src={spons.imgUrl} alt={spons.sponsorId} />
                            </div>
                            <div className="sponser_data">
                              {' '}
                              <span className="head_spons_bg">
                                {spons.name}
                              </span>
                              <p>{spons.description}</p>
                            </div>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
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
    return null;
  }
};

export const getServerSideProps = async (context, query) => {
  const { tournamentid } = context.params;
  console.log(tournamentid);
  const page = query ? (query.page || 1) : 1
  const category = query ? (query.category || 'all' ) : 'all'
  const sort = query ? (query.sort || '' ) : ''
  const search = query ? (query.search || 'all') : 'all'  
  // const response = await fetch(`${baseEsportsAPIURL}/esport/tournaments/${tournamentid}`, {method:'GET',
  // headers: {'Authorization': 'Basic ' + Buffer.from('multiplyr' + ":" + 'Multiplyr123$').toString('base64')}});
  const response = await fetch(`${baseURL}/api/tournaments/${tournamentid}`);
  const data = await response.json();
  // const data = dat.data;

  const resprod = await getData(
      `product?limit=${page * 6}&category=${category}&sort=${sort}&title=${search}`
    )  

  return {
    props: { data,products: resprod.products }
  };
};

export default TournamentDetail;
