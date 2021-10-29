import PropTypes from 'prop-types';
import Head from 'next/head'
import GameDetails from './gamedetails';

const ProfileData = (props) => (


<div className="prfoile_tab_data">
	<div className="tab" id="feed"> 
        
    <div className="profile_left_post">
    
    <div className="post">
        <div className="heads">
          <div className="user"><img src="/assets/media/user.jpg" alt=""/></div>
          <h4>TheMadTitan</h4>
        </div>
        <div className="left_details"> <a href="#"> <i className="fa fa-heart" aria-hidden="true"></i> <span>1.7k</span> </a> <a href="#"> <i className="fa fa-eye" aria-hidden="true"></i> <span>239k</span> </a> <a href="#"> <i className="fa fa-commenting" aria-hidden="true"></i> <span>232k</span> </a> </div>
        <div className="right_details">
          <div className="post_data"></div>
          <div className="users_share_box">
            <div className="more_user"> <a href="#"><img src="/assets/media/1.jpg" alt="user"/><span className="online"></span></a> <a href="#"><img src="/assets/media/2.jpg" alt="user"/><span className="online"></span></a> <a href="#"><img src="/assets/media/3.jpg" alt="user"/><span className="offiline"></span></a> <a href="#" className="more">+3</a> <span className="others">Ashwin, George and 5 others have liked your post.</span> </div>
            <div className="shere"> <a href="#"> <i className="fa fa-heart" aria-hidden="true"></i> <span>Like</span> </a> <a href="#"> <i className="fa fa-share-alt" aria-hidden="true"></i> <span>Share</span> </a>
              <div className="three_dots"><a href="#"> <i className="fa fa-ellipsis-v" aria-hidden="true"></i></a>
                <div className="three_dots_dropdown">
                  <ul>
                    <li><a href="#">Edit</a></li>
                    <li><a href="#">Share to</a></li>
                    <li><a href="#">Copy Link</a></li>
                    <li><a href="#">Delet</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          
          <div className="add_comment_box">
            <div className="add_comments">
              <div className="user"><img src="/assets/media/user.jpg" alt=""/></div>
              <textarea placeholder="Add a comment"></textarea>
              <a href="#" className="gif">GIF</a> <a href="#" className="smile"><img src="/assets/media/smile.png" alt=""/></a> </div>
            <button><img src="/assets/media/send.png" alt=""/></button>
          </div>
          
          
          
          <div className="post_comments">
            <div className="pop_comment">Popular Comments</div>
            <div className="comments_point">
              <div className="fire"><img src="/assets/media/fire.png" alt=""/> <span>45</span></div>
              <div className="user"><img src="/assets/media/user.jpg" alt=""/></div>
              <h3>TheMadTitan</h3>
              <a href="#" className="create">Creator</a> <span className="days">2 days ago</span> <a href="#" className="pinned">Pinned by Creator</a> </div>
            <p>Thank you everyone for all of your support.</p>
            <div className="loadmore"><a href="#">Load comments <i className="fa fa-angle-down"
                                      aria-hidden="true"></i></a></div>
          </div>
          
          
        </div>
      </div>
      
      
      <div className="post">
        <div className="heads">
          <div className="user"><img src="/assets/media/user.jpg" alt=""/></div>
          <h4>TheMadTitan</h4>
        </div>
        <div className="left_details"> <a href="#"> <i className="fa fa-heart" aria-hidden="true"></i> <span>1.7k</span> </a> <a href="#"> <i className="fa fa-eye" aria-hidden="true"></i> <span>239k</span> </a> <a href="#"> <i className="fa fa-commenting" aria-hidden="true"></i> <span>232k</span> </a> </div>
        <div className="right_details">
          <div className="post_data"></div>
          <div className="users_share_box">
            <div className="more_user"> <a href="#"><img src="/assets/media/1.jpg" alt="user"/><span className="online"></span></a> <a href="#"><img src="/assets/media/2.jpg" alt="user"/><span className="online"></span></a> <a href="#"><img src="/assets/media/3.jpg" alt="user"/><span className="offiline"></span></a> <a href="#" className="more">+3</a> <span className="others">Ashwin, George and 5 others have liked your post.</span> </div>
            <div className="shere"> <a href="#"> <i className="fa fa-heart" aria-hidden="true"></i> <span>Like</span> </a> <a href="#"> <i className="fa fa-share-alt" aria-hidden="true"></i> <span>Share</span> </a>
              <div className="three_dots"><a href="#"> <i className="fa fa-ellipsis-v" aria-hidden="true"></i></a>
                <div className="three_dots_dropdown">
                  <ul>
                    <li><a href="#">Edit</a></li>
                    <li><a href="#">Share to</a></li>
                    <li><a href="#">Copy Link</a></li>
                    <li><a href="#">Delet</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          
          <div className="add_comment_box">
            <div className="add_comments">
              <div className="user"><img src="/assets/media/user.jpg" alt=""/></div>
              <textarea placeholder="Add a comment"></textarea>
              <a href="#" className="gif">GIF</a> <a href="#" className="smile"><img src="/assets/media/smile.png" alt=""/></a> </div>
            <button><img src="/assets/media/send.png" alt=""/></button>
          </div>
          
          
        </div>
      </div>

    </div>

    <div className="profile_match_details">
        
        <div className="all_stats">
          
            <ul>
           
              <li>
                <img src="/assets/media/profile/fire1.png" alt=""/>
                <div className="two_value">
                 <span className="num">108</span>
                 <span className="names">MATCHES PLAYED</span>

                </div>
              
              
              </li>
              <li><img src="/assets/media/profile/won.png" alt=""/>
              
                <div className="two_value">
                  <span className="num">71</span>
                  <span className="names">MATCHES WON</span>
 
                 </div>
              
              </li>
              <li><img src="/assets/media/profile/cup.png" alt=""/>
              
                <div className="two_value">
                  <span className="num">12</span>
                  <span className="names">TROPHIES</span>
 
                 </div>
              
              </li>
              <li><img src="/assets/media/profile/money.png" alt=""/>
                <div className="two_value">
                  <span className="num">$40K</span>
                  <span className="names">EARNINGS</span>
 
                 </div>
              
              </li>
              <li><img src="/assets/media/profile/streak.png" alt=""/>
                <div className="two_value">
                  <span className="num">26</span>
                  <span className="names">WINNING STREAK</span>
 
                 </div>
              </li>
              <li><div className="two_value"><a href="#" className="names">All Stat</a></div> <i className="fa fa-long-arrow-right" aria-hidden="true"></i></li>
      


            </ul>


        </div>



        <GameDetails />

    


    </div>


    
    </div>
	<div className="tab hide" id="statistics"> 222222222 </div>
	<div className="tab hide" id="achievement"> 33333 </div>
	<div className="tab hide" id="matches"> 44444 </div>
</div>
    
    
    
  

    );

export default ProfileData;