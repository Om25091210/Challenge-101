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

const CreateBrand = ({ user }) => {
  const [image, setImage] = useState(null);
  const [state, setState] = useState({
    name: '',
    logoUrl: '/assets/media/discover/lxg.png',
    description: '',
    socialLinks: ''
  });

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
    let formdata = new FormData();
    formdata.append('name', state.name);
    formdata.append('description', state.description);
    formdata.append('socialLinks', state.socialLinks);
    formdata.append('logoUrl', image);

    try {
      await mutation.mutateAsync(formdata);
      toast.success('Your Brand has been successfully created');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  return (
    <>
      <MetaDash />
      <SignedHeader user={user} />
      <LeftNav user={user} />
      <div className="main_middle create_main_middle">
        <div className="white_bg">
          <div className="left_create_form">
            <h1>Left create Brand</h1>
          </div>
          <div className="create_tournament">
            <h1>Create Brand</h1>
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
                  <label htmlFor="exampleFormControlInput1">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                    value={state.description}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">SocialLinks</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Link"
                    name="socialLinks"
                    onChange={handleChange}
                    value={state.socialLinks}
                  />
                </div>
              </>
              <button className={`btn rgtside`}>Continue</button>
            </form>
          </div>
        </div>
      </div>
      <AllScript />
      <script></script>
    </>
  );
};

export default CreateBrand;
