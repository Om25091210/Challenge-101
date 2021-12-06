

import Filters from '../common/Filters';

const Coaches = ({user}) => {

    return (

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
        
          <Filters ftype={"COACHES"}/>

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

)

}

export default Coaches;         