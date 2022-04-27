import { useState } from 'react';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import ReactCountryFlag from 'react-country-flag';
import Moment from 'moment';
import { useMutation } from 'react-query';

const TeamProfileBox = ({ user, data, isTeamPlayer }) => {
  const [attr, setAttr] = useState(data.team.attributes);
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const [showform, setShowForm] = useState(false);
  const [desc, setDesc] = useState(data.team ? data.team.description : null);
  const [coverPic, setCoverPic] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const toggleShowform = () => {
    if (showform) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };

  const onChange = (e) => {
    setDesc(e.target.value);
  };

  const addingDesc = async () => {
    const res = await fetch(`${baseURL}/api/teams/${data.team._id}`, {
      method: 'PUT',
      body: JSON.stringify({
        desc
      }),
      headers: {
        'Content-type': 'application/json'
      }
    });
    return res.json();
  };
  const handleButtonForm = (e) => {
    addingDesc();
    setShowForm(false);
    refreshData();
  };

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
      attr.paid === '' ||
      attr.mic === ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('profilePic', profilePic);
    try {
      await axios.put(
        `${baseURL}/api/teams/profilePic/${data.team._id}`,
        formdata,
        {
          headers: {
            Authorization: cookie.get('token'),
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      toast.success('Profile Photo have been updated');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  const handleCoverSubmit = async (e) => {
    var img = e.target.files[0];

    if (
      !pixelarity.open(
        img,
        false,
        function (res) {
          $('#result').attr('src', res);
        },
        'jpg',
        1
      )
    ) {
      alert('Whoops! That is not an image!');
    }

    e.preventDefault();
    const formdata = new FormData();
    formdata.append('coverPic', coverPic);
    try {
      await axios.put(
        `${baseURL}/api/teams/coverPic/${data.team._id}`,
        formdata,
        {
          headers: {
            Authorization: cookie.get('token'),
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      toast.success('Cover Photo have been updated');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    axios.delete(`${baseURL}/api/teams/${data.team._id}`, {
      headers: {
        Authorization: cookie.get('token')
      }
    });
    toast.success('Deleted Successfully');
    router.push('/dashboard');
  };

  const empManager = data.team.employees
    .map((x) => x)
    .filter((x) => x.role === 'Manager');
  const empCoach = data.team.employees
    .map((x) => x)
    .filter((x) => x.role === 'Coach');

  return (
    <div className="profile_box">
      <div className="profile_cover_photo">
        <form onSubmit={handleCoverSubmit}>
          <img
            className="rounded-full h-full w-full object-cover"
            id="result"
            src={data.team.coverPhoto}
            alt=""
          />

          <span className="edit_cover_photo ">
            <div className="style_file_upload">
              <input
                type="file"
                name="coverPhoto"
                id="coverPhoto"
                className="custom-file-input"
                onChange={(e) => {
                  setCoverPic(e.target.files[0]);
                  handleCoverSubmit(e);
                }}
              />
              {isTeamPlayer ? (
                <label htmlFor="coverPhoto">
                  <span>
                    <i className="fa fa-camera" aria-hidden="true"></i> Upload
                    Cover Photo
                  </span>
                </label>
              ) : null}
            </div>
          </span>
        </form>
      </div>

      <div className="profile_dp_box">
        <div className="profile_pic">
          {/* <img src={data.team.imgUrl} alt="" /> */}

          <form onSubmit={handleSubmit}>
            <img
              className="rounded-full h-full w-full object-cover"
              src={data.team.imgUrl}
              alt=""
            />
            {isTeamPlayer ? (
              <div className="edit_photo">
                <label htmlFor="user-photo" className="edit_label">
                  <i className="fa fa-picture-o" aria-hidden="true"></i>
                </label>
                <input
                  id="user-photo"
                  name="user-photo"
                  type="file"
                  className="custom-file-input"
                  onChange={(e) => {
                    setProfilePic(e.target.files[0]);
                    handleSubmit(e);
                  }}
                />
              </div>
            ) : null}
          </form>
        </div>

        <div className="profile_details">
          <div className="top_details">
            <div className="name_box">
              <span className="game_name"> {data.team.name} </span>
              <span className="name">
                Founded {Moment(data.team.createdAt).format('MMM YYYY')}
              </span>
              <span className="follower">{data.players.length} followers</span>
            </div>

            <div className="flag">
              <ReactCountryFlag
                countryCode={data.team.region}
                svg
                style={{
                  width: '2em',
                  height: '2em'
                }}
              />
            </div>
            <div className="tick">
              <span className="active">
                {data.team.isVerified ? (
                  <i className="fa fa-check" aria-hidden="true"></i>
                ) : (
                  <i className="fa fa-question-circle" aria-hidden="true"></i>
                )}
              </span>
            </div>
            {isTeamPlayer ? null : (
              <div className="button">
                <a href="#" className="btn">
                  FOLLOW
                </a>{' '}
                <a href="#" className="btn">
                  MESSAGE
                </a>
              </div>
            )}
            <span>
              <div className="loc_box">
                {' '}
                {isTeamPlayer ? (
                  <a href="#!" className="model_show_btn">
                    <button className="btn">
                      <i
                        className="fa fa-pencil"
                        aria-hidden="true"
                        style={{ color: 'white' }}
                      ></i>
                    </button>
                  </a>
                ) : null}
                <div className="common_model_box">
                  <a href="#!" className="model_close">
                    X
                  </a>

                  <div className="inner_model_box">
                    <h3>Personal Detail's</h3>

                    <form onSubmit={handleAttrForm} className="common_form">
                      <div className="form-group">
                        <div className="colm">
                          <label htmlFor="exampleFormControlInput1">Role</label>
                          <select
                            id="roles"
                            name="roles"
                            onChange={handleChange}
                            value={attr?.roles}
                            className="form-control"
                            multiple={true}
                          >
                            <option value="Support">Support</option>
                            <option value="Scout">Scout</option>
                            <option value="Sniper">Sniper</option>
                            <option value="Driver">Driver</option>
                            <option value="Fragger">Fragger</option>
                            <option value="In Game Leader">
                              In Game Leader
                            </option>
                            <option value="Assualt">Assualt</option>
                            <option value="Medic">Medic</option>
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
                            <option value="--">--</option>
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
                            Team Type
                          </label>
                          <select
                            id="teamtype"
                            name="teamtype"
                            onChange={handleChangeAttr}
                            value={attr?.teamtype}
                            className="form-control"
                          >
                            <option value="--">--</option>
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
                            <option value="--">--</option>
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
                          <label htmlFor="exampleFormControlInput1">Paid</label>
                          <select
                            id="paid"
                            name="paid"
                            onChange={handleChangeAttr}
                            value={attr?.paid}
                            className="form-control"
                          >
                            <option value="--">--</option>
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                          </select>
                        </div>
                        <div className="colm">
                          <label htmlFor="exampleFormControlInput1">Mic</label>
                          <select
                            id="mic"
                            name="mic"
                            onChange={handleChangeAttr}
                            value={attr?.mic}
                            className="form-control"
                          >
                            <option value="--">--</option>
                            <option value={true}>On</option>
                            <option value={false}>Off</option>
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
            <span>
              <div className="loc_box">
                {' '}
                {isTeamPlayer ? (
                  <a href="#!" className="model_show_btn">
                    <button className="btn">
                      <i
                        className="fa fa-trash"
                        aria-hidden="true"
                        style={{ color: 'white' }}
                      ></i>
                    </button>
                  </a>
                ) : null}
                <div className="common_model_box">
                  <a href="#!" className="model_close">
                    X
                  </a>

                  <div className="inner_model_box">
                    <h3>Are You Sure?</h3>

                    <button className="btn">No</button>
                    <button className="btn" onClick={handleDeleteSubmit}>
                      Yes
                    </button>
                  </div>
                  <div className="overlay"></div>
                </div>
              </div>
            </span>
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

          {isTeamPlayer ? (
            <button className="bio_edit" onClick={toggleShowform}>
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </button>
          ) : null}

          {!showform ? <p> {data.team ? data.team.description : ''} </p> : null}

          {showform ? (
            <form onSubmit={(e) => e.preventDefault()}>
              <textarea name="text" value={desc} onChange={onChange}></textarea>
              <button onClick={handleButtonForm} className="btn">
                Update
              </button>
            </form>
          ) : (
            ''
          )}
          {/* <p className="team_pos">
            <span className="position">REGION:</span> {data.team.region}{' '}
          </p> */}

          <div className="team_pos">
            <ul>
              <li>
                <span className="position">MANAGER:</span>{' '}
                {empManager.length > 0 ? (
                  <>
                    {empManager.map((emply) => (
                      <span className="pos_name">
                        <span className="imgs">
                          <img src={emply.employeeId.profilePicUrl} alt="" />
                        </span>
                        {emply.employeeId.name}
                      </span>
                    ))}
                  </>
                ) : (
                  'This Team Currently has no Manager.'
                )}
              </li>

              <li>
                <span className="position">Coach:</span>{' '}
                {empCoach.length > 0 ? (
                  <>
                    {empCoach.map((emply) => (
                      <span className="pos_name">
                        <span className="imgs">
                          <img src={emply.employeeId.profilePicUrl} alt="" />
                        </span>
                        {emply.employeeId.name}
                      </span>
                    ))}
                  </>
                ) : (
                  'This Team Currently has no Coach'
                )}
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
