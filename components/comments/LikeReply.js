import { useState } from "react";
import baseURL from "../../utils/baseURL";
import { QueryClient, QueryClientProvider, useMutation } from 'react-query'
import cookie from 'js-cookie'

const queryClient = new QueryClient()

export default function LikeReply({postId, commentId, replyId}){
  return(<QueryClientProvider client={queryClient} contextSharing={true}>
        <Like_Reply  postId={postId} commentId={commentId} replyId={replyId}/>
    </QueryClientProvider>
  );
}

const Like_Reply = ({postId, commentId, replyId}) => {
    const [likereplies, setLikeReplies] = useState(false)

    const likehandlesubmit = async (e) => {
    e.preventDefault()
    mutate({likereplies})
    setLikeReplies(true)
  }
  const addLikeComment = async() =>{
    const res = await fetch(`${baseURL}/api/comments/like/${postId}/${commentId}/${replyId._id}`,{
        method: "PUT",
        headers: {
          "Authorization": cookie.get('token')
        }
      })
  }

  const { mutate } = useMutation(addLikeComment)

  return (
    <div className="reply_like">
    <button onClick={likehandlesubmit}> 
    <img src="/assets/media/dash/fire.png" alt="" />{" "}
    <span>{replyId.likes.length}</span>
    </button>
  </div>
  )
}
