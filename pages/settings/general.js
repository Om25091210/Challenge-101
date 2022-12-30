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
                <a href="#" className="active">
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
                <a href="#">
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
              <h2>Profile</h2>
              <form className="common_form">
                <div className="form-group">
                  <label for="">Avatar</label>
                  <input type="text" className="form-control" value="" />
                </div>

                <div className="form-group">
                  <label for="">Background</label>
                  <textarea type="text" className="form-control" value="" />
                </div>
              </form>

              <h2>Personal</h2>
              <form className="common_form">
                <div className="two_btn">
                  <div className="form-group">
                    <label for="">First name</label>
                    <input type="text" className="form-control" value="" />
                  </div>
                  <div className="form-group">
                    <label for=""> Last Name</label>
                    <input type="text" className="form-control" value="" />
                  </div>
                </div>
                <div className="form-group">
                  <label for="">Username</label>
                  <input type="text" className="form-control" value="" />
                </div>

                <div className="form-group">
                  <label for="">Bio</label>
                  <input type="text" className="form-control" value="" />
                </div>

                <div className="form-group">
                  <label for="">Gender</label>
                  <input type="text" className="form-control" value="" />
                </div>

                <div className="form-group">
                  <label for="">Date of Birth</label>
                  <input type="text" className="form-control" value="" />
                </div>

                <div className="form-group">
                  <label for="">Country</label>
                  <input type="text" className="form-control" value="" />
                </div>

                <div className="form-group">
                  <label for="">Timezone</label>
                  <input type="text" className="form-control" value="" />
                </div>
              </form>

              <h2>Contact Details</h2>
              <form className="common_form">
                <div className="form-group">
                  <label for="">Phone No.</label>
                  <input type="text" className="form-control" value="" />
                </div>
                <div className="form-group">
                  <label for="">First name</label>
                  <input type="text" className="form-control" value="" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <AllScript />
    </>
  );
};

export default General;
