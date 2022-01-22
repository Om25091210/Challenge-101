import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { useMutation } from 'react-query';
import cookie from 'js-cookie';
import CommentForm from '../comments/CommentForm';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import CustomPost from './CustomPost';
import LikePost from '../postLikes/LikePost';
import ReactTooltip from 'react-tooltip';
import Moment from 'moment';

const SignedMainContent = ({ posts, user, profile }) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [followingPosts, setFollowingPosts] = useState([]);
  const [profilepic, setProfilePic] = useState('');
  const [username, setUsername] = useState('');
  const [personas, setPersonas] = useState({});
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
    formdata.append('profilepic', profilepic);
    formdata.append('username', username);

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

  useEffect(() => {
    if (window.File && window.FileList && window.FileReader) {
      $('#files').on('change', function (e) {
        var files = e.target.files,
          filesLength = files.length;
        for (var i = 0; i < filesLength; i++) {
          var f = files[i];
          var fileReader = new FileReader();
          fileReader.onload = function (e) {
            var file = e.target;
            $(
              '<span className="image_box">' +
                '<img className="imageThumb" src="' +
                e.target.result +
                '" title="' +
                file.name +
                '"/>' +
                '<br/><span className="remove">X</span>' +
                '</span>'
            ).insertAfter('#files');
            $('.remove').click(function () {
              $(this).parent('.image_box').remove();
            });
          };
          fileReader.readAsDataURL(f);
        }
      });
    } else {
      alert("Your browser doesn't support to File API");
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/all/personas`, {
        headers: {
          Authorization: cookie.get('token')
        }
      })
      .then((res) => {
        setPersonas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(personas);

  const personaHandle = (username, profilepic) => {
    setUsername(username);
    setProfilePic(profilepic);
  };
  var settings = {
    infinite: false,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

  useEffect(() => {
    setTimeout(() => {
      $('.user_slider').slick({
        infinite: false,
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 1,
        slidesToScroll: 1
      });
    }, 1000);
  }, []);

  return (
    <div className="main_middle">
      <form className="write_post" onSubmit={handleSubmit}>
        <div className="team_slider">
          <ul className="user_slider">
            <li>
              <img src="/assets/media/dash/user.jpg" alt="" />
            </li>
            {personas.personas?.map((persona, index) => (
              <li key={index}>
                {persona.type === 'team' ? (
                  <img
                    src={persona.teamId.imgUrl}
                    alt=""
                    onClick={() =>
                      personaHandle(persona.teamId.name, persona.teamId.imgUrl)
                    }
                  />
                ) : persona.type === 'tournament' ? (
                  <img
                    src={persona.tournamentId.imgUrl}
                    alt=""
                    onClick={() =>
                      personaHandle(
                        persona.tournamentId.name,
                        persona.tournamentId.imgUrl
                      )
                    }
                  />
                ) : persona.type === 'brand' ? (
                  <img
                    src={persona.brandId.logoUrl}
                    alt=""
                    onClick={() =>
                      personaHandle(
                        persona.brandId.name,
                        persona.brandId.logoUrl
                      )
                    }
                  />
                ) : persona.type === 'company' ? (
                  <img
                    src={persona.companyId.logoUrl}
                    alt=""
                    onClick={() =>
                      personaHandle(
                        persona.companyId.name,
                        persona.companyId.logoUrl
                      )
                    }
                  />
                ) : persona.type === 'community' ? (
                  <img
                    src={persona.communityId.logoUrl}
                    alt=""
                    onClick={() =>
                      personaHandle(
                        persona.communityId.name,
                        persona.communityId.logoUrl
                      )
                    }
                  />
                ) : (
                  'works'
                )}
              </li>
            ))}
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
            <div className="style_file_upload">
              <input
                type="file"
                id="files"
                name="files[]"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                multiple
              />
              <label htmlFor="files">
                <span>
                  <i className="fa fa-picture-o" aria-hidden="true"></i>
                </span>
              </label>
            </div>
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
              {followingPosts.map((post, idx) => (
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
                          <a href="#!">
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

                    <CommentForm post={post} user={user} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="tab" id="Discover">
          <div>
            {posts.map((post) => (
              <div key={post._id}>
                <div className="post">
                  <div className="heads">
                    <div className="user">
                      <img src={post.profilepic} alt="" />
                    </div>
                    <div className="user_name_disc">
                      <h4>{post.username}</h4>
                      <p>{post.description}</p>
                    </div>

                    <div className="date">
                      {post.createdAt === post.updatedAt ? (
                        <p>
                          {' '}
                          {Moment(post.createdAt).format(
                            'MMMM, DD, YYYY hh:mm A'
                          )}{' '}
                        </p>
                      ) : (
                        <p>
                          {' '}
                          {Moment(post.updatedAt).format(
                            'MMMM, DD, YYYY hh:mm A'
                          )}{' '}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="left_details">
                    {' '}
                    <a
                      href="#!"
                      data-tip={post.likes.map((like) => {
                        return like.user.username;
                      })}
                      data-for="toolTip1"
                      data-place="top"
                    >
                      <i className="fa fa-heart" aria-hidden="true"></i>{' '}
                      <span>{post.likes.length}</span>
                    </a>
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
                          <a href="#!">
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

                    <CommentForm post={post} user={user} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignedMainContent;
