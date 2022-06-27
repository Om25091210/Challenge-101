import DarkMode from './theme/dark-mode';
import Link from 'next/link';
import { useRouter } from 'next/router';

function LeftNav({ user }) {
  const router = useRouter();

  return (
    <div className="left_side">
      <nav>
        <ul>
          <li className={router.pathname == '/dashboard' ? 'active' : ''}>
            <Link href="/dashboard">
              <a>
                <span className="iconbg">
                  <i className="fa fa-home" aria-hidden="true"></i>
                </span>{' '}
                <span className="title">HOME</span>
              </a>
            </Link>{' '}
          </li>
          <li className={router.pathname == '/ranking' ? 'active' : ''}>
            <Link href="/ranking">
              <a className="">
                <span className="iconbg">
                  <i className="fa fa-trophy" aria-hidden="true"></i>
                </span>{' '}
                <span className="title">RANKING</span>
              </a>
            </Link>
          </li>
          <li className={router.pathname == '/tournament' ? 'active' : ''}>
            <Link href="/tournament">
              <a className="">
                <span className="iconbg">
                  <i className="fa fa-flag" aria-hidden="true"></i>
                </span>{' '}
                <span className="title">TOURNAMENTS</span>
              </a>
            </Link>
          </li>
          <li className={router.pathname == '/games' ? 'active' : ''}>
            <Link href="/games/list">
              <a className="">
                <span className="iconbg">
                  <i className="fa fa-gamepad" aria-hidden="true"></i>
                </span>{' '}
                <span className="title">GAMES</span>
              </a>
            </Link>{' '}
          </li>
          <li className={router.pathname == '/discover' ? 'active' : ''}>
            <Link href="/discover">
              <a className="">
                <span className="iconbg">
                  <i className="fa fa-compass" aria-hidden="true"></i>
                </span>{' '}
                <span className="title">DISCOVER</span>
              </a>
            </Link>
          </li>
          <li className={router.pathname == '/calendar' ? 'active' : ''}>
            <Link href="/calendar">
              <a className="">
                <span className="iconbg">
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                </span>{' '}
                <span className="title">CALENDER</span>
              </a>
            </Link>{' '}
          </li>
          <li>
            <Link href="/">
              <a className="">
                <span className="iconbg">
                  <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                </span>{' '}
                <span className="title">SHOP</span>
              </a>
            </Link>{' '}
          </li>
          <li>
            <Link href="/nftindex">
              <a className="">
                <span className="iconbg">
                  <i className="fa fa-connectdevelop" aria-hidden="true"></i>
                </span>{' '}
                <span className="title">SHOP NFTs</span>
              </a>
            </Link>{' '}
          </li>

          <li>
            <Link href="/nftgames">
              <a className="">
                <span className="iconbg">
                  <i className="fa fa-fast-forward" aria-hidden="true"></i>
                </span>{' '}
                <span className="title">Play</span>
              </a>
            </Link>{' '}
          </li>

          {user?.role === 'admin' ? (
            <li>
              <Link href="/settings">
                <a className="">
                  <span className="iconbg">
                    <i className="fa fa-cog" aria-hidden="true"></i>
                  </span>{' '}
                  <span className="title">SETTINGS</span>
                </a>
              </Link>{' '}
            </li>
          ) : (
            ''
          )}
          {user?.isSuperAdmin === true ? (
            <li>
              <Link href="/adminpage">
                <a className="">
                  <span className="iconbg">
                    <i className="fa fa-cog" aria-hidden="true"></i>
                  </span>{' '}
                  <span className="title">Admin Settings</span>
                </a>
              </Link>{' '}
            </li>
          ) : (
            ''
          )}
        </ul>
      </nav>

      <DarkMode />
    </div>
  );
}

export default LeftNav;
