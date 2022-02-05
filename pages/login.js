import Head from 'next/head';
import Meta from '@components/Meta';
import FooterMain from '@components/FooterMain';
import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { DataContext } from '@store/GlobalState';
import { postData } from '@utils/fetchData';
import Cookie from 'js-cookie';
import baseURL from '@utils/baseURL';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';

const SignIn = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const { email, password } = user;

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    dispatch({ type: 'NOTIFY', payload: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: 'NOTIFY', payload: { loading: true } });

      const respa = await axios.post(`${baseURL}/api/auth`, user);
      const res = respa.data;

      if (res.err)
        return dispatch({ type: 'NOTIFY', payload: { error: res.err } });

      dispatch({ type: 'NOTIFY', payload: { success: res.msg } });

      dispatch({
        type: 'AUTH',
        payload: {
          token: res.access_token,
          user: res.user
        }
      });

      cookie.set('refreshtoken', res.refresh_token, {
        path: 'api/auth/accessToken'
      });

      localStorage.setItem('firstLogin', true);
      setToken(res.token);
      //toast.info('Welcome back...' + res.user.name);
    } catch (error) {
      toast.info('Sorry! Please verify your login credentials and try again.');
    }
  };

  const setToken = (token) => {
    cookie.set('token', token);
  };

  useEffect(() => {
    const isUser = Object.values({ email, password }).every((item) =>
      Boolean(item)
    );
    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push('/dashboard');
  }, [auth]);

  return (
    <main id="kt_body" className="bg-body">
      <Meta />

      <div className="singup_page_box">
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
            <h2>Log In</h2>
            <div className="form_box">
              <form
                className="form w-100"
                noValidate="noValidate"
                id="kt_sign_in_form"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="remember" value="true" />

                <div className="fv-row mb-10">
                  <label className="form-label mb-10">Email</label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="fv-row mb-10">
                  <div className="d-flex flex-stack mb-2">
                    <label className="form-label">Password</label>
                    <a
                      href="/user/forgotpassword"
                      className="link-primary fs-6 fw-bolder"
                    >
                      Forgot Password ?
                    </a>
                  </div>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    id="kt_sign_in_submit"
                    className="btn mt-5 btn-lg btn-primary w-100 mb-5"
                  >
                    <span className="indicator-label">Log In</span>
                    <span className="indicator-progress">
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>

                  <div className="d-flex align-items-center mt-5 mb-5">
                    <div className="border-bottom border-gray-300 mw-50 w-100"></div>
                    <span className="fw-bold text-gray-400 fs-7 mx-2">OR</span>
                    <div className="border-bottom border-gray-300 mw-50 w-100"></div>
                  </div>

                  <h4>Log in with</h4>

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
                      Don't have an account?
                      <a className="link-primary fw-bolder" href="/signup">
                        {' '}
                        Sign Up{' '}
                      </a>{' '}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
