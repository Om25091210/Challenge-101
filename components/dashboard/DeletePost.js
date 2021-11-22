import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query'
import cookie from 'js-cookie'
import { toast } from 'react-toastify';


const queryClient = new QueryClient()

export default function DeletePost({postId, setDeleteModal}){
  return(<QueryClientProvider client={queryClient} contextSharing={true}>
        <Delete_Post postId={postId} setDeleteModal={setDeleteModal}/>
    </QueryClientProvider>
  );
}

function Delete_Post({postId, setDeleteModal}){
   

    const del = async (postId) => {
        await axios.delete(`${baseURL}/api/posts/${postId}`,{
            headers: {
                Authorization: cookie.get('token'),
              },
        })
    }

    const { mutateAsync } = useMutation(del)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await mutateAsync(postId)
        queryClient.invalidateQueries()
        toast.success('Your post has been successfully deleted');
        window.setTimeout(function(){location.reload()},3000)
    }
    
    return (
        <>
       
           <div className="delete_post">
            <form  onSubmit={handleSubmit}>
            <div className="delete_post_div">
                <p>Are you Sure?</p>
                <button onClick={()=>setDeleteModal(false)} className="btn" >Cancel</button>
                <button type="submit" className="btn">Submit</button>
            </div>
            </form>
            <div className="overlay"></div>
            </div>
       
        </>
    )
}