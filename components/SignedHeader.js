import Head from 'next/head';
import React, { Fragment, useContext, useState, useEffect } from 'react';

import { logoutUser } from '@utils/auth';
import NotificationItem from './NotificationItem';
import ChatSection from './chats/ChatSection';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DataContext } from '@store/GlobalState';
import API from '@utils/blockapi';
import { MPNumberFormat } from '@utils/helpers';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { ethers } from 'ethers';
import { getEllipsisTxt } from '../utils';
import WalletSvg from './svg/WalletSvg';
import { BlockchainContext } from '../context/BlockchainContext';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import axios from 'axios';
import baseURL from '@utils/baseURL';

const SignedHeader = ({ user, profile }) => {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;

  const { connectedAccount, connectWallet, disconnect } = useContext(
    BlockchainContext
  );

  const [coin, setCoin] = useState();
  const [INR, setINR] = useState();
  const [refModal, setRefModal] = useState(false);
  const [mail, setMail] = useState({
    email: '',
    sender: user.name
  });

  const onChangeEmail = (e) => {
    setMail({ ...mail, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getUserBalance();
  });

  const [filterType, setFilterType] = useState('JOBS');

  const getUserBalance = () => {
    API.getAddressBalance(user.phone_number).then((res) => {
      setCoin(res.data);
      getINR();
    });
  };
  const getINR = () => {
    API.getINR().then((res) => {
      const value = res.data * coin;
      setINR(value.toFixed(2));
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    try {
      axios.post(`${baseURL}/api/all/refer`, mail);
      toast.success('Invitation sent!');
      setRefModal(false);
    } catch (err) {
      toast.error('Please try again later');
    }
  };

  return (
    <header>
      <div className="logo">
        <a href="#">
          <img src="/assets/media/logo-new.png" alt="Logo" />
        </a>
      </div>

      <div className="sb-toggle-right top_click">
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
          <li className="pluse">
            <a href="#">
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
            </a>
            <div className="drop_down_bg create_pages">
              <h3>Create</h3>

              <ul className="">
                <li>
                  <a href="/team/create">
                    <span>
                      <i className="fa fa-users" aria-hidden="true"></i>{' '}
                    </span>
                    <span>
                      {' '}
                      <b>Team</b>
                      <p>Create a team, compete and rank yourself globally.</p>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/tournament/create">
                    <span>
                      {' '}
                      <i className="fa fa-trophy" aria-hidden="true"></i>{' '}
                    </span>

                    <span>
                      {' '}
                      <b> Tournament</b>
                      <p>Create a tournament and invite participants.</p>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>
                      {' '}
                      <i
                        className="fa fa-handshake-o"
                        aria-hidden="true"
                      ></i>{' '}
                    </span>
                    <span>
                      {' '}
                      <b>Community</b>
                      <p>Create a community and connect with people.</p>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/brand/create">
                    <span>
                      {' '}
                      <i className="fa fa-file" aria-hidden="true"></i>{' '}
                    </span>
                    <span>
                      {' '}
                      <b>Brand/Company</b>
                      <p>Start selling your products and services.</p>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/arena/create">
                    <span>
                      <i className="fa fa-sign-out" aria-hidden="true"></i>{' '}
                    </span>
                    <span>
                      <b> Arena</b>
                      <p>Create arena, invite gamers and increase walk-ins.</p>
                    </span>
                  </a>
                </li>
                {/* <li>
                  <a href="/company/create">
                    <i className="fa fa-building" aria-hidden="true"></i>
                    Create a company page
                  </a>
                </li> */}
              </ul>

              <h3>Listing</h3>

              <ul className="">
                <li>
                  <a href="/">
                    <span>
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    </span>
                    <span>
                      {' '}
                      <b>Marketplace</b>
                      <p>Make a listing of your services and products.</p>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/jobs/create" onClick={() => setFilterType('JOBS')}>
                    <span>
                      {' '}
                      <i className="fa fa-briefcase" aria-hidden="true"></i>
                    </span>

                    <span>
                      {' '}
                      <b> Jobs</b>
                      <p>Make a job listing.</p>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>
                      {' '}
                      <i className="fa fa-university" aria-hidden="true"></i>
                    </span>
                    <span>
                      {' '}
                      <b>Masterclass</b>
                      <p>List your masterclass and earn.</p>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="chat_box">
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

          <li className="noti">
            <NotificationItem user={user} />
          </li>

          {/* <li>
            <a href="/cart">
              {' '}
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>{' '}
              <span className="pop">{cart.length}</span>
            </a>
          </li> */}

          <li className="profile">
            <a href="#!">
              <span className="dps">
                <img src={user?.profilePicUrl} alt={user?.name} />
              </span>
              <span>
                {user?.name}{' '}
                <p className="">
                  {' '}
                  {profile?.online_status === true ? (
                    <>
                      <div className="online"></div> Online
                    </>
                  ) : (
                    <>
                      <div className="offline"></div> Offline
                    </>
                  )}
                </p>
              </span>
              <span className="drop">
                <i className="fa fa-sort-desc" aria-hidden="true"></i>
              </span>
            </a>
            <div className="drop_down_bg profile_drop_down">
              <ul>
                <li>
                  <Link href={`/user/${user?._id}`}>
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
                  <Link href="/myNFTs">My NFTs</Link>
                </li>
                <li>
                  <Link href="/mywallet">Payment</Link>
                </li>
                <li>
                  <Link href="#">Support</Link>
                </li>
                <li>
                  <a href="#" onClick={() => setRefModal(true)}>
                    Refer a friend
                  </a>
                </li>

                <li>
                  <a href="/buypremium">
                    {' '}
                    <img src="/assets/media/login/go.png" alt="" />
                  </a>
                </li>

                <li>
                  <a href="#!" onClick={logoutUser}>
                    <img src="/assets/media/login/logout.png" alt="" />
                    Logout
                  </a>
                </li>
                {refModal && (
                  <div className="delete_post">
                    <form onSubmit={sendEmail} id="refForm">
                      <div className="delete_post_div">
                        <h3 className="black">
                          Enter your friend's email to invite
                        </h3>
                        <input
                          type="text"
                          value={user.name}
                          name="name"
                          hidden={true}
                        />
                        <input
                          type="email"
                          name="email"
                          onChange={onChangeEmail}
                        />
                        <button
                          onClick={() => setRefModal(false)}
                          className="btn"
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn">
                          Send
                        </button>
                      </div>
                    </form>
                    <div className="overlay"></div>
                  </div>
                )}
              </ul>
            </div>
          </li>

          <li className="wallet">
            <a href="/mywallet">
              <span className="dps">
                {' '}
                <img src="/assets/media/login/wallet.png" alt="" />
              </span>
              <span>
                <MPNumberFormat value={coin} />
              </span>
            </a>
            <div className="drop_down_bg wallet_drop_down">
              <h2>Wallet</h2>{' '}
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              <ul>
                <li className="balance1">
                  <span className="amt1">
                    <img src="/assets/media/login/wallet.png" alt="M" />{' '}
                  </span>
                  <span className="amt1">
                    <img src="/assets/media/login/m.png" alt="M" />{' '}
                  </span>
                  <span>
                    {' '}
                    <MPNumberFormat value={coin} />
                  </span>
                  <span>INR: Rs {INR} Balance</span>
                </li>

                <li className="connect_wallet">
                  {connectedAccount ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex items-center max-w-xs px-4 py-2 text-white transition rounded-full bg-gradient-to-tl from-indigo-500 via-purple-500 to-pink-500 hover:bg-gray-700 shadow-homogen font-poppins">
                          <span className="sr-only">Open user menu</span>

                          <div className="pr-2">
                            <WalletSvg className="w-5 h-5 text-white" />
                          </div>

                          <div className="font-sm">
                            {getEllipsisTxt(connectedAccount)}
                          </div>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="">
                          <Menu.Item>
                            <div className="">
                              <button
                                onClick={() => disconnect()}
                                className="block p-2 text-white "
                              >
                                Disconnect
                              </button>
                            </div>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <button className="btn" onClick={() => connectWallet(true)}>
                      Connect Wallet
                    </button>
                  )}
                </li>

                <li className="two_btn">
                  {' '}
                  <button className="btn">Deposit</button>{' '}
                  <button className="btn">Withdraw</button>
                </li>

                <li>
                  {' '}
                  <a href="/mywallet">View all transactions</a>
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
