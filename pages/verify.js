import Head from 'next/head'
import Image from 'next/image'
import Meta from '../components/Meta';
import FooterMain from '../components/FooterMain';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'

const Verify = () => {

  const router = useRouter();

  const { email } = router.query;


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
						<div className="fs-3 fw-bold text-muted mb-10">We have sent an email to 
						<a href="#" className="link-primary fw-bolder">{email}</a>
						<br />please follow a link to verify your email.</div>
						<div className="text-center mb-10">
							<a href="#!" className="btn btn-lg btn-primary fw-bolder">Go your email and activate</a>
						</div>
						<div className="fs-5">
							<span className="fw-bold text-gray-700">Did’t receive an email?</span>
							<a href="signup.html" className="link-primary fw-bolder">Resend</a>
						</div>
					</div>
					<div className="d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-100px min-h-lg-350px" style={{backgroundImage: 'url(/assets/media/illustrations/17.png)'}}></div>
				</div>


			<FooterMain> </FooterMain>    


        <script src="/assets/plugins/global/plugins.bundle.js"/>
        <script src="/assets/js/scripts.bundle.js"/>

			</div>
		</div>

</main>

)

}

export default Verify;
