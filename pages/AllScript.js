import Customjs from './newcustom';

const AllScript = () => {
  return (
    <>
      <script async src="/assets/plugins/global/plugins.bundle.js" />
      <script async src="/assets/js/scripts.bundle.js" />
      <script async src="/assets/plugins/global/plugins.bundle.js" />
      <script async src="/assets/js/dash/bootstrap.bundle.min.js" />
      <script async src="/assets/js/dash/jquery.mCustomScrollbar.js" />
      <script async src="/assets/js/dash/jquery.fancybox.js" />
      <script async src="/assets/js/dash/slick.js" />
      {/* <script src="/assets/js/dash/custom.js" /> */}
      <Customjs />
    </>
  );
};

export default AllScript;
