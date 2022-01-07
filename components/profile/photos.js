
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import ImageDropzone from '@components/common/ImageDropzone';

const Photos = ({ Userdata }) => {

  const [images, setImages] = useState([]);

  const photomutation = useMutation(async (formdata) => {
    await axios.put(`${baseURL}/api/uploads/uploadImages`, formdata, {
      headers: {
        Authorization: cookie.get('token'),
        'Content-Type': 'multipart/form-data'
      }
    });
  });

  const handlePhotosSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    for (const key of Object.keys(images)) {
      formdata.append('images', images[key]);
    }

    try {
      await photomutation.mutateAsync(formdata);

      toast.success('User images have been updated');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please upload your images again');
    }
  };



  return (
    <div className="gallery_box">

    <form onSubmit={handlePhotosSubmit}>

      <ImageDropzone setImages={setImages} />

      <div className="imagess_box">
        <div className="imagess">

        {images.length > 0 ? (

        <a href="#!" onClick={handlePhotosSubmit} className="btn btn_width">
          UPLOAD NOW{' '}
        </a>
         ) : ''  }

          <ul>

           <li>
              {Userdata.profile.imagesgallery.map((imgg, idx) => (

               
                  <a
                    className="fancybox"
                    href={imgg.path}
                    data-fancybox-group="gallery"
                    title="<p> test </p>"
                  >
                    <img src={imgg.path} alt={imgg.originalname} />
                  </a>

               
                ))

              }

               </li>


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
            <i className="fa fa-picture-o" aria-hidden="true"></i>
          </span>
          <h2>
            New Xenowatch Characters
            <span className="update">Updated:March 12th, 2018</span>
          </h2>
        </div>
      </div>

    </form>

    </div>
  );
};

export default Photos;
