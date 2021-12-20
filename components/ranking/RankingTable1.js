import {MPNumberFormat} from '../../utils/helpers'
import { format } from 'date-fns';

const RankingTable = ({teamranking }) => {


   if (teamranking) {

  return (

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

             {!teamranking || teamranking.length === 0 ? (
              <div className="activity_tag">
               <span className="act_name">No teams are ranked yet ...</span>
               </div>
             ) : (
               teamranking.map((result) => (

                  <div className="row_box">
                    <div className="cols_box">
                      <div className="cols">{result.ranks ? (result.ranks[0] ? result.ranks[0].rank : 'Not Ranked' ) : 'Not Ranked'}</div>
                      <div className="cols">{result.team.name} </div>
                      <div className="cols">{result.ranks ? (result.ranks[0] ? result.ranks[0].points : 'Not Defined') : 'Not Defined'}</div>
                      <div className="cols">{result.tournament.length}</div>
                      <div className="cols">{result.ranks ? (result.ranks[0] ? result.ranks[0].won : 0): 0}/{result.ranks ? (result.ranks[0] ? result.ranks[0].loss : 0 ): 0}</div>
                      <div className="cols">{result.ranks ? (result.ranks[0] ? Math.round((result.ranks[0].won / result.ranks[0].loss) * 100) : 0) : 0}%</div>
                      <div className="cols"> <span className="round green"></span> <span className="round green"></span> <span className="round red"></span> <span className="round red"></span> <span className="round green"></span> </div>
                      <div className="cols">$45,000</div>
                    </div>
                    
                    
                    
                    {!result.tournament || result.tournament.length === 0 ? (
                    <div className="more_data">
                    <div className="activity_tag">
                     <span className="act_name">No TOURNAMENTS played yet by this team ...</span>
                     </div>
                     </div>
                   ) : (
                     result.tournament.map((tresult) => (
                    <div className="more_data">
                      <div className="pic">
                        <div className="tumb"><img src={tresult.imgUrl} alt=""/></div>
                        <h3>{tresult.name}</h3>
                      </div>
                      <div className="total">
                        <p><MPNumberFormat value={tresult.prizepool} currency={result.currency} /></p>
                        <p>TOTAL PRIZE POOL EARNED</p>
                      </div>
                      <div className="chart"><img src="/assets/media/ranking/chart.png" alt=""/></div>
                      <div className="follows">
                        <button>Follow</button>
                        <div className="ate"> {result.matches[0] ? result.matches[0].teams[0].teamName.substring(0,7) +'...' : 'Not Mentioned'} <span className="circle"></span> 16-3 <span className="circle"></span> {result.matches[0] ? result.matches[0].teams[1].teamName.substring(0,7) +'...' : 'Not Mentioned'} </div>
                      </div>
                            
                     </div>        
                       )

                    )

                    )}

                   
                  </div>

               )

            )

            )}


      </div>
    </div>


) } else {

                return null
               }
    }

export default RankingTable;
   