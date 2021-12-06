import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateCal = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  //console.log(formatDate(startDate));
  //console.log(formatDate(endDate));

  const [tournament, SetTournament] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/tournaments/`)
      .then((res) => {
        SetTournament(res.data);
        // console.log(tournament)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //const result = tournament.filter(d=>(d.tournament.region) == "BHARAT");

  var result = tournament.filter((a) => {
    var dates = formatDate(a.tournament.startDate);
    return dates >= formatDate(startDate) && dates <= formatDate(endDate);
  });

  console.log(result);

  return (
    <>
      <div className="calendar_box">
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          monthsShown={1}
          selectsRange
          inline
          dateFormat="MMMM d, yyyy"
        />

        <div>Date - {}</div>
      </div>

      <div>
        {result.length === 0 ? (
          <p>No data</p>
        ) : (
          <div>
            {result.map((tour) => (
              <div key={tour._id}>
                <p>{tour.tournament.name}</p>
                <p>{tour.tournament.description}</p>
                <p>{tour.tournament.status}</p>
                <p>{tour.tournament.tournament_type}</p>
                <p>{tour.tournament.prizepool}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default DateCal;
