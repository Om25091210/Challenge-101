import React, { useState, useEffect } from 'react';
import { useAppContext } from './ChatProvider';
// import ChatLoading from "./ChatLoading";
// import GroupChatModal from "./GroupChatModal";
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { getSender } from '../../utils/chat';
import cookie from 'js-cookie';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';
import chatBaseURL from '@utils/chatBaseURL';

const MyChats = ({ fetchAgain, user }) => {
  const { selectedChat, setSelectedChat, chats, setChats } = useAppContext();
  const fetchChats = async () => {
    try {
      await axios
        .get(`${chatBaseURL}/api/v1/chat`, {
          headers: {
            Authorization: cookie.get('token')
          }
        })
        .then((res) => setChats(res.data));
    } catch (error) {
      toast.error(error);
    }
  };
  console.log(chats);
  useEffect(() => {
    // setLoggedUser(getUserFromLocalStorage("user"));
    fetchChats();
  }, [fetchAgain]);
  return (
    <div>
      {chats ? (
        <div overflowY="scroll">
          {chats?.map((chat) => (
            <div
              className="btn"
              onClick={() => setSelectedChat(chat)}
              key={chat?._id}
            >
              <p>
                {!chat?.isGroupChat
                  ? getSender(user, chat?.users)
                  : chat?.chatName}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default MyChats;
