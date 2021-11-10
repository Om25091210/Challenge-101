import Amplify from 'aws-amplify'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useState, useEffect } from 'react';


import config from '../src/config/aws-exports'

import {getCookieValue, setCookieValue} from '../utils/helpers'

Amplify.configure({
  ...config,
  ssr: true,
})

const MyApp = ({ Component, pageProps }) => {

  const [queryClient] = useState(() => new QueryClient());

  useEffect(()=>{
    if (!getCookieValue('g-theme')) {
      setCookieValue('g-theme', 'LIGHT', 2147483647, '/');
    }
  },[])
  
    return (
    <>
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
    </QueryClientProvider>

      <Component {...pageProps} /> 

    </>

  );
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