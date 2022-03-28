import { useState, useEffect } from 'react';
import Head from 'next/head';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';

import AllScript from './AllScript';

const NFTGamesList = ({ user }) => {
  return (
    <>
      <MetaDash />

      <SignedHeader user={user} />

      <LeftNav user={user} />

      <div className="main_middle profile_middle">

      		<a href="/nft/carslane">
             <div>
                <button className="btn btn-info mb-4" >
                    <i className="fa fa-long-arrow-alt-left" aria-hidden="true"></i> Cars Lane
                </button>
            </div>
            </a>

      		<a href="#/dodgerocks">
             <div>
                <button className="btn btn-info mb-4" >
                    <i className="fa fa-long-arrow-alt-left" aria-hidden="true"></i> Dodge Rocks
                </button>
            </div>
            </a> 		          

      </div>

      <AllScript />
    </>
  );
};

export default NFTGamesList;
