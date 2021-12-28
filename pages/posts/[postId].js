import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';
import RightSection from '@components/RightSection';
import baseURL from '@utils/baseURL';
import ReactTooltip from 'react-tooltip';
import LikePost from '@components/postLikes/LikePost';
import CustomPost from '@components/dashboard/CustomPost';
import CommentForm from '@components/comments/CommentForm';

const PostId = ({ user , post }) => {
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} />
      <LeftNav />

      <div>
 <div className="main_middle">
        <div className="tab" id="Discover">
          <div className="for-you">
            <div className="post">
              
                <div key={post._id}>
                  <div className="heads">
                    <div className="user">
                      <img src={post.user.profilePicUrl} alt="" />
                    </div>
                    <h4>{post.description}</h4>
                  </div>
                  <div className="left_details">
                    {' '}
                    <a
                      href="#"
                      data-tip="<p>HTML tooltip</p> <p>HTML tooltip</p>"
                      data-for="toolTip1"
                      data-place="top"
                    >
                      {' '}
                      <i className="fa fa-heart" aria-hidden="true"></i>{' '}
                      <span>{post.likes.length}</span>{' '}
                    </a>{' '}
                    <ReactTooltip id="toolTip1" html={true} />
                    <a href="#">
                      {' '}
                      <i className="fa fa-eye" aria-hidden="true"></i>{' '}
                      <span>{post.views}</span>{' '}
                    </a>{' '}
                    <a href="#">
                      {' '}
                      <i
                        className="fa fa-commenting"
                        aria-hidden="true"
                      ></i>{' '}
                      <span>0</span>{' '}
                    </a>{' '}
                  </div>
                  <div className="right_details">
                    <div className="post_data">
                      <img src={post.images} alt="" />
                    </div>
                    <div className="users_share_box">
                      <div className="more_user">
                        {' '}
                        <a href="#">
                          <img src="/assets/media/dash/1.jpg" alt="user" />
                          <span className="online"></span>
                        </a>{' '}
                        <a href="#">
                          <img src="/assets/media/dash/2.jpg" alt="user" />
                          <span className="online"></span>
                        </a>{' '}
                        <a href="#">
                          <img src="/assets/media/dash/3.jpg" alt="user" />
                          <span className="offiline"></span>
                        </a>{' '}
                        <a href="#" className="more">
                          +3
                        </a>{' '}
                        <span className="others">
                          Ashwin, George and 5 others have liked your post.
                        </span>{' '}
                      </div>
                      <div className="shere">
                        {' '}
                        <LikePost postId={post._id} />{' '}
                        <a href="#">
                          {' '}
                          <i
                            className="fa fa-share-alt"
                            aria-hidden="true"
                          ></i>{' '}
                          <span>Share</span>{' '}
                        </a>
                        <div className="three_dots">
                          <a href="#">
                            {' '}
                            <i
                              className="fa fa-ellipsis-v"
                              aria-hidden="true"
                            ></i>
                          </a>
                          <CustomPost post={post} />
                        </div>
                      </div>
                    </div>

                    <CommentForm postId={post} />
                  </div>
                </div>
              
            </div>
          </div>
        </div>

        </div>

      </div>

      <RightSection user={user} />


      <AllScript />
    </>
  );
};


export const getServerSideProps = async (context) => {
  const { postId } = context.params;

  const response = await fetch(`${baseURL}/api/posts/${postId}`);
  const post = await response.json();

  return {
    props: { post }
  };
};


export default PostId;
