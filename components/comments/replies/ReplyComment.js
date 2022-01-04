import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../../utils/baseURL';
import { useMutation } from 'react-query';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';


const Reply_Comment = ({ postId, commentId }) => {
  const [reply, setReply] = useState('');
  const [replyModal, setReplyModal] = useState(false);

  const onChange = (e) => {
    setReply(e.target.value);
  };

  const replyhandle = () => {
    mutate({ reply });
    setReply('');
    setReplyModal(false);
  };

  const addreply = async () => {
    const res = await fetch(`${baseURL}/api/comments/${postId}/${commentId}`, {
      method: 'POST',
      body: JSON.stringify({
        reply
      }),
      headers: {
        'Content-type': 'application/json',
        Authorization: cookie.get('token')
      }
    });
    return res.json();
  };

  const { mutate } = useMutation(addreply, {
    onSuccess: (successData) => {
      console.log(successData);
    }
  });

  return (
    <>
      <div className="reply_comment">
        {' '}
        <button onClick={() => setReplyModal(true)}>Reply</button>
      </div>

      {replyModal && (
        <form onSubmit={(e) => e.preventDefault()}>
          <textarea
            placeholder="Add a reply"
            name="text"
            value={reply}
            onChange={onChange}
            required
          ></textarea>
          <button onClick={() => setReplyModal(false)}>Cancel</button>
          <button onClick={replyhandle}>Submit</button>
        </form>
      )}
    </>
  );
};

export default Reply_Comment;
