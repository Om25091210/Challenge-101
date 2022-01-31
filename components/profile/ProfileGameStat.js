import Head from 'next/head'
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { useState, useEffect } from 'react';
import cookie from 'js-cookie';

const ProfileGameStat = ({ user, Userdata }) => {

  const [stat, setStat] = useState({});

  useEffect(() => {
    //Get Team Stats
    var gameId = 26;
    var playerId = 26563;
    axios.get(`${baseURL}/api/extp/player/stats/${gameId}/${playerId}`).then((res) => setStat(res.data));
  }, []);

   console.log(stat);
    return(
    
  		<div className="right_bio">
            <div className="games_data white_bg">


              {Userdata.teamMatchesList.length === 0 ? (
                <div>No Games for {user.username}</div>
              ) : (


              Userdata.teamMatchesList.map((item, index) => (

                  <>
                    <div
                      className={`tab ${
                        `item${index}` == 'item0' ? '' : 'hide1'
                      }`}
                      id={`item${index}`}
                      key={index}
                    >
                      <div key={index} className="game_btn">
                        {item.team.games[0].gameId ? item.team.games[0].gameId.name : 'Not Defined'}
                      </div>
                      <ul>
                        <li>
                          <img src="/assets/media/profile/kill.png" alt="" />
                          <span className="name">Kills </span>
                          <span className="num">200</span>
                        </li>
                        <li>
                          <img src="/assets/media/profile/kdr.png" alt="" />
                          <span className="name">KDR </span>
                          <span className="num">1.04</span>
                        </li>
                        <li>
                          <img
                            src="/assets/media/profile/headshot.png"
                            alt=""
                          />
                          <span className="name"> HEADSHOTS </span>
                          <span className="num">75</span>
                        </li>
                        <li>
                          <img src="/assets/media/profile/ace.png" alt="" />

                          <span className="name"> Won </span>
                          <span className="num">100</span>
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