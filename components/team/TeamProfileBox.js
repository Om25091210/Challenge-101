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
  const [attr, setAttr] = useState(data.team?.attributes);
  const [sociallinks, setSociallinks] = useState(data.team?.social);
  const [later, setLater] = useState(false);

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

  const empManager =
    data.team &&
    data.team.employees.map((x) => x).filter((x) => x.role === 'Manager');
  const empCoach =
    data.team &&
    data.team.employees.map((x) => x).filter((x) => x.role === 'Coach');

  useEffect(() => {
    axios
      .get(`${baseURL}/api/teams/teamdata/SPONSORS/${data.team?._id}`)
      .then((res) => setSponsors(res.data.sponsors));
  }, []);

  const isFollow =
    data.team &&
    data.team.followers
      ?.filter((team) => team?.user === user?._id)
      .map((team) => team?.user).length > 0;

  const playerId = profile.playergames[0]?.player?._id;

  const isReqSent =
    data.team &&
    data.team.request?.filter((reque) => reque.playerId._id === playerId)
      .length > 0;

  const isPlayer =
    data.team &&
    data.team.players?.filter((plyr) => plyr.playerId === playerId).length > 0;

  return (
    <div className="profile_box team_profile_box">
      <div className="profile_cover_photo">
        <div className="report">
          <a href="#">
            <i className="fa fa-flag" aria-hidden="true"></i> Report Team
          </a>
        </div>

        <form onSubmit={handleCoverSubmit}>
          <img
            className=""
            id="result"
            src={data.team && data.team.coverPhoto}
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
              <span className="follower">
                {data.team.followers?.length} followers
              </span>
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
              {later === false ? null : (
                <span className="active">
                  {data.team.isVerified ? (
                    <i className="fa fa-check" aria-hidden="true"></i>
                  ) : (
                    <i className="fa fa-question-circle" aria-hidden="true"></i>
                  )}
                </span>
              )}
            </div>
            {isManager || isAdmin ? null : (
              <>
                {isPlayer ? (
                  <>
                    <TeamFollow
                      team={data.team}
                      user={user}
                      isFollow={isFollow}
                    />
                    <div className="button">
                      <a href="#" className="btn">
                        MESSAGE
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="button">
                    <TeamFollow
                      team={data.team}
                      user={user}
                      isFollow={isFollow}
                    />
                    <a href="#" className="btn">
                      <TeamRequest
                        team={data.team}
                        profile={profile}
                        isReqSent={isReqSent}
                      />
                    </a>
                    <a href="#" className="">
                      <TeamChallenge team={data.team} teams={teams} />
                    </a>
                  </div>
                )}
              </>
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
              {data.team.social?.facebook ? (
                <a
                  href={`https://www.facebook.com/${data.team.social?.facebook}`}
                >
                  <i className="fa fa-facebook-official" aria-hidden="true"></i>
                </a>
              ) : null}
              {data.team.social?.instagram ? (
                <a
                  href={`https://www.instagram.com/${data.team.social?.instagram}`}
                >
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              ) : null}

              {data.team.social?.twitch ? (
                <a href={`https://www.twitch.tv/${data.team.social?.twitch}`}>
                  <i className="fa fa-twitch" aria-hidden="true"></i>
                </a>
              ) : null}

              {data.team.social?.youtube ? (
                <a
                  href={`https://www.youtube.com/c/${data.team.social?.youtube}`}
                >
                  <i className="fa fa-youtube" aria-hidden="true"></i>
                </a>
              ) : null}

              {data.team.social?.discord ? (
                <a href={`https://${data.team.social?.discord}`}>
                  <img
                    src="/assets/media/social/discord.png"
                    height="20px"
                    width="20px"
                  />
                </a>
              ) : null}

              {data.team.social?.website ? (
                <a href={`https://${data.team.social?.website}`}>
                  <i className="fa fa-globe" aria-hidden="true"></i>
                </a>
              ) : null}
            </div>
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
            <h5>Games</h5>
            <ul>
              {!data.games || data.games.length === 0 ? (
                <p>No Games Found..</p>
              ) : (
                data.games &&
                data.games.map((item, index) => (
                  <li key={index}>
                    <img src={item.imgUrl} alt={item.name} />{' '}
                  </li>
                ))
              )}
            </ul>
          </div>

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

          <div className="sponser">
            <h5 className="position">ARENAS:</h5>
            <ul>
              {!data.arenas || data.arenas.length === 0 ? (
                <p>No arenas defined...</p>
              ) : (
                data.arenas.map((item, index) => (
                  <li key={index}>
                    <span className="pos_name">
                      <img src={item.logoUrl} alt="" />
                      <p> {item.name}</p>
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
