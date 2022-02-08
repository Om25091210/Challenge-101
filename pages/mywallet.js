import axios from 'axios';
import React, { Component } from 'react';
import cookie from 'js-cookie';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import baseURL from '@utils/baseURL';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';

import AllScript from './AllScript';

const Dashboard = ({ user }) => {
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} />
      <LeftNav user={user} />
      <div className="main_middle profile_middle">
        <h1>My wallet</h1>
        <div className="wallet_box">
          <div className="payment_methods box">
            <h4>Payment methods</h4>
            <p>
              You have not added any payment methods yet, go to the settings
              page tp add a new payment method
            </p>
            <a href="#">Add another payment method</a>
            <div className="payment_card">
              <img src="/assets/media/login/card.png" alt="" />{' '}
            </div>
          </div>
          <div className="balance box">
            <div className="bal">
              {' '}
              <img src="/assets/media/login/wallet.png" alt="" />
              <div className="amt_bal">
                <h3>Available balance</h3>
                <span className="amt">
                  <img src="/assets/media/login/m.png" alt="" /> 5,201.50
                </span>{' '}
              </div>
            </div>
            <div className="two_btn">
              {' '}
              <button className="btn">Deposit</button>{' '}
              <button className="btn">Withdraw</button>
            </div>
          </div>
          <div className="money_withdrawn box">
            {' '}
            <span className="icons">
              <img src="/assets/media/login/drawn.png" alt="" />{' '}
            </span>
            <h3>Money Withdrawn</h3>
            <div className="amt">
              {' '}
              <img src="/assets/media/login/m.png" alt="" /> 10,000.00{' '}
            </div>
          </div>
          <div className="money_earned box">
            {' '}
            <span className="icons">
              <img src="/assets/media/login/wallet-icon.png" alt="" />{' '}
            </span>
            <h3>Money Earned</h3>
            <div className="amt">
              <img src="/assets/media/login/m.png" alt="" /> 10,000.00{' '}
            </div>
          </div>
        </div>
        <div className="bottom_box">
          <div className="earning box">
            <h4>Earning</h4>
            <select className="custom-select ">
              <option>Weakly</option>
              <option>Weakly</option>
              <option>Weakly</option>
            </select>
            <div className="cart">
              <img src="/assets/media/login/earning.png" alt="" />
            </div>
          </div>
          <div className="transaction box">
            <h4>Recent Transaction</h4>
            <select className="custom-select ">
              <option>Sort by</option>
              <option>Sort by</option>
              <option>Sort by</option>
            </select>
            <div className="trans_list">
              <ul>
                <li>
                  <span className="list_name">
                    You secured 2nd place in the Multiplayr Weekly #2 and earned
                  </span>
                  <span className="date">10 June 2021</span>
                  <div className="amt">
                    <img src="/assets/media/login/m.png" alt="" /> 10,000.00{' '}
                  </div>
                  <span>
                    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                  </span>
                </li>

                <li>
                  <span className="list_name">Money withdrawn </span>
                  <span className="date">10 June 2021</span>
                  <div className="amt">
                    <img src="/assets/media/login/m.png" alt="" /> 10,000.00{' '}
                  </div>
                  <span>
                    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                  </span>
                </li>
              </ul>

              <a href="#">View all transactions</a>
            </div>
          </div>
        </div>
      </div>
      <AllScript />
    </>
  );
};

export default Dashboard;
