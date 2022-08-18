import PropTypes from 'prop-types';
import Head from 'next/head';
import AttributeCard from '../common/AttributeCard';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const GamesDetails = ({ user, profile, Userdata }) => {
  const [attributeData, setAttributeData] = useState();

  const router = useRouter();

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
          {attributeData.attributeId === user._id ? (
            <button className="btn" onClick={handleDelete}>
              Delete
            </button>
          ) : null}
          {attributeData.attributeId === user._id ? null : (
            <button className="game_btn">INVITE TO TEAM</button>
          )}
        </div>
      )}

      {attributeData?.attributeId === user._id ? null : (
        <>
          {profile.user?._id === user?._id ? (
            <AttributeCard type="PROFILE" attributeId={user?._id} />
          ) : null}
        </>
      )}
    </>
  );
};

export default GamesDetails;
