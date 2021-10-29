import Amplify from 'aws-amplify'

import config from '../src/config/aws-exports'

import { useEffect } from 'react';
import {getCookieValue, setCookieValue} from '../utils/helpers'

Amplify.configure({
  ...config,
  ssr: true,
})

const MyApp = ({ Component, pageProps }) => {

  useEffect(()=>{
    if (!getCookieValue('g-theme')) {
      setCookieValue('g-theme', 'LIGHT', 2147483647, '/');
    }
  },[])
  
    return <Component {...pageProps} />
  }
  
  MyApp.propTypes = {};
  
  MyApp.defaultProps = {};
  
  MyApp.getInitialProps = async () => {
     return {};
  };
  
// export async function getStaticProps() {
//    return {
//     revalidate: 1,
//    }
// };

export default MyApp 