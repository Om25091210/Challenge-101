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
  // console.log(images)
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

        <p></p>

        {images.length > 0 ? (
          <div className="upload_btn">
            <a
              href="javascript:void(0)"
              onClick={handlePhotosSubmit}
              className="btn"
            >
              UPLOAD NOW{' '}
            </a>
          </div>
        ) : (
          ''
        )}

        <p></p>

        {Userdata.profile.imagesgallery.map((imgg, idx) => (
          <div className="imagess_box" key={idx}>
            <div className="imagess">
              <ul>
                <li>
                  {imgg.images.map((imag, idex) => (
                    <a
                      className="fancybox"
                      href={imag.path}
                      data-fancybox-group="gallery"
                      title={imag.originalname}
                      key={idex}
                    >
                      <img src={imag.path} alt={imag.originalname} />{' '}
                      <span className="total_images">
                        +{imgg.images.length}
                      </span>
                    </a>
                  ))}
                </li>
              </ul>
            </div>
            <div className="bottom_data">
              <span className="img_icon">
                <i className="fa fa-picture-o" aria-hidden="true"></i>
              </span>

              <h2>
                Album Name
                <span className="update">Updated:{imgg.createdAt}</span>
              </h2>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default Photos;
