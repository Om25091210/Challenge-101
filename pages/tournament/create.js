import { useState, useEffect, useMemo } from 'react';
import Script from 'next/script';
import Head from 'next/head';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import Match from '@components/calendar/match';
import FooterMain from '@components/FooterMain';
import AllScript from '../AllScript';
import baseURL from '@utils/baseURL';
import axios from 'axios';

import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import cookie from 'js-cookie';
import { tournamentformvalidate } from '@utils/valid';
import Router from 'next/router';
import TournamentAddSponsor from '../../components/tournament/TournamentAddSponsor';
import countryList from 'react-select-country-list';

const CreateTournament = ({ user }) => {
  const showSecond = false;
  const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

  const [games, setGames] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [series, setSeries] = useState([]);
  const [step1, setStep1] = useState(false);
  const [showbtn, setShowbtn] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [newSpon, setNewSpon] = useState({
    sponsor: [],
    organizer: []
  });
  const [selectGames, setSelectGames] = useState({
    game: ''
  });

  const [state, setState] = useState({
    user: user._id,
    name: '',
    imgUrl: '/assets/media/default/tournament.jpg',
    coverPhoto: '/assets/media/profile/cover_bg.jpg',
    game: '',
    currency: '$',
    prizepool: null,
    category: '',
    tournamentType: '',
    Type: '',
    participants: 0,
    minParticipants: 0,
    entranceFee: null,
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    address: '',
    organizer: newSpon.organizer || '',
    // cohosts: '',
    sponsor: newSpon.sponsor || '',
    description: '',
    // tickets: '',
    website: '',
    facebook: '',
    twitch: '',
    instagram: '',
    youtube: '',
    discord: '',
    file: null,
    series: null,
    numberOfTeam: null,
    playType: '',
    minTeams: null,
    platform: ''
  });

  const options = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    //Games
    axios.get(`${baseURL}/api/all/games`).then((res) => setGames(res.data));

    //Organizers
    axios
      .get(`${baseURL}/api/all/organizers`)
      .then((res) => setOrganizers(res.data));

    //Sponsors
    axios
      .get(`${baseURL}/api/all/sponsors`)
      .then((res) => setSponsors(res.data));

    //Series
    axios.get(`${baseURL}/api/all/series`).then((res) => setSeries(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      let tourdata = state;

      try {
        console.log(tourdata);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tourdata)
        };
        const dt = fetch(
          `${baseURL}/api/tournaments/create`,
          requestOptions
        ).then((data) => data.json());

        toast.success('Your Tournament has been successfully created!! ');
        Router.push('/tournament');
      } catch (err) {
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
    }
  };

  function handleChange(e) {
    if (e.target.options) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setState({ ...state, [e.target.name]: value });
    } else if (e.target.files) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  }

  const handleChangeCheck = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const showstep2 = () => {
    if (!(state.name === '' || state.game === '' || state.prizepool === null)) {
      setStep1(true);
      setShowbtn(false);
    }
  };

  const showstep1 = () => {
    setStep1(false);
    setShowbtn(true);
  };

  let gamePlatform = games.filter((game) => game._id === selectGames.game);

  const handleGame = (e, gameId) => {
    e.preventDefault();
    setSelectGames({ game: gameId });
    state.game = gameId;
  };

  const handleSelect = (e, plt) => {
    e.preventDefault();
    state.platform = plt;
  };

  useEffect(() => {
    $('.game_search_result li').click(function () {
      $('.game_search_result li').removeClass('slc_img');

      $(this).addClass('slc_img');
    });

    $('.big_btn input[type="radio"]').click(function () {
      $(this).parent().siblings('.big_btn').removeClass('radio_bg');
      $(this).parent().addClass('radio_bg');
    });

    $('.console_bg').click(function () {
      $('.console_bg').removeClass('active');
      $(this).addClass('active');
    });
  });

  return (
    <>
      <MetaDash />
      <SignedHeader user={user} />
      <LeftNav user={user} />
      <div className="main_middle create_main_middle">
        <div className="white_bg ">
          <div className="create_form_box">
            <div className="left_create_form">
              <img src="/assets/media/create_left_img.jpg" />

              <div className="create_heads">
                <h1>Create Tournament</h1>
                <p>
                  Create tournament page and invite hundrends of gamers to
                  participate. Boost to increase the reach.
                </p>
              </div>
            </div>

            <div className="create_tournament">
              <form onSubmit={handleSubmit}>
                {!step1 ? (
                  <>
                    <h2>Step1</h2>

                    <label htmlFor="exampleFormControlInput1">Type</label>
                    <div className="btn_selection">
                      <div className="big_btn">
                        <span class="form-check-label terms"> Ladder</span>
                        <input
                          type="radio"
                          name="Type"
                          id=""
                          value="Ladder"
                          onChange={handleChangeCheck}
                        />
                      </div>

                      <div className="big_btn">
                        <span class="form-check-label terms"> Competition</span>
                        <input
                          type="radio"
                          name="Type"
                          id=""
                          value="Competition"
                          onChange={handleChangeCheck}
                        />
                      </div>

                      <div className="big_btn">
                        <span class="form-check-label terms"> Tournament</span>
                        <input
                          type="radio"
                          name="Type"
                          id=""
                          value="Tournament"
                          placeholder="Tournament"
                          onChange={handleChangeCheck}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label for="exampleFormControlInput1">
                        Tournament Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="name"
                        name="name"
                        onChange={handleChange}
                        value={state.name}
                      />
                      <p>{formErrors.name}</p>
                      {state.name && state.name.length > 64 ? (
                        <p className="char_limit reds">
                          {state.name.length} / 64
                        </p>
                      ) : (
                        <p className="char_limit ">{state.name.length} / 64</p>
                      )}
                    </div>
                    <div className="form-group">
                      <div className="style_file_upload">
                        <input
                          type="file"
                          name="imgUrl"
                          id="imgUrl"
                          className="inputfile"
                          onChange={handleChange}
                        />
                        <label for="imgUrl">
                          <span>Upload Logo</span>
                        </label>
                      </div>
                      <div className="style_file_upload cover_img">
                        <input
                          type="file"
                          name="coverPhoto"
                          id="coverPhoto"
                          className="inputfile inputfile-2"
                          onChange={handleChange}
                        />
                        <label for="coverPhoto">
                          <span>Upload Cover Photo</span>
                        </label>
                      </div>
                    </div>

                    <label for="exampleFormControlInput1">Games</label>
                    <ul className="game_search_result">
                      {games.map((game) => (
                        <>
                          <li onClick={(e) => handleGame(e, game._id)}>
                            <img src={game.imgUrl} alt={game.name} />
                            <i class="fa fa-check" aria-hidden="true"></i>
                          </li>
                        </>
                      ))}
                    </ul>

                    <div className="form-group">
                      <label for="exampleFormControlInput1">
                        Series (Optional)
                      </label>
                      <select
                        className="game_search_result mscrollbar"
                        name="series"
                        value={state.series}
                        onChange={handleChange}
                      >
                        {series &&
                          series.map((ser, idx) => (
                            <option key={idx} value={ser._id}>
                              {' '}
                              {ser.name}{' '}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label for="exampleFormControlInput1">Prize Pool</label>
                      <div className="prize_boxs">
                        {gamePlatform &&
                          gamePlatform.map((game) => (
                            <>
                              <div className="select_img">
                                <img src={game.imgUrl} alt="" />
                              </div>

                              {game.platform.map((plt) => (
                                <>
                                  <div className="console_bg">
                                    {' '}
                                    {plt === 'PC' ? (
                                      <a
                                        href="#"
                                        onClick={(e) => handleSelect(e, plt)}
                                      >
                                        <img
                                          src="/assets/media/discover/desk.png"
                                          alt={game.name}
                                        />
                                      </a>
                                    ) : null}
                                    {plt === 'Console' ? (
                                      <a
                                        href="#"
                                        onClick={(e) => handleSelect(e, plt)}
                                      >
                                        <img
                                          src="/assets/media/discover/console.png"
                                          alt={game.name}
                                        />
                                      </a>
                                    ) : null}
                                    {plt === 'Mobile' ? (
                                      <a
                                        href="#"
                                        onClick={(e) => handleSelect(e, plt)}
                                      >
                                        <img
                                          src="/assets/media/discover/mobile_game.png"
                                          alt={game.name}
                                        />
                                      </a>
                                    ) : null}
                                  </div>
                                </>
                              ))}
                            </>
                          ))}

                        <select
                          name="currency"
                          id="currency"
                          onChange={handleChangeCheck}
                          value={state.currency}
                        >
                          <option value="$">USD($)- Dollars</option>
                          <option value="Rs">INR (Rs) - Rupees</option>
                        </select>
                        <input
                          type="number"
                          className="form-control"
                          placeholder=""
                          name="prizepool"
                          onChange={handleChange}
                          value={state.prizepool}
                        />
                      </div>
                      <p>{formErrors.prizepool}</p>
                    </div>

                    <div className="form-group">
                      <label for="exampleFormControlTextarea1">
                        Tournament Category
                      </label>
                      <div className="btn_selection">
                        <div className="big_btn">
                          <span class="form-check-label terms"> Online</span>
                          <input
                            type="radio"
                            name="category"
                            id=""
                            value="Online"
                            onChange={handleChangeCheck}
                          />
                        </div>

                        <div className="big_btn">
                          <span class="form-check-label terms"> LAN</span>
                          <input
                            type="radio"
                            name="category"
                            value="LAN"
                            onChange={handleChangeCheck}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="exampleFormControlTextarea1">
                        Tourament Type
                      </label>
                      <div className="btn_selection">
                        <div className="big_btn">
                          <span class="form-check-label terms">
                            {' '}
                            Leaderboard
                          </span>
                          <input
                            type="radio"
                            name="tournamentType"
                            id=""
                            value="Leaderboard"
                            onChange={handleChangeCheck}
                          />
                        </div>

                        <div className="big_btn">
                          <span class="form-check-label terms">
                            {' '}
                            Single Elimination
                          </span>
                          <input
                            type="radio"
                            name="tournamentType"
                            id=""
                            value="Single Elimination"
                            onChange={handleChangeCheck}
                          />
                        </div>

                        <div className="big_btn">
                          <span class="form-check-label terms">
                            {' '}
                            Double Elimination
                          </span>
                          <input
                            type="radio"
                            name="tournamentType"
                            id=""
                            value="Double Elimination"
                            onChange={handleChangeCheck}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h2>Step2</h2>

                    <div className="form-group">
                      <label for="exampleFormControlTextarea1">
                        Tournament Format
                      </label>
                      <div className="btn_selection">
                        <div className="big_btn">
                          <span class="form-check-label terms">Solo</span>
                          <input
                            type="radio"
                            name="playType"
                            value="SOLO"
                            onChange={handleChangeCheck}
                          />
                        </div>

                        <div className="big_btn">
                          <span class="form-check-label terms">Teams</span>
                          <input
                            type="radio"
                            name="playType"
                            value="TEAMS"
                            onChange={handleChangeCheck}
                          />
                        </div>
                      </div>
                    </div>
                    {state.playType === 'SOLO' ? (
                      <>
                        <div className="form-group">
                          <div className="colm">
                            <label for="exampleFormControlTextarea1">
                              Number of Participants
                            </label>
                            <input
                              type="number"
                              name="participants"
                              className="form-control"
                              onChange={handleChange}
                              value={state.participants}
                              placeholder=""
                            />
                          </div>

                          <div className="colm">
                            <label for="exampleFormControlTextarea1">
                              Minimum Participants
                            </label>
                            <input
                              type="number"
                              name="minParticipants"
                              className="form-control"
                              onChange={handleChange}
                              value={state.minParticipants}
                              placeholder=""
                            />
                          </div>
                        </div>
                      </>
                    ) : null}
                    {state.playType === 'TEAMS' ? (
                      <>
                        <div className="form-group">
                          <label for="exampleFormControlTextarea1">
                            Number of Teams
                          </label>
                          <input
                            type="number"
                            name="numberOfTeam"
                            className="form-control"
                            onChange={handleChange}
                            value={state.numberOfTeam}
                          />
                        </div>
                        <div className="form-group">
                          <label for="exampleFormControlTextarea1">
                            Minimum Teams
                          </label>
                          <input
                            type="number"
                            name="minTeams"
                            className="form-control"
                            onChange={handleChange}
                            value={state.minTeams}
                          />
                        </div>
                      </>
                    ) : null}
                    <div className="form-group">
                      <div className="colm">
                        <label for="exampleFormControlTextarea1">
                          Entrance fee
                        </label>
                        <input
                          type="number"
                          name="entranceFee"
                          className="form-control"
                          onChange={handleChange}
                          value={state.entranceFee}
                          placeholder="$"
                        />
                        <p>{formErrors.entranceFee}</p>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="date_time">
                        <div className="date_box">
                          <label for="exampleFormControlTextarea1">
                            Session Start Date
                          </label>
                          <input
                            type="date"
                            name="startDate"
                            onChange={handleChange}
                            value={state.startDate}
                          />
                          <p>{formErrors.startDate}</p>
                        </div>
                        <div className="time_box">
                          <label for="exampleFormControlTextarea1">
                            Session Start Time
                          </label>
                          <input
                            type="time"
                            name="startTime"
                            onChange={handleChange}
                            value={state.startTime}
                          />
                          {/* <p>{formErrors.startTime}</p> */}
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="date_time">
                        <div className="date_box">
                          <label for="exampleFormControlTextarea1">
                            Session End Date
                          </label>
                          <input
                            type="date"
                            name="endDate"
                            onChange={handleChange}
                            value={state.endDate}
                          />
                          <p>{formErrors.endDate}</p>
                        </div>
                        <div className="time_box">
                          <label for="exampleFormControlTextarea1">
                            Session End Time
                          </label>
                          <input
                            type="time"
                            name="endTime"
                            value={state.endTime}
                            onChange={handleChange}
                          />
                          {/* <p>{formErrors.endTime}</p> */}
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="colm">
                        <label for="exampleFormControlInput1">
                          Sponsors (Optional)
                        </label>
                        <TournamentAddSponsor
                          states={newSpon}
                          sponsors={sponsors}
                          type="SPONSORS"
                        />
                      </div>

                      <div className="colm">
                        <label for="exampleFormControlInput1">
                          Organizer (Optional)
                        </label>
                        <TournamentAddSponsor
                          states={newSpon}
                          sponsors={organizers}
                          type="ORGANIZER"
                        />
                      </div>

                      <div className="colm">
                        <label htmlFor="exampleFormControlInput1">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          placeholder="Address"
                          onChange={handleChange}
                          value={state.address}
                        />
                        <p>{formErrors.address}</p>
                      </div>

                      <div className="colm">
                        <label for="exampleFormControlInput1">Location</label>
                        <select name="location" onChange={handleChangeCheck}>
                          <option value="">Select Location...</option>
                          {options &&
                            options.map((opt) => (
                              <>
                                <option value={opt.value}>{opt.label}</option>
                              </>
                            ))}
                        </select>
                        <p>{formErrors.location}</p>
                      </div>

                      {/* <div className="colm">
                        <label for="exampleFormControlInput1">
                          Add Cohosts (Optional)
                        </label>
                        <input
                          type="text"
                          name="cohosts"
                          className="form-control"
                          placeholder="Add Cohosts"
                          onChange={handleChange}
                          value={state.cohosts}
                        />
                      </div> */}

                      <div className="colm">
                        <label for="exampleFormControlInput1">
                          Description
                        </label>
                        <input
                          type="text"
                          name="description"
                          className="form-control"
                          placeholder="Description"
                          onChange={handleChange}
                          value={state.description}
                        />
                        <p>{formErrors.description}</p>
                      </div>
                      {/* <div className="colm">
                        <label for="exampleFormControlInput1">
                          Tickets (Optional)
                        </label>
                        <input
                          type="number"
                          name="tickets"
                          className="form-control"
                          placeholder="Tickets"
                          onChange={handleChange}
                          value={state.tickets}
                        />
                      </div> */}
                      <div className="colm">
                        <label for="exampleFormControlInput1">
                          Website (Optional)
                        </label>
                        <input
                          type="text"
                          name="website"
                          className="form-control"
                          placeholder="Enter Website Name with Extension"
                          onChange={handleChange}
                          value={state.website}
                        />
                      </div>
                      <div className="colm full_width">
                        <label htmlFor="exampleFormControlInput1">
                          Social Links (Optional)
                        </label>
                        <ul className="socail_url">
                          <li>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your Facebook user ID as per the URL"
                              name="facebook"
                              onChange={handleChange}
                              value={state.facebook}
                            />
                          </li>
                          <li>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your Twitch Channel name as per the URL"
                              name="twitch"
                              onChange={handleChange}
                              value={state.twitch}
                            />
                          </li>
                          <li>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter @Twitter Name"
                              name="twitter"
                              onChange={handleChange}
                              value={state.twitter}
                            />
                          </li>
                          <li>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your Instagram User Name"
                              name="instagram"
                              onChange={handleChange}
                              value={state.instagram}
                            />
                          </li>
                          <li>
                            {' '}
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your Youtube Channel Name as per the URL"
                              name="youtube"
                              onChange={handleChange}
                              value={state.youtube}
                            />
                          </li>
                          <li>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your full Discord server link"
                              name="discord"
                              onChange={handleChange}
                              value={state.discord}
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <input
                      type="submit"
                      className="btn"
                      value="Create Tournament"
                      onClick={() =>
                        setFormErrors(tournamentformvalidate(state))
                      }
                    />
                  </>
                )}
              </form>
              <button
                onClick={showstep1}
                className={`btn rgtside ${showbtn ? 'd-none' : ''}`}
              >
                Back
              </button>{' '}
              <button
                className={`btn rgtside ${showbtn ? '' : 'd-none'}`}
                onClick={showstep2}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
      <AllScript />
      <script></script>
    </>
  );
};

export default CreateTournament;
