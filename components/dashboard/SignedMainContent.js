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
import AllPosts from './AllPosts';

const SignedMainContent = ({ posts, user, profile }) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [followingPosts, setFollowingPosts] = useState([]);
  const [profilepic, setProfilePic] = useState('');
  const [username, setUsername] = useState('');
  const [personas, setPersonas] = useState({});
  const [postType, setPostType] = useState('');
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
    formdata.append('postType', postType);

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

  const personaHandle = (username, profilepic, postType) => {
    setUsername(username);
    setProfilePic(profilepic);
    setPostType(postType);
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
    }, 4000);
  }, []);

  return (
    <div className="main_middle">
      <form className="write_post" onSubmit={handleSubmit}>
        <div className="team_slider">
          <ul className="user_slider">
            <li>
              <img
                src={user.profilePicUrl}
                alt=""
                onClick={() =>
                  personaHandle(user.name, user.profilePicUrl, 'User')
                }
              />
            </li>
            {personas.personas?.map((persona, index) => (
              <li key={index}>
                {persona.type === 'team' ? (
                  <img
                    src={
                      persona.teamId != null
                        ? persona.teamId.imgUrl
                        : '/assets/media/dash/user.jpg'
                    }
                    alt=""
                    onClick={() =>
                      personaHandle(
                        persona.teamId.name,
                        persona.teamId.imgUrl,
                        'Team'
                      )
                    }
                  />
                ) : persona.type === 'tournament' ? (
                  <img
                    src={persona.tournamentId?.imgUrl}
                    alt=""
                    onClick={() =>
                      personaHandle(
                        persona.tournamentId.name,
                        persona.tournamentId.imgUrl,
                        'Tournament'
                      )
                    }
                  />
                ) : persona.type === 'brand' ? (
                  <img
                    src={persona.brandId?.logoUrl}
                    alt=""
                    onClick={() =>
                      personaHandle(
                        persona.brandId.name,
                        persona.brandId.logoUrl,
                        'Brand'
                      )
                    }
                  />
                ) : persona.type === 'company' ? (
                  <img
                    src={persona.companyId?.logoUrl}
                    alt=""
                    onClick={() =>
                      personaHandle(
                        persona.companyId.name,
                        persona.companyId.logoUrl,
                        'Company'
                      )
                    }
                  />
                ) : persona.type === 'community' ? (
                  <img
                    src={persona.communityId?.logoUrl}
                    alt=""
                    onClick={() =>
                      personaHandle(
                        persona.communityId.name,
                        persona.communityId.logoUrl,
                        'Community'
                      )
                    }
                  />
                ) : null}
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

          {/* <a href="#">
            <i className="fa fa-calendar-plus-o" aria-hidden="true"></i>
          </a> */}
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
                <AllPosts user={user} post={post} />
              ))}
            </div>
          </div>
        </div>

        <div className="tab" id="Discover">
          <div>
            {posts.map((post) => (
              <AllPosts user={user} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignedMainContent;
