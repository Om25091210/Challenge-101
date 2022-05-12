import axios from 'axios';
import React from 'react';
import baseURL from '../../utils/baseURL';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const ProfileVideosDel = ({ collectionId, profile }) => {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.delete(
        `${baseURL}/api/teams/videos/${profile?._id}/${collectionId}`,
        {
          headers: {
            Authorization: cookie.get('token')
          }
        }
      );
      refreshData();
      toast.success('Deleted Successfully');
    } catch (error) {
      console.log(error);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };
  return (
    <>
      <button className="btn" onClick={handleDeleteSubmit}>
        <i className="fa fa-trash-o" aria-hidden="true"></i>
      </button>
    </>
  );
};

export default ProfileVideosDel;
