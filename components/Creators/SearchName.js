import React, { useEffect, useState } from 'react';

const SearchName = ({ data, type, handleChange, isSearchOnly }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [trigger, setTrigger] = useState(true);

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
      if (filteredData.length === 0 && isSearchOnly === false) {
        handleChange(event);
      }
    }
  };

  const handleClaim = (data) => {
    console.log('AAAAA');
  };

  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, [trigger]);

  return (
    <>
      <div className="form-group">
        {isSearchOnly === false && (
          <label htmlFor="exampleFormControlInput1">{type} Name</label>
        )}
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
                          // onClick={() => handleClaim(data)}
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
                          <div className="loc_box edit_pof">
                            <a
                              href="#!"
                              className="model_show_btn"
                              onClick={() => setTrigger(!trigger)}
                            >
                              Claim
                            </a>
                            <div
                              className="common_model_box edit_profile"
                              id="big_poup"
                            >
                              <a href="#!" className="model_close">
                                X
                              </a>
                              <div className="inner_model_box">
                                <div className="add_job_height">
                                  <h3>Claim {data.name}</h3>
                                </div>
                              </div>
                              <div className="overlay"></div>
                            </div>
                          </div>
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
