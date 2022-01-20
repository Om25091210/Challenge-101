import Head from 'next/head';
import React, { useContext, useState } from 'react'

import { logoutUser } from '@utils/auth';
import NotificationItem from './NotificationItem';
import ChatSection from './chats/ChatSection';
import Link from 'next/link';
import {useRouter} from 'next/router'
import {DataContext} from '@store/GlobalState'

const SignedHeader = ({ user }) => {

    const router = useRouter()
    const {state, dispatch} = useContext(DataContext)
    const { auth, cart } = state

  if (user) {
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
                      <i className="fa fa-users" aria-hidden="true"></i> Create
                      a team page
                    </a>
                  </li>
                  <li>
                    <a href="/tournament/create">
                      <i className="fa fa-trophy" aria-hidden="true"></i> Create
                      a tournament
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
                      <i className="fa fa-sign-out" aria-hidden="true"></i>{' '}
                      Create an Arena page
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
              <Link href="/cart">
                  <a >
                      <i className="fa fa-shopping-cart" aria-hidden="true">
                          <span className="pop">
                              { cart.length }
                          </span>
                      </i> 
              </a>
              </Link>
            </li>

            <li>
              <a href="#">
                {' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23.262"
                  height="24"
                  viewBox="0 0 23.262 24"
                >
                  <g id="icon" transform="translate(-1565 90)">
                    <path
                      id="setting_1_"
                      data-name="setting (1)"
                      d="M30.45,13.908l-1-.822a1.406,1.406,0,0,1,0-2.171l1-.822a1.869,1.869,0,0,0,.432-2.385L28.911,4.293a1.869,1.869,0,0,0-2.282-.818l-1.211.454a1.406,1.406,0,0,1-1.88-1.086l-.213-1.276A1.869,1.869,0,0,0,21.475,0H17.533a1.869,1.869,0,0,0-1.849,1.567L15.47,2.842a1.406,1.406,0,0,1-1.88,1.086l-1.211-.454a1.869,1.869,0,0,0-2.282.818L8.126,7.707a1.869,1.869,0,0,0,.432,2.385l1,.822a1.406,1.406,0,0,1,0,2.171l-1,.822a1.869,1.869,0,0,0-.432,2.385L10.1,19.707a1.869,1.869,0,0,0,2.282.818l1.211-.454a1.406,1.406,0,0,1,1.88,1.086l.213,1.276A1.869,1.869,0,0,0,17.533,24h3.943a1.869,1.869,0,0,0,1.849-1.567l.213-1.276a1.406,1.406,0,0,1,1.88-1.086l1.211.454a1.869,1.869,0,0,0,2.282-.818l1.972-3.415a1.869,1.869,0,0,0-.432-2.385ZM27.287,18.77l-1.211-.454a3.281,3.281,0,0,0-4.388,2.533l-.213,1.276H17.533l-.213-1.276a3.281,3.281,0,0,0-4.388-2.533l-1.211.454L9.75,15.355l1-.822a3.281,3.281,0,0,0,0-5.067l-1-.822L11.721,5.23l1.211.454A3.281,3.281,0,0,0,17.32,3.151l.213-1.276h3.943l.213,1.276a3.281,3.281,0,0,0,4.388,2.533l1.211-.454,1.972,3.414h0l-1,.822a3.281,3.281,0,0,0,0,5.067l1,.822ZM19.5,7.375A4.625,4.625,0,1,0,24.129,12,4.63,4.63,0,0,0,19.5,7.375Zm0,7.375A2.75,2.75,0,1,1,22.254,12,2.753,2.753,0,0,1,19.5,14.75Z"
                      transform="translate(1557.127 -90)"
                    />
                  </g>
                </svg>{' '}
              </a>
            </li>

            <li className="profile">
              <a href="#">
                <img src={user.profilePicUrl} alt={user.name} />
              </a>
              <div className="drop_down_bg profile_drop_down">
                <ul>
                  <li>
                    <Link href={`/user/${user.username}`}>
                      <a>
                        <i className="fa fa-user" aria-hidden="true"></i>{' '}
                        Profile
                      </a>
                    </Link>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-inbox" aria-hidden="true"></i> Inbox
                    </a>
                  </li>
                  <li>
                    <a href="#!" onClick={logoutUser}>
                      <i className="fa fa-sign-out" aria-hidden="true"></i>{' '}
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </header>
    );
  } else {
    return null;
  }
};

export default SignedHeader;
