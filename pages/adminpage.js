import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import baseURL from '@utils/baseURL';
import AllScript from './AllScript';
import AdminTournaments from '../components/adminfiles/AdminTournaments';
import AdminChallenges from '../components/adminfiles/AdminChallenges';
import { useState } from 'react';
import BrandCreate from '../components/Creators/BrandCreate';
import TeamCreate from '../components/Creators/TeamCreate';
import TournamentCreate from '../components/Creators/TournamentCreate';

const Adminpage = ({ user, data, profile }) => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState();

  const handleShow = (type) => {
    setShow(true);
    setType(type);
  };
  return (
    <>
      <MetaDash />

      <SignedHeader user={user} profile={profile} />

      <LeftNav user={user} />

      <div className="main_middle profile_middle">
        {user && user.isSuperAdmin ? (
          <>
            <AdminChallenges challenges={data.challenges} />
            <br /> <br />
            <AdminTournaments tournaments={data.tournaments} />
          </>
        ) : (
          <>
            <div className="create_menu">
              <ul>
                <li>
                  <a href="#" onClick={() => handleShow('Team')}>
                    <i className="fa fa-users" aria-hidden="true"></i>
                    <p>create a Team </p>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => handleShow('Tournament')}>
                    <i className="fa fa-trophy" aria-hidden="true"></i>
                    <p> create a Tournament</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-comments" aria-hidden="true"></i>
                    <p> create a Community </p>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => handleShow('Brand')}>
                    <i className="fa fa-briefcase" aria-hidden="true"></i>
                    <p> create a Brand </p>
                  </a>
                </li>
                <li>
                  <a href="/arena/create">
                    <i className="fa fa-gamepad" aria-hidden="true"></i>
                    <p> create an Arena </p>
                  </a>
                </li>
                <li>
                  <a href="/company/create">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    <p> create a Company </p>
                  </a>
                </li>
              </ul>
              <div className="message">
                <h3>The power of Esports tools are in your hands</h3>
                <p>
                  Make use of the Help section to learn more to make a better
                  use of the plateform
                </p>
              </div>

              <a href="#" className="close">
                <i class="fa fa-times-circle" aria-hidden="true"></i>
              </a>
            </div>
          </>
        )}
        {show === true ? (
          type === 'Brand' ? (
            <BrandCreate isClaim={false} />
          ) : type === 'Team' ? (
            <TeamCreate isClaim={false} />
          ) : type === 'Tournament' ? (
            <TournamentCreate user={user} isClaim={false} />
          ) : null
        ) : null}
      </div>

      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const response = await fetch(`${baseURL}/api/admin/admindata`);
  const data = await response.json();

  return {
    props: { data }
  };
};

export default Adminpage;
