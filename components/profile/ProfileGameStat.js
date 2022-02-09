import Head from 'next/head'
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { useState, useEffect } from 'react';
import cookie from 'js-cookie';

const ProfileGameStat = ({ user, Userdata }) => {

  const [stat, setStat] = useState();

  useEffect(() => {
    //Get Team Stats
    var gameId = 4;
    var userign = 178138659;
    var qstat = 'totals';
    axios.get(`${baseURL}/api/extapi/player/stats/${gameId}/${userign}/${qstat}`).then( res => {
      setStat(res.data);
    });
  }, []);

   console.log(stat);

    return(
    
  		<div className="right_bio">
            <div className="games_data white_bg">


              {Userdata.profile.playergames.length === 0 ? (
                <div>No Games for {user.name}</div>
              ) : (


              Userdata.profile.playergames.map((item, index) => (

                  <>
                    <div
                      className={`tab ${
                        `item${index}` == 'item0' ? '' : 'hide1'
                      }`}
                      id={`item${index}`}
                      key={index}
                    >
                      <div key={index} className="game_btn">
                        {item.game._id ? item.game.name : 'Not Defined'}
                      </div>
                      <ul>
                        <li>
                          <img src="/assets/media/profile/kill.png" alt="" />
                          <span className="name">KILLS </span>
                          <span className="num">{stat?.kills}</span>
                        </li>
                        <li>
                          <img src="/assets/media/profile/kdr.png" alt="" />
                          <span className="name">DEATHS </span>
                          <span className="num">{stat?.deaths}</span>
                        </li>
                        <li>
                          <img
                            src="/assets/media/profile/headshot.png"
                            alt=""
                          />
                          <span className="name"> KDA </span>
                          <span className="num">{stat?.kda}</span>
                        </li>
                        <li>
                          <img src="/assets/media/profile/ace.png" alt="" />

                          <span className="name"> Loss </span>
                          <span className="num">{stat?.loss}</span>
                        </li>
                      </ul>
                    </div>
                  </>


                ))


              )}

            </div>
          </div>

    )


}

export default ProfileGameStat;