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

const ProfileData = ({ user, Userdata, player, products, teams }) => {
  const [profile, setProfile] = useState(Userdata.profile);
  const [sponsors, setSponsors] = useState([]);
  const [state, setState] = useState({
    sponsor: ''
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
                      <p>You Shared</p>
                      <AllPosts post={post} user={user} />
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
          <ul className="stats_card">
            {teams &&
              teams.map((team) => (
                <li>
                  <div className="card_img">
                    {' '}
                    <img src="/assets/media/team_logo.jpg" alt="" />{' '}
                  </div>
                  <div className="right_data">
                    <div className="card_games_tit">
                      <h3>
                        Team {team.name} <br />{' '}
                        {Moment(team.founded).format('MMM YYYY')}
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
                      <button className="active">
                        {result?.registered.map((reg) =>
                          reg.user === user._id ? 'REGISTERED' : 'REGISTER'
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="bottom_game">
                    <div className="users">
                      <img src="/assets/media/category/users.png" alt="" />
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
                    <i aria-hidden="true"> Edit Sponsor</i>{' '}
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
        <ProductRigs user={user} productList={products} />
      </div>
      {/* ------------- start poup data ------------- */}
      <ProdPoup />
    </>
  );
};
export default ProfileData;
