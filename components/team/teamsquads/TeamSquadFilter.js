import axios from 'axios';
import React, { useEffect, useState } from 'react';
import baseURL from '../../../utils/baseURL';

const TeamSquadFilter = ({ playerData }) => {
  const [squadPlayers, setSquadPlayers] = useState({
    player: '',
    role: ''
  });
  const [allplayers, setAllplayers] = useState([]);
  const [teamroles, setTeamroles] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/all/players`)
      .then((res) => setAllplayers(res.data));

    axios
      .get(`${baseURL}/api/all/teamroles`)
      .then((res) => setTeamroles(res.data));
  }, []);

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setSearchText(searchWord);
    const newFilter = allplayers?.filter((value) => {
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

    squadPlayers.player = data._id;
    playerData.push(squadPlayers);
  };

  const onChange = (e) => {
    setSquadPlayers({ ...squadPlayers, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select name="role" onChange={onChange} value={squadPlayers.role}>
          <option value="--">--</option>
          {teamroles.map((team) => (
            <option value={team}>{team}</option>
          ))}
        </select>
      </div>

      <div className="colm">
        <label htmlFor="exampleFormControlInput1">Player</label>
        <input
          type="search"
          name="player"
          placeholder={`Enter The Name`}
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
                  <div onClick={() => handleSelectedRig(data)} key={data._id}>
                    <img src={data?.profilePicUrl} height={50} width={50} />
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

export default TeamSquadFilter;