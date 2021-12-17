import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

 const DateCal = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [tournaments, setTournaments] = useState([]);

  const onChange = (dates) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);

        if (startDate) {
          if (endDate) {

          getTours(startDate,endDate)
            .then(items => {
                setTournaments(items)
            })
          } 
        }

  };

  const [tournament, SetTournament] = useState([]);


    function getTours(startDate,endDate) {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ startDate: startDate, endDate : endDate })
      };
    return fetch(`${baseURL}/api/tournaments/tournamentsbydate`, requestOptions)
        .then(data => data.json())

    }  

  console.log(tournaments);

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
      </div>

      <div className="all_matches">
        <h2>Xenowatch league-week6</h2>

        {tournaments.length === 0 ? (
          <p>No Tournaments are scheduled between selected dates. Please change the dates and check again! </p>
        ) : (
          <div className="match_box">
            {tournaments.map((tour) => (
              <div className="match_table" key={tour._id}>
                <div className="head_row">
                  <div className="tm">11:00PCT</div>
                  <div className="live">
                    <b>Live</b> 25:20
                  </div>
                </div>
                <div className="data_col1">
                  <div className="top">
                    <div className="lft_dp">
                      {' '}
                      <span class="dp">
                        <img src={tour.tournament.imgUrl} alt="" />
                      </span>{' '}
                      <span class="dp_name">{tour.tournament.name}</span>{' '}
                    </div>
                    <div className="num">3</div>
                  </div>
                  <div className="top">
                    <div className="lft_dp">
                      {' '}
                      <span class="dp">
                        <img src={tour.tournament.imgUrl} alt="" />
                      </span>{' '}
                      <span class="dp_name">{tour.tournament.description}</span>{' '}
                    </div>
                    <div className="num">3</div>
                  </div>
                </div>
                <div className="data_col2">
                  {' '}
                  <a href="#">
                    <img src="/assets/media/calendar/stats.jpg" /> Full Match
                    Stats
                  </a>{' '}
                  <a href="#">
                    <img src="/assets/media/calendar/play.jpg" /> Watch Replay
                  </a>{' '}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default DateCal;
