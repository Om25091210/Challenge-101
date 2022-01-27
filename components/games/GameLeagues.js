import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';


const GameLeagues = ({ user }) => {

  const router = useRouter();

  const [leagues, setLeagues] = useState([]);
  const [searchResults, setSearchResults] = useState([]);


  const { id } = router.query;


  useEffect(() => {

  	    axios.get(`${baseURL}/api/leagues/leaguesbygame/${id}`).then((res) => {
            setLeagues(res.data);
        });

  }, []);

  console.log(leagues);

  return (

  	<>
    {!leagues || leagues.length === 0 ? (
      <div className="activity_tag">
        <span className="act_name">No new leagues for selected game ...</span>
      </div>
    ) : (
       leagues.map((result, idx) => (
    
            <div className="game_row" key={idx}>
              {' '}
              <span className="star live">
                <i className="fa fa-star" aria-hidden="true"></i>
              </span>
              <div className="game_pos">
                <div className="game_loc">
                  {' '}
                  <img src="/assets/media/category/game_loc.jpg" alt="" />{' '}
                </div>
                <span className="tour_logo">
                  {' '}
                  <img src="/assets/media/category/game1.png" alt="" />{' '}
                </span>{' '}
              </div>
              <div className="right_game_details">
                <div className="top_game">
                  <div className="date">
                    <h3>{result.name}</h3>
                    09.OCT.2021
                  </div>
                  <div className="reg">
                    <button className="active">LIVE</button>
                  </div>
                </div>
                <div className="bottom_game">
                  <div className="users">
                    <img src="/assets/media/category/users.png" alt="" />
                  </div>
                  <div className="games">
                    <h3>Games:</h3>
                    <div className="game_logo">
                      <img src="/assets/media/category/game1.png" alt="" /> COD
                      4,
                    </div>
                    <div className="game_logo">
                      <img src="/assets/media/category/game2.png" alt="" /> DOTA
                      2,
                    </div>
                    <div className="game_logo">
                      <img src="/assets/media/category/game3.png" alt="" /> CSGO
                    </div>
                  </div>
                  <div className="prize">
                    <h3>PRIZE POOL:</h3>
                    Rs. 45,00,000
                  </div>
                </div>
              </div>
            </div>

          
      ))
    )}

    </>



  );
};

export default GameLeagues;
