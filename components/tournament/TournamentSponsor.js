import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseURL from '@utils/baseURL';
import { useRouter } from 'next/router';

const TournamentSponsor = ({ user, data, isUser }) => {
  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);

  const isLoggedInUser = data.tournament?.user?._id === user._id;
  const [sponsors, setSponsors] = useState([]);
  const [state, setState] = useState({
    sponsor: ''
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
      await fetch(
        `${baseURL}/api/tournaments/sponsors/${data.tournament._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(state)
        }
      );
      toast.success('Your Sponsor has been set successfully! ');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshData();
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
        <ul>
          {data.sponsors &&
            data.sponsors.map((spons, index) => (
              <li key={index}>
                <div className="sponser_name">
                  <img src={spons.imgUrl} alt={spons.sponsorId} />
                </div>
                <div className="sponser_data">
                  {' '}
                  <span className="head_spons_bg">{spons.name}</span>
                  <p>{spons.description}</p>
                </div>
              </li>
            ))}
        </ul>

        <span>
          <div className="loc_box">
            {' '}
            <a href="#!" className="model_show_btn">
              {isUser ? (
                <button className="btn">
                  <i aria-hidden="true"> Edit Sponsor</i>
                </button>
              ) : null}
            </a>
            <div className="common_model_box" style={{ height: '12rem' }}>
              <a href="#!" className="model_close">
                X
              </a>
              <div className="inner_model_box">
                <h3>Sponsor's</h3>
                <form className="common_form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className="colm">
                      <select
                        className="form-control"
                        multiple={true}
                        name="sponsor"
                        value={state.value}
                        onChange={handleChange}
                      >
                        {sponsors.map((sponser, idx) => (
                          <option key={idx} value={sponser._id}>
                            {' '}
                            {sponser.name}{' '}
                          </option>
                        ))}
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
      </div>
    </div>
  );
};

export default TournamentSponsor;
