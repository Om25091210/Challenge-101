import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query'
import cookie from 'js-cookie'
import { toast } from 'react-toastify';


const CustomPost = ({post}) => {
    const [posts, setPosts] = useState([post])

    const [description, setDescription] = useState(posts[0].description);
    const [image, setImage] = useState(posts[0].images);

    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)

    // Delete a post
    const del = async (post) => {
        await axios.delete(`${baseURL}/api/posts/${post._id}`,{
            headers: {
                Authorization: cookie.get('token'),
              },
        })
    }

    const { mutateAsync } = useMutation(del)

    const deletehandleSubmit = async (e) => {
        e.preventDefault()
        try {
            await mutateAsync(post)
            queryClient.invalidateQueries()
            toast.success('Your post has been successfully deleted');
            window.setTimeout(function(){location.reload()},4000)
        } catch (err) {
            toast.error(err.response?.data?.msg || 'Please recheck your inputs')
        }
    }

    // EDIT A Post
    const mutation = useMutation(
        async (formData) => 
            await axios.put(`${baseURL}/api/posts/${post._id}`,formData,{
                headers: {
                    Authorization: cookie.get('token'),
                    'Content-Type': 'multipart/form-data',
                },
            })
     )

    const edithandleSubmit = async (e) =>{
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
            setEditModal(false)
            window.setTimeout(function(){location.reload()},4000)
        } catch(err){
            toast.error(err.response?.data?.msg || 'Please recheck your inputs')
        }
    }


    return (
        <>
            <div className="three_dots_dropdown">
                <ul>
                  <li><button onClick={()=> setEditModal(true)} >Edit</button></li>
                  <li><button onClick={()=> setDeleteModal(true)} >Delete</button></li>
                  <li><a href="#">Share to</a></li>
                  <li><a href="#">Copy Link</a></li>
                </ul>
            </div>
        
        { editModal && (
            <div className="edit_post">
            <form  onSubmit={edithandleSubmit}>
                <h4>Edit Post</h4>
                <button onClick={()=>setEditModal(false)} className="close" > X </button>
                
      <div className="team_slider">
        <ul className="user_slider">
          <li><img src="/assets/media/dash/user.jpg" alt=""/></li>              
        </ul>
      </div>

      <textarea placeholder="Edit a post" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      <div className="right_links d-flex edit_share"> 
          <div className="post_img">
            <input type="file" id="files" name="files[]" onChange={(e) => setImage(e.target.files[0])}
            accept="image/*" />
            </div>
          <a href="#"><img src="/assets/media/dash/cal-icon.png" alt=""/></a>
           <a href="#"><img src="/assets/media/dash/game-icon.png" alt=""/></a> 
           <a href="#"><img src="/assets/media/dash/live-icon.png" alt=""/></a> 
           <a href="#"><img src="/assets/media/dash/twitter-icon.png" alt=""/></a>
            </div>
            <button onClick={()=>setEditModal(false)} className="btn" >Cancel</button>
            <button type="submit" disabled={mutation.isLoading} className="btn">Submit</button>     
      </form>

      <div className="overlay"></div>
    </div>
        )}
        
        {deleteModal && (
            <div className="delete_post">
            <form  onSubmit={deletehandleSubmit}>
            <div className="delete_post_div">
                <p>Confirm on Deleting the Post?</p>
                <button onClick={()=>setDeleteModal(false)} className="btn" >Cancel</button>
                <button type="submit" className="btn">Confirm</button>
            </div>
            </form>
            <div className="overlay"></div>
            </div>
        )}

    </>
    )
}

export default CustomPost;
