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
import { toast } from 'react-toastify';

const queryClient = new QueryClient();

export default function SharePost({ postId, isShared }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Post_share postId={postId} isShared={isShared} />
    </QueryClientProvider>
  );
}

const Post_share = ({ postId, isShared }) => {
  const [share, setShare] = useState(false);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleShare = (e) => {
    e.preventDefault();
    mutate({ share });
    setShare(true);
    refreshData();
  };

  const addingShare = async () => {
    const res = await fetch(`${baseURL}/api/posts/share/${postId}`, {
      method: 'PUT',
      headers: {
        Authorization: cookie.get('token')
      }
    });
    if (isShared !== true) {
      toast.success('Shared in your timeline successfully');
    } else {
      toast.success('Removed from your timeline');
    }
  };

  const { mutate } = useMutation(addingShare);

  return (
    <a onClick={handleShare}>
      {isShared === true ? (
        <>
          <i
            className="fa fa-share-alt"
            style={{ color: 'lightgreen' }}
            aria-hidden="true"
          ></i>
          <span>Shared</span>
        </>
      ) : (
        <>
          <i className="fa fa-share-alt" aria-hidden="true"></i>{' '}
          <span>Share</span>
        </>
      )}
    </a>
  );
};
