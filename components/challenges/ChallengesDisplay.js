import React from 'react';
import Moment from 'moment';
import ChallengeApprove from '../discover/invites/ChallengeApprove';
import ChallengeDecline from '../discover/invites/ChallengeDecline';

const ChallengesDisplay = ({ challenges, isInvite, user }) => {
  return (
    <>
      <ul className="challenge_card">
        {!challenges || challenges.length === 0 ? (
          <div>
            <span>No Challenges for you</span>
          </div>
        ) : (
          challenges.map((chall) => (
            <li>
              <div className="row1">
                <div className="card_img">
                  <div className="img">
                    <img src={chall.User_team?.imgUrl} alt="" />
                  </div>
                  {chall.User_team?.name}
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
                  {Moment(chall?.startDate).format('DD MMM YYYY')}-
                  {chall?.startTime}
                </span>

                {isInvite ? (
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
          ))
        )}
      </ul>
    </>
  );
};

export default ChallengesDisplay;
