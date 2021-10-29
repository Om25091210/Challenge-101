import { useState } from 'react'

import SignIn from '../pages/user/signin'
import Register from '../pages/user/signup'
import Confirm from '../pages/user/confirm'



export default function Index() {
  const [status, setStatus] = useState('sign-in')
  const [user, setUser] = useState(null)
  return (
    
    <div>
      <main>
            {status === 'sign-in' ? <SignIn setStatus={setStatus} /> : null}
            {status === 'sign-up' ? <Register setStatus={setStatus} setUser={setUser} /> : null}
            {status === 'confirm' ? <Confirm setUser={setUser} user={user} /> : null}

      </main>
    </div>
  )
}
