import PoUp from './Poup';

const TeamProfileData = (props) => (
  <>
    <div className="prfoile_tab_data white_bg">
      <div className="tab" id="overview">
        {' '}
        111111111
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
                <label className="custom-control-label" for="Fortnite"></label>
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
                <label className="custom-control-label" for="Call"></label>
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
                <label className="custom-control-label" for="Fifa"></label>
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
                <a href="javascript:void(0)" className="view">
                  VIEW TEAM{' '}
                  <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                </a>{' '}
              </div>
              <div className="squads_details">
                {' '}
                <a href="javascript:void(0)" className="squads_close">
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
                          infex1ous <img src="/assets/media/squads/india.jpg" />
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
                <a href="javascript:void(0)" className="view">
                  VIEW TEAM{' '}
                  <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                </a>{' '}
              </div>
              <div className="squads_details">
                {' '}
                <a href="javascript:void(0)" className="squads_close">
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
                          infex1ous <img src="/assets/media/squads/india.jpg" />
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
                  <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
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
                  <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
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
      <div className="tab hide" id="store">
        <div className="products">
          <ul>
            <li>
              <div className="pro_img">
                {' '}
                <a href="#prod1" className="quickpoup">
                  <img src="/assets/media/team/tshirt1.jpg" alt="" />
                </a>{' '}
                <span className="size_option">36d 12h 13m 18s</span>{' '}
              </div>
              <div className="pro_bottom">
                <div className="name_dots">
                  <h4>ALCHEMISTS MEN-SHIRT</h4>
                  <a href="#">
                    <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                  </a>{' '}
                </div>
                <div className="stars">
                  {' '}
                  <a href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>{' '}
                  <a href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>{' '}
                  <a href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>{' '}
                  <a href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>{' '}
                  <a href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>
                  <div className="price"> $19.00</div>
                </div>
              </div>
              <div className="likes">
                <a href="#">
                  <i className="fa fa-heart" aria-hidden="true"></i> 80{' '}
                </a>
              </div>
            </li>
            <li>
              <div className="pro_img">
                {' '}
                <img src="/assets/media/team/tshirt2.jpg" alt="" />{' '}
                <span className="size_option">36d 12h 13m 18s</span>{' '}
              </div>
              <div className="pro_bottom">
                <div className="name_dots">
                  <h4>ALCHEMISTS MEN-SHIRT</h4>
                  <a href="#">
                    <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                  </a>{' '}
                </div>
                <div className="stars">
                  {' '}
                  <a href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>{' '}
                  <a href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>{' '}
                  <a href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>{' '}
                  <a href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>{' '}
                  <a href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>
                  <div className="price"> $19.00</div>
                </div>
              </div>
              <div className="likes">
                <a href="#">
                  <i className="fa fa-heart" aria-hidden="true"></i> 80{' '}
                </a>
              </div>
            </li>
            <li>
              <div className="pro_img">
                {' '}
                <img src="/assets/media/team/tshirt1.jpg" alt="" />{' '}
                <span className="size_option">36d 12h 13m 18s</span>
              </div>
              <div className="pro_bottom">
                <div className="name_dots">
                  <h4>ALCHEMISTS MEN-SHIRT</h4>
                  <a href="#">
                    <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                  </a>{' '}
                </div>
                <div className="stars">
                  {' '}
                  <a href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>{' '}
                  <a href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>{' '}
                  <a href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>{' '}
                  <a href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>{' '}
                  <a href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>
                  <div className="price"> $19.00</div>
                </div>
              </div>
              <div className="likes">
                <a href="#">
                  <i className="fa fa-heart" aria-hidden="true"></i> 80{' '}
                </a>
              </div>
            </li>
            <li>
              <div className="pro_img">
                {' '}
                <img src="/assets/media/team/cup.jpg" alt="" />{' '}
                <span className="size_option">36d 12h 13m 18s</span>
              </div>
              <div className="pro_bottom">
                <div className="name_dots">
                  <h4>ALCHEMISTS MEN-SHIRT</h4>
                  <a href="#">
                    <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                  </a>{' '}
                </div>
                <div className="stars">
                  {' '}
                  <a href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>{' '}
                  <a href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>{' '}
                  <a href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>{' '}
                  <a href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>{' '}
                  <a href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>
                  <div className="price"> $19.00</div>
                </div>
              </div>
              <div className="likes">
                <a href="#">
                  <i className="fa fa-heart" aria-hidden="true"></i> 80{' '}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="tab hide" id="streams">
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
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
      <div className="tab hide" id="jobs">
        jobs
      </div>
      <div className="tab hide" id="about">
        <div className="our_team">
          <div className="about_team">
            <div className="about">
              <h2>OUR TEAM</h2>
              <p>
                From playing Nintendo, action and shooter games we have <br />
                always wanted to achieve something in the big
              </p>
            </div>
            <div className="team_mails">
              <h3>
                <i className="fa fa-home" aria-hidden="true"></i> Mangement
              </h3>
              <a href="#">office@pixiesquad.com</a>{' '}
            </div>
            <div className="team_mails">
              <h3>
                <i className="fa fa-life-ring" aria-hidden="true"></i> Support
              </h3>
              <a href="#">help@pixiesquad.com</a>{' '}
            </div>
            <div className="team_mails">
              <h3>
                <i className="fa fa-pencil" aria-hidden="true"></i> Mangement
              </h3>
              <a href="#">news@pixiesquad.com</a>{' '}
            </div>
          </div>
          <div className="team_member">
            <ul>
              <li>
                <div className="dp">
                  {' '}
                  <img src="/assets/media/user.png" alt="" />{' '}
                </div>
                <h3>Coach</h3>
                <h4>Evan Miles</h4>
              </li>
              <li>
                <div className="dp">
                  {' '}
                  <img src="/assets/media/user.png" alt="" />{' '}
                </div>
                <h3>Coach</h3>
                <h4>Evan Miles</h4>
              </li>
              <li>
                <div className="dp">
                  {' '}
                  <img src="/assets/media/user.png" alt="" />{' '}
                </div>
                <h3> MANAGER</h3>
                <h4>Evan Miles</h4>
              </li>
              <li>
                <div className="dp">
                  {' '}
                  <img src="/assets/media/user.png" alt="" />{' '}
                </div>
                <h3>Coach</h3>
                <h4>Evan Miles</h4>
              </li>
              <li>
                <div className="dp">
                  {' '}
                  <img src="/assets/media/user.png" alt="" />{' '}
                </div>
                <h3> MASSAGIST</h3>
                <h4>Evan Miles</h4>
              </li>
              <li>
                <div className="dp">
                  {' '}
                  <img src="/assets/media/user.png" alt="" />{' '}
                </div>
                <h3>PHYHOLOGIST</h3>
                <h4>Evan Miles</h4>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="tab hide" id="sponsors">
        <div className="sponsers_box">
          <ul>
            <li>
              <div className="sponser_name">
                <img src="/assets/media/sponsers/1.jpg" alt="" />
              </div>
              <div className="sponser_data">
                {' '}
                <span className="head_spons_bg">Head Sponsor</span>
                <p>
                  Roccat is the world 4yh-largest PC vendor by 2015 unit
                  sales.[3] Asus appers in BusinessWeek's infoTech 100 and
                  Asia's Top IT Companies rankings, and it ranked first in the
                  IT.
                </p>
              </div>
            </li>
            <li>
              <div className="sponser_name">
                <img src="/assets/media/sponsers/2.jpg" alt="" />
              </div>
              <div className="sponser_data">
                {' '}
                <span className="sponser_bg">Head Sponsor</span>
                <p>
                  Roccat is the world 4yh-largest PC vendor by 2015 unit
                  sales.[3] Asus appers in BusinessWeek's infoTech 100 and
                  Asia's Top IT Companies rankings, and it ranked first in the
                  IT.
                </p>
              </div>
            </li>
            <li>
              <div className="sponser_name">
                <img src="/assets/media/sponsers/3.jpg" alt="" />
              </div>
              <div className="sponser_data">
                {' '}
                <span className="promotor_bg">Head Sponsor</span>
                <p>
                  Roccat is the world 4yh-largest PC vendor by 2015 unit
                  sales.[3] Asus appers in BusinessWeek's infoTech 100 and
                  Asia's Top IT Companies rankings, and it ranked first in the
                  IT.
                </p>
              </div>
            </li>

            <li>
              <div className="sponser_name">
                <img src="/assets/media/sponsers/4.jpg" alt="" />
              </div>
              <div className="sponser_data">
                {' '}
                <span className="head_spons_bg">Head Sponsor</span>
                <p>
                  Roccat is the world 4yh-largest PC vendor by 2015 unit
                  sales.[3] Asus appers in BusinessWeek's infoTech 100 and
                  Asia's Top IT Companies rankings, and it ranked first in the
                  IT.
                </p>
              </div>
            </li>
            <li>
              <div className="sponser_name">
                <img src="/assets/media/sponsers/5.jpg" alt="" />
              </div>
              <div className="sponser_data">
                {' '}
                <span className="sponser_bg">Head Sponsor</span>
                <p>
                  Roccat is the world 4yh-largest PC vendor by 2015 unit
                  sales.[3] Asus appers in BusinessWeek's infoTech 100 and
                  Asia's Top IT Companies rankings, and it ranked first in the
                  IT.
                </p>
              </div>
            </li>
            <li>
              <div className="sponser_name">
                <img src="/assets/media/sponsers/6.jpg" alt="" />
              </div>
              <div className="sponser_data">
                {' '}
                <span className="promotor_bg">Head Sponsor</span>
                <p>
                  Roccat is the world 4yh-largest PC vendor by 2015 unit
                  sales.[3] Asus appers in BusinessWeek's infoTech 100 and
                  Asia's Top IT Companies rankings, and it ranked first in the
                  IT.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                tristique purus vitae venenatis ultrices. Suspendisse tristique
                tortor ante,{' '}
              </p>
            </div>
          </div>
          <div className="row size-option">
            <div className="col-lg-12">
              <ul>
                <li>
                  {' '}
                  <a href="javascript:void(0)">Qty</a>
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
              <a href="javascript:void(0)" className="btn btn-primary">
                <i className="fa fa-shopping-basket"></i> Add To Bag{' '}
              </a>{' '}
              <a href="javascript:void(0)" className="btn btn-primary">
                <i className="fa fa-heart-o" aria-hidden="true"></i> Add To
                wishlist{' '}
              </a>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>

    <PoUp />
  </>
);

export default TeamProfileData;
