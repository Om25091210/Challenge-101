import TeamAbout from './TeamAbout';
import TeamSponsors from './TeamSponsors';
import ProductList from '@components/common/ProductList';

const TeamProfileData = ({ user, data, products }) => {

  return (
    <>
      <div className="prfoile_tab_data white_bg">
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
                  <i className="fa fa-commenting" aria-hidden="true"></i>{' '}
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
                      <i className="fa fa-heart" aria-hidden="true"></i>{' '}
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
                        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
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
                      <i className="fa fa-angle-down" aria-hidden="true"></i>
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
                  <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
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
                  <span className="nm">Mic:</span> <span className="task"> On</span>
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
                  <span className="task"> 4 hours per day 7 days a week </span>
                </li>
              </ul>
              <div className="chart_box">
                <img src="/assets/media/profilechart.jpg" alt="" />
              </div>
              <button className="game_btn">INVITE TO TEAM</button>
            </div>
          </div>
        </div>
        <div className="tab hide" id="squads">
          <div className="squads_box">
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
                  <label className="custom-control-label" htmlFor="All"></label>
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
            <ul>
              <li className="squads">
                <div className="squad_img">
                  {' '}
                  <img
                    src="/assets/media/squads/bg.jpg"
                    className="squad_bg"
                    alt=""
                  />
                  <h2>DOTA 2</h2>
                  <div className="plyars">
                    {' '}
                    <a href="#">
                      <img src="/assets/media/squads/player1.jpg" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/squads/player2.jpg" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/squads/player3.jpg" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/squads/player4.jpg" alt="" />
                    </a>{' '}
                  </div>
                </div>
                <div className="squad_btn">
                  {' '}
                  <span className="cuntry_name">INDIA</span>{' '}
                  <a href="#!" className="view">
                    VIEW TEAM{' '}
                    <i
                      className="fa fa-long-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </a>{' '}
                </div>
                <div className="squads_details">
                  {' '}
                  <a href="#!" className="squads_close">
                    X
                  </a>
                  <div className="banner">
                    {' '}
                    <img src="/assets/media/squads/banner.jpg" alt="" />
                    <h2>DOTA 2</h2>
                  </div>
                  <table className="table">
                    <thead className="dark-light">
                      <tr>
                        <th scope="col">player</th>
                        <th scope="col">nickname</th>
                        <th scope="col">role</th>
                        <th scope="col">term</th>
                        <th scope="col"> win-loss</th>
                        <th scope="col">kda</th>
                        <th scope="col"> win%</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span className="user">
                            <img src="/assets/media/squads/1.jpg" alt="" />
                          </span>
                        </td>
                        <td>
                          <h3>
                            z3us <img src="/assets/media/squads/india.jpg" />
                          </h3>
                          <p>sonu singh - 26</p>
                          <a href="#">player profile </a>
                        </td>
                        <td>Ak</td>
                        <td>2011-2014</td>
                        <td>81/89</td>
                        <td>4.1</td>
                        <td>81%</td>
                      </tr>
                      <tr>
                        <td>
                          <span className="user">
                            <img src="/assets/media/squads/1.jpg" alt="" />
                          </span>
                        </td>
                        <td>
                          <h3>
                            infex1ous{' '}
                            <img src="/assets/media/squads/india.jpg" />
                          </h3>
                          <p>sonu singh - 26</p>
                          <a href="#">player profile </a>
                        </td>
                        <td>Ak</td>
                        <td>2011-2014</td>
                        <td>81/89</td>
                        <td>4.1</td>
                        <td>81%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
              <li className="squads">
                <div className="squad_img">
                  {' '}
                  <img
                    src="/assets/media/squads/bg.jpg"
                    className="squad_bg"
                    alt=""
                  />
                  <h2>DOTA 2</h2>
                  <div className="plyars">
                    {' '}
                    <a href="#">
                      <img src="/assets/media/squads/player1.jpg" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/squads/player2.jpg" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/squads/player3.jpg" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/squads/player4.jpg" alt="" />
                    </a>{' '}
                  </div>
                </div>
                <div className="squad_btn">
                  {' '}
                  <span className="cuntry_name">INDIA</span>
                  <a href="#!" className="view">
                    VIEW TEAM{' '}
                    <i
                      className="fa fa-long-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </a>{' '}
                </div>
                <div className="squads_details">
                  {' '}
                  <a href="#!" className="squads_close">
                    X
                  </a>
                  <div className="banner">
                    {' '}
                    <img src="/assets/media/squads/banner.jpg" alt="" />
                    <h2>DOTA 3</h2>
                  </div>
                  <table className="table">
                    <thead className="dark-light">
                      <tr>
                        <th scope="col">player</th>
                        <th scope="col">nickname</th>
                        <th scope="col">role</th>
                        <th scope="col">term</th>
                        <th scope="col"> win-loss</th>
                        <th scope="col">kda</th>
                        <th scope="col"> win%</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span className="user">
                            <img src="/assets/media/squads/1.jpg" alt="" />
                          </span>
                        </td>
                        <td>
                          <h3>
                            z3us <img src="/assets/media/squads/india.jpg" />
                          </h3>
                          <p>sonu singh - 26</p>
                          <a href="#">player profile </a>
                        </td>
                        <td>Ak</td>
                        <td>2011-2014</td>
                        <td>81/89</td>
                        <td>4.1</td>
                        <td>81%</td>
                      </tr>
                      <tr>
                        <td>
                          <span className="user">
                            <img src="/assets/media/squads/1.jpg" alt="" />
                          </span>
                        </td>
                        <td>
                          <h3>
                            infex1ous{' '}
                            <img src="/assets/media/squads/india.jpg" />
                          </h3>
                          <p>sonu singh - 26</p>
                          <a href="#">player profile </a>
                        </td>
                        <td>Ak</td>
                        <td>2011-2014</td>
                        <td>81/89</td>
                        <td>4.1</td>
                        <td>81%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
              <li className="squads">
                <div className="squad_img">
                  {' '}
                  <img
                    src="/assets/media/squads/bg.jpg"
                    className="squad_bg"
                    alt=""
                  />
                  <h2>DOTA 2</h2>
                  <div className="plyars">
                    {' '}
                    <a href="#">
                      <img src="/assets/media/squads/player1.jpg" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/squads/player2.jpg" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/squads/player3.jpg" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/squads/player4.jpg" alt="" />
                    </a>{' '}
                  </div>
                </div>
                <div className="squad_btn">
                  {' '}
                  <span className="cuntry_name">INDIA</span>{' '}
                  <a href="#">
                    VIEW TEAM{' '}
                    <i
                      className="fa fa-long-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </a>{' '}
                </div>
              </li>
              <li className="squads">
                <div className="squad_img">
                  {' '}
                  <img
                    src="/assets/media/squads/bg.jpg"
                    className="squad_bg"
                    alt=""
                  />
                  <h2>DOTA 2</h2>
                  <div className="plyars">
                    {' '}
                    <a href="#">
                      <img src="/assets/media/squads/player1.jpg" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/squads/player2.jpg" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/squads/player3.jpg" alt="" />
                    </a>{' '}
                    <a href="#">
                      <img src="/assets/media/squads/player4.jpg" alt="" />
                    </a>{' '}
                  </div>
                </div>
                <div className="squad_btn">
                  {' '}
                  <span className="cuntry_name">INDIA</span>{' '}
                  <a href="#">
                    VIEW TEAM{' '}
                    <i
                      className="fa fa-long-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </a>{' '}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="tab hide" id="achievement">
          <div className="achivement_box">
            <div className="features">
              <h2>featured</h2>
              <ul>
                <li>
                  <div className="img">
                    <i className="fa fa-trophy" aria-hidden="true"></i>
                  </div>
                  <p className="tit">Silver x1</p>
                  <p>Awarded for placing second 1 tournament</p>
                </li>
              </ul>
            </div>
            <div className="trophy_cabinate">
              <h3>trophy cabinet</h3>
              <ul>
                <li>
                  <p className="num">21</p>
                  <h4> Title </h4>
                  <h5>professional</h5>
                  <h5>tournaments</h5>
                </li>
                <li>
                  <p className="num">21</p>
                  <h4> Title </h4>
                  <h5>professional</h5>
                  <h5>tournaments</h5>
                </li>
                <li>
                  <p className="num">21</p>
                  <h4> Title </h4>
                  <h5>professional</h5>
                  <h5>tournaments</h5>
                </li>
                <li>
                  <p className="num">21</p>
                  <h4> Title </h4>
                  <h5>professional</h5>
                  <h5>tournaments</h5>
                </li>
              </ul>
            </div>
            <div className="tournament_table">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">tournament</th>
                    <th scope="col">game</th>
                    <th scope="col">date</th>
                    <th scope="col">rank</th>
                    <th scope="col">prize</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>zapak gaming tournament </td>
                    <td>cod 4</td>
                    <td>2011</td>
                    <td>1</td>
                    <td>rs. 10,000</td>
                  </tr>
                  <tr>
                    <td>zapak gaming tournament </td>
                    <td>cod 4</td>
                    <td>2011</td>
                    <td>1</td>
                    <td>rs. 10,000</td>
                  </tr>
                  <tr>
                    <td>zapak gaming tournament </td>
                    <td>cod 4</td>
                    <td>2011</td>
                    <td>1</td>
                    <td>rs. 10,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="tab hide" id="matches">
          {' '}
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
                    View Match <i className="fa fa-play" aria-hidden="true"></i>
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
                    View Match <i className="fa fa-play" aria-hidden="true"></i>
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
                    View Match <i className="fa fa-play" aria-hidden="true"></i>
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
                    View Match <i className="fa fa-play" aria-hidden="true"></i>
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
                    View Match <i className="fa fa-play" aria-hidden="true"></i>
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
        <div className="tab hide" id="stats">
          <div className="all_stat">
            <div className="tournament_table">
              <h2>all time stats</h2>
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">tournaments </th>
                    <th scope="col">place</th>
                    <th scope="col">mp </th>
                    <th scope="col">wins</th>
                    <th scope="col">loss</th>
                    <th scope="col">win%</th>
                    <th scope="col">w strk</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>115 </td>
                    <td>16th</td>
                    <td>767</td>
                    <td>545</td>
                    <td>323</td>
                    <td>68%</td>
                    <td>21</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="tournament_table">
              <h2>2021 stats</h2>
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">tournaments </th>
                    <th scope="col">place</th>
                    <th scope="col">mp </th>
                    <th scope="col">wins</th>
                    <th scope="col">loss</th>
                    <th scope="col">win%</th>
                    <th scope="col">w strk</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>115 </td>
                    <td>16th</td>
                    <td>767</td>
                    <td>545</td>
                    <td>323</td>
                    <td>68%</td>
                    <td>21</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="tournament_table">
              <h2>league </h2>
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Season </th>
                    <th scope="col">place</th>
                    <th scope="col">mp </th>
                    <th scope="col">wins</th>
                    <th scope="col">loss</th>
                    <th scope="col">win%</th>
                    <th scope="col">w strk</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>gon fall 2021 </td>
                    <td>16th</td>
                    <td>767</td>
                    <td>545</td>
                    <td>323</td>
                    <td>68%</td>
                    <td>21</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="tournament_table">
              <h2>upcoming and recent matches </h2>
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">date </th>
                    <th scope="col">time</th>
                    <th scope="col">game </th>
                    <th scope="col">opponent</th>
                    <th scope="col">result</th>
                    <th scope="col">STARTED</th>
                    <th scope="col">match details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> 24th nov 17 </td>
                    <td>6:15 pm ist</td>
                    <td> cod4</td>
                    <td> vega esports</td>
                    <td> win</td>
                    <td> HOME</td>
                    <td> view match </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <ProductList user={user} productList={products}/>

        <div className="tab hide" id="photos">
          Streams
        </div>
        <div className="tab hide" id="media">
          <div className="video_box">
            <ul>
              <li>
                <a href="#video_1" className="videos">
                  {' '}
                  <div className="video">
                    {' '}
                    <img src="/assets/media/video/thumb1.jpg" alt="" />{' '}
                  </div>
                </a>
                <div className="bottom_data">
                  {' '}
                  <a href="#">The Team</a>{' '}
                  <a href="#" className="yellow">
                    Lq Heroes
                  </a>
                  <h2>
                    Destroy Played the first Mission of the Mercenaries Update
                    With Kelly And Saki
                  </h2>
                  <span className="date">August 27th,2018</span>{' '}
                  <span className="views">
                    <i className="fa fa-eye" aria-hidden="true"></i> 2223
                  </span>{' '}
                  <span className="likes">
                    <i className="fa fa-heart" aria-hidden="true"></i>453
                  </span>{' '}
                  <span className="comments">
                    <i className="fa fa-comment" aria-hidden="true"></i>18
                  </span>{' '}
                </div>
              </li>
              <li>
                <div className="video">
                  {' '}
                  <img src="/assets/media/video/thumb1.jpg" alt="" />{' '}
                </div>
                <div className="bottom_data">
                  {' '}
                  <a href="#">The Team</a>{' '}
                  <a href="#" className="red">
                    Lq Heroes
                  </a>
                  <h2>
                    Destroy Played the first Mission of the Mercenaries Update
                    With Kelly And Saki
                  </h2>
                  <span className="date">August 27th,2018</span>{' '}
                  <span className="views">
                    <i className="fa fa-eye" aria-hidden="true"></i> 2223
                  </span>{' '}
                  <span className="likes">
                    <i className="fa fa-heart" aria-hidden="true"></i>453
                  </span>{' '}
                  <span className="comments">
                    <i className="fa fa-comment" aria-hidden="true"></i>18
                  </span>{' '}
                </div>
              </li>
              <li>
                <div className="video">
                  {' '}
                  <img src="/assets/media/video/thumb1.jpg" alt="" />{' '}
                </div>
                <div className="bottom_data">
                  {' '}
                  <a href="#">The Team</a>{' '}
                  <a href="#" className="yellow">
                    Lq Heroes
                  </a>
                  <h2>
                    Destroy Played the first Mission of the Mercenaries Update
                    With Kelly And Saki
                  </h2>
                  <span className="date">August 27th,2018</span>{' '}
                  <span className="views">
                    <i className="fa fa-eye" aria-hidden="true"></i> 2223
                  </span>{' '}
                  <span className="likes">
                    <i className="fa fa-heart" aria-hidden="true"></i>453
                  </span>{' '}
                  <span className="comments">
                    <i className="fa fa-comment" aria-hidden="true"></i>18
                  </span>{' '}
                </div>
              </li>
              <li>
                <div className="video">
                  {' '}
                  <img src="/assets/media/video/thumb1.jpg" alt="" />{' '}
                </div>
                <div className="bottom_data">
                  {' '}
                  <a href="#">The Team</a>{' '}
                  <a href="#" className="yellow">
                    Lq Heroes
                  </a>
                  <h2>
                    Destroy Played the first Mission of the Mercenaries Update
                    With Kelly And Saki
                  </h2>
                  <span className="date">August 27th,2018</span>{' '}
                  <span className="views">
                    <i className="fa fa-eye" aria-hidden="true"></i> 2223
                  </span>{' '}
                  <span className="likes">
                    <i className="fa fa-heart" aria-hidden="true"></i>453
                  </span>{' '}
                  <span className="comments">
                    <i className="fa fa-comment" aria-hidden="true"></i>18
                  </span>{' '}
                </div>
              </li>
              <li>
                <div className="video">
                  {' '}
                  <img src="/assets/media/video/thumb1.jpg" alt="" />{' '}
                </div>
                <div className="bottom_data">
                  {' '}
                  <a href="#">The Team</a>{' '}
                  <a href="#" className="yellow">
                    Lq Heroes
                  </a>
                  <h2>
                    Destroy Played the first Mission of the Mercenaries Update
                    With Kelly And Saki
                  </h2>
                  <span className="date">August 27th,2018</span>{' '}
                  <span className="views">
                    <i className="fa fa-eye" aria-hidden="true"></i> 2223
                  </span>{' '}
                  <span className="likes">
                    <i className="fa fa-heart" aria-hidden="true"></i>453
                  </span>{' '}
                  <span className="comments">
                    <i className="fa fa-comment" aria-hidden="true"></i>18
                  </span>{' '}
                </div>
              </li>
              <li>
                <div className="video">
                  {' '}
                  <img src="/assets/media/video/thumb1.jpg" alt="" />{' '}
                </div>
                <div className="bottom_data">
                  {' '}
                  <a href="#">The Team</a>{' '}
                  <a href="#" className="yellow">
                    Lq Heroes
                  </a>
                  <h2>
                    Destroy Played the first Mission of the Mercenaries Update
                    With Kelly And Saki
                  </h2>
                  <span className="date">August 27th,2018</span>{' '}
                  <span className="views">
                    <i className="fa fa-eye" aria-hidden="true"></i> 2223
                  </span>{' '}
                  <span className="likes">
                    <i className="fa fa-heart" aria-hidden="true"></i>453
                  </span>{' '}
                  <span className="comments">
                    <i className="fa fa-comment" aria-hidden="true"></i>18
                  </span>{' '}
                </div>
              </li>
            </ul>

            <div id="video_1" style={{ display: 'none' }}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/9e9FQCA01dI"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        <div className="tab hide" id="jobs">
          <div className="team_row arena_team_row">
            <div className="inner_team">
              <div className="logo_box">
                <img
                  src="/assets/media/discover/lxg.png"
                  className="thumb_img"
                  alt=""
                />
                <h3>AFK GAMING PVT LTD</h3>
              </div>
              <div className="mores">
                <p>
                  <b>POSITION:</b> SENIOR DEVELOPER
                </p>
                <p>
                  <b>EXPERIENCE:</b> 10 YEARS
                </p>
                <p>
                  <b> LOCATION:</b> BANGALORE{' '}
                </p>
              </div>
              <a href="#" className="join">
                APPLY NOW
              </a>{' '}
            </div>
          </div>
        </div>

        <TeamAbout data={data} />

        <TeamSponsors data={data} />

        <div className="tab hide" id="rigs">
          <div className="rigs">
            <ul>
              <li>
                <div className="lft_prod_det">
                  {' '}
                  <span className="new"> New</span>
                  <div className="prod_brand"> Logitech H9189</div>
                  <p className="prod_name">Mouse</p>
                  <a href="#prod2" className="quickpoup">
                    Buy Now
                  </a>{' '}
                </div>
                <div className="prod_img">
                  <img src="/assets/media/rigs/headphone1.jpg" alt="" />
                </div>
              </li>
              <li>
                <div className="lft_prod_det">
                  {' '}
                  <span className="new"> New</span>
                  <div className="prod_brand"> Logitech H9189</div>
                  <p className="prod_name">Mouse</p>
                  <a href="#">Buy Now</a>{' '}
                </div>
                <div className="prod_img">
                  <img src="/assets/media/rigs/headphone1.jpg" alt="" />
                </div>
              </li>
              <li>
                <div className="lft_prod_det">
                  {' '}
                  <span className="new"> New</span>
                  <div className="prod_brand"> Logitech H9189</div>
                  <p className="prod_name">Mouse</p>
                  <a href="#">Buy Now</a>{' '}
                </div>
                <div className="prod_img">
                  <img src="/assets/media/rigs/headphone2.jpg" alt="" />
                </div>
              </li>
              <li>
                <div className="lft_prod_det">
                  {' '}
                  <span className="new"> New</span>
                  <div className="prod_brand"> Logitech H9189</div>
                  <p className="prod_name">Mouse</p>
                  <a href="#">Buy Now</a>{' '}
                </div>
                <div className="prod_img">
                  <img src="/assets/media/rigs/headphone1.jpg" alt="" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ------------- start poup data ------------- */}
      <div id="prod2" className="quick_view" style={{ display: 'none' }}>
        <div className="product_box">
          <div className="product-img-box">
            <div className="prod_big_thumb">
              <div className="slider-for">
                <div>
                  <div className="slide-box">
                    {' '}
                    <img src="/assets/media/rigs/headphone1.jpg" alt="" />{' '}
                  </div>
                </div>
                <div>
                  <div className="slide-box">
                    {' '}
                    <img src="/assets/media/rigs/headphone1.jpg" alt="" />{' '}
                  </div>
                </div>
                <div>
                  <div className="slide-box">
                    {' '}
                    <img src="/assets/media/rigs/headphone1.jpg" alt="" />{' '}
                  </div>
                </div>
                <div>
                  <div className="slide-box">
                    {' '}
                    <img src="/assets/media/rigs/headphone1.jpg" alt="" />{' '}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="product-detail-box">
            <h1>Mouse</h1>
            <div className="row">
              <div className="col-lg-12">
                <div className="like_view">
                  {' '}
                  <a href="#" className="art">
                    <i className="fa fa-picture-o" aria-hidden="true"></i> Art
                  </a>{' '}
                  <a href="#" className="view">
                    <i className="fa fa-eye" aria-hidden="true"></i> 250
                  </a>{' '}
                  <a href="#" className="like">
                    <i className="fa fa-heart" aria-hidden="true"></i> 18
                  </a>{' '}
                </div>
                <div className="review">
                  {' '}
                  <i className="fa fa-star" aria-hidden="true"></i>{' '}
                  <i className="fa fa-star" aria-hidden="true"></i>{' '}
                  <i className="fa fa-star" aria-hidden="true"></i>{' '}
                  <i className="fa fa-star" aria-hidden="true"></i>{' '}
                  <i className="fa fa-star" aria-hidden="true"></i>{' '}
                  <span className="rev_txt">
                    Based on <b>2 reviews</b>
                  </span>{' '}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="price">
                  {' '}
                  $48.00 <del style={{ display: 'none' }}>£299.00</del>{' '}
                  <span className="discount" style={{ display: 'none' }}>
                    (10% Discount)
                  </span>{' '}
                </div>
                <p className="brief">
                  jjjjjjjjjjjjjjjjjjjjjj ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam tristique purus vitae venenatis ultrices. Suspendisse
                  tristique tortor ante,{' '}
                </p>
              </div>
            </div>
            <div className="row size-option">
              <div className="col-lg-12">
                <ul>
                  <li>
                    {' '}
                    <a href="#!">Qty</a>
                    <div className="content size-chart qty mCustomScrollbar">
                      <ul>
                        <li>1</li>
                        <li>2</li>
                        <li className="selected">3</li>
                        <li>4</li>
                        <li>5</li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row cart-row">
              <div className="col-lg-12 col-md-12 col-xs-12">
                {' '}
                <a href="#!" className="btn btn-primary">
                  <i className="fa fa-shopping-basket"></i> Add To Bag{' '}
                </a>{' '}
                <a href="#!" className="btn btn-primary">
                  <i className="fa fa-heart-o" aria-hidden="true"></i> Add To
                  wishlist{' '}
                </a>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default TeamProfileData;
