import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import cookie from 'js-cookie';

const TeamAbout = ({ data }) => {
  return (
    <div className="tab hide" id="about">
      <div className="our_team">
        <div className="about_team">
          <div className="about">
            <h2>OUR TEAM</h2>
            <p>{data.about.description}</p>
          </div>

          {data.about.contacts.map((itm, index) => (
            <div className="team_mails" key={index}>
              <h3>
                <i className="fa fa-life-ring" aria-hidden="true"></i>{' '}
                {itm.emailname}
              </h3>
              <a href="#">{itm.emailaddress}</a>{' '}
            </div>
          ))}
        </div>
        <div className="team_member">
          <ul>
            {!data.employees || data.employees.length === 0 ? (
              <li>
                <div className="dp">No employees defined..</div>
              </li>
            ) : (
              data.employees.map((emp, idx) => (
                <li key={idx}>
                  <div className="dp">
                    {' '}
                    <img src={emp.profilePicUrl} alt="" />{' '}
                  </div>
                  <h3>{emp.role.toUpperCase()}</h3>
                  <h4>{emp.name} </h4>
                </li>
              ))
            )}

            <li>
              <div className="dp">
                {' '}
                <img src="/assets/media/user.png" alt="" />{' '}
              </div>
              <h3>PHYHOLOGIST</h3>
              <h4>Evan Miles</h4>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamAbout;
