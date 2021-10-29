import Head from 'next/head'
import Image from 'next/image'
import Meta from '../../components/Meta';
import FooterMain from '../../components/FooterMain';
import { useState } from 'react'

import { Auth } from 'aws-amplify';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router'


export default function Register({ user, setUser }) {

  const { register, handleSubmit } = useForm();
  const router = useRouter()

  async function confirmSignUp({ code }) {
    try {
      await Auth.confirmSignUp(user.username, code);

      await Auth.signIn(user.username, user.password);

      setUser(null)

      router.push('/dashboard')
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }



return (

	<main id="kt_body" className="bg-body">

		<Meta />




		<div className="d-flex flex-column flex-root">
			<div className="d-flex flex-column flex-column-fluid">
				<div className="d-flex flex-column flex-column-fluid text-center p-10 py-lg-15">
					<a href="#" className="mb-12">
						<img alt="Logo" src="/assets/media/logos/logo.png" className="h-40px" />
					</a>
					<div className="pt-lg-10 mb-10">
						<h1 className="fw-bolder fs-2qx text-gray-800 mb-7">Verify Your Email</h1>
						<div className="fs-3 fw-bold text-muted mb-10">We have sent a code to 
						your email.</div>

						<div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
						<form className="form w-100" noValidate="noValidate" id="kt_sign_in_form" onSubmit={handleSubmit(confirmSignUp)}>

							<div className="fv-row mb-10">
								<label className="form-label fs-6 fw-bolder text-dark">Verification Code</label>
								<input {...register('code', { required: true })} id="code" className="form-control form-control-lg form-control-solid" type="number" name="code" autoComplete="off" />
							</div>

						<div className="text-center mb-10">
								<button type="submit" id="kt_sign_in_submit" className="btn btn-lg btn-primary w-100 mb-5">
									<span className="indicator-label">Confirm</span>
									<span className="indicator-progress">Please wait... 
									<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
								</button>
						</div>
						<div className="fs-5">
							<span className="fw-bold text-gray-700">Did’t receive an email?</span>
							<a href="signup.html" className="link-primary fw-bolder">Resend</a>
						</div>

						</form>

						</div>
					</div>
					<div className="d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-100px min-h-lg-350px" style={{backgroundImage: 'url(/assets/media/illustrations/17.png'}}></div>
				</div>



			

			<FooterMain> </FooterMain>    


        <script src="/assets/plugins/global/plugins.bundle.js"/>
        <script src="/assets/js/scripts.bundle.js"/>

			</div>
		</div>

</main>

)

}