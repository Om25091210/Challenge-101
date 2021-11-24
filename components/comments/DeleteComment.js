import baseURL from "../../utils/baseURL";
import { QueryClient, QueryClientProvider, useMutation } from 'react-query'
import cookie from 'js-cookie'
import { toast } from 'react-toastify';
import axios from "axios"

const queryClient = new QueryClient()

export default function DeleteComment({postId, commentId}){
  return(<QueryClientProvider client={queryClient} contextSharing={true}>
        <Delete_Comment  postId={postId} commentId={commentId}/>
    </QueryClientProvider>
  );
}

const Delete_Comment = ({postId, commentId}) => {

    const DeleteComment = async() =>{
        await axios.delete(`${baseURL}/api/comments/${postId}/${commentId._id}`,{
            headers: {
              Authorization: cookie.get('token'),
            }
          })
      }

    const { mutateAsync } = useMutation(DeleteComment)

    const deletehandlesubmit = async (e) => {
        e.preventDefault()
    try{
        await mutateAsync(commentId)
        queryClient.invalidateQueries()
        toast.success('Your comment has been successfully deleted');
    }catch (err) {
        toast.error(err.response?.data?.msg || 'Please recheck your inputs')
    }
  }
  

  return (
    <div className="delete_comment">
    <button onClick={deletehandlesubmit}> 
    Delete
    </button>
  </div>
  )
}
