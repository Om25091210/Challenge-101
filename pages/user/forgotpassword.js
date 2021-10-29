import Head from 'next/head'
import Image from 'next/image'
import Meta from '../../components/Meta';
import FooterMain from '../../components/FooterMain';
import { useState } from 'react'

const ForgotPassword = () => (

	<main id="kt_body" className="bg-body">

		<Meta />

		<div className="d-flex flex-column flex-root">
			<div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed" style={{backgroundImage: 'url(/assets/media/illustrations/14.png)'}}>
				<div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
					<a href="#" className="mb-12">
						<img alt="Logo" src="/assets/media/logos/logo.png" className="h-40px" />
					</a>
					<div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
						<form className="form w-100" noValidate="novalidate" id="kt_password_reset_form">
							<div className="text-center mb-10">
								<h1 className="text-dark mb-3">Forgot Password ?</h1>
								<div className="text-gray-400 fw-bold fs-4">Enter your email to reset your password.</div>
							</div>
							<div className="fv-row mb-10">
								<label className="form-label fw-bolder text-gray-900 fs-6">Email</label>
								<input className="form-control form-control-solid" type="email" placeholder="" name="email" autoComplete="off" />
							</div>
							<div className="d-flex flex-wrap justify-content-center pb-lg-0">
								<button type="button" id="kt_password_reset_submit" className="btn btn-lg btn-primary fw-bolder me-4">
									<span className="indicator-label">Submit</span>
									<span className="indicator-progress">Please wait... 
									<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
								</button>
								<a href="../demo4/authentication/flows/basic/sign-up.html" className="btn btn-lg btn-light-primary fw-bolder">Cancel</a>
							</div>
						</form>
					</div>
				</div>

			<FooterMain> </FooterMain>    


        <script src="/assets/plugins/global/plugins.bundle.js"/>
        <script src="/assets/js/scripts.bundle.js"/>
		<script src="/assets/js/custom/authentications/password-reset/password-reset.js"></script>

			</div>
		</div>

</main>

)

export default ForgotPassword