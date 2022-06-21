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
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [searchText1, setSearchText1] = useState('');
  const [rigsData, setRigsData] = useState([]);

  const [state, setState] = useState({
    name: '',
    imgUrl: '/assets/media/default/tournament.jpg',
    coverPhoto: '/assets/media/profile/cover_bg.jpg',
    founded: '',
    game: '',
    prizepool: null,
    region: '',
    website: '',
    description: '',
    achievements: '',
    sponsor: '',
    arena: '',
    role: '',
    facebook: '',
    twitch: '',
    twitter: '',
    instagram: '',
    youtube: '',
    discord: '',

    keyboard: '',
    mouse: '',
    monitor: '',
    graphicsCard: '',
    headphone: '',
    processor: ''
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

    // Rigs data
    axios.get(`${baseURL}/api/rigsdata/`).then((res) => setRigsData(res.data));
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
        router.push('/discover');
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

  const [filteredData, setFilteredData] = useState([]);
  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setSearchText(searchWord);
    const newFilter = rigsData?.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchWord.toLowerCase()) &&
        value.category === 'Keyboard'
      );
    });

    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const handleSelectedRig = (data) => {
    setSearchText(data.name);
    // $('custom-rig-tag').addClass('hide')
    state.keyboard = data._id;
  };

  const [filteredData1, setFilteredData1] = useState([]);
  const handleFilter1 = (event) => {
    const searchWord = event.target.value;

    setSearchText1(searchWord);
    const newFilter = rigsData?.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchWord.toLowerCase()) &&
        value.category === 'Mouse'
      );
    });

    if (searchText1 === '') {
      setFilteredData1([]);
    } else {
      setFilteredData1(newFilter);
    }
  };
  const handleSelectedRig1 = (data) => {
    setSearchText1(data.name);
    // $('custom-rig-tag').addClass('hide')
    state.mouse = data._id;
  };

  return (
    <>
      <MetaDash />
      <SignedHeader user={user} />
      <LeftNav user={user} />
      <div className="main_middle create_main_middle">
        <div className="white_bg create_bg">
          <div className="create_form_box">
            <div className="left_create_form">
              <img src="/assets/media/create_left_img.jpg" />

              <div className="create_heads">
                <h1>Create Team</h1>
                <p>
                  Create Team page and invite hundrends of gamers to
                  participate. Boost to increase the reach.
                </p>
              </div>
            </div>
            <div className="create_tournament">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {!step1 ? (
                  <>
                    <h2>Step1</h2>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">
                        Team Name
                      </label>
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
                        type="date"
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
                      <label htmlFor="exampleFormControlTextarea1">
                        Country
                      </label>
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
                      <label htmlFor="exampleFormControlTextarea1">
                        Website (Optional)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder="Enter your website Name with Extension"
                        name="website"
                        onChange={handleChange}
                        value={state.website}
                      />
                      {/* <p>{formErrors.website}</p> */}
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
                          Achievements (Optional)
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
                        {/* <p>{formErrors.achievements}</p> */}
                      </div>
                      <div className="colm">
                        <label htmlFor="exampleFormControlInput1">
                          Rigs (Optional)
                        </label>
                        <label>Keyboard</label>
                        <input
                          id="keyboard"
                          name="keyboard"
                          placeholder="Enter Keyboard Name"
                          type="search"
                          value={searchText}
                          onChange={handleFilter}
                          autoComplete="off"
                        />

                        {searchText.length !== 0 ? (
                          <div className="custom-rig-tag">
                            <div>
                              {!filteredData || filteredData.length === 0 ? (
                                <p>No keyboards found..</p>
                              ) : (
                                filteredData.map((data) => (
                                  <div
                                    onClick={() => handleSelectedRig(data)}
                                    key={data._id}
                                  >
                                    <img
                                      src={data.image}
                                      height={50}
                                      width={50}
                                    />
                                    <p>
                                      {data.name.length > 20
                                        ? data.name.substring(0, 20) + '...'
                                        : data.name}
                                    </p>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        ) : null}

                        <label>Mouse</label>
                        <input
                          id="mouse"
                          name="mouse"
                          placeholder="Enter Mouse Name"
                          type="search"
                          value={searchText1}
                          onChange={handleFilter1}
                          autoComplete="off"
                        />

                        {searchText1.length !== 0 ? (
                          <div className="custom-rig-tag">
                            <div>
                              {!filteredData1 || filteredData1.length === 0 ? (
                                <p>No Mouse found..</p>
                              ) : (
                                filteredData1.map((data) => (
                                  <div
                                    onClick={() => handleSelectedRig1(data)}
                                    key={data._id}
                                  >
                                    <img
                                      src={data.image}
                                      height={50}
                                      width={50}
                                    />
                                    <p>
                                      {data.name.length > 20
                                        ? data.name.substring(0, 20) + '...'
                                        : data.name}
                                    </p>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="colm">
                        <label htmlFor="exampleFormControlInput1">
                          Sponsors (Optional)
                        </label>
                        <select
                          className="form-control"
                          name="sponsor"
                          value={state.sponsor}
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
                        {/* <p>{formErrors.sponsor}</p> */}
                      </div>
                      <div className="colm">
                        <label htmlFor="exampleFormControlInput1">
                          Arena (Optional)
                        </label>
                        <select
                          className="form-control"
                          name="arena"
                          value={state.arena}
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
                        {/* <p>{formErrors.arena}</p> */}
                      </div>
                      <div className="colm">
                        <label htmlFor="exampleFormControlInput1">
                          Team (Optional)
                        </label>
                        <select
                          className="form-control"
                          name="role"
                          value={state.role}
                          multiple={true}
                          onChange={handleChange}
                        >
                          <option> Manager</option>
                          <option>Coach</option>
                          <option>CEO</option>
                        </select>
                        {/* <p>{formErrors.role}</p> */}
                      </div>
                      <div className="colm">
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
                    <button
                      className="type_btn active"
                      onClick={() => setFormErrors(teamformvalidate(state))}
                    >
                      Create Team
                    </button>
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

export default CreateTeam;
