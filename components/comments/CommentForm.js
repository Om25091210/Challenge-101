import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { useMutation } from 'react-query';
import cookie from 'js-cookie';
import CommentList from '../comments/CommentList';

const CommentForm = ({ post }) => {
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
    const res = await fetch(`${baseURL}/api/comments/${post._id}`, {
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

  if (post) {
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
        <CommentList post={post} />
      </div>
    );
  } else {
    return null;
  }
};

export default CommentForm;
