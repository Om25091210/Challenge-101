import PropTypes from 'prop-types';
import Head from 'next/head'
import GameDetails from './gamedetails';
import { useEffect, useState } from "react";
import axios from "axios"
import baseURL from "../../utils/baseURL";
import CustomPost from '../dashboard/CustomPost';
import LikePost from '../postLikes/LikePost';
import CommentForm from '../comments/CommentForm';

const ProfileData = ({user}) => {
  const [profile, setProfile] = useState([]);
// console.log(user)

useEffect(() => {
  axios
    .get(`${baseURL}/api/profile/${user.username}`)
    .then((res) => {
      console.log(res.data)
      setProfile(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);


console.log(profile)

return(
  <>
  <div className="prfoile_tab_data">
	<div className="tab" id="feed"> 
        
    <div className="profile_left_post">
    
    <div className="post">
          {profile.map((pro) => (<div>
            
            {profile[0].posts.map((post) => (
              <div key={post._id}>
          
              <div className="heads">
                <div className="user"><img src={post.user.profilePicUrl} alt=""/></div>
                <h4>{post.description}</h4>
              </div>
              <div className="left_details"> <a href="#"> <i className="fa fa-heart" aria-hidden="true"></i> <span>{post.likes.length}</span> </a> <a href="#"> <i className="fa fa-eye" aria-hidden="true"></i> <span>{post.views}</span> </a> <a href="#"> <i className="fa fa-commenting" aria-hidden="true"></i> <span>0</span> </a> </div>
              <div className="right_details">
                <div className="post_data"><img src={post.images} alt="" /></div>
                <div className="users_share_box">
                  <div className="more_user"> <a href="#"><img src="/assets/media/dash/1.jpg" alt="user"/><span className="online"></span></a> <a href="#"><img src="/assets/media/dash/2.jpg" alt="user"/><span className="online"></span></a> <a href="#"><img src="/assets/media/dash/3.jpg" alt="user"/><span className="offiline"></span></a> <a href="#" className="more">+3</a> <span className="others">Ashwin, George and 5 others have liked your post.</span> </div>
                  <div className="shere"> <LikePost postId={post._id} /> <a href="#"> <i className="fa fa-share-alt" aria-hidden="true"></i> <span>Share</span> </a>
                    <div className="three_dots"><a href="#"> <i className="fa fa-ellipsis-v" aria-hidden="true"></i></a>
                      <CustomPost post={post} />
                    </div>
                  </div>
                </div>
        
                <CommentForm postId={post} /> 
        
              </div>
              </div>
            ))}
          </div>))}
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
	<div className="tab hide" id="matches"> 44444 44444444444 </div>
  <div className="tab hide" id="merchandise">

  <div class="products">
        <ul>
          <li>
            <div class="pro_img"> 
              <a href="#prod1" className="quickpoup"><img src="/assets/media/team/tshirt1.jpg" alt="" /></a> 

              <span class="size_option">36d 12h 13m 18s</span>
            
            </div>
            <div class="pro_bottom">
              <div class="name_dots">
                <h4>ALCHEMISTS MEN-SHIRT</h4>
                <a href="#"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a> </div>
               <div class="stars"> 
                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a> 
                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a> 
                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a> 
                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a> 
                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>
                <div class="price"> $19.00</div>
              </div>
            </div>
            <div class="likes"><a href="#"><i class="fa fa-heart" aria-hidden="true"></i> 80 </a></div>
          </li>

          <li>
            <div class="pro_img">  <a href="#"><img src="/assets/media/team/tshirt2.jpg" alt="" /> </a><span class="size_option">36d 12h 13m 18s</span> </div>
            <div class="pro_bottom">
              <div class="name_dots">
                <h4>ALCHEMISTS MEN-SHIRT</h4>
                <a href="#"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a> </div>
               <div class="stars"> 
                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a> 
                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a> 
                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a> 
                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a> 
                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>
                <div class="price"> $19.00</div>
              </div>
            </div>
            <div class="likes"><a href="#"><i class="fa fa-heart" aria-hidden="true"></i> 80 </a></div>
          </li>

          <li>
            <div class="pro_img">  <a href="#"><img src="/assets/media/team/tshirt1.jpg" alt="" /> </a> <span class="size_option">36d 12h 13m 18s</span></div>
            <div class="pro_bottom">
              <div class="name_dots">
                <h4>ALCHEMISTS MEN-SHIRT</h4>
                <a href="#"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a> </div>
               <div class="stars"> 
                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a> 
                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a> 
                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a> 
                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a> 
                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>
                <div class="price"> $19.00</div>
              </div>
            </div>
            <div class="likes"><a href="#"><i class="fa fa-heart" aria-hidden="true"></i> 80 </a></div>
          </li>


          <li>
            <div class="pro_img">  <a href="#"><img src="/assets/media/team/cup.jpg" alt="" /> </a> <span class="size_option">36d 12h 13m 18s</span></div>
            <div class="pro_bottom">
              <div class="name_dots">
                <h4>ALCHEMISTS MEN-SHIRT</h4>
                <a href="#"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a> </div>
               <div class="stars"> 
                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a> 
                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a> 
                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a> 
                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a> 
                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>
                <div class="price"> $19.00</div>
              </div>
            </div>
            <div class="likes"><a href="#"><i class="fa fa-heart" aria-hidden="true"></i> 80 </a></div>
          </li>

          


        </ul>
      </div>

  </div>

  </div>

  <div id="prod1" class="quick_view" style={{display:'none'}}>

  <div className="product_box">

    
            <div className="product-img-box">
            
            <div className="prod_big_thumb">	
            
            
            <div className="slider-for">
                
                    <div>
                        <div className="slide-box">
                           
                            <img  src="/assets/media/team/product1.jpg"  alt=""/>
                     
                        </div>
                    </div>
                    <div>
                        <div className="slide-box">
                           
                            <img   src="/assets/media/team/product1.jpg"  alt=""/>
                     
                        </div>
                    </div>
                    <div>
                        <div className="slide-box">
                           
                            <img   src="/assets/media/team/product1.jpg"  alt=""/>
                     
                        </div>
                    </div>
                    <div>
                        <div className="slide-box">
                           
                            <img   src="/assets/media/team/product1.jpg"  alt=""/>
                     
                        </div>
                    </div>
                </div>
            
            </div>
            
            </div>
            <div className="product-detail-box">
                <h1>Red Oceacon</h1>

                <div className="row">
                    <div className="col-lg-12">
                    
                        <div className="like_view">
                     <a href="#" className="art"><i className="fa fa-picture-o" aria-hidden="true"></i> Art</a>  
                     <a href="#" className="view"><i className="fa fa-eye" aria-hidden="true"></i> 250</a> 
                     <a href="#" className="like"><i className="fa fa-heart" aria-hidden="true"></i> 18</a>
                     </div>

                     <div className="review">
                      
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>

                        <span className="rev_txt">Based on <b>2 reviews</b></span>
 

                     </div>
                        
                    </div>
                </div>
               
           
                <div className="row">
                    <div className="col-lg-12">
                        <div className="price">
                            $48.00
                            <del style={{display: 'none'}}>£299.00</del>
                            <span className="discount" style={{display: 'none'}}>(10% Discount)</span>
                        </div>	
                        
                        <p className="brief">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique purus vitae venenatis ultrices. Suspendisse tristique  tortor ante,

                         </p>
               
                    </div>
                </div>
               
             
                
                <div className="row size-option">
                    <div className="col-lg-12">
                        <ul>
                            <li>
                                <a href="#!">Choose Size</a>
                                <div className="content size-chart mCustomScrollbar">
                                    <ul>
                                        <li>36 x 5 inches<span>Out of  Stock</span></li>
                                        <li className="selected">32 x 5 inches <span>Last 1 left</span></li>
                                        <li>36 x 4 inches</li>
                                        <li>26 x 1 inches</li>
                                        
                                    </ul>
                                </div>
                            </li>
                            <li>
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
                        <a href="#!" className="btn btn-primary"><i className="fa fa-shopping-basket"></i> Add To Bag </a>

                        <a href="#!" className="btn btn-primary"><i className="fa fa-heart-o" aria-hidden="true"></i> Add To wishlist </a>
                    </div>
                 
                </div>
               
              
            </div>
         
        
  

        </div>

    </div>

</>   
  
)


}
export default ProfileData;