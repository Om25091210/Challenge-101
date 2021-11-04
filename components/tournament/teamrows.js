
 import PropTypes from 'prop-types';
import Head from 'next/head'

const TeamRows = (props) => (

<div>
  <div className="game_row"> <span className="star live"><i className="fa fa-star" aria-hidden="true"></i></span>
    <div className="game_pos"></div>
    <div className="right_game_details">
      <div className="top_game">
        <div className="date">
          <h3>MANILA MASTERS TORONTO</h3>
          09.OCT.2021</div>
        <div className="reg">
          <button className="active">LIVE</button>
        </div>
      </div>
      <div className="bottom_game">
        <div className="users"><img src="/assets/media/category/users.png" alt=""/></div>
        <div className="games">
          <h3>Games:</h3>
          <div className="game_logo"><img src="/assets/media/category/game1.png" alt=""/> COD 4,</div>
          <div className="game_logo"><img src="/assets/media/category/game2.png" alt=""/> DOTA 2,</div>
          <div className="game_logo"><img src="/assets/media/category/game3.png" alt=""/> CSGO</div>
        </div>
        <div className="prize">
          <h3>PRIZE POOL:</h3>
          Rs. 45,00,000</div>
      </div>
    </div>
  </div>

  <div className="game_row"> <span className="star"><i className="fa fa-star" aria-hidden="true"></i></span>
    <div className="game_pos"></div>
    <div className="right_game_details">
      <div className="top_game">
        <div className="date">
          <h3>MANILA MASTERS TORONTO</h3>
          09.OCT.2021</div>
        <div className="reg">
          <button>REGISTER</button>
        </div>
      </div>
      <div className="bottom_game">
        <div className="users"><img src="/assets/media/category/users.png" alt=""/></div>
        <div className="games">
          <h3>Games:</h3>
          <div className="game_logo"><img src="/assets/media/category/game1.png" alt=""/> COD 4,</div>
          <div className="game_logo"><img src="/assets/media/category/game2.png" alt=""/> DOTA 2,</div>
          <div className="game_logo"><img src="/assets/media/category/game3.png" alt=""/> CSGO</div>
        </div>
        <div className="prize">
          <h3>PRIZE POOL:</h3>
          Rs. 45,00,000</div>
      </div>
    </div>
  </div>

  <div className="game_row"> <span className="star"><i className="fa fa-star" aria-hidden="true"></i></span>
    <div className="game_pos"></div>
    <div className="right_game_details">
      <div className="top_game">
        <div className="date">
          <h3>MANILA MASTERS TORONTO</h3>
          09.OCT.2021</div>
        <div className="reg">
          <button>COMPLETED</button>
        </div>
      </div>
      <div className="bottom_game">
        <div className="users"><img src="/assets/media/category/users.png" alt=""/></div>
        <div className="games">
          <h3>Games:</h3>
          <div className="game_logo"><img src="/assets/media/category/game1.png" alt=""/> COD 4,</div>
          <div className="game_logo"><img src="/assets/media/category/game2.png" alt=""/> DOTA 2,</div>
          <div className="game_logo"><img src="/assets/media/category/game3.png" alt=""/> CSGO</div>
        </div>
        <div className="prize">
          <h3>PRIZE POOL:</h3>
          Rs. 45,00,000</div>
      </div>
    </div>
  </div>

</div>


    );

export default TeamRows;
