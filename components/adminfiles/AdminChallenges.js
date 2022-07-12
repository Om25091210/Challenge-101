import React from 'react';
import RoomDetails from './RoomDetails';
import Moment from 'moment';

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
            <span className="act_name">No challenges are yet...</span>
          </div>
        ) : (
          challenges.map((result, idx) => (
            <div className="row_box" key={idx}>
              <div className="cols_box">
                <div className="cols">{result._id.substring(0, 14)}</div>
                <div className="cols">{result.User_team.name}</div>
                <div className="cols">{result.opponent_team.name}</div>
                <div className="cols">{result.game.name}</div>
                <div className="cols">
                  <p>{result.User_team.name}</p>
                  VS
                  <p>{result.opponent_team.name}</p>
                </div>
                <div className="cols">
                  {Moment(result.startDate).format('DD/MMM/YYYY')}
                  <br />
                  {Moment(result.startDate).format('hh:mm A')}
                </div>
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
