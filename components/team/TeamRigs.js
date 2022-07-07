import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import RigsFilter from '../profile/RigsFilter';

const TeamRigs = ({ user, profile, data, isAdmin, teamRigs }) => {
  const [rigsData, setRigsData] = useState([]);
  const [states, setStates] = useState({
    Keyboard: '',
    Mouse: '',
    Headphone: '',
    Mat: '',
    Monitor: '',
    GPU: '',
    Chair: '',
    rigsType: 'PC',
    Cbrand: '',
    Cmodel: '',
    Controller: '',
    Mbrand: '',
    Mmodel: ''
  });

  useEffect(() => {
    axios.get(`${baseURL}/api/rigsdata/`).then((res) => setRigsData(res.data));
  }, []);

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleChangeCheck = (e) => {
    setStates({ ...states, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.put(`${baseURL}/api/teams/rigs/${data.team?._id}`, states);
      toast.success('Saved Changes', { autoClose: 2000 });
      $('a.model_close').parent().removeClass('show_model');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshData();
  };

  return (
    <>
      <div className="rigs">
        <ul>
          {teamRigs.rigs?.length === 0 ? (
            <p>No rigs available for the team.</p>
          ) : (
            teamRigs.type === 'RIGS' &&
            teamRigs.rigs.map((rig) => (
              <li>
                <div className="lft_prod_det">
                  {' '}
                  <span className="new"> New</span>
                  <div className="prod_brand">
                    {rig.name.length > 30
                      ? rig.name.substring(0, 30) + '...'
                      : rig.name}
                  </div>
                  <p className="prod_name">{rig.category}</p>
                  <a href="#prod2" className="quickpoup">
                    Buy Now
                  </a>{' '}
                </div>
                <div className="prod_img">
                  <img src={rig.image} alt="" />
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="sponser_btn">
        {' '}
        {isAdmin ? (
          <a href="#!" className="model_show_btn">
            <button className="btn">
              {' '}
              <i className="fa fa-plus-circle" aria-hidden="true"></i> Add Your
              Rigs
            </button>
          </a>
        ) : null}
        <div className="common_model_box">
          {' '}
          <a href="#!" className="model_close">
            {' '}
            X{' '}
          </a>
          <div className="inner_model_box">
            <h3>Rigs</h3>

            <form className="common_form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label for="exampleFormControlTextarea1">Platform</label>
                <div className="btn_selection">
                  <div className="big_btn">
                    <span class="form-check-label terms">PC</span>
                    <input
                      type="checkbox"
                      name="rigsType"
                      value="PC"
                      onChange={handleChangeCheck}
                    />
                  </div>

                  <div className="big_btn">
                    <span class="form-check-label terms">Console</span>
                    <input
                      type="checkbox"
                      name="rigsType"
                      value="Console"
                      onChange={handleChangeCheck}
                    />
                  </div>

                  <div className="big_btn">
                    <span class="form-check-label terms">Mobile</span>
                    <input
                      type="checkbox"
                      name="rigsType"
                      value="Mobile"
                      onChange={handleChangeCheck}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="">
                  {states.rigsType === 'PC' ? (
                    <>
                      <RigsFilter
                        val="Keyboard"
                        data={rigsData}
                        states={states}
                      />

                      <RigsFilter val="Mouse" data={rigsData} states={states} />

                      <RigsFilter
                        val="Headphone"
                        data={rigsData}
                        states={states}
                      />

                      <RigsFilter val="Mat" data={rigsData} states={states} />

                      <RigsFilter
                        val="Monitor"
                        data={rigsData}
                        states={states}
                      />

                      <RigsFilter val="GPU" data={rigsData} states={states} />

                      <RigsFilter val="Chair" data={rigsData} states={states} />
                    </>
                  ) : (
                    <>
                      {states.rigsType === 'Console' ? (
                        <>
                          <RigsFilter
                            val="Cbrand"
                            data={rigsData}
                            states={states}
                          />

                          <RigsFilter
                            val="Cmodel"
                            data={rigsData}
                            states={states}
                          />

                          <RigsFilter
                            val="Controller"
                            data={rigsData}
                            states={states}
                          />

                          <RigsFilter
                            val="Headphone"
                            data={rigsData}
                            states={states}
                          />

                          <RigsFilter
                            val="Chair"
                            data={rigsData}
                            states={states}
                          />
                        </>
                      ) : (
                        <>
                          <RigsFilter
                            val="Mbrand"
                            data={rigsData}
                            states={states}
                          />

                          <RigsFilter
                            val="Mmodel"
                            data={rigsData}
                            states={states}
                          />

                          <RigsFilter
                            val="Controller"
                            data={rigsData}
                            states={states}
                          />

                          <RigsFilter
                            val="Earphone"
                            data={rigsData}
                            states={states}
                          />
                        </>
                      )}
                    </>
                  )}
                </div>
                <button className="btn">Done</button>
              </div>
            </form>
          </div>
          <div className="overlay"></div>
        </div>
      </div>
    </>
  );
};

export default TeamRigs;
