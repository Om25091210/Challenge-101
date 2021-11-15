import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { useForm } from "react-hook-form";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import cookie from 'js-cookie';

const TeamProfileBox = ({user}) => {

  const [data, setData] = useState(null);
  const teamId = '6191520fd802397e7abf218d';

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseURL}/api/teams/${teamId}`);
      const newData = await response.json();
      setData(newData);
    };
    fetchData();
  }, []);

  console.log(data)

if (data) {

  return (

 <div className="profile_box">
 <div className="profile_cover_photo">

    <img src="/assets/media/profile/cover_bg.jpg" alt="cover image"/>


 </div>

 <div className="profile_dp_box">

  <div className="profile_pic">

    <img src={data.team.logoUrl} alt=""/>

  </div>

  <div className="profile_details">

  <div className="top_details">  
<div className="name_box">
    <span className="game_name"> {data.team.name} </span>
    <span className="name">Founded May 2011</span>
    <span className="follower">2 M followers</span>


</div>
<div className="flag">{data.team.region}</div>
<div className="tick"><span className="active">

{data.team.isVerified ? 
    ( <i className="fa fa-check" aria-hidden="true"></i> ) :
    ( <i className="fa fa-question-circle" aria-hidden="true"></i> ) 
}

</span></div>
<div className="button"><a href="#" className="btn">FOLLOW</a> <a href="#" className="btn">ASK TO JOIN</a></div>

  </div>


<div className="bottom_details team_details">



    <div className="badges">

        <h5>MAJOR TITLES</h5>
        <img src="/assets/media/team/titles1.png" alt=""/>
        <img src="/assets/media/team/titles2.png" alt=""/>
        <img src="/assets/media/team/titles3.png" alt=""/>
        
        
         </div>
        


    <div className="current_status">
        <h5>RANKING</h5>



            {!data.team.ranks || data.team.ranks.length === 0 ? (
                 <p>No ranks defined..</p>
               ) : (

             data.team.ranks.map((item,index) => (

            <div key={index} className="current_team">
               <span className="ct"> <i className="fa fa-sort-asc" aria-hidden="true"></i> {item.rank}</span>
               <span className="were">{item.rankType} </span>
            </div>
            ) ) 

            )}  


        
</div>


   
 




</div>

 </div>



  </div>

  <div className="bio_box team_bio">
 
   
    <div className="left_bio">
   
    <div className="top_bio">    
    <h3>ABOUT THE TEAM</h3>     
    <div className="socail">
    <a href="#"><i className="fa fa-facebook-official" aria-hidden="true"></i></a>
    <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
    <a href="#"><i className="fa fa-facebook-official" aria-hidden="true"></i></a>
    <a href="#"><i className="fa fa-facebook-official" aria-hidden="true"></i></a>

</div>
    </div>

    <p>{data.team.description} </p>


    <p class="team_pos"><span className="position">REGION:</span> {data.team.region} </p>

        <div className="team_pos">

         <ul>

       <li><span className="position">MANAGER:</span>  <span className="pos_name"><span className="imgs"><img src="/assets/media/user.jpg" alt=""/></span>Alison “Eleven” James</span></li>

       <li><span className="position">Coach:</span>  <span className="pos_name"><span className="imgs"><img src="/assets/media/user.jpg" alt=""/></span>Alison “Eleven” James</span></li>


        </ul>


        </div>


    </div>


    <div className="right_team_bio">

        <div className="team_pos">

            <ul>
            <h5 className="position">ARENAS:</h5> 
             {data.arenas.map((item,index) => (

            <li key={index}><span className="pos_name"><img src=
            {item.logoUrl} alt=""/> {item.name}</span></li>
            ) )}          
   
           </ul>
   
   
           </div>

       <div className="sponser">
        <h5>SPONSORS</h5>
        
        <ul>        

            {!data.sponsors || data.sponsors.length === 0 ? (
                 <p>No sponsors defined..</p>
               ) : (

             data.sponsors.map((item,index) => (

            <li key={index}><img src=
            {item.logoUrl} alt=""/> <p>{item.name}</p></li>
            ) ) 

            )}          
   

    </ul>

    </div>

    </div>


 </div>

  </div>



  ) 
} else {
    return null;
  }

}


export default TeamProfileBox;