import React from 'react';
import ApproveRequest from '../discover/invites/ApproveRequest';
import DeclineRequest from '../discover/invites/DeclineRequest';

const TeamJoines = ({ data, user }) => {
  return (
    <>
      <div className="team_member">
        <ul>
          {data.request.map((req) => (
            <li>
              <div className="dp">
                {' '}
                <img alt="user Avatar" src="/assets/media/user.png" />
              </div>
              <h2>
                {req.playerId?.apidata
                  ? req.playerId.apidata.data.platformInfo.platformUserHandle
                  : req.playerId?.name}
              </h2>
              <p>Sent you a Friend Request!</p>
              <div className="two_btn">
                <ApproveRequest user={user} player={req} team={data} />
                <DeclineRequest user={user} player={req} team={data} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TeamJoines;
