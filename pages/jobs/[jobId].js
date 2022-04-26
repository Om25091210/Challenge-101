import React from 'react';
import baseURL from '../../utils/baseURL';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';

const Job = ({ data, user }) => {
  return (
    <>
      <SignedHeader user={user} />

      <LeftNav user={user} />
      <div>
        <h3>
          {data.position} - {data.job_role}
        </h3>
        <div>
          <p>Experience: {data.experience} Years</p>
          {data.location.map((loc) => (
            <p>{loc}</p>
          ))}
        </div>
        <p>Status: {data.status ? 'Available' : 'Closed'}</p>
        {data.languages.map((lan) => (
          <p>Languages: {lan} </p>
        ))}
      </div>
      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { jobId } = context.params;
  try {
    const response = await fetch(`${baseURL}/api/jobs/${jobId}`);
    const data = await response.json();
    return {
      props: { data }
    };
  } catch {
    return {
      props: {}
    };
  }
};

export default Job;
