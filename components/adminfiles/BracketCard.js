import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { toast } from 'react-toastify';

const BracketCard = ({ tournaments, user }) => {
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, [trigger]);

  const handleShuffleMatches = async (tourId) => {
    try {
      axios
        .get(`${baseURL}/api/tournaments/shuffle/matches/${tourId}`)
        .then((res) => console.log(res.data));
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };
  return (
    <>
      {tournaments && tournaments.length === 0 ? (
        <p>No data</p>
      ) : (
        tournaments.map((tour) => (
          <li>
            <div className="row1">
              <div className="card_img">
                <div className="img">
                  <img
                    src={tour.tour ? tour.tour.imgUrl : null}
                    alt={tour.tour ? tour.tour.name : null}
                  />
                </div>
                <a href={`/tour/${tour.tour?.name}`}>
                  {tour.tour ? tour.tour.name : null}
                </a>
              </div>
            </div>
            <div className="row1">
              <span>
                <b>ApplyDate:</b>
                {/* {Moment(tour.applyDate).format('DD MMM YYYY')} */}
              </span>

              <span>
                <b>PlayType</b>
                <p>{tour.tour ? tour.tour.playType : null}</p>
              </span>
            </div>
            <div className="row1">
              <div className="loc_box edit_pof">
                <a
                  href="#!"
                  className="model_show_btn btn"
                  onClick={() => setTrigger(!trigger)}
                >
                  View Match Details
                </a>
                <div className="common_model_box edit_profile" id="big_poup">
                  <a href="#!" className="model_close">
                    X
                  </a>
                  <div className="inner_model_box">
                    <div className="add_job_height">
                      <h3>{tour.tour ? tour.tour.name : null} Matches</h3>
                      <button
                        className="btn"
                        style={{ marginBottom: '10px' }}
                        onClick={() => handleShuffleMatches(tour?.tour._id)}
                      >
                        Shuffle Seeds
                      </button>
                      <div className="next_matches">
                        <div className="stats_table">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Opponent 1</th>
                                <th>V</th>
                                <th>Opponent 2</th>
                                <th>Instance</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Score</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {tour.matches &&
                                tour.matches.map((match, index) => {
                                  return (
                                    <>
                                      <tr key={index}>
                                        <td>
                                          {match.participants[0]?.isByes ===
                                          true
                                            ? 'Byes'
                                            : '---'}
                                        </td>
                                        <td>V</td>
                                        <td>
                                          {match.participants[1]?.isByes ===
                                          true
                                            ? 'Byes'
                                            : '---'}
                                        </td>
                                        <td>{match.instance}</td>
                                        <td>
                                          {match.startDate
                                            ? Moment(match.startDate).format(
                                                'DD-MM-YYYY'
                                              )
                                            : '---'}
                                        </td>
                                        <td>
                                          {match.startDate
                                            ? Moment(match.startDate).format(
                                                'h:m'
                                              )
                                            : '---'}
                                        </td>
                                        <td>
                                          {match.results[0]
                                            ? match.results[0]
                                            : 0}{' '}
                                          -{' '}
                                          {match.results[1]
                                            ? match.results[1]
                                            : 0}
                                        </td>
                                        <td>
                                          <button className="btn">
                                            Add Details
                                          </button>
                                        </td>
                                      </tr>
                                    </>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overlay"></div>
              </div>
            </div>
          </li>
        ))
      )}
    </>
  );
};

export default BracketCard;
