import React from 'react';
import { useAppContext } from './ChatProvider';
import SingleChat from './SingleChat';

const ChatDisplay = ({ fetchAgain, setFetchAgain, user }) => {
  return (
    <>
      <div
        className="card-body msg_card_body dlab-scroll"
        id="DLAB_W_Contacts_Body3"
      >
        <SingleChat
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          user={user}
        />
      </div>
    </>
  );
};

export default ChatDisplay;
