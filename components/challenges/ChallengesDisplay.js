import React from 'react';
import Moment from 'moment';
import ChallengeApprove from '../discover/invites/ChallengeApprove';
import ChallengeDecline from '../discover/invites/ChallengeDecline';

const ChallengesDisplay = ({ chall, user, teamCheck, profile }) => {
  const teamFiltered = chall.invites?.some((invi) => {
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

  return (
    <>
      <li>
        <div className="row1">
          <div className="card_img">
            <div className="img">
              <img src={chall.opponent_team?.imgUrl} alt="" />
            </div>
            {chall.opponent_team?.name}
          </div>
          <img src="/assets/media/challenge/f.png" alt="" />
        </div>

        <div className="row1">
          <span>
            <b>Type:</b>
            {chall?.challengeType}
          </span>
          <span>
            <b>Format:</b>
            {chall.format ? chall.format : '---'}
          </span>
          <span>
            <b>Entry Fee:</b>
            {chall.entry_fee ? chall.entry_fee : '---'}
          </span>
        </div>

        <div className="row1">
          <span>
            <b>Challenge Express:</b>
            {Moment(chall?.startDate).format('DD MMM YYYY')}-{chall?.startTime}
          </span>

          {teamFiltered === true ? (
            <>
              <ChallengeApprove
                challenge={chall}
                team={chall.opponent_team}
                user={user}
              />
              <ChallengeDecline challenge={chall} user={user} />
            </>
          ) : (
            <button className="btn">
              <a href={`join/${chall._id}`}>Go to Lobby</a>
            </button>
          )}
        </div>
      </li>
    </>
  );
};

export default ChallengesDisplay;