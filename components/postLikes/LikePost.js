import baseURL from '../../utils/baseURL';
import { QueryClient, QueryClientProvider, useQuery, useMutation } from 'react-query'
import cookie from 'js-cookie'
import {useState} from 'react'


const queryClient = new QueryClient()

export default function LikePost({postId}){
  return(<QueryClientProvider client={queryClient} contextSharing={true}>
        <AddLike postId={postId}/>
    </QueryClientProvider>
  );
}

const AddLike = ({postId}) =>{

    const [like, setLike] = useState(false)

    const handleLike = (e) =>{
        e.preventDefault()
        mutate({like})
        setLike(true)
    }

    const addingLike = async() =>{
      const res = await fetch(`${baseURL}/api/posts/like/${postId}`,{
          method: "PUT",
          headers: {
            "Authorization": cookie.get('token')
          }
        })
    }

    const { mutate, isLoading, isError } = useMutation(addingLike)

      if(isLoading){
        return <p>Loading....</p>
      }
    
      if(isError){
        return <p>Something went wrong...</p>
      }


return(
    <a onClick={handleLike} > <i className="fa fa-heart" aria-hidden="true"></i> <span>Like</span> </a> 
)


}