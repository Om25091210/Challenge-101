import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import cookie from 'js-cookie';
import baseURL from '../../utils/baseURL';
import { toast } from 'react-toastify';

const queryClient = new QueryClient();

export default function FavTournament({ tournament, user }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <TournamentFav tournament={tournament} user={user} />
    </QueryClientProvider>
  );
}
const TournamentFav = ({ tournament, user }) => {
  const [add, setAdd] = useState(false);

  const isFav =
    tournament.favourites?.filter((fav) => {
      return fav.user === user._id;
    }).length > 0;

  const handleAdd = (e) => {
    e.preventDefault();
    mutate({ add });
    setAdd(true);
    toast.success(`${tournament.name} has been added to favourites.`);
  };

  const addingFav = async () => {
    await fetch(`${baseURL}/api/tournaments/fav/${tournament._id}`, {
      method: 'PUT',
      headers: {
        Authorization: cookie.get('token')
      }
    });
  };

  const { mutate } = useMutation(addingFav);
  return (
    <>
      {isFav === true ? (
        <span className="star active">
          <i className="fa fa-star" aria-hidden="true" onClick={handleAdd}></i>
        </span>
      ) : (
        <span className="star live">
          <i
            className="fa fa-star"
            aria-hidden="true"
            onClick={handleAdd}
            style={{ cursor: 'pointer' }}
          ></i>
        </span>
      )}
    </>
  );
};
