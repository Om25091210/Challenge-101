

const friendRequests = ({user}) => { 
E:{user}
console.log('frrrrr')
console.log(user)
return (

  <div className="recent_activity freind_request">
    <h2>FRIEND REQUESTS</h2>
    <a href="#!" className="hideShow">Hide <i className="fa fa-angle-down" aria-hidden="true"></i> <i className="fa fa-angle-up" aria-hidden="true"></i></a>
    <div className="white_box">
      <div className="activity_tag"> <a href="#"> <span className="act_img"><img src="/assets/media/dash/user.png" alt=""/></span> <span className="act_name">TheMadTitan</span> <span className="accept">accept</span> <span className="close">X</span> </a> </div>
      <div className="activity_tag"> <a href="#"> <span className="act_img"><img src="/assets/media/dash/user.jpg" alt=""/></span> <span className="act_name">Rocky</span> <span className="accept">accept</span> <span className="close">X</span> </a> </div>
    </div>
  </div>

  
);

}

export default friendRequests;