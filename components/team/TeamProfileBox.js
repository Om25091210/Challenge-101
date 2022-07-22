import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import ReactCountryFlag from 'react-country-flag';
import Moment from 'moment';
import TeamFollow from './TeamFollow';
import TeamRequest from '../discover/invites/TeamRequest';
import TeamChallenge from '../challenges/TeamChallenge';
import TeamEdit from './TeamEdit';

const TeamProfileBox = ({ user, data, isManager, isAdmin, profile, teams }) => {
  const [attr, setAttr] = useState(data.team.attributes);
  const [sociallinks, setSociallinks] = useState(data.team.social);
  let [tabData, setTabData] = useState([]);

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const [coverPic, setCoverPic] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [sponsors, setSponsors] = useState([]);

  function handleChangeAttr(e) {
    setAttr({ ...attr, [e.target.name]: e.target.value });
  }

  function handleChangeSocial(e) {
    setSociallinks({ ...sociallinks, [e.target.name]: e.target.value });
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

  const handleLinksSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${baseURL}/api/teams/sociallinks/${data.team._id}`,
        sociallinks,
        {
          headers: {
            Authorization: cookie.get('token'),
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success('Links Have Been Updated');
      refreshData();
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  const empManager = data.team.employees
    .map((x) => x)
    .filter((x) => x.role === 'Manager');
  const empCoach = data.team.employees
    .map((x) => x)
    .filter((x) => x.role === 'Coach');

  useEffect(() => {
    axios
      .get(`${baseURL}/api/teams/teamdata/SPONSORS/${data.team?._id}`)
      .then((res) => setSponsors(res.data.sponsors));
  }, []);

  return (
    <div className="profile_box team_profile_box">
      <div className="profile_cover_photo">
        <div className="report">
          <a href="#">
            <i className="fa fa-flag" aria-hidden="true"></i> Report Team
          </a>
        </div>

        <form onSubmit={handleCoverSubmit}>
          <img className="" id="result" src={data.team.coverPhoto} alt="" />

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
              {isManager || isAdmin ? (
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
            {isManager || isAdmin ? (
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
                Founded {Moment(data.team.founded).format('MMM YYYY')}
              </span>
              <span className="follower">{data.players?.length} followers</span>
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
            {isManager || isAdmin ? null : (
              <div className="button">
                <a href="#" className="btn">
                  <TeamFollow team={data.team} user={user} />
                </a>{' '}
                <a href="#" className="btn">
                  MESSAGE
                </a>
                <a href="#" className="btn">
                  <TeamRequest team={data.team} user={user} profile={profile} />
                </a>
                <a href="#" className="btn">
                  <TeamChallenge team={data.team} teams={teams} />
                </a>
              </div>
            )}

            <TeamEdit
              isAdmin={isAdmin}
              isManager={isManager}
              team={data.team}
            />

            <span>
              <div className="loc_box">
                {' '}
                {/* {isManager || isAdmin ? (
                  <a href="#!" className="model_show_btn">
                    <button className="btn">
                      <i
                        className="fa fa-trash"
                        aria-hidden="true"
                        style={{ color: 'white' }}
                      ></i>
                    </button>
                  </a>
                ) : null} */}
                <div className="common_model_box">
                  <a href="#!" className="model_close">
                    X
                  </a>

                  <div className="inner_model_box">
                    <h3>Are You Sure?</h3>

                    <div className="two_btn">
                      <button className="btn">No</button>
                      <button className="btn" onClick={handleDeleteSubmit}>
                        Yes
                      </button>
                    </div>
                  </div>
                  <div className="overlay"></div>
                </div>
              </div>
            </span>
          </div>
          <div className="bottom_details team_details">
            <div className="team_rank_box">
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
              <a
                href={`https://www.facebook.com/${data.team.social?.facebook}`}
                target="_blank"
              >
                <i className="fa fa-facebook-official" aria-hidden="true"></i>
              </a>
              <a
                href={`https://www.instagram.com/${data.team.social?.instagram}`}
                target="_blank"
              >
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
              <a
                href={`https://www.twitch.tv/${data.team.social?.twitch}`}
                target="_blank"
              >
                <i className="fa fa-twitch" aria-hidden="true"></i>
              </a>
              <a href={`${data.team.social?.discord}`} target="_blank">
                <img
                  src="/assets/media/social/discord.png"
                  height="20px"
                  width="20px"
                />
              </a>
              <a
                href={`https://www.youtube.com/c/${data.team.social?.youtube}`}
                target="_blank"
              >
                <i className="fa fa-youtube"></i>
              </a>
              <a
                href={`https://www.twitter.com/${data.team.social?.twitter}`}
                target="_blank"
              >
                <i className="fa fa-twitter-square"></i>
              </a>
              <a href={`https://${data.team?.website}`} target="_blank">
                <i className="fa fa-globe"></i>
              </a>
            </div>
            <span>
              <div className="loc_box">
                {' '}
                {isManager || isAdmin ? (
                  <a href="#!" className="model_show_btn">
                    <button className="btn">
                      <i
                        className="fa fa-gear"
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
                    <h3>Social Links</h3>
                    <ul className="socail_urls">
                      <li>
                        <input
                          type="text"
                          placeholder="Facebook User ID"
                          onChange={handleChangeSocial}
                          value={sociallinks.facebook}
                          name="facebook"
                        />
                      </li>
                      <li>
                        {' '}
                        <input
                          type="text"
                          placeholder="Instagram Username"
                          onChange={handleChangeSocial}
                          value={sociallinks.instagram}
                          name="instagram"
                        />
                      </li>
                      <li>
                        {' '}
                        <input
                          type="text"
                          placeholder="Twitch Channel Name"
                          onChange={handleChangeSocial}
                          value={sociallinks.twitch}
                          name="twitch"
                        />
                      </li>
                      <li>
                        <input
                          type="text"
                          placeholder="Discord Server URL"
                          onChange={handleChangeSocial}
                          value={sociallinks.discord}
                          name="discord"
                        />
                      </li>
                      <li>
                        <input
                          type="text"
                          placeholder="Youtube Channel Name"
                          onChange={handleChangeSocial}
                          value={sociallinks.youtube}
                          name="youtube"
                        />
                      </li>
                      <li>
                        {' '}
                        <input
                          type="text"
                          placeholder="@Twitter Username"
                          onChange={handleChangeSocial}
                          value={sociallinks.twitter}
                          name="twitter"
                        />
                      </li>
                      <li>
                        {' '}
                        <input
                          type="text"
                          placeholder="Your Website Name with Extension"
                          onChange={handleChangeSocial}
                          value={sociallinks.website}
                          name="website"
                        />
                      </li>
                    </ul>

                    <button className="btn" onClick={handleLinksSubmit}>
                      Confirm Changes
                    </button>
                  </div>
                  <div className="overlay"></div>
                </div>
              </div>
            </span>
          </div>

          {data.team ? data.team.description : ''}

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
                          <img src={emply.employeeId?.profilePicUrl} alt="" />
                        </span>
                        {emply.employeeId?.name}
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
          <div className="sponser">
            <h5>SPONSORS</h5>

            <ul>
              {!sponsors || sponsors.length === 0 ? (
                <p>No sponsors defined..</p>
              ) : (
                sponsors.map((item, index) => (
                  <li key={index}>
                    <img src={item.imgUrl} alt="" />{' '}
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="team_pos">
            <ul>
              <h5 className="position">ARENAS:</h5>
              {!data.arenas || data.arenas.length === 0 ? (
                <p>No arenas defined...</p>
              ) : (
                data.arenas.map((item, index) => (
                  <li key={index}>
                    <span className="pos_name">
                      <img src={item.logoUrl} alt="" /> {item.name}
                    </span>
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
