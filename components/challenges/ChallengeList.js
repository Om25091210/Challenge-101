import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import ChallengeApprove from '../discover/invites/ChallengeApprove';
import ChallengeDecline from '../discover/invites/ChallengeDecline';

const Challengelist = ({ user, teams, profile }) => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/api/challenges`).then((res) => {
      setChallenges(res.data);
    });
  }, []);

  const teamCheck = teams.filter((team) => {
    return challenges.find((chall) => {
      return team._id === chall.User_team?._id;
    });
  });

  const isInvite =
    challenges.filter((val2) => {
      return val2.invites?.some((invi) => {
        return (
          teamCheck.length > 0 &&
          teamCheck[0].players.some((plyr) => {
            return profile.playergames.some((pg) => {
              return (
                pg?.player?._id === invi.playerId?._id &&
                plyr.playerId?._id === invi.playerId?._id
              );
            });
          })
        );
      });
    }).length > 0;

  const teamPlayer = challenges.filter((val1) => {
    return val1.players.some((ply) => {
      return (
        teamCheck.length > 0 &&
        teamCheck[0].players.some((plyr) => {
          return plyr.playerId?._id === ply?.playerId;
        })
      );
    });
  });

  return (
    <div className="recent_activity">
      <h2>Challenge List</h2>
      <a href="#!" className="hideShow">
        Hide <i className="fa fa-angle-down" aria-hidden="true"></i>{' '}
        <i className="fa fa-angle-up" aria-hidden="true"></i>
      </a>
      <div className="white_box">
        {!teamPlayer || teamPlayer.length === 0 ? (
          <div className="activity_tag">
            <span className="act_name">No Challenges Yet.</span>
          </div>
        ) : (
          teamPlayer.map((result, idx) => (
            <div className="activity_tag" key={idx}>
              {' '}
              <a href="#">
                <span className="act_name">
                  {result.User_team?.name} has challenged you for a
                  {result.game?.name} match
                </span>
              </a>
              {isInvite ? (
                <>
                  <ChallengeApprove
                    challenge={result}
                    user={user}
                    team={teamCheck[0]}
                  />
                  <ChallengeDecline challenge={result} user={user} />
                </>
              ) : (
                <button className="btn">
                  <a href={`join/${result._id}`}>Go to Lobby</a>
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Challengelist;
