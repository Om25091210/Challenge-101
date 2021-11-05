


import PropTypes from 'prop-types';
import Head from 'next/head'

const Arenas = (props) => (

      <div className="tab hide" id="arenas">
       
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
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">
                 <span className="drop_name"> City </span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                  <input type="checkbox"/>
                  Banglore</a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                  <input type="checkbox"/>
                  Mumbai</a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                  <input type="checkbox"/>
                  Chennai</a></li>
                <li><a href="#" className="small" data-value="option4" tabIndex="-1">
                  <input type="checkbox"/>
                  New Delhi</a></li>
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

            <div className="button-group range_slider">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> 
                <span className="drop_name"> Price </span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">

                <li>Selected Rating Range <br/> <br/> 0-1000</li>
                <li><input type="range" min="0" max="1000" value="0" className="slider" id="myRange2"/></li>
                <li><span>Min 0</span><span>Max <b id="demo2"></b></span></li>
              </ul>
            </div>
            <div className="button-group range_slider">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> 
                <span className="drop_name"> Capacity </span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">

                <li>Selected Rating Range <br/> <br/> 0-200</li>
                <li><input type="range" min="0" max="200" value="0" className="slider" id="myRange3"/></li>
                <li><span>Min 0</span><span>Max <b id="demo3"></b></span></li>
              </ul>
            </div>

            <div className="button-group">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name">Sitting</span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                  <input type="checkbox"/>
                  Less than 500</a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                  <input type="checkbox"/>
                  500-2000</a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                  <input type="checkbox"/>
                  2000-5000</a></li>
                  <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                    <input type="checkbox"/>
                    5000 and above</a></li>
              </ul>
            </div>

            <div className="button-group">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> 
                <span className="drop_name">bandwidth</span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                  <input type="checkbox"/>
                  25-50MBPS</a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                  <input type="checkbox"/>
                  50-100MBPS</a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                  <input type="checkbox"/>
                  100 MBPS+</a></li>
       
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
                <span className="drop_name"> Offers</span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                  <input type="checkbox"/>
                  10% off</a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                  <input type="checkbox"/>
                  20-30% off</a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                  <input type="checkbox"/>
                  30-50% off</a></li>

                  <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                    <input type="checkbox"/>
                    Happy Hour</a></li>

                    

              </ul>
            </div>
           
         
            <div className="button-group"> <span className="drop_name">Bootcamp</span>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="Bootcamp"/>
                <label className="custom-control-label" for="Bootcamp"></label>
              </div>
            </div>
           
         


          </div>


          
          <div className="filters"> <a href="#" className="close1">X</a>
            <h3>Filters</h3>
            <div className="filter_list"> <span className="filter1"> Games: Call of Duty <a href="#" className="close2">X</a></span> <span className="filter1"> Category: LAN <a href="#" className="close2">X</a></span> <span className="filter1"> Type: Pro <a href="#" className="close2">X</a></span> <span className="filter1"> Rank: Legend <a href="#" className="close2">X</a></span> <span className="filter1"> Platform: Mobile <a href="#" className="close2">X</a></span> </div>
          </div>


          
        </div>
        </div>



        <div className="team_row arena_team_row">
         
          <div className="inner_team" >
            <div className="logo_box"> 
              <img src="/assets/media/discover/lxg.png" alt=""/>
              <h3>LXG  Esports Arena <b><i className="fa fa-map-marker" aria-hidden="true"></i> IndraNagar, Banglore</b></h3>
              <p></p>
             </div>
           
              <span className="remarks">
              <img src="/assets/media/discover/logos.png" alt=""/>
            
            </span>
            <div className="mores"> 
           
              <span><img src="/assets/media/discover/icons.png"  alt=""/></span> 

            </div>
            <a href="#" className="join">Book Seats</a> </div>
        </div>

      </div>




);

export default Arenas;               