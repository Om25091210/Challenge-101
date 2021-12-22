import Document, { Head, Main, NextScript } from 'next/document';

import Customjs from './newcustom';

const AllScript = () => {
  return (
    <>
      <script src="/assets/plugins/global/plugins.bundle.js" />
      <script src="/assets/js/scripts.bundle.js" />
      <script src="/assets/plugins/global/plugins.bundle.js" />
      <script src="/assets/js/dash/bootstrap.bundle.min.js" />
      <script src="/assets/js/dash/jquery.mCustomScrollbar.js" />
      <script src="/assets/js/dash/jquery.fancybox.js" />
      <script src="/assets/js/dash/slick.js" />
      {/* <script src="/assets/js/dash/custom.js" /> */}
      <Customjs />
    </>
  );
};

export default AllScript;
