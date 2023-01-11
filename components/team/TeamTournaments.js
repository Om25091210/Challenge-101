import React from 'react';

const TeamTournaments = ({ data }) => {
  return (
    <>
      <div className="team_member no-bdr">
        <ul>
          {data.tournament && data.tournament.length > 0 ? (
            data.tournament.map((tournament) => (
              <li>
                <div className="dp">
                  <img src={tournament.imgUrl} alt={tournament.name} />
                </div>
                <h2>
                  <a href={`/tour/${tournament.name}`} target="_blank">
                    {tournament.name}
                  </a>
                </h2>
              </li>
            ))
          ) : (
            <p>No Tournament's Registered.</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default TeamTournaments;
