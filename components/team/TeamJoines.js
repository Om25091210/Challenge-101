import React from 'react';
import ApproveRequest from '../discover/invites/ApproveRequest';
import DeclineRequest from '../discover/invites/DeclineRequest';

const TeamJoines = ({ data, user }) => {
  return (
    <>
      {data.request.map((req) => (
        <div>
          <img alt="user Avatar" src="/assets/media/user.png" />
          <h2>
            {req.playerId?.apidata
              ? req.playerId.apidata.data.platformInfo.platformUserHandle
              : req.playerId?.name}
          </h2>
          <p>Sent you a Friend Request!</p>
          <ApproveRequest user={user} player={req} team={data} />
          <DeclineRequest user={user} player={req} team={data} />
        </div>
      ))}
    </>
  );
};

export default TeamJoines;
