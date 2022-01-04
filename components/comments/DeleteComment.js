import baseURL from '../../utils/baseURL';
import { useMutation } from 'react-query';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';


function refreshPage() {
  setTimeout(function () {
    window.location.reload(false);
  }, 5000);
}

const Delete_Comment = ({ postId, commentId }) => {

  const DeleteComment = async () => {
    await axios.delete(`${baseURL}/api/comments/${postId}/${comment._id}`, {
      headers: {
        Authorization: cookie.get('token')
      }
    });
  };

  const { mutateAsync } = useMutation(DeleteComment);

  const deletehandlesubmit = async (e) => {
    e.preventDefault();
    try {
      await mutateAsync(comment);
      queryClient.invalidateQueries();
      toast.success('Your comment has been successfully deleted');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }

    refreshPage();
  };

  return (
    <div className="delete_comment">
      <button onClick={deletehandlesubmit}>Delete</button>
    </div>
  );
};

export default Delete_Comment;
