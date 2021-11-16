import { useState } from 'react'
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { QueryClient, QueryClientProvider, useQuery, useMutation } from 'react-query'
import cookie from 'js-cookie'
import CommentForm from '../comments/CommentForm';
var FormData = require('form-data');


const queryClient = new QueryClient()

export default function SignedMainContent(){
  return(<QueryClientProvider client={queryClient} contextSharing={true}>
        <SignedMainContent1/>
    </QueryClientProvider>
  );
}

const SignedMainContent1 = (req, res) => {
  const [post, setPost] = useState([]);
  const [description, setDescription] = useState("")
  const [images,setImages] = useState(null)

  //Adding Post
  const handleButton = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("description", description)
    formData.append("images",images)

    axios.post(`${baseURL}/api/posts`,formData,{
      headers: {
        'Content-type': 'application/json',
        "Authorization": cookie.get('token'), },
    })
      .then(res => {
        console.log(res.data)
      })
    setDescription("")
  }

  //Fetching all the posts
  const fetchPosts = async () => {
    const promise = await axios.get(`${baseURL}/api/posts`);
    return promise.data.posts;
  }

  const { data, status} = useQuery(post,fetchPosts)

  return(
    <div className="main_middle"> 
        
      <form className="write_post" onSubmit={(e) => e.preventDefault()}>
      <div className="team_slider">
        <ul className="user_slider">
          <li><img src="/assets/media/dash/user.jpg" alt=""/></li>
          <li><img src="/assets/media/dash/user.jpg" alt=""/></li>
          <li><img src="/assets/media/dash/user.jpg" alt=""/></li>
          <li><img src="/assets/media/dash/user.jpg" alt=""/></li>
        </ul>
      </div>

      <textarea placeholder="Write a post" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      
      <div className="right_links"> 
          <div className="post_img">
            <input type="file" id="file" name="files[]" multiple onChange={(e) => {
              setImages(e.target.files[0])
            }}/>
            </div>
          <a href="#"><img src="/assets/media/dash/cal-icon.png" alt=""/></a>
           <a href="#"><img src="/assets/media/dash/game-icon.png" alt=""/></a> 
           <a href="#"><img src="/assets/media/dash/live-icon.png" alt=""/></a> 
           <a href="#"><img src="/assets/media/dash/twitter-icon.png" alt=""/></a>
            </div>
            <button onClick={(e) => {handleButton(e)}}>Submit</button>
      </form>
    
    
    <ul className="three_nav">
      <li><a href="#">For You</a></li>
      <li><a href="#">Following</a></li>
      <li><a href="#">Discover</a></li>
    </ul>
    
    
    <div className="for-you"> 
    {status === 'success' && (
    <div className="post"> 
      
      {data.map((post) => 
        <div key={post._id}>
          
      <div className="heads">
        <div className="user"><img src={post.user.profilePicUrl} alt=""/></div>
        <h4>{post.description}</h4>
      </div>
      <div className="left_details"> <a href="#"> <i className="fa fa-heart" aria-hidden="true"></i> <span>{post.likes.length}</span> </a> <a href="#"> <i className="fa fa-eye" aria-hidden="true"></i> <span>{post.views}</span> </a> <a href="#"> <i className="fa fa-commenting" aria-hidden="true"></i> <span>0</span> </a> </div>
      <div className="right_details">
        <div className="post_data"><img src={post.images} alt="" /></div>
        <div className="users_share_box">
          <div className="more_user"> <a href="#"><img src="/assets/media/dash/1.jpg" alt="user"/><span className="online"></span></a> <a href="#"><img src="/assets/media/dash/2.jpg" alt="user"/><span className="online"></span></a> <a href="#"><img src="/assets/media/dash/3.jpg" alt="user"/><span className="offiline"></span></a> <a href="#" className="more">+3</a> <span className="others">Ashwin, George and 5 others have liked your post.</span> </div>
          <div className="shere"> <a href="#"> <i className="fa fa-heart" aria-hidden="true"></i> <span>Like</span> </a> <a href="#"> <i className="fa fa-share-alt" aria-hidden="true"></i> <span>Share</span> </a>
            <div className="three_dots"><a href="#"> <i className="fa fa-ellipsis-v" aria-hidden="true"></i></a>
              <div className="three_dots_dropdown">
                <ul>
                  <li><a href="#">Edit</a></li>
                  <li><a href="#">Share to</a></li>
                  <li><a href="#">Copy Link</a></li>
                  <li><a href="#">Delete</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <CommentForm postId={post} /> 


      </div>
      </div>
      )}

    </div>
    
    )}    
      
    </div>
    
    
  </div>
  
  )
  }