import axios from 'axios';
import { useState, useEffect } from 'react';
import baseURL from '../../utils/baseURL';

const TournamentPrizeAdd = ({ prizes, prizesData }) => {
  const [addPrizes, setAddPrizes] = useState('');
  const [states, setStates] = useState({
    prizeName: '',
    goodies: '',
    prize_sponsor: '',
    place: prizes
  });
  const [allsponsor, setAllsponsor] = useState([]);

  const handleChange = (e) => {
    setStates({ ...states, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/all/sponsors`)
      .then((res) => setAllsponsor(res.data));
  }, []);

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setSearchText(searchWord);
    const newFilter = allsponsor?.filter((value) => {
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
    states.prize_sponsor = data._id;
    prizesData.push(states);
  };

  return (
    <>
      <div class="form-group">
        <label for="exampleFormControlInput1">{prizes} Prize</label>
        <input
          type="text"
          class="form-control"
          value={states.prizeName}
          onChange={handleChange}
          name="prizeName"
        />
      </div>

      <div class="form-group">
        <label for="exampleFormControlInput1">Goodies</label>
        <input
          type="text"
          class="form-control"
          name="goodies"
          value={states.goodies}
          onChange={handleChange}
        />
      </div>

      <div class="form-group">
        <label for="exampleFormControlInput1">Upload Image of Trophy</label>
        <div class="style_file_upload">
          <input type="file" name="imgUrl" id="imgUrl" class="inputfile" />
          <label for="imgUrl">
            <span>PNG Image</span>
          </label>
        </div>
      </div>

      <div className="colm">
        <label htmlFor="exampleFormControlInput1">Sponsor</label>
        <input
          type="search"
          name="sponsor"
          placeholder={`Enter The Sponsor name`}
          value={searchText}
          onChange={handleFilter}
          autoComplete="off"
        />
        {searchText.length !== 0 ? (
          <div className="custom-rig-tag">
            <div>
              {!filteredData || filteredData.length === 0 ? (
                <p>No Sponsor found..</p>
              ) : (
                filteredData.map((data) => (
                  <div onClick={() => handleSelectedRig(data)} key={data._id}>
                    <img src={data?.imgUrl} height={50} width={50} />
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
    </>
  );
};

export default TournamentPrizeAdd;
