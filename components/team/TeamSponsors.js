import { useState, useEffect } from 'react';
import baseURL from '@utils/baseURL';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { teamformvalidate } from '@utils/valid';

const TeamSponsors = ({ user, data }) => {
  const isLoggedInUser = data.team.user._id === user._id;

  const [sponsors, setSponsors] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const [state, setState] = useState({
    sponsor: ''
  });

  useEffect(() => {
    axios
      .get(`${baseURL}/api/all/sponsors`)
      .then((res) => setSponsors(res.data));
  }, []);

  console.log(state);

  const mutation = useMutation(
    async (formdata) =>
      await axios.put(`${baseURL}/api/teams/${data.team._id}`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      let formdata = new FormData();

      Object.entries(state).map(([key, value]) => {
        formdata.append(key, value);
      });

      try {
        await mutation.mutateAsync(formdata);
        toast.success('Your Sponsor has been set successfully! ');
      } catch (err) {
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
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
      setState({ ...state, [e.target.name]: value });
    } else if (e.target.files) {
      console.log(e.target.files[0]);
      setState({ ...state, [e.target.name]: e.target.files[0] });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  }

  return (
    <div className="tab hide" id="sponsors">
      <div className="sponsers_box">
        <h1>sponser</h1>
        <ul>
          {data.sponsors &&
            data.sponsors.map((item, index) => (
              <li key={index}>
                <div className="sponser_name">
                  <img src={item.imgUrl} alt={item.sponsorId} />
                </div>
                <div className="sponser_data">
                  {' '}
                  <span className="head_spons_bg">{item.sponsorId}</span>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
        </ul>

        {isLoggedInUser ? (
          <span
          // className="edit_cover_photo "
          >
            <div className="loc_box">
              {' '}
              {/* <span className="ct" >Detail's</span>{' '} */}
              <a href="#!" className="model_show_btn">
                <i
                  className="fa fa-pencil"
                  aria-hidden="true"
                  style={{ color: 'red' }}
                ></i>
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
                        {/* <label htmlFor="exampleFormControlInput1">
                          
                        </label> */}

                        <select
                          className="form-control"
                          name="sponsor"
                          value={state.sponsor}
                          multiple={true}
                          onChange={handleChange}
                        >
                          {sponsors.map((spon, idx) => (
                            <option key={idx} value={spon._id}>
                              {' '}
                              {spon.name}{' '}
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
        ) : null}
      </div>
    </div>
  );
};

export default TeamSponsors;
