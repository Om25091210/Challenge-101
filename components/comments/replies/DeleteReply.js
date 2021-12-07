import baseURL from '../../../utils/baseURL';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';

const queryClient = new QueryClient();

export default function DeleteReply({ postId, commentId, replyId }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Delete_Reply postId={postId} commentId={commentId} replyId={replyId} />
    </QueryClientProvider>
  );
}

const Delete_Reply = ({ postId, commentId, replyId }) => {
  const deletereply = async () => {
    await axios.delete(
      `${baseURL}/api/comments/${postId}/${commentId}/${replyId}`,
      {
        headers: {
          Authorization: cookie.get('token')
        }
      }
    );
  };

  const { mutateAsync } = useMutation(deletereply);

  const deletehandlesubmit = async (e) => {
    e.preventDefault();
    try {
      await mutateAsync(commentId);
      queryClient.invalidateQueries();
      toast.success('Your comment has been successfully deleted');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  return (
    <div className="delete_btn">
      <button onClick={deletehandlesubmit}>Delete</button>
    </div>
  );
};
