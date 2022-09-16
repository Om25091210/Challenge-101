import { useState } from 'react';

const RewardList = ({
  levels,
  battlepass,
  type,
  rewardPerPage,
  rewardVisited
}) => {
  const displayRewards = levels
    .slice(rewardVisited, rewardVisited + rewardPerPage)
    .map((display) => {
      return display.reward.map((rwd) =>
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
      );
    });

  return <>{displayRewards}</>;
};

export default RewardList;
