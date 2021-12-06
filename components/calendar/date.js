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

  console.log(formatDate(startDate));
  console.log(formatDate(endDate));

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
      </div>

      <div className="all_matches">
        <h2>Xenowatch league-week6</h2>

        {result.length === 0 ? (
          <p>No data</p>
        ) : (
          <div className="match_box">
            {result.map((tour) => (
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
