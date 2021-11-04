
import PropTypes from 'prop-types';
import Head from 'next/head'

const RankingTable = (props) => (

    <div className="ranking_table">
      <div className="table">
        <div className="heads_row">
          <div className="heads">ranking</div>
          <div className="heads">team</div>
          <div className="heads">Points</div>
          <div className="heads">TOURNAMENTS </div>
          <div className="heads">MATCHES WON/LOSS</div>
          <div className="heads">win%</div>
          <div className="heads">form</div>
          <div className="heads">PRIZE MONEY</div>
        </div>
        <div className="row_box">
          <div className="cols_box">
            <div className="cols">1</div>
            <div className="cols">the werewolves </div>
            <div className="cols">1620</div>
            <div className="cols">80</div>
            <div className="cols">240/40</div>
            <div className="cols">80%</div>
            <div className="cols"> <span className="round green"></span> <span className="round green"></span> <span className="round red"></span> <span className="round red"></span> <span className="round green"></span> </div>
            <div className="cols">$45,000</div>
          </div>
          <div className="more_data">
            <div className="pic">
              <div className="tumb"><img src="/assets/media/1.jpg" alt=""/></div>
              <h3>ATE GAMING</h3>
            </div>
            <div className="total">
              <p>rS. 45,00,000</p>
              <p>TOTAL PRIZE POOL EARNED</p>
            </div>
            <div className="chart"><img src="/assets/media/ranking/chart.png" alt=""/></div>
            <div className="follows">
              <button>Follow</button>
              <div className="ate"> ATE <span className="circle"></span> 16-3 <span className="circle"></span> TWW </div>
            </div>
          </div>
        </div>


        <div className="row_box">
            <div className="cols_box">
              <div className="cols">2</div>
              <div className="cols">the werewolves </div>
              <div className="cols">1620</div>
              <div className="cols">80</div>
              <div className="cols">240/40</div>
              <div className="cols">80%</div>
              <div className="cols"> <span className="round green"></span> <span className="round green"></span> <span className="round red"></span> <span className="round red"></span> <span className="round green"></span> </div>
              <div className="cols">$45,000</div>
            </div>
            <div className="more_data">
              <div className="pic">
                <div className="tumb"><img src="/assets/media/1.jpg" alt=""/></div>
                <h3>ATE GAMING</h3>
              </div>
              <div className="total">
                <p>rS. 45,00,000</p>
                <p>TOTAL PRIZE POOL EARNED</p>
              </div>
              <div className="chart"><img src="/assets/media/ranking/chart.png" alt=""/></div>
              <div className="follows">
                <button>Follow</button>
                <div className="ate"> ATE <span className="circle"></span> 16-3 <span className="circle"></span> TWW </div>
              </div>
            </div>
          </div>


          <div className="row_box">
            <div className="cols_box">
              <div className="cols">3</div>
              <div className="cols">the werewolves </div>
              <div className="cols">1620</div>
              <div className="cols">80</div>
              <div className="cols">240/40</div>
              <div className="cols">80%</div>
              <div className="cols"> <span className="round green"></span> <span className="round green"></span> <span className="round red"></span> <span className="round red"></span> <span className="round green"></span> </div>
              <div className="cols">$45,000</div>
            </div>
            <div className="more_data">
              <div className="pic">
                <div className="tumb"><img src="/assets/media/1.jpg" alt=""/></div>
                <h3>ATE GAMING</h3>
              </div>
              <div className="total">
                <p>rS. 45,00,000</p>
                <p>TOTAL PRIZE POOL EARNED</p>
              </div>
              <div className="chart"><img src="/assets/media/ranking/chart.png" alt=""/></div>
              <div className="follows">
                <button>Follow</button>
                <div className="ate"> ATE <span className="circle"></span> 16-3 <span className="circle"></span> TWW </div>
              </div>
            </div>
          </div>
      </div>
    </div>



    );

export default RankingTable;
   