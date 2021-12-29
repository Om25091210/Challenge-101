import PropTypes from 'prop-types';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Photos = () => {
  return (
    <div className="gallery_box">
      <div className="imagess_box">
        <div className="imagess">
          <ul>
            <li>
              <a
                className="fancybox"
                href="/assets/media/gallery/1.jpg"
                data-fancybox-group="gallery"
                title="<p> test </p>"
              >
                <img src="/assets/media/gallery/1.jpg" alt="" />
              </a>
              <a
                className="fancybox"
                href="/assets/media/gallery/2.jpg"
                data-fancybox-group="gallery"
                title="2nd image"
              >
                <img src="/assets/media/gallery/2.jpg" alt="" />
              </a>

              <a
                className="fancybox"
                href="/assets/media/gallery/3.jpg"
                data-fancybox-group="gallery"
                title="3rd image"
              >
                <img src="/assets/media/gallery/3.jpg" alt="" />
              </a>
              <a
                className="fancybox"
                href="/assets/media/gallery/4.jpg"
                data-fancybox-group="gallery"
                title="4rt image"
              >
                <img src="/assets/media/gallery/4.jpg" alt="" />
              </a>
              <a
                className="fancybox"
                href="/assets/media/gallery/5.jpg"
                data-fancybox-group="gallery"
                title="fifth image"
              >
                <img src="/assets/media/gallery/5.jpg" alt="" />
              </a>
              <a
                className="fancybox"
                href="/assets/media/gallery/6.jpg"
                data-fancybox-group="gallery"
                title="Sixth image"
              >
                <img src="/assets/media/gallery/6.jpg" alt="" />
              </a>
            </li>
          </ul>
          <span className="total_images">+10</span>
        </div>
        <div className="bottom_data">
          <span className="img_icon">
            <i class="fa fa-picture-o" aria-hidden="true"></i>
          </span>
          <h2>
            New Xenowatch Characters
            <span className="update">Updated:March 12th, 2018</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Photos;
