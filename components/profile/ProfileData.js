import GameDetails from './gamedetails';
import { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import CustomPost from '../dashboard/CustomPost';
import LikePost from '../postLikes/LikePost';
import CommentForm from '../comments/CommentForm';
import ProdPoup from '../profile/prodPoup';
import Moment from 'moment';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import Photos from './Photos';
import Videos from './Videos';
import ProductList from '@components/common/ProductList';
import ProfileMatches from './ProfileMatches';


const ProfileData = ({ user, Userdata, player, products }) => {
  const [profile, setProfile] = useState(Userdata.profile);

  useEffect(() => {}, [profile]);
  useEffect(() => {}, [Userdata]);

  useEffect(() => {}, []);

  return (
    <>
      <div className="prfoile_tab_data">
        <div className="tab" id="feed">
          <div className="profile_left_post">
            <div className="">
              {Userdata.posts.length !== 0 &&
                Userdata.posts.map((post, index) => (
                  <div className="post">
                    <div key={index}>
                      <div className="heads" key={index}>
                        <div className="user">
                          <img src={post.user.profilePicUrl} alt="" />
                        </div>
                        <div className="user_name_disc">
                          <h4>{post.user.username}</h4>
                          <p>{post.description}</p>
                        </div>

                        <div className="date">
                          {post.createdAt === post.updatedAt ? (
                            <p>
                              {' '}
                              {Moment(post.createdAt).format(
                                'MMMM, DD, YYYY hh:mm A'
                              )}{' '}
                            </p>
                          ) : (
                            <p>
                              {' '}
                              {Moment(post.updatedAt).format(
                                'MMMM, DD, YYYY hh:mm A'
                              )}{' '}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="left_details">
                        {' '}
                        <a href="#">
                          {' '}
                          <i
                            className="fa fa-heart"
                            aria-hidden="true"
                          ></i>{' '}
                          <span>{post.likes.length}</span>{' '}
                        </a>{' '}
                        <a href="#">
                          {' '}
                          <i className="fa fa-eye" aria-hidden="true"></i>{' '}
                          <span>{post.views}</span>{' '}
                        </a>{' '}
                        <a href="#">
                          {' '}
                          <i
                            className="fa fa-commenting"
                            aria-hidden="true"
                          ></i>{' '}
                          <span>0</span>{' '}
                        </a>{' '}
                      </div>
                      <div className="right_details">
                        <div className="post_data">
                          <img src={post.images} alt="" />
                        </div>
                        <div className="users_share_box">
                          <div className="more_user">
                            {' '}
                            <a href="#">
                              <img src="/assets/media/dash/1.jpg" alt="user" />
                              <span className="online"></span>
                            </a>{' '}
                            <a href="#">
                              <img src="/assets/media/dash/2.jpg" alt="user" />
                              <span className="online"></span>
                            </a>{' '}
                            <a href="#">
                              <img src="/assets/media/dash/3.jpg" alt="user" />
                              <span className="offiline"></span>
                            </a>{' '}
                            <a href="#" className="more">
                              +3
                            </a>{' '}
                            <span className="others">
                              Ashwin, George and 5 others have liked your post.
                            </span>{' '}
                          </div>
                          <div className="shere">
                            {' '}
                            <LikePost postId={post._id} />{' '}
                            <a href="#">
                              {' '}
                              <i
                                className="fa fa-share-alt"
                                aria-hidden="true"
                              ></i>{' '}
                              <span>Share</span>{' '}
                            </a>
                            <div className="three_dots">
                              <a>
                                {' '}
                                <i
                                  className="fa fa-ellipsis-v"
                                  aria-hidden="true"
                                ></i>
                              </a>
                              <CustomPost post={post} />
                            </div>
                          </div>
                        </div>

                        <CommentForm post={post} user={user} />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="profile_match_details">
            <div className="all_stats">
              <ul>
                <li>
                  <img src="/assets/media/profile/fire1.png" alt="" />
                  <div className="two_value">
                    <span className="num">108</span>
                    <span className="names">MATCHES PLAYED</span>
                  </div>
                </li>
                <li>
                  <img src="/assets/media/profile/won.png" alt="" />

                  <div className="two_value">
                    <span className="num">71</span>
                    <span className="names">MATCHES WON</span>
                  </div>
                </li>
                <li>
                  <img src="/assets/media/profile/cup.png" alt="" />

                  <div className="two_value">
                    <span className="num">12</span>
                    <span className="names">TROPHIES</span>
                  </div>
                </li>
                <li>
                  <img src="/assets/media/profile/money.png" alt="" />
                  <div className="two_value">
                    <span className="num">$40K</span>
                    <span className="names">EARNINGS</span>
                  </div>
                </li>
                <li>
                  <img src="/assets/media/profile/streak.png" alt="" />
                  <div className="two_value">
                    <span className="num">26</span>
                    <span className="names">WINNING STREAK</span>
                  </div>
                </li>
                <li>
                  <div className="two_value">
                    <a href="#" className="names">
                      All Stat
                    </a>
                  </div>{' '}
                  <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                </li>
              </ul>
            </div>

            <GameDetails />
          </div>
        </div>

        <div className="tab hide" id="statistics">
          {' '}
          222222222{' '}
          {player ? (
            <pre>{JSON.stringify(player, null, 4)}</pre>
          ) : (
            <>Loading...</>
          )}
        </div>
        <div className="tab hide" id="achievement">
          {' '}
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
          </div>{' '}
        </div>

        <ProfileMatches user={user} Userdata={Userdata} />

        <ProductList user={user} productList={products}/>


        <div className="tab hide" id="steams">
          {' '}
          steams steams steams steams{' '}
        </div>
        <div className="tab hide" id="photos">
          <Photos Userdata={Userdata} />
        </div>
        <div className="tab hide" id="video">
          <Videos Userdata={Userdata} />
        </div>
        <div className="tab hide" id="sponsors">
          <div className="sponsers_box">
            <ul>
              {Userdata.sponsors.length === 0 ? (
                <div>No Sponsors</div>
              ) : (
                Userdata.sponsors.map((spons, index) => {
                  return (
                    <li key={index}>
                      <div className="sponser_name">
                        <img src={spons.logoUrl} alt="" />
                      </div>
                      <div className="sponser_data">
                        {' '}
                        <span className="head_spons_bg">{spons.name}</span>
                        <p>{spons.description}</p>
                      </div>
                    </li>
                  );
                })
              )}
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam tristique purus vitae venenatis ultrices. Suspendisse
                  tristique tortor ante,{' '}
                </p>
              </div>
            </div>
            <div className="row size-option">
              <div className="col-lg-12">
                <ul>
                  <li>
                    {' '}
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
                {' '}
                <a href="#!" className="btn btn-primary">
                  <i className="fa fa-shopping-basket"></i> Add To Bag{' '}
                </a>{' '}
                <a href="#!" className="btn btn-primary">
                  <i className="fa fa-heart-o" aria-hidden="true"></i> Add To
                  wishlist{' '}
                </a>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProdPoup />
    </>
  );
};
export default ProfileData;
