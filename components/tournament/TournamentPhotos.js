import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import ImageDropzone from '@components/common/ImageDropzone';
import Moment from 'moment';

const TournamentPhotos = ({ user, tournament, isUser }) => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState();

  const photomutation = useMutation(async (formdata) => {
    await axios.put(`${baseURL}/api/uploads/uploadImages`, formdata, {
      headers: {
        Authorization: cookie.get('token'),
        'Content-Type': 'multipart/form-data'
      }
    });
  });

  function refreshPage() {
    setTimeout(function () {
      window.location.reload(false);
    }, 5000);
  }

  // console.log(images)
  const handlePhotosSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    for (const key of Object.keys(images)) {
      formdata.append('images', images[key]);
    }

    formdata.append('title', title);
    formdata.append('model', 'TOURNAMENT');
    formdata.append('id', tournament.tournament._id);
    try {
      await photomutation.mutateAsync(formdata);
      toast.success('Tournament images have been updated');
    } catch (err) {
      toast.error(
        err.response?.data?.msg || 'Please upload your tournament images again'
      );
    }
    refreshPage();
  };

  return (
    <div className="gallery_box">
      <form onSubmit={handlePhotosSubmit}>
        {isUser ? <ImageDropzone setImages={setImages} /> : null}

        <p></p>

        {images.length > 0 ? (
          <div className="upload_btn">
            <input
              type="text"
              placeholder="Add a Title"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <a href="#!" onClick={handlePhotosSubmit} className="btn">
              UPLOAD NOW{' '}
            </a>
          </div>
        ) : (
          ''
        )}

        <p></p>

        {tournament.tournament.imagesgallery.length > 0 ? (
          tournament.tournament.imagesgallery.map((imgg, idx) => (
            <div className="imagess_box" key={idx}>
              <div className="imagess">
                <ul>
                  <li>
                    {imgg.images.map((imag, idex) => (
                      <a
                        className="fancybox"
                        href={imag.path}
                        data-fancybox-group="idex"
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
                  {imgg.title}
                  <span className="update">
                    Updated:{' '}
                    {Moment(imgg.createdAt).format('MMMM, DD, YYYY hh:mm A')}
                  </span>
                </h2>
              </div>
            </div>
          ))
        ) : (
          <p>No Photo's Available</p>
        )}
      </form>
    </div>
  );
};

export default TournamentPhotos;
