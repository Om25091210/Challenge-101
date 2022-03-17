import { useState } from 'react';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const TeamProfileBox = ({ user, data }) => {
  const [attr, setAttr] = useState(data.team.attributes);
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const isTeamPlayer =
    data.players.filter((ply) => {
      return ply?.user === user?._id;
    }).length > 0;

  function handleChangeAttr(e) {
    setAttr({ ...attr, [e.target.name]: e.target.value });
  }

  const handleAttrForm = async (e) => {
    e.preventDefault();
    if (
      attr.roles === '' ||
      attr.regions === '' ||
      attr.teamtype === '' ||
      attr.platform === '' ||
      attr.language === '' ||
      attr.paid === ''
    ) {
      toast.warning('Please enter all fields or check your inputs');
    } else {
      try {
        await axios.put(
          `${baseURL}/api/all/teamattribute/${data.team._id}`,
          attr,
          {
            headers: {
              Authorization: cookie.get('token'),
              'Content-Type': 'application/json'
            }
          }
        );
        toast.success("Detail's successfully have been updated");
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
      refreshData();
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
      setAttr({ ...attr, [e.target.name]: value });
    } else {
      setAttr({ ...attr, [e.target.name]: e.target.value });
    }
  }

  return (
    <div className="profile_box">
      <div className="profile_cover_photo">
        <img src="/assets/media/profile/cover_bg.jpg" alt="cover image" />
      </div>

      <div className="profile_dp_box">
        <div className="profile_pic">
          <img src={data.team.imgUrl} alt="" />
        </div>

        <div className="profile_details">
          <div className="top_details">
            <div className="name_box">
              <span className="game_name"> {data.team.name} </span>
              <span className="name">Founded May 2011</span>
              <span className="follower">{data.players.length} followers</span>
            </div>
            <div className="flag">{data.team.region}</div>
            <div className="tick">
              <span className="active">
                {data.team.isVerified ? (
                  <i className="fa fa-check" aria-hidden="true"></i>
                ) : (
                  <i className="fa fa-question-circle" aria-hidden="true"></i>
                )}
              </span>
            </div>
            <div className="button">
              <a href="#" className="btn">
                FOLLOW
              </a>{' '}
              <a href="#" className="btn">
                ASK TO JOIN
              </a>
            </div>

            {isTeamPlayer ? (
              <span
                // className="edit_cover_photo "
                style={{
                  marginLeft: '550px',
                  marginTop: '30px',
                  padding: '0.5rem 0.5rem'
                }}
              >
                <div className="loc_box">
                  {' '}
                  <a href="#!" className="model_show_btn">
                    <i
                      className="fa fa-pencil"
                      aria-hidden="true"
                      style={{ color: 'white' }}
                    ></i>
                  </a>
                  <div className="common_model_box">
                    <a href="#!" className="model_close">
                      X
                    </a>

                    <div className="inner_model_box">
                      <h3>Personal Detail's</h3>

                      <form onSubmit={handleAttrForm} className="common_form">
                        <div className="form-group">
                          <div className="colm">
                            <label htmlFor="exampleFormControlInput1">
                              Role
                            </label>
                            <select
                              id="roles"
                              name="roles"
                              onChange={handleChangeAttr}
                              value={attr?.roles}
                              className="form-control"
                            >
                              <option value="Player">Player</option>
                              <option value="Front">Front</option>
                              <option value="Back">Back</option>
                              <option value="Gunman">Gunman</option>
                              <option value="Strategy">Strategy</option>
                            </select>
                          </div>
                          <div className="colm">
                            <label htmlFor="exampleFormControlInput1">
                              Region
                            </label>
                            <select
                              id="regions"
                              name="regions"
                              onChange={handleChangeAttr}
                              value={attr?.regions}
                              className="form-control"
                            >
                              <option value="India">India</option>
                              <option value="USA">USA</option>
                              <option value="Asia">Asia</option>
                              <option value="China">China</option>
                              <option value="Japan">Japan</option>
                              <option value="Europe">Europe</option>
                            </select>
                          </div>
                          <div className="colm">
                            <label htmlFor="exampleFormControlInput1">
                              Player Type
                            </label>
                            <select
                              id="playertype"
                              name="playertype"
                              onChange={handleChangeAttr}
                              value={attr?.playertype}
                              className="form-control"
                            >
                              <option value="Casual">Casual</option>
                              <option value="SemiPro">SemiPro</option>
                              <option value="Pro">Pro</option>
                              <option value="Gunman">Gunman</option>
                              <option value="Local Lan">Local Lan</option>
                            </select>
                          </div>
                          <div className="colm">
                            <label htmlFor="exampleFormControlInput1">
                              Platform
                            </label>
                            <select
                              id="platform"
                              name="platform"
                              onChange={handleChangeAttr}
                              value={attr?.platform}
                              className="form-control"
                            >
                              <option value="PC">PC</option>
                              <option value="Front">Front</option>
                              <option value="Console">Console</option>
                              <option value="Mobile">Mobile</option>
                            </select>
                          </div>

                          <div className="colm">
                            <label htmlFor="exampleFormControlInput1">
                              Language
                            </label>
                            <select
                              id="language"
                              name="language"
                              onChange={handleChange}
                              value={attr?.language}
                              className="form-control"
                              multiple={true}
                            >
                              <option value="English">English</option>
                              <option value="Hindi">Hindi</option>
                              <option value="Telagu">Telagu</option>
                              <option value="Tamil">Tamil</option>
                            </select>
                          </div>
                          <div className="colm">
                            <label htmlFor="exampleFormControlInput1">
                              Paid Choose
                            </label>
                            <select
                              id="paid"
                              name="paid"
                              onChange={handleChangeAttr}
                              value={attr?.paid}
                              className="form-control"
                            >
                              <option value="Paid">Paid</option>
                              <option value="Unpaid">Unpaid</option>
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
            ) : null}
          </div>
          <div className="bottom_details team_details">
            <div className="badges">
              <h5>MAJOR TITLES</h5>
              <img src="/assets/media/team/titles1.png" alt="" />
              <img src="/assets/media/team/titles2.png" alt="" />
              <img src="/assets/media/team/titles3.png" alt="" />
            </div>

            <div className="current_status">
              <h5>RANKING</h5>

              {!data.team.ranks || data.team.ranks.length === 0 ? (
                <p>No ranks defined..</p>
              ) : (
                data.team.ranks.map((item, index) => (
                  <div key={index} className="current_team">
                    <span className="ct">
                      {' '}
                      <i className="fa fa-sort-asc" aria-hidden="true"></i>{' '}
                      {item.rank}
                    </span>
                    <span className="were">{item.rankType} </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bio_box team_bio">
        <div className="left_bio">
          <div className="top_bio">
            <h3>ABOUT THE TEAM</h3>
            <div className="socail">
              <a href="https://www.facebook.com/" target="_blank">
                <i className="fa fa-facebook-official" aria-hidden="true"></i>
              </a>
              <a href="https://www.instagram.com/" target="_blank">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
              <a href="https://www.twitch.tv/" target="_blank">
                <i className="fa fa-twitch" aria-hidden="true"></i>
              </a>
              <a href="https://discord.com/" target="_blank">
                <img
                  src="/assets/media/social/discord.png"
                  height="20px"
                  width="20px"
                />
              </a>
            </div>
          </div>

          <p>{data.team.description} </p>

          <p className="team_pos">
            <span className="position">REGION:</span> {data.team.region}{' '}
          </p>

          <div className="team_pos">
            <ul>
              <li>
                <span className="position">MANAGER:</span>{' '}
                <span className="pos_name">
                  <span className="imgs">
                    <img src="/assets/media/user.jpg" alt="" />
                  </span>
                  Alison “Eleven” James
                </span>
              </li>

              <li>
                <span className="position">Coach:</span>{' '}
                <span className="pos_name">
                  <span className="imgs">
                    <img src="/assets/media/user.jpg" alt="" />
                  </span>
                  Alison “Eleven” James
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="right_team_bio">
          <div className="team_pos">
            <ul>
              <h5 className="position">ARENAS:</h5>
              {!data.team.arenas || data.team.arenas.length === 0 ? (
                <p>No arenas defined...</p>
              ) : (
                data.team.arenas.map((item, index) => (
                  <li key={index}>
                    <span className="pos_name">
                      <img src={item.arenaId.logoUrl} alt="" />{' '}
                      {item.arenaId.name}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="sponser">
            <h5>SPONSORS</h5>

            <ul>
              {!data.sponsors || data.sponsors.length === 0 ? (
                <p>No sponsors defined..</p>
              ) : (
                data.sponsors.map((item, index) => (
                  <li key={index}>
                    <img src={item.imgUrl} alt="" />{' '}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamProfileBox;
