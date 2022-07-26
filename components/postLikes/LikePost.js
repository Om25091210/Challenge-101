import baseURL from '../../utils/baseURL';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import cookie from 'js-cookie';
import { useState } from 'react';

const queryClient = new QueryClient();

export default function LikePost({ postId, isLiked }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <AddLike postId={postId} isLiked={isLiked} />
    </QueryClientProvider>
  );
}

const AddLike = ({ postId, isLiked }) => {
  const [like, setLike] = useState(isLiked);

  const handleLike = (e) => {
    e.preventDefault();
    mutate({ like });
    setLike(!like);
  };

  const addingLike = async () => {
    const res = await fetch(`${baseURL}/api/posts/like/${postId}`, {
      method: 'PUT',
      headers: {
        Authorization: cookie.get('token')
      }
    });
  };

  const { mutate } = useMutation(addingLike);

  return (
    <a onClick={handleLike} href="#!">
      {like ? (
        <>
          <i
            className="fa fa-heart"
            aria-hidden="true"
            style={{ color: 'red' }}
          ></i>
          <span>Liked</span>
        </>
      ) : (
        <>
          <i className="fa fa-heart-o" aria-hidden="true"></i>
          <span>Like</span>
        </>
      )}
    </a>
  );
};
