import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import baseURL from '../../utils/baseURL';
import TournamentAddSponsor from './TournamentAddSponsor';

const SponsorCard = ({ states, sponsors }) => {
  const [count, setCount] = useState(0);
  const handleRoleForm = (e) => {
    setCount(count + 1);
  };

  return (
    <>
      <div className="colm">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" />
      </div>

      <TournamentAddSponsor sponsors={sponsors} states={states} />

      {[...Array(count)].map((e, index) => (
        <div key={index}>
          <TournamentAddSponsor sponsors={sponsors} states={states} />
        </div>
      ))}

      <label htmlFor="">Add More Sponsors</label>
      <span onClick={(e) => handleRoleForm(e)}>
        <i className="fa fa-life-ring" aria-hidden="true"></i>
      </span>
    </>
  );
};

export default SponsorCard;
