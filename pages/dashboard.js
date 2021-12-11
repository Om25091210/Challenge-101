import axios from 'axios';
import cookie from 'js-cookie';
import io from 'socket.io-client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import baseURL from '../utils/baseURL';
import getUserInfo from '../utils/getUserInfo';
import MetaDash from '../components/MetaDash';
import SignedHeader from '../components/SignedHeader';
import LeftNav from '../components/LeftNav';
import SignedMainContent from '../components/dashboard/SignedMainContent';
import RightSection from '../components/RightSection';
import AllScript from './AllScript';

const scrollToBottom = (divRef) => {
  divRef.current && divRef.current.scrollIntoView({ behaviour: 'smooth' });
};

const Dashboard = ({ user }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/chats`, {
        headers: {
          Authorization: cookie.get('token')
        }
      })
      .then((res) => {
        console.log(res.data);
        setChats(res.data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const router = useRouter();
  const { chat } = router.query;

  if (chat === user._id) {
    router.push('/messages');
  }

  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const socket = useRef();

  const isOnline =
    connectedUsers.length > 0 &&
    connectedUsers.filter((user) => user.userId === chat.messagesWith).length >
      0;
  //
  const openChatId = useRef('');
  const divRef = useRef();
  //

  // ------------------------------------------------------------
  // Connecting to socket
  useEffect(() => {
    if (!socket.current) {
      socket.current = io(baseURL);
    }
    if (socket.current) {
      socket.current.emit('join', { userId: user._id });
      socket.current.on('connectedUsers', ({ users }) => {
        users.length > 0 && setConnectedUsers(users);
      });
    }
  }, []);

  // Loading message from socket
  useEffect(() => {
    const loadMessages = () => {
      socket.current.emit('loadMessages', {
        userId: user._id,
        messagesWith: chat
      });

      socket.current.on('messagesLoaded', ({ chat }) => {
        setMessages(chat.messages);
        openChatId.current = chat.messagesWith._id;
        divRef.current && scrollToBottom(divRef);
      });

      socket.current.on('noChatFound', async () => {
        const data = await getUserInfo(chat);
        if (data?.name && data?.profilePicUrl && loading === true) {
          const chatAlreadyExists = chats.find(
            (chatItem) => chatItem.messagesWith === chat
          );
          if (!chatAlreadyExists) {
            const newChat = {
              messagesWith: chat,
              name: data.name,
              profilePicUrl: data.profilePicUrl,
              lastMessage: '',
              date: Date.now()
            };
            setChats((prevState) => [newChat, ...prevState]);
          }
          setMessages([]);
          openChatId.current = router.query.chat;
        }
      });
    };

    if (socket.current && router.query.chat) {
      loadMessages();
    }
  }, [router.query.chat]);

  const sendMessage = (message) => {
    if (socket.current) {
      socket.current.emit('newMessage', {
        userId: user._id,
        receiver: openChatId.current || router.query.chat,
        message
      });
    }
  };

  // Receiving new messages from socket
  useEffect(() => {
    if (socket.current) {
      socket.current.on('messageSent', ({ newMessage }) => {
        if (newMessage.receiver === openChatId.current) {
          setMessages((prev) => [...prev, newMessage]);
          if (loading === false) {
            setChats((prev) => {
              console.log(prev);
              const previousChat = prev.find(
                (chat) => chat.messagesWith === newMessage.receiver
              );
              previousChat.lastMessage = newMessage.message;
              previousChat.date = newMessage.date;
              return [...prev];
            });
          }
        }
      });

      socket.current.on('newMessageReceived', async ({ newMessage }) => {
        let senderName;

        if (newMessage.sender === openChatId.current) {
          setMessages((prev) => [...prev, newMessage]);
          setChats((prev) => {
            const previousChat = prev.find(
              (chat) => chat.messagesWith === newMessage.sender
            );
            previousChat.lastMessage = newMessage.message;
            previousChat.date = newMessage.date;
            senderName = previousChat.name;
            return [...prev];
          });
        } else {
          const previouslyMessaged =
            chat.filter((chat) => chat.messagesWith === newMessage.sender)
              .length > 0;
          if (previouslyMessaged) {
            setChats((prev) => {
              const previousChat = prev.find(
                (chat) => chat.messagesWith === newMessage.sender
              );
              previousChat.lastMessage = newMessage.message;
              previousChat.date = newMessage.date;
              senderName = previousChat.name;
              return [...prev];
            });
          } else {
            const { name, profilePicUrl } = await getUserInfo(
              newMessage.sender
            );
            senderName = name;
            const newChat = {
              messagesWith: newMessage.sender,
              name,
              profilePicUrl,
              lastMessage: newMessage.message,
              date: newMessage.date
            };
            setChats((prev) => [newChat, ...prev]);
          }
        }
        messageNotification(senderName);
      });
    }
  }, []);

  useEffect(() => {
    messages.length > 0 && scrollToBottom(divRef);
  }, [messages]);
  // ------------------------------------------------------------

  return (
    <>
      <MetaDash />

      <SignedHeader
        user={user}
        messagesWith={chat}
        chats={chats}
        setChats={setChats}
        sendMessage={sendMessage}
        messages={messages}
        isOnline={isOnline}
      />

      <LeftNav />

      <SignedMainContent />

      <RightSection user={user} />

      <AllScript />
    </>
  );
};

export default Dashboard;
