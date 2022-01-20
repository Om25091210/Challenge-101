import Head from 'next/head'
import Meta from '@components/Meta';
import FooterMain from '@components/FooterMain';
import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useForm } from "react-hook-form";
import Link from 'next/link'
import {DataContext} from '@store/GlobalState'
import {postData} from '@utils/fetchData'
import Cookie from 'js-cookie'
import baseURL from '@utils/baseURL';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';


const SignIn = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const {state, dispatch} = useContext(DataContext)
  const { auth } = state
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const { email, password } = user;

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    dispatch({ type: 'NOTIFY', payload: {} })    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

		    const respa = await axios.post(`${baseURL}/api/auth`, user);
		    const res = respa.data;

		    if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
		  	
		    dispatch({ type: 'NOTIFY', payload: {success: res.msg} })

		    dispatch({ type: 'AUTH', payload: {
		      token: res.access_token,
		      user: res.user
		    }})

				cookie.set('refreshtoken', res.refresh_token, {path: 'api/auth/accessToken',expires: 7});

		    localStorage.setItem('firstLogin', true)
		    setToken(res.token);
		    toast.info('Welcome back...' + user.name);
  	}
  	catch (error) {
    	toast.info('Sorry! Please verify your login credentials and try again.');
  	}

  };

	const setToken = (token) => {
	  cookie.set('token', token, { expires: 730 });
	};

  useEffect(() => {
    const isUser = Object.values({ email, password }).every((item) =>
      Boolean(item)
    );
    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  useEffect(() => {
    if(Object.keys(auth).length !== 0) router.push("/dashboard")
  }, [auth])


return (

	<main id="kt_body" className="bg-body">

		<Meta />

		<div className="d-flex flex-column flex-root">

			<div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed" style={{backgroundImage: 'url(/assets/media/illustrations/14.png)'}}>

				<div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
					<a href="#" className="mb-12">
						<img alt="Logo" src="/assets/media/logos/logo.png" className="h-40px" />
					</a>
					<div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
						<form className="form w-100" noValidate="noValidate" id="kt_sign_in_form" onSubmit={handleSubmit}>
					      <input type="hidden" name="remember" value="true" />

							<div className="text-center mb-10">
								<h1 className="text-dark mb-3">Sign In to Multiplayr</h1>
								<div className="text-gray-400 fw-bold fs-4">New Here? 
								<a className="link-primary fw-bolder" href="/signup">Create an Account</a></div>
							</div>
							<div className="fv-row mb-10">
								<label className="form-label fs-6 fw-bolder text-dark">Email</label>
								<input className="form-control form-control-lg form-control-solid" type="text" name="email" value={email} onChange={handleChange} autoComplete="off" />
							</div>
							<div className="fv-row mb-10">
								<div className="d-flex flex-stack mb-2">
									<label className="form-label fw-bolder text-dark fs-6 mb-0">Password</label>
									<a href="/user/forgotpassword" className="link-primary fs-6 fw-bolder">Forgot Password ?</a>
								</div>
								<input className="form-control form-control-lg form-control-solid" type="password" name="password" value={password} onChange={handleChange} autoComplete="off" />
							</div>
							<div className="text-center">
								<button type="submit" id="kt_sign_in_submit" className="btn btn-lg btn-primary w-100 mb-5">
									<span className="indicator-label">Continue</span>
									<span className="indicator-progress">Please wait... 
									<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
								</button>
								<div className="text-center text-muted text-uppercase fw-bolder mb-5">or</div>
								<a href="#" className="btn btn-flex flex-center btn-light btn-lg w-100 mb-5">
								<img alt="Logo" src="/assets/media/svg/brand-logos/google-icon.svg" className="h-20px me-3" />Continue with Google</a>
								<a href="#" className="btn btn-flex flex-center btn-light btn-lg w-100 mb-5">
								<img alt="Logo" src="/assets/media/svg/brand-logos/facebook-4.svg" className="h-20px me-3" />Continue with Facebook</a>
								<a href="#" className="btn btn-flex flex-center btn-light btn-lg w-100">
								<img alt="Logo" src="/assets/media/svg/brand-logos/124021.png" className="h-20px me-3" />Continue with Twitter</a>
							</div>
						</form>
					</div>
				</div>
			<FooterMain> </FooterMain>    

			</div>
		</div>

</main>

)

}

export default SignIn;
