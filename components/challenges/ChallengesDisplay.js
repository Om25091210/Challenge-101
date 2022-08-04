import React from 'react';
import Moment from 'moment';
import ChallengeApprove from '../discover/invites/ChallengeApprove';
import ChallengeDecline from '../discover/invites/ChallengeDecline';

const ChallengesDisplay = ({ chall, user, profile }) => {
  const isInvite =
    profile.playergames.filter((pro) => {
      return chall.invites.some((chall) => {
        return pro.player?._id === chall.playerId?._id;
      });
    }).length > 0;
  console.log(profile.playergames);

  return (
    <>
      <li>
        <div className="row1">
          {chall.ChallType === 'Team' ? (
            <div className="card_img">
              <div className="img">
                <img src={chall.User_team?.imgUrl} alt="" />
              </div>
              {chall.User_team?.name}
            </div>
          ) : chall.ChallType === 'Solo' ? (
            chall.players &&
            chall.players.map((ply) => (
              <div className="card_img">
                <div className="img">
                  <img
                    src={
                      ply?.playerId.apidata?.data.platformInfo.avatarUrl
                        ? ply?.playerId.apidata.data.platformInfo.avatarUrl
                        : ply?.playerId.imgUrl
                    }
                    alt={
                      ply?.playerId.apidata?.data.platformInfo
                        .platformUserHandle
                    }
                  />
                </div>
                {ply.playerId.apidata?.data.platformInfo.platformUserHandle
                  ? ply.playerId.apidata?.data.platformInfo.platformUserHandle
                  : ply.playerId.name}
              </div>
            ))
          ) : null}
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

          {chall.isOpenMatch === false ? (
            isInvite === true ? (
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
            )
          ) : (
            <button className="btn">Accept</button>
          )}
        </div>
      </li>
    </>
  );
};

export default ChallengesDisplay;
