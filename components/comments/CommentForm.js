import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation
} from 'react-query';
import cookie from 'js-cookie';
import CommentList from '../comments/CommentList';

const queryClient = new QueryClient();

export default function CommentForm({ postId }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <AddComment postId={postId} />
    </QueryClientProvider>
  );
}

const AddComment = ({ postId }) => {
  const [comment, setComment] = useState([]);

  const onChange = (e) => {
    setComment(e.target.value);
  };

  const handleButtonForm = () => {
    mutate({ comment });
    setComment('');
  };

  //console.log(postId)

  const addingComment = async () => {
    const res = await fetch(`${baseURL}/api/comments/${postId._id}`, {
      method: 'POST',
      body: JSON.stringify({
        comment
      }),
      headers: {
        'Content-type': 'application/json',
        Authorization: cookie.get('token')
      }
    });
    return res.json();
  };

  const { mutate } = useMutation(addingComment, {
    onSuccess: (successData) => {
      console.log(successData);
    }
  });

  return (
    <div>
      <form className="add_comment_box" onSubmit={(e) => e.preventDefault()}>
        <div className="add_comments">
          <div className="user">
            <img src="/assets/media/dash/user.jpg" alt="" />
          </div>
          <textarea
            placeholder="Add a comment"
            name="text"
            value={comment}
            onChange={onChange}
            required
          ></textarea>
          <a href="#" className="gif">
            GIF
          </a>{' '}
          <a href="#" className="smile">
            <img src="/assets/media/dash/smile.png" alt="" />
          </a>{' '}
        </div>
        <button onClick={handleButtonForm}>
          <img src="/assets/media/dash/send.png" alt="" />
        </button>
      </form>
      <CommentList postList={postId} />
    </div>
  );
};
