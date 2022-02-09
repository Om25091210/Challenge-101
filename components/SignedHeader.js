import Head from 'next/head';
import React, { useContext, useState, useEffect } from 'react';
import { logoutUser } from '@utils/auth';
import NotificationItem from './NotificationItem';
import ChatSection from './chats/ChatSection';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DataContext } from '@store/GlobalState';
import API from "@utils/blockapi";
import { MPNumberFormat } from '@utils/helpers';

const SignedHeader = ({ user }) => {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;

  if (user == undefined) {
    router.push('/login');
  }

    const [coin, setCoin] = useState();
    const [USD, setUSD] = useState();

    useEffect(() => {
        getUserBalance();
    })

    const getUserBalance = () => {
        API.getAddressBalance(user.public_key)
            .then(res => {
                setCoin(res.data)
                getUSD();
            })
    }
    const getUSD = () => {
        API.getUSD()
            .then(res => {
                const value = res.data * coin;
                setUSD(value.toFixed(2));
            })
    }

  return (
    <header>
      <div className="logo">
        <a href="#">
          <img src="/assets/media/dash/logo.png" alt="Logo" />
        </a>
      </div>

      <div className="sb-toggle-right  top_click">
        {' '}
        <a href="#!">
          <div className="three_line three_line--htx">
            <span>toggle menu</span>{' '}
          </div>
        </a>
      </div>

      <div className="right_menu">
        <div className="searchbox">
          <input type="search" placeholder="Search" />
          <input type="submit" value="" />
        </div>
        <ul className="top_menu">
          <li>
            <a href="#">
              <img src="/assets/media/dash/plus.png" alt="" />
            </a>
            <div className="drop_down_bg">
              <ul>
                <li>
                  <a href="/team/create">
                    <i className="fa fa-users" aria-hidden="true"></i> Create a
                    team page
                  </a>
                </li>
                <li>
                  <a href="/tournament/create">
                    <i className="fa fa-trophy" aria-hidden="true"></i> Create a
                    tournament
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-handshake-o" aria-hidden="true"></i>{' '}
                    Create a community
                  </a>
                </li>
                <li>
                  <a href="/brand/create">
                    <i className="fa fa-file" aria-hidden="true"></i> Create a
                    brand page
                  </a>
                </li>
                <li>
                  <a href="/arena/create">
                    <i className="fa fa-sign-out" aria-hidden="true"></i> Create
                    an Arena page
                  </a>
                </li>
                <li>
                  <a href="/company/create">
                    <i className="fa fa-building" aria-hidden="true"></i>
                    Create a company page
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#" className="open_chat_box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="22.871"
                viewBox="0 0 24 22.871"
              >
                <g data-name="Layer 2" transform="translate(-2 -2)">
                  <path
                    id="Path_9"
                    data-name="Path 9"
                    d="M23.268,2H4.73A2.733,2.733,0,0,0,2,4.73V17.471A2.733,2.733,0,0,0,4.73,20.2a.911.911,0,0,1,.91.91v1.94a1.82,1.82,0,0,0,2.83,1.514l6.317-4.212a.9.9,0,0,1,.5-.153h4.436a2.742,2.742,0,0,0,2.633-2L25.9,5.462A2.735,2.735,0,0,0,23.268,2Zm.879,2.978-3.539,12.74a.915.915,0,0,1-.88.663H15.292a2.718,2.718,0,0,0-1.514.459L7.46,23.051v-1.94a2.733,2.733,0,0,0-2.73-2.73.911.911,0,0,1-.91-.91V4.73a.911.911,0,0,1,.91-.91H23.268a.914.914,0,0,1,.879,1.158Z"
                    transform="translate(0 0)"
                  />
                  <path
                    id="Path_10"
                    data-name="Path 10"
                    d="M7.91,10.82h4.55a.91.91,0,1,0,0-1.82H7.91a.91.91,0,1,0,0,1.82Z"
                    transform="translate(-0.45 -0.63)"
                  />
                  <path
                    id="Path_11"
                    data-name="Path 11"
                    d="M16.1,13H7.91a.91.91,0,1,0,0,1.82H16.1a.91.91,0,1,0,0-1.82Z"
                    transform="translate(-0.45 -0.99)"
                  />
                </g>
              </svg>{' '}
              <span className="pop">2</span>
            </a>

            <ChatSection user={user} />
          </li>

          <li>
            <NotificationItem />
          </li>

          <li>
            <a href="/cart">
              {' '}
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>{' '}
              <span className="pop">{cart.length}</span>
            </a>
          </li>

          <li className="profile">
            <a href="#!">
              <span className="dps">
                <img src={user.profilePicUrl} alt={user.name} />
              </span>
              <span>
                {user.name}{' '}
                <p className="">
                  {' '}
                  <span className="online"></span> Online
                </p>
              </span>
              <span className="drop">
                <i className="fa fa-sort-desc" aria-hidden="true"></i>
              </span>
            </a>
            <div className="drop_down_bg profile_drop_down">
              <ul>
                <li>
                  <Link href={`/user/${user._id}`}>
                    <a>My Profile</a>
                  </Link>
                </li>

                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link href="#">Settings and Privacy</Link>
                </li>
                <li>
                  <Link href="/mywallet">Payment</Link>
                </li>
                <li>
                  <Link href="#">Support</Link>
                </li>
                <li>
                  <Link href="#">Refer a friend</Link>
                </li>

                <li>
                  <a href="#!" onClick={logoutUser}>
                    <img src="/assets/media/login/logout.png" alt="" />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </li>

          <li className="wallet">
            <a href="/mywallet">
              <span className="dps">
                {' '}
                <img src="/assets/media/login/wallet.png" alt="" />
              </span>
              <span><MPNumberFormat value={coin} /></span>
            </a>
            <div className="drop_down_bg wallet_drop_down">
              <h2>Wallet</h2>

              <ul>
                <li className="balance">              
                  <span className="amt"><img src="/assets/media/login/m.png" alt="M" /> <MPNumberFormat value={coin} /> {' '}USD: ${USD} Balance</span>
                </li>
                <li>
                  <p>
                    Recently Withdrawn: <span className="money"> R3258.70</span>
                  </p>
                </li>

                <li className="two_btn">
                  {' '}
                  <button className="btn">Deposit</button>{' '}
                  <button className="btn">Withdraw</button>
                </li>

                <li>
                  {' '}
                  <a href="">View all transactions</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default SignedHeader;
