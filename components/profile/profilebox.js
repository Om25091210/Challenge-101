import PropTypes from 'prop-types';
import Head from 'next/head'
var FormData = require('form-data');
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useMutation} from 'react-query'
import { toast } from 'react-toastify';
import cookie from 'js-cookie';


const queryClient = new QueryClient()


export default function ProfileBox ({user}) {

return(<QueryClientProvider client={queryClient} contextSharing={true}>
        <ProfileBoxWrap user={user}/>
    </QueryClientProvider>
  );
}


const ProfileBoxWrap = ({ user }) => {

  const [profilePic, setProfilePic] = useState(null);

  const mutation = useMutation(async (formdata) => {
    await axios.put(`${baseURL}/api/auth`, formdata, {
      headers: {
        Authorization: cookie.get('token'),
        'Content-Type': 'multipart/form-data',
      },
    });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('profilePic', profilePic);
    try {
      await mutation.mutateAsync(formdata);
      toast.success('User settings have been updated');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  return (

  <div className="profile_box">
 <div className="profile_cover_photo">
    <img src="/assets/media/profile/cover_bg.jpg" alt="cover image"/>
 </div>

 <div className="profile_dp_box">

  <div className="profile_pic">
 <form onSubmit={handleSubmit}>
      <img
        className="rounded-full h-full w-full object-cover"
        src={
          profilePic
            ? URL.createObjectURL(profilePic)
            : user.profilePicUrl
        }
        alt={user.name}
      />


    
      <div className="edit_photo">
       
        <label htmlFor="user-photo" className="edit_label"> Update photo</label>
        <input
          id="user-photo"
          name="user-photo"
          type="file"
          className="custom-file-input"
          onChange={(e) => {
            setProfilePic(e.target.files[0]);
            handleSubmit(e);
            }
        }
        />
      </div>
    

    </form>
  </div>

  <div className="profile_details">

  <div className="top_details">  
<div className="name_box">
    <span className="game_name"> TheMadTitan </span>
    <span className="name">Sonu Singh</span>
    <span className="follower">4.1 M followers</span>


</div>
<div className="flag"><img src="/assets/media/profile/flag.png" alt="flag"/></div>
<div className="tick"><span className="active"><i className="fa fa-check" aria-hidden="true"></i></span></div>
<div className="button"><a href="#" className="btn">FOLLOW</a> <a href="#" className="btn">MESSAGE</a></div>

  </div>


<div className="bottom_details">

    <div className="current_status">
<div className="current_team">
   <span className="ct"> Current Team</span>
   <span className="were">The Werewolves <i className="fa fa-arrow-right" aria-hidden="true"></i></span>
</div>
   <div className="game_role">
   <span className="ct"> In Game Role</span>
   <span className="were">Captain - CS GO</span>
</div>

</div>




 <div className="badges">

<h5>BADGES</h5>
<img src="/assets/media/profile/badges1.png" alt=""/>
<img src="/assets/media/profile/badges2.png" alt=""/>
<img src="/assets/media/profile/badges3.png" alt=""/>
<img src="/assets/media/profile/badges4.png" alt=""/>
<img src="/assets/media/profile/badges5.png" alt=""/>

 </div>


</div>

 </div>



  </div>

  <div className="bio_box">
 
   
    <div className="left_bio">
   
    <div className="top_bio">    
    <h3>BIO</h3>     
    <div className="socail">
    <a href="#"><i className="fa fa-facebook-official" aria-hidden="true"></i></a>
    <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
    <a href="#"><i className="fa fa-facebook-official" aria-hidden="true"></i></a>
    <a href="#"><i className="fa fa-facebook-official" aria-hidden="true"></i></a>

</div>
    </div>

    <p>Sonu Singh is an veteran player playing for Fnatic in the past and
        winning 5 major world championships including Intel Extreme Masters. </p>


        <div className="games">

         <h2>GAMES</h2>  
         <a href="#"><img src="/assets/media/profile/game1.png" alt=""/></a>
         <a href="#"><img src="/assets/media/profile/game2.png" alt=""/></a>
         <a href="#"><img src="/assets/media/profile/game3.png" alt=""/></a>


        </div>


    </div>


    <div className="right_bio">

       <div className="game_btn">CS:GO</div>
       <ul>
      
        <li>
            <img src="/assets/media/profile/kill.png" alt=""/>
            <span className="name">Kills </span>
            <span className="num">222</span>
        
        </li>
        <li><img src="/assets/media/profile/kdr.png" alt=""/>
            <span className="name">KDR </span>
            <span className="num">222</span>
        </li>
        <li><img src="/assets/media/profile/headshot.png" alt=""/>
            <span className="name">  HEADSHOTS </span>
            <span className="num">222</span>
        </li>
        <li><img src="/assets/media/profile/ace.png" alt=""/>
        
            <span className="name"> ACE </span>
            <span className="num">222</span>
        </li>

       </ul>

    </div>


 </div>

  </div>


);

}
