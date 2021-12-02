import Head from 'next/head'
import Image from 'next/image'
import Meta from '@components/Meta';
import FooterMain from '@components/FooterMain';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
var FormData = require('form-data');

import { onboardUser } from '../../utils/auth';
import { useRouter } from 'next/router'


export default function Confirm() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    code: '',
  });
  const { verificationToken } = router.query;

  console.log(verificationToken);


  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const formdata = new FormData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await  onboardUser(verificationToken, formdata, setLoading, toast);

  };

  useEffect(() => {
    const isUser = Object.values({ verificationToken }).every((item) =>
      Boolean(item)
    );
  }, [user]);


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
						<form className="form w-100" noValidate="noValidate" id="kt_sign_in_form" onSubmit={handleSubmit}>

							<div className="fv-row mb-10">
								<label className="form-label fs-6 fw-bolder text-dark">Verification Code</label>
								<input className="form-control form-control-lg form-control-solid" type="text" name="verificationToken" value={verificationToken} onChange={handleChange} autoComplete="off" />
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