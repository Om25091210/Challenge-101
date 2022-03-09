import Head from 'next/head';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { useState, useEffect } from 'react';
import cookie from 'js-cookie';

const ProfileGameStat = ({ user, Userdata, selectedGame }) => {
  const [stat, setStat] = useState(null);
  var gameId = selectedGame?.game?._id;
  var userign = selectedGame?.userign;

  useEffect(() => {
    //Get Team Stats
    var qstat = 'totals';

    axios
      .get(`${baseURL}/api/extapi/player/stats/${gameId}/${userign}/${qstat}`)
      .then((res) => {
        setStat(res.data);
      });
  }, [gameId, userign]);

  return (
    <div className="right_bio">
      {selectedGame?.game?.slug === stat?.slug ? (
        <div className="games_data white_bg">
          {Userdata.profile.playergames?.length === 0 ? (
            <div>No Games for {user.name}</div>
          ) : (
            Userdata.profile.playergames?.map((item, index) => (
              <>
                <div
                  className={`tab ${`item${index}` == 'item0' ? '' : 'hide1'}`}
                  id={`item${index}`}
                  key={index}
                >
                  <div className="game_btn">
                    {stat ? stat.slug : 'Not Defined'}
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
                      <img src="/assets/media/profile/headshot.png" alt="" />
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
      ) : (
        'Please select a game from Browse Games'
      )}
    </div>
  );
};

export default ProfileGameStat;
