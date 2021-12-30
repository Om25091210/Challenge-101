import Customjs from './newcustom';

const AllScript = () => {
  return (
    <>
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <script async src="/assets/plugins/global/plugins.bundle.js" />
      <script async src="/assets/js/scripts.bundle.js" />
      <script async src="/assets/plugins/global/plugins.bundle.js" />
      <script async src="/assets/js/dash/bootstrap.bundle.min.js" />
      <script async src="/assets/js/dash/jquery.fancybox.js" />
      <script async src="/assets/js/dash/jquery.fancybox-media.js" />

      {/* <script src="/assets/js/dash/custom.js" /> */}
      <Customjs />
    </>
  );
};

export default AllScript;
