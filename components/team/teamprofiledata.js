
import PoUp from './Poup';

const TeamProfileData = (props) => (

<>
<div className="prfoile_tab_data white_bg">
  <div className="tab" id="overview"> 111111111</div>
  <div className="tab hide" id="squads">
    <div className="squads_box">
      <div className="selections">
        <div className="button-group"> <span className="drop_name">All</span>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="All" />
            <label className="custom-control-label" for="All"></label>
          </div>
        </div>
        <div className="button-group"> <span className="drop_name">Fortnite</span>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="Fortnite" />
            <label className="custom-control-label" for="Fortnite"></label>
          </div>
        </div>
        <div className="button-group"> <span className="drop_name">Call of Duty WW2</span>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="Call" />
            <label className="custom-control-label" for="Call"></label>
          </div>
        </div>
        <div className="button-group"> <span className="drop_name">Fifa 2018</span>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="Fifa" />
            <label className="custom-control-label" for="Fifa"></label>
          </div>
        </div>
      </div>
      <ul>
        <li className="squads">
          <div className="squad_img"> <img src="/assets/media/squads/bg.jpg" className="squad_bg" alt="" />
            <h2>DOTA 2</h2>
            <div className="plyars"> <a href="#"><img src="/assets/media/squads/player1.jpg" alt="" /></a> <a href="#"><img src="/assets/media/squads/player2.jpg" alt="" /></a> <a href="#"><img src="/assets/media/squads/player3.jpg" alt="" /></a> <a href="#"><img src="/assets/media/squads/player4.jpg" alt="" /></a> </div>
          </div>
          <div className="squad_btn"> <span className="cuntry_name">INDIA</span> <a href="#">VIEW TEAM <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a> </div>
        </li>
        <li className="squads">
          <div className="squad_img"> <img src="/assets/media/squads/bg.jpg" className="squad_bg" alt="" />
            <h2>DOTA 2</h2>
            <div className="plyars"> <a href="#"><img src="/assets/media/squads/player1.jpg" alt="" /></a> <a href="#"><img src="/assets/media/squads/player2.jpg" alt="" /></a> <a href="#"><img src="/assets/media/squads/player3.jpg" alt="" /></a> <a href="#"><img src="/assets/media/squads/player4.jpg" alt="" /></a> </div>
          </div>
          <div className="squad_btn"> <span className="cuntry_name">INDIA</span> <a href="#">VIEW TEAM <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a> </div>
        </li>
        <li className="squads">
          <div className="squad_img"> <img src="/assets/media/squads/bg.jpg" className="squad_bg" alt="" />
            <h2>DOTA 2</h2>
            <div className="plyars"> <a href="#"><img src="/assets/media/squads/player1.jpg" alt="" /></a> <a href="#"><img src="/assets/media/squads/player2.jpg" alt="" /></a> <a href="#"><img src="/assets/media/squads/player3.jpg" alt="" /></a> <a href="#"><img src="/assets/media/squads/player4.jpg" alt="" /></a> </div>
          </div>
          <div className="squad_btn"> <span className="cuntry_name">INDIA</span> <a href="#">VIEW TEAM <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a> </div>
        </li>
        <li className="squads">
          <div className="squad_img"> <img src="/assets/media/squads/bg.jpg" className="squad_bg" alt="" />
            <h2>DOTA 2</h2>
            <div className="plyars"> <a href="#"><img src="/assets/media/squads/player1.jpg" alt="" /></a> <a href="#"><img src="/assets/media/squads/player2.jpg" alt="" /></a> <a href="#"><img src="/assets/media/squads/player3.jpg" alt="" /></a> <a href="#"><img src="/assets/media/squads/player4.jpg" alt="" /></a> </div>
          </div>
          <div className="squad_btn"> <span className="cuntry_name">INDIA</span> <a href="#">VIEW TEAM <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a> </div>
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
            <div className="img"><i className="fa fa-trophy" aria-hidden="true"></i></div>
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
  <div className="tab hide" id="matches"> 44444 444444 </div>
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
          <div className="pro_img"> <a href="#prod1" className="quickpoup"><img src="/assets/media/team/tshirt1.jpg" alt="" /></a> <span className="size_option">36d 12h 13m 18s</span> </div>
          <div className="pro_bottom">
            <div className="name_dots">
              <h4>ALCHEMISTS MEN-SHIRT</h4>
              <a href="#"><i className="fa fa-ellipsis-h" aria-hidden="true"></i></a> </div>
            <div className="stars"> <a href="#"><i className="fa fa-star" aria-hidden="true"></i></a> <a href="#"><i className="fa fa-star" aria-hidden="true"></i></a> <a href="#"><i className="fa fa-star" aria-hidden="true"></i></a> <a href="#"><i className="fa fa-star" aria-hidden="true"></i></a> <a href="#"><i className="fa fa-star" aria-hidden="true"></i></a>
              <div className="price"> $19.00</div>
            </div>
          </div>
          <div className="likes"><a href="#"><i className="fa fa-heart" aria-hidden="true"></i> 80 </a></div>
        </li>
        <li>
          <div className="pro_img"> <img src="/assets/media/team/tshirt2.jpg" alt="" /> <span className="size_option">36d 12h 13m 18s</span> </div>
          <div className="pro_bottom">
            <div className="name_dots">
              <h4>ALCHEMISTS MEN-SHIRT</h4>
              <a href="#"><i className="fa fa-ellipsis-h" aria-hidden="true"></i></a> </div>
            <div className="stars"> <a href="#"><i className="fa fa-star" aria-hidden="true"></i></a> <a href="#"><i className="fa fa-star" aria-hidden="true"></i></a> <a href="#"><i className="fa fa-star" aria-hidden="true"></i></a> <a href="#"><i className="fa fa-star" aria-hidden="true"></i></a> <a href="#"><i className="fa fa-star" aria-hidden="true"></i></a>
              <div className="price"> $19.00</div>
            </div>
          </div>
          <div className="likes"><a href="#"><i className="fa fa-heart" aria-hidden="true"></i> 80 </a></div>
        </li>
        <li>
          <div className="pro_img"> <img src="/assets/media/team/tshirt1.jpg" alt="" /> <span className="size_option">36d 12h 13m 18s</span></div>
          <div className="pro_bottom">
            <div className="name_dots">
              <h4>ALCHEMISTS MEN-SHIRT</h4>
              <a href="#"><i className="fa fa-ellipsis-h" aria-hidden="true"></i></a> </div>
            <div className="stars"> <a href="#"><i className="fa fa-star" aria-hidden="true"></i></a> <a href="#"><i className="fa fa-star" aria-hidden="true"></i></a> <a href="#"><i className="fa fa-star" aria-hidden="true"></i></a> <a href="#"><i className="fa fa-star" aria-hidden="true"></i></a> <a href="#"><i className="fa fa-star" aria-hidden="true"></i></a>
              <div className="price"> $19.00</div>
            </div>
          </div>
          <div className="likes"><a href="#"><i className="fa fa-heart" aria-hidden="true"></i> 80 </a></div>
        </li>
        <li>
          <div className="pro_img"> <img src="/assets/media/team/cup.jpg" alt="" /> <span className="size_option">36d 12h 13m 18s</span></div>
          <div className="pro_bottom">
            <div className="name_dots">
              <h4>ALCHEMISTS MEN-SHIRT</h4>
              <a href="#"><i className="fa fa-ellipsis-h" aria-hidden="true"></i></a> </div>
            <div className="stars"> <a href="#"><i className="fa fa-star" aria-hidden="true"></i></a> <a href="#"><i className="fa fa-star" aria-hidden="true"></i></a> <a href="#"><i className="fa fa-star" aria-hidden="true"></i></a> <a href="#"><i className="fa fa-star" aria-hidden="true"></i></a> <a href="#"><i className="fa fa-star" aria-hidden="true"></i></a>
              <div className="price"> $19.00</div>
            </div>
          </div>
          <div className="likes"><a href="#"><i className="fa fa-heart" aria-hidden="true"></i> 80 </a></div>
        </li>
      </ul>
    </div>
  </div>
</div>

 {/* ------------- start poup data ------------- */}


 <PoUp />



 </>

    );

export default TeamProfileData;