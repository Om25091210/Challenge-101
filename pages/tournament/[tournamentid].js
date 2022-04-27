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

const TournamentDetail = ({ user, data, products }) => {
  if (data) {
    const [showform, setShowForm] = useState(false);
    const [desc, setDesc] = useState(
      data.tournament ? data.tournament.description : null
    );
    const [tour, setTour] = useState(data.tournament);
    const isUser = data.tournament?.user?._id === user._id;
    const router = useRouter();

    const toggleShowform = () => {
      if (showform) {
        setShowForm(false);
      } else {
        setShowForm(true);
      }
    };

    const refreshData = () => {
      router.replace(router.asPath);
    };

    const onChange = (e) => {
      setDesc(e.target.value);
    };

    const addingDesc = async () => {
      const res = await fetch(
        `${baseURL}/api/tournaments/${data.tournament._id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            desc
          }),
          headers: {
            'Content-type': 'application/json'
          }
        }
      );
      return res.json();
    };
    const handleButtonForm = (e) => {
      addingDesc();
      setShowForm(false);
      refreshData();
    };

    const handleSubmitphno = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(
          `${baseURL}/api/tournaments/tourdetails/${data.tournament._id}`,
          {
            method: 'PATCH',
            body: JSON.stringify({
              tour
            }),
            headers: {
              'Content-type': 'application/json'
            }
          }
        );
        toast.success(
          'Your Tournament Details has been Updated successfully! '
        );
      } catch (err) {
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
      $('a.model_close').parent().removeClass('show_model');
      refreshData();
    };

    function handleChangeTour(e) {
      setTour({ ...tour, [e.target.name]: e.target.value });
    }

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
                              FOLLOW
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
                      <span className="name">
                        Indoor Stadium, {data.tournament.location}
                        <p>
                          {' '}
                          {Moment(data.tournament.startDate).format('MMM DD')} -
                          {Moment(data.tournament.endDate).format('MMM DD')}{' '}
                          {Moment(data.tournament.startDate).format('hh:mm A')}{' '}
                        </p>
                      </span>{' '}
                      <span className="follower">
                        {data.tournament?.description}
                      </span>{' '}
                    </div>
                  </div>
                </div>

                <div className="bottom_details">
                  <div className="two_btns">
                    <a href="#" className="btn">
                      REGISTER
                    </a>{' '}
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
                  <h5>Prize</h5>
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
                      <a href="https://www.facebook.com/" target="_blank">
                        <i
                          className="fa fa-facebook-official"
                          aria-hidden="true"
                        ></i>
                      </a>
                      <a href="https://www.instagram.com/" target="_blank">
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </a>
                      <a href="https://www.twitch.tv/" target="_blank">
                        <i className="fa fa-twitch" aria-hidden="true"></i>
                      </a>
                      <a href="https://store.steampowered.com/" target="_blank">
                        <i
                          className="fa fa-steam-square"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </div>
                  </div>
                  {isUser ? (
                    <button className="bio_edit" onClick={toggleShowform}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                  ) : null}

                  {!showform ? (
                    <p>
                      {' '}
                      {data.tournament ? data.tournament.description : ''}{' '}
                    </p>
                  ) : null}

                  {showform ? (
                    <form onSubmit={(e) => e.preventDefault()}>
                      <textarea
                        name="text"
                        value={desc}
                        onChange={onChange}
                      ></textarea>
                      <button onClick={handleButtonForm} className="btn">
                        Update
                      </button>
                    </form>
                  ) : (
                    ''
                  )}

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
                    <a href="#">
                      <img src="/assets/media/category/1.png" alt="" />
                    </a>
                    <a href="#">
                      <img src="/assets/media/category/2.png" alt="" />
                    </a>
                    <a href="#">
                      <img src="/assets/media/category/3.png" alt="" />
                    </a>
                  </div>
                </div>
                <div className="right_team_bio">
                  <div className="games">
                    <h2>GAMES</h2>

                    <>
                      {data.games &&
                        data.games.map((item, index) => (
                          <span key={index}>
                            <img src={item.imgUrl} alt={item.name} />
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

                    <span>
                      <div>
                        {' '}
                        <a
                          href="#!"
                          className="model_show_btn"
                          alt="personal details"
                        >
                          {isUser ? (
                            <button className="btn">Tournament Edit</button>
                          ) : null}
                        </a>
                        <div className="common_model_box">
                          <a href="#!" className="model_close">
                            X
                          </a>
                          <div className="inner_model_box">
                            <h3>Tournament Detail's</h3>
                            <form
                              onSubmit={handleSubmitphno}
                              className="common_form"
                            >
                              <div className="form-group">
                                <div className="colm">
                                  <label htmlFor="exampleFormControlInput1">
                                    Category
                                  </label>
                                  <select
                                    name="category"
                                    id="category"
                                    className="form-control"
                                    value={tour?.category}
                                    onChange={handleChangeTour}
                                  >
                                    <option value="--">--</option>
                                    <option value="Death Match">
                                      Death Match
                                    </option>
                                    <option value="Survival">Survival</option>
                                    <option value="Online">Online</option>
                                    <option value="Lan">LAN</option>
                                  </select>
                                </div>
                                <div className="colm">
                                  <label htmlFor="exampleFormControlInput1">
                                    Registration
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder=""
                                    name="entranceFee"
                                    onChange={handleChangeTour}
                                    value={tour?.entranceFee}
                                  />
                                </div>
                                <div className="colm">
                                  <label htmlFor="exampleFormControlInput1">
                                    PlayOut
                                  </label>
                                  <select
                                    name="playout"
                                    id="playout"
                                    className="form-control"
                                    value={tour?.playout}
                                    onChange={handleChangeTour}
                                  >
                                    <option value="--">--</option>
                                    <option value="RoundRobin">
                                      Round Robin
                                    </option>
                                    <option value="Single Elimination">
                                      Single Elimination
                                    </option>
                                    <option value="Double Elimination">
                                      Double Elimination
                                    </option>
                                  </select>
                                </div>
                                <div className="colm">
                                  <label htmlFor="exampleFormControlInput1">
                                    Elimination
                                  </label>
                                  <select
                                    name="tournamentType"
                                    className="form-control"
                                    value={tour?.tournamentType}
                                    onChange={handleChangeTour}
                                  >
                                    <option value="--">--</option>
                                    <option value="Single Elimination">
                                      Single Elimination
                                    </option>
                                    <option value="Double Elimination">
                                      Double Elimination
                                    </option>
                                    <option value="Leaderboard">
                                      Leaderboard
                                    </option>
                                  </select>
                                </div>
                                <button className="btn">Update</button>
                              </div>
                            </form>
                          </div>
                          <div className="overlay"></div>
                        </div>
                      </div>
                    </span>
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
                <a href="#!" rel="series">
                  TOURNAMENT SERIES
                </a>
              </li>
              <li>
                <a href="#!" rel="participants">
                  {' '}
                  PARTICIPANTS
                </a>
              </li>
              <li>
                <a href="#!" rel="matches">
                  Matches
                </a>
              </li>
              <li>
                <a href="#!" rel="result">
                  SCHEDULE/RESULTS
                </a>
              </li>
              <li>
                <a href="#!" rel="store">
                  {' '}
                  Store
                </a>
              </li>
              <li>
                <a href="#!" rel="video">
                  VIDEOS/STREAMS{' '}
                </a>
              </li>
              <li>
                <a href="#!" rel="media">
                  MEDIA
                </a>
              </li>
              <li>
                <a href="#!" rel="sponsors">
                  Sponsors
                </a>
              </li>
              <li>
                <a href="#!" rel="rigs">
                  Rigs
                </a>
              </li>
            </ul>
            <div className="prfoile_tab_data">
              <div className="tab" id="overview">
                Overview
              </div>
              <div className="tab hide" id="series">
                <TournamentSeries user={user} tournament={data.tournament} />
              </div>
              <div className="tab hide" id="participants">
                <TournamentParticipants
                  user={user}
                  tournament={data.tournament}
                />
              </div>
              <div className="tab hide" id="matches">
                <Matches teamMatches={data.tournamentMatches} />
              </div>
              <div className="tab hide" id="result">
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
              <div className="tab hide" id="rigs">
                <h2>Rigs</h2>
              </div>
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
