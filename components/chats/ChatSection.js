import React, { useEffect, useState } from 'react';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';
import ChatBox from './ChatBox';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import dynamic from 'next/dynamic';

const ChatEngine = dynamic(() =>
  import('react-chat-engine').then((module) => module.ChatEngine)
);
const MessageFormSocial = dynamic(() =>
  import('react-chat-engine').then((module) => module.MessageFormSocial)
);

const ChatSection = ({ user, messagesWith }) => {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (typeof document !== undefined) {
      setShowChat(true);
    }
  }, []);

  const [messager, setMessager] = useState({});

  useEffect(() => {
    if (messagesWith != undefined) {
      axios
        .get(`${baseURL}/api/chats/user/${messagesWith}`, {
          headers: {
            Authorization: cookie.get('token')
          }
        })
        .then((res) => {
          setMessager(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [messagesWith]);

  return (
    <div>
      <div className="chatbox">
        <div className="chatbox-close"></div>

        <div className="tab_box">
          <div className="tabs">
            <ul>
              <li className="active">
                <a href="#" rel="tab1">
                  Chat
                </a>
              </li>
            </ul>
          </div>

          <div className="tab_data tab_data_scroll">
            <div className="chat tab" id="tab1">
              {!showChat ? (
                <div />
              ) : (
                <ChatEngine
                  projectID={process.env.NEXT_PUBLIC_CHAT_ENGINEIO_PUBLIC_KEY}
                  userName={user.email}
                  userSecret={user.email}
                  renderNewMessageForm={() => <MessageFormSocial />}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
