import DarkMode from './theme/dark-mode'


function LeftNav() {

  return (


<div className="left_side">
  <nav>
    <ul>
      <li><a href="#" className="active"><span className="iconbg"><i className="fa fa-home" aria-hidden="true"></i></span> <span className="title">HOME</span></a> </li>
      <li><a href="#" className=""><span className="iconbg"><i className="fa fa-trophy" aria-hidden="true"></i></span> <span className="title">RANKING</span></a> </li>
      <li><a href="#" className=""><span className="iconbg"><i className="fa fa-flag" aria-hidden="true"></i></span> <span className="title">TOURNAMENTS</span></a> </li>
      <li><a href="#" className=""><span className="iconbg"><i className="fa fa-gamepad" aria-hidden="true"></i></span> <span className="title">GAMES</span></a> </li>
      <li><a href="#" className=""><span className="iconbg"><i className="fa fa-compass" aria-hidden="true"></i></span> <span className="title">DISCOVER</span></a> </li>
      <li><a href="#" className=""><span className="iconbg"><i className="fa fa-calendar" aria-hidden="true"></i></span> <span className="title">CALENDER</span></a> </li>
    </ul>
  </nav>


 <DarkMode />

</div>

  )
}


export default LeftNav

