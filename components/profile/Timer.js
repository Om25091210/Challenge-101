import React from 'react';

const Timer = ({ time }) => {
  var countDownDate = new Date(time).getTime();

  var myfunc = setInterval(function () {
    var now = new Date().getTime();
    var timeleft = countDownDate - now;

    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    document.getElementById('days').innerHTML = days + 'd ';
    document.getElementById('hours').innerHTML = hours + 'h ';
    document.getElementById('mins').innerHTML = minutes + 'm ';
    document.getElementById('secs').innerHTML = seconds + 's ';

    if (timeleft < 0) {
      clearInterval(myfunc);
      document.getElementById('days').innerHTML = '';
      document.getElementById('hours').innerHTML = '';
      document.getElementById('mins').innerHTML = '';
      document.getElementById('secs').innerHTML = '';
      document.getElementById('end').innerHTML = 'Have Fun!!';
    }
  }, 1000);

  return (
    <div>
      <p id="days" />
      <p id="hours" />
      <p id="mins" />
      <p id="secs" />
      <h2 id="end" />
    </div>
  );
};

export default Timer;
