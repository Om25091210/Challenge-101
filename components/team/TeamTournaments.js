import React from 'react';

const TeamTournaments = ({ data }) => {
  return (
    <>
      <div className="team_member no-bdr">
        <ul>
          {data.tournament &&
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
            ))}
        </ul>
      </div>
    </>
  );
};

export default TeamTournaments;
