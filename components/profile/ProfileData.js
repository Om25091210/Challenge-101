import { useEffect, useState } from 'react';
import ProdPoup from '../profile/prodPoup';
import Photos from './Photos';
import Videos from './Videos';
import ProductList from '@components/common/ProductList';
import ProductRigs from '@components/common/ProductRigs';
import ProfileMatches from './ProfileMatches';
import TeamAllStats from '@components/team/TeamAllStats';
import GamesDetails from './GamesDetails';
import AllPosts from '@components/dashboard/AllPosts';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { toast } from 'react-toastify';
import Moment from 'moment';
import { useRouter } from 'next/router';
import FavTournament from '../tournament/FavTournament';
import Link from 'next/link';
import { format } from 'date-fns';
import { MPNumberFormat } from '../../utils/helpers';
import Tournament_Reg from '../tournament/TournamentRegister';
import ImageDropzone from '../common/ImageDropzone';
import cookie from 'js-cookie';

const ProfileData = ({ user, Userdata, player, products, teams }) => {
  const [profile, setProfile] = useState(Userdata.profile);
  const [sponsors, setSponsors] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [teamroles, setTeamRoles] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchText2, setSearchText2] = useState('');
  const [allTournaments, setAllTournaments] = useState([]);
  const [organizer, setOrganizer] = useState([]);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [state, setState] = useState({
    sponsor: ''
  });
  const [team, setTeam] = useState({
    teamId: null,
    game: '',
    role: '',
    teamStartDate: '',
    teamEndDate: ''
  });
  const [tournament, setTournament] = useState({
    tournamentId: '',
    organizer: '',
    games: '',
    team: null,
    role: '',
    year: '',
    team_ranking: null,
    winnings: null
  });
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {}, [profile]);
  useEffect(() => {}, [Userdata]);

  useEffect(() => {}, []);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/all/sponsors`)
      .then((res) => setSponsors(res.data));
    axios.get(`${baseURL}/api/all/teams`).then((res) => setAllTeams(res.data));

    axios.get(`${baseURL}/api/all/games`).then((res) => setAllGames(res.data));

    axios
      .get(`${baseURL}/api/tournaments/`)
      .then((res) => setAllTournaments(res.data));
    axios
      .get(`${baseURL}/api/all/organizers`)
      .then((res) => setOrganizer(res.data));

    axios
      .get(`${baseURL}/api/all/teamroles`)
      .then((res) => setTeamRoles(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${baseURL}/api/profile/sponsors/${Userdata.profile._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
      });

      toast.success('Your Sponsor has been set successfully! ');
      $('a.model_close').parent().removeClass('show_model');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshData();
  };

  const [filteredData, setFilteredData] = useState([]);
  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setSearchText(searchWord);
    const newFilter = allTeams?.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const handleSelected = (data) => {
    setSearchText(data.name);
    team.teamId = data._id;
  };

  const [filteredData2, setFilteredData2] = useState([]);
  const handleFilter2 = (event) => {
    const searchWord2 = event.target.value;
    console.log('Here------' + searchWord2);
    setSearchText2(searchWord2);
    const newFilter = allTournaments?.filter((value) => {
      return value.tournament.name
        .toLowerCase()
        .includes(searchWord2.toLowerCase());
    });

    if (searchText2 === '') {
      setFilteredData2([]);
    } else {
      setFilteredData2(newFilter);
    }
  };
  const handleSelected2 = (data) => {
    setSearchText2(data.name);
    tournament.tournamentId = data._id;
  };

  function handleAddTeam(e) {
    if (e.target.options) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setTeam({ ...team, [e.target.name]: value });
    } else if (e.target.files) {
      console.log(e.target.files[0]);
      setTeam({ ...team, [e.target.name]: e.target.files[0] });
    } else {
      setTeam({ ...team, [e.target.name]: e.target.value });
    }
  }

  function handleAddTournament(e) {
    if (e.target.options) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setTournament({ ...tournament, [e.target.name]: value });
    } else if (e.target.files) {
      console.log(e.target.files[0]);
      setTournament({ ...tournament, [e.target.name]: e.target.files[0] });
    } else {
      setTournament({ ...tournament, [e.target.name]: e.target.value });
    }
  }

  const onChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  const onChangeTour = (e) => {
    setTournament({ ...tournament, [e.target.name]: e.target.value });
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
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  }

  const handleTeamChange = async (teamId) => {
    try {
      axios.put(`${baseURL}/api/profile/current/${user?._id}/${teamId}`);
      toast.success('Saved Changes');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshData();
  };

  const handleAddTeamSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.post(`${baseURL}/api/profile/team/${profile?._id}`, team);
      toast.success('Added Team Successfully');
      $('a.model_close').parent().removeClass('show_model');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshData();
  };

  const handleAddTournamentSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.post(
        `${baseURL}/api/profile/tournaments/${profile?._id}`,
        tournament
      );
      toast.success('Added Tournament Successfully');
      $('a.model_close').parent().removeClass('show_model');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshData();
  };

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    for (const key of Object.keys(images)) {
      setImages({ images: images[key] });
    }
    axios.put(`${baseURL}/api/uploads/uploadImages`, images, {
      headers: {
        Authorization: cookie.get('token'),
        'Content-Type': 'application/json'
      }
    });
  };

  return (
    <>
      <div className="prfoile_tab_data">
        <div className="tab" id="feed">
          <div className="profile_left_post">
            <div className="">
              {' '}
              {Userdata.posts.length !== 0 &&
                Userdata.posts.map((post) =>
                  post.user._id !== user._id ? (
                    <>
                      {/* <p>You Shared</p> */}
                      <AllPosts
                        post={post}
                        user={user}
                        profiledata={Userdata.profile}
                      />
                    </>
                  ) : (
                    <AllPosts post={post} user={user} />
                  )
                )}{' '}
            </div>
          </div>
          <div className="profile_match_details">
            {' '}
            {Userdata.teamMatchesList.map((result, index) => (
              <TeamAllStats teamId={result.team._id} />
            ))}
            <GamesDetails />
          </div>
        </div>
        <div className="tab hide" id="statistics">
          <ul className="stats_card">
            <li>
              <div className="card_img">
                {' '}
                <img src="/assets/media/stats.jpg" alt="" />{' '}
              </div>
              <div className="right_data">
                <h3>Counter strike:Global Offensive</h3>
                <div className="card_details">
                  <div className="once">
                    <p>kills avg</p>
                    <span className="big_name"> 1.33 </span>{' '}
                  </div>
                  <div className="once">
                    <p>headchange avg</p>
                    <span className="big_name"> 1.1 </span>{' '}
                  </div>
                  <div className="once">
                    <p>Gammer ceaton avg</p>
                    <span className="big_name"> 473.29 </span>{' '}
                  </div>
                  <div className="once">
                    <p>kills avg</p>
                    <span className="big_name">50% </span>{' '}
                  </div>
                </div>
              </div>
              <div className="comp_btn">
                <i class="fa fa-compress" aria-hidden="true"></i> Compare
              </div>
            </li>

            <li>
              <div className="card_img">
                {' '}
                <img src="/assets/media/stats.jpg" alt="" />{' '}
              </div>
              <div className="right_data">
                <h3>Counter strike:Global Offensive</h3>
                <div className="card_details">
                  <div className="once">
                    <p>kills avg</p>
                    <span className="big_name"> 1.33 </span>{' '}
                  </div>
                  <div className="once">
                    <p>headchange avg</p>
                    <span className="big_name"> 1.1 </span>{' '}
                  </div>
                  <div className="once">
                    <p>Gammer ceaton avg</p>
                    <span className="big_name"> 473.29 </span>{' '}
                  </div>
                  <div className="once">
                    <p>kills avg</p>
                    <span className="big_name">50% </span>{' '}
                  </div>
                </div>
              </div>
              <div className="comp_btn">
                <i class="fa fa-compress" aria-hidden="true"></i> Compare
              </div>
            </li>

            <li>
              <div className="card_img">
                {' '}
                <img src="/assets/media/stats.jpg" alt="" />{' '}
              </div>
              <div className="right_data">
                <h3>Counter strike:Global Offensive</h3>
                <div className="card_details">
                  <div className="once">
                    <p>kills avg</p>
                    <span className="big_name"> 1.33 </span>{' '}
                  </div>
                  <div className="once">
                    <p>headchange avg</p>
                    <span className="big_name"> 1.1 </span>{' '}
                  </div>
                  <div className="once">
                    <p>Gammer ceaton avg</p>
                    <span className="big_name"> 473.29 </span>{' '}
                  </div>
                  <div className="once">
                    <p>kills avg</p>
                    <span className="big_name">50% </span>{' '}
                  </div>
                </div>
              </div>
              <div className="comp_btn">
                <i class="fa fa-compress" aria-hidden="true"></i> Compare
              </div>
            </li>
          </ul>
        </div>
        <div className="tab hide" id="teams">
          <div>
            <ul className="stats_card">
              {teams &&
                teams.map((team) => (
                  <li>
                    <div className="card_img">
                      {' '}
                      <img src={team.imgUrl} alt="" />{' '}
                    </div>
                    <div className="right_data">
                      <div className="card_games_tit">
                        <h3>
                          <a href={`tean/${team._id}`}>
                            Team {team.name} <br />{' '}
                          </a>
                          {Moment(team.founded).format('MMM YYYY')}
                        </h3>
                        <div className="gamer_pos">Caption|Assault</div>
                        {Userdata.profile?.current_team?._id === team?._id ? (
                          <button className="btn" disabled={true}>
                            Current Team
                          </button>
                        ) : (
                          <button
                            className="btn"
                            onClick={() => handleTeamChange(team?._id)}
                          >
                            Set as Current team
                          </button>
                        )}
                      </div>
                      <div className="card_details">
                        <div className="once">
                          <p>kills avg</p>
                          <span className="big_name"> 1.33 </span>{' '}
                        </div>
                        <div className="once">
                          <p>headchange avg</p>
                          <span className="big_name"> 1.1 </span>{' '}
                        </div>
                        <div className="once">
                          <p>Gammer ceaton avg</p>
                          <span className="big_name"> 473.29 </span>{' '}
                        </div>
                        <div className="once">
                          <p>kills avg</p>
                          <span className="big_name">50% </span>{' '}
                        </div>
                      </div>
                    </div>
                    <div className="comp_btn">
                      <i class="fa fa-compress" aria-hidden="true"></i> Compare
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <ul className="stats_card">
              {profile.teams &&
                profile.teams.map((team) => (
                  <li>
                    <div className="card_img">
                      {' '}
                      <img src={team.teamId?.imgUrl} alt="" />{' '}
                    </div>
                    <div className="right_data">
                      <div className="card_games_tit">
                        <h3>
                          <a href={`tean/${team.teamId?._id}`}>
                            Team {team.teamId?.name} <br />{' '}
                          </a>
                          {Moment(team.teamId?.founded).format('MMM YYYY')}
                        </h3>
                        <div className="gamer_pos">Caption|Assault</div>
                      </div>
                      <div className="card_details">
                        <div className="once">
                          <p>kills avg</p>
                          <span className="big_name"> 1.33 </span>{' '}
                        </div>
                        <div className="once">
                          <p>headchange avg</p>
                          <span className="big_name"> 1.1 </span>{' '}
                        </div>
                        <div className="once">
                          <p>Gammer ceaton avg</p>
                          <span className="big_name"> 473.29 </span>{' '}
                        </div>
                        <div className="once">
                          <p>kills avg</p>
                          <span className="big_name">50% </span>{' '}
                        </div>
                      </div>
                    </div>
                    <div className="comp_btn">
                      <i class="fa fa-compress" aria-hidden="true"></i> Compare
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          <div className="sponser_btn">
            {' '}
            {Userdata.profile.user._id === user._id ? (
              <a href="#!" className="model_show_btn">
                <button className="btn">
                  {' '}
                  <i className="fa fa-plus-circle" aria-hidden="true"></i>
                  Add Team
                </button>
              </a>
            ) : null}
            <div className="common_model_box">
              {' '}
              <a href="#!" className="model_close">
                {' '}
                X{' '}
              </a>
              <div className="inner_model_box">
                <h3>Team</h3>
                <form className="common_form" onSubmit={handleAddTeamSubmit}>
                  <div className="form-group">
                    <div className="colm">
                      <label htmlFor="exampleFormControlInput1">Team</label>
                      <input
                        type="search"
                        id="team"
                        name="team"
                        placeholder="Enter Team Name"
                        value={searchText}
                        onChange={handleFilter}
                        autoComplete="off"
                      />
                      {searchText.length !== 0 ? (
                        <div className="custom-rig-tag">
                          <div>
                            {!filteredData || filteredData.length === 0 ? (
                              <p>No Team found..</p>
                            ) : (
                              filteredData.map((data) => (
                                <div
                                  onClick={() => handleSelected(data)}
                                  key={data._id}
                                >
                                  <img
                                    src={data?.imgUrl}
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

                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">Games</label>

                      <select
                        className="form-control game_search_result"
                        multiple={true}
                        name="game"
                        value={team.game}
                        onChange={handleAddTeam}
                      >
                        {allGames.map((game, idx) => (
                          <option key={idx} value={game._id}>
                            {' '}
                            {game.name}{' '}
                          </option>
                        ))}
                      </select>
                    </div>

                    <label htmlFor="exampleFormControlInput1">Roles</label>
                    <select
                      name="role"
                      className="form-control"
                      onChange={onChange}
                      value={team.role}
                    >
                      {teamroles.map((tr) =>
                        tr.role.map((rol, idx) => (
                          <option key={idx} value={rol}>
                            {rol}
                          </option>
                        ))
                      )}
                    </select>

                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Start Date"
                        name="teamStartDate"
                        onChange={handleAddTeam}
                        value={team.teamStartDate}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">End Date</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="End Date"
                        name="teamEndDate"
                        onChange={handleAddTeam}
                        value={team.teamEndDate}
                      />
                    </div>
                    <button className="btn">Update</button>
                  </div>
                </form>
              </div>
              <div className="overlay"></div>
            </div>
          </div>
        </div>
        <div className="tab hide" id="tournaments">
          {' '}
          {Userdata.tournaments.map((result, idx) => (
            <>
              <div className="game_row" key={idx}>
                <FavTournament tournament={result} user={user} />
                <div className="game_pos">
                  <div className="game_loc">
                    {' '}
                    <img src="/assets/media/category/game_loc.jpg" alt="" />
                  </div>

                  <span className="tour_logo">
                    {' '}
                    <img src={result?.imgUrl} alt="" />
                  </span>
                </div>
                <div className="right_game_details">
                  <div className="top_game">
                    <div className="date">
                      <Link href={`/tournament/${result?._id}`}>
                        <a>
                          <h3>{result?.name}</h3>
                        </a>
                      </Link>
                      {result?.startDate
                        ? format(new Date(result?.startDate), 'dd.MMM.yyyy')
                        : 'Not defined'}
                    </div>
                    {result?.Type && result?.Type === 'Ladder' ? (
                      <p>Ladder</p>
                    ) : result?.Type === 'Tournament' ? (
                      <p>Tournament</p>
                    ) : result?.Type === 'Competition' ? (
                      <p>Competition</p>
                    ) : null}
                    <div className="reg">
                      <Tournament_Reg user={user} tournament={result} />
                    </div>
                  </div>
                  <div className="bottom_game">
                    <div className="users">
                      {result.registered[0]?.user?.profilePicUrl ? (
                        <img
                          style={{ height: '30px', width: '30px' }}
                          src={result.registered[0]?.user?.profilePicUrl}
                          alt=""
                        />
                      ) : null}
                      {result.registered[1]?.user?.profilePicUrl ? (
                        <img
                          style={{ height: '30px', width: '30px' }}
                          src={result.registered[1]?.user?.profilePicUrl}
                          alt=""
                        />
                      ) : null}
                      {result.registered[2]?.user?.profilePicUrl ? (
                        <img
                          style={{ height: '30px', width: '30px' }}
                          src={result.registered[2]?.user?.profilePicUrl}
                          alt=""
                        />
                      ) : null}
                      {result.registered[3]?.user?.profilePicUrl ? (
                        <img
                          style={{ height: '30px', width: '30px' }}
                          src={result.registered[3]?.user?.profilePicUrl}
                          alt=""
                        />
                      ) : null}

                      {result.playType === 'TEAMS' ? (
                        <p>
                          {result.teams.length} / {result.maxTeams}
                          <b>Signed</b>
                        </p>
                      ) : (
                        <>
                          {result.participants > 0 || result.maxTeams > 0 ? (
                            <p>
                              {result.registered.length} / {result.participants}
                              <b>Signed</b>
                            </p>
                          ) : (
                            <p>Not Available</p>
                          )}
                        </>
                      )}
                    </div>
                    <div className="games">
                      <h3>Games:</h3>

                      {result.games &&
                        result.games.map((gam, idxg) => (
                          <div className="game_logo" key={idxg}>
                            <img
                              src={gam.gameId.imgUrl}
                              alt={gam.gameId.name}
                            />{' '}
                            {gam.gameId.name}
                          </div>
                        ))}
                    </div>
                    <div className="prize">
                      <div>
                        <h3>ENTRY FEE</h3>
                        {result?.entranceFee === 0 ? (
                          <span>Free</span>
                        ) : result?.entranceFee !== 0 ? (
                          <span>{result?.entranceFee}</span>
                        ) : (
                          'Not Available'
                        )}
                      </div>
                      <div>
                        <h3>PRIZE POOL</h3>
                        {result?.prizepool ? (
                          <MPNumberFormat
                            value={result?.prizepool}
                            currency={result?.currency}
                          />
                        ) : (
                          'Not Available'
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
          {Userdata.teamTournaments.map((result, idx) => (
            <>
              <div className="game_row" key={idx}>
                <FavTournament tournament={result} user={user} />
                <div className="game_pos">
                  <div className="game_loc">
                    {' '}
                    <img src="/assets/media/category/game_loc.jpg" alt="" />
                  </div>

                  <span className="tour_logo">
                    {' '}
                    <img src={result?.imgUrl} alt="" />
                  </span>
                </div>
                <div className="right_game_details">
                  <div className="top_game">
                    <div className="date">
                      <Link href={`/tournament/${result?._id}`}>
                        <a>
                          <h3>{result?.name}</h3>
                        </a>
                      </Link>
                      {result?.startDate
                        ? format(new Date(result?.startDate), 'dd.MMM.yyyy')
                        : 'Not defined'}
                    </div>
                    {result?.Type && result?.Type === 'Ladder' ? (
                      <p>Ladder</p>
                    ) : result?.Type === 'Tournament' ? (
                      <p>Tournament</p>
                    ) : result?.Type === 'Competition' ? (
                      <p>Competition</p>
                    ) : null}
                    <div className="reg">
                      <Tournament_Reg
                        user={user}
                        tournament={result}
                        profile={Userdata.profile}
                      />
                    </div>
                  </div>
                  <div className="bottom_game">
                    <div className="users">
                      {result.teams[0]?.teamId.imgUrl ? (
                        <img
                          style={{ height: '30px', width: '30px' }}
                          src={result.teams[0]?.teamId?.imgUrl}
                          alt=""
                        />
                      ) : null}
                      {result.teams[1]?.teamId.imgUrl ? (
                        <img
                          style={{ height: '30px', width: '30px' }}
                          src={result.teams[1]?.teamId?.imgUrl}
                          alt=""
                        />
                      ) : null}
                      {result.teams[2]?.teamId.imgUrl ? (
                        <img
                          style={{ height: '30px', width: '30px' }}
                          src={result.teams[2]?.teamId?.imgUrl}
                          alt=""
                        />
                      ) : null}
                      {result.teams[3]?.teamId.imgUrl ? (
                        <img
                          style={{ height: '30px', width: '30px' }}
                          src={result.teams[3]?.teamId?.imgUrl}
                          alt=""
                        />
                      ) : null}

                      {result.playType === 'TEAMS' ? (
                        <p>
                          {result.teams.length} / {result.maxTeams}
                          <b>Signed</b>
                        </p>
                      ) : (
                        <>
                          {result.participants > 0 || result.maxTeams > 0 ? (
                            <p>
                              {result.registered.length} / {result.participants}
                              <b>Signed</b>
                            </p>
                          ) : (
                            <p>Not Available</p>
                          )}
                        </>
                      )}
                    </div>
                    <div className="games">
                      <h3>Games:</h3>

                      {result.games &&
                        result.games.map((gam, idxg) => (
                          <div className="game_logo" key={idxg}>
                            <img
                              src={gam.gameId.imgUrl}
                              alt={gam.gameId.name}
                            />{' '}
                            {gam.gameId.name}
                          </div>
                        ))}
                    </div>
                    <div className="prize">
                      <div>
                        <h3>ENTRY FEE</h3>
                        {result?.entranceFee === 0 ? (
                          <span>Free</span>
                        ) : result?.entranceFee !== 0 ? (
                          <span>{result?.entranceFee}</span>
                        ) : (
                          'Not Available'
                        )}
                      </div>
                      <div>
                        <h3>PRIZE POOL</h3>
                        {result?.prizepool ? (
                          <MPNumberFormat
                            value={result?.prizepool}
                            currency={result?.currency}
                          />
                        ) : (
                          'Not Available'
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
          {profile.tournaments.map((result, idx) => (
            <>
              <div className="game_row" key={idx}>
                <div className="game_pos">
                  <div className="game_loc">
                    {' '}
                    <img src="/assets/media/category/game_loc.jpg" alt="" />
                  </div>

                  <span className="tour_logo">
                    {' '}
                    <img src={result?.tournamentId.imgUrl} alt="" />
                  </span>
                </div>
                <div className="right_game_details">
                  <div className="top_game">
                    <div className="date">
                      <Link href={`/tournament/${result?.tournamentId._id}`}>
                        <a>
                          <h3>{result?.tournamentId.name}</h3>
                        </a>
                      </Link>
                      {result?.tournamentId?.startDate
                        ? format(
                            new Date(result?.tournamentId.startDate),
                            'dd.MMM.yyyy'
                          )
                        : 'Not defined'}
                    </div>
                    {result?.tournamentId.Type &&
                    result?.tournamentId.Type === 'Ladder' ? (
                      <p>Ladder</p>
                    ) : result?.tournamentId.Type === 'Tournament' ? (
                      <p>Tournament</p>
                    ) : result?.tournamentId.Type === 'Competition' ? (
                      <p>Competition</p>
                    ) : null}
                  </div>
                  <div className="bottom_game">
                    <div className="users">
                      {result.tournamentId.teams[0]?.teamId.imgUrl ? (
                        <img
                          style={{ height: '30px', width: '30px' }}
                          src={result.tournamentId.teams[0]?.teamId?.imgUrl}
                          alt=""
                        />
                      ) : null}
                      {result.tournamentId.teams[1]?.teamId.imgUrl ? (
                        <img
                          style={{ height: '30px', width: '30px' }}
                          src={result.tournamentId.teams[1]?.teamId?.imgUrl}
                          alt=""
                        />
                      ) : null}
                      {result.tournamentId.teams[2]?.teamId.imgUrl ? (
                        <img
                          style={{ height: '30px', width: '30px' }}
                          src={result.tournamentId.teams[2]?.teamId?.imgUrl}
                          alt=""
                        />
                      ) : null}
                      {result.tournamentId.teams[3]?.teamId.imgUrl ? (
                        <img
                          style={{ height: '30px', width: '30px' }}
                          src={result.tournamentId.teams[3]?.teamId?.imgUrl}
                          alt=""
                        />
                      ) : null}

                      {result.tournamentId.playType === 'TEAMS' ? (
                        <p>
                          {result.tournamentId.teams.length} /{' '}
                          {result.tournamentId.maxTeams}
                          <b>Signed</b>
                        </p>
                      ) : (
                        <>
                          {result.tournamentId.participants > 0 ||
                          result.tournamentId.maxTeams > 0 ? (
                            <p>
                              {result.tournamentId.registered.length} /{' '}
                              {result.tournamentId.participants}
                              <b>Signed</b>
                            </p>
                          ) : (
                            <p>Not Available</p>
                          )}
                        </>
                      )}
                    </div>
                    <div className="games">
                      <h3>Games:</h3>

                      {result.games &&
                        result.games.map((gam, idxg) => (
                          <div className="game_logo" key={idxg}>
                            <img
                              src={gam.gameId.imgUrl}
                              alt={gam.gameId.name}
                            />{' '}
                            {gam.gameId.name}
                          </div>
                        ))}
                    </div>
                    <div className="prize">
                      <div>
                        <h3>ENTRY FEE</h3>
                        {result?.entranceFee === 0 ? (
                          <span>Free</span>
                        ) : result?.entranceFee !== 0 ? (
                          <span>{result?.entranceFee}</span>
                        ) : (
                          'Not Available'
                        )}
                      </div>
                      <div>
                        <h3>PRIZE POOL</h3>
                        {result?.prizepool ? (
                          <MPNumberFormat
                            value={result?.tournamentId?.prizepool}
                            currency={result?.tournamentId?.currency}
                          />
                        ) : (
                          'Not Available'
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
          <div className="sponser_btn">
            {' '}
            {Userdata.profile.user._id === user._id ? (
              <a href="#!" className="model_show_btn">
                <button className="btn">
                  {' '}
                  <i className="fa fa-plus-circle" aria-hidden="true"></i>
                  Add Tournament
                </button>
              </a>
            ) : null}
            <div className="common_model_box" style={{ marginTop: '0px' }}>
              {' '}
              <a href="#!" className="model_close">
                {' '}
                X{' '}
              </a>
              <div className="inner_model_box">
                <h3>Tournament</h3>
                <form
                  className="common_form"
                  onSubmit={handleAddTournamentSubmit}
                >
                  <div className="form-group">
                    <div className="colm">
                      <label htmlFor="exampleFormControlInput1">
                        Tournament Name
                      </label>
                      <input
                        type="search"
                        id="tournamentId"
                        name="tournamentId"
                        value={searchText2}
                        onChange={handleFilter2}
                        autoComplete="off"
                      />
                      {searchText2.length !== 0 ? (
                        <div className="custom-rig-tag">
                          <div>
                            {!filteredData2 || filteredData2.length === 0 ? (
                              <p>No Tournament found..</p>
                            ) : (
                              filteredData2.map((data) => (
                                <div
                                  onClick={() =>
                                    handleSelected2(data.tournament)
                                  }
                                  key={data.tournament?._id}
                                >
                                  <img
                                    src={data?.tournament.imgUrl}
                                    height={50}
                                    width={50}
                                  />
                                  <p>
                                    {data?.tournament.name?.length > 20
                                      ? data.tournament.name.substring(0, 20) +
                                        '...'
                                      : data.tournament.name}
                                  </p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">
                        Orgazised By
                      </label>

                      <select
                        className="form-control game_search_result"
                        multiple={false}
                        name="organizer"
                        value={tournament.organizer}
                        onChange={onChangeTour}
                      >
                        <option value="--">--</option>
                        {organizer.map((organizer, idx) => (
                          <option key={idx} value={organizer._id}>
                            {' '}
                            {organizer.name}{' '}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">Games</label>

                      <select
                        className="form-control game_search_result"
                        multiple={true}
                        name="games"
                        value={tournament.games}
                        onChange={handleAddTournament}
                      >
                        {allGames.map((game, idx) => (
                          <option key={idx} value={game._id}>
                            {' '}
                            {game.name}{' '}
                          </option>
                        ))}
                      </select>
                    </div>

                    <label htmlFor="exampleFormControlInput1">Your Team</label>
                    <select
                      name="team"
                      className="form-control"
                      onChange={onChangeTour}
                      value={tournament.team}
                    >
                      <option value="--">--</option>
                      {teams.map((tem) => (
                        <option value={tem._id} key={tem._id}>
                          {tem.name}
                        </option>
                      ))}

                      {profile.teams.map((tem) => (
                        <option key={tem.teamId._id} value={tem.teamId._id}>
                          {tem.teamId.name}
                        </option>
                      ))}
                    </select>

                    <label htmlFor="exampleFormControlInput1">Roles</label>
                    <select
                      name="role"
                      className="form-control"
                      onChange={onChangeTour}
                      value={tournament.role}
                    >
                      <option value="--">--</option>
                      {teamroles.map((tr) =>
                        tr.role.map((rol, idx) => (
                          <option key={idx} value={rol}>
                            {rol}
                          </option>
                        ))
                      )}
                    </select>

                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">Year</label>
                      <input
                        type="date"
                        className="form-control"
                        name="year"
                        onChange={handleAddTournament}
                        value={tournament.year}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">
                        Your Team Ranking
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="team_ranking"
                        onChange={handleAddTournament}
                        value={tournament.team_ranking}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">Winnings</label>
                      <input
                        type="number"
                        className="form-winnings"
                        name="winnings"
                        onChange={handleAddTournament}
                        value={tournament.winnings}
                      />
                    </div>

                    <div className="add_photos">
                      <ImageDropzone setImages={setImages} />
                      {images.length > 0 ? (
                        <div className="upload_btn">
                          <form onSubmit={handlePhotoSubmit}>
                            <textarea
                              type="text"
                              placeholder="Add a Description"
                              id="title"
                              name="title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                            <a
                              href="#!"
                              className="btn"
                              onClick={handlePhotoSubmit}
                            >
                              UPLOAD NOW{' '}
                            </a>
                          </form>
                        </div>
                      ) : (
                        ''
                      )}
                      <div className="overlay"></div>
                    </div>

                    <button className="btn">Update</button>
                  </div>
                </form>
              </div>
              <div className="overlay"></div>
            </div>
          </div>
        </div>

        <div className="tab hide" id="achievement">
          {' '}
          <div className="achivement_box">
            <div className="features">
              <h2>featured</h2>
              <ul>
                <li>
                  <div className="img">
                    {' '}
                    <i className="fa fa-trophy" aria-hidden="true"></i>{' '}
                  </div>
                  <p className="tit">Silver x1</p>
                  <p>Awarded for placing second 1 tournament</p>
                </li>
              </ul>
            </div>
            <div className="trophy_cabinate">
              <h3>trophy cabinet</h3>
              <ul>
                <li>
                  <p className="num">21</p>
                  <h4> Title </h4>
                  <h5>professional</h5>
                  <h5>tournaments</h5>
                </li>
                <li>
                  <p className="num">21</p>
                  <h4> Title </h4>
                  <h5>professional</h5>
                  <h5>tournaments</h5>
                </li>
                <li>
                  <p className="num">21</p>
                  <h4> Title </h4>
                  <h5>professional</h5>
                  <h5>tournaments</h5>
                </li>
                <li>
                  <p className="num">21</p>
                  <h4> Title </h4>
                  <h5>professional</h5>
                  <h5>tournaments</h5>
                </li>
              </ul>
            </div>
            <div className="tournament_table">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">tournament</th>
                    <th scope="col">game</th>
                    <th scope="col">date</th>
                    <th scope="col">rank</th>
                    <th scope="col">prize</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>zapak gaming tournament </td>
                    <td>cod 4</td>
                    <td>2011</td>
                    <td>1</td>
                    <td>rs. 10,000</td>
                  </tr>
                  <tr>
                    <td>zapak gaming tournament </td>
                    <td>cod 4</td>
                    <td>2011</td>
                    <td>1</td>
                    <td>rs. 10,000</td>
                  </tr>
                  <tr>
                    <td>zapak gaming tournament </td>
                    <td>cod 4</td>
                    <td>2011</td>
                    <td>1</td>
                    <td>rs. 10,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>{' '}
        </div>
        <ProfileMatches user={user} Userdata={Userdata} />
        <ProductList user={user} productList={products} />
        <div className="tab hide" id="photos">
          <Photos Userdata={Userdata} user={user} />
        </div>
        <div className="tab hide" id="video">
          <Videos Userdata={Userdata} user={user} />
        </div>
        <div className="tab hide" id="sponsors">
          <div className="sponsers_box">
            <div className="sponser_btn">
              {' '}
              {Userdata.profile.user._id === user._id ? (
                <a href="#!" className="model_show_btn">
                  <button className="btn">
                    {' '}
                    <i className="fa fa-plus-circle" aria-hidden="true"></i>
                  </button>
                </a>
              ) : null}
              <div className="common_model_box" style={{ height: '12rem' }}>
                {' '}
                <a href="#!" className="model_close">
                  {' '}
                  X{' '}
                </a>
                <div className="inner_model_box">
                  <h3>Sponsor's</h3>
                  <form className="common_form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <div className="">
                        <select
                          className="form-control custom-select text-capitalize"
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
                      </div>
                      <button className="btn">Update</button>
                    </div>
                  </form>
                </div>
                <div className="overlay"></div>
              </div>
            </div>
            <ul>
              {Userdata.sponsors &&
                Userdata.sponsors.map((item, index) => (
                  <li key={index}>
                    <div className="sponser_name">
                      {' '}
                      <img src={item.imgUrl} alt={item.name} />{' '}
                    </div>
                    <div className="sponser_data">
                      {' '}
                      <span className="head_spons_bg">{item.name}</span>
                      <p>{item.description}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <ProductRigs user={user} productList={products} Userdata={Userdata} />
      </div>
      {/* ------------- start poup data ------------- */}
      <ProdPoup />
    </>
  );
};
export default ProfileData;
