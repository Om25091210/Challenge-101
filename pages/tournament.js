import { useState, useEffect } from 'react';
import Head from 'next/head';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import TournamentRows from '@components/tournament/TournamentRows';
import FooterMain from '@components/FooterMain';
import AllScript from './AllScript';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { useQuery, useMutation } from 'react-query';
import { searchTournaments } from '@utils/functionsHelper';
import Filters from '@components/common/Filters';

const Tournament = ({ user, games, tournaments, profile }) => {
  const [searchObj, setSearchObj] = useState({
    search: '',
    filters: ''
  });

  let myState = {};

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  myState.selectedFilters = selectedFilters;
  myState.setSelectedFilters = setSelectedFilters;

  myState.filteredResults = filteredResults;
  myState.setFilteredResults = setFilteredResults;

  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('confirm');
  const [searchResults, setSearchResults] = useState([]);

  const [favouriteTournaments, setfavouriteTournaments] = useState([]);
  const [showfavs, setShowFavs] = useState(false);

  const router = useRouter();

  let cancel;
  var sdata;

  const [error, setError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const { search, filters } = searchObj;

  const handleChange = (e) => {
    setSearchObj((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sdata = await searchTournaments(
      searchObj,
      setError,
      setFormLoading,
      toast,
      setStatus
    );
    setSearchResults(sdata);
  };

  const handleSelectGame = async (obj) => {
    setSelectedGame(obj);
    //myState.setFilteredResults([]);
    $('a.model_close').parent().removeClass('show_model');
  };

  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);

  const [sessionTeam, setSessionTeam] = useState({ key: null, value: null });

  useEffect(() => {
    var sg = undefined;
    if (selectedGame != null) {
      sg = selectedGame._id;
    }

    if (myState.selectedFilters.length > 0) {
      setSearchResults(myState.filteredResults);
    } else {
      if (sessionTeam.key === null) {
        axios
          .get(`${baseURL}/api/tournaments/tournamentsbygame/${sg}`)
          .then((res) => {
            setSearchResults(res.data);
            setSessionTeam({ key: sg, value: searchResults });
          });
      } else {
        if (sessionTeam.key != sg) {
          axios
            .get(`${baseURL}/api/tournaments/tournamentsbygame/${sg}`)
            .then((res) => {
              setSearchResults(res.data);
              setSessionTeam({ key: sg, value: searchResults });
            });
        } else {
          //setTeam (sessionTeam.get(sg));
        }
      }

      //myState.setFilteredResults(team);
      //console.log(team);
    }
  }, [myState, searchResults]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/tournaments/favourites/tournament`, {
        headers: {
          Authorization: cookie.get('token')
        }
      })
      .then((res) => {
        setfavouriteTournaments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <MetaDash />

      <SignedHeader user={user} />

      <LeftNav user={user} />

      <div className="main_middle profile_middle">
        <div className="discovery_page">
          <div className="white_bg">
            <h2>GAME</h2>

            <div className="tit">
              <a href="#!" className="model_show_btn">
                <span>
                  <b className="icon">
                    {selectedGame ? (
                      <img
                        src={selectedGame.imgUrl}
                        alt=""
                        style={{ width: '26px', height: '18px' }}
                      />
                    ) : (
                      <img src="/assets/media/ranking/console.png" alt="" />
                    )}
                  </b>{' '}
                  {selectedGame ? selectedGame.name : 'Browse Games'}
                </span>
                <i className="fa fa-angle-right" aria-hidden="true"></i>

                <div className="hover_games">
                  <div className="other_logo">
                    <img
                      src={selectedGame ? selectedGame.imgUrl : ''}
                      alt={selectedGame ? selectedGame.name : ''}
                    />
                  </div>
                </div>
              </a>

              <div className="common_model_box" id="more_games">
                <a href="#!" className="model_close">
                  X
                </a>
                <div className="inner_model_box">
                  <h3>Games</h3>

                  <div className="poup_height msScroll_all">
                    <ul className="">
                      {games &&
                        games.map((game, idx) => (
                          <li key={idx}>
                            <div className="game_pic">
                              <a
                                href="#!"
                                onClick={() => handleSelectGame(game)}
                              >
                                {' '}
                                <img src={game.imgUrl} alt={game.name} />{' '}
                              </a>
                            </div>
                            <p>{game.name}</p>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
                <div className="overlay"></div>
              </div>
            </div>

            <div className="white_bgg">
              <div className="team_search">
                <div className="searchbox">
                  <h3>Search</h3>

                  <form
                    className="form w-100"
                    noValidate="novalidate"
                    onSubmit={handleSubmit}
                  >
                    <input
                      id="search"
                      name="search"
                      className=""
                      placeholder="Search for tournaments..."
                      type="search"
                      value={search}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <input type="submit" value="" />
                  </form>
                </div>
                <div className="advance">
                  <h3>Favourite</h3>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitch1"
                      onClick={() => setShowFavs(!showfavs)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customSwitch1"
                    ></label>
                  </div>
                </div>
              </div>

              <Filters
                filterType={'TOURNAMENTS'}
                myState={myState}
                selectedGame={selectedGame}
              />
            </div>
          </div>

          <TournamentRows
            tournaments={tournaments}
            searchResults={searchResults}
            user={user}
            favouriteTournaments={favouriteTournaments}
            showfavs={showfavs}
            profile={profile}
          />
        </div>
      </div>

      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const response = await fetch(`${baseURL}/api/all/games`);
  const games = await response.json();

  const resp = await fetch(`${baseURL}/api/tournaments`);
  const tournaments = await resp.json();

  return {
    props: { games, tournaments }
  };
};

export default Tournament;
