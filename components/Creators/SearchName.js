import React, { useState } from 'react';

const SearchName = ({ data, type, handleChange }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setSearchText(searchWord);
    const newFilter = data?.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
      if (filteredData.length === 0) {
        handleChange(event);
      }
    }
  };

  const handleClaim = (data) => {
    console.log('AAAAA');
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">{type} Name</label>
        <input
          type="search"
          name="name"
          value={searchText}
          onChange={handleFilter}
          autoComplete="off"
        />
        {searchText.length !== 0 ? (
          <>
            {filteredData.length > 0 ? (
              <>
                <div className="custom-rig-tag">
                  <div className="rigs_items">
                    {!filteredData || filteredData.length === 0 ? (
                      <p>
                        No {type === 'ORGANIZER' ? 'Organizer' : 'Sponsor'}{' '}
                        found..
                      </p>
                    ) : (
                      filteredData.map((data) => (
                        <div
                          onClick={() => handleClaim(data)}
                          key={data._id}
                          className="items"
                        >
                          <span>
                            {data.imgUrl ? (
                              <img src={data?.imgUrl} height={50} width={50} />
                            ) : (
                              <img src={data?.logoUrl} height={50} width={50} />
                            )}
                          </span>
                          <p>
                            {data.name.length > 20
                              ? data.name.substring(0, 20) + '...'
                              : data.name}
                          </p>
                          <button className="btn" disabled>
                            Claim
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </>
        ) : null}
      </div>
    </>
  );
};

export default SearchName;
