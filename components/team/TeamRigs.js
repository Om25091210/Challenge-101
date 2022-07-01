import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const TeamRigs = ({ user, profile, data, isAdmin }) => {
  const [searchText, setSearchText] = useState('');
  const [searchText2, setSearchText2] = useState('');
  const [searchText3, setSearchText3] = useState('');
  const [searchText4, setSearchText4] = useState('');
  const [searchText5, setSearchText5] = useState('');
  const [searchText6, setSearchText6] = useState('');
  const [searchText7, setSearchText7] = useState('');
  const [rigsData, setRigsData] = useState([]);
  const [states, setStates] = useState({
    keyboard: '',
    mouse: '',
    headphone: '',
    mat: '',
    monitor: '',
    gpu: '',
    chair: ''
  });

  useEffect(() => {
    axios.get(`${baseURL}/api/rigsdata/`).then((res) => setRigsData(res.data));
  }, []);

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const [filteredData, setFilteredData] = useState([]);
  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setSearchText(searchWord);
    const newFilter = rigsData?.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchWord.toLowerCase()) &&
        value.category === 'Keyboard'
      );
    });

    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const handleSelectedRig = (data) => {
    setSearchText(data.name);
    states.keyboard = data._id;
  };

  const [filteredData2, setFilteredData2] = useState([]);
  const handleFilter2 = (event) => {
    const searchWord = event.target.value;

    setSearchText2(searchWord);
    const newFilter = rigsData?.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchWord.toLowerCase()) &&
        value.category === 'Mouse'
      );
    });

    if (searchText2 === '') {
      setFilteredData2([]);
    } else {
      setFilteredData2(newFilter);
    }
  };
  const handleSelectedRig2 = (data) => {
    setSearchText2(data.name);
    states.mouse = data._id;
  };

  const [filteredData3, setFilteredData3] = useState([]);
  const handleFilter3 = (event) => {
    const searchWord3 = event.target.value;

    setSearchText3(searchWord3);
    const newFilter = rigsData?.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchWord3.toLowerCase()) &&
        value.category === 'Headphone'
      );
    });

    if (searchText3 === '') {
      setFilteredData3([]);
    } else {
      setFilteredData3(newFilter);
    }
  };
  const handleSelectedRig3 = (data) => {
    setSearchText3(data.name);
    states.headphone = data._id;
  };

  const [filteredData4, setFilteredData4] = useState([]);
  const handleFilter4 = (event) => {
    const searchWord4 = event.target.value;

    setSearchText4(searchWord4);
    const newFilter = rigsData?.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchWord4.toLowerCase()) &&
        value.category === 'Mat'
      );
    });

    if (searchText4 === '') {
      setFilteredData4([]);
    } else {
      setFilteredData4(newFilter);
    }
  };
  const handleSelectedRig4 = (data) => {
    setSearchText4(data.name);
    states.mat = data._id;
  };

  const [filteredData5, setFilteredData5] = useState([]);
  const handleFilter5 = (event) => {
    const searchWord5 = event.target.value;

    setSearchText5(searchWord5);
    const newFilter = rigsData?.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchWord5.toLowerCase()) &&
        value.category === 'Monitor'
      );
    });

    if (searchText5 === '') {
      setFilteredData5([]);
    } else {
      setFilteredData5(newFilter);
    }
  };
  const handleSelectedRig5 = (data) => {
    setSearchText5(data.name);
    states.monitor = data._id;
  };

  const [filteredData6, setFilteredData6] = useState([]);
  const handleFilter6 = (event) => {
    const searchWord6 = event.target.value;

    setSearchText6(searchWord6);
    const newFilter = rigsData?.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchWord6.toLowerCase()) &&
        value.category === 'GPU'
      );
    });

    if (searchText6 === '') {
      setFilteredData6([]);
    } else {
      setFilteredData6(newFilter);
    }
  };
  const handleSelectedRig6 = (data) => {
    setSearchText6(data.name);
    states.gpu = data._id;
  };

  const [filteredData7, setFilteredData7] = useState([]);
  const handleFilter7 = (event) => {
    const searchWord7 = event.target.value;

    setSearchText7(searchWord7);
    const newFilter = rigsData?.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchWord7.toLowerCase()) &&
        value.category === 'Chair'
      );
    });

    if (searchText7 === '') {
      setFilteredData7([]);
    } else {
      setFilteredData7(newFilter);
    }
  };
  const handleSelectedRig7 = (data) => {
    setSearchText7(data.name);
    states.chair = data._id;
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
          {data.rigs.length === 0 ? (
            <p>No rigs available for the team.</p>
          ) : (
            data.rigs.map((rig) => (
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
        <div className="common_model_box" style={{ height: '12rem' }}>
          {' '}
          <a href="#!" className="model_close">
            {' '}
            X{' '}
          </a>
          <div className="inner_model_box">
            <h3>Rigs</h3>

            {/* 
            <ul className="profile_tab_btn three_nav">
        <li className="active">
          <a href="#!" rel="Discover">
            Discover
          </a>
        </li>
        <li>
          <a href="#!" rel="for-you">
            For You
          </a>
        </li>
        <li>
          <a href="#!" rel="Following">
            Following
          </a>
        </li>
      </ul>

      <div className="prfoile_tab_data">
        <div className="tab hide" id="for-you">
          <div className="common_model_box" style={{ height: '12rem' }}>
            {' '}
            <a href="#!" className="model_close">
              {' '}
              X{' '}
            </a>
          <div className="inner_model_box">
          <h3>Hello</h3>
          </div>
          <div className="overlay"></div>
          </div>
        </div>

        <div className="tab hide" id="Following">
          <h3>Hello 2</h3>
        </div>

        <div className="tab" id="Discover">
          <h3>Hello 3</h3>
        </div>
      </div> */}

            <form className="common_form" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="">
                  <div className="colm">
                    <label htmlFor="exampleFormControlInput1">Keyboard</label>
                    <input
                      type="search"
                      id="keyboard"
                      name="keyboard"
                      placeholder="Enter The Keyboard name"
                      value={searchText}
                      onChange={handleFilter}
                      autoComplete="off"
                    />
                    {searchText.length !== 0 ? (
                      <div className="custom-rig-tag">
                        <div>
                          {!filteredData || filteredData.length === 0 ? (
                            <p>No Keyboard found..</p>
                          ) : (
                            filteredData.map((data) => (
                              <div
                                onClick={() => handleSelectedRig(data)}
                                key={data._id}
                              >
                                <img src={data?.image} height={50} width={50} />
                                <p>
                                  {data.name.length > 20
                                    ? data.name.substring(0, 20) + '...'
                                    : data.name}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="colm">
                    <label htmlFor="exampleFormControlInput1">Mouse</label>
                    <input
                      type="search"
                      id="mouse"
                      name="mouse"
                      placeholder="Enter Mouse name"
                      value={searchText2}
                      onChange={handleFilter2}
                      autoComplete="off"
                    />
                    {searchText2.length !== 0 ? (
                      <div className="custom-rig-tag">
                        <div>
                          {!filteredData2 || filteredData2.length === 0 ? (
                            <p>No Mouse found..</p>
                          ) : (
                            filteredData2.map((data) => (
                              <div
                                onClick={() => handleSelectedRig2(data)}
                                key={data._id}
                              >
                                <img src={data?.image} height={50} width={50} />
                                <p>
                                  {data.name.length > 20
                                    ? data.name.substring(0, 20) + '...'
                                    : data.name}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="colm">
                    <label htmlFor="exampleFormControlInput1">Headphone</label>
                    <input
                      type="search"
                      id="headphone"
                      name="headphone"
                      placeholder="Enter Headphone name"
                      value={searchText3}
                      onChange={handleFilter3}
                      autoComplete="off"
                    />
                    {searchText3.length !== 0 ? (
                      <div className="custom-rig-tag">
                        <div>
                          {!filteredData3 || filteredData3.length === 0 ? (
                            <p>No Headphone found..</p>
                          ) : (
                            filteredData3.map((data) => (
                              <div
                                onClick={() => handleSelectedRig3(data)}
                                key={data._id}
                              >
                                <img src={data?.image} height={50} width={50} />
                                <p>
                                  {data.name.length > 20
                                    ? data.name.substring(0, 20) + '...'
                                    : data.name}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="colm">
                    <label htmlFor="exampleFormControlInput1">Mat</label>
                    <input
                      type="search"
                      id="mat"
                      name="mat"
                      placeholder="Enter Mat name"
                      value={searchText4}
                      onChange={handleFilter4}
                      autoComplete="off"
                    />
                    {searchText4.length !== 0 ? (
                      <div className="custom-rig-tag">
                        <div>
                          {!filteredData4 || filteredData4.length === 0 ? (
                            <p>No Mat found..</p>
                          ) : (
                            filteredData4.map((data) => (
                              <div
                                onClick={() => handleSelectedRig4(data)}
                                key={data._id}
                              >
                                <img src={data?.image} height={50} width={50} />
                                <p>
                                  {data.name.length > 20
                                    ? data.name.substring(0, 20) + '...'
                                    : data.name}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="colm">
                    <label htmlFor="exampleFormControlInput1">Monitor</label>
                    <input
                      type="search"
                      id="monitor"
                      name="monitor"
                      placeholder="Enter Monitor name"
                      value={searchText5}
                      onChange={handleFilter5}
                      autoComplete="off"
                    />
                    {searchText5.length !== 0 ? (
                      <div className="custom-rig-tag">
                        <div>
                          {!filteredData5 || filteredData5.length === 0 ? (
                            <p>No Monitor found..</p>
                          ) : (
                            filteredData5.map((data) => (
                              <div
                                onClick={() => handleSelectedRig5(data)}
                                key={data._id}
                              >
                                <img src={data?.image} height={50} width={50} />
                                <p>
                                  {data.name.length > 20
                                    ? data.name.substring(0, 20) + '...'
                                    : data.name}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="colm">
                    <label htmlFor="exampleFormControlInput1">GPU</label>
                    <input
                      type="search"
                      id="gpu"
                      name="gpu"
                      placeholder="Enter GPU name"
                      value={searchText6}
                      onChange={handleFilter6}
                      autoComplete="off"
                    />
                    {searchText6.length !== 0 ? (
                      <div className="custom-rig-tag">
                        <div>
                          {!filteredData6 || filteredData6.length === 0 ? (
                            <p>No GPU found..</p>
                          ) : (
                            filteredData6.map((data) => (
                              <div
                                onClick={() => handleSelectedRig6(data)}
                                key={data._id}
                              >
                                <img src={data?.image} height={50} width={50} />
                                <p>
                                  {data.name.length > 20
                                    ? data.name.substring(0, 20) + '...'
                                    : data.name}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="colm">
                    <label htmlFor="exampleFormControlInput1">Chair</label>
                    <input
                      type="search"
                      id="chair"
                      name="chair"
                      placeholder="Enter Chair name"
                      value={searchText7}
                      onChange={handleFilter7}
                      autoComplete="off"
                    />
                    {searchText7.length !== 0 ? (
                      <div className="custom-rig-tag">
                        <div>
                          {!filteredData7 || filteredData7.length === 0 ? (
                            <p>No Chair found..</p>
                          ) : (
                            filteredData7.map((data) => (
                              <div
                                onClick={() => handleSelectedRig7(data)}
                                key={data._id}
                              >
                                <img src={data?.image} height={50} width={50} />
                                <p>
                                  {data.name.length > 20
                                    ? data.name.substring(0, 20) + '...'
                                    : data.name}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>
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
