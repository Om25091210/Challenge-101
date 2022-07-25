import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import FavTournament from '../tournament/FavTournament';
import { format } from 'date-fns';
import { MPNumberFormat } from '../../utils/helpers';
import Tournament_Reg from '../tournament/TournamentRegister';
import ImageDropzone from '../common/ImageDropzone';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const ProfileTournament = ({
  user,
  profile,
  allGames,
  teamroles,
  teams,
  tournamentData
}) => {
  const [allTournaments, setAllTournaments] = useState([]);
  const [organizer, setOrganizer] = useState([]);
  const [title, setTitle] = useState('');
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);

  const [tournament, setTournament] = useState({
    tournamentId: '',
    organizer: '',
    games: '',
    team: null,
    role: '',
    year: '',
    team_ranking: null,
    winnings: null,
    currency: '$'
  });

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/tournaments/`)
      .then((res) => setAllTournaments(res.data));
    axios
      .get(`${baseURL}/api/all/organizers`)
      .then((res) => setOrganizer(res.data));
  }, []);

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
  const [filteredData, setFilteredData] = useState([]);
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setSearchText(searchWord);
    const newFilter = allTournaments?.filter((value) => {
      return value.tournament.name
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });

    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const handleSelected = (data) => {
    setSearchText(data.name);
    tournament.tournamentId = data._id;
  };
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
      setTournament({ ...tournament, [e.target.name]: e.target.files[0] });
    } else {
      setTournament({ ...tournament, [e.target.name]: e.target.value });
    }
  }
  const onChangeTour = (e) => {
    setTournament({ ...tournament, [e.target.name]: e.target.value });
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
      <div className="tab hide" id="tournaments">
        <div className="sponser_btn">
          {' '}
          {profile.user._id === user._id ? (
            <a href="#!" className="model_show_btn">
              <button className="btn">
                {' '}
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
                Add Tournament
              </button>
            </a>
          ) : null}
          <div className="common_model_box  add_tourn" id="big_poup">
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
                  <label htmlFor="exampleFormControlInput1">
                    Tournament Name
                  </label>
                  <input
                    type="search"
                    id="tournamentId"
                    name="tournamentId"
                    className="form-control"
                    value={searchText}
                    onChange={handleFilter}
                    autoComplete="off"
                  />
                  {searchText.length !== 0 ? (
                    <div className="custom-rig-tag">
                      <div>
                        {!filteredData || filteredData.length === 0 ? (
                          <p>No Tournament found..</p>
                        ) : (
                          filteredData.map((data) => (
                            <div
                              onClick={() => handleSelected(data.tournament)}
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
                  <label htmlFor="exampleFormControlInput1">Orgazised By</label>

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

                <div className="edit_two">
                  <div className="form-group">
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

                      {profile.teams &&
                        profile.teams.map((tem) => (
                          <option key={tem.teamId?._id} value={tem.teamId?._id}>
                            {tem.teamId?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Roles</label>
                    <select
                      name="role"
                      className="form-control"
                      onChange={onChangeTour}
                      value={tournament.role}
                    >
                      <option value="--">--</option>
                      {teamroles.map((tr, idx) => (
                        <option key={idx} value={tr}>
                          {tr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
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

                <select
                  name="currency"
                  id="currency"
                  onChange={onChangeTour}
                  value={tournament.currency}
                >
                  <option value="$">USD($)- Dollars</option>
                  <option value="Rs">INR (Rs) - Rupees</option>
                </select>

                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Winnings</label>
                  <input
                    type="number"
                    className="form-winnings form-control"
                    name="winnings"
                    onChange={handleAddTournament}
                    value={tournament.winnings}
                  />
                </div>

                <div className="form-group">
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
                </div>
                <button className="btn">Update</button>
              </form>
            </div>
            <div className="overlay"></div>
          </div>
        </div>

        <div className="new_tournament">
          <div className="tournamnet_new_row">
            <div className="tour_img_name">
              <span className="imgs"></span>
              <span>
                <h4>Gamer of Nation Championship II</h4>
                <p>2022</p>
              </span>
            </div>

            <div className="tour_game_team">
              <ul>
                <li>
                  <b>Game:</b> <input type="checkbox" /> CS GO
                </li>
                <li>
                  <b>Team:</b> <input type="checkbox" /> The Werewolves{' '}
                </li>
              </ul>
            </div>

            <div className="tour_game_team">
              <ul>
                <li>Ranking: 3rd</li>
                <li>Winnings: Rs: 10,000 </li>
              </ul>
            </div>

            <button className="btn">VIEW MATCHES</button>
          </div>
        </div>

        {tournamentData.Alltournaments?.length === 0 ? (
          <p>{user.name} has no Tournaments.</p>
        ) : (
          tournamentData.type === 'TOURNAMENTS' &&
          tournamentData.Alltournaments.map((result, idx) => (
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
                      {result.playType === 'TEAMS'
                        ? result.teams
                            ?.slice(0, 3)
                            .map((team) => (
                              <img
                                style={{ height: '30px', width: '30px' }}
                                src={team?.teamId.imgUrl}
                                alt=""
                              />
                            ))
                        : result.registered
                            ?.slice(0, 3)
                            .map((reg) => (
                              <img
                                style={{ height: '30px', width: '30px' }}
                                src={reg?.user?.profilePicUrl}
                                alt=""
                              />
                            ))}

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

              <div>
                {result.winnings && (
                  <>
                    <div>
                      <img
                        src={result.tournamentId?.imgUrl}
                        style={{ height: '60px', width: '60px' }}
                      />
                    </div>
                    <div>
                      {result.tournamentId?.name}
                      <span>{format(new Date(result?.year), 'yyyy')}</span>
                    </div>
                    <div>
                      <div>
                        Game:{' '}
                        {result?.games.map((gam) => (
                          <>
                            <img
                              src={gam.gameId.imgUrl}
                              style={{ height: '20px', width: '20px' }}
                            />
                            {gam.gameId.name}
                          </>
                        ))}
                      </div>
                      <div>
                        Team:
                        <img
                          src={result?.team?.imgUrl}
                          style={{ height: '20px', width: '20px' }}
                        />
                        {result.team.name}
                      </div>
                    </div>
                    <div>
                      <div>
                        Ranking:{' '}
                        {result?.team_ranking && result?.team_ranking === 3 ? (
                          <>{result?.team_ranking} rd</>
                        ) : result?.team_ranking === 2 ? (
                          <>{result?.team_ranking} nd</>
                        ) : result?.team_ranking === 1 ? (
                          <>{result?.team_ranking} st</>
                        ) : (
                          <> {result?.team_ranking} th </>
                        )}
                      </div>
                      <div>
                        Winnings: {result?.currency} {result?.winnings}
                      </div>
                      <button className="btn">view Match</button>
                    </div>
                  </>
                )}
              </div>
            </>
          ))
        )}
      </div>
    </>
  );
};

export default ProfileTournament;
