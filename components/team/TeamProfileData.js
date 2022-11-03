import TeamAbout from './TeamAbout';
import TeamSponsors from './TeamSponsors';
import { useState, useEffect } from 'react';
import TeamPhotos from './TeamPhotos';
import TeamVideos from './TeamVideos';
import TeamAllStats from './TeamAllStats';
import TeamSquads from './teamsquads/TeamSquads';
import TeamStatistics from './teamstats/TeamStatistics';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import ProductList from '@components/common/ProductList';
import TeamMatches from '@components/tournament/TeamMatches';
import TeamJobs from './TeamJobs';
import TeamJoines from './TeamJoines';
import AllPosts from '../dashboard/AllPosts';
import TeamRigs from './TeamRigs';
import TeamGameDetails from './TeamGameDetails';
import { toast } from 'react-toastify';

const TeamProfileData = ({
  user,
  data,
  products,
  isManager,
  profile,
  isAdmin,
  isOwner,
  isCEO,
  teams
}) => {
  const [jobs, setJobs] = useState([]);
  const [teamposts, setTeamPosts] = useState([]);
  const [tournamentStatData, setTournamentStatData] = useState([]);

  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);

  useEffect(() => {
    //Jobs
    axios
      .get(`${baseURL}/api/teams/jobs/${data.team._id}`)
      .then((res) => setJobs(res.data));

    //Posts
    axios
      .get(`${baseURL}/api/posts/`)
      .then((res) => setTeamPosts(res.data.posts));

    // Tournament Stats
    axios
      .get(`${baseURL}/api/tournamentstat/`)
      .then((res) => setTournamentStatData(res.data));
  }, []);

  let Filteredteamposts = teamposts.filter((teampost) => {
    return (
      teampost.post_type === 'Team' && teampost.username === data.team.name
    );
  });

  let [tabData, setTabData] = useState([]);

  const handleTabs = async (Type) => {
    console.log(Type);
    try {
      await axios
        .get(`${baseURL}/api/teams/teamdata/${Type}/${data.team?._id}`)
        .then((res) => setTabData(res.data));
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  return (
    <>
      <ul className="profile_tab_btn">
        <li className="active">
          <a href="#!" rel="overview">
            OVERVIEW
          </a>
        </li>
        <li>
          <a href="#!" rel="squads" onClick={() => handleTabs('SQUADS')}>
            Squads
          </a>
        </li>
        {/* <li>
          <a href="#!" rel="achievement">
            {' '}
            ACHIEVEMENTS
          </a>
        </li>
        <li>
          <a href="#!" rel="matches" onClick={() => handleTabs('MATCHES')}>
            MATCHES
          </a>
        </li>
        <li>
          <a href="#!" rel="stats">
            STATISTICS
          </a>
        </li>
        <li>
          <a href="#!" rel="store">
            {' '}
            CLAN STORE{' '}
          </a>
        </li> */}
        <li>
          <a href="#!" rel="photos">
            PHOTOS
          </a>
        </li>
        <li>
          <a href="#!" rel="media">
            MEDIA
          </a>
        </li>
        <li>
          <a href="#!" rel="jobs">
            JOBS
          </a>
        </li>
        <li>
          <a href="#!" rel="about" onClick={() => handleTabs('ABOUT')}>
            {' '}
            ABOUT
          </a>
        </li>
        <li>
          <a href="#!" rel="sponsors" onClick={() => handleTabs('SPONSORS')}>
            {' '}
            SPONSORS
          </a>
        </li>
        {/* <li>
          <a href="#!" rel="rigs" onClick={() => handleTabs('RIGS')}>
            {' '}
            RIGS
          </a>
        </li> */}
        {isManager || isAdmin || isOwner || isCEO ? (
          <li>
            <a href="#!" rel="joines" onClick={() => handleTabs('JOINES')}>
              Joines
            </a>
          </li>
        ) : null}
      </ul>
      <div className="prfoile_tab_data white_bg">
        <div className="tab" id="overview">
          {' '}
          <div className="profile_left_post">
            {Filteredteamposts.length === 0 ? (
              <h6>No Posts Under This Team</h6>
            ) : (
              Filteredteamposts.length !== 0 &&
              Filteredteamposts.map((post, index) => (
                <AllPosts
                  post={post}
                  user={user}
                  type="TeamPost"
                  team={data.team}
                />
              ))
            )}
          </div>
          <div className="profile_match_details">
            {/* <TeamAllStats teamId={data.team._id} /> */}
            <TeamGameDetails
              team={data.team}
              user={user}
              isManager={isManager}
              isAdmin={isAdmin}
              isOwner={isOwner}
              isCEO={isCEO}
            />
          </div>
        </div>
        <div className="tab hide" id="squads">
          <TeamSquads
            squadsData={tabData}
            team={data.team}
            isManager={isManager}
            isAdmin={isAdmin}
            isOwner={isOwner}
            isCEO={isCEO}
          />
        </div>
        <div className="tab hide" id="achievement">
          <div className="achivement_box">
            <div className="features">
              <h2>featured</h2>
              <ul>
                <li>
                  <div className="img">
                    <i className="fa fa-trophy" aria-hidden="true"></i>
                  </div>
                  <p className="tit">Silver x1</p>
                  <p>Awarded for placing second 1 tournament</p>
                </li>
              </ul>
            </div>
            <div className="trophy_cabinate">
              <h3>trophy cabinet</h3>
              <ul>
                <li>
                  <p className="num">21</p>
                  <h4> Title </h4>
                  <h5>professional</h5>
                  <h5>tournaments</h5>
                </li>
                <li>
                  <p className="num">21</p>
                  <h4> Title </h4>
                  <h5>professional</h5>
                  <h5>tournaments</h5>
                </li>
                <li>
                  <p className="num">21</p>
                  <h4> Title </h4>
                  <h5>professional</h5>
                  <h5>tournaments</h5>
                </li>
                <li>
                  <p className="num">21</p>
                  <h4> Title </h4>
                  <h5>professional</h5>
                  <h5>tournaments</h5>
                </li>
              </ul>
            </div>
            <div className="tournament_table">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">tournament</th>
                    <th scope="col">game</th>
                    <th scope="col">date</th>
                    <th scope="col">rank</th>
                    <th scope="col">prize</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>zapak gaming tournament </td>
                    <td>cod 4</td>
                    <td>2011</td>
                    <td>1</td>
                    <td>rs. 10,000</td>
                  </tr>
                  <tr>
                    <td>zapak gaming tournament </td>
                    <td>cod 4</td>
                    <td>2011</td>
                    <td>1</td>
                    <td>rs. 10,000</td>
                  </tr>
                  <tr>
                    <td>zapak gaming tournament </td>
                    <td>cod 4</td>
                    <td>2011</td>
                    <td>1</td>
                    <td>rs. 10,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <TeamMatches tournament={tabData.teamMatches} />
        <div className="tab hide" id="stats">
          <TeamStatistics
            tournamentStatData={tournamentStatData}
            isManager={isManager}
            isAdmin={isAdmin}
            isOwner={isOwner}
            isCEO={isCEO}
          />
        </div>

        <ProductList user={user} productList={products} />

        <div className="tab hide" id="photos">
          <TeamPhotos
            user={user}
            team={data.team}
            isManager={isManager}
            isAdmin={isAdmin}
            isOwner={isOwner}
            isCEO={isCEO}
          />
        </div>

        <div className="tab hide" id="media">
          <TeamVideos
            user={user}
            team={data.team}
            isManager={isManager}
            isAdmin={isAdmin}
            isOwner={isOwner}
            isCEO={isCEO}
          />
        </div>

        <div className="tab hide" id="jobs">
          <TeamJobs
            jobs={jobs}
            team={teams}
            isManager={isManager}
            isAdmin={isAdmin}
            isOwner={isOwner}
            isCEO={isCEO}
            user={user}
            profile={profile}
          />
        </div>
        <div className="tab hide" id="about">
          <TeamAbout
            Data={data}
            teamAbout={tabData}
            isManager={isManager}
            isAdmin={isAdmin}
            isOwner={isOwner}
            isCEO={isCEO}
            user={user}
          />
        </div>
        <TeamSponsors
          data={data}
          teamSponsors={tabData}
          user={user}
          isManager={isManager}
          isAdmin={isAdmin}
          isOwner={isOwner}
          isCEO={isCEO}
        />
        <div className="tab hide" id="rigs">
          <TeamRigs
            data={data}
            teamRigs={tabData}
            user={user}
            profile={profile}
            isAdmin={isAdmin}
            isManager={isManager}
            isOwner={isOwner}
            isCEO={isCEO}
          />
        </div>
        <div className="tab hide" id="joines">
          <TeamJoines
            data={tabData}
            user={user}
            profile={profile}
            isAdmin={isAdmin}
            isManager={isManager}
            isOwner={isOwner}
            isCEO={isCEO}
            team={data.team}
          />
        </div>
      </div>
    </>
  );
};

export default TeamProfileData;
