import { useState, useEffect } from 'react';
import Script from 'next/script';
import Head from 'next/head';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import Match from '@components/calendar/match';
import FooterMain from '@components/FooterMain';
import AllScript from './AllScript';

const CreateTournament = ({ user }) => {
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} />
      <LeftNav />
      <div className="main_middle">
        <div className="white_bg create_tournament">
          <h1>Create Tournament</h1>
          <form>
            <div class="form-group">
              <label for="exampleFormControlInput1">Tournament Name</label>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Game"
              />
            </div>
            <div class="form-group">
              <div className="style_file_upload">
                <input
                  type="file"
                  name="file-2[]"
                  id="file-2"
                  className="inputfile inputfile-2"
                  data-multiple-caption="{count} files selected"
                  multiple
                />
                <label for="file-2">
                  <span>Upload Logo</span>
                </label>
              </div>
              <div className="style_file_upload cover_img">
                <input
                  type="file"
                  name="file-3[]"
                  id="file-3"
                  className="inputfile inputfile-2"
                  data-multiple-caption="{count} files selected"
                  multiple
                />
                <label for="file-3">
                  <span>Upload Cover Photo</span>
                </label>
              </div>
            </div>
            <div className="form-group">
              <label for="exampleFormControlInput1">Games</label>
              <div className="searchbox">
                <input
                  type="search"
                  class="form-control"
                  placeholder="Search"
                />
                <input type="submit" value="" />
              </div>
              <ul className="game_search_result">
                <li>
                  <a href="#">
                    <img src="/assets/media/games/tournament1.png" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/assets/media/games/tournament2.png" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/assets/media/games/tournament3.png" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/assets/media/games/tournament1.png" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/assets/media/games/tournament2.png" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/assets/media/games/tournament3.png" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/assets/media/games/tournament1.png" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/assets/media/games/tournament2.png" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="form-group">
              <label for="exampleFormControlInput1">Prizes</label>
              <div className="prize_box">
                {' '}
                <a href="#">
                  <img src="/assets/media/games/tournament1.png" />
                </a>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder=""
                />
              </div>
            </div>
            <div className="form-group">
              <label for="exampleFormControlTextarea1">
                Tournament Category
              </label>
              <div className="btn_selection">
                <button type="button" class="btn btn-primary btn-lg">
                  Online
                </button>
                <button type="button" class="btn btn-secondary btn-lg">
                  Lan
                </button>
              </div>
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Tourament Type</label>
              <div className="btn_selection">
                <button type="button" class="btn btn-primary btn-lg">
                  Leaderboard
                </button>
                <button type="button" class="btn btn-secondary btn-lg">
                  Single Elimination
                </button>
                <button type="button" class="btn btn-secondary btn-lg">
                  Double Elimination
                </button>
              </div>
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Tournament Format</label>
              <div className="btn_selection">
                <button type="button" class="btn btn-primary btn-lg">
                  Solo
                </button>
                <button type="button" class="btn btn-secondary btn-lg">
                  Teams
                </button>
              </div>
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">
                Number of Participants
              </label>
              <input type="email" class="form-control" id="" placeholder="" />
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Entrance fee</label>
              <input type="email" class="form-control" id="" placeholder="$" />
            </div>
            <div class="form-group">
              <div className="date_time">
                <div className="date_box">
                  <label for="exampleFormControlTextarea1">
                    Session Start Date
                  </label>
                  <input type="date" value="" />
                </div>
                <div className="time_box">
                  <label for="exampleFormControlTextarea1">
                    Session Start Time
                  </label>
                  <input type="time" value="" />
                </div>
              </div>
            </div>
            <div class="form-group">
              <div className="date_time">
                <div className="date_box">
                  <label for="exampleFormControlTextarea1">
                    Session End Date
                  </label>
                  <input type="date" value="" />
                </div>
                <div className="time_box">
                  <label for="exampleFormControlTextarea1">
                    Session End Time
                  </label>
                  <input type="time" value="" />
                </div>
              </div>
            </div>
            <div class="form-group">
              <div className="colm">
                <label for="exampleFormControlInput1">Location</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Location"
                />
              </div>
              <div className="colm">
                <label for="exampleFormControlInput1">Organizer</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Organizer"
                />
              </div>

              <div className="colm">
                <label for="exampleFormControlInput1">Add Cohosts</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Add Cohosts"
                />
              </div>
              <div className="colm">
                <label for="exampleFormControlInput1">Sponsors</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Sponsors"
                />
              </div>
              <div className="colm">
                <label for="exampleFormControlInput1">Discription</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Discription"
                />
              </div>
              <div className="colm">
                <label for="exampleFormControlInput1">Tickets</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Tickets"
                />
              </div>
              <div className="colm">
                <label for="exampleFormControlInput1">Website</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Website"
                />
              </div>
              <div className="colm">
                <label for="exampleFormControlInput1">Social Links</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Game"
                />
              </div>
              <div className="colm">
                <label for="exampleFormControlInput1">
                  Let your fans know{' '}
                </label>
                <div className="socail">
                  {' '}
                  <a href="#" class="fa fa-facebook"></a>
                  <a href="#" class="fa fa-twitter"></a>
                  <a href="#" class="fa fa-google"></a>
                  <a href="#" class="fa fa-linkedin"></a>{' '}
                </div>
              </div>
            </div>
            <input
              type="submit"
              className="btn create_tourn"
              value="Create Tournament"
            />
          </form>
        </div>
      </div>
      <AllScript />
      <script></script>
    </>
  );
};

export default CreateTournament;
