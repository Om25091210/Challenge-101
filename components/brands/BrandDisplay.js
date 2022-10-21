import React from 'react';
import BrandFollow from './BrandFollow';

const BrandDisplay = ({ brandData, user }) => {
  return (
    <>
      <div>
        <div className="main_middle profile_middle">
          <div className="profile_box tournament_dp_box games_page">
            <div className="profile_cover_photo">
              {' '}
              <img
                src="/assets/media/profile/cover_bg.jpg"
                alt="cover image"
              />{' '}
            </div>
            <div className="profile_dp_box">
              <div className="profile_pic">
                {' '}
                <img src={brandData.logoUrl} alt="" />{' '}
              </div>
              <div className="profile_details">
                <div className="top_details">
                  <div className="name_box">
                    <div className="flag_tick_flow">
                      {' '}
                      <span className="game_name">{brandData.name}</span>{' '}
                      <div className="tick">
                        {/* {' '}
                      <span className="active">
                        {' '}
                        <i className="fa fa-check" aria-hidden="true"></i>{' '}
                      </span>{' '} */}
                      </div>
                      <div className="button">
                        {' '}
                        <a href="#" className="btn">
                          {' '}
                          {/* <GameFollow game={data.games} user={user} /> */}
                          <BrandFollow brandData={brandData} user={user} />
                        </a>{' '}
                      </div>
                    </div>
                    <span className="follower">
                      {brandData.followers?.length} Followers
                    </span>
                  </div>
                </div>
              </div>
              {/* <div className="bottom_details games_bottom">
            <div className="games_btn_thumb">
              <a href="#" className="btn">
                {' '}
                <i className="fa fa-steam-square" aria-hidden="true"></i>{' '}
                Download at Steam <span>free</span>
              </a>
              <a href="#" className="btn">
                {' '}
                <i className="fa fa-cloud-download" aria-hidden="true"></i> PS
                Store <span>free</span>
              </a>
            </div>
          </div> */}
            </div>
            {/* <div className="tournament_sponsers">
          <div className="logos">
            <h5>OFFICIAL TOURNAMENTS</h5>
            {tournaments.length > 0 ? (
              <>
                {tournaments &&
                  tournaments.slice(0, 3).map((tournament) => (
                    <span>
                      <img
                        src={tournament.tournament.imgUrl}
                        alt={tournament.tournament.name}
                      />{' '}
                    </span>
                  ))}
              </>
            ) : (
              <p>No Official Tournaments</p>
            )}
          </div>
        </div> */}
            <div className="bio_box  game_bio">
              <div className="left_bio">
                <div className="top_bio">
                  <h3>ABOUT THE BRAND</h3>
                  <div className="socail">
                    {brandData.social?.facebook ? (
                      <a
                        href={`https://www.facebook.com/${brandData?.social?.facebook}`}
                        target="_blank"
                      >
                        <i
                          className="fa fa-facebook-official"
                          aria-hidden="true"
                        ></i>
                      </a>
                    ) : null}
                    {brandData.social?.instagram ? (
                      <a
                        href={`https://www.instagram.com/${brandData?.social?.instagram}`}
                        target="_blank"
                      >
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </a>
                    ) : null}

                    {brandData.social?.twitch ? (
                      <a
                        href={`https://www.twitch.tv/${brandData?.social?.twitch}`}
                        target="_blank"
                      >
                        <i className="fa fa-twitch" aria-hidden="true"></i>
                      </a>
                    ) : null}

                    {brandData.social?.youtube ? (
                      <a
                        href={`https://www.youtube.com/c/${brandData.social?.youtube}`}
                        target="_blank"
                      >
                        <i className="fa fa-youtube" aria-hidden="true"></i>
                      </a>
                    ) : null}

                    {brandData.social?.discord ? (
                      <a
                        href={`https://${brandData.social?.discord}`}
                        target="_blank"
                      >
                        <img
                          src="/assets/media/social/discord.png"
                          height="20px"
                          width="20px"
                        />
                      </a>
                    ) : null}

                    {brandData.social?.website ? (
                      <a
                        href={`https://${brandData.social?.website}`}
                        target="_blank"
                      >
                        <i className="fa fa-globe" aria-hidden="true"></i>
                      </a>
                    ) : null}
                  </div>
                </div>
                <p>{brandData?.description} </p>

                {/* <div className="games">
              <h3>PUBLISHER: </h3>
              <span>
                {' '}
                {!game?.publisher || game?.publisher.length === 0 ? (
                  <p>No publisher...</p>
                ) : (
                  <>
                    <img src={game?.publisher.imgUrl} />{' '}
                    <b>{game?.publisher.name}</b>
                  </>
                )}
              </span>
            </div> */}

                {/* <div className="games">
              <h3>PLATFORM: </h3>
              <p>{game?.platform}</p>{' '}
            </div> */}
              </div>
              <div className="right_team_bio">
                {/* <div className="games">
                <h2>PLAYERS: </h2>
                <a href="#" target="_blank">
                  {' '}
                  <img src={newPlyr[0]?.current_team?.image_url} alt="" />{' '}
                </a>{' '}
                <a href="#">
                  {' '}
                  <img src={newPlyr[1]?.current_team?.image_url} alt="" />{' '}
                </a>{' '}
                <a href="#" target="_blank">
                  {' '}
                  <img src={newPlyr[2]?.current_team?.image_url} alt="" />{' '}
                </a>{' '}
                {players.length === 0 ? (
                  <p>No Players for This Game.</p>
                ) : (
                  <p> + {players.length - 3} </p>
                )}
              </div> */}
                {/* <div className="internet games_internet">
                <ul>
                  <li>
                    {' '}
                    LEAgUES/TOURNAMENTS: <b>+87</b>{' '}
                  </li>
                  <li>
                    {' '}
                    COMMUNITIES: <b>+506</b>{' '}
                  </li>
                  <li>
                    {' '}
                    steaming: <b>+744</b>{' '}
                  </li>
                </ul>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandDisplay;
