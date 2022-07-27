import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';

import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { useQuery, useMutation } from 'react-query';
import { getTournament } from '@utils/functionsHelper';
import axios from 'axios';
import baseEsportsAPIURL from '@utils/baseEsportsAPIURL';
import { useState, useEffect } from 'react';
import { MPNumberFormat } from '@utils/helpers';
import { format } from 'date-fns';
import { getData } from '@utils/fetchData';

import baseURL from '@utils/baseURL';
import TournamentVideos from '@components/tournament/TournamentVideos';
import TournamentPhotos from '@components/tournament/TournamentPhotos';
import TournamentSeries from '@components/tournament/TournamentSeries';
import TournamentParticipants from '@components/tournament/TournamentParticipants';

import ProductList from '@components/common/ProductList';
import Matches from '@components/team/Matches';
import TournamentSponsor from '@components/tournament/TournamentSponsor';
import Moment from 'moment';
import { toast } from 'react-toastify';
import TournamentFollow from '../../components/tournament/TournamentFollow';
import AllPosts from '../../components/dashboard/AllPosts';
import TournamentRules from '../../components/tournament/TournamentRules';
import TournamentEdit from '../../components/tournament/TournamentEdit';
import Tournament_Reg from '../../components/tournament/TournamentRegister';
import ReactCountryFlag from 'react-country-flag';
import TournamentPrize from '../../components/tournament/TournamentPrize';

const TournamentDetail = ({ user, data, products, profile }) => {
  if (data) {
    const isUser = data.tournament?.user?._id === user._id;
    const router = useRouter();
    const [sociallinks, setSociallinks] = useState(data.tournament.social);
    const [websitelink, setWebsitelink] = useState(data.tournament);
    const [tournamentPosts, setTournamentPosts] = useState([]);
    const [tourRules, setTourRules] = useState([]);

    useEffect(() => {
      axios
        .get(`${baseURL}/api/posts/`)
        .then((res) => setTournamentPosts(res.data.posts));

      //Get the Tournament Rules
      axios
        .get(`${baseURL}/api/tournamentRules/${data.tournament._id}`)
        .then((res) => setTourRules(res.data));
    }, []);

    let Filteredtournamentposts = tournamentPosts.filter((tourpost) => {
      return (
        tourpost.post_type === 'Tournament' &&
        tourpost?.username === data.tournament.name
      );
    });

    const refreshData = () => {
      router.replace(router.asPath);
    };

    function handleChangeSocial(e) {
      setSociallinks({ ...sociallinks, [e.target.name]: e.target.value });
    }

    function handleChangeWebsite(e) {
      setWebsitelink({ ...websitelink, [e.target.name]: e.target.value });
    }

    const handleLinksSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.put(
          `${baseURL}/api/tournaments/sociallinks/${data.tournament._id}`,
          { sociallinks, websitelink },
          {
            headers: {
              Authorization: cookie.get('token'),
              'Content-Type': 'application/json'
            }
          }
        );
        toast.success('Links Have Been Updated');
        refreshData();
      } catch (err) {
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
    };

    const handleDeleteSubmit = async (e) => {
      e.preventDefault();
      axios.delete(`${baseURL}/api/tournaments/${data.tournament._id}`, {
        headers: {
          Authorization: cookie.get('token')
        },
        data: {
          user: user._id
        }
      });
      toast.success('Deleted Successfully');
      router.push('/dashboard');
    };

    return (
      <>
        <MetaDash />
        <SignedHeader user={user} />
        <LeftNav user={user} />

        <div>
          <div className="main_middle profile_middle">
            <div className="profile_box tournament_dp_box">
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
                  <img src="/assets/media/tournament/1.png" alt="" />{' '}
                </div>
                <div className="profile_details">
                  <div className="top_details">
                    <div className="name_box">
                      {' '}
                      <div className="flag_tick_flow">
                        <span className="game_name">
                          {' '}
                          {data.tournament
                            ? data.tournament.name
                            : 'Not Defined'}{' '}
                        </span>
                        <div className="flag"></div>
                        <div className="tick">
                          <span className="active">
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </div>
                        {isUser ? null : (
                          <div className="button">
                            <a href="#" className="btn">
                              <TournamentFollow
                                tournament={data.tournament}
                                user={user}
                              />
                            </a>
                          </div>
                        )}
                        {isUser ? (
                          <span>
                            <div className="loc_box">
                              {' '}
                              <a href="#!" className="model_show_btn">
                                <button className="btn">
                                  <i
                                    className="fa fa-trash"
                                    aria-hidden="true"
                                    style={{ color: 'white' }}
                                  ></i>
                                </button>
                              </a>
                              <div className="common_model_box">
                                <a href="#!" className="model_close">
                                  X
                                </a>

                                <div className="inner_model_box">
                                  <h3>Are You Sure?</h3>

                                  <button className="btn">No</button>
                                  <button
                                    className="btn"
                                    onClick={handleDeleteSubmit}
                                  >
                                    Yes
                                  </button>
                                </div>
                                <div className="overlay"></div>
                              </div>
                            </div>
                          </span>
                        ) : null}
                      </div>
                      <span className="follower">
                        <p> {data.tournament?.followers.length} Followers</p>
                      </span>
                      <span className="name loc_date">
                        {data.tournament?.address &&
                        data.tournament?.address?.length > 0 ? (
                          <>
                            <i className="fa fa-map-marker"></i>
                            <p>{data.tournament?.address}</p>
                          </>
                        ) : (
                          <p>Address Unavailable</p>
                        )}
                        , {data.tournament.location}{' '}
                        <span className="tour_time">
                          <i className="fa fa-clock-o"></i>{' '}
                          {Moment(data.tournament.startDate).format('MMM DD')} -
                          {Moment(data.tournament.endDate).format('MMM DD')}{' '}
                          {/* {Moment(data.tournament.startTime).format('hh:mm A')}{' '} */}
                          {data.tournament.startTime}
                        </span>
                      </span>{' '}
                      <span className="follower">
                        {data.tournament?.description}
                      </span>{' '}
                    </div>
                  </div>
                </div>

                <div className="bottom_details">
                  <div className="two_btns">
                    <Tournament_Reg
                      user={user}
                      tournament={data.tournament}
                      profile={profile}
                    />{' '}
                    <a href="#" className="btn">
                      BOOK TICKETS
                    </a>
                  </div>
                </div>
              </div>

              <div className="tournament_sponsers">
                <div className="logos">
                  <h5>SPONSORS</h5>

                  <>
                    {data.sponsors &&
                      data.sponsors.map((item, index) => (
                        <span key={index}>
                          <img src={item.imgUrl} alt={item.sponsorId} />
                        </span>
                      ))}
                  </>
                </div>

                <div className="flex prices">
                  {data.tournament.user?._id === user._id ? (
                    <div>
                      <TournamentEdit data={data} user={user} />
                    </div>
                  ) : null}
                  <h5>Prize Pool</h5>
                  {data.tournament.currency}
                  <span className="">
                    <MPNumberFormat
                      value={
                        data.tournament?.prizepool
                          ? data.tournament?.prizepool
                          : null
                      }
                      currency={data.currency}
                    />
                  </span>
                </div>
              </div>
              <div className="bio_box team_bio arena_bio">
                <div className="left_bio">
                  <div className="top_bio">
                    <h3>ABOUT THE TOURNAMENT</h3>
                    <div className="socail">
                      <a
                        href={`https://www.facebook.com/${data.tournament.social?.facebook}`}
                        target="_blank"
                      >
                        <i
                          className="fa fa-facebook-official"
                          aria-hidden="true"
                        ></i>
                      </a>
                      <a
                        href={`https://www.instagram.com/${data.tournament.social?.instagram}`}
                        target="_blank"
                      >
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </a>
                      <a
                        href={`https://www.twitch.tv/${data.tournament.social.twitch}`}
                        target="_blank"
                      >
                        <i className="fa fa-twitch" aria-hidden="true"></i>
                      </a>
                      <a
                        href={`${data.tournament.social?.discord}`}
                        target="_blank"
                      >
                        <img
                          src="/assets/media/social/discord.png"
                          height="20px"
                          width="20px"
                        />
                      </a>
                      <a
                        href={`https://www.youtube.com/c/${data.tournament.social?.youtube}`}
                        target="_blank"
                      >
                        <i className="fa fa-youtube"></i>
                      </a>
                      <a
                        href={`https://www.twitter.com/${data.tournament.social?.twitter}`}
                        target="_blank"
                      >
                        <i className="fa fa-twitter-square"></i>
                      </a>
                      <a
                        href={`https://${data.tournament?.website}`}
                        target="_blank"
                      >
                        <i className="fa fa-globe"></i>
                      </a>
                    </div>
                    <span>
                      <div className="loc_box">
                        {' '}
                        {isUser ? (
                          <a href="#!" className="model_show_btn">
                            <button className="btn">
                              <i
                                className="fa fa-gear"
                                aria-hidden="true"
                                style={{ color: 'white' }}
                              ></i>
                            </button>
                          </a>
                        ) : null}
                        <div className="common_model_box">
                          <a href="#!" className="model_close">
                            X
                          </a>

                          <div className="inner_model_box">
                            <h3>Social Links</h3>
                            <ul className="socail_urls">
                              <li>
                                <input
                                  type="text"
                                  placeholder="Facebook User ID"
                                  onChange={handleChangeSocial}
                                  value={sociallinks.facebook}
                                  name="facebook"
                                />
                              </li>
                              <li>
                                {' '}
                                <input
                                  type="text"
                                  placeholder="Instagram Username"
                                  onChange={handleChangeSocial}
                                  value={sociallinks.instagram}
                                  name="instagram"
                                />
                              </li>
                              <li>
                                {' '}
                                <input
                                  type="text"
                                  placeholder="Twitch Channel Name"
                                  onChange={handleChangeSocial}
                                  value={sociallinks.twitch}
                                  name="twitch"
                                />
                              </li>
                              <li>
                                <input
                                  type="text"
                                  placeholder="Discord Server URL"
                                  onChange={handleChangeSocial}
                                  value={sociallinks.discord}
                                  name="discord"
                                />
                              </li>
                              <li>
                                <input
                                  type="text"
                                  placeholder="Youtube Channel Name"
                                  onChange={handleChangeSocial}
                                  value={sociallinks.youtube}
                                  name="youtube"
                                />
                              </li>
                              <li>
                                {' '}
                                <input
                                  type="text"
                                  placeholder="@Twitter Username"
                                  onChange={handleChangeSocial}
                                  value={sociallinks.twitter}
                                  name="twitter"
                                />
                              </li>
                              <li>
                                {' '}
                                <input
                                  type="text"
                                  placeholder="Your Website Name with Extension"
                                  onChange={handleChangeSocial}
                                  value={sociallinks.website}
                                  name="website"
                                />
                              </li>
                            </ul>

                            <button className="btn" onClick={handleLinksSubmit}>
                              Confirm Changes
                            </button>
                          </div>
                          <div className="overlay"></div>
                        </div>
                      </div>
                    </span>
                  </div>

                  <p> {data.tournament ? data.tournament.description : ''} </p>

                  <div className="games">
                    <h3>organizer:</h3>

                    <>
                      {data.organizers &&
                        data.organizers.map((item, index) => (
                          <span key={index}>
                            <img src={item.imgUrl} alt={item.name} />{' '}
                            <b>{item.name}</b>
                          </span>
                        ))}
                    </>
                  </div>

                  <div className="games">
                    <h3>PARTICIPANTS: </h3>
                    {data.tournament.playType === 'TEAMS'
                      ? data.tournament.teams?.slice(0, 3).map((team) => (
                          <span>
                            {' '}
                            <img src={team?.teamId.imgUrl} alt="" />
                          </span>
                        ))
                      : data.tournament.registered?.slice(0, 3).map((reg) => (
                          <span>
                            {' '}
                            <img src={reg?.user?.profilePicUrl} alt="" />
                          </span>
                        ))}
                    {data.tournament.playType === 'PLAYERS' ? (
                      <>
                        {data.tournament.registered.length === 0
                          ? 'No Participants Yet'
                          : null}
                      </>
                    ) : (
                      <>
                        {data.tournament.teams.length === 0
                          ? 'No Teams Yet'
                          : null}
                      </>
                    )}
                    {data.tournament.registered.length > 3 ? (
                      <a href="#!" className="model_show_btn more">
                        +{data.tournament.registered.length - 3}
                      </a>
                    ) : null}
                    <div className="common_model_box" id="share_prof">
                      <a href="#!" className="model_close">
                        X
                      </a>

                      <div className="inner_model_box">
                        <h3>Participants</h3>
                        <ul>
                          {data.tournament.playType === 'PLAYERS' ? (
                            <>
                              {data.tournament.registered.map((ppl) => (
                                <li>
                                  <div className="game_pic">
                                    {' '}
                                    <img
                                      src={ppl.user?.profilePicUrl}
                                      alt={ppl.user?.name}
                                    />
                                  </div>
                                  <a href={`/user/${ppl.user?._id}`}>
                                    <p>{ppl.user?.name}</p>
                                  </a>
                                </li>
                              ))}
                            </>
                          ) : (
                            <>
                              {data.tournament.teams.map((team) => (
                                <li>
                                  <div className="game_pic">
                                    {' '}
                                    <img
                                      src={team.teamId?.imgUrl}
                                      alt={team.teamId?.name}
                                    />
                                  </div>
                                  <a href={`/user/${team.teamId?._id}`}>
                                    <p>{team.teamId?.name}</p>
                                  </a>
                                </li>
                              ))}
                            </>
                          )}
                        </ul>
                      </div>
                      <div className="overlay"></div>
                    </div>
                    <p className="slots">
                      {data.tournament.playType === 'TEAMS' ? (
                        <>
                          {data.tournament.teams.length} /{' '}
                          {data.tournament.maxTeams} <b> SLOTS</b>
                        </>
                      ) : (
                        <>
                          {data.tournament.registered.length} /{' '}
                          {data.tournament.participants} <b> SLOTS</b>
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <div className="right_team_bio">
                  <div className="games">
                    <h2>GAMES</h2>
                    <>
                      {data.tournament.games &&
                        data.tournament.games.map((item, index) => (
                          <span key={index}>
                            <img
                              src={item.gameId.imgUrl}
                              alt={item.gameId.name}
                            />
                          </span>
                        ))}
                    </>
                  </div>
                  <div className="internet">
                    <ul>
                      <li>
                        <b>CATEGORY</b>
                        {data.tournament.category ? (
                          <>{data.tournament.category} </>
                        ) : (
                          'No Category selected'
                        )}
                      </li>
                      <li>
                        <b>REGISTRATION </b>
                        {data.tournament.entranceFee !== 0
                          ? data.tournament.entranceFee
                          : 'Free'}
                      </li>
                      <li>
                        {' '}
                        <b>PLAYOUT </b> ROUND ROBIN{' '}
                      </li>
                      <li>
                        <b>ELIMINATION </b>
                        {data.tournament.tournamentType}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <ul className="profile_tab_btn">
              <li className="active">
                <a href="#!" rel="overview">
                  Overview
                </a>
              </li>

              <li>
                <a href="#!" rel="rules">
                  Rules
                </a>
              </li>
              <li>
                <a href="#!" rel="result">
                  Prizes/Result
                </a>
              </li>
              <li>
                <a href="#!" rel="series">
                  TOURNAMENT SERIES
                </a>
              </li>
              <li>
                <a href="#!" rel="points">
                  Points Table
                </a>
              </li>
              <li>
                <a href="#!" rel="matches">
                  Shedules/Matches
                </a>
              </li>
              <li>
                <a href="#!" rel="participants">
                  {' '}
                  PARTICIPANTS
                </a>
              </li>

              <li>
                <a href="#!" rel="braket">
                  Braket
                </a>
              </li>
              <li>
                <a href="#!" rel="store">
                  Store
                </a>
              </li>
              <li>
                <a href="#!" rel="video">
                  Streams/Media
                </a>
              </li>
              <li>
                <a href="#!" rel="sponsors">
                  Sponsors
                </a>
              </li>
            </ul>
            <div className="prfoile_tab_data">
              <div className="tab" id="overview">
                {Filteredtournamentposts.length === 0 ? (
                  <h6>No Posts Under This Team</h6>
                ) : (
                  Filteredtournamentposts.length !== 0 &&
                  Filteredtournamentposts.map((post, index) => (
                    <AllPosts
                      post={post}
                      user={user}
                      type="TournamentPost"
                      team={data.team}
                    />
                  ))
                )}
              </div>

              <div className="tab hide" id="rules">
                {data.tournament.user?._id === user._id ? (
                  <TournamentRules
                    tournamentId={data.tournament._id}
                    tourRules={tourRules}
                  />
                ) : null}

                <div className="rules_details">
                  <div className="rules_row">
                    <h2> PRIZES</h2>
                    <p>{tourRules?.prizeRules}</p>
                  </div>
                  <div className="rules_row">
                    <h2> MATCH SETTINGS</h2>
                  </div>
                  <div className="rules_row">
                    <h2> GENERAL RULES</h2>
                    <p>{tourRules?.general}</p>
                  </div>
                  <div className="rules_row">
                    <h2> HOW TO COMPETE</h2>
                    <p>{tourRules?.compete}</p>
                  </div>

                  <div className="rules_row">
                    <h2> ELIGIBLE COUNTRIES</h2>
                    {tourRules?.country?.map((cty) => (
                      <ReactCountryFlag
                        countryCode={cty}
                        svg
                        style={{
                          width: '2em',
                          height: '2em'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="tab hide" id="result">
                <TournamentPrize tournamentId={data.tournament._id} />
                <div className="new_result">
                  <div className="top_three_prize">
                    <div className="prize_box">
                      <div className="first_symb">
                        1<b>st</b>
                      </div>
                      <div className="prize_money">
                        <img src="/assets/media/result/first.png" alt="" />
                        <div className="money">
                          100,000$
                          <span>+</span>
                          <p>Gamer of Nation Trophy</p>
                        </div>
                      </div>

                      <div className="prize_foot">
                        Prizes sponsered by{' '}
                        <img src="/assets/media/result/by.png" alt="" />
                      </div>
                    </div>

                    <div className="prize_box">
                      <div className="first_symb">
                        2<b>nd</b>
                      </div>
                      <div className="prize_money">
                        <img src="/assets/media/result/second.png" alt="" />
                        <div className="money">
                          100,000$
                          <span>+</span>
                          <p>Gamer of Nation Trophy</p>
                        </div>
                      </div>

                      <div className="prize_foot">
                        Prizes sponsered by{' '}
                        <img src="/assets/media/result/by.png" alt="" />
                      </div>
                    </div>

                    <div className="prize_box">
                      <div className="first_symb">
                        3<b>rd</b>
                      </div>
                      <div className="prize_money">
                        <img src="/assets/media/result/third.png" alt="" />
                        <div className="money">
                          100,000$
                          <span>+</span>
                          <p>Gamer of Nation Trophy</p>
                        </div>
                      </div>

                      <div className="prize_foot">
                        Prizes sponsered by{' '}
                        <img src="/assets/media/result/by.png" alt="" />
                      </div>
                    </div>
                  </div>

                  <div className="more_prizes">
                    <div className="prize_box">
                      <div className="first_symb">
                        4<b>rt prize</b>
                      </div>
                      <div className="prize_money">
                        <div className="money">
                          100,000$
                          <span>+</span>
                          <p>Gamer of Nation Trophy</p>
                        </div>
                      </div>

                      <div className="prize_foot">
                        Prizes sponsered by{' '}
                        <img src="/assets/media/result/by.png" alt="" />
                      </div>
                    </div>
                    <div className="prize_box">
                      <div className="first_symb">
                        4<b>rt prize</b>
                      </div>
                      <div className="prize_money">
                        <div className="money">
                          100,000$
                          <span>+</span>
                          <p>Gamer of Nation Trophy</p>
                        </div>
                      </div>

                      <div className="prize_foot">
                        Prizes sponsered by{' '}
                        <img src="/assets/media/result/by.png" alt="" />
                      </div>
                    </div>
                    <div className="prize_box">
                      <div className="first_symb">
                        4<b>rt prize</b>
                      </div>
                      <div className="prize_money">
                        <div className="money">
                          100,000$
                          <span>+</span>
                          <p>Gamer of Nation Trophy</p>
                        </div>
                      </div>

                      <div className="prize_foot">
                        Prizes sponsered by{' '}
                        <img src="/assets/media/result/by.png" alt="" />
                      </div>
                    </div>
                    <div className="prize_box">
                      <div className="first_symb">
                        4<b>rt prize</b>
                      </div>
                      <div className="prize_money">
                        <div className="money">
                          100,000$
                          <span>+</span>
                          <p>Gamer of Nation Trophy</p>
                        </div>
                      </div>

                      <div className="prize_foot">
                        Prizes sponsered by{' '}
                        <img src="/assets/media/result/by.png" alt="" />
                      </div>
                    </div>
                    <div className="prize_box">
                      <div className="first_symb">
                        4<b>rt prize</b>
                      </div>
                      <div className="prize_money">
                        <div className="money">
                          100,000$
                          <span>+</span>
                          <p>Gamer of Nation Trophy</p>
                        </div>
                      </div>

                      <div className="prize_foot">
                        Prizes sponsered by{' '}
                        <img src="/assets/media/result/by.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab hide" id="series">
                <TournamentSeries user={user} tournament={data.tournament} />
              </div>
              <div className="tab hide" id="points">
                <h1>Points Table</h1>
                <div className="points_table">
                  <div className="groupds_box">
                    <div className="group">
                      <div className="title_bg">Group A</div>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Competitor</th>
                            <th scope="col">
                              <b>M</b> <b>W</b> <b>D</b> <b>L</b> <b>P</b>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <img src="/assets/media/teams/team1.png" alt="" />{' '}
                              <strong>Team Flawed Bot</strong>
                            </td>
                            <td>
                              <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <img src="/assets/media/teams/team2.png" alt="" />{' '}
                              <strong>Wings Gaming</strong>
                            </td>
                            <td>
                              <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <img src="/assets/media/teams/team3.png" alt="" />{' '}
                              <strong>Fnatic eSports</strong>
                            </td>
                            <td>
                              <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <img src="/assets/media/teams/team4.png" alt="" />{' '}
                              <strong>inictus Gaming</strong>
                            </td>
                            <td>
                              <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <img src="/assets/media/teams/team5.png" alt="" />{' '}
                              <strong>Fortuna eSports</strong>
                            </td>
                            <td>
                              <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <img src="/assets/media/teams/team6.png" alt="" />{' '}
                              <strong>Gambit Gaming</strong>
                            </td>
                            <td>
                              <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="group">
                      <div className="title_bg">Group B</div>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Competitor</th>
                            <th scope="col">
                              <b>M</b> <b>W</b> <b>D</b> <b>L</b> <b>P</b>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <img src="/assets/media/teams/team1.png" alt="" />{' '}
                              <strong>Team Flawed Bot</strong>
                            </td>
                            <td>
                              <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <img src="/assets/media/teams/team2.png" alt="" />{' '}
                              <strong>Wings Gaming</strong>
                            </td>
                            <td>
                              <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <img src="/assets/media/teams/team3.png" alt="" />{' '}
                              <strong>Fnatic eSports</strong>
                            </td>
                            <td>
                              <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <img src="/assets/media/teams/team4.png" alt="" />{' '}
                              <strong>inictus Gaming</strong>
                            </td>
                            <td>
                              <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <img src="/assets/media/teams/team5.png" alt="" />{' '}
                              <strong>Fortuna eSports</strong>
                            </td>
                            <td>
                              <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <img src="/assets/media/teams/team6.png" alt="" />{' '}
                              <strong>Gambit Gaming</strong>
                            </td>
                            <td>
                              <b>46</b> <b>23</b> <b>1</b> <b>22</b> <b>123</b>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab hide" id="matches">
                <Matches teamMatches={data.tournamentMatches} />
              </div>

              <div className="tab hide" id="participants">
                <TournamentParticipants
                  user={user}
                  tournament={data.tournament}
                />
              </div>

              <div className="tab hide" id="braket">
                <h1>Braket</h1>

                <div className="results_box white_bg">
                  <div className="congratulations">
                    <h1>Congragulations to our winners!</h1>
                    <div className="winner_box">
                      <div className="winner">
                        <div className="heads">
                          <img src="/assets/media/result/teams.jpg" alt="" />
                          <h4>Gambit</h4>
                        </div>
                        <div className="winner_cup cup1">
                          {' '}
                          <img
                            src="/assets/media/result/cup1.jpg"
                            alt=""
                          />{' '}
                        </div>
                      </div>
                      <div className="winner">
                        <div className="heads">
                          <img src="/assets/media/result/teams.jpg" alt="" />
                          <h4>Astralis</h4>
                        </div>
                        <div className="winner_cup cup2">
                          {' '}
                          <img
                            src="/assets/media/result/cup2.jpg"
                            alt=""
                          />{' '}
                        </div>
                      </div>
                      <div className="winner">
                        <div className="heads">
                          <img src="/assets/media/result/teams.jpg" alt="" />
                          <h4>FaZO</h4>
                        </div>
                        <div className="winner_cup cup3">
                          {' '}
                          <img
                            src="/assets/media/result/cup3.jpg"
                            alt=""
                          />{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="group_stage_box">
                    <h2>Group Stage</h2>
                    <div className="group_stage">
                      <div className="match_date">
                        <ul>
                          <li>
                            <a href="#" className="active">
                              Saturday - Day1
                              <p>20 August 2020</p>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              Friday - Day2
                              <p>20 August 2020</p>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              Thursday - Day3
                              <p>20 August 2020</p>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              Saturday - Day4
                              <p>20 August 2020</p>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="match_list">
                        <div className="team_match_row">
                          <div className="all_matches">
                            <div className="first_team">
                              {' '}
                              <img src="/assets/media/teams/team1.png" alt="" />
                              <h3>Fnatic eSports</h3>
                            </div>
                            <div className="vs">VS</div>
                            <div className="second_team">
                              {' '}
                              <img src="/assets/media/teams/team2.png" alt="" />
                              <h3>WingsGaming</h3>
                            </div>
                          </div>
                          <p>@ Statstics At 5;45PM / Group Stage1</p>
                        </div>
                        <div className="team_match_row">
                          <div className="all_matches">
                            <div className="first_team">
                              {' '}
                              <img src="/assets/media/teams/team1.png" alt="" />
                              <h3>Fnatic eSports</h3>
                            </div>
                            <div className="vs">VS</div>
                            <div className="second_team">
                              {' '}
                              <img src="/assets/media/teams/team2.png" alt="" />
                              <h3>WingsGaming</h3>
                            </div>
                          </div>
                          <p>@ Statstics At 5;45PM / Group Stage1</p>
                        </div>
                        <div className="team_match_row">
                          <div className="all_matches">
                            <div className="first_team">
                              {' '}
                              <img src="/assets/media/teams/team1.png" alt="" />
                              <h3>Fnatic eSports</h3>
                            </div>
                            <div className="vs">VS</div>
                            <div className="second_team">
                              {' '}
                              <img src="/assets/media/teams/team2.png" alt="" />
                              <h3>WingsGaming</h3>
                            </div>
                          </div>
                          <p>@ Statstics At 5;45PM / Group Stage1</p>
                        </div>
                        <div className="team_match_row">
                          <div className="all_matches">
                            <div className="first_team">
                              {' '}
                              <img src="/assets/media/teams/team1.png" alt="" />
                              <h3>Fnatic eSports</h3>
                            </div>
                            <div className="vs">VS</div>
                            <div className="second_team">
                              {' '}
                              <img src="/assets/media/teams/team2.png" alt="" />
                              <h3>WingsGaming</h3>
                            </div>
                          </div>
                          <p>@ Statstics At 5;45PM / Group Stage1</p>
                        </div>
                        <div className="team_match_row">
                          <div className="all_matches">
                            <div className="first_team">
                              {' '}
                              <img src="/assets/media/teams/team1.png" alt="" />
                              <h3>Fnatic eSports</h3>
                            </div>
                            <div className="vs">VS</div>
                            <div className="second_team">
                              {' '}
                              <img src="/assets/media/teams/team2.png" alt="" />
                              <h3>WingsGaming</h3>
                            </div>
                          </div>
                          <p>@ Statstics At 5;45PM / Group Stage1</p>
                        </div>
                        <div className="team_match_row">
                          <div className="all_matches">
                            <div className="first_team">
                              {' '}
                              <img src="/assets/media/teams/team1.png" alt="" />
                              <h3>Fnatic eSports</h3>
                            </div>
                            <div className="vs">VS</div>
                            <div className="second_team">
                              {' '}
                              <img src="/assets/media/teams/team2.png" alt="" />
                              <h3>WingsGaming</h3>
                            </div>
                          </div>
                          <p>@ Statstics At 5;45PM / Group Stage1</p>
                        </div>
                      </div>
                    </div>
                    <div className="knockout_matches">
                      <h2>Knowckout-Bracket</h2>
                      <ul>
                        <li>
                          <h4>Round1</h4>
                          <p>April 21 18:00</p>
                        </li>
                        <li>
                          <h4>Round2</h4>
                          <p>April 21 18:00</p>
                        </li>
                        <li>
                          <h4>Semifinals</h4>
                          <p>April 21 18:00</p>
                        </li>
                        <li className="active">
                          <h4>Final</h4>
                          <p>April 21 18:00</p>
                        </li>
                      </ul>
                    </div>
                    <div className="matches_postitions">
                      <div className="section section1">
                        <ul>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team1.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>United State</b>
                              </span>{' '}
                            </div>
                            <div className="points">7</div>
                          </li>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team2.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>UK</b>
                              </span>{' '}
                            </div>
                            <div className="points">7</div>
                          </li>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team3.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">7</div>
                          </li>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team4.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">1</div>
                          </li>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team5.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">7</div>
                          </li>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team6.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">6</div>
                          </li>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team1.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">3</div>
                          </li>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team2.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">4</div>
                          </li>
                        </ul>
                      </div>
                      <div className="section section2">
                        <ul>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team6.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">4</div>
                          </li>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team5.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">4</div>
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team4.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">4</div>
                          </li>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team2.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">4</div>
                          </li>
                        </ul>
                      </div>
                      <div className="section section3">
                        <ul>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team1.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">4</div>
                          </li>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team2.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="points">4</div>
                          </li>
                        </ul>
                      </div>
                      <div className="section section4">
                        <ul>
                          <li>
                            <div className="team_name">
                              {' '}
                              <span className="dp">
                                <img
                                  src="/assets/media/result/team3.png"
                                  alt=""
                                />
                              </span>{' '}
                              <span className="dp_name">
                                FayeDBebop<b>Sarah Valentine</b>
                              </span>{' '}
                            </div>
                            <div className="final_cup">
                              <i
                                className="fa fa-trophy"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <ProductList user={user} productList={products} />

              <div className="tab hide" id="video">
                <TournamentVideos
                  user={user}
                  tournament={data}
                  isUser={isUser}
                />
              </div>
              <div className="tab hide" id="media">
                <TournamentPhotos
                  user={user}
                  tournament={data}
                  isUser={isUser}
                />
              </div>
              <TournamentSponsor user={user} data={data} isUser={isUser} />
            </div>
          </div>
        </div>

        <AllScript />
      </>
    );
  } else {
    return null;
  }
};

export const getServerSideProps = async (context, query) => {
  const { tournamentid } = context.params;
  console.log(tournamentid);
  const page = query ? query.page || 1 : 1;
  const category = query ? query.category || 'all' : 'all';
  const sort = query ? query.sort || '' : '';
  const search = query ? query.search || 'all' : 'all';
  // const response = await fetch(`${baseEsportsAPIURL}/esport/tournaments/${tournamentid}`, {method:'GET',
  // headers: {'Authorization': 'Basic ' + Buffer.from('multiplyr' + ":" + 'Multiplyr123$').toString('base64')}});
  const response = await fetch(`${baseURL}/api/tournaments/${tournamentid}`);
  const data = await response.json();
  // const data = dat.data;

  const resprod = await getData(
    `product?limit=${
      page * 6
    }&category=${category}&sort=${sort}&title=${search}`
  );

  return {
    props: { data, products: resprod.products }
  };
};

export default TournamentDetail;
