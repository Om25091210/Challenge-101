
import React from "react";
import { useState, useEffect } from 'react'
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query'


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns'


const DateCal = () =>{


  const [startDates, setStartDate] = useState(new Date("2021/11/01"));
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  console.log(startDates)
  

  const [tournament, SetTournament] = useState([])
  
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

 const result = tournament.filter(d=>(d.tournament.startDate) === startDates)

  

  console.log(result)


return (



  <>
  <div className="calendar_box">  

  <DatePicker
      selected={startDates}
      onChange={onChange}
      startDates={startDates}
      endDate={endDate}
      monthsShown={1}
      selectsRange
      inline
      dateFormat="MMMM d, yyyy"
      
      
    />

<div>Date - {}</div>

</div>

<div>

{result.length === 0 ? (<p>No data</p>) : (<div>{result.map((tour)=>(
  <div key={tour._id}>
  <p>{tour.tournament.name}</p> 
  <p>{tour.tournament.description}</p> 
  <p>{tour.tournament.status}</p> 
  <p>{tour.tournament.tournament_type}</p> 
  <p>{tour.tournament.prizepool}</p> 
  
  </div>))}</div>
  )}




</div>


</>

)
};
export default DateCal;