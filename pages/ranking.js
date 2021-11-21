import { useState, useEffect } from 'react'
import Head from 'next/head'
import MetaDash from '../components/MetaDash';
import SignedHeader from '../components/SignedHeader';
import LeftNav from '../components/LeftNav';
import TeamFilter from '../components/ranking/TeamFilter';
import RankingTable from '../components/ranking/RankingTable';
import FooterMain from '../components/FooterMain';

import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import axios from 'axios';
import baseURL from '../utils/baseURL';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { useQuery, useMutation } from 'react-query'
import { searchTournaments, getTeamsRankingTournaments } from '../utils/functionsHelper';


const Ranking = ({ user }) => {

  const [searchObj, setSearchObj] = useState({
    search: '',
    filters: '',
  });

  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('confirm');
  const [searchResults, setSearchResults] = useState([]);

  const router = useRouter();

  let cancel;
  var sdata ;

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const { search, filters } = searchObj;

  const handleChange = (e) => {
    setSearchObj((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sdata = await searchTournaments(searchObj, setError, setFormLoading, toast, setStatus);
    setSearchResults(sdata);
  };


   const { data } = useQuery([], () =>
    getTeamsRankingTournaments()
  );


  return (

  <div>

    <MetaDash />

    <SignedHeader user={user}/>

    <LeftNav />



<div className="main_middle profile_middle">
  <div className="discovery_page">
    <div className="white_bg">
      <h2>GAME</h2>
      <div className="tit">
        <a href="#"><span>
          <b className="icon"><img src="/assets/media/ranking/console.png" alt=""/></b> Browse Games</span>
           <i className="fa fa-angle-right" aria-hidden="true"></i> 
           <span className="other_logo"><img src="/assets/media/team1.png" alt=""/></span>
           <span className="other_logo"><img src="/assets/media/team1.png" alt=""/></span>
          
          </a> 
          
          </div>
      <div className="white_bg">
        <div className="team_search" >
          <div className="searchbox">
            <h3>Search</h3>
            <input type="search" value="" placeholder="Search"/>
            <input type="submit" value=""/>
          </div>
          <div className="advance">
            <h3>Favourite</h3>
            <div className="custom-control custom-switch">
              <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
              <label className="custom-control-label" for="customSwitch1"></label>
            </div>
          </div>
        </div>
        
        <TeamFilter />

      </div>
    </div>
    	<RankingTable />
  </div>
</div>






<script src="/assets/plugins/global/plugins.bundle.js"/>
<script src="/assets/js/scripts.bundle.js"/>
<script src="/assets/plugins/global/plugins.bundle.js"/>
<script src="/assets/js/dash/jquery.mCustomScrollbar.js"/>
<script src="/assets/js/dash/slick.js"/>
<script src="/assets/js/dash/custom.js"/>



</div>

  )
}

export default Ranking
