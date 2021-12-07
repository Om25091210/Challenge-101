import React from 'react';

const ChatDisplay = ({ user, message, messager }) => {
  const isUserSender = message.sender === user._id;
  return (
    <>
      <div
        className="card-body msg_card_body dlab-scroll"
        id="DLAB_W_Contacts_Body3"
      >
        <div className={`${isUserSender ? 'sender_box' : 'receiver_box'}`}>
          <div className="img_cont_msg">
            <img
              src={
                isUserSender === true
                  ? user.profilePicUrl
                  : messager.profilePicUrl
              }
              className="rounded-circle user_img_msg"
              alt=""
            />
          </div>
          <div
            className={`${isUserSender ? 'msg_cotainer_send' : 'msg_cotainer'}`}
          >
            <h4>{message.message}</h4>
            <span className={`${isUserSender ? 'msg_time_send' : 'msg_time'}`}>
              {message.date}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatDisplay;
