import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import Moment from 'moment';

import RecentActivity from '@components/dashboard/RecentActivity';
import FriendRequests from '@components/dashboard/friendRequests';

const RightSection = ({ user, profile, suggestedplayers, teams }) => {
  const [matches, setMatches] = useState([]);

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

  return (
    <div className="right_side overhight">
      <RecentActivity user={user} />

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
                              item.user.profilePicUrl
                                ? item.user.profilePicUrl
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
        <a href="/team" className="mng">
          Manage
        </a>
        <div className="white_box">
          <ul className="team">
            {teams.length > 0 ? (
              teams.map((tm, idx) => (
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
            <li>
              <a href="/discover">+</a>
            </li>
          </ul>

          <a href={`/team/create`} className="create_team">
            + Create a team
          </a>
          <p>Or use the Team Finder to find a team.</p>
          <div className="grey_bg">
            <img src="/assets/media/dash/user1.png" alt="" />
            <p>
              You have been invited to join The Team. <a href="#">Click Here</a>
            </p>
          </div>
        </div>
      </div>
      <div className="recent_activity team_match">
        <h2>UPCOMING MATCHES </h2>

        {matches && matches.length > 0 ? (
          matches.map((match, idx) => (
            <div className="white_box" key={idx}>
              <div className="match_name">
                {match.name}{' '}
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>{' '}
                <br />
                <span>
                  {Moment(match.scheduledAt).format('MMMM, DD, YYYY hh:mm A')}
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
      </div>
    </div>
  );
};

export default RightSection;
