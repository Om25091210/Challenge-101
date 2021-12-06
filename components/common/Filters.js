import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { useForm } from "react-hook-form";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import cookie from 'js-cookie';

const Filters = ({ftype}) => {


  const [data, setData] = useState(null);

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSelectFilter = (event) => {

    const filtered = event.target.value;

    if (!selectedFilters.includes(filtered)) {
      setSelectedFilters([...selectedFilters, filtered]);
    } else {
      setSelectedFilters(
        selectedFilters.filter((selFilter) => {
          return selFilter !== filtered;
        })
      );
    }

  };



  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseURL}/api/filters/${ftype}`);
      const newData = await response.json();
      setData(newData);
    };
    fetchData();
  }, []);

  console.log(data)




  console.log(selectedFilters);

if (data) {

	    return (


        <div className="team_filter">
          <div className="drop_downs">


           {  data.filter.metadata.map((filter,index) => (


            <div key={index} className="button-group">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> 
              <span className="drop_name">{filter.key}</span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">


             {filter.value.map((val,idx) => (

                <li key={idx}><a href="#" className="small" data-value={val} tabIndex={idx}>
                  <input type="checkbox" checked={selectedFilters.includes(val)} onChange={handleSelectFilter} id={val} value={val}/>
                  {val}</a></li>

            ) )}    


              </ul>
            </div>


            ) ) }

           <div className="button-group"> <span className="drop_name">Microphone</span>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="Microphone"/>
                <label className="custom-control-label" for="Microphone"></label>
              </div>
            </div>
            <div className="button-group"> <span className="drop_name">Verified</span>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="Verified"/>
                <label className="custom-control-label" for="Verified"></label>
              </div>
            </div>

          </div>

          <div className="filters"> <a href="#" className="close1">X</a>
            <h3>Filters</h3>
            <div className="filter_list"> <span className="filter1"> Games: Call of Duty <a href="#" className="close2">X</a></span> <span className="filter1"> Category: LAN <a href="#" className="close2">X</a></span> <span className="filter1"> Type: Pro <a href="#" className="close2">X</a></span> 


             {selectedFilters.map((val,idx) => (

            <span className="filter1"> {val} <a href="#" className="close2">X</a></span> 

              ) )} 

            </div>
          

           

          </div>

        </div>

)

}else {
    return null;
  }

}

export default Filters    
