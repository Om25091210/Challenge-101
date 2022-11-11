import React, { useEffect, useState } from 'react';
import baseURL from '@utils/baseURL';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';

const Tournament_Reg = ({ user, tournament, profile, groups, teams }) => {
  const router = useRouter();
  const [isGamePlayer, setIsGamePlayer] = useState();
  const [trigger, setTrigger] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState();

  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, [trigger]);

  const isRegistered =
    tournament?.registered?.filter((tour) => {
      return tour?.user?._id === user?._id;
    }).length > 0;

  const isTeamRegistered =
    tournament?.teams?.filter((team) => {
      return team?.teamId?._id === profile?.current_team?._id;
    }).length > 0;

  const isRegFull = tournament.registered?.length === tournament.participants;

  const isTeamRegFull = tournament.numberOfTeam === tournament.teams?.length;

  const reghandlesubmit = async (e) => {
    e.preventDefault();
    try {
      if (tournament.playType === 'SOLO') {
        axios
          .put(
            `${baseURL}/api/tournaments/register/${tournament._id}/${user._id}`
          )
          .then((res) => setIsGamePlayer(res.data));
        if (!isGamePlayer) {
          toast.warning(
            `Please connect ${tournament.games[0].gameId.name} to your profile.`
          );
        } else if (isRegistered === false || isTeamRegistered === false) {
          toast.success('Registered Successfully');
        } else {
          toast.success('Left Tournament');
        }
      } else {
        axios.put(
          `${baseURL}/api/tournaments/register/team/${tournament._id}/${selectedTeam}`
        );
        toast.success('registered Successfully');
        $('a.model_close').parent().removeClass('show_model');
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  return (
    <>
      {tournament.playType === 'TEAMS' ? (
        <>
          {isTeamRegistered ? (
            <>
              <button className="join" onClick={reghandlesubmit}>
                REGISTERED
              </button>
            </>
          ) : (
            <>
              {isTeamRegFull !== true ? (
                <>
                  <div className="loc_box edit_pof">
                    <a
                      href="#!"
                      className="model_show_btn"
                      onClick={() => setTrigger(!trigger)}
                    >
                      Register
                    </a>
                    <div className="common_model_box" id="big_poup">
                      <a href="#!" className="model_close">
                        X
                      </a>
                      <div className="inner_model_box">
                        <div className="add_job_height">
                          <h3>Register</h3>
                          <form className="common_form">
                            <div className="colm rows">
                              <label htmlFor="exampleFormControlInput1">
                                Challenge with the team
                              </label>
                              <select
                                name="selectedTeam"
                                value={selectedTeam}
                                onChange={(e) =>
                                  setSelectedTeam(e.target.value)
                                }
                              >
                                <option value="--">--</option>
                                {teams &&
                                  teams.map((tem) => (
                                    <option value={tem._id}>{tem.name}</option>
                                  ))}
                              </select>
                              <button className="btn" onClick={reghandlesubmit}>
                                Confirm
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="overlay"></div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <button disabled={true}>Slots Unavailable</button>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {isRegistered ? (
            <>
              <button className="join" onClick={reghandlesubmit}>
                REGISTERED
              </button>
            </>
          ) : (
            <>
              {isRegFull !== true ? (
                <>
                  <button onClick={reghandlesubmit} className="join">
                    REGISTER
                  </button>
                </>
              ) : (
                <>
                  <button disabled={true}>Slots Unavailable</button>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Tournament_Reg;
