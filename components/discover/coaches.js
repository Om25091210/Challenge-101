


import PropTypes from 'prop-types';
import Head from 'next/head'

const Coaches = (props) => (

      <div className="tab hide" id="coaches">
       

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
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name"> TYPE </span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                  <input type="checkbox"/>
                  1-on-1 Training</a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                  <input type="checkbox"/>
                  Skills assessment</a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                  <input type="checkbox"/>
                  Team Session</a></li>
                <li><a href="#" className="small" data-value="option4" tabIndex="-1">
                  <input type="checkbox"/>
                  Video Review</a></li>
              </ul>
            </div>

            <div className="button-group range_slider">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> 
                <span className="drop_name"> EXPERIENCE </span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">

                <li>Selected Rating Range <br/> <br/> 0-20</li>
                <li><input type="range" min="0" max="20" value="0" className="slider" id="myRange"/></li>
                <li><span>Min 0</span><span>Max <b id="demo"></b></span></li>
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
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> 
                <span className="drop_name"> Ratings</span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li>Rating</li>
                <li>
                  <a href="#" className="small"><i className="fa fa-star" aria-hidden="true"></i></a>
                  <a href="#" className="small"><i className="fa fa-star" aria-hidden="true"></i></a>
                  <a href="#" className="small"><i className="fa fa-star" aria-hidden="true"></i></a>
                  <a href="#" className="small"><i className="fa fa-star" aria-hidden="true"></i></a>
                  <a href="#" className="small"><i className="fa fa-star" aria-hidden="true"></i></a>
                
                </li>
                
              </ul>
            </div>
            <div className="button-group">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> 
                <span className="drop_name"> session</span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                  <input type="checkbox"/>
                  Online</a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                  <input type="checkbox"/>
                  Offline</a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                  <input type="checkbox"/>
                  Bootcamp</a></li>
              </ul>
            </div>
           
         
            <div className="button-group">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> 
                <span className="drop_name"> TIER</span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                  <input type="checkbox"/>
                  Beginner</a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                  <input type="checkbox"/>
                  Intermediate</a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                  <input type="checkbox"/>
                  Expert</a></li>

                  <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                    <input type="checkbox"/>
                    Pro</a></li>  

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
            <span className="logo"><img src="/assets/media/discover/apex.png" alt=""/>  <img src="/assets/media/discover/icon2.png" alt=""/></span> 
            <span className="remarks">
            <h4>EXPERIENCE: <b>10Year</b></h4>
            
            </span>
            <div className="mores"> 
              <span>
                <i className="fa fa-star" aria-hidden="true"></i> 
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star-half-o" aria-hidden="true"></i>
              </span>
              <span><img src="/assets/media/discover/desk.png"  alt=""/></span> 
      
              <span><img src="/assets/media/discover/translator.png"  alt=""/> <b>EN, HI</b></span> 
            </div>
            <a href="#" className="join">REQUEST TO JOIN</a> </div>
        </div>
        <div className="team_row">
          <div className="stars"><i className="fa fa-star" aria-hidden="true"></i></div>
          <div className="inner_team" >
            <div className="logo_box"> <img src="/assets/media/discover/team1.png" alt=""/>
              <h3>Kingsmen</h3>
              <img src="/assets/media/discover/country.png" alt=""/> </div>
            <span className="logo"><img src="/assets/media/discover/apex.png" alt=""/> <img src="/assets/media/discover/icon2.png" alt=""/></span> <span className="remarks">
            <h4>EXPERIENCE: <b>10Year</b> </h4>
            
            </span>
            <div className="mores"> 
              <span>
                <i className="fa fa-star" aria-hidden="true"></i> 
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star-half-o" aria-hidden="true"></i>
              </span>
              <span><img src="/assets/media/discover/desk.png"  alt=""/></span> 
              <span><img src="/assets/media/discover/translator.png"  alt=""/> <b>EN, HI</b></span> 
            </div>
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
              <h4>EXPERIENCE: <b>10Year</b></h4>
            
              </span>
              <div className="mores"> 
                <span>
                  <i className="fa fa-star" aria-hidden="true"></i> 
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star-half-o" aria-hidden="true"></i>
                </span>
                <span><img src="/assets/media/discover/desk.png"  alt=""/></span>  
                <span><img src="/assets/media/discover/translator.png"  alt=""/> <b>EN, HI</b></span> 
              </div>
              <a href="#" className="join">REQUEST TO JOIN</a> </div>
          </div>
          <h2>Coaches Overview</h2>
          <div className="team_overview coach_overview"> 
            
            
            <div className="over_prof">
              <div className="pics"> </div>
              <h3>Davikinger90</h3>
            </div>
            
            
            <div className="ranking">
              <h4>Teams Coached</h4>
              <div className="past"><img src="/assets/media/discover/icon1.png" alt=""/> <b>The Lone Wolves</b> </div>
              <h4>Players Coached</h4>
              <p>554</p>
              <h4>Tier Level:</h4>
              <p>Intermediate-PRO</p>
            </div>
            <div className="match">
              <h4>FEATURED REVIEW</h4>
              <p>"Nico is very friendly. I was very nervous when we started 
                but it was all good. Just from 2 hours I started seeing League 
                as a different game. He gave me so many good tips and pointed 
                out my mistakes. Best coach you could find"</p>
    
              <p>  <span>
                <i className="fa fa-star" aria-hidden="true"></i> 
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star-half-o" aria-hidden="true"></i>
              </span>- JAYSON “ZEUS” MAMOA</p>
    
            </div>

            <div className="match">
              
              <p>"Nico is very friendly. I was very nervous when we started 
                but it was all good. Just from 2 hours I started seeing League 
                as a different game. He gave me so many good tips and pointed 
                out my mistakes. Best coach you could find"</p>
    
              <p>  <span>
                <i className="fa fa-star" aria-hidden="true"></i> 
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star-half-o" aria-hidden="true"></i>
              </span>-  WALTER “TITAN” WHITE</p>
    
            </div>
            
          </div>
        </div>


      </div>



);

export default Coaches;         