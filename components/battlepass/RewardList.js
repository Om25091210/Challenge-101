import React from 'react';

const RewardList = ({ levels, battlepass, type }) => {
  return (
    <>
      {levels &&
        levels.map((level) =>
          level.reward.map((rwd) =>
            rwd.rewardId.type === type ? (
              <li>
                <img src={rwd.rewardId.imgUrl} alt={rwd.rewardId.name} />
                <p>{rwd.rewardId.name}</p>
                {rwd.rewardId.levelId <= battlepass.level ? (
                  <button className="btn">Claim</button>
                ) : null}
              </li>
            ) : (
              <li></li>
            )
          )
        )}
    </>
  );
};

export default RewardList;
