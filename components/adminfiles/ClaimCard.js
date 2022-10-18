import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import Approve from './Approve';
import Deny from './Deny';

const ClaimCard = ({ data }) => {
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, [trigger]);
  return (
    <>
      <li>
        {data && data.length === 0 ? (
          <p>No data</p>
        ) : (
          data.map((item) => (
            <>
              <div className="row1">
                <div className="card_img">
                  <div className="img">
                    <img
                      src={
                        item.brandId
                          ? item.brandId.logoUrl
                          : item.teamId
                          ? item.teamId.imgUrl
                          : item.tournamentId.imgUrl
                      }
                      alt={
                        item.brandId
                          ? item.brandId.name
                          : item.teamId
                          ? item.teamId.name
                          : item.tournamentId.name
                      }
                    />
                  </div>
                  <a
                    href={
                      item.brandId
                        ? `/brand/${item.brandId._id}`
                        : item.teamId
                        ? `/team/${item.teamId._id}`
                        : `/tournament/${item.tournamentId._id}`
                    }
                  >
                    {item.brandId
                      ? item.brandId.name
                      : item.teamId
                      ? item.teamId.name
                      : item.tournamentId.name}
                  </a>
                </div>
              </div>
              <div className="row1">
                <span>
                  <b>ApplyDate:</b>
                  {Moment(item.applyDate).format('DD MMM YYYY')}
                </span>

                <span>
                  <b>Proof Submitted:</b>
                  <i className="fa fa-check" aria-hidden="true"></i>
                </span>
              </div>
              <div className="row1">
                <div className="loc_box edit_pof">
                  <a
                    href="#!"
                    className="model_show_btn btn"
                    onClick={() => setTrigger(!trigger)}
                  >
                    View Proof
                  </a>
                  <div className="common_model_box edit_profile" id="big_poup">
                    <a href="#!" className="model_close">
                      X
                    </a>
                    <div className="inner_model_box">
                      <div className="add_job_height">
                        <h3>Proof</h3>
                        <div className="gallery_box">
                          {item.imageproof.map((imgg, idx) => (
                            <>
                              <div className="imagess_box" key={idx}>
                                <div className="imagess">
                                  <ul>
                                    <li>
                                      {imgg.images &&
                                        imgg.images.map((imag, idex) => (
                                          <a
                                            className="fancybox"
                                            href={imag.path}
                                            data-fancybox-group="idex"
                                            title={imag.originalname}
                                            key={idex}
                                          >
                                            <img
                                              src={imag.path}
                                              alt={imag.originalname}
                                            />{' '}
                                          </a>
                                        ))}
                                    </li>
                                  </ul>
                                </div>
                                <div className="bottom_data">
                                  <span className="img_icon">
                                    <i
                                      className="fa fa-picture-o"
                                      aria-hidden="true"
                                    ></i>
                                  </span>

                                  <h2>
                                    <span className="update">
                                      Updated:
                                      {Moment(imgg.createdAt).format(
                                        'MMMM, DD, YYYY hh:mm A'
                                      )}
                                    </span>
                                  </h2>
                                </div>
                              </div>
                              <h2>
                                Applied By: {item.user.name} - {item.user._id}
                              </h2>
                              <Deny
                                user={item.user}
                                Id={
                                  item.brandId
                                    ? item.brandId._id
                                    : item.teamId
                                    ? item.teamId._id
                                    : item.tournamentId._id
                                }
                                type={
                                  item.brandId
                                    ? 'Brands'
                                    : item.teamId
                                    ? 'Teams'
                                    : 'Tournaments'
                                }
                              />
                              <Approve
                                user={item.user}
                                Id={
                                  item.brandId
                                    ? item.brandId._id
                                    : item.teamId
                                    ? item.teamId._id
                                    : item.tournamentId._id
                                }
                                type={
                                  item.brandId
                                    ? 'Brands'
                                    : item.teamId
                                    ? 'Teams'
                                    : 'Tournaments'
                                }
                              />
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="overlay"></div>
                  </div>
                </div>
              </div>
            </>
          ))
        )}
      </li>
    </>
  );
};

export default ClaimCard;
