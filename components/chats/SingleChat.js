import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getSender, getSenderFull } from '../../utils/chat';
import { useAppContext } from './ChatProvider';
import cookie from 'js-cookie';
import io from 'socket.io-client';
import axios from 'axios';
import ScrollableChat from './ScrollableChat';
import chatBaseURL from '@utils/chatBaseURL';
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, user, setFetchAgain }) => {
  const {
    selectedChat,
    setSelectedChat,
    notification,
    setNotification
  } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    console.log(selectedChat);
    try {
      setLoading(true);
      await axios
        .get(`${chatBaseURL}/api/v1/message/${selectedChat._id}`, {
          headers: {
            Authorization: cookie.get('token')
          }
        })
        .then((res) => setMessages(res.data));
      setLoading(false);
      socket.emit('join-chat', selectedChat._id);
    } catch (error) {
      toast.error(error);
    }
  };

  let x = {};
  const sendMessage = async (e) => {
    e.preventDefault();
    socket.emit('stop-typing', selectedChat._id);
    let formdata = {
      message: newMessage,
      chatId: selectedChat._id
    };
    try {
      await axios
        .post(`${chatBaseURL}/api/v1/message/`, formdata, {
          headers: {
            Authorization: cookie.get('token')
          }
        })
        .then((res) => (x = res.data));
      setNewMessage('');
      socket.emit('new-message', x);
      setMessages([...messages, x]);
    } catch (error) {
      toast.error(error);
    }
  };
  let REACT_APP_SOCKET_ENDPOINT = 'ws://localhost:8900';
  useEffect(() => {
    socket = io(REACT_APP_SOCKET_ENDPOINT);
    socket.emit('setup', user);

    socket.on('connected', () => setSocketConnected(true));

    socket.on('typing', () => setIsTyping(true));
    socket.on('stop-typing', () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on('message-received', (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // notification
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit('stop-typing', selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <div onClick={() => setSelectedChat('')} />
          {!selectedChat.isGroupChat ? (
            <>
              <p className="btn">{getSender(user, selectedChat.users)}</p>
            </>
          ) : (
            <>
              {selectedChat.chatName.toUpperCase()}
              <p>Group Chat</p>
            </>
          )}

          {loading ? (
            <p>Spinner</p>
          ) : (
            <div className="message">
              <ScrollableChat messages={messages} user={user} />
            </div>
          )}
          <form onSubmit={sendMessage}>
            {isTyping ? <div className="btn">Typing ...</div> : <></>}
            <input
              placeholder="Enter a message.."
              value={newMessage}
              required
              onChange={typingHandler}
              style={{ background: '#ddd', color: 'black' }}
            />
            <button type="submit" className="btn">
              <img src="/assets/media/dash/send.png" alt="" />
            </button>
          </form>
        </>
      ) : (
        <div className="btn">
          <p>Click On Users to Start Conversation</p>
        </div>
      )}
    </>
  );
};

export default SingleChat;
