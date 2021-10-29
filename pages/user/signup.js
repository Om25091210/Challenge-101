import Head from 'next/head'
import Image from 'next/image'
import Meta from '../../components/Meta';
import FooterMain from '../../components/FooterMain';

import { Auth } from 'aws-amplify';
import { useForm } from "react-hook-form";


export default function Register({ setStatus, setUser }) {

  const { register, handleSubmit } = useForm();

  async function signUp({ email, username, password }) {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional but not in this case as MFA/Verification code wil be emailed
        }
      });

      setStatus('confirm')
      setUser({
        username: username,
        password: password,
      })

    } catch (error) {
      console.log('error signing up:', error);
    }
  }


  return (

	<main id="kt_body" className="bg-body">

		<Meta />


		<div className="d-flex flex-column flex-root">

			<div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed" style={{backgroundImage : 'url(/assets/media/illustrations/14.png)'}}>
				<div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
					<a href="#" className="mb-12">
						<img alt="Logo" src="/assets/media/logos/logo.png" className="h-40px" />
					</a>

					<div className="w-lg-600px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
						<form className="form w-100" noValidate="novalidate" id="kt_sign_up_form" onSubmit={handleSubmit(signUp)}>
							<input type="hidden" name="remember" value="true" />

							<div className="mb-10 text-center">
								<h1 className="text-dark mb-3">Create an Account</h1>
								<div className="text-gray-400 fw-bold fs-4">Already have an account? 
								<a className="link-primary fw-bolder" onClick={() => setStatus('sign-in')}>Sign in here</a></div>
							</div>
							<button type="button" className="btn btn-light-primary fw-bolder w-100 mb-10">
							<img alt="Logo" src="/assets/media/svg/brand-logos/google-icon.svg" className="h-20px me-3" />Sign in with Google</button>
							<div className="d-flex align-items-center mb-10">
								<div className="border-bottom border-gray-300 mw-50 w-100"></div>
								<span className="fw-bold text-gray-400 fs-7 mx-2">OR</span>
								<div className="border-bottom border-gray-300 mw-50 w-100"></div>
							</div>
							<div className="row fv-row mb-7">
								<div className="col-xl-6">
									<label className="form-label fw-bolder text-dark fs-6">First Name</label>
									<input {...register('firstname', { required: true })} className="form-control form-control-lg form-control-solid" type="text" placeholder="" name="firstname" autoComplete="off" />
								</div>
								<div className="col-xl-6">
									<label className="form-label fw-bolder text-dark fs-6">Last Name</label>
									<input {...register('lastname', { required: true })}  className="form-control form-control-lg form-control-solid" type="text" placeholder="" name="lastname" autoComplete="off" />
								</div>
							</div>
							<div className="fv-row mb-7">
								<label className="form-label fw-bolder text-dark fs-6">Email</label>
								<input {...register('username', { required: true })} className="form-control form-control-lg form-control-solid" type="email" placeholder="" name="username" autoComplete="off" />
							</div>
							<div className="mb-10 fv-row" data-kt-password-meter="true">
								<div className="mb-1">
									<label className="form-label fw-bolder text-dark fs-6">Password</label>
									<div className="position-relative mb-3">
										<input {...register('password', { required: true })}  className="form-control form-control-lg form-control-solid" type="password" placeholder="" name="password" autoComplete="off" />
										<span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2" data-kt-password-meter-control="visibility">
											<i className="bi bi-eye-slash fs-2"></i>
											<i className="bi bi-eye fs-2 d-none"></i>
										</span>
									</div>
									<div className="d-flex align-items-center mb-3" data-kt-password-meter-control="highlight">
										<div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
										<div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
										<div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
										<div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
									</div>
								</div>
								<div className="text-muted">Use 8 or more characters with a mix of letters, numbers &amp; symbols.</div>
							</div>
							<div className="fv-row mb-10">
								<label className="form-check form-check-custom form-check-solid form-check-inline">
									<input className="form-check-input" type="checkbox" name="toc" value="1" />
									<span className="form-check-label fw-bold text-gray-700 fs-6">I Agree 
									<a href="#" className="ms-1 link-primary">Terms and conditions</a>.</span>
								</label>
							</div>
							<div className="text-center">
								<button type="submit" id="kt_sign_up_submit" className="btn btn-lg btn-primary">
									<span className="indicator-label">Submit</span>
									<span className="indicator-progress">Please wait... 
									<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
								</button>
							</div>
						</form>
					</div>
				</div>

			<FooterMain> </FooterMain>    


        <script src="/assets/plugins/global/plugins.bundle.js"/>
        <script src="/assets/js/scripts.bundle.js"/>
    

			</div>
		</div>

</main>

)

}