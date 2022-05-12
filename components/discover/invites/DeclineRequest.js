import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import React, { useState } from 'react';
import baseURL from '@utils/baseURL';
import { toast } from 'react-toastify';

const queryClient = new QueryClient();

export default function DeclineRequest({ player, team }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Decline_Req team={team} player={player} />
    </QueryClientProvider>
  );
}

const Decline_Req = ({ player, team }) => {
  const [request, setRequest] = useState(false);

  const playerId = player?.playerId._id;

  const reqhandlesubmit = async (e) => {
    e.preventDefault();
    try {
      mutate({ request });
      setRequest(true);
      toast.success('The request has been declined.');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  const sendRequest = async () => {
    const { data } = await fetch(
      `${baseURL}/api/teams/decline/${team._id}/${playerId}`,
      {
        method: 'PUT'
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
        Decline
      </button>
    </>
  );
};
