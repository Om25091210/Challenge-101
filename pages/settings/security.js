import { useState, useEffect } from 'react';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import Teams from '@components/discover/Teams';
import Coaches from '@components/discover/Coaches';
import Players from '@components/discover/Players';
import Arenas from '@components/discover/Arenas';
import Jobs from '@components/discover/Jobs';
import baseURL from '@utils/baseURL';
import AllScript from '../AllScript';

const General = ({ user, profile, games }) => {
  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);

  return (
    <>
      <MetaDash />

      <SignedHeader user={user} profile={profile} />

      <LeftNav user={user} />

      <div className="main_middle profile_middle">
        <div className="setting_pages">
          <div className="white_bg">
            <div className="left_setting_menu">
              <div className="menu_bloc">
                <a href="#">
                  <i class="fa fa-cog" aria-hidden="true"></i> General
                </a>
                <ul>
                  <li>
                    {' '}
                    <a href="#">Profile</a>
                  </li>
                  <li>
                    <a href="#">Personal Information</a>
                  </li>
                  <li>
                    <a href="#">Contact Details</a>
                  </li>
                </ul>
              </div>

              <div className="menu_bloc">
                <a href="#">
                  <i class="fa fa-user" aria-hidden="true"></i> Accounts
                </a>
                <ul>
                  <li>
                    {' '}
                    <a href="#">Gaming Accounts</a>
                  </li>
                  <li>
                    <a href="#">Social Links</a>
                  </li>
                </ul>
              </div>

              <div className="menu_bloc">
                <a href="#" className="active">
                  <i class="fa fa-shield" aria-hidden="true"></i> Security &
                  Privacy
                </a>
                <ul>
                  <li>
                    {' '}
                    <a href="#">Change Password</a>
                  </li>
                  <li>
                    <a href="#">Two-factor Authentication</a>
                  </li>
                  <li>
                    <a href="#">Blocked Users</a>
                  </li>
                  <li>
                    <a href="#">Privacy</a>
                  </li>
                  <li>
                    <a href="#">Cookies</a>
                  </li>
                  <li>
                    <a href="#">Delete Account</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="right_setting_data">
              <h1>Change Password</h1>
              <form className="common_form">
                <div className="form-group">
                  <input type="text" className="form-control" value="" />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" value="" />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" value="" />
                </div>
              </form>

              <div className="blokes">
                <h2>Blocked Users</h2>

                <div className="flex1">
                  <p>
                    View the users you have blocked. You can unblock them here.
                  </p>
                  <div className="rightBox">
                    <button className="btn">View Blocked Users</button>
                  </div>
                </div>
              </div>

              <div className="blokes">
                <h2>Privacy</h2>

                <div className="flex1 mb-5">
                  <p>Review our Teams of Service</p>
                  <div className="rightBox">
                    <button className="btn">Review</button>
                  </div>
                </div>

                <div className="flex1 mb-5">
                  <p>
                    Hide your statistics, remember pleople can still view your
                    team statistics on teams page.
                  </p>
                  <div className="rightBox">
                    <input type="checkbox" value="" />
                  </div>
                </div>

                <div className="flex1 mb-5">
                  <p>Deactivate 1v1 wager challenges</p>
                  <div className="rightBox">
                    <input type="checkbox" value="" />
                  </div>
                </div>
              </div>

              <div className="blokes">
                <h2>Delete Account</h2>

                <div className="flex1">
                  <p>
                    Deleting your account will erase your personal profile from
                    our platform. You can recover your account within 30 days of
                    deletion, after that it will be permanently deleted.
                  </p>
                  <div className="rightBox">
                    <button className="btn red">Delete Account</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AllScript />
    </>
  );
};

export default General;
