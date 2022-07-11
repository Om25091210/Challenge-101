import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import baseURL from '../../utils/baseURL';
import TournamentPrizeAdd from './TournamentPrizeAdd';

const TournamentPrize = ({ tournamentId }) => {
  const [count, setCount] = useState(0);
  const [prizeData, setPrizeData] = useState([]);
  const [prizeCount, setPrizeCount] = useState(3);

  const handleRoleForm = (e) => {
    setCount(count + 1);
    setPrizeCount(prizeCount + 1);
  };

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.put(
        `${baseURL}/api/tournaments/tourPrize/${tournamentId}`,
        prizeData
      );
      toast.success('Prize added successfully');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshData();
  };

  return (
    <>
      <a href="#!" class="rules_form">
        <button class="btn">
          {' '}
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
          Add Prizes
        </button>
      </a>

      <div className="add_form">
        <a href="#!" className="close_block">
          X
        </a>

        <h3>Add Prizes</h3>

        <form className="common_form" onSubmit={handleSubmit}>
          <div className="prize1">
            <TournamentPrizeAdd prizes={'1st'} prizesData={prizeData} />
            <TournamentPrizeAdd prizes={'2nd'} prizesData={prizeData} />
            <TournamentPrizeAdd prizes={'3rd'} prizesData={prizeData} />

            {[...Array(count)].map((e, index) => (
              <div key={index} className="prize1">
                <TournamentPrizeAdd
                  prizes={`${prizeCount} th`}
                  prizesData={prizeData}
                />
              </div>
            ))}
          </div>

          <label htmlFor="">Add More Prize</label>
          <span onClick={(e) => handleRoleForm(e)}>
            <i className="fa fa-life-ring" aria-hidden="true"></i>
          </span>

          <input type="submit" className="btn" />
        </form>
      </div>
    </>
  );
};

export default TournamentPrize;
