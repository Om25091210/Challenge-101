import PropTypes from 'prop-types';
import Head from 'next/head';
import RecruitmentCard from '../common/RecruitmentCard';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const GamesDetails = ({ user, profile, Userdata }) => {
  const [recruitData, setRecruitData] = useState();

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/recruit/PROFILE/${Userdata.user._id}`)
      .then((res) => setRecruitData(res.data));
  }, [Userdata]);

  const handleDelete = (e) => {
    e.preventDefault();
    try {
      axios.delete(`${baseURL}/api/recruit/${recruitData._id}`);
      toast.success('Deleted Card Successfully');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Error Deleting the Card');
    }
    refreshData();
  };

  return (
    <>
      {recruitData && (
        <div className="games_details">
          <ul>
            <li>
              <span className="nm">Game: </span>{' '}
              {recruitData.games?.map((game) => (
                <img
                  src={game.gameId.imgUrl}
                  style={{ height: '35px', width: '35px' }}
                />
              ))}
            </li>
            <li>
              <span className="nm">Roles: </span>{' '}
              <span className="task">{recruitData.role}</span>{' '}
            </li>
            <li>
              <span className="nm">Mic:</span>{' '}
              <span className="task">
                {recruitData.mic === true ? 'On' : 'Off'}
              </span>
            </li>
            <li>
              <span className="nm">Platform:</span>{' '}
              <span className="task"> PC</span>
            </li>
            <li>
              <span className="nm">Language:</span>{' '}
              <span className="task">
                {' '}
                {recruitData.language?.map((lang) => lang.slice(0, 3))}
              </span>
            </li>
            <li>
              <span className="nm">Win rate/KDA:</span>{' '}
              <span className="task"> 67% / 2.9 </span>
            </li>
            <li>
              <span className="nm">MMR:</span>{' '}
              <span className="task"> 3211 </span>
            </li>
            <li>
              <span className="nm">Availablilty:</span>{' '}
              <span className="task"> 4 hours per day 7 days a week </span>
            </li>
          </ul>

          <div className="chart_box">
            <img src="/assets/media/profile/chart.jpg" alt="" />
          </div>
          {recruitData.RecruitId === user._id ? (
            <button className="btn" onClick={handleDelete}>
              Delete
            </button>
          ) : null}
          {recruitData.RecruitId === user._id ? null : (
            <button className="game_btn">INVITE TO TEAM</button>
          )}
        </div>
      )}

      {recruitData?.RecruitId === user._id ? null : (
        <>
          {profile.user?._id === user?._id ? (
            <RecruitmentCard type="PROFILE" RecruitId={user?._id} />
          ) : null}
        </>
      )}
    </>
  );
};

export default GamesDetails;
