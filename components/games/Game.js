import axios from 'axios';
import { useState, useEffect } from 'react';
import baseURL from '@utils/baseURL';
import { useRouter } from 'next/router';

import GameVideos from './GameVideos';
import GameTournaments from './GameTournaments';
import GameLeagues from './GameLeagues';
import GameTeams from './GameTeams';
import GamePlayers from './GamePlayers';
import GameCommunities from './GameCommunities';
import Matches from '@components/team/Matches';

const Game = ({ user, data }) => {
  const [game, setGame] = useState(data?.games);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/player/playersbyteamsbygame/${game._id}`)
      .then((res) => {
        setPlayers(res.data);
      });
  }, []);
  const newPlyr = players.slice(1, 4);

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
              <img src={game?.imgUrl} alt="" />{' '}
            </div>
            <div className="profile_details">
              <div className="top_details">
                <div className="name_box">
                  <div className="flag_tick_flow">
                    {' '}
                    <span className="game_name">{game?.name}</span>{' '}
                    <div className="flag">
                      {' '}
                      <img
                        src="/assets/media/profile/flag.png"
                        alt="flag"
                      />{' '}
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
                  <span class="follower">{data?.profiles} Followers </span>
                </div>
              </div>
            </div>
            <div class="bottom_details">
              <div class="two_btns">
                <a href="#" className="btn">
                  {' '}
                  <i className="fa fa-steam"></i> Download at Steam{' '}
                  <span>free</span>
                </a>
                <a href="#" className="btn">
                  {' '}
                  PS Store <span>free</span>
                </a>
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
              <p>{game?.description} </p>
              <div className="games">
                <h3>PUBLISHER: </h3>
                <span>
                  {' '}
                  {!game?.publisher || game?.publisher.length === 0 ? (
                    <p>No publisher...</p>
                  ) : (
                    <>
                      <img src={game?.publisher.imgUrl} />{' '}
                      <b>{game?.publisher.name}</b>
                    </>
                  )}
                </span>
              </div>

              <div className="games">
                <h3>PLATFORM: </h3>
                <p>{game?.platform}</p>{' '}
              </div>
            </div>
            <div className="right_team_bio">
              <div className="games">
                <h2>PLAYERS: </h2>
                <a href="#" target="_blank">
                  {' '}
                  <img src={newPlyr[0]?.current_team?.image_url} alt="" />{' '}
                </a>{' '}
                <a href="#">
                  {' '}
                  <img src={newPlyr[1]?.current_team?.image_url} alt="" />{' '}
                </a>{' '}
                <a href="#" target="_blank">
                  {' '}
                  <img src={newPlyr[2]?.current_team?.image_url} alt="" />{' '}
                </a>{' '}
                {players.length === 0 ? (
                  <p>No Players for This Game.</p>
                ) : (
                  <p> + {players.length - 3} </p>
                )}
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
          <div className="tab" id="tournament">
            <h2>Tournament</h2>

            {/* /* ---- start game row --- */}
            <GameTournaments user={user} />

            {/* /* ---- end game row --- */}
          </div>

          <div className="tab hide" id="league">
            <h2>League</h2>

            {/* /* ---- start game row --- */}

            <GameLeagues user={user} game={game} />

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
            <Matches teamMatches={data?.matchArray} />
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
            <GameCommunities user={user} game={game} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Game;
