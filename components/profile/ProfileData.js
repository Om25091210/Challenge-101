import PropTypes from 'prop-types';
import Head from 'next/head';
import GameDetails from './gamedetails';
import { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import CustomPost from '../dashboard/CustomPost';
import LikePost from '../postLikes/LikePost';
import CommentForm from '../comments/CommentForm';
import ProdPoup from '../profile/prodPoup';
import Moment from 'moment';

const ProfileData = ({ user }) => {
  const [profile, setProfile] = useState(user);
  console.log(profile);

  return (
    <>
      <div className="prfoile_tab_data">
        <div className="tab" id="feed">
          <div className="profile_left_post">
            <div className="post">
              {profile.map((pro, idx) => (
                <div key={idx}>
                  {profile[0].posts.length !== 0 &&
                    profile[0].posts.map((post, index) => (
                      <div key={index}>
                        <div className="heads">
                          <div className="user">
                            <img src={post.user.profilePicUrl} alt="" />
                          </div>
                          <h4>{post.description}</h4>
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
                            <i
                              className="fa fa-eye"
                              aria-hidden="true"
                            ></i>{' '}
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
                                <img
                                  src="/assets/media/dash/1.jpg"
                                  alt="user"
                                />
                                <span className="online"></span>
                              </a>{' '}
                              <a href="#">
                                <img
                                  src="/assets/media/dash/2.jpg"
                                  alt="user"
                                />
                                <span className="online"></span>
                              </a>{' '}
                              <a href="#">
                                <img
                                  src="/assets/media/dash/3.jpg"
                                  alt="user"
                                />
                                <span className="offiline"></span>
                              </a>{' '}
                              <a href="#" className="more">
                                +3
                              </a>{' '}
                              <span className="others">
                                Ashwin, George and 5 others have liked your
                                post.
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
                                <a href="#">
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

                          <CommentForm postId={post} />
                        </div>
                      </div>
                    ))}
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
        <div className="tab hide" id="matches">
          {' '}
          <div className="next_matches">
            <div className="bdr_clr_green">THE WEREWOLVES [TWW]</div>
            <div className="stats_table">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Versus</th>
                    <th>Competition</th>
                    <th>Instance</th>
                    <th>Time</th>
                    <th>Score</th>
                    <th>Watch</th>
                    <th>Tickets</th>
                  </tr>
                </thead>
                <tbody>
                  {profile[0].matches.map((match, index) => {
                    return (
                      <>
                        <tr key={index}>
                          <td>
                            {Moment(match.startDate).format('DD-MM-YYYY')}
                          </td>
                          <td>
                            <span className="dp">
                              <img src="/assets/media/teams/team1.png" alt="" />
                            </span>{' '}
                            <span className="dp_name">
                              <b>{match.teams[1].teamName}</b>
                              {match.region}
                            </span>
                          </td>
                          <td>{match.name}</td>
                          <td>Semi-Finals</td>
                          <td>{Moment(match.startDate).format('h:m')}</td>
                          <td>3-2 Win</td>
                          <td>View Match</td>
                          <td>
                            <a href="#">Buy Match Tickets</a>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>{' '}
        </div>
        <div className="tab hide" id="merchandise">
          <div className="products">
            <ul>
              <li>
                <div className="pro_img">
                  <a href="#prod1" className="quickpoup">
                    <img src="/assets/media/team/tshirt1.jpg" alt="" />
                  </a>

                  <span className="size_option">36d 12h 13m 18s</span>
                </div>
                <div className="pro_bottom">
                  <div className="name_dots">
                    <h4>ALCHEMISTS MEN-SHIRT</h4>
                    <a href="#">
                      <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                    </a>{' '}
                  </div>
                  <div className="stars">
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>
                    <div className="price"> $19.00</div>
                  </div>
                </div>
                <div className="likes">
                  <a href="#">
                    <i className="fa fa-heart" aria-hidden="true"></i> 80{' '}
                  </a>
                </div>
              </li>

              <li>
                <div className="pro_img">
                  {' '}
                  <a href="#">
                    <img src="/assets/media/team/tshirt2.jpg" alt="" />{' '}
                  </a>
                  <span className="size_option">36d 12h 13m 18s</span>{' '}
                </div>
                <div className="pro_bottom">
                  <div className="name_dots">
                    <h4>ALCHEMISTS MEN-SHIRT</h4>
                    <a href="#">
                      <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                    </a>{' '}
                  </div>
                  <div className="stars">
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>
                    <div className="price"> $19.00</div>
                  </div>
                </div>
                <div className="likes">
                  <a href="#">
                    <i className="fa fa-heart" aria-hidden="true"></i> 80{' '}
                  </a>
                </div>
              </li>

              <li>
                <div className="pro_img">
                  {' '}
                  <a href="#">
                    <img src="/assets/media/team/tshirt1.jpg" alt="" />{' '}
                  </a>{' '}
                  <span className="size_option">36d 12h 13m 18s</span>
                </div>
                <div className="pro_bottom">
                  <div className="name_dots">
                    <h4>ALCHEMISTS MEN-SHIRT</h4>
                    <a href="#">
                      <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                    </a>{' '}
                  </div>
                  <div className="stars">
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>
                    <div className="price"> $19.00</div>
                  </div>
                </div>
                <div className="likes">
                  <a href="#">
                    <i className="fa fa-heart" aria-hidden="true"></i> 80{' '}
                  </a>
                </div>
              </li>

              <li>
                <div className="pro_img">
                  {' '}
                  <a href="#">
                    <img src="/assets/media/team/cup.jpg" alt="" />{' '}
                  </a>{' '}
                  <span className="size_option">36d 12h 13m 18s</span>
                </div>
                <div className="pro_bottom">
                  <div className="name_dots">
                    <h4>ALCHEMISTS MEN-SHIRT</h4>
                    <a href="#">
                      <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                    </a>{' '}
                  </div>
                  <div className="stars">
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>
                    <div className="price"> $19.00</div>
                  </div>
                </div>
                <div className="likes">
                  <a href="#">
                    <i className="fa fa-heart" aria-hidden="true"></i> 80{' '}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="tab hide" id="steams">
          {' '}
          steams steams steams steams{' '}
        </div>
        <div className="tab hide" id="photos">
          <div className="gallery_box">
            <div className="imagess_box">
              <div className="imagess">
                <ul>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/1.jpg"
                      data-fancybox-group="gallery"
                      title="Image1"
                    >
                      <img src="/assets/media/gallery/1.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/2.jpg"
                      data-fancybox-group="gallery"
                      title="Image2"
                    >
                      <img src="/assets/media/gallery/2.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery"
                      title="Image3"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery"
                      title="Image4"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery"
                      title="Image5"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/1.jpg"
                      data-fancybox-group="gallery"
                      title="Image6"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/2.jpg"
                      data-fancybox-group="gallery"
                      title="Image7"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery"
                      title="Image8"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                </ul>
                <span className="total_images">+10</span>{' '}
              </div>
              <div className="bottom_data">
                {' '}
                <span className="img_icon">
                  <i className="fa fa-picture-o" aria-hidden="true"></i>
                </span>
                <h2>
                  New Xenowatch Characters{' '}
                  <span className="update">Updated:March 12th, 2018</span>
                </h2>
              </div>
            </div>

            <div className="imagess_box">
              <div className="imagess">
                <ul>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/1.jpg"
                      data-fancybox-group="gallery"
                      title="Image1"
                    >
                      <img src="/assets/media/gallery/1.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/2.jpg"
                      data-fancybox-group="gallery"
                      title="Image2"
                    >
                      <img src="/assets/media/gallery/2.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery"
                      title="Image3"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery"
                      title="Image4"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery"
                      title="Image5"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/1.jpg"
                      data-fancybox-group="gallery"
                      title="Image6"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/2.jpg"
                      data-fancybox-group="gallery"
                      title="Image7"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery"
                      title="Image8"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                </ul>
                <span className="total_images">+10</span>{' '}
              </div>
              <div className="bottom_data">
                {' '}
                <span className="img_icon">
                  <i className="fa fa-picture-o" aria-hidden="true"></i>
                </span>
                <h2>
                  New Xenowatch Characters{' '}
                  <span className="update">Updated:March 12th, 2018</span>
                </h2>
              </div>
            </div>

            <div className="imagess_box">
              <div className="imagess">
                <ul>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/1.jpg"
                      data-fancybox-group="gallery2"
                      title="Image1"
                    >
                      <img src="/assets/media/gallery/1.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/2.jpg"
                      data-fancybox-group="gallery2"
                      title="Image2"
                    >
                      <img src="/assets/media/gallery/2.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery2"
                      title="Image3"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery2"
                      title="Image4"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery2"
                      title="Image5"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/1.jpg"
                      data-fancybox-group="gallery2"
                      title="Image6"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/2.jpg"
                      data-fancybox-group="gallery2"
                      title="Image7"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery2"
                      title="Image8"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                </ul>
                <span className="total_images">+10</span>{' '}
              </div>
              <div className="bottom_data">
                {' '}
                <span className="img_icon">
                  <i className="fa fa-picture-o" aria-hidden="true"></i>
                </span>
                <h2>
                  New Xenowatch Characters{' '}
                  <span className="update">Updated:March 12th, 2018</span>
                </h2>
              </div>
            </div>

            <div className="imagess_box">
              <div className="imagess">
                <ul>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/1.jpg"
                      data-fancybox-group="gallery3"
                      title="Image1"
                    >
                      <img src="/assets/media/gallery/1.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/2.jpg"
                      data-fancybox-group="gallery3"
                      title="Image2"
                    >
                      <img src="/assets/media/gallery/2.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery3"
                      title="Image3"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery3"
                      title="Image4"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery3"
                      title="Image5"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/1.jpg"
                      data-fancybox-group="gallery3"
                      title="Image6"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/2.jpg"
                      data-fancybox-group="gallery3"
                      title="Image7"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery3"
                      title="Image8"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                </ul>
                <span className="total_images">+10</span>{' '}
              </div>
              <div className="bottom_data">
                {' '}
                <span className="img_icon">
                  <i className="fa fa-picture-o" aria-hidden="true"></i>
                </span>
                <h2>
                  New Xenowatch Characters{' '}
                  <span className="update">Updated:March 12th, 2018</span>
                </h2>
              </div>
            </div>

            <div className="imagess_box">
              <div className="imagess">
                <ul>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/1.jpg"
                      data-fancybox-group="gallery4"
                      title="Image1"
                    >
                      <img src="/assets/media/gallery/1.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/2.jpg"
                      data-fancybox-group="gallery4"
                      title="Image2"
                    >
                      <img src="/assets/media/gallery/2.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery4"
                      title="Image3"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery4"
                      title="Image4"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery4"
                      title="Image5"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/1.jpg"
                      data-fancybox-group="gallery4"
                      title="Image6"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/2.jpg"
                      data-fancybox-group="gallery4"
                      title="Image7"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery4"
                      title="Image8"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                </ul>
                <span className="total_images">+10</span>{' '}
              </div>
              <div className="bottom_data">
                {' '}
                <span className="img_icon">
                  <i className="fa fa-picture-o" aria-hidden="true"></i>
                </span>
                <h2>
                  New Xenowatch Characters{' '}
                  <span className="update">Updated:March 12th, 2018</span>
                </h2>
              </div>
            </div>

            <div className="imagess_box">
              <div className="imagess">
                <ul>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/1.jpg"
                      data-fancybox-group="gallery5"
                      title="Image1"
                    >
                      <img src="/assets/media/gallery/1.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/2.jpg"
                      data-fancybox-group="gallery5"
                      title="Image2"
                    >
                      <img src="/assets/media/gallery/2.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery5"
                      title="Image3"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery5"
                      title="Image4"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery5"
                      title="Image5"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/1.jpg"
                      data-fancybox-group="gallery5"
                      title="Image6"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/2.jpg"
                      data-fancybox-group="gallery5"
                      title="Image7"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fancybox"
                      href="/assets/media/gallery/3.jpg"
                      data-fancybox-group="gallery5"
                      title="Image8"
                    >
                      <img src="/assets/media/gallery/3.jpg" alt="" />
                    </a>
                  </li>
                </ul>
                <span className="total_images">+10</span>{' '}
              </div>
              <div className="bottom_data">
                {' '}
                <span className="img_icon">
                  <i className="fa fa-picture-o" aria-hidden="true"></i>
                </span>
                <h2>
                  New Xenowatch Characters{' '}
                  <span className="update">Updated:March 12th, 2018</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="tab hide" id="video">
          <div className="video_box">
            <ul>
              <li>
                <a href="#video_1" className="videos">
                  {' '}
                  <div className="video">
                    {' '}
                    <img src="/assets/media/video/thumb1.jpg" alt="" />{' '}
                  </div>
                </a>
                <div className="bottom_data">
                  {' '}
                  <a href="#">The Team</a>{' '}
                  <a href="#" className="yellow">
                    Lq Heroes
                  </a>
                  <h2>
                    Destroy Played the first Mission of the Mercenaries Update
                    With Kelly And Saki
                  </h2>
                  <span className="date">August 27th,2018</span>{' '}
                  <span className="views">
                    <i className="fa fa-eye" aria-hidden="true"></i> 2223
                  </span>{' '}
                  <span className="likes">
                    <i className="fa fa-heart" aria-hidden="true"></i>453
                  </span>{' '}
                  <span className="comments">
                    <i className="fa fa-comment" aria-hidden="true"></i>18
                  </span>{' '}
                </div>
              </li>
              <li>
                <div className="video">
                  {' '}
                  <img src="/assets/media/video/thumb1.jpg" alt="" />{' '}
                </div>
                <div className="bottom_data">
                  {' '}
                  <a href="#">The Team</a>{' '}
                  <a href="#" className="red">
                    Lq Heroes
                  </a>
                  <h2>
                    Destroy Played the first Mission of the Mercenaries Update
                    With Kelly And Saki
                  </h2>
                  <span className="date">August 27th,2018</span>{' '}
                  <span className="views">
                    <i className="fa fa-eye" aria-hidden="true"></i> 2223
                  </span>{' '}
                  <span className="likes">
                    <i className="fa fa-heart" aria-hidden="true"></i>453
                  </span>{' '}
                  <span className="comments">
                    <i className="fa fa-comment" aria-hidden="true"></i>18
                  </span>{' '}
                </div>
              </li>
              <li>
                <div className="video">
                  {' '}
                  <img src="/assets/media/video/thumb1.jpg" alt="" />{' '}
                </div>
                <div className="bottom_data">
                  {' '}
                  <a href="#">The Team</a>{' '}
                  <a href="#" className="yellow">
                    Lq Heroes
                  </a>
                  <h2>
                    Destroy Played the first Mission of the Mercenaries Update
                    With Kelly And Saki
                  </h2>
                  <span className="date">August 27th,2018</span>{' '}
                  <span className="views">
                    <i className="fa fa-eye" aria-hidden="true"></i> 2223
                  </span>{' '}
                  <span className="likes">
                    <i className="fa fa-heart" aria-hidden="true"></i>453
                  </span>{' '}
                  <span className="comments">
                    <i className="fa fa-comment" aria-hidden="true"></i>18
                  </span>{' '}
                </div>
              </li>
              <li>
                <div className="video">
                  {' '}
                  <img src="/assets/media/video/thumb1.jpg" alt="" />{' '}
                </div>
                <div className="bottom_data">
                  {' '}
                  <a href="#">The Team</a>{' '}
                  <a href="#" className="yellow">
                    Lq Heroes
                  </a>
                  <h2>
                    Destroy Played the first Mission of the Mercenaries Update
                    With Kelly And Saki
                  </h2>
                  <span className="date">August 27th,2018</span>{' '}
                  <span className="views">
                    <i className="fa fa-eye" aria-hidden="true"></i> 2223
                  </span>{' '}
                  <span className="likes">
                    <i className="fa fa-heart" aria-hidden="true"></i>453
                  </span>{' '}
                  <span className="comments">
                    <i className="fa fa-comment" aria-hidden="true"></i>18
                  </span>{' '}
                </div>
              </li>
              <li>
                <div className="video">
                  {' '}
                  <img src="/assets/media/video/thumb1.jpg" alt="" />{' '}
                </div>
                <div className="bottom_data">
                  {' '}
                  <a href="#">The Team</a>{' '}
                  <a href="#" className="yellow">
                    Lq Heroes
                  </a>
                  <h2>
                    Destroy Played the first Mission of the Mercenaries Update
                    With Kelly And Saki
                  </h2>
                  <span className="date">August 27th,2018</span>{' '}
                  <span className="views">
                    <i className="fa fa-eye" aria-hidden="true"></i> 2223
                  </span>{' '}
                  <span className="likes">
                    <i className="fa fa-heart" aria-hidden="true"></i>453
                  </span>{' '}
                  <span className="comments">
                    <i className="fa fa-comment" aria-hidden="true"></i>18
                  </span>{' '}
                </div>
              </li>
              <li>
                <div className="video">
                  {' '}
                  <img src="/assets/media/video/thumb1.jpg" alt="" />{' '}
                </div>
                <div className="bottom_data">
                  {' '}
                  <a href="#">The Team</a>{' '}
                  <a href="#" className="yellow">
                    Lq Heroes
                  </a>
                  <h2>
                    Destroy Played the first Mission of the Mercenaries Update
                    With Kelly And Saki
                  </h2>
                  <span className="date">August 27th,2018</span>{' '}
                  <span className="views">
                    <i className="fa fa-eye" aria-hidden="true"></i> 2223
                  </span>{' '}
                  <span className="likes">
                    <i className="fa fa-heart" aria-hidden="true"></i>453
                  </span>{' '}
                  <span className="comments">
                    <i className="fa fa-comment" aria-hidden="true"></i>18
                  </span>{' '}
                </div>
              </li>
            </ul>

            <div id="video_1" style={{ display: 'none' }}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/9e9FQCA01dI"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        <div className="tab hide" id="sponsors">
          <div className="sponsers_box">
            <ul>
              {profile[0].sponsors.length === 0 ? (
                <div>No Sponsors</div>
              ) : (
                profile[0].sponsors.map((spons, index) => {
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
