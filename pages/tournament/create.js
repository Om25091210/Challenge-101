import { useState, useEffect } from 'react';
import Script from 'next/script';
import Head from 'next/head';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import Match from '@components/calendar/match';
import FooterMain from '@components/FooterMain';
import AllScript from '../AllScript';
import baseURL from '@utils/baseURL';
import axios from 'axios';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import cookie from 'js-cookie';

const CreateTournament = ({ user }) => {

const showSecond = true;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

  const [tournament, setTournament] = useState();

  const [games, setGames] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [sponsors, setSponsors] = useState([]);

  const [state, setState] = useState({
    name: "",
    imgUrl: "/assets/media/default/tournament.jpg",
    coverPhoto:"/assets/media/profile/cover_bg.jpg",
    game:"",
    currency:"$",
    prizepool:0,
    category:"",
    tournamentType:"",
    format:"",
    participants:0,
    entranceFee:0,
    startDate:"",
    startTime:"",
    endDate:"",
    endTime:"",
    location:"",
    organizer:"",
    cohosts:"",
    sponsor:"",
    description:"",
    tickets:"",
    website:"",
    sociallink:"",
    file: null
  });  

  useEffect(() => {
  	//Games
    axios.get(`${baseURL}/api/all/games`).then((res) => setGames(res.data));
    
  	//Organizers
    axios.get(`${baseURL}/api/all/organizers`).then((res) => setOrganizers(res.data));

  	//Sponsors
    axios.get(`${baseURL}/api/all/sponsors`).then((res) => setSponsors(res.data));


  }, []);  

  const handleSubmit = async (e) => {
    e.preventDefault();

 	let tourdata = state;

    try {

      console.log(tourdata);	
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tourdata)
      };
    const dt = fetch(`${baseURL}/api/tournaments/create`, requestOptions)
        .then(data => data.json());

      toast.success('Your data has been successfully created');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };


function handleChange(e) {


	if (e.target.options) {

    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    console.log(e.target.name);
    console.log(value);
    setState({ ...state, [e.target.name]: value});
	} 
     else if (e.target.files) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  }


  return (
    <>
      <MetaDash />
      <SignedHeader user={user} />
      <LeftNav />
      <div className="main_middle">
        <div className="white_bg create_tournament">
          <h1>Create Tournament</h1>
          <form onSubmit={handleSubmit}> 
            <div className="form-group">
              <label for="exampleFormControlInput1">Tournament Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="name"
                name="name" onChange={handleChange} value={state.name}
              />
            </div>
            <div className="form-group">
              <div className="style_file_upload">
                <input
                  type="file"
                  name="imgUrl"
                  className="inputfile inputfile-2" onChange={handleChange} 
                />
                <label for="file-2">
                  <span>Upload Logo</span>
                </label>
              </div>
              <div className="style_file_upload cover_img">
                <input
                  type="file"
                  name="coverPhoto"
                  id="coverPhoto"
                  className="inputfile inputfile-2" onChange={handleChange} 
                 
                />
                <label for="file-3">
                  <span>Upload Cover Photo</span>
                </label>
              </div>
            </div>
            <div className="form-group">
              <label for="exampleFormControlInput1">Games</label>
              <select className="game_search_result" multiple={true} name="game" value={state.game} onChange={handleChange}>

                {games.map((game,idx) => (
	                <option key={idx} value={game._id}> {game.name} </option>
                  
                ))}
              </select>
            </div>
            <div className="form-group">
              <label for="exampleFormControlInput1">Prizes</label>
              <div className="prize_box">
                {' '}
                <a href="#">
                  <img src="/assets/media/games/tournament1.png" />
                </a>
                
				<select name="currency" id="currency" onChange={handleChange} value={state.currency}>
				  <option value="USD">USD($)- Dollars</option>
				  <option value="INR">INR (Rs) - Rupees</option>
				</select>                

                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  name="prizepool" onChange={handleChange} value={state.prizepool}
                />
              </div>
            </div>
            <div className="form-group">
              <label for="exampleFormControlTextarea1">
                Tournament Category
              </label>
              <div className="btn_selection">
                <button type="button" className="btn btn-primary btn-lg">
                  Online <input type="hidden" name="category" value="Online" onChange={handleChange}/>
                </button>
                <button type="button" className="btn btn-secondary btn-lg">
                  LAN <input type="hidden" name="category" value="LAN" onChange={handleChange}/>
                </button>
              </div>
            </div>
            <div className="form-group">
              <label for="exampleFormControlTextarea1">Tourament Type</label>
              <div className="btn_selection">
                <button type="button" className="btn btn-primary btn-lg">
                  Leaderboard <input type="hidden" name="tournamentType" value="Leaderboard"  onChange={handleChange}/>
                </button>
                <button type="button" className="btn btn-secondary btn-lg">
                  Single Elimination <input type="hidden" name="tournamentType" value="Single Elimination" onChange={handleChange}/>
                </button>
                <button type="button" className="btn btn-secondary btn-lg">
                  Double Elimination <input type="hidden" name="tournamentType" value="Double Elimination" onChange={handleChange}/>
                </button>
              </div>
            </div>
            <div className="form-group">
              <label for="exampleFormControlTextarea1">Tournament Format</label>
              <div className="btn_selection">
                <button type="button" className="btn btn-primary btn-lg">
                  Solo <input type="hidden" name="format" value="Solo" onChange={handleChange}/>
                </button>
                <button type="button" className="btn btn-secondary btn-lg">
                  Teams <input type="hidden" name="format" value="Teams" onChange={handleChange}/>
                </button>
              </div>
            </div>
            <div className="form-group">
              <label for="exampleFormControlTextarea1">
                Number of Participants
              </label>
              <input type="number" name="participants" className="form-control" onChange={handleChange} value={state.participants}  placeholder="" />
            </div>
            <div className="form-group">
              <label for="exampleFormControlTextarea1">Entrance fee</label>
              <input type="number" name="entranceFee" className="form-control" onChange={handleChange} value={state.entranceFee} placeholder="$" />
            </div>
            <div className="form-group">
              <div className="date_time">
                <div className="date_box">
                  <label for="exampleFormControlTextarea1">
                    Session Start Date
                  </label>
                  <input type="date" name="startDate" onChange={handleChange} value={state.startDate}/>
                </div>
                <div className="time_box">
                  <label for="exampleFormControlTextarea1">
                    Session Start Time
                  </label>
				  <TimePicker
				    style={{ width: 100 }}
				    showSecond={showSecond}
				    defaultValue={moment()}
				    className="xxx"
				    name="startTime"
				    onChange={handleChange} value={state.startTime}
				  />

                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="date_time">
                <div className="date_box">
                  <label for="exampleFormControlTextarea1">
                    Session End Date
                  </label>
                  <input type="date" name="endDate" onChange={handleChange} value={state.endDate}/>
                </div>
                <div className="time_box">
                  <label for="exampleFormControlTextarea1">
                    Session End Time
                  </label>
				  <TimePicker
				    style={{ width: 100 }}
				    showSecond={showSecond}
				    defaultValue={moment()}
				    className="xxx"
				    name="endTime"
				    onChange={handleChange} value={state.endTime}
				  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="colm">
                <label for="exampleFormControlInput1">Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  placeholder="Location" onChange={handleChange} value={state.location}
                />
              </div>
              <div className="colm">
                <label for="exampleFormControlInput1">Organizer</label>

              <select className="game_search_result" name="organizer" value={state.organizer} multiple={true} onChange={handleChange}>

                {organizers.map((org,idx) => (
	                <option key={idx} value={org._id}> {org.name} </option>
                  
                ))}
              </select>

              </div>

              <div className="colm">
                <label for="exampleFormControlInput1">Add Cohosts</label>
                <input
                  type="text"
                  name="cohosts"
                  className="form-control"
                  placeholder="Add Cohosts" onChange={handleChange} value={state.cohosts}
                />
              </div>
              <div className="colm">
                <label for="exampleFormControlInput1">Sponsors</label>

              <select className="game_search_result" name="sponsor" value={state.value} multiple={true} onChange={handleChange}>

                {sponsors.map((spon,idx) => (
	                <option key={idx} value={spon._id}> {spon.name} </option>
                  
                ))}
              </select>

              </div>
              <div className="colm">
                <label for="exampleFormControlInput1">Description</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Description" onChange={handleChange} value={state.description}
                />
              </div>
              <div className="colm">
                <label for="exampleFormControlInput1">Tickets</label>
                <input
                  type="number"
                  name="tickets"
                  className="form-control"
                  placeholder="Tickets" onChange={handleChange} value={state.tickets}
                />
              </div>
              <div className="colm">
                <label for="exampleFormControlInput1">Website</label>
                <input
                  type="text"
                  name="website"
                  className="form-control"
                  placeholder="Website" onChange={handleChange} value={state.website}
                />
              </div>
              <div className="colm">
                <label for="exampleFormControlInput1">Social Links</label>
                <input
                  type="text"
                  name="sociallink"
                  className="form-control"
                  placeholder="Game" onChange={handleChange} value={state.sociallink}
                />
              </div>
              <div className="colm">
                <label for="exampleFormControlInput1">
                  Let your fans know{' '}
                </label>
                <div className="socail">
                  {' '}
                  <a href="#" className="fa fa-facebook"></a>
                  <a href="#" className="fa fa-twitter"></a>
                  <a href="#" className="fa fa-google"></a>
                  <a href="#" className="fa fa-linkedin"></a>{' '}
                </div>
              </div>
            </div>
            <input
              type="submit"
              className="btn"
              value="Create Tournament"
            />
          </form>
        </div>
      </div>
      <AllScript />
      <script></script>
    </>
  );
};

export default CreateTournament;
