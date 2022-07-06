import React, { useState } from 'react';

const ProfileSponsors = ({ sponsors, Userdata, user, profileSponsors }) => {
  const [state, setState] = useState({
    sponsor: ''
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${baseURL}/api/profile/sponsors/${Userdata.profile._id}`, {
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
    <>
      <div className="tab hide" id="sponsors">
        <div className="sponsers_box">
          <div className="sponser_btn">
            {' '}
            {Userdata.profile.user._id === user._id ? (
              <a href="#!" className="model_show_btn">
                <button className="btn">
                  {' '}
                  <i className="fa fa-plus-circle" aria-hidden="true"></i>
                </button>
              </a>
            ) : null}
            <div className="common_model_box" style={{ height: '12rem' }}>
              {' '}
              <a href="#!" className="model_close">
                {' '}
                X{' '}
              </a>
              <div className="inner_model_box">
                <h3>Sponsor's</h3>
                <form className="common_form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className="">
                      <select
                        className="form-control custom-select text-capitalize"
                        name="sponsor"
                        value={state.value}
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
          <ul>
            {profileSponsors.type === 'SPONSORS' &&
              profileSponsors?.sponsors.map((item, index) => (
                <li key={index}>
                  <div className="sponser_name">
                    {' '}
                    <img src={item.imgUrl} alt={item.name} />{' '}
                  </div>
                  <div className="sponser_data">
                    {' '}
                    <span className="head_spons_bg">{item.name}</span>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfileSponsors;
