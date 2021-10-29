import PropTypes from 'prop-types';
import Head from 'next/head'

const TeamProfileBox = (props) => (

  <div className="profile_box">
 <div className="profile_cover_photo">

    <img src="/assets/media/profile/cover_bg.jpg" alt="cover image"/>


 </div>

 <div className="profile_dp_box">

  <div className="profile_pic">

    <img src="/assets/media/profile/dp.jpg" alt=""/>

  </div>

  <div className="profile_details">

  <div className="top_details">  
<div className="name_box">
    <span className="game_name"> TheMadTitan </span>
    <span className="name">Founded May 2011</span>
    <span className="follower">2 M followers</span>


</div>
<div className="flag"><img src="/assets/media/profile/flag.png" alt="flag"/></div>
<div className="tick"><span className="active"><i className="fa fa-check" aria-hidden="true"></i></span></div>
<div className="button"><a href="#" className="btn">FOLLOW</a> <a href="#" className="btn">ASK TO JOIN</a></div>

  </div>


<div className="bottom_details team_details">



    <div className="badges">

        <h5>MAJOR TITLES</h5>
        <img src="/assets/media/team/titles1.png" alt=""/>
        <img src="/assets/media/team/titles2.png" alt=""/>
        <img src="/assets/media/team/titles3.png" alt=""/>
        
        
         </div>
        


    <div className="current_status">
        <h5>RANKING</h5>
<div className="current_team">
   <span className="ct"> <i className="fa fa-sort-asc" aria-hidden="true"></i> 58</span>
   <span className="were">country </span>
</div>
   <div className="game_role">
   <span className="ct"><i className="fa fa-sort-asc" aria-hidden="true"></i> 4219</span>
   <span className="were">WORLDWIDE</span>
</div>

</div>


   
 




</div>

 </div>



  </div>

  <div className="bio_box team_bio">
 
   
    <div className="left_bio">
   
    <div className="top_bio">    
    <h3>ABOUT THE TEAM</h3>     
    <div className="socail">
    <a href="#"><i className="fa fa-facebook-official" aria-hidden="true"></i></a>
    <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
    <a href="#"><i className="fa fa-facebook-official" aria-hidden="true"></i></a>
    <a href="#"><i className="fa fa-facebook-official" aria-hidden="true"></i></a>

</div>
    </div>

    <p>The Werewolves is a professional Esports gaming team, consisting 
        of players from across India competing in Esports Tournaments. </p>


        <div className="team_pos">

         <ul>

       <li><span className="position">MANAGER:</span>  <span className="pos_name"><span className="imgs"><img src="/assets/media/user.jpg" alt=""/></span>Alison “Eleven” James</span></li>

       <li><span className="position">Coach:</span>  <span className="pos_name"><span className="imgs"><img src="/assets/media/user.jpg" alt=""/></span>Alison “Eleven” James</span></li>


        </ul>


        </div>


    </div>


    <div className="right_team_bio">

        <div className="team_pos">

            <ul>
   
          <li><span className="position">arena:</span>  <span className="pos_name"><img src="/assets/media/team/game1.png" alt=""/> LXG Gamin</span></li>
   
          
   
           </ul>
   
   
           </div>

       <div className="sponser">
        <h5>SPONSORS</h5>
        
        <ul>        
        <li><img src="/assets/media/team/sponser1.png" alt=""/></li>
        <li><img src="/assets/media/team/sponser2.png" alt=""/></li>
            <li><img src="/assets/media/team/sponser3.png" alt=""/></li>
                <li> <img src="/assets/media/team/sponser4.png" alt=""/></li>
    </ul>

    </div>

    </div>


 </div>

  </div>


);

export default TeamProfileBox;