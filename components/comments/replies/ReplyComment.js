import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../../utils/baseURL';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';

const queryClient = new QueryClient();

export default function ReplyComment({ postId, commentId }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Reply_Comment postId={postId} commentId={commentId} />
    </QueryClientProvider>
  );
}

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

  const { mutate, isLoading, isError } = useMutation(addreply, {
    onSuccess: (successData) => {
      console.log(successData);
    }
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong...</p>;
  }

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
          ></textarea>
          <button onClick={() => setReplyModal(false)}>Cancel</button>
          <button onClick={replyhandle}>Submit</button>
        </form>
      )}
    </>
  );
};
