import dynamic from "next/dynamic";
const SignIn = dynamic(() => import("./login"));
// more imports here

function IndexPage({ ...props }) {
  // some hooks here that need to be before the condition
  return <SignIn />;
  // the JSX the private page will render
}

// define getInitialProps here

export default IndexPage;
