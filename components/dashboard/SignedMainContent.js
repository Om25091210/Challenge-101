import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import {  useMutation } from 'react-query';
import cookie from 'js-cookie';
import CommentForm from '../comments/CommentForm';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import CustomPost from './CustomPost';
import LikePost from '../postLikes/LikePost';
import ReactTooltip from 'react-tooltip';


const SignedMainContent = ({posts}) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [followingPosts, setFollowingPosts] = useState([]);
  const router = useRouter();

  const mutation = useMutation(
    async (formdata) =>
      await axios.post(`${baseURL}/api/posts`, formdata, {
        headers: {
          Authorization: cookie.get('token'),
          'Content-Type': 'multipart/form-data'
        }
      })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();

    if (description.trim() === '') {
      return toast.error('Please add a description');
    }

    formdata.append('description', description);
    formdata.append('image', image);

    //    for (const key of Object.keys(images)) {
    //      formdata.append('images', images[key]);
    //    }

    try {
      await mutation.mutateAsync(formdata);
      toast.success('Your post has been successfully uploaded');
      setDescription('');
      setImage(null);
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/posts/feed`, {
        headers: {
          Authorization: cookie.get('token')
        }
      })
      .then((res) => {
        // console.log(res)
        setFollowingPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="main_middle">
      <form className="write_post" onSubmit={handleSubmit}>
        <div className="team_slider">
          <ul className="user_slider">
            <li>
              <img src="/assets/media/dash/user.jpg" alt="" />
            </li>
            <li>
              <img src="/assets/media/dash/user.jpg" alt="" />
            </li>
            <li>
              <img src="/assets/media/dash/user.jpg" alt="" />
            </li>
            <li>
              <img src="/assets/media/dash/user.jpg" alt="" />
            </li>
          </ul>
        </div>

        <textarea
          placeholder="Write a post"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="right_links">
          <div className="post_img">
            <input
              type="file"
              id="files"
              name="files[]"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
            />
          </div>
          <a href="#">
            <i className="fa fa-calendar-plus-o" aria-hidden="true"></i>
          </a>
          <a href="#">
            <i className="fa fa-gamepad" aria-hidden="true"></i>
          </a>
          <a href="#">
            <i className="fa fa-video-camera" aria-hidden="true"></i>
          </a>
          <a href="#">
            <i className="fa fa-twitter" aria-hidden="true"></i>
          </a>
        </div>
        <button className="btn" type="submit" disabled={mutation.isLoading}>
          Submit
        </button>
      </form>

      <ul className="profile_tab_btn three_nav">
        <li className="active">
          <a href="#!" rel="Discover">
            Discover
          </a>
        </li>
        <li>
          <a href="#!" rel="for-you">
            For You
          </a>
        </li>
        <li>
          <a href="#!" rel="Following">
            Following
          </a>
        </li>
      </ul>

      <div className="prfoile_tab_data">
        <div className="tab hide" id="for-you">
          <h3>No Posts Under For You</h3>
        </div>

        <div className="tab hide" id="Following">
          <div>
            <div className="post">
              {followingPosts.map((post) => (
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
                      data-toggle="tooltip"
                      title="Some tooltip text!"
                    >
                      {' '}
                      <i className="fa fa-heart" aria-hidden="true"></i>{' '}
                      <span>{post.likes.length}</span>{' '}
                    </a>{' '}
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
              ))}
            </div>
          </div>
        </div>

        <div className="tab" id="Discover">
          <div className="for-you">
            <div className="post">
              {posts.map((post) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SignedMainContent;
