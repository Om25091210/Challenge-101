import React, { useState } from 'react';

const GameMaps = ({ gameId, maps, states }) => {
  const handleMapSubmit = async (mapName) => {
    let isMapPresent = states.selectedMaps.indexOf(mapName);
    if (isMapPresent < 0) {
      states.selectedMaps.push(mapName);
    } else {
      states.selectedMaps.splice(isMapPresent, 1);
    }
  };

  return (
    <>
      {gameId === 20 || gameId === 3 ? (
        <div style={{ display: 'flex' }}>
          {maps &&
            maps.map((map) => (
              <div
                style={{ margin: '0 10px', cursor: 'pointer' }}
                onClick={() => handleMapSubmit(map._id)}
              >
                <img
                  src={map.imgUrl}
                  alt={map.name}
                  style={{ height: '60px', width: '90px' }}
                />
                <p>{map.name}</p>
              </div>
            ))}
        </div>
      ) : (
        'No map for selected game'
      )}
    </>
  );
};

export default GameMaps;
