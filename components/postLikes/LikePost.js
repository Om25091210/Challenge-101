import baseURL from '../../utils/baseURL';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation
} from 'react-query';
import cookie from 'js-cookie';
import { useState } from 'react';
import { useRouter } from 'next/router';

const queryClient = new QueryClient();

export default function LikePost({ postId, isLiked }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <AddLike postId={postId} isLiked={isLiked} />
    </QueryClientProvider>
  );
}

const AddLike = ({ postId, isLiked }) => {
  const [like, setLike] = useState(false);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleLike = (e) => {
    e.preventDefault();
    mutate({ like });
    setLike(true);
    refreshData();
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
    <a onClick={handleLike} href="javascript:void(0)">
      {isLiked === true ? (
        <>
          <i
            className="fa fa-heart"
            style={{ color: 'red' }}
            aria-hidden="true"
          ></i>{' '}
          <span>Liked</span>
        </>
      ) : (
        <>
          <i className="fa fa-heart" aria-hidden="true"></i> <span>Like</span>
        </>
      )}
    </a>
  );
};
