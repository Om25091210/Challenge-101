import ReactTooltip from 'react-tooltip';
import { useEffect, useState } from 'react';

const ReportsComments = () => {
  useEffect(() => {
    $('a.report_link').click(function () {
      $(this).next().addClass('show_report_poup');
    });

    $('a.close_rep_box').click(function () {
      $(this).parent().removeClass('show_report_poup');
    });
  }, []);

  return (
    <>
      <a href="javascript:void(0)" className="report_link">
        <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
      </a>

      <div className="comment_rep_poup">
        <a href="javascript:void(0)" className="close_rep_box">
          X
        </a>

        <div className="report_list">
          <h3>Report</h3>

          <ul>
            <li>
              <a href="#">Violence</a>
            </li>
            <li>
              <a href="#">Harassment</a>
            </li>
            <li>
              <a href="#">Self-Injury</a>
            </li>
            <li>
              <a href="#">False Information</a>
            </li>
            <li>
              <a href="#">Spam</a>
            </li>
            <li>
              <a href="#">Hate Speech</a>
            </li>
            <li>
              <a href="#">Other</a>
            </li>
          </ul>
        </div>

        <div className="overlay"></div>
      </div>
    </>
  );
};

export default ReportsComments;
