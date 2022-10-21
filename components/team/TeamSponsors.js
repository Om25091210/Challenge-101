import { useState, useEffect } from 'react';
import baseURL from '@utils/baseURL';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import TournamentAddSponsor from '../tournament/TournamentAddSponsor';

const TeamSponsors = ({
  user,
  data,
  isManager,
  isAdmin,
  isOwner,
  isCEO,
  teamSponsors
}) => {
  const [sponsors, setSponsors] = useState([]);

  const [state, setState] = useState({
    sponsor: []
  });
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/all/sponsors`)
      .then((res) => setSponsors(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${baseURL}/api/teams/sponsors/${data.team._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
      });

      toast.success('Your Sponsor has been set successfully! ');
      $('a.model_close').parent().removeClass('show_model');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshData();
  };

  const [count, setCount] = useState(0);
  const handleRoleForm = (e) => {
    setCount(count + 1);
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
      setState({ ...state, [e.target.name]: value });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  }

  return (
    <div className="tab hide" id="sponsors">
      <div className="sponsers_box">
        <span>
          <div className="loc_box">
            {' '}
            {isManager || isAdmin || isOwner || isCEO ? (
              <a href="#!" className="model_show_btn">
                <button className="btn">
                  <i className="fa fa-plus-circle" aria-hidden="true"></i> Add
                  Sponsor
                </button>
              </a>
            ) : null}
            <div className="common_model_box" style={{ height: '12rem' }}>
              <a href="#!" className="model_close">
                X
              </a>

              <div className="inner_model_box">
                <h3>Sponsor's</h3>

                <form className="common_form" onSubmit={handleSubmit}>
                  <TournamentAddSponsor sponsors={sponsors} states={state} />

                  {[...Array(count)].map((e, index) => (
                    <div key={index}>
                      <TournamentAddSponsor
                        sponsors={sponsors}
                        states={state}
                      />
                    </div>
                  ))}
                  <label htmlFor="">Add More Sponsors</label>
                  <span onClick={(e) => handleRoleForm(e)}>
                    <i className="fa fa-life-ring" aria-hidden="true"></i>
                  </span>
                  <button className="btn">Update</button>
                </form>
              </div>
              <div className="overlay"></div>
            </div>
          </div>
        </span>

        <ul>
          {teamSponsors.sponsors?.length === 0 ? (
            <p style={{ color: 'white' }}>No Sponsors available.</p>
          ) : (
            teamSponsors.type === 'SPONSORS' &&
            teamSponsors.sponsors.map((item, index) => (
              <li key={index}>
                <div className="sponser_name">
                  <img src={item.imgUrl} alt={item.name} />
                </div>
                <div className="sponser_data">
                  {' '}
                  <span className="head_spons_bg">{item.name}</span>
                  <p>{item.description}</p>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TeamSponsors;
