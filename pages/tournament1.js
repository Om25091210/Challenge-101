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
                <img src="/assets/media/tournament/1.png" alt="" />{' '}
              </div>
              <div className="profile_details">
                <div className="top_details">
                  <div className="name_box">
                    {' '}
                    <span className="game_name">
                      {' '}
                      Gamer Of Nation III{' '}
                    </span>{' '}
                    <span className="name">
                      Indoor Stadium, Bangalore Feb 18th - 20th 10 AM IST
                    </span>{' '}
                    <span className="follower">
                      Part of the series: Gamer of Nation Championship
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
                <img src="/assets/media/sponsers/redbull.png" alt="" />
                <img src="/assets/media/sponsers/razer.png" alt="" />
                <img src="/assets/media/sponsers/addidas.png" alt="" />
                <img src="/assets/media/sponsers/audi.png" alt="" />
              </div>

              <div className="logos">
                <h5>Price</h5>

                <span>$8,000,000</span>
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
                  Gamer Of Nation Championship is one of the top tournament
                  championships in India with over a $5m prize pool in 2019.{' '}
                </p>

                <div className="games">
                  <h3>organizer: : </h3>
                  <img src="/assets/media/category/1.png" alt="" /> Multiplayr
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
              <h2>achievement</h2>
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
};

export default Tournament1;
