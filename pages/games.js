import MetaDash from '../components/MetaDash';
import SignedHeader from '../components/SignedHeader';
import LeftNav from '../components/LeftNav';
import AllScript from './AllScript';

const Tournament1 = ({ user }) => {
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
                <img src="/assets/media/games/games.png" alt="" />{' '}
              </div>
              <div className="profile_details">
                <div className="top_details">
                  <div className="name_box">
                    {' '}
                    <span className="game_name">Dota 2 </span>{' '}
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
              </div>
            </div>

            <div className="tournament_sponsers">
              <div className="logos">
                <h5>OFFICIAL TOURNAMENTS</h5>
                <img src="/assets/media/games/tournament1.png" alt="" />
                <img src="/assets/media/games/tournament2.png" alt="" />
                <img src="/assets/media/games/tournament3.png" alt="" />
              </div>
            </div>
            <div className="bio_box team_bio arena_bio">
              <div className="left_bio">
                <div className="top_bio">
                  <h3>ABOUT THE GAME</h3>
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
                  Gamer Of Nation Championship is one of the top tournament
                  championships in India with over a $5m prize pool in 2019.{' '}
                </p>

                <div className="games">
                  <h3>PUBLISHER: </h3>
                  <img src="/assets/media/logos/icon.png" alt="" /> Multiplayr
                </div>

                <div className="games">
                  <h3>PLATFORM: </h3>
                  pc, xbox
                </div>
              </div>
              <div className="right_team_bio">
                <div className="games">
                  <h2>PLAYERS: </h2>
                  <a href="#">
                    <img src="/assets/media/profile/game1.png" alt="" />
                  </a>
                  <a href="#">
                    <img src="/assets/media/profile/game2.png" alt="" />
                  </a>
                  <a href="#">
                    <img src="/assets/media/profile/game3.png" alt="" />
                  </a>
                </div>
                <div className="internet">
                  <ul>
                    <li>LEAgUES/TOURNAMENTS:</li>
                    <li>COMMUNITIES: </li>
                    <li>steaming:</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <ul className="profile_tab_btn">
            <li className="active">
              <a href="javascript:void(0);" rel="overview">
                OVERVIEW
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" rel="tournament">
                TOURNAMENTS
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" rel="participants">
                {' '}
                PARTICIPANTS
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" rel="league">
                LEAGUES
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" rel="ladder">
                LADDER
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" rel="matches">
                {' '}
                MATCHES
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" rel="video">
                VIDEOS/STREAMS{' '}
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" rel="teams">
                TEAMS
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" rel="players">
                PLAYERS
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" rel="communities">
                COMMUNITIES
              </a>
            </li>
          </ul>
          <div className="prfoile_tab_data">
            <div className="tab" id="overview">
              Overview
            </div>
            <div className="tab hide" id="tournament">
              <h2>tournament</h2>
            </div>
            <div className="tab hide" id="participants">
              <h2>participants</h2>
            </div>
            <div className="tab hide" id="participants">
              <h2>participants</h2>
            </div>
            <div className="tab hide" id="league">
              <h2>league</h2>
            </div>
            <div className="tab hide" id="ladder">
              <h2>ladder</h2>
            </div>
            <div className="tab hide" id="matches">
              <h2>matches</h2>
            </div>
            <div className="tab hide" id="video">
              <h2>video</h2>
            </div>
            <div className="tab hide" id="teams">
              <h2>teams</h2>
            </div>
            <div className="tab hide" id="players">
              <h2>players</h2>
            </div>
            <div className="tab hide" id="communities">
              <h2>communities</h2>
            </div>
          </div>
        </div>
      </div>

      <AllScript />
    </>
  );
};

export default Tournament1;
