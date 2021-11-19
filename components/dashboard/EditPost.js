import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { QueryClient, QueryClientProvider, useMutation, useQuery } from 'react-query'
import cookie from 'js-cookie'
import { toast } from 'react-toastify';
var FormData = require('form-data');

const queryClient = new QueryClient()

export default function EditPost({postId}){
  return(<QueryClientProvider client={queryClient} contextSharing={true}>
        <Edit_Post postId={postId} />
    </QueryClientProvider>
  );
}

const Edit_Post = ({postId}) => {
    const [posts, setPosts] = useState([postId])
    const [myModal, setMyModal] = useState(false)

    const { data } = useQuery(['posts', postId._id], () => postId);    
    const [description, setDescription] = useState(posts[0].description);
    const [image, setImage] = useState(posts[0].images);
    // console.log(posts[0].description)

    const mutation = useMutation(
        async (formData) => 
            await axios.put(`${baseURL}/api/posts/${postId._id}`,formData,{
                headers: {
                    Authorization: cookie.get('token'),
                    'Content-Type': 'multipart/form-data',
                },
            })
     )

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const formData = new FormData()

        if(description.trim() === ''){
            return toast.error('Please add a description')
        }

        formData.append('description', description)
        formData.append('image',image)

        try{
            await mutation.mutateAsync(formData)
            toast.success("Successs")
            setMyModal(false)
            window.setTimeout(function(){location.reload()},4000)
        } catch(err){
            toast.error(err.response?.data?.msg || 'Please recheck your inputs')
        }
    }

    return (
        <>
        <div>
        <button onClick={()=> setMyModal(true)} >Edit</button>
        </div>
        { myModal && (
            <div>
            <form  className="edit_post" onSubmit={handleSubmit}>
                <h4>Edit Post</h4>
                <button onClick={()=>setMyModal(false)} className="close" > X </button>

                
      <div className="team_slider">
        <ul className="user_slider">
          <li><img src="/assets/media/dash/user.jpg" alt=""/></li>
          <li><img src="/assets/media/dash/user.jpg" alt=""/></li>
          <li><img src="/assets/media/dash/user.jpg" alt=""/></li>
          <li><img src="/assets/media/dash/user.jpg" alt=""/></li>        
        </ul>
      </div>

      <textarea placeholder="Edit a post" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      {/* <div className="post_data"><img src={image} alt="" /></div>    */}
      <div className="right_links"> 
          <div className="post_img">
            <input type="file" id="file" name="files[]" onChange={(e) => setImage(e.target.files[0])}
            accept="image/*" />
            </div>
          <a href="#"><img src="/assets/media/dash/cal-icon.png" alt=""/></a>
           <a href="#"><img src="/assets/media/dash/game-icon.png" alt=""/></a> 
           <a href="#"><img src="/assets/media/dash/live-icon.png" alt=""/></a> 
           <a href="#"><img src="/assets/media/dash/twitter-icon.png" alt=""/></a>
            </div>
            <button onClick={()=>setMyModal(false)} >Cancel</button>
            <button type="submit" disabled={mutation.isLoading}>Submit</button>
      </form>

      <div className="overlay"></div>

        </div>
        )}
        
        </>
    )
}