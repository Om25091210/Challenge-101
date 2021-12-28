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


const CreateTeam = ({ user }) => {


const showSecond = true;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

  const [team, setTeam] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [games, setGames] = useState([]);
  const [arenas, setArenas] = useState([]);
  const [sponsors, setSponsors] = useState([]);

  const [state, setState] = useState({
    name: "",
    imgUrl: "/assets/media/default/tournament.jpg",
    coverPhoto:"/assets/media/profile/cover_bg.jpg",
    founded:"",
    game:"",
    currency:"$",
    prizepool:0,
    country:"",
    website:"",
    description:"",
	achievements:"",
	rigs:"",    
    sponsor:"",
	arena:"",
	role:"",	
    sociallink:""
  });  

  useEffect(() => {
  	//Games
    axios.get(`${baseURL}/api/all/games`).then((res) => setGames(res.data));
    
  	//arenas
    axios.get(`${baseURL}/api/all/arenas`).then((res) => setArenas(res.data));

  	//Sponsors
    axios.get(`${baseURL}/api/all/sponsors`).then((res) => setSponsors(res.data));


  }, []);  

  const mutation = useMutation(
    async (formdata) =>
      await axios.post(`${baseURL}/api/teams/create`, formdata, {
        headers: {
          Authorization: cookie.get('token'),
          'Content-Type': 'multipart/form-data',
        },
      })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formdata = new FormData();

    Object.entries(state).map(([key, value]) => {
    	formdata.append(key, value);
    })

    try {

      await mutation.mutateAsync(formdata);
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
    setState({ ...state, [e.target.name]: value});
	} 
     else if (e.target.files) {
     	console.log(e.target.files[0])
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
          <h1>Create Team</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data"> 
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Team Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Team name"
                name="name" onChange={handleChange} value={state.name}
              />
            </div>
            <div className="form-group">
              <div className="style_file_upload">
                <input
                  type="file"
                  name="imgUrl"
                  className="form-control" onChange={handleChange} 
                />
                <label >
                  <span>Upload Logo</span>
                </label>
              </div>
              <div className="style_file_upload cover_img">
                <input
                  type="file"
                  name="coverPhoto"
                  id="coverPhoto"
                  className="form-control" onChange={handleChange} 
                />
                <label >
                  <span>Upload Cover Photo</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Year Founded</label>
              <input
                type="text"
                className="form-control"
                placeholder="Year founded"
                name="founded" onChange={handleChange} value={state.founded}
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Games</label>

              <select className="form-control game_search_result" multiple={true} name="game" value={state.game} onChange={handleChange}>

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
              <label htmlFor="exampleFormControlTextarea1">Country</label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Country"
                  name="country" onChange={handleChange} value={state.country}

              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Website</label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Website"
                name="website" onChange={handleChange} value={state.website}

              />
            </div>

            <div className="form-group">
              <div className="colm">
                <label htmlFor="exampleFormControlInput1">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Description"
                name="description" onChange={handleChange} value={state.description}

                />
              </div>
              <div className="colm">
                <label htmlFor="exampleFormControlInput1">Achievements</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Achievements"
                name="achievements" onChange={handleChange} value={state.achievements}

                />
              </div>

              <div className="colm">
                <label htmlFor="exampleFormControlInput1">Rigs</label>
              <select className="form-control" multiple={true} name="rigs" value={state.rigs} onChange={handleChange}>
                  <option> Keyboard</option>
                  <option>Mouse</option>
                  <option>Headphone</option>
                  <option>Monitor</option>
                  <option>Ghaphics Card</option>
                  <option>Processor</option>
                </select>
              </div>
              <div className="colm">
                <label htmlFor="exampleFormControlInput1">Sponsors</label>
              <select className="form-control" name="sponsor" value={state.value} multiple={true} onChange={handleChange}>

                {sponsors.map((spon,idx) => (
	                <option key={idx} value={spon._id}> {spon.name} </option>
                  
                ))}
              </select>
              </div>
              <div className="colm">
                <label htmlFor="exampleFormControlInput1">Arena</label>
              <select className="form-control" name="arena" value={state.value} multiple={true} onChange={handleChange}>

                {arenas.map((arn,idx) => (
	                <option key={idx} value={arn._id}> {arn.name} </option>
                  
                ))}
              </select>
              </div>
              <div className="colm">
                <label htmlFor="exampleFormControlInput1">Team</label>
              <select className="form-control" name="role" value={state.value} multiple={true} onChange={handleChange}>
                  <option> Manager</option>
                  <option>Coach</option>
                  <option>CEO</option>
                </select>
              </div>

              <div className="colm">
                <label htmlFor="exampleFormControlInput1">Social Links</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Game"
                  name="sociallink" onChange={handleChange} value={state.sociallink}

                />
              </div>
              <div className="colm">
                <label htmlFor="exampleFormControlInput1">
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
              className="btn create_tourn"
              value="Create Team"
            />
          </form>
        </div>
      </div>
      <AllScript />
      <script></script>
    </>
  );
};

export default CreateTeam;
