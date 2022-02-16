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

const ProfileData = ({ user, Userdata, player, products }) => {
  const [profile, setProfile] = useState(Userdata.profile);

  useEffect(() => {}, [profile]);
  useEffect(() => {}, [Userdata]);

  useEffect(() => {}, []);

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
            <ul>
              {Userdata.sponsors.length === 0 ? (
                <div>No Sponsors</div>
              ) : (
                Userdata.sponsors.map((spons, index) => {
                  return (
                    <li key={index}>
                      <div className="sponser_name">
                        <img src={spons.logoUrl} alt="" />
                      </div>
                      <div className="sponser_data">
                        {' '}
                        <span className="head_spons_bg">{spons.name}</span>
                        <p>{spons.description}</p>
                      </div>
                    </li>
                  );
                })
              )}
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
