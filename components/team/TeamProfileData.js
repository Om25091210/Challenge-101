import TeamAbout from './TeamAbout';
import TeamSponsors from './TeamSponsors';
import { useState, useEffect } from 'react';
import TeamPhotos from './TeamPhotos';
import TeamVideos from './TeamVideos';
import TeamAllStats from './TeamAllStats';
import TeamSquads from './teamsquads/TeamSquads';
import TeamStatistics from './teamstats/TeamStatistics';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import LikePost from '@components/postLikes/LikePost';
import CustomPost from '@components/dashboard/CustomPost';
import CommentForm from '@components/comments/CommentForm';
import Moment from 'moment';

import ProductList from '@components/common/ProductList';
import TeamMatches from '@components/tournament/TeamMatches';
import TeamJobs from './TeamJobs';
import TeamJoines from './TeamJoines';

const TeamProfileData = ({
  user,
  data,
  products,
  isManager,
  profile,
  isAdmin
}) => {
  const [jobs, setJobs] = useState([]);
  const [teamposts, setTeamPosts] = useState([]);
  const [tournamentStatData, setTournamentStatData] = useState([]);
  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);

  useEffect(() => {
    //Jobs
    axios
      .get(`${baseURL}/api/teams/jobs/${data.team._id}`)
      .then((res) => setJobs(res.data));

    //Posts
    axios
      .get(`${baseURL}/api/posts/`)
      .then((res) => setTeamPosts(res.data.posts));

    // Tournament Stats
    axios
      .get(`${baseURL}/api/tournamentstat/`)
      .then((res) => setTournamentStatData(res.data));
  }, []);
  let Filteredteamposts = teamposts.filter((teampost) => {
    return (
      teampost.post_type === 'Team' && teampost.username === data.team.name
    );
  });

  return (
    <>
      <div className="prfoile_tab_data white_bg">
        <div className="tab" id="overview">
          {' '}
          <div className="profile_left_post">
            {Filteredteamposts.length === 0 ? (
              <h6>No Posts Under This Team</h6>
            ) : (
              Filteredteamposts.length !== 0 &&
              Filteredteamposts.map((post, index) => (
                <div className="post">
                  <div key={index}>
                    <div className="heads" key={index}>
                      <div className="user">
                        <img src={post.profilepic} alt="" />
                      </div>
                      <div className="user_name_disc">
                        <h4>{post.username}</h4>
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
                        <i className="fa fa-heart" aria-hidden="true"></i>{' '}
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
              ))
            )}
          </div>
          <div className="profile_match_details">
            <TeamAllStats teamId={data.team._id} />

            <div className="games_details">
              <ul>
                <li>
                  <span className="nm">Game: </span>{' '}
                  <img src="/assets/media/profile/game1.png" alt="" />
                </li>
                <li>
                  <span className="nm">Roles: </span>{' '}
                  <span className="task">Assault/Sniper</span>{' '}
                </li>
                <li>
                  <span className="nm">Mic:</span>{' '}
                  <span className="task"> On</span>
                </li>
                <li>
                  <span className="nm">Platform:</span>{' '}
                  <span className="task"> PC</span>
                </li>
                <li>
                  <span className="nm">Language:</span>{' '}
                  <span className="task"> ENG, RU, HINDI</span>
                </li>
                <li>
                  <span className="nm">Win rate/KDA:</span>{' '}
                  <span className="task"> 67% / 2.9 </span>
                </li>
                <li>
                  <span className="nm">MMR:</span>{' '}
                  <span className="task"> 3211 </span>
                </li>
                <li>
                  <span className="nm">Availablilty:</span>{' '}
                  <span className="task"> 4 hours per day 7 days a week </span>
                </li>
              </ul>
              <div className="chart_box">
                <img src="/assets/media/profilechart.jpg" alt="" />
              </div>
              <button className="game_btn">INVITE TO TEAM</button>
            </div>
          </div>
        </div>
        <div className="tab hide" id="squads">
          <TeamSquads
            squads={data.squads}
            teamplayers={data.players}
            team={data.team}
            isManager={isManager}
            isAdmin={isAdmin}
          />
        </div>
        <div className="tab hide" id="achievement">
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
          </div>
        </div>
        <TeamMatches tournament={data.teamMatches} />
        <div className="tab hide" id="stats">
          <TeamStatistics
            tournamentStatData={tournamentStatData}
            isManager={isManager}
            isAdmin={isAdmin}
          />
        </div>

        <ProductList user={user} productList={products} />

        <div className="tab hide" id="photos">
          <TeamPhotos
            user={user}
            team={data.team}
            isManager={isManager}
            isAdmin={isAdmin}
          />
        </div>

        <div className="tab hide" id="media">
          <TeamVideos
            user={user}
            team={data.team}
            isManager={isManager}
            isAdmin={isAdmin}
          />
        </div>

        <div className="tab hide" id="jobs">
          <TeamJobs
            jobs={jobs}
            team={data.team}
            isManager={isManager}
            isAdmin={isAdmin}
          />
        </div>

        <TeamAbout
          tmdata={data.team}
          isManager={isManager}
          isAdmin={isAdmin}
          user={user}
        />

        <TeamSponsors
          data={data}
          user={user}
          isManager={isManager}
          isAdmin={isAdmin}
        />

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
        <div className="tab hide" id="joines">
          <TeamJoines data={data.team} user={user} profile={profile} />
        </div>
      </div>
    </>
  );
};

export default TeamProfileData;
