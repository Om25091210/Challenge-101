import Head from 'next/head';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { useState, useEffect } from 'react';
import cookie from 'js-cookie';

const ProfileGameStat = ({ user, games }) => {
  const [stat, setStat] = useState(null);
  const [selectedGame, setSelectedGame] = useState({});

  const handleSelectGame = (e) => {
    setSelectedGame(e.target.value);
    var game = games.find((val) => val.userign === selectedGame);
    var qstat = 'totals';
    var gameId = game?.game?._id;
    var userign = game?.userign;

    axios
      .get(`${baseURL}/api/extapi/player/stats/${gameId}/${userign}/${qstat}`)
      .then((res) => {
        setStat(res.data);
      });
  };

  return (
    <div className="right_bio">
      <div className="games_data white_bg">
        {games?.length === 0 ? (
          <div>No Games for {user.name}</div>
        ) : (
          games?.map((item, index) => (
            <>
              <div
                className={`tab ${`item${index}` == 'item0' ? '' : 'hide1'}`}
                id={`item${index}`}
                key={index}
              >
                <select name="selectedGame" onClick={handleSelectGame}>
                  {games.map((game, index) => (
                    <option value={game.userign}>
                      {game.game.name}-{game.userign}
                    </option>
                  ))}
                </select>

                <ul>
                  <li>
                    <img src="/assets/media/profile/kill.png" alt="" />
                    <span className="name">KILLS </span>
                    {stat?.kills ? (
                      <span className="num">{stat?.kills}</span>
                    ) : (
                      <span className="num">--</span>
                    )}
                  </li>
                  <li>
                    <img src="/assets/media/profile/kdr.png" alt="" />
                    <span className="name">DEATHS </span>
                    {stat?.deaths ? (
                      <span className="num">{stat?.deaths}</span>
                    ) : (
                      <span className="num">--</span>
                    )}
                  </li>
                  <li>
                    <img src="/assets/media/profile/headshot.png" alt="" />
                    <span className="name"> KDA </span>
                    {stat?.kda ? (
                      <span className="num">{stat?.kda}</span>
                    ) : (
                      <span className="num">--</span>
                    )}
                  </li>
                  <li>
                    <img src="/assets/media/profile/ace.png" alt="" />

                    <span className="name"> Loss </span>
                    {stat?.loss ? (
                      <span className="num">{stat?.loss}</span>
                    ) : (
                      <span className="num">--</span>
                    )}
                  </li>
                </ul>
              </div>
            </>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfileGameStat;
