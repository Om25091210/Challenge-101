import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import countryList from 'react-select-country-list';
import { toast } from 'react-toastify';
import baseURL from '../../utils/baseURL';

const TournamentRules = ({ tournamentId }) => {
  const [states, setStates] = useState({
    tournamentId,
    check_in: '',
    forfeit: '',
    prizeRules: '',
    general: '',
    compete: '',
    cusRuleHead: '',
    cusRuleBody: '',
    country: '',
    admins: '',
    contact: ''
  });
  const [allusers, setAllusers] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/api/all/users`).then((res) => setAllusers(res.data));
  }, []);

  const onChange = (e) => {
    setStates({ ...states, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const options = useMemo(() => countryList().getData(), []);

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setSearchText(searchWord);
    const newFilter = allusers?.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleSelectedRig = (data) => {
    setSearchText(data.name);
    states.admins = data._id;
  };

  const handleTournamentRules = async (e) => {
    e.preventDefault();
    try {
      axios.post(`${baseURL}/api/tournamentRules/`, states);
      toast.success('Tournament Rules Updated');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshData();
  };

  return (
    <>
      <div className="loc_box">
        {' '}
        <a href="#!" className="model_show_btn">
          <button className="btn">Rules</button>
        </a>
        <div className="common_model_box">
          <a href="#!" className="model_close">
            X
          </a>

          <div className="inner_model_box">
            <div className="add_jobs_height">
              <h3>Rules</h3>
              <form onSubmit={handleTournamentRules}>
                <div className="colm">
                  <label htmlFor="check_in">Advance Match Check In</label>
                  <select
                    name="check_in"
                    id="check_in"
                    value={states.check_in}
                    onChange={onChange}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={45}>45</option>
                  </select>
                </div>

                <div className="colm">
                  <label htmlFor="check_in">Automatic Forfeit</label>
                  <select
                    name="forfeit"
                    id="forfeit"
                    value={states.forfeit}
                    onChange={onChange}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                  </select>
                </div>

                <div className="colm">
                  <label htmlFor="prizeRules">Prize Distribution Rules</label>
                  <textarea
                    name="prizeRules"
                    cols="30"
                    rows="10"
                    onChange={onChange}
                    value={states.prizeRules}
                  />
                </div>

                <div className="colm">
                  <label htmlFor="general">General Info</label>
                  <textarea
                    name="general"
                    cols="30"
                    rows="10"
                    onChange={onChange}
                    value={states.general}
                  />
                </div>

                <div className="colm">
                  <label htmlFor="compete">How To Compete</label>
                  <textarea
                    name="compete"
                    cols="30"
                    rows="10"
                    onChange={onChange}
                    value={states.compete}
                  />
                </div>

                <div className="colm">
                  <label htmlFor="cusRuleHead">Add more rules</label>
                  <input
                    type="text"
                    name="cusRuleHead"
                    placeholder="Header Name"
                    onChange={onChange}
                    value={states.cusRuleHead}
                  />
                </div>

                <div className="colm">
                  <textarea
                    name="cusRuleBody"
                    cols="30"
                    rows="10"
                    onChange={onChange}
                    value={states.cusRuleBody}
                    placeholder="Add Content"
                  />
                </div>

                <div className="form-group">
                  <label for="exampleFormControlInput1">
                    Eligible Countries
                  </label>
                  <select
                    className="game_search_result mscrollbar"
                    name="country"
                    value={states.country}
                    onChange={onChange}
                  >
                    {options.map((opt) => (
                      <>
                        <option value={opt.value}>{opt.label}</option>
                      </>
                    ))}
                  </select>
                </div>

                <div className="colm">
                  <label htmlFor="exampleFormControlInput1">Admins</label>
                  <input
                    type="search"
                    name="admins"
                    value={searchText}
                    onChange={handleFilter}
                    autoComplete="off"
                  />
                  {searchText.length !== 0 ? (
                    <div className="custom-rig-tag">
                      <div>
                        {!filteredData || filteredData.length === 0 ? (
                          <p>No User found..</p>
                        ) : (
                          filteredData.map((data) => (
                            <div
                              onClick={() => handleSelectedRig(data)}
                              key={data._id}
                            >
                              <img
                                src={data?.profilePicUrl}
                                height={50}
                                width={50}
                              />
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
                  <label htmlFor="contact">Contact Details</label>
                  <input
                    type="text"
                    name="contact"
                    onChange={onChange}
                    value={states.contact}
                  />
                </div>

                <input type="submit" value="Confirm" className="btn" />
              </form>
            </div>
          </div>
          <div className="overlay"></div>
        </div>
      </div>
    </>
  );
};

export default TournamentRules;
