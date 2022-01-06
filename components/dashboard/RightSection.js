import FriendRequests from '@components/dashboard/friendRequests';
import Link from 'next/link';

const RightSection = ({ user, profile, suggestedplayers }) => {
  const teamData = profile.player;
  return (
    <div className="right_side overhight">
      <div className="recent_activity">
        <h2>RECENT ACTIVITY</h2>
        <a href="#!" className="hideShow">
          Hide <i className="fa fa-angle-down" aria-hidden="true"></i>{' '}
          <i className="fa fa-angle-up" aria-hidden="true"></i>
        </a>
        <div className="white_box">
          <div className="activity_tag">
            {' '}
            <a href="#">
              {' '}
              <span className="act_img">
                <img src="/assets/media/dash/user1.png" alt="" />
              </span>{' '}
              <span className="act_name">
                You have been invited to join TWW - The Werewolves.{' '}
              </span>{' '}
            </a>{' '}
          </div>
          <div className="activity_tag">
            {' '}
            <a href="#">
              {' '}
              <span className="act_img">
                <img src="/assets/media/dash/user.jpg" alt="" />
              </span>{' '}
              <span className="act_name">
                Jonah has sent you a friend request.{' '}
              </span>{' '}
            </a>{' '}
          </div>
        </div>
      </div>

      <FriendRequests user={user} />

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
                item.player.map((plyr, index) => (
                  <li className="">
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
            {teamData.team.map((tm) => (
              <li>
                <Link href={`/team/${tm.teamId._id}`}>
                  <div>
                    <img src={tm.teamId.imgUrl} alt={tm.teamId.name} />
                    <p> {tm.teamId.name}</p>
                  </div>
                </Link>
              </li>
            ))}
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
              You have been invited to join The Werewolves.{' '}
              <a href="#">Click Here</a>
            </p>
          </div>
        </div>
      </div>
      <div className="recent_activity team_match">
        <h2>UPCOMING MATCHES </h2>
        <div className="white_box">
          <div className="match_name">
            GON Championship{' '}
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </div>
          <div className="match_time">
            <b>CS:GO</b> <span>9/12/21 09:30 PM IST</span>
          </div>
          <ul className="team">
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
        </div>
      </div>
    </div>
  );
};

export default RightSection;
