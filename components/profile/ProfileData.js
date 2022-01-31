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
import ProductRigs from '@components/common/ProductRigs';
import ProfileMatches from './ProfileMatches';
import TeamAllStats from '@components/team/TeamAllStats';
import GamesDetails from './GamesDetails';


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

            {Userdata.teamMatchesList.map((result, index) => (
                  <TeamAllStats teamId={result.team._id} />
              ))}

            <GamesDetails />

          </div>
        </div>

{/* 
        <div className="tab hide" id="statistics">

        </div>
*/}        
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

        <ProductRigs user={user} productList={products}/>

      </div>

      {/* ------------- start poup data ------------- */}

      <ProdPoup />
    </>
  );
};
export default ProfileData;
