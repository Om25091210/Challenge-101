import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';
import { parseCookies, destroyCookie } from 'nookies';
import { redirectUser } from '../utils/auth';
import Script from 'next/script';
import axios from 'axios';
import baseURL from '../utils/baseURL';


import {getCookieValue, setCookieValue} from '../utils/helpers'

const MyApp = ({ Component, pageProps }) => {

  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());

  useEffect(()=>{
    if (!getCookieValue('g-theme')) {
      setCookieValue('g-theme', 'LIGHT', 2147483647, '/');
    }
  },[])

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  
    return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />


    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
    </QueryClientProvider>

      <Component {...pageProps} /> 

    </>

  );
  }
  
  MyApp.propTypes = {};
  
  MyApp.defaultProps = {};
  
MyApp.getInitialProps = async ({ ctx }) => {
  const { token } = parseCookies(ctx);
  let pageProps = {};

  const protectedRoutes =
    ctx.pathname === '/dashboard' ||
    ctx.pathname === '/notifications' ||
    ctx.pathname === '/posts/new' ||
    ctx.pathname === '/posts/edit/[id]' ||
    ctx.pathname === '/messages' ||
    ctx.pathname === '/settings';

  const availableForEveryone =
    ctx.pathname === '/login' ||
    ctx.pathname === '/confirm' ||
    ctx.pathname === '/legal/terms' ||
    ctx.pathname === '/legal/privacy' ||
    ctx.pathname === '/search' ||
    ctx.pathname === '/announcements';

  // If user is not logged in
  if (!token) {
    destroyCookie(ctx, 'token');
    // Redirect to login if user is trying to access protected routes
    protectedRoutes && redirectUser(ctx, '/login');
  } else {
    try {
      const res = await axios.get(`${baseURL}/api/auth`, {
        headers: { Authorization: token },
      });
      const { user } = res.data;
      pageProps.user = user;
    } catch (err) {
      console.log('Error in Protected routes.....')
      destroyCookie(ctx, 'token');
      redirectUser(ctx, '/login');
    }
  }

  return { pageProps };
};
  
// export async function getStaticProps() {
//    return {
//     revalidate: 1,
//    }
// };

export default MyApp 