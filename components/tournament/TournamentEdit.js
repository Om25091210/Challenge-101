import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import baseURL from '../../utils/baseURL';
import { tournamentEditValidate } from '../../utils/valid';
import Moment from 'moment';
import countryList from 'react-select-country-list';

const TournamentEdit = ({ data, user }) => {
  const gameList = data.tournament.games.map((game) => game.gameId._id);
  const [states, setStates] = useState({
    tourType: 'Tournament',
    name: data.tournament.name,
    series: null,
    username: user.username,
    startDate: Moment(data.tournament?.startDate).format('yyyy-MM-DD') || '',
    startTime: data.tournament?.startTime || '',
    endDate: Moment(data.tournament?.endDate).format('yyyy-MM-DD') || '',
    endTime: data.tournament?.endTime || '',
    location: data.tournament.location,
    address: data.tournament?.address,
    organizer: '',
    description: data.tournament.description,
    games: gameList,
    category: data.tournament.category,
    registration: data.tournament.entranceFee,
    playout: data.tournament.playout,
    elimination: data.tournament.tournamentType,
    website: data.tournament.website || '',
    facebook: data.tournament.social?.facebook || '',
    instagram: data.tournament.social?.instagram || '',
    twitch: data.tournament.social?.twitch || '',
    youtube: data.tournament.social?.youtube || '',
    discord: data.tournament.social?.discord || ''
  });
  const [allorganizer, setAllorganizer] = useState([]);
  const [allgames, setAllgames] = useState([]);
  const [allseries, setAllseries] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    axios
      .get(`${baseURL}/api/all/organizers`)
      .then((res) => setAllorganizer(res.data));
    axios.get(`${baseURL}/api/all/games`).then((res) => setAllgames(res.data));
    axios
      .get(`${baseURL}/api/all/series`)
      .then((res) => setAllseries(res.data));
  }, []);

  const options = useMemo(() => countryList().getData(), []);

  function handleSubmit(e) {
    if (e.target.options) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setStates({ ...states, [e.target.name]: value });
    } else if (e.target.files) {
      console.log(e.target.files[0]);
      setStates({ ...states, [e.target.name]: e.target.files[0] });
    } else {
      setStates({ ...states, [e.target.name]: e.target.value });
    }
  }

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleChangeCheck = (e) => {
    setStates({ ...states, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      try {
        axios.put(
          `${baseURL}/api/tournaments/touredit/${data.tournament?._id}/${user._id}`,
          states
        );
        $('a.model_close').parent().removeClass('show_model');
        toast.success('Tournament Details Updated Successfully');
      } catch (err) {
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
      refreshData();
    }
  };

  return (
    <>
      <div className="loc_box">
        {' '}
        <a href="#!" className="model_show_btn">
          <button className="btn">Edit</button>
        </a>
        <div className="common_model_box edit_profile" id="big_poup">
          <a href="#!" className="model_close">
            X
          </a>

          <div className="inner_model_box">
            <div className="">
              <h3>Edit Tournament </h3>
              <form className="common_form" onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label for="exampleFormControlTextarea1">
                    Tournament Category
                  </label>

                  <div className="btn_selection">
                    <div className="big_btn">
                      <span class="form-check-label terms">Tournament</span>
                      <input
                        type="radio"
                        name="tourType"
                        value="Tournament"
                        onChange={handleChangeCheck}
                      />
                    </div>

                    <div className="big_btn">
                      <span class="form-check-label terms">Ladder</span>
                      <input
                        type="radio"
                        name="tourType"
                        value="Ladder"
                        onChange={handleChangeCheck}
                      />
                    </div>

                    <div className="big_btn">
                      <span class="form-check-label terms">Competition</span>
                      <input
                        type="radio"
                        name="tourType"
                        value="Competition"
                        onChange={handleChangeCheck}
                      />
                    </div>
                    <div className="big_btn">
                      <span class="form-check-label terms">League</span>
                      <input
                        type="radio"
                        name="tourType"
                        value="League"
                        onChange={handleChangeCheck}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={handleChangeCheck}
                      value={states.name}
                    />
                    <p>{formErrors.name}</p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">
                      Part of Series - Name
                    </label>
                    <select
                      name="series"
                      onChange={handleChangeCheck}
                      value={states.series}
                    >
                      <option value="">Select Series...</option>
                      {allseries &&
                        allseries.map((ser, idx) => (
                          <option key={idx} value={ser._id}>
                            {' '}
                            {ser.name}{' '}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      onChange={handleChangeCheck}
                      value={states.username}
                    />
                  </div>
                  <h2> Date & Time</h2>
                  <div className="edit_four">
                    <div className="form-group">
                      <input
                        type="date"
                        name="startDate"
                        onChange={handleChangeCheck}
                        value={states.startDate}
                      />
                      <p>{formErrors.startDate}</p>
                    </div>
                    <div className="form-group">
                      <input
                        type="date"
                        name="endDate"
                        onChange={handleChangeCheck}
                        value={states.endDate}
                      />
                      <p>{formErrors.endDate}</p>
                    </div>
                    <div className="form-group">
                      <input
                        type="time"
                        name="startTime"
                        onChange={handleChangeCheck}
                        value={states.startTime}
                      />
                      <p>{formErrors.startTime}</p>
                    </div>
                    <div className="form-group">
                      <input
                        type="time"
                        name="endTime"
                        onChange={handleChangeCheck}
                        value={states.endTime}
                      />
                      <p>{formErrors.endTime}</p>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Address</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      onChange={handleChangeCheck}
                      value={states.address}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Location</label>
                    <select
                      name="location"
                      onChange={handleChangeCheck}
                      value={states.location}
                    >
                      <option value="">Select Location...</option>
                      {options &&
                        options.map((opt) => (
                          <>
                            <option value={opt.value}>{opt.label}</option>
                          </>
                        ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Organizer</label>
                    <select
                      name="organizer"
                      onChange={handleSubmit}
                      value={states.organizer}
                      multiple={true}
                    >
                      <option value="">Select Organizer...</option>
                      {allorganizer &&
                        allorganizer.map((org, idx) => (
                          <option key={idx} value={org._id}>
                            {org.name}
                          </option>
                        ))}
                      <option value={user._id}>{user.name}</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Intro</label>
                    <input
                      type="textarea"
                      className="form-control"
                      name="description"
                      onChange={handleChangeCheck}
                      value={states.description}
                    />
                    <p>{formErrors.description}</p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Game</label>
                    <select
                      name="games"
                      id="team"
                      multiple={false}
                      value={states.games}
                      onChange={handleSubmit}
                    >
                      <option value="">Select Game...</option>
                      {allgames &&
                        allgames.map((game) => (
                          <option value={game._id}>{game.name}</option>
                        ))}
                    </select>
                    <p>{formErrors.games}</p>
                  </div>

                  <div className="form-group">
                    <div className="colm">
                      <label htmlFor="exampleFormControlInput1">Category</label>
                      <select
                        name="category"
                        id="category"
                        className="form-control"
                        value={states.category}
                        onChange={handleChangeCheck}
                      >
                        <option value="">Select Category...</option>
                        <option value="Death Match">Death Match</option>
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
                        name="registration"
                        onChange={handleChangeCheck}
                        value={states.registration}
                      />
                    </div>
                    <div className="colm">
                      <label htmlFor="exampleFormControlInput1">PlayOut</label>
                      <select
                        name="playout"
                        id="playout"
                        className="form-control"
                        value={states.playout}
                        onChange={handleChangeCheck}
                      >
                        <option value="">Select Playout...</option>
                        <option value="RoundRobin">Round Robin</option>
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
                        name="elimination"
                        className="form-control"
                        value={states.elimination}
                        onChange={handleChangeCheck}
                      >
                        <option value="">Elimination Type...</option>
                        <option value="Single Elimination">
                          Single Elimination
                        </option>
                        <option value="Double Elimination">
                          Double Elimination
                        </option>
                        <option value="Leaderboard">Leaderboard</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="">Social Links</label>
                    <div className="edit_four">
                      <div className="form-group">
                        <input
                          type="text"
                          name="facebook"
                          value={states.facebook}
                          onChange={handleChangeCheck}
                          className="form-control facebook"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="instagram"
                          value={states.instagram}
                          onChange={handleChangeCheck}
                          className="form-control instagram"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="twitch"
                          value={states.twitch}
                          onChange={handleChangeCheck}
                          className="form-control twitch"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="youtube"
                          value={states.youtube}
                          onChange={handleChangeCheck}
                          className="form-control youtube"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="discord"
                          value={states.discord}
                          onChange={handleChangeCheck}
                          className="form-control discord"
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          name="website"
                          onChange={handleChangeCheck}
                          value={states.website}
                          className="form-control website"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn"
                    onClick={() =>
                      setFormErrors(tournamentEditValidate(states))
                    }
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="overlay"></div>
        </div>
      </div>
    </>
  );
};

export default TournamentEdit;
