import React, { useEffect, useState } from 'react';
import baseURL from '@utils/baseURL';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from './AllScript';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';
import PremiumPass from '../components/crypto/PremiumPass';

const challenges = ({ user }) => {
  return (
    <>
      <MetaDash />

      <SignedHeader user={user} />

      <LeftNav user={user} />
      <div className="main_middle profile_middle">
        <PremiumPass user={user} />
      </div>
      <AllScript />
    </>
  );
};

export default challenges;
