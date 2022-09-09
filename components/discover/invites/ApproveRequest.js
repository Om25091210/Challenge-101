import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import React, { useState } from 'react';
import baseURL from '@utils/baseURL';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const queryClient = new QueryClient();

export default function ApproveRequest({ player, team }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Approve_Req team={team} player={player} />
    </QueryClientProvider>
  );
}

const Approve_Req = ({ player, team }) => {
  const [request, setRequest] = useState(false);

  const playerId = player?.teamId ? player.playerId : player.playerId._id;

  const reqhandlesubmit = async (e) => {
    e.preventDefault();
    try {
      mutate({ request });
      setRequest(true);
      toast.success('The request has been approved.');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  const sendRequest = async () => {
    const { data } = await fetch(
      `${baseURL}/api/teams/accept/${team._id}/${playerId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: Cookies.get('token')
        }
      }
    );
    return data;
  };

  const { mutate } = useMutation(sendRequest, {
    onSuccess: (data) => {
      console.log(data);
    }
  });

  return (
    <>
      <button className="btn" onClick={reqhandlesubmit}>
        Approve
      </button>
    </>
  );
};
