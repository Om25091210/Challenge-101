import React from 'react';
import RoomDetails from './RoomDetails';

const AdminChallenges = ({ challenges }) => {
  return (
    <>
      <h2>Latest Challenges</h2>
      <div className="table">
        <div className="heads_row">
          <div className="heads">ChallengeId</div>
          <div className="heads">Challenger</div>
          <div className="heads">Challenged</div>
          <div className="heads">Game</div>
          <div className="heads">Match</div>
          <div className="heads">Start Time</div>
          <div className="heads">Room Details</div>
          <div className="heads">Actions</div>
        </div>
        {!challenges || challenges.length === 0 ? (
          <div className="activity_tag">
            <span className="act_name">No challenges are ranked yet ...</span>
          </div>
        ) : (
          challenges.map((result, idx) => (
            <div className="row_box" key={idx}>
              <div className="cols_box">
                <div className="cols">{result._id.substring(0, 14)}</div>
                <div className="cols">{result.challenger.name}</div>
                <div className="cols">{result.challenged.name}</div>
                <div className="cols">{result.game.name}</div>
                <div className="cols">
                  <p>{result.challenger.name}</p>
                  VS
                  <p>{result.challenged.name}</p>
                </div>
                <div className="cols">{result.createdAt}</div>
                <div className="cols">
                  Room Id: {result.room?.roomId ? result.room.roomId : '---'}
                  <br />
                  Room Password:{' '}
                  {result.room?.roompwd ? result.room.roompwd : '---'}
                </div>

                <RoomDetails data={result} type="challenges" />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AdminChallenges;
