import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';

import TournamentRows from '@components/tournament/TournamentRows';

const GameTournaments = ({ user }) => {

  const router = useRouter();

  const [tournaments, setTournaments] = useState([]);
  const [searchResults, setSearchResults] = useState([]);


  const { id } = router.query;


  useEffect(() => {

  	    axios.get(`${baseURL}/api/tournaments/tournamentsbygame/${id}`).then((res) => {
            setTournaments(res.data);
        });

  }, []);

  return (

  	    <TournamentRows tournaments={tournaments} searchResults={searchResults}/>

  );
};

export default GameTournaments;
