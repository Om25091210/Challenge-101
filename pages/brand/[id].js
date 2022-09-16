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
      <div>
        <img
          style={{
            marginTop: '100px',
            marginLeft: '100px',
            height: '100px',
            width: '100px'
          }}
          src={data?.logoUrl}
          alt={data?.name}
        />
        <p style={{ marginTop: '100px', marginLeft: '100px' }}>{data?.name}</p>
        <p style={{ marginTop: '50px', marginLeft: '100px' }}>
          {data?.description}
        </p>
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
