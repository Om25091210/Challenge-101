import axios from 'axios';
import { useState, useEffect } from 'react';
import baseURL from '@utils/baseURL';
import { useRouter } from 'next/router';

import GameVideos from './GameVideos';
import GameTournaments from './GameTournaments';
import GameLeagues from './GameLeagues';
import GameTeams from './GameTeams';
import GamePlayers from './GamePlayers';

const Game = ({ user }) => {
  const [game, setGame] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    axios.get(`${baseURL}/api/games/${id}`).then((res) => setGame(res.data));
  }, []);

  return (
    <div>
      <div className="main_middle profile_middle">
        <div className="profile_box tournament_dp_box games_page">
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
              <img src={game.imgUrl} alt="" />{' '}
            </div>
            <div className="profile_details">
              <div className="top_details">
                <div className="name_box">
                  {' '}
                  <span className="game_name">{game.name}</span>{' '}
                </div>
                <div className="flag">
                  {' '}
                  <img src="/assets/media/profile/flag.png" alt="flag" />{' '}
                </div>
                <div className="tick">
                  {' '}
                  <span className="active">
                    {' '}
                    <i className="fa fa-check" aria-hidden="true"></i>{' '}
                  </span>{' '}
                </div>
                <div className="button">
                  {' '}
                  <a href="#" className="btn">
                    {' '}
                    FOLLOW{' '}
                  </a>{' '}
                </div>
              </div>
            </div>
          </div>
          <div className="tournament_sponsers">
            <div className="logos">
              <h5>OFFICIAL TOURNAMENTS</h5>
              <img src="/assets/media/games/tournament1.png" alt="" />{' '}
              <img src="/assets/media/games/tournament2.png" alt="" />{' '}
              <img src="/assets/media/games/tournament3.png" alt="" />{' '}
            </div>
          </div>
          <div className="bio_box  game_bio">
            <div className="left_bio">
              <div className="top_bio">
                <h3>ABOUT THE GAME</h3>
                <div className="socail">
                  {' '}
                  <a href="https://www.facebook.com/" target="_blank">
                    {' '}
                    <i
                      className="fa fa-facebook-official"
                      aria-hidden="true"
                    ></i>{' '}
                  </a>{' '}
                  <a href="https://www.instagram.com/" target="_blank">
                    {' '}
                    <i className="fa fa-instagram" aria-hidden="true"></i>{' '}
                  </a>{' '}
                  <a href="https://www.twitch.tv/" target="_blank">
                    {' '}
                    <i className="fa fa-twitch" aria-hidden="true"></i>{' '}
                  </a>{' '}
                  <a href="https://store.steampowered.com/" target="_blank">
                    {' '}
                    <i
                      className="fa fa-steam-square"
                      aria-hidden="true"
                    ></i>{' '}
                  </a>{' '}
                </div>
              </div>
              <p>{game.description} </p>
              <div className="games">
                <h3>PUBLISHER: </h3>
                <span>
                  {' '}
                  {!game.publisher || game.publisher.length === 0 ? (
                    <p>No publisher...</p>
                  ) : (
                    <>
                      <img src={game.publisher.imgUrl} />{' '}
                      <b>{game.publisher.name}</b>
                    </>
                  )}
                </span>
              </div>

              <div className="games">
                <h3>PLATFORM: </h3>
                <p>{game.platform}</p>{' '}
              </div>
            </div>
            <div className="right_team_bio">
              <div className="games">
                <h2>PLAYERS: </h2>
                <a href="#">
                  {' '}
                  <img src="/assets/media/profile/game1.png" alt="" />{' '}
                </a>{' '}
                <a href="#">
                  {' '}
                  <img src="/assets/media/profile/game2.png" alt="" />{' '}
                </a>{' '}
                <a href="#">
                  {' '}
                  <img src="/assets/media/profile/game3.png" alt="" />{' '}
                </a>{' '}
              </div>
              <div className="internet">
                <ul>
                  <li>
                    {' '}
                    LEAgUES/TOURNAMENTS: <b>+87</b>{' '}
                  </li>
                  <li>
                    {' '}
                    COMMUNITIES: <b>+506</b>{' '}
                  </li>
                  <li>
                    {' '}
                    steaming: <b>+744</b>{' '}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <ul className="profile_tab_btn">
          <li className="active">
            {' '}
            <a href="#!" rel="overview">
              {' '}
              OVERVIEW{' '}
            </a>{' '}
          </li>
          <li>
            {' '}
            <a href="#!" rel="tournament">
              {' '}
              TOURNAMENTS{' '}
            </a>{' '}
          </li>

          <li>
            {' '}
            <a href="#!" rel="league">
              {' '}
              LEAGUES{' '}
            </a>{' '}
          </li>
          <li>
            {' '}
            <a href="#!" rel="ladder">
              {' '}
              LADDER{' '}
            </a>{' '}
          </li>
          <li>
            {' '}
            <a href="#!" rel="matches">
              {' '}
              MATCHES{' '}
            </a>{' '}
          </li>
          <li>
            {' '}
            <a href="#!" rel="video">
              {' '}
              VIDEOS/STREAMS{' '}
            </a>{' '}
          </li>
          <li>
            {' '}
            <a href="#!" rel="teams">
              {' '}
              TEAMS{' '}
            </a>{' '}
          </li>
          <li>
            {' '}
            <a href="#!" rel="players">
              {' '}
              PLAYERS{' '}
            </a>{' '}
          </li>
          <li>
            {' '}
            <a href="#!" rel="communities">
              {' '}
              COMMUNITIES{' '}
            </a>{' '}
          </li>
        </ul>
        <div className="prfoile_tab_data">
          <div className="tab" id="overview">
            <div className="tab" id="overview">
              {' '}
              <div className="profile_left_post">
                <div className="post">
                  <div className="heads">
                    <div className="user">
                      <img src="/assets/media/user.jpg" alt="" />
                    </div>
                    <h4>TheMadTitan</h4>
                  </div>
                  <div className="left_details">
                    {' '}
                    <a href="#">
                      {' '}
                      <i className="fa fa-heart" aria-hidden="true"></i>{' '}
                      <span>1.7k</span>{' '}
                    </a>{' '}
                    <a href="#">
                      {' '}
                      <i className="fa fa-eye" aria-hidden="true"></i>{' '}
                      <span>239k</span>{' '}
                    </a>{' '}
                    <a href="#">
                      {' '}
                      <i
                        className="fa fa-commenting"
                        aria-hidden="true"
                      ></i>{' '}
                      <span>232k</span>{' '}
                    </a>{' '}
                  </div>
                  <div className="right_details">
                    <div className="post_data"></div>
                    <div className="users_share_box">
                      <div className="more_user">
                        {' '}
                        <a href="#">
                          <img src="/assets/media/1.jpg" alt="user" />
                          <span className="online"></span>
                        </a>{' '}
                        <a href="#">
                          <img src="/assets/media/2.jpg" alt="user" />
                          <span className="online"></span>
                        </a>{' '}
                        <a href="#">
                          <img src="/assets/media/3.jpg" alt="user" />
                          <span className="offiline"></span>
                        </a>{' '}
                        <a href="#" className="more">
                          +3
                        </a>{' '}
                        <span className="others">
                          Ashwin, George and 5 others have liked your post.
                        </span>{' '}
                      </div>
                      <div className="shere">
                        {' '}
                        <a href="#">
                          {' '}
                          <i
                            className="fa fa-heart"
                            aria-hidden="true"
                          ></i>{' '}
                          <span>Like</span>{' '}
                        </a>{' '}
                        <a href="#">
                          {' '}
                          <i
                            className="fa fa-share-alt"
                            aria-hidden="true"
                          ></i>{' '}
                          <span>Share</span>{' '}
                        </a>
                        <div className="three_dots">
                          <a href="#">
                            {' '}
                            <i
                              className="fa fa-ellipsis-v"
                              aria-hidden="true"
                            ></i>
                          </a>
                          <div className="three_dots_dropdown">
                            <ul>
                              <li>
                                <a href="#">Edit</a>
                              </li>
                              <li>
                                <a href="#">Share to</a>
                              </li>
                              <li>
                                <a href="#">Copy Link</a>
                              </li>
                              <li>
                                <a href="#">Delet</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <!--Start Add comments--> */}

                    <div className="add_comment_box">
                      <div className="add_comments">
                        <div className="user">
                          <img src="/assets/media/user.jpg" alt="" />
                        </div>
                        <textarea placeholder="Add a comment"></textarea>
                        <a href="#" className="gif">
                          GIF
                        </a>{' '}
                        <a href="#" className="smile">
                          <img src="/assets/media/smile.png" alt="" />
                        </a>{' '}
                      </div>
                      <button>
                        <img src="/assets/media/send.png" alt="" />
                      </button>
                    </div>

                    {/* <!--Start Add comments--> */}

                    <div className="post_comments">
                      <div className="pop_comment">Popular Comments</div>
                      <div className="comments_point">
                        <div className="fire">
                          <img src="/assets/media/fire.png" alt="" />{' '}
                          <span>45</span>
                        </div>
                        <div className="user">
                          <img src="/assets/media/user.jpg" alt="" />
                        </div>
                        <h3>TheMadTitan</h3>
                        <a href="#" className="create">
                          Creator
                        </a>{' '}
                        <span className="days">2 days ago</span>{' '}
                        <a href="#" className="pinned">
                          Pinned by Creator
                        </a>{' '}
                      </div>
                      <p>Thank you everyone for all of your support.</p>
                      <div className="loadmore">
                        <a href="#">
                          Load comments{' '}
                          <i
                            className="fa fa-angle-down"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    </div>

                    {/* <!--End Add comments-->  */}
                  </div>
                </div>
              </div>
              <div className="profile_match_details">
                <div className="all_stats">
                  <ul>
                    <li>
                      <img src="/assets/media/profile/fire1.png" alt="" />
                      <div className="two_value">
                        <span className="num">108</span>
                        <span className="names">MATCHES PLAYED</span>
                      </div>
                    </li>
                    <li>
                      <img src="/assets/media/profile/won.png" alt="" />

                      <div className="two_value">
                        <span className="num">71</span>
                        <span className="names">MATCHES WON</span>
                      </div>
                    </li>
                    <li>
                      <img src="/assets/media/profile/cup.png" alt="" />

                      <div className="two_value">
                        <span className="num">12</span>
                        <span className="names">TROPHIES</span>
                      </div>
                    </li>
                    <li>
                      <img src="/assets/media/profile/money.png" alt="" />
                      <div className="two_value">
                        <span className="num">$40K</span>
                        <span className="names">EARNINGS</span>
                      </div>
                    </li>
                    <li>
                      <img src="/assets/media/profile/streak.png" alt="" />
                      <div className="two_value">
                        <span className="num">26</span>
                        <span className="names">WINNING STREAK</span>
                      </div>
                    </li>
                    <li>
                      <div className="two_value">
                        <a href="#" className="names">
                          All Stat
                        </a>
                      </div>{' '}
                      <i
                        className="fa fa-long-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </li>
                  </ul>
                </div>

                <div className="games_details">
                  <ul>
                    <li>
                      <span className="nm">Game: </span>{' '}
                      <img src="/assets/media/profile/game1.png" alt="" />
                    </li>
                    <li>
                      <span className="nm">Roles: </span>{' '}
                      <span className="task">Assault/Sniper</span>{' '}
                    </li>
                    <li>
                      <span className="nm">Mic:</span>{' '}
                      <span className="task"> On</span>
                    </li>
                    <li>
                      <span className="nm">Platform:</span>{' '}
                      <span className="task"> PC</span>
                    </li>
                    <li>
                      <span className="nm">Language:</span>{' '}
                      <span className="task"> ENG, RU, HINDI</span>
                    </li>
                    <li>
                      <span className="nm">Win rate/KDA:</span>{' '}
                      <span className="task"> 67% / 2.9 </span>
                    </li>
                    <li>
                      <span className="nm">MMR:</span>{' '}
                      <span className="task"> 3211 </span>
                    </li>
                    <li>
                      <span className="nm">Availablilty:</span>{' '}
                      <span className="task">
                        {' '}
                        4 hours per day 7 days a week{' '}
                      </span>
                    </li>
                  </ul>
                  <div className="chart_box">
                    <img src="/assets/media/profilechart.jpg" alt="" />
                  </div>
                  <button className="game_btn">INVITE TO TEAM</button>
                </div>
              </div>
            </div>
          </div>
          <div className="tab hide" id="tournament">
            <h2>Tournament</h2>

            {/* /* ---- start game row --- */}
            <GameTournaments user={user}/>

            {/* /* ---- end game row --- */}
          </div>

          <div className="tab hide" id="league">
            <h2>League</h2>

            {/* /* ---- start game row --- */}

            <GameLeagues user={user} game={game}/>

            {/* /* ---- end game row --- */}
          </div>
          <div className="tab hide" id="ladder">
            <h2>Ladder</h2>

            {/* /* ---- start game row --- */}

            <div className="game_row">
              {' '}
              <span className="star live">
                <i className="fa fa-star" aria-hidden="true"></i>
              </span>
              <div className="game_pos">
                <div className="game_loc">
                  {' '}
                  <img src="/assets/media/category/game_loc.jpg" alt="" />{' '}
                </div>
                <span className="tour_logo">
                  {' '}
                  <img src="/assets/media/category/game1.png" alt="" />{' '}
                </span>{' '}
              </div>
              <div className="right_game_details">
                <div className="top_game">
                  <div className="date">
                    <h3>MANILA MASTERS TORONTO</h3>
                    09.OCT.2021
                  </div>
                  <div className="reg">
                    <button className="active">LIVE</button>
                  </div>
                </div>
                <div className="bottom_game">
                  <div className="users">
                    <img src="/assets/media/category/users.png" alt="" />
                  </div>
                  <div className="games">
                    <h3>Games:</h3>
                    <div className="game_logo">
                      <img src="/assets/media/category/game1.png" alt="" /> COD
                      4,
                    </div>
                    <div className="game_logo">
                      <img src="/assets/media/category/game2.png" alt="" /> DOTA
                      2,
                    </div>
                    <div className="game_logo">
                      <img src="/assets/media/category/game3.png" alt="" /> CSGO
                    </div>
                  </div>
                  <div className="prize">
                    <h3>PRIZE POOL:</h3>
                    Rs. 45,00,000
                  </div>
                </div>
              </div>
            </div>

            {/* /* ---- end game row --- */}
          </div>
          <div className="tab hide" id="matches">
            <div className="matches_box">
              <div className="heads_bg">Upcoming Matches </div>
              <div className="match_row">
                <div className="team_a">
                  {' '}
                  <img src="/assets/media/teams/team1.png" alt="" />
                  <div className="team_name">
                    <h3>Fnatic eSports</h3>
                    <a href="#">
                      <img src="/assets/media/teams/user1.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user2.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user3.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user4.png" alt="" />
                    </a>{' '}
                  </div>
                </div>
                <div className="team_vs">
                  <p>
                    03 OCT 2018 05:38PM{' '}
                    <a href="#">
                      View Match{' '}
                      <i className="fa fa-play" aria-hidden="true"></i>
                    </a>
                  </p>
                  <div className="vs">VS</div>
                  <p>Call of Duty WW2</p>
                </div>
                <div className="team_b">
                  {' '}
                  <img src="/assets/media/teams/team2.png" alt="" />
                  <div className="team_name">
                    <h3>WingsGaming</h3>
                    <a href="#">
                      <img src="/assets/media/teams/user1.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user2.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user3.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user4.png" alt="" />
                    </a>{' '}
                  </div>
                </div>
              </div>
              <div className="match_row">
                <div className="team_a">
                  {' '}
                  <img src="/assets/media/teams/team1.png" alt="" />
                  <div className="team_name">
                    <h3>Fnatic eSports</h3>
                    <a href="#">
                      <img src="/assets/media/teams/user1.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user2.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user3.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user4.png" alt="" />
                    </a>{' '}
                  </div>
                </div>
                <div className="team_vs">
                  <p>
                    03 OCT 2018 05:38PM{' '}
                    <a href="#">
                      View Match{' '}
                      <i className="fa fa-play" aria-hidden="true"></i>
                    </a>
                  </p>
                  <div className="vs">VS</div>
                  <p>Call of Duty WW2</p>
                </div>
                <div className="team_b">
                  {' '}
                  <img src="/assets/media/teams/team2.png" alt="" />
                  <div className="team_name">
                    <h3>WingsGaming</h3>
                    <a href="#">
                      <img src="/assets/media/teams/user1.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user2.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user3.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user4.png" alt="" />
                    </a>{' '}
                  </div>
                </div>
              </div>
              <div className="match_row">
                <div className="team_a">
                  {' '}
                  <img src="/assets/media/teams/team1.png" alt="" />
                  <div className="team_name">
                    <h3>Fnatic eSports</h3>
                    <a href="#">
                      <img src="/assets/media/teams/user1.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user2.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user3.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user4.png" alt="" />
                    </a>{' '}
                  </div>
                </div>
                <div className="team_vs">
                  <p>
                    03 OCT 2018 05:38PM{' '}
                    <a href="#">
                      View Match{' '}
                      <i className="fa fa-play" aria-hidden="true"></i>
                    </a>
                  </p>
                  <div className="vs">VS</div>
                  <p>Call of Duty WW2</p>
                </div>
                <div className="team_b">
                  {' '}
                  <img src="/assets/media/teams/team2.png" alt="" />
                  <div className="team_name">
                    <h3>WingsGaming</h3>
                    <a href="#">
                      <img src="/assets/media/teams/user1.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user2.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user3.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user4.png" alt="" />
                    </a>{' '}
                  </div>
                </div>
              </div>
              <div className="heads_bg">
                LATEST RESULTS{' '}
                <span>
                  SPOILERS <b>On</b>
                </span>
              </div>
              <div className="match_row">
                <div className="team_a">
                  {' '}
                  <img src="/assets/media/teams/team3.png" alt="" />
                  <div className="team_name">
                    <h3>Fnatic eSports</h3>
                    <a href="#">
                      <img src="/assets/media/teams/user1.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user2.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user3.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user4.png" alt="" />
                    </a>{' '}
                  </div>
                </div>
                <div className="team_vs">
                  <p>
                    03 OCT 2018 05:38PM{' '}
                    <a href="#">
                      View Match{' '}
                      <i className="fa fa-play" aria-hidden="true"></i>
                    </a>
                  </p>
                  <div className="vs">3:2</div>
                  <p>Call of Duty WW2</p>
                </div>
                <div className="team_b">
                  {' '}
                  <img src="/assets/media/teams/team4.png" alt="" />
                  <div className="team_name">
                    <h3>WingsGaming</h3>
                    <a href="#">
                      <img src="/assets/media/teams/user1.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user2.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user3.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user4.png" alt="" />
                    </a>{' '}
                  </div>
                </div>
              </div>
              <div className="match_row">
                <div className="team_a">
                  {' '}
                  <img src="/assets/media/teams/team5.png" alt="" />
                  <div className="team_name">
                    <h3>Fnatic eSports</h3>
                    <a href="#">
                      <img src="/assets/media/teams/user1.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user2.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user3.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user4.png" alt="" />
                    </a>{' '}
                  </div>
                </div>
                <div className="team_vs">
                  <p>
                    03 OCT 2018 05:38PM{' '}
                    <a href="#">
                      View Match{' '}
                      <i className="fa fa-play" aria-hidden="true"></i>
                    </a>
                  </p>
                  <div className="vs">1:2</div>
                  <p>Fortnite</p>
                </div>
                <div className="team_b">
                  {' '}
                  <img src="/assets/media/teams/team6.png" alt="" />
                  <div className="team_name">
                    <h3>WingsGaming</h3>
                    <a href="#">
                      <img src="/assets/media/teams/user1.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user2.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user3.png" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/teams/user4.png" alt="" />
                    </a>{' '}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab hide" id="video">
              <GameVideos user={user} game={game} />
          </div>
          <div className="tab hide" id="teams">
            <GameTeams user={user} game={game} />
          </div>
          <div className="tab hide" id="players">
            <GamePlayers user={user} game={game} />
          </div>
          <div className="tab hide" id="communities">
            <ul className="communities">
              <li>
                <div className="imgs">
                  {' '}
                  <img src="/assets/media/user.jpg" alt="comm" />{' '}
                </div>
                <div className="bottom_data">
                  <h3>
                    Bandle City{' '}
                    <span>
                      <i className="fa fa-check-circle" aria-hidden="true"></i>
                    </span>
                  </h3>
                  <p className="member">853K members</p>
                </div>
              </li>
              <li>
                <div className="imgs">
                  {' '}
                  <img src="/assets/media/user.jpg" alt="comm" />{' '}
                </div>
                <div className="bottom_data">
                  <h3>Bandle City</h3>
                  <p className="member">37K members</p>
                </div>
              </li>
              <li>
                <div className="imgs">
                  {' '}
                  <img src="/assets/media/user.jpg" alt="comm" />{' '}
                </div>
                <div className="bottom_data">
                  <h3>Bandle City</h3>
                  <p className="member">83K members</p>
                </div>
              </li>
              <li>
                <div className="imgs">
                  {' '}
                  <img src="/assets/media/user.jpg" alt="comm" />{' '}
                </div>
                <div className="bottom_data">
                  <h3>
                    Bandle City{' '}
                    <span>
                      <i className="fa fa-check-circle" aria-hidden="true"></i>
                    </span>
                  </h3>
                  <p className="member">53K members</p>
                </div>
              </li>
              <li>
                <div className="imgs">
                  {' '}
                  <img src="/assets/media/user.jpg" alt="comm" />{' '}
                </div>
                <div className="bottom_data">
                  <h3>Bandle City</h3>
                  <p className="member">853K members</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Game;
