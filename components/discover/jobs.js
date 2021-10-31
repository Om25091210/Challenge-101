



import PropTypes from 'prop-types';
import Head from 'next/head'

const Jobs = (props) => (

      <div className="tab hide" id="jobs">
        
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
        
        <div className="team_filter job_filter">
          <div className="drop_downs">
            
            <div className="button-group"> <span className="drop_name">Editor</span>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="Editor"/>
                <label className="custom-control-label" for="Editor"></label>
              </div>
            </div>
       

            <div className="button-group"> <span className="drop_name">Movie Maker</span>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="Movie"/>
                <label className="custom-control-label" for="Movie"></label>
              </div>
            </div>

            <div className="button-group"> <span className="drop_name">Web Designer</span>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="Web"/>
                <label className="custom-control-label" for="Web"></label>
              </div>
            </div>

            <div className="button-group"> <span className="drop_name">Nurtitionist</span>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="Nurtitionist"/>
                <label className="custom-control-label" for="Nurtitionist"></label>
              </div>
            </div>

            <div className="button-group"> <span className="drop_name">Staff</span>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="Staff"/>
                <label className="custom-control-label" for="Staff"></label>
              </div>
            </div>

            <div className="button-group"> <span className="drop_name">Shoutcaster</span>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="Shoutcaster"/>
                <label className="custom-control-label" for="Shoutcaster"></label>
              </div>
            </div>

            <div className="button-group"> <span className="drop_name">Manager</span>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="Manager"/>
                <label className="custom-control-label" for="Manager"></label>
              </div>
            </div>

            <div className="button-group"> <span className="drop_name">Psychologist</span>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="Psychologist"/>
                <label className="custom-control-label" for="Psychologist"></label>
              </div>
            </div>

            <div className="button-group"> <span className="drop_name">Cxo</span>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="Cxo"/>
                <label className="custom-control-label" for="Cxo"></label>
              </div>
            </div>

            <div className="button-group"> <span className="drop_name">Others</span>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="Others"/>
                <label className="custom-control-label" for="Others"></label>
              </div>
            </div>

          </div>


          
          <div className="filters"> <a href="#" className="close1">X</a>
            <h3>Filters</h3>
            <div className="filter_list"> <span className="filter1"> Games: Call of Duty <a href="#" className="close2">X</a></span> <span className="filter1"> Category: LAN <a href="#" className="close2">X</a></span> <span className="filter1"> Type: Pro <a href="#" className="close2">X</a></span> <span className="filter1"> Rank: Legend <a href="#" className="close2">X</a></span> <span className="filter1"> Platform: Mobile <a href="#" className="close2">X</a></span> </div>
          </div>


          
        </div>
        <div className="team_row arena_team_row">
         
          <div className="inner_team" >
            <div className="logo_box"> 
              <img src="/assets/media/discover/lxg.png" alt=""/>
              <h3>AFK GAMING PVT LTD</h3>
     
             </div>
           
      
            <div className="mores"> 
           
             
              <p><b>POSITION:</b> SENIOR DEVELOPER</p>
              <p><b>EXPERIENCE:</b> 10 YEARS</p>
              <p><b> LOCATION:</b> BANGALORE </p>

            </div>
            <a href="#" className="join">APPLY NOW</a> </div>
        </div>


      </div>



);

export default Jobs;         
