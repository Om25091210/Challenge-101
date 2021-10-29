import { useState } from 'react'
import { useRouter } from 'next/router'
import { Auth } from 'aws-amplify';
export default function SignIn() {
  const router = useRouter()

  async function signOut() {
    try {
      await Auth.signOut();
      router.push('/')

    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (

	<div className="text-center">
		<button type="submit" id="kt_sign_in_submit" className="btn btn-lg btn-primary w-100 mb-5" onClick={() => signOut()}>
			<span className="indicator-label">Sign Out</span>
			<span className="indicator-progress">Please wait... 
			<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
		</button>
	</div>	


  )
}
