import Head from 'next/head';
import Image from 'next/image';
import Meta from '@components/Meta';
import FooterMain from '@components/FooterMain';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import {
  LockClosedIcon,
  MailIcon,
  DotsCircleHorizontalIcon,
  UserCircleIcon,
  EyeIcon,
  EyeOffIcon,
  CheckIcon,
  XIcon
} from '@heroicons/react/outline';

import { registerUser } from '@utils/auth';

const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
let cancel;

const Signup = () => {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('confirm');

  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const { firstname, lastname, email, password } = user;

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(user, setError, setFormLoading, toast, setStatus);
  };

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
      password
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

  return (
    <main id="kt_body" className="bg-body">
      <Meta />

      <div className="d-flex flex-column flex-root">
        <div
          className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
          style={{ backgroundImage: 'url(/assets/media/illustrations/14.png)' }}
        >
          <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
            <a href="#" className="mb-12">
              <img
                alt="Logo"
                src="/assets/media/logos/logo.png"
                className="h-40px"
              />
            </a>

            <div className="w-lg-600px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
              <form
                className="form w-100"
                noValidate="novalidate"
                id="kt_sign_up_form"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="remember" value="true" />

                <div className="mb-10 text-center">
                  <h1 className="text-dark mb-3">Create an Account</h1>
                  <div className="text-gray-400 fw-bold fs-4">
                    Already have an account?
                    <a className="link-primary fw-bolder" href="/login">
                      Sign in here
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-light-primary fw-bolder w-100 mb-10"
                >
                  <img
                    alt="Logo"
                    src="/assets/media/svg/brand-logos/google-icon.svg"
                    className="h-20px me-3"
                  />
                  Sign in with Google
                </button>
                <div className="d-flex align-items-center mb-10">
                  <div className="border-bottom border-gray-300 mw-50 w-100"></div>
                  <span className="fw-bold text-gray-400 fs-7 mx-2">OR</span>
                  <div className="border-bottom border-gray-300 mw-50 w-100"></div>
                </div>
                <div className="row fv-row mb-7">
                  <div className="col-xl-6">
                    <label className="form-label fw-bolder text-dark fs-6">
                      First Name
                    </label>
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
                    <label className="form-label fw-bolder text-dark fs-6">
                      Last Name
                    </label>
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
                  <label className="form-label fw-bolder text-dark fs-6">
                    Username
                  </label>

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
                        This username is invalid or not available
                      </small>
                    )}
                </div>
                <div className="fv-row mb-7">
                  <label className="form-label fw-bolder text-dark fs-6">
                    Email
                  </label>
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
                <div className="mb-10 fv-row" data-kt-password-meter="true">
                  <div className="mb-1">
                    <label className="form-label fw-bolder text-dark fs-6">
                      Password
                    </label>
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
                        {/* <i class="bi bi-eye-slash"  id="togglePassword"></i> */}
                        <i
                          className={`bi  ${open ? 'bi-eye' : 'bi-eye-slash'}`}
                          onClick={togglePassword}
                        ></i>
                      </span>
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
                    Use 8 or more characters with a mix of letters, numbers
                    &amp; symbols.
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
                    <span className="form-check-label fw-bold text-gray-700 fs-6">
                      I Agree
                      <a href="#" className="ms-1 link-primary">
                        Terms and conditions
                      </a>
                      .
                    </span>
                  </label>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    id="kt_sign_up_submit"
                    className="btn btn-lg btn-primary"
                    disabled={submitDisabled || !usernameAvailable}
                  >
                    <span className="indicator-label">Submit</span>
                    <span className="indicator-progress">
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <FooterMain> </FooterMain>
        </div>
      </div>
    </main>
  );
};

export default Signup;
