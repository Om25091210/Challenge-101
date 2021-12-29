import { size } from 'lodash';
import { useEffect, useState } from 'react';

const more = { fontSize: '12px', color: '#000' };

const Badges = ({ Userdata }) => {
  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);

  return (
    <>
      <div className="badges">
        <h5>BADGES</h5>
        {Userdata.badges.map((bdg) => (
          <img src={bdg.image} alt="" />
        ))}
        <a href="javascript:void(0)" className="model_show_btn" style={more}>
          More...
        </a>

        <div className="common_model_box">
          <a href="javascript:void(0)" className="model_close">
            X
          </a>

          <div className="inner_model_box report_model">
            <h3>BADGES</h3>

            <ul>
              {Userdata.badges.map((bdg) => (
                <li>
                  {' '}
                  <img src={bdg.image} alt="" />{' '}
                </li>
              ))}
            </ul>
          </div>

          <div className="overlay"></div>
        </div>
      </div>
    </>
  );
};

export default Badges;
