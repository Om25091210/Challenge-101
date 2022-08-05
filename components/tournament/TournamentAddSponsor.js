import React, { useState } from 'react';

const TournamentAddSponsor = ({ sponsors, states, type }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setSearchText(searchWord);
    const newFilter = sponsors?.filter((value) => {
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
    if (type === 'ORGANIZER') {
      states.organizer.push(data._id);
    } else {
      states.sponsor.push(data._id);
    }
  };

  return (
    <>
      <div>
        {type === 'ORGANIZER' || type === 'SPONSORS' ? null : (
          <label htmlFor="exampleFormControlInput1">Sponsor</label>
        )}
        <input
          type="search"
          name="sponsor"
          placeholder={`Enter The ${
            type === 'ORGANIZER' ? 'Organizer' : 'Sponsor'
          } name`}
          value={searchText}
          onChange={handleFilter}
          autoComplete="off"
        />
        {searchText.length !== 0 ? (
          <div className="custom-rig-tag">
            <div>
              {!filteredData || filteredData.length === 0 ? (
                <p>
                  No {type === 'ORGANIZER' ? 'Organizer' : 'Sponsor'} found..
                </p>
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

export default TournamentAddSponsor;
