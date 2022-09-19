import { useState } from 'react';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';
import baseURL from '@utils/baseURL';
import axios from 'axios';
import 'rc-time-picker/assets/index.css';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { brandfromvalidate } from '@utils/valid';

const CreateBrand = ({ user, profile }) => {
  const [image, setImage] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [state, setState] = useState({
    name: '',
    logoUrl: '/assets/media/discover/lxg.png',
    description: '',
    facebook: '',
    twitch: '',
    website: '',
    instagram: '',
    youtube: '',
    discord: ''
  });

  const router = useRouter();

  const mutation = useMutation(
    async (formdata) =>
      await axios.post(`${baseURL}/api/brand/create`, formdata, {
        headers: {
          Authorization: cookie.get('token'),
          'Content-Type': 'multipart/form-data'
        }
      })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      let formdata = new FormData();
      formdata.append('name', state.name);
      formdata.append('description', state.description);
      formdata.append('facebook', state.facebook);
      formdata.append('twitch', state.twitch);
      formdata.append('website', state.website);
      formdata.append('instagram', state.instagram);
      formdata.append('youtube', state.youtube);
      formdata.append('discord', state.discord);
      formdata.append('logoUrl', image);

      try {
        await mutation.mutateAsync(formdata);
        toast.success('Your Brand has been successfully created');
        router.push('/dashboard');
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
    }
  };

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  return (
    <>
      <MetaDash />
      <SignedHeader user={user} profile={profile} />
      <LeftNav user={user} />
      <div className="main_middle create_main_middle">
        <div className="white_bg">
          <div className="create_form_box">
            <div className="left_create_form">
              <img src="/assets/media/create_left_img.jpg" />

              <div className="create_heads">
                <h1>Create Brand</h1>
                <p>
                  Create Brand page and invite hundrends of gamers to
                  participate. Boost to increase the reach.
                </p>
              </div>
            </div>
            <div className="create_tournament">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Brand Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Brand name"
                      name="name"
                      onChange={handleChange}
                      value={state.name}
                    />
                    {state.name.length > 15 && (
                      <h6>Brand name cannot be more then 15 characters</h6>
                    )}
                    <p>{formErrors.name}</p>
                  </div>
                  <div className="form-group">
                    <div className="style_file_upload">
                      <input
                        type="file"
                        name="logoUrl"
                        id="logoUrl"
                        className="inputfile"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                      <label for="logoUrl">
                        <span>Upload Logo</span>
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Description"
                      name="description"
                      onChange={handleChange}
                      value={state.description}
                    />
                    <p>{formErrors.description}</p>
                  </div>
                  <div className="colm full_width">
                    <label htmlFor="exampleFormControlInput1">
                      Social Links (Optional)
                    </label>
                    <ul className="socail_url">
                      <li>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your Facebook user ID as per the URL"
                          name="facebook"
                          onChange={handleChange}
                          value={state.facebook}
                        />
                      </li>
                      <li>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your Twitch Channel name as per the URL"
                          name="twitch"
                          onChange={handleChange}
                          value={state.twitch}
                        />
                      </li>
                      <li>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter @Twitter Name"
                          name="twitter"
                          onChange={handleChange}
                          value={state.twitter}
                        />
                      </li>
                      <li>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your Instagram User Name"
                          name="instagram"
                          onChange={handleChange}
                          value={state.instagram}
                        />
                      </li>
                      <li>
                        {' '}
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your Youtube Channel Name as per the URL"
                          name="youtube"
                          onChange={handleChange}
                          value={state.youtube}
                        />
                      </li>
                      <li>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your full Discord server link"
                          name="discord"
                          onChange={handleChange}
                          value={state.discord}
                        />
                      </li>
                    </ul>
                  </div>
                </>
                <input
                  type="submit"
                  className="btn"
                  value="Create Brand"
                  onClick={() => setFormErrors(brandfromvalidate(state))}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <AllScript />
      <script></script>
    </>
  );
};

export default CreateBrand;
