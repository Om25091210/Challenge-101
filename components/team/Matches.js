import React from 'react';
import Moment from 'moment';

const Matches = ({ teamMatches }) => {
  return (
    <div className="matches_box">
      <div className="heads_bg">Upcoming Matches </div>
      {teamMatches?.length === 0 ? (
        <h5>NO team Matches</h5>
      ) : (
        teamMatches?.map((tm, idx) => (
          <div className="match_row" key={idx}>
            {tm.opponents[0] ? (
              <div className="team_a">
                {' '}
                <img
                  src={tm.opponents[0].opponent.image_url}
                  alt=""
                  className="team_logo"
                />
                <div className="team_name">
                  <h3>{tm.opponents[0].opponent.name}</h3>
                  <a href="#">
                    <img src="/assets/media/teams/user1.png" alt="" />
                  </a>{' '}
                  <a href="#">
                    <img src="/assets/media/teams/user2.png" alt="" />
                  </a>{' '}
                  <a href="#">
                    <img src="/assets/media/teams/user3.png" alt="" />
                  </a>{' '}
                  <a href="#">
                    <img src="/assets/media/teams/user4.png" alt="" />
                  </a>{' '}
                </div>
              </div>
            ) : null}

            <div className="team_vs">
              <p>
                {Moment(tm.startDate).format('MMMM, DD, YYYY hh:mm A')}
                <a href={tm.streamsList[0]?.embed_url} target="_blank">
                  View Match <i className="fa fa-play" aria-hidden="true"></i>
                </a>
              </p>
              <div className="vs">VS</div>
              <p>{tm?.game?.name}</p>
            </div>

            {tm.opponents[1] ? (
              <div className="team_b">
                {' '}
                <img
                  src={tm.opponents[1].opponent.image_url}
                  alt=""
                  className="team_logo"
                />
                <div className="team_name">
                  <h3>{tm.opponents[1].opponent.name}</h3>
                  <a href="#">
                    <img src="/assets/media/teams/user1.png" alt="" />
                  </a>{' '}
                  <a href="#">
                    <img src="/assets/media/teams/user2.png" alt="" />
                  </a>{' '}
                  <a href="#">
                    <img src="/assets/media/teams/user3.png" alt="" />
                  </a>{' '}
                  <a href="#">
                    <img src="/assets/media/teams/user4.png" alt="" />
                  </a>{' '}
                </div>
              </div>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
};

export default Matches;
