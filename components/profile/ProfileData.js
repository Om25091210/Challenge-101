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

const ProfileData = ({ user, Userdata, player, products }) => {
  const [profile, setProfile] = useState(Userdata.profile);
  const [sponsors, setSponsors] = useState([]);
  const [state, setState] = useState({
    sponsor: ''
  });
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
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    window.setTimeout(function () {
      location.reload();
    }, 800);
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
              {Userdata.posts.length !== 0 &&
                Userdata.posts.map((post) => (
                  <AllPosts post={post} user={user} />
                ))}
            </div>
          </div>

          <div className="profile_match_details">
            {Userdata.teamMatchesList.map((result, index) => (
              <TeamAllStats teamId={result.team._id} />
            ))}

            <GamesDetails />
          </div>
        </div>

        {/* 
        <div className="tab hide" id="statistics">

        </div>
*/}
        <div className="tab hide" id="achievement">
          {' '}
          <div className="achivement_box">
            <div className="features">
              <h2>featured</h2>
              <ul>
                <li>
                  <div className="img">
                    <i className="fa fa-trophy" aria-hidden="true"></i>
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
          <Photos Userdata={Userdata} />
        </div>

        <div className="tab hide" id="video">
          <Videos Userdata={Userdata} />
        </div>

        <div className="tab hide" id="sponsors">
          <div className="sponsers_box">
            <h1>sponser</h1>
            <ul>
              {Userdata.sponsors &&
                Userdata.sponsors.map((item, index) => (
                  <li key={index}>
                    <div className="sponser_name">
                      <img src={item.imgUrl} alt={item.sponsorId} />
                    </div>
                    <div className="sponser_data">
                      {' '}
                      <span className="head_spons_bg">{item.sponsorId}</span>
                      <p>{item.description}</p>
                    </div>
                  </li>
                ))}
            </ul>

            <span>
              <div className="loc_box">
                {' '}
                <a href="#!" className="model_show_btn">
                  <i
                    className="fa fa-pencil"
                    aria-hidden="true"
                    style={{ color: 'grey' }}
                  >
                    {' '}
                    Edit Sponsor
                  </i>
                </a>
                <div className="common_model_box" style={{ height: '12rem' }}>
                  <a href="#!" className="model_close">
                    X
                  </a>
                  <div className="inner_model_box">
                    <h3>Sponsor's</h3>

                    <form className="common_form" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <div className="colm">
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

        <ProductRigs user={user} productList={products} />
      </div>

      {/* ------------- start poup data ------------- */}

      <ProdPoup />
    </>
  );
};
export default ProfileData;
