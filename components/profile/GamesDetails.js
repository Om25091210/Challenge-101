import PropTypes from 'prop-types';
import Head from 'next/head';
import AttributeCard from '../common/AttributeCard';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import RecruitEdit from './RecruitEdit';

const GamesDetails = ({ user, Userdata, teams }) => {
  const [attributeData, setAttributeData] = useState();
  const [trigger, setTrigger] = useState(true);

  const isReq =
    Userdata.playergames.filter((pro) => {
      return Userdata.request.some((req) => {
        return pro.player === req.playerId;
      });
    }).length > 0;

  const [request, setRequest] = useState(isReq);
  const [selectTeam, setSelectTeam] = useState();
  const router = useRouter();

  const handleChangeCheck = (e) => {
    setSelectTeam({ ...selectTeam, [e.target.name]: e.target.value });
  };

  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/attribute/PROFILE/${Userdata.user._id}`)
      .then((res) => setAttributeData(res.data));
  }, [Userdata]);

  const handleDelete = (e) => {
    e.preventDefault();
    try {
      axios.delete(`${baseURL}/api/attribute/${attributeData._id}`);
      toast.success('Deleted Card Successfully');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Error Deleting the Card');
    }
    refreshData();
  };

  const handleGameData = async (e) => {
    e.preventDefault();
    let gameId = attributeData.games[0].gameId._id;
    let userId = Userdata.user._id;
    let teamId = selectTeam.teamId;

    try {
      await fetch(
        `${baseURL}/api/teams/gamedata/${gameId}/${userId}/${teamId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: cookie.get('token')
          }
        }
      );
      toast.success('Invitation has been sent.');
      $('a.model_close').parent().removeClass('show_model');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Server Error');
    }
    setRequest(!request);
  };

  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, [trigger]);

  return (
    <>
      {attributeData && (
        <div className="games_details">
          <ul>
            <li>
              <span className="nm">Game: </span>{' '}
              {attributeData.games?.map((game) => (
                <img
                  src={game.gameId?.imgUrl}
                  style={{ height: '35px', width: '35px' }}
                />
              ))}
            </li>
            <li>
              <span className="nm">Roles: </span>{' '}
              <span className="task">{attributeData.role}</span>{' '}
            </li>
            <li>
              <span className="nm">Mic:</span>{' '}
              <span className="task">
                {attributeData.mic === true ? 'On' : 'Off'}
              </span>
            </li>
            <li>
              <span className="nm">Platform:</span>{' '}
              <span className="task"> {attributeData?.platform}</span>
            </li>
            <li>
              <span className="nm">Language:</span>{' '}
              <span className="task">
                {' '}
                {attributeData.language?.map((lang) => lang.slice(0, 3))}
              </span>
            </li>
            <li>
              <span className="nm">Win rate/KDA:</span>{' '}
              <span className="task"> -- </span>
            </li>
            <li>
              <span className="nm">MMR:</span>{' '}
              <span className="task"> -- </span>
            </li>
            {/* <li>
              <span className="nm">Availablilty:</span>{' '}
              <span className="task"> 4 hours per day 7 days a week </span>
            </li> */}
          </ul>

          {/* <div className="chart_box">
            <img src="/assets/media/profile/chart.jpg" alt="" />
          </div> */}
          {attributeData.attributeId === user._id ? (
            <button className="btn" onClick={handleDelete}>
              Delete
            </button>
          ) : null}
          {attributeData.attributeId === user._id ? (
            <RecruitEdit attributeData={attributeData} />
          ) : null}
          {attributeData.attributeId === user._id ? null : (
            <>
              {request ? (
                <button className="game_btn" disabled>
                  INVITATION SENT
                </button>
              ) : (
                <a
                  href="#!"
                  className="model_show_btn"
                  onClick={() => setTrigger(!trigger)}
                >
                  <button className="game_btn">
                    <i className="fa fa-plus-circle" aria-hidden="true"></i>
                    INVITE TO TEAM
                  </button>
                </a>
              )}

              <div className="common_model_box" id="big_poup">
                <a href="#!" className="model_close">
                  X
                </a>
                <div className="inner_model_box">
                  <div className="add_job_height">
                    <h3>Invite {Userdata.user.username} To Team</h3>
                    <form action="">
                      <label htmlFor="exampleFormControlInput1">
                        Select Team
                      </label>
                      {teams &&
                        teams.map((team) => (
                          <div>
                            <input
                              type="radio"
                              name="teamId"
                              id=""
                              value={team._id}
                              onChange={handleChangeCheck}
                            />
                            <p>{team.name}</p>
                          </div>
                        ))}
                      <button
                        className="btn"
                        onClick={handleGameData}
                        type="submit"
                      >
                        Invite
                      </button>
                    </form>
                  </div>
                </div>
                <div className="overlay"></div>
              </div>
            </>
          )}
        </div>
      )}

      {attributeData?.attributeId === user._id ? null : (
        <>
          {Userdata.user?._id === user?._id ? (
            <AttributeCard type="PROFILE" attributeId={user?._id} />
          ) : null}
        </>
      )}
    </>
  );
};

export default GamesDetails;
