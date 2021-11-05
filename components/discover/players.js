

import PropTypes from 'prop-types';
import Head from 'next/head'

const Players = (props) => (

      <div className="tab hide" id="players">
        <div className="white_bg">
        <div className="team_search" >
          <div className="searchbox">
            <h3>Search</h3>
            <input type="search" value="" placeholder="Search"/>
            <input type="submit" value=""/>
          </div>
          <div className="advance">
            <div className="views">
              <h3>ADVANCED FILTER </h3>
              EXCLUDE     “ALREADY VIEWED”
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                <label className="custom-control-label" for="customCheck1"></label>
              </div>
            </div>
            <h3>Favourite</h3>
            <div className="custom-control custom-switch">
              <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
              <label className="custom-control-label" for="customSwitch1"></label>
            </div>
          </div>
        </div>
        
        <div className="team_filter">
          <div className="drop_downs">
            <div className="button-group">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name">Roles</span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                  <input type="checkbox"/>
                  Sniper</a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                  <input type="checkbox"/>
                  AR</a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                  <input type="checkbox"/>
                  Shotgun</a></li>
                <li><a href="#" className="small" data-value="option4" tabIndex="-1">
                  <input type="checkbox"/>
                  Pistol</a></li>
                <li><a href="#" className="small" data-value="option5" tabIndex="-1">
                  <input type="checkbox"/>
                  Marksman Rifile</a></li>
                <li><a href="#" className="small" data-value="option6" tabIndex="-1">
                  <input type="checkbox"/>
                  SMGs</a></li>
              </ul>
            </div>
            <div className="button-group">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name"> REGIONS</span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1"> Assam
                  <input type="checkbox"/>
                  </a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1"> Arunachal Pradesh
                  <input type="checkbox"/>
                  </a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1"> Karnataka
                  <input type="checkbox"/>
                  </a></li>
                <li><a href="#" className="small" data-value="option4" tabIndex="-1"> Delhi
                  <input type="checkbox"/>
                  </a></li>
                <li><a href="#" className="small" data-value="option5" tabIndex="-1"> Maharasthra
                  <input type="checkbox"/>
                  </a></li>
              </ul>
            </div>
            <div className="button-group">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name"> TYPE </span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                  <input type="checkbox"/>
                  Casual</a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                  <input type="checkbox"/>
                  Semi-pro</a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                  <input type="checkbox"/>
                  Pro</a></li>
                <li><a href="#" className="small" data-value="option4" tabIndex="-1">
                  <input type="checkbox"/>
                  Local Lans</a></li>
              </ul>
            </div>
            <div className="button-group">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name"> PLATFORM</span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                  <input type="checkbox"/>
                  PC</a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                  <input type="checkbox"/>
                  Console</a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                  <input type="checkbox"/>
                  Mobile</a></li>
              </ul>
            </div>
            <div className="button-group">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name"> ELO</span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                  <input type="checkbox"/>
                  Less than 1500</a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                  <input type="checkbox"/>
                  1500-2500</a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                  <input type="checkbox"/>
                  Greater then 25000</a></li>
              </ul>
            </div>
            <div className="button-group">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name"> TIMING</span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                  <input type="checkbox"/>
                  TIMING</a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                  <input type="checkbox"/>
                  TIMING</a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                  <input type="checkbox"/>
                  TIMING</a></li>
              </ul>
            </div>
            <div className="button-group"> <span className="drop_name">Microphone</span>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="Microphone"/>
                <label className="custom-control-label" for="Microphone"></label>
              </div>
            </div>
            <div className="button-group"> <span className="drop_name">Verified</span>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="Verified"/>
                <label className="custom-control-label" for="Verified"></label>
              </div>
            </div>
            <div className="button-group">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name">Language</span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                  <input type="checkbox"/>
                  English</a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                  <input type="checkbox"/>
                  Hindi</a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                  <input type="checkbox"/>
                  Tamil</a></li>
                <li><a href="#" className="small" data-value="option4" tabIndex="-1">
                  <input type="checkbox"/>
                  Bengali</a></li>
              </ul>
            </div>
            <div className="button-group">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name">Date</span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                  <input type="checkbox"/>
                  Most Recent</a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                  <input type="checkbox"/>
                  This Month</a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                  <input type="checkbox"/>
                  All</a></li>
              </ul>
            </div>
            <div className="button-group">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name">Gender</span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                  <input type="checkbox"/>
                  Male</a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                  <input type="checkbox"/>
                  Female</a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                  <input type="checkbox"/>
                  Others</a></li>
              </ul>
            </div>
            <div className="button-group">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name">Paid</span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                  <input type="checkbox"/>
                  Unpaid</a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                  <input type="checkbox"/>
                  Paid</a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                  <input type="checkbox"/>
                  Prize money sharing</a></li>
              </ul>
            </div>
          </div>
          <div className="filters"> <a href="#" className="close1">X</a>
            <h3>Filters</h3>
            <div className="filter_list"> <span className="filter1"> Games: Call of Duty <a href="#" className="close2">X</a></span> <span className="filter1"> Category: LAN <a href="#" className="close2">X</a></span> <span className="filter1"> Type: Pro <a href="#" className="close2">X</a></span> <span className="filter1"> Rank: Legend <a href="#" className="close2">X</a></span> <span className="filter1"> Platform: Mobile <a href="#" className="close2">X</a></span> </div>
          </div>
        </div>
        </div>
        
        
        <div className="team_row">
          <div className="stars"><i className="fa fa-star" aria-hidden="true"></i></div>
          <div className="inner_team" >
            <div className="logo_box"> <img src="/assets/media/discover/team1.png" alt=""/>
              <h3>Kingsmen</h3>
              <img src="/assets/media/discover/country.png" alt=""/> </div>
            <span className="logo"><img src="/assets/media/discover/apex.png" alt=""/></span> <span className="remarks">
            <h4>ROLE</h4>
            <p>Support Scout Sniper
              Driver Fragger Ingame leader</p>
            </span>
            <div className="mores"> <span><img src="/assets/media/discover/desk.png"  alt=""/></span> <span><img src="/assets/media/discover/mice.png"  alt=""/> <b>On</b></span> <span><img src="/assets/media/discover/translator.png"  alt=""/> <b>EN, HI</b></span> </div>
            <a href="#" className="join">REQUEST TO JOIN</a> </div>
        </div>
        <div className="team_row">
          <div className="stars"><i className="fa fa-star" aria-hidden="true"></i></div>
          <div className="inner_team" >
            <div className="logo_box"> <img src="/assets/media/discover/team1.png" alt=""/>
              <h3>Kingsmen</h3>
              <img src="/assets/media/discover/country.png" alt=""/> </div>
            <span className="logo"><img src="/assets/media/discover/apex.png" alt=""/></span> <span className="remarks">
            <h4>ROLE</h4>
            <p>Support Scout Sniper
              Driver Fragger Ingame leader</p>
            </span>
            <div className="mores"> <span><img src="/assets/media/discover/desk.png"  alt=""/></span> <span><img src="/assets/media/discover/mice.png"  alt=""/> <b>On</b></span> <span><img src="/assets/media/discover/translator.png"  alt=""/> <b>EN, HI</b></span> </div>
            <a href="#" className="join">REQUEST TO JOIN</a> </div>
        </div>
        <div className="overview_box">
          <div className="team_row">
            <div className="stars disable"><i className="fa fa-star" aria-hidden="true"></i></div>
            <div className="inner_team" >
              <div className="logo_box"> <img src="/assets/media/discover/team1.png" alt=""/>
                <h3>Kingsmen</h3>
                <img src="/assets/media/discover/country.png" alt=""/> </div>
              <span className="logo"><img src="/assets/media/discover/apex.png" alt=""/></span> <span className="remarks">
              <h4>ROLE</h4>
              <p>Support Scout Sniper
                Driver Fragger Ingame leader</p>
              </span>
              <div className="mores"> <span><img src="/assets/media/discover/desk.png"  alt=""/></span> <span><img src="/assets/media/discover/mice.png"  alt=""/> <b>On</b></span> <span><img src="/assets/media/discover/translator.png"  alt=""/> <b>EN, HI</b></span> </div>
              <a href="#" className="join">REQUEST TO JOIN</a> </div>
          </div>
          <h2>Players Overview</h2>
          <div className="team_overview"> 
            
            
            <div className="over_prof">
              <div className="pics"> </div>
              <h3>Davikinger90</h3>
            </div>
            
            
            <div className="ranking">
              <h4>Past Team</h4>
              <div className="past"><img src="/assets/media/discover/icon1.png" alt=""/> <b>The Lone Wolves</b> <img src="/assets/media/discover/country.png" alt=""/> </div>
              <h4>MMR Rating</h4>
              <p>4790</p>
              <h4>Experience:</h4>
              <p>Local Lans, Competitive</p>
            </div>
            <div className="match">
              <h4>Matches Played</h4>
              <p>156 Games</p>
              <h4>Matches Won</h4>
              <p>131 Victories</p>
              <h4>Trophies</h4>
              <p>78</p>
            </div>
            <div className="percentage"> <img src="/assets/media/discover/chart.png" style={{width : '400px'}} alt=""/> </div>
          </div>
        </div>
      </div>


);

export default Players;        

