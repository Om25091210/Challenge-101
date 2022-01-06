import baseURL from '../../../utils/baseURL';
import { useMutation } from 'react-query';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';

const Delete_Reply = ({ post, comment, replyId, user }) => {
  const deletereply = async () => {
    await axios.delete(
      `${baseURL}/api/comments/${post._id}/${comment._id}/${replyId}`,
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
      await mutateAsync(comment._id);
      queryClient.invalidateQueries();
      toast.success('Your comment has been successfully deleted');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  return (
    <div className="delete_btn">
      {comment.replies.map((x) => x.user._id) === user._id ? (
        <button onClick={deletehandlesubmit}>Delete</button>
      ) : (
        []
      )}
    </div>
  );
};

export default Delete_Reply;
