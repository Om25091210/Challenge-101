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

const CreateTeam = ({ user }) => {
  const [image, setImage] = useState(null);
  const [state, setState] = useState({
    name: '',
    logoUrl: '/assets/media/team/game1.png',
    description: '',
    address: '',
    location: ''
  });

  const mutation = useMutation(
    async (formdata) =>
      await axios.post(`${baseURL}/api/arenas/create`, formdata, {
        headers: {
          Authorization: cookie.get('token'),
          'Content-Type': 'multipart/form-data'
        }
      })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      state.name === '' ||
      state.description === '' ||
      state.address === '' ||
      state.location === ''
    ) {
      toast.warning('Please enter all fields or check your inputs');
    } else {
      let formdata = new FormData();
      formdata.append('name', state.name);
      formdata.append('description', state.description);
      formdata.append('address', state.address);
      formdata.append('location', state.location);
      formdata.append('logoUrl', image);

      try {
        await mutation.mutateAsync(formdata);
        toast.success('Your Arena has been successfully created');
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
      <SignedHeader user={user} />
      <LeftNav user={user} />
      <div className="main_middle create_main_middle">
        <div className="white_bg">
          <div className="create_form_box">
            <div className="left_create_form">
              <img src="/assets/media/create_left_img.jpg" />

              <div className="create_heads">
                <h1>Create Arena</h1>
                <p>
                  Create Arena page and invite hundrends of gamers to
                  participate. Boost to increase the reach.
                </p>
              </div>
            </div>
            <div className="create_tournament">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Arena Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Arena name"
                      name="name"
                      onChange={handleChange}
                      value={state.name}
                    />
                    {state.name.length >= 41 && (
                      <h6>Arena name cannot be more then 40 characters</h6>
                    )}
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
                    {state.description.length >= 201 && (
                      <h6>Description cannot be more then 200 characters</h6>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address"
                      name="address"
                      onChange={handleChange}
                      value={state.address}
                    />
                    {state.address.length >= 61 && (
                      <h6>Address cannot be more then 60 characters</h6>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Location"
                      name="location"
                      onChange={handleChange}
                      value={state.location}
                    />
                    {state.location.length >= 71 && (
                      <h6>Location cannot be more then 70 characters</h6>
                    )}
                  </div>
                </>
                <button className={`btn rgtside`}>Create</button>
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

export default CreateTeam;
