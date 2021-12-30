import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

const Filters = ({ ftype }) => {
  const [data, setData] = useState(null);

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedMapFilters, setSelectedMapFilters] = useState([]);

  const handleSelectFilter = (event) => {
    const filtered = event.target.value;
    const name = event.target.name;

    if (!selectedFilters.includes(filtered)) {
      setSelectedFilters([...selectedFilters, filtered]);
    } else {
      setSelectedFilters(
        selectedFilters.filter((selFilter) => {
          return selFilter !== filtered;
        })
      );
    }

    var found = selectedMapFilters.find((element) =>
      element.key.includes(name)
    );
    console.log(found);
    if (found == undefined) {
      var arr = [];
      arr.push(filtered);
      setSelectedMapFilters([
        ...selectedMapFilters,
        { key: name, values: arr }
      ]);
    } else {
      var arr = found.values;
      arr.push(filtered);
      setSelectedMapFilters([
        ...selectedMapFilters,
        { key: name, values: arr }
      ]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseURL}/api/filters/${ftype}`);
      const newData = await response.json();
      setData(newData);
    };
    fetchData();
  }, []);

  console.log(selectedMapFilters);

  if (data) {
    return (
      <div className="team_filter">
        <div className="drop_downs">
          {data.filter.metadata.map((filter, index) =>
            filter.value.indexOf(filter.key) < 0 ? (
              <div key={index} className="button-group">
                <button
                  type="button"
                  className="btn btn-default btn-sm dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <span className="drop_name">{filter.key}</span>{' '}
                  <span className="caret"></span>{' '}
                </button>

                <ul className="dropdown-menu">
                  {filter.value.map((val, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="small"
                        data-value={val}
                        tabIndex={idx}
                      >
                        <input
                          type="checkbox"
                          name={filter.key}
                          checked={selectedFilters.includes(val)}
                          onChange={handleSelectFilter}
                          id={val}
                          value={val}
                        />
                        {val}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="button-group">
                {' '}
                <span className="drop_name">{filter.key}</span>
                <div className="custom-control custom-checkbox">
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    name={filter.key}
                    checked={selectedFilters.includes(filter.key)}
                    onChange={handleSelectFilter}
                    id={filter.key}
                    value={filter.key}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={filter.key}
                  ></label>
                </div>
              </div>
            )
          )}
        </div>

        {selectedMapFilters.length > 0 && (
          <div className="filters">
            {' '}
            <a
              href="#!"
              className="close1"
              onClick={() => {
                setSelectedMapFilters([]);
              }}
            >
              X
            </a>
            <h3>Filters</h3>
            <div className="filter_list">
              {' '}
              {selectedMapFilters.map((filter, idx) => (
                <span className="filter1">
                  {' '}
                  {filter.key}:
                  {filter.values.map((filval, idxv) => (
                    <>
                      {filval}{' '}
                      <a href="#" className="close2">
                        X
                      </a>{' '}
                    </>
                  ))}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default Filters;
