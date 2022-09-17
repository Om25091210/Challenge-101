import React from 'react';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';
import baseURL from '@utils/baseURL';

const BrandDetail = ({ user, profile, data }) => {
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} profile={profile} />
      <LeftNav user={user} />
      <div className="main_middle profile_middle">
        <h1>All Brands</h1>

        <div className="team_row_box">
          <div className="team_row">
            <div className="inner_team">
              <div className="logo_box jobs_img">
                <img src={data?.logoUrl} alt={data?.name} />
                <h3>{data?.name}</h3>
              </div>
              <p style={{ marginTop: '50px', marginLeft: '100px' }}>
                {data?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const response = await fetch(`${baseURL}/api/brand/${id}`);
  const data = await response.json();

  return {
    props: { data }
  };
};

export default BrandDetail;
