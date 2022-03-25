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
import { teamformvalidate } from '@utils/valid';
import countryList from 'react-select-country-list';

const CreateTeam = ({ user }) => {
  const showSecond = true;
  const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

  const [team, setTeam] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [games, setGames] = useState([]);
  const [arenas, setArenas] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [step1, setStep1] = useState(false);
  const [showbtn, setShowbtn] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const options = useMemo(() => countryList().getData(), []);

  const [state, setState] = useState({
    name: '',
    imgUrl: '/assets/media/default/tournament.jpg',
    coverPhoto: '/assets/media/profile/cover_bg.jpg',
    founded: '',
    game: '',
    currency: '$',
    prizepool: null,
    region: '',
    website: '',
    description: '',
    achievements: '',
    rigs: '',
    sponsor: '',
    arena: '',
    role: '',
    sociallink: ''
  });

  useEffect(() => {
    //Games
    axios.get(`${baseURL}/api/all/games`).then((res) => setGames(res.data));

    //arenas
    axios.get(`${baseURL}/api/all/arenas`).then((res) => setArenas(res.data));

    //Sponsors
    axios
      .get(`${baseURL}/api/all/sponsors`)
      .then((res) => setSponsors(res.data));
  }, []);

  const mutation = useMutation(
    async (formdata) =>
      await axios.post(`${baseURL}/api/teams/create`, formdata, {
        headers: {
          Authorization: cookie.get('token'),
          'Content-Type': 'multipart/form-data'
        }
      })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      let formdata = new FormData();

      Object.entries(state).map(([key, value]) => {
        formdata.append(key, value);
      });

      try {
        await mutation.mutateAsync(formdata);
        toast.success('Your Team has been successfully created! ');
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
      console.log(e.target.files[0]);
      setState({ ...state, [e.target.name]: e.target.files[0] });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  }

  const showstep2 = () => {
    if (!(state.name === '' || state.founded === '' || state.game === '')) {
      setStep1(true);
      setShowbtn(false);
    }
  };

  const showstep1 = () => {
    setStep1(false);
    setShowbtn(true);
  };

  return (
    <>
      <MetaDash />
      <SignedHeader user={user} />
      <LeftNav user={user} />
      <div className="main_middle create_main_middle">
        <div className="white_bg">
          <div className="left_create_form">
            <h1>Left create team</h1>
          </div>
          <div className="create_tournament">
            <h1>Create Team</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {!step1 ? (
                <>
                  <h2>Step1</h2>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Team Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Team name"
                      name="name"
                      onChange={handleChange}
                      value={state.name}
                    />
                    <p>{formErrors.name}</p>
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
                        className="inputfile"
                        onChange={handleChange}
                      />
                      <label for="coverPhoto">
                        <span>Upload Cover Photo</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">
                      Year Founded
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Year founded"
                      name="founded"
                      onChange={handleChange}
                      value={state.founded}
                    />
                    <p>{formErrors.founded}</p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Games</label>

                    <select
                      className="form-control game_search_result"
                      multiple={true}
                      name="game"
                      value={state.game}
                      onChange={handleChange}
                    >
                      {games.map((game, idx) => (
                        <option key={idx} value={game._id}>
                          {' '}
                          {game.name}{' '}
                        </option>
                      ))}
                    </select>
                    <p>{formErrors.game}</p>
                  </div>
                </>
              ) : (
                <>
                  <h2>Step2</h2>

                  <div className="form-group">
                    <label for="exampleFormControlInput1">Prizes</label>
                    <div className="prize_box">
                      {' '}
                      <a href="#">
                        <img src="/assets/media/games/tournament1.png" />
                      </a>
                      <select
                        name="currency"
                        id="currency"
                        onChange={handleChange}
                        value={state.currency}
                      >
                        <option value="USD">USD($)- Dollars</option>
                        <option value="INR">INR (Rs) - Rupees</option>
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
                    <label htmlFor="exampleFormControlTextarea1">Country</label>
                    <select name="region" id="" onChange={handleChange}>
                      {options.map((opt) => (
                        <>
                          <option value={opt.value}>{opt.label}</option>
                        </>
                      ))}
                    </select>
                    <p>{formErrors.region}</p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Website</label>
                    <input
                      type="text"
                      className="form-control"
                      id=""
                      placeholder="Website"
                      name="website"
                      onChange={handleChange}
                      value={state.website}
                    />
                    <p>{formErrors.website}</p>
                  </div>
                  <div className="form-group">
                    <div className="colm">
                      <label htmlFor="exampleFormControlInput1">
                        Description
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Description"
                        name="description"
                        onChange={handleChange}
                        value={state.description}
                      />
                      <p>{formErrors.description}</p>
                    </div>
                    <div className="colm">
                      <label htmlFor="exampleFormControlInput1">
                        Achievements
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Achievements"
                        name="achievements"
                        onChange={handleChange}
                        value={state.achievements}
                      />
                      <p>{formErrors.achievements}</p>
                    </div>
                    <div className="colm">
                      <label htmlFor="exampleFormControlInput1">Rigs</label>
                      <select
                        className="form-control"
                        multiple={true}
                        name="rigs"
                        value={state.rigs}
                        onChange={handleChange}
                      >
                        <option> Keyboard</option>
                        <option>Mouse</option>
                        <option>Headphone</option>
                        <option>Monitor</option>
                        <option>Ghaphics Card</option>
                        <option>Processor</option>
                      </select>
                      <p>{formErrors.rigs}</p>
                    </div>
                    <div className="colm">
                      <label htmlFor="exampleFormControlInput1">Sponsors</label>
                      <select
                        className="form-control"
                        name="sponsor"
                        value={state.value}
                        multiple={true}
                        onChange={handleChange}
                      >
                        {sponsors.map((spon, idx) => (
                          <option key={idx} value={spon._id}>
                            {' '}
                            {spon.name}{' '}
                          </option>
                        ))}
                      </select>
                      <p>{formErrors.sponsor}</p>
                    </div>
                    <div className="colm">
                      <label htmlFor="exampleFormControlInput1">Arena</label>
                      <select
                        className="form-control"
                        name="arena"
                        value={state.value}
                        multiple={true}
                        onChange={handleChange}
                      >
                        {arenas.map((arn, idx) => (
                          <option key={idx} value={arn._id}>
                            {' '}
                            {arn.name}{' '}
                          </option>
                        ))}
                      </select>
                      <p>{formErrors.arena}</p>
                    </div>
                    <div className="colm">
                      <label htmlFor="exampleFormControlInput1">Team</label>
                      <select
                        className="form-control"
                        name="role"
                        value={state.value}
                        multiple={true}
                        onChange={handleChange}
                      >
                        <option> Manager</option>
                        <option>Coach</option>
                        <option>CEO</option>
                      </select>
                      <p>{formErrors.role}</p>
                    </div>
                    <div className="colm">
                      <label htmlFor="exampleFormControlInput1">
                        Social Links
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Game"
                        name="sociallink"
                        onChange={handleChange}
                        value={state.sociallink}
                      />
                      <p>{formErrors.sociallink}</p>
                    </div>
                    <div className="colm">
                      <label htmlFor="exampleFormControlInput1">
                        Let your fans know{' '}
                      </label>
                      <div className="socail">
                        {' '}
                        <a href="#" className="fa fa-facebook"></a>
                        <a href="#" className="fa fa-twitter"></a>
                        <a href="#" className="fa fa-google"></a>
                        <a href="#" className="fa fa-linkedin"></a>{' '}
                      </div>
                    </div>
                  </div>
                  <input
                    type="submit"
                    className="btn create_tourn"
                    value="Create Team"
                    onClick={() => setFormErrors(teamformvalidate(state))}
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
      <AllScript />
      <script></script>
    </>
  );
};

export default CreateTeam;
