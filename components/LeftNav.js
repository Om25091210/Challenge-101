import DarkMode from './theme/dark-mode'
import Link from 'next/link';


function LeftNav() {

  return (


<div className="left_side">
  <nav>
    <ul>
      <li><Link href="/dashboard"><a  className="active"><span className="iconbg"><i className="fa fa-home" aria-hidden="true"></i></span> <span className="title">HOME</span></a></Link> </li>
      <li><Link href="/ranking"><a  className=""><span className="iconbg"><i className="fa fa-trophy" aria-hidden="true"></i></span> <span className="title">RANKING</span></a></Link></li>
      <li><Link href="/tournament"><a  className=""><span className="iconbg"><i className="fa fa-flag" aria-hidden="true"></i></span> <span className="title">TOURNAMENTS</span></a></Link></li>
      <li><Link  href="#"><a className=""><span className="iconbg"><i className="fa fa-gamepad" aria-hidden="true"></i></span> <span className="title">GAMES</span></a></Link> </li>
      <li><Link  href="/discover"><a className=""><span className="iconbg"><i className="fa fa-compass" aria-hidden="true"></i></span> <span className="title">DISCOVER</span></a></Link></li>
      <li><Link href="/calendar"><a  className=""><span className="iconbg"><i className="fa fa-calendar" aria-hidden="true"></i></span> <span className="title">CALENDER</span></a></Link> </li>
    </ul>
  </nav>


 <DarkMode />

</div>

  )
}


export default LeftNav

