
const RightSection = () => (

<div className="right_side overhight">
  <div className="recent_activity">
    <h2>RECENT ACTIVITY</h2>
    <a href="javascript:void(0)" className="hideShow">Hide <i className="fa fa-angle-down" aria-hidden="true"></i> <i className="fa fa-angle-up" aria-hidden="true"></i></a>
    <div className="white_box">
      <div className="activity_tag"> <a href="#"> <span className="act_img"><img src="/assets/media/dash/user1.png" alt=""/></span> <span className="act_name">You have been invited to join TWW - The Werewolves. </span> </a> </div>
      <div className="activity_tag"> <a href="#"> <span className="act_img"><img src="/assets/media/dash/user.jpg" alt=""/></span> <span className="act_name">Jonah has sent you a friend request. </span> </a> </div>
    </div>
  </div>
  <div className="recent_activity freind_request">
    <h2>FRIEND REQUESTS</h2>
    <a href="javascript:void(0)" className="hideShow">Hide <i className="fa fa-angle-down" aria-hidden="true"></i> <i className="fa fa-angle-up" aria-hidden="true"></i></a>
    <div className="white_box">
      <div className="activity_tag"> <a href="#"> <span className="act_img"><img src="/assets/media/dash/user.png" alt=""/></span> <span className="act_name">TheMadTitan</span> <span className="accept">accept</span> <span className="close">X</span> </a> </div>
      <div className="activity_tag"> <a href="#"> <span className="act_img"><img src="/assets/media/dash/user.jpg" alt=""/></span> <span className="act_name">Rocky</span> <span className="accept">accept</span> <span className="close">X</span> </a> </div>
    </div>
  </div>
  <div className="recent_activity suggested_player">
    <h2>Suggested Players</h2>
    <a href="javascript:void(0)" className="all">ALL</a>
    <div className="white_box">
      <ul>
        <li className="disable"><a href="#">
          <div className="img_thumb"><img src="/assets/media/dash/user.jpg" alt=""/></div>
          <span className="name">Name1</span></a></li>
        <li><a href="#">
          <div className="img_thumb"><img src="/assets/media/dash/user.jpg" alt=""/></div>
          <span className="name">Name1</span><span className="online"></span></a></li>
        <li><a href="#">
          <div className="img_thumb"><img src="/assets/media/dash/user.jpg" alt=""/></div>
          <span className="name">Name1</span><span className="online"></span></a></li>
        <li className="disable"><a href="#">
          <div className="img_thumb"><img src="/assets/media/dash/user.jpg" alt=""/></div>
          <span className="name">Name1</span></a></li>
        <li className="disable"><a href="#">
          <div className="img_thumb"><img src="/assets/media/dash/user.jpg" alt=""/></div>
          <span className="name">Name1</span></a></li>
        <li className="disable"><a href="#">
          <div className="img_thumb"><img src="/assets/media/dash/user.jpg" alt=""/></div>
          <span className="name">Name1</span></a></li>
        <li className="disable"><a href="#">
          <div className="img_thumb"><img src="/assets/media/dash/user.jpg" alt=""/></div>
          <span className="name">Name1</span></a></li>
        <li><a href="#">
          <div className="img_thumb"><img src="/assets/media/dash/user.jpg" alt=""/></div>
          <span className="name">Name1</span><span className="online"></span></a></li>
        <li><a href="#">
          <div className="img_thumb"><img src="/assets/media/dash/user.jpg" alt=""/></div>
          <span className="name">Name1</span><span className="online"></span></a></li>
      </ul>
    </div>
  </div>
  <div className="recent_activity my_team">
    <h2>My Team </h2>
    <a href="javascript:void(0)" className="mng">Manage</a>
    <div className="white_box">
      <ul className="team">
        <li><a href="#"><img src="/assets/media/dash/team1.png" alt=""/>Fnatic</a></li>
        <li><a href="#"><img src="/assets/media/dash/team2.png" alt=""/>Cloud9</a></li>
        <li><a href="#"><img src="/assets/media/dash/team3.png" alt=""/>Creed</a></li>
        <li><a href="#">+</a></li>
      </ul>
      <button className="create_team">+ Create a team</button>
      <p>Or use the Team Finder to find a team.</p>
      <div className="grey_bg"><img src="/assets/media/dash/user1.png" alt=""/>
        <p>You have been invited to join
          The Werewolves. <a href="#">Click Here</a></p>
      </div>
    </div>
  </div>
  <div className="recent_activity team_match">
    <h2>UPCOMING MATCHES </h2>
    <div className="white_box">
      <div className="match_name">GON Championship <i className="fa fa-long-arrow-right" aria-hidden="true"></i></div>
      <div className="match_time"><b>CS:GO</b> <span>9/12/21    09:30 PM IST</span></div>
      <ul className="team">
        <li><a href="#"><img src="/assets/media/dash/team1.png" alt=""/>Fnatic</a></li>
        <li><a href="#"><img src="/assets/media/dash/team2.png" alt=""/>Cloud9</a></li>
      </ul>
    </div>
  </div>
</div>


    );

    export default RightSection;