import React from "react";
import TimeCalendar from "react-timecalendar";

const openHours = [
  [9.5, 15],
  [9, 23.5],
];
function loggingTime(time) {
  console.log(time);
}
const Date = () => (

  <div className="calendar_box">  
  <TimeCalendar
    clickable
    timeSlot={30}
    openHours={false}

  />

</div>

);

export default Date;