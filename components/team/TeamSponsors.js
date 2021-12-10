      
import { useState, useEffect } from 'react'
import baseURL from '../../utils/baseURL';


const TeamSponsors = ({user, data}) => {


  return (


      <div className="tab hide" id="sponsors">
        <div className="sponsers_box">
          <ul>

          {   data.sponsors.map((item,index) => (

            <li key={index}>
              <div className="sponser_name">
                <img src={item.imgUrl} alt={item.name} />
              </div>
              <div className="sponser_data">
                {' '}
                <span className="head_spons_bg">{item.name}</span>
                <p>
               		{item.description}
                </p>
              </div>
            </li>
	            
	            ))
      		}  

          </ul>
        </div>
      </div>

);

}

export default TeamSponsors;
