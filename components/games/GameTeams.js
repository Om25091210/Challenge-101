import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';


const GameTeams = ({ user, game }) => {

  const router = useRouter();

  const [teams, setTeams] = useState([]);
  const [searchResults, setSearchResults] = useState([]);


  const { id } = router.query;


  useEffect(() => {

  	    axios.get(`${baseURL}/api/teams/teamsbygame/${id}`).then((res) => {
            setTeams(res.data);
        });

  }, []);

  return (

  	 <ul className="communities teams">
    {!teams || teams.length === 0 ? (
    	 <li>
      <div className="activity_tag">
        <span className="act_name">No teams for selected game ...</span>
      </div>
      </li>
    ) : (
       teams.map((result, idx) => (
                      
              <li key={idx}>
              <a href={`/team/${result.team._id}`}>
                <div className="imgs">
                  {' '}
                  <img src={result.team.imgUrl} alt={result.team.name} />{' '}
                </div>
                <div className="bottom_data">
                  <h3>{result.team.name}</h3>
                </div>
               </a>
              </li>          
      ))
    )}

    </ul>



  );
};

export default GameTeams;
