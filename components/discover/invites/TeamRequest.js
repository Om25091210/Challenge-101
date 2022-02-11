import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import React, { useState } from 'react';
import baseURL from '@utils/baseURL';
import { toast } from 'react-toastify';

const queryClient = new QueryClient();

export default function TeamRequest({ user, profile, team }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Team_Req user={user} team={team} profile={profile} />
    </QueryClientProvider>
  );
}

const Team_Req = ({ user, profile, team }) => {
  const [request, setRequest] = useState(false);
   
  const playerId = profile.playergames[0].player._id;

  const isReqSent =
    team.request.filter((reque) => reque.playerId === playerId).length > 0;

  const reqhandlesubmit = async (e) => {
    e.preventDefault();
    try {
      mutate({ request });
      setRequest(true);
      toast.success('Request has been sent');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  const sendRequest = async () => {
    const { data } = await fetch(
      `${baseURL}/api/teams/${team._id}/${playerId}`,
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
      {isReqSent ? (
        <button className="join" disabled>
          REQUEST SENT
        </button>
      ) : (
        <button onClick={reqhandlesubmit} className="join">
          REQUEST TO JOIN
        </button>
      )}
    </>
  );
};
