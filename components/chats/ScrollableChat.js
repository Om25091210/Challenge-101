import React, { useRef, useEffect } from 'react';
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser
} from '../../utils/chat';

const ScrollableChat = ({ messages, user }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: 'flex' }} key={m._id}>
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? '#ddd' : '#202028'
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: '20px',
                padding: '5px 15px',
                maxWidth: '75%'
              }}
            >
              {m.message}
            </span>
          </div>
        ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ScrollableChat;
