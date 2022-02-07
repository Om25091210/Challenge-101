import Head from 'next/head';
import Image from 'next/image';
import Meta from '@components/Meta';
import FooterMain from '@components/FooterMain';
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import valid from '@utils/valid';
import Router from 'next/router';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';

const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
let cancel;

const Signup = () => {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone_number: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [username, setUsername] = useState('');
  const [avatars, setAvatars] = useState([]);

  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const [open, setOpen] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const { firstname, lastname, email, password, phone_number } = user;

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //await registerUser(user, setError, setFormLoading, toast, setStatus);

    const errMsg = valid(firstname, lastname, email, password);
    console.log(errMsg);

    if (errMsg) {
      toast.info(errMsg);
      return dispatch({ type: 'NOTIFY', payload: { error: errMsg } });
    }

    dispatch({ type: 'NOTIFY', payload: { loading: true } });

    setFormLoading(true);
    console.log('calling handle post ....');

    try {
      var name = firstname + ' ' + lastname;
      console.log(name);
      const res = await axios.post(`${baseURL}/api/signup`, {
        name,
        username,
        email,
        password,
        phone_number
      });
      console.log(res);

      dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
      toast.info(res.data.msg);
      Router.push(`/verify`);
    } catch (error) {
      toast.error(
        'Oops! Sorry we cannot register at this time. Please try later.'
      );
    }
    setFormLoading(false);
  };

  useEffect(() => {
    axios.get(`${baseURL}/api/avatar`).then((res) => setAvatars(res.data));
  }, []);

  const checkUsername = async () => {
    setUsernameLoading(true);
    try {
      cancel && cancel();
      const CancelToken = axios.CancelToken;
      const res = await axios.get(`${baseURL}/api/signup/${username}`, {
        cancelToken: new CancelToken((canceler) => {
          cancel = canceler;
        })
      });
      if (error !== null) setError(null);
      if (res.data.msg === 'Username available') {
        setUsernameAvailable(true);
        setUser((prevState) => ({ ...prevState, username }));
      }
    } catch (err) {
      setUsernameAvailable(false);
      setError('Username not available');
    }
    setUsernameLoading(false);
  };

  useEffect(() => {
    const isUser = Object.values({
      firstname,
      lastname,
      email,
      password,
      phone_number
    }).every((item) => Boolean(item));
    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  useEffect(() => {
    username === '' ? setUsernameAvailable(false) : checkUsername();
  }, [username]);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
    setOpen(!open);
  };

  const [step1, setStep1] = useState(true);
  const [showbtn, setShowbtn] = useState(true);
  const showstep2 = () => {
    setStep1(false);
    setShowbtn(false);
  };

  const showstep1 = () => {
    setStep1(true);
    setShowbtn(true);
  };

  return (
    <main id="kt_body" className="bg-body">
      <Meta />
      <div className="singup_page_box">
        {step1 ? (
          <>
            <div className="left_banner">
              <span className="logo">
                {' '}
                <img src="/assets/media/login/logo.png" alt="" />
              </span>

              <h1>
                A true Esports <br />
                platform that brings <br />
                all of Esports ecosystem <br />
                in one place.
              </h1>

              <span className="props1 props">
                {' '}
                <img src="/assets/media/login/1.png" alt="" />
              </span>
              <span className="props2 props">
                {' '}
                <img src="/assets/media/login/2.png" alt="" />
              </span>
              <span className="props3 props">
                {' '}
                <img src="/assets/media/login/3.png" alt="" />
              </span>
              <span className="props4 props">
                {' '}
                <img src="/assets/media/login/4.png" alt="" />
              </span>
              <span className="props5 props">
                {' '}
                <img src="/assets/media/login/5.png" alt="" />
              </span>
              <span className="props6 props">
                {' '}
                <img src="/assets/media/login/6.png" alt="" />
              </span>
              <span className="props7 props">
                {' '}
                <img src="/assets/media/login/7.png" alt="" />
              </span>
              <span className="props8 props">
                {' '}
                <img src="/assets/media/login/8.png" alt="" />
              </span>
              <span className="props9 props">
                {' '}
                <img src="/assets/media/login/9.png" alt="" />
              </span>
            </div>
            <div className="right_form">
              <div className="d-flex flex-center flex-column flex-column-fluid">
                <h2>Create an Account</h2>
                <div className="form_box">
                  <form
                    className="form w-100"
                    noValidate="novalidate"
                    id="kt_sign_up_form"
                    onSubmit={handleSubmit}
                  >
                    <input type="hidden" name="remember" value="true" />
                    <div className="fv-row mb-7">
                      <label className="form-label"> Email </label>
                      <input
                        className="form-control form-control-lg form-control-solid"
                        type="email"
                        placeholder=""
                        name="email"
                        value={email}
                        onChange={handleChange}
                        autoComplete="off"
                      />
                    </div>
                    <div className="row fv-row mb-7">
                      <div className="col-xl-6">
                        <label className="form-label"> First Name </label>
                        <input
                          className="form-control form-control-lg form-control-solid"
                          type="text"
                          placeholder=""
                          name="firstname"
                          minLength="4"
                          maxLength="18"
                          size="10"
                          value={firstname}
                          onChange={handleChange}
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-xl-6">
                        <label className="form-label">Last Name </label>
                        <input
                          className="form-control form-control-lg form-control-solid"
                          type="text"
                          placeholder=""
                          name="firstname"
                          minLength="4"
                          maxLength="18"
                          size="10"
                          name="lastname"
                          value={lastname}
                          onChange={handleChange}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="fv-row mb-7">
                      <label className="form-label"> Phone Number </label>
                      <input
                        className="form-control form-control-lg form-control-solid"
                        type="text"
                        placeholder=""
                        name="text"
                        value={phone_number}
                        onChange={handleChange}
                        autoComplete="off"
                      />
                    </div>
                    <div className="fv-row mb-7">
                      <label className="form-label"> Username </label>
                      <input
                        className="form-control form-control-lg form-control-solid ${
                    username !== '' && !usernameAvailable ? 'bg-red-100' : ''
                  }"
                        type="text"
                        placeholder="something_legendary"
                        name="username"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          if (usernameRegex.test(e.target.value)) {
                            setUsernameAvailable(true);
                          } else {
                            setUsernameAvailable(false);
                          }
                        }}
                        autoComplete="off"
                      />
                      {username !== '' &&
                        !usernameLoading &&
                        !usernameAvailable && (
                          <small className="text-xs text-red-600">
                            {' '}
                            This username is invalid or not available{' '}
                          </small>
                        )}{' '}
                    </div>
                    <div className="mb-10 fv-row" data-kt-password-meter="true">
                      <div className="mb-1">
                        <label className="form-label">Password </label>
                        <div className="position-relative mb-3">
                          <input
                            className="form-control input form-control-lg form-control-solid"
                            type={passwordShown ? 'text' : 'password'}
                            placeholder=""
                            name="password"
                            value={password}
                            onChange={handleChange}
                            autoComplete="off"
                            id="password"
                            aria-label="password"
                          />
                          <span
                            className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                            data-kt-password-meter-control="visibility"
                          >
                            {' '}
                            {/* <i class="bi bi-eye-slash"  id="togglePassword"></i> */}{' '}
                            <i
                              className={`bi  ${
                                open ? 'bi-eye' : 'bi-eye-slash'
                              }`}
                              onClick={togglePassword}
                            ></i>{' '}
                          </span>{' '}
                        </div>
                        <div
                          className="d-flex align-items-center mb-3"
                          data-kt-password-meter-control="highlight"
                        >
                          <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                          <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                          <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                          <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
                        </div>
                      </div>
                      <div className="text-muted">
                        {' '}
                        Use 8 or more characters with a mix of letters, numbers
                        &amp; symbols.{' '}
                      </div>
                    </div>
                    <div className="fv-row mb-10">
                      <label className="form-check form-check-custom form-check-solid form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="toc"
                          value="1"
                        />
                        <span className="form-check-label terms">
                          {' '}
                          By creating an account, you agree to exports Charts
                          <a href="#">Terms of use</a> &{' '}
                          <a href="#">Privacy Policy.</a>{' '}
                        </span>{' '}
                      </label>
                    </div>
                    <div className="text-center">
                      {/* <button
                    type="submit"
                    id="kt_sign_up_submit"
                    className="btn"
                    disabled={submitDisabled || !usernameAvailable}
                  >
                    {' '}
                    <span className="indicator-label">Create Account</span>{' '}
                    <span className="indicator-progress">
                      {' '}
                      Please wait...{' '}
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>{' '}
                    </span>{' '}
                  </button> */}

                      <button
                        className={`btn rgtside ${showbtn ? '' : 'd-none'}`}
                        onClick={showstep2}
                      >
                        Continue
                      </button>
                    </div>
                    <div className="d-flex align-items-center mt-5 mb-5">
                      <div className="border-bottom border-gray-300 mw-50 w-100"></div>
                      <span className="fw-bold text-gray-400 fs-7 mx-2">
                        OR
                      </span>
                      <div className="border-bottom border-gray-300 mw-50 w-100"></div>
                    </div>

                    <h4>Sign up with</h4>

                    <div className="singup_icons">
                      <a href="#">
                        {' '}
                        <i class="fa fa-google" aria-hidden="true"></i>
                      </a>
                      <a href="#">
                        <i class="fa fa-facebook" aria-hidden="true"></i>
                      </a>
                      <a href="#">
                        {' '}
                        <i class="fa fa-twitch" aria-hidden="true"></i>
                      </a>
                      <a href="#">
                        {' '}
                        <i class="fa fa-steam" aria-hidden="true"></i>
                      </a>
                      <a href="#">
                        {' '}
                        <i class="fa fa-steam" aria-hidden="true"></i>
                      </a>
                    </div>

                    <div className="mb-10 text-center">
                      <div className="text-gray-400 already">
                        {' '}
                        Already have an account?{' '}
                        <a className="link-primary fw-bolder" href="/login">
                          {' '}
                          Sign in{' '}
                        </a>{' '}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="game_sect">
              <div className="left_game">
                <img src="/assets/media/login/left_game.jpg" alt="" />
              </div>

              <div className="right_game_form">
                <h2>Put your game face on</h2>
                <h4>Upload a picture or choose on avatar</h4>

                <div className="gamer_photo">
                  <div className="gamer_dp">
                    <img src="/assets/media/login/user.png" alt="" />
                  </div>
                  <ul>
                    <li className="uploads">
                      <div className="style_file_upload">
                        <input
                          type="file"
                          name="coverPhoto"
                          id="coverPhoto"
                          className="custom-file-input"
                          onChange={(e) => {
                            setCoverPic(e.target.files[0]);
                            handleCoverSubmit(e);
                          }}
                        />
                        <label htmlFor="coverPhoto">
                          <span>
                            {' '}
                            <i
                              className="fa fa-camera"
                              aria-hidden="true"
                            ></i>{' '}
                            Upload
                          </span>
                        </label>
                      </div>
                    </li>
                    {avatars.map((avatar) => (
                      <li>
                        <img src={avatar.image} alt={avatar.title} />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pick_game">
                  <h2>Games</h2>
                  <ul>
                    <li>
                      <img src="/assets/media/login/pick1.jpg" alt="" />

                      <div className="hovers">
                        <span>
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </span>
                        <input type="text" value="" />
                      </div>
                    </li>
                    <li>
                      <img src="/assets/media/login/pick2.jpg" alt="" />
                    </li>
                    <li>
                      <img src="/assets/media/login/pick3.jpg" alt="" />
                    </li>
                    <li>
                      <img src="/assets/media/login/pick1.jpg" alt="" />
                    </li>
                  </ul>
                </div>

                <div className="fv-row mb-7">
                  <label className="form-label"> Select Country </label>
                  <select class="form-control">
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antartica">Antarctica</option>
                    <option value="Antigua and Barbuda">
                      Antigua and Barbuda
                    </option>
                  </select>
                </div>

                <div className="two_btn">
                  <button
                    onClick={showstep1}
                    className={`btn3 btn rgtside ${showbtn ? 'd-none' : ''}`}
                  >
                    Back
                  </button>{' '}
                  <button
                    type="submit"
                    id="kt_sign_up_submit"
                    className="btn"
                    disabled={submitDisabled || !usernameAvailable}
                  >
                    {' '}
                    <span className="indicator-label">Finish</span>{' '}
                    <span className="indicator-progress">
                      {' '}
                      Please wait...{' '}
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>{' '}
                    </span>{' '}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Signup;
