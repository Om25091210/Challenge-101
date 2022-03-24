import React, { useState, useEffect } from 'react';
import { onboardUser } from '@utils/auth';
import { toast } from 'react-toastify';

const VerifyToken = ({ verificationToken, finishsubmit }) => {
  console.log(finishsubmit);
  const [user, setUser] = useState({
    code: ''
  });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmitToken = async (e) => {
    e.preventDefault();
    if (verificationToken === user.code) {
      await onboardUser(verificationToken, setLoading, toast);
    } else {
      toast.error('Invalid Code!');
    }
  };

  useEffect(() => {
    $('button.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);

  return (
    <>
      <button
        type="submit"
        id="kt_sign_up_submit"
        className="model_show_btn"
        disabled={finishsubmit}
      >
        {' '}
        <span className="indicator-label">Finish</span>{' '}
        <span className="indicator-progress">
          {' '}
          Please wait...{' '}
          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>{' '}
        </span>{' '}
      </button>

      <div className="common_model_box">
        <a href="#!" className="model_close">
          X
        </a>

        <div className="inner_model_box">
          <div className="d-flex flex-column flex-column-fluid text-center p-10 py-lg-15">
            <a href="#" className="mb-12">
              <img
                alt="Logo"
                src="/assets/media/logos/logo.png"
                className="h-40px"
              />
            </a>
            <div className="pt-lg-10 mb-10">
              <h1 className="fw-bolder fs-2qx text-gray-800 mb-7">
                Verify Your Email
              </h1>
              <div className="fs-3 fw-bold text-muted mb-10">
                We have sent a code to your email.
              </div>

              <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
                <form
                  className="form w-100"
                  id="kt_sign_in_form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="fv-row mb-10">
                    <label className="form-label fs-6 fw-bolder text-dark">
                      Enter the Verification Code
                    </label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="text"
                      name="code"
                      value={user.code}
                      onChange={handleChange}
                      placeholder="Enter your code"
                      autoComplete="off"
                    />
                  </div>

                  <div className="text-center mb-10">
                    <button
                      type="submit"
                      onClick={handleSubmitToken}
                      className="btn btn-lg btn-primary w-100 mb-5"
                    >
                      <span className="indicator-label">Confirm</span>
                      <span className="indicator-progress">
                        Please wait...
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    </button>
                  </div>
                  <div className="fs-5">
                    <span className="fw-bold text-gray-700">
                      Did’t receive an email?
                    </span>
                    <a href="signup.html" className="link-primary fw-bolder">
                      Resend
                    </a>
                  </div>
                </form>
              </div>
            </div>
            <div
              className="d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-100px min-h-lg-350px"
              style={{
                backgroundImage: 'url(/assets/media/illustrations/17.png'
              }}
            ></div>
          </div>
          <div className="overlay"></div>
        </div>
      </div>
    </>
  );
};

export default VerifyToken;
