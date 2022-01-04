import { useState, useEffect } from 'react';
import Script from 'next/script';
import Head from 'next/head';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import Match from '@components/calendar/match';
import FooterMain from '@components/FooterMain';
import AllScript from './AllScript';

const CreateTeam = ({ user }) => {
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} />
      <LeftNav />
      <div className="main_middle create_main_middle">
        <div className="white_bg create_tournament">
          <h1>Create Team</h1>
          <form>
            <div class="form-group">
              <label for="exampleFormControlInput1">Team Name</label>
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

            <div class="form-group">
              <label for="exampleFormControlInput1">Year Founded</label>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Game"
              />
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

            <div class="form-group">
              <label for="exampleFormControlTextarea1">Country</label>
              <input
                type="email"
                class="form-control"
                id=""
                placeholder="Country"
              />
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Website</label>
              <input
                type="email"
                class="form-control"
                id=""
                placeholder="Website"
              />
            </div>

            <div class="form-group">
              <div className="colm">
                <label for="exampleFormControlInput1">Description</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Description"
                />
              </div>
              <div className="colm">
                <label for="exampleFormControlInput1">Achievements</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Achievements"
                />
              </div>

              <div className="colm">
                <label for="exampleFormControlInput1">Rigs</label>
                <select class="form-control" id="exampleFormControlSelect1">
                  <option> Keyboard</option>
                  <option>Mouse</option>
                  <option>Headphone</option>
                  <option>Monitor</option>
                  <option>Ghaphics Card</option>
                  <option>Processor</option>
                </select>
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
                <label for="exampleFormControlInput1">Arena</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Discription"
                />
              </div>
              <div className="colm">
                <label for="exampleFormControlInput1">Team</label>
                <select class="form-control" id="exampleFormControlSelect1">
                  <option> Manager</option>
                  <option>Coach</option>
                  <option>CEO</option>
                </select>
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
              value="Create Team"
            />
          </form>
        </div>
      </div>
      <AllScript />
      <script></script>
    </>
  );
};

export default CreateTeam;
