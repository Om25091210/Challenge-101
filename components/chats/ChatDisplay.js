import React from 'react';
import { useAppContext } from './ChatProvider';
import SingleChat from './SingleChat';

const ChatDisplay = ({ fetchAgain, setFetchAgain, user }) => {
  return (
    <>
      <div>
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
