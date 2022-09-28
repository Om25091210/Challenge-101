import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import Moment from 'moment';
import Challengelist from '../challenges/ChallengeList';
import ApproveRequest from '../discover/invites/ApproveRequest';
import DeclineRequest from '../discover/invites/DeclineRequest';

const RightSection = ({ user, suggestedplayers, teams, profile }) => {
  const [matches, setMatches] = useState([]);
  const [later, setLater] = useState(false);
  const [myPageData, setMypageData] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/matches/top/matchs`, {})
      .then((res) => {
        setMatches(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [challenges, setChallenges] = useState([]);
  let type = 'User_team';
  useEffect(() => {
    axios
      .get(`${baseURL}/api/challenges/userchallenges/${type}/${profile._id}`)
      .then((res) => {
        setChallenges(res.data);
      });
    axios
      .get(`${baseURL}/api/tournaments/usertournament/${user._id}`)
      .then((res) => setMypageData(res.data));
  }, []);

  return (
    <div className="right_side overhight">
      {/* <RecentActivity user={user} /> */}

      <div className="recent_activity">
        <h2>Challenge List</h2>
        <a href="#!" className="hideShow">
          Hide <i className="fa fa-angle-down" aria-hidden="true"></i>{' '}
          <i className="fa fa-angle-up" aria-hidden="true"></i>
        </a>
        <div className="white_box">
          {!challenges || challenges.length === 0 ? (
            <div className="activity_tag">
              <span className="act_name">No Challenges Yet.</span>
            </div>
          ) : (
            challenges.map((result, idx) => (
              <Challengelist result={result} profile={profile} user={user} />
            ))
          )}
        </div>
      </div>

      <div className="recent_activity suggested_player">
        <h2>Suggested Players</h2>
        <a href="#!" className="all">
          ALL
        </a>
        <div className="white_box">
          <ul>
            {!suggestedplayers || suggestedplayers.length === 0 ? (
              <p>
                No suggested players identified by our system. Please update
                your profile parameters.
              </p>
            ) : (
              suggestedplayers.map((item, index) =>
                item.player.map((plyr, idx) => (
                  <li className="" key={idx}>
                    <Link href={`/user/${item.user.username}`}>
                      <a>
                        <div className="img_thumb">
                          <img
                            src={
                              item.user?.profilePicUrl
                                ? item.user?.profilePicUrl
                                : '/assets/media/dash/user.jpg'
                            }
                            alt=""
                          />
                        </div>
                        <span className="name">
                          {plyr.nickName ? plyr.nickName : 'SECRET'}
                        </span>
                      </a>
                    </Link>
                  </li>
                ))
              )
            )}
          </ul>
        </div>
      </div>
      <div className="recent_activity my_team">
        <h2>My Team </h2>
        <a href="#" className="mng">
          Manage
        </a>
        <div className="white_box">
          <ul className="team">
            {teams.length > 0 ? (
              teams.slice(0, 2).map((tm, idx) => (
                <li key={idx}>
                  <Link href={`/team/${tm._id}`}>
                    <div>
                      <img src={tm.imgUrl} alt={tm.name} />
                      <p> {tm.name}</p>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <p> No teams defined</p>
            )}
          </ul>
          <a href="#!" className="model_show_btn more btn">
            View All Teams
          </a>

          <div className="common_model_box" id="share_prof">
            <a href="#!" className="model_close">
              X
            </a>

            <div className="inner_model_box">
              <h3>Teams</h3>
              {teams.length === 0 ? (
                <p>No Teams Available </p>
              ) : (
                <ul>
                  {teams &&
                    teams.map((tm, idx) => (
                      <li key={idx}>
                        <Link href={`/team/${tm._id}`}>
                          <div className="game_pic">
                            <img src={tm.imgUrl} alt={tm.name} />
                            <p> {tm.name}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
              <p>
                {' '}
                <a href="/discover"> Discover </a> More Teams
              </p>
            </div>
            <div className="overlay"></div>
          </div>

          <a href={`/team/create`} className="create_team">
            + Create a team
          </a>
          <>
            {profile.request &&
              profile.request.map((req) => (
                <>
                  <div className="grey_bg">
                    <img src={req.teamId.imgUrl} alt={req.teamId.name} />
                    <p>
                      You have been invited to join{' '}
                      <a href={`team/${req.teamId._id}`}>{req.teamId.name}</a>
                    </p>
                  </div>
                  <ApproveRequest player={req} team={req.teamId} />
                  <DeclineRequest player={req} team={req.teamId} />
                </>
              ))}
          </>
        </div>
      </div>

      <div className="recent_activity my_team">
        <h2>My Pages </h2>
        <a href="#" className="mng">
          Manage
        </a>
        <div className="white_box">
          <ul className="team">
            {myPageData.length > 0 ? (
              myPageData.slice(0, 2).map((page, idx) => (
                <li key={idx}>
                  <Link
                    href={`/${page.logoUrl ? 'brand' : 'tournament'}/${
                      page._id
                    }`}
                  >
                    <div>
                      <img
                        src={page.logoUrl ? page.logoUrl : page.imgUrl}
                        alt={page.name}
                      />
                      <p> {page.name}</p>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <p> No brands/tournament</p>
            )}
          </ul>
          <a href="#!" className="model_show_btn more btn">
            View All
          </a>

          <div className="common_model_box" id="share_prof">
            <a href="#!" className="model_close">
              X
            </a>

            <div className="inner_model_box">
              <h3>Brands/Tournaments</h3>
              {myPageData.length === 0 ? (
                <p>No Brands/Tournament Available </p>
              ) : (
                <ul>
                  {myPageData &&
                    myPageData.map((page, idx) => (
                      <li key={idx}>
                        <Link
                          href={`/${page.logoUrl ? 'brand' : 'tournament'}/${
                            page._id
                          }`}
                        >
                          <div className="game_pic">
                            <img
                              src={page.logoUrl ? page.logoUrl : page.imgUrl}
                              alt={page.name}
                            />
                            <p> {page.name}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </div>
            <div className="overlay"></div>
          </div>

          <a href={`/brand/create`} className="create_team">
            + Create a brand
          </a>
          <a href={`/tournament/create`} className="create_team">
            + Create Tournament
          </a>
        </div>
      </div>

      <div className="recent_activity team_match">
        {later === false ? null : (
          <>
            <h2>UPCOMING MATCHES </h2>
            {matches && matches.length > 0 ? (
              matches.map((match, idx) => (
                <div className="white_box" key={idx}>
                  <div className="match_name">
                    {match.name}{' '}
                    <i
                      className="fa fa-long-arrow-right"
                      aria-hidden="true"
                    ></i>{' '}
                    <br />
                    <span>
                      {Moment(match.scheduledAt).format(
                        'MMMM, DD, YYYY hh:mm A'
                      )}
                    </span>
                  </div>
                  <div className="match_time">
                    <b>status: {match.status}</b>
                  </div>
                  <div className="match_time">
                    <span>
                      <a href={match.officialStreamUrl} target="_blank">
                        {match.officialStreamUrl}
                      </a>
                    </span>
                  </div>

                  {/*    <ul className="team">
                  <li>
                    <a href="#">
                      <img src="/assets/media/dash/team1.png" alt="" />
                      Fnatic
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/assets/media/dash/team2.png" alt="" />
                      Cloud9
                    </a>
                  </li>
                </ul>

            */}
                </div>
              ))
            ) : (
              <p> No New Matches</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RightSection;
