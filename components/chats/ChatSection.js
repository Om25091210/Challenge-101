import React, { useEffect, useState } from 'react';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';
import ChatBox from './ChatBox';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';

const ChatSection = ({
  user,
  chats,
  setChats,
  sendMessage,
  messages,
  messagesWith,
  isOnline
}) => {
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
              <ChatBox user={user} chats={chats} setChats={setChats} />
              <div className="card chat dlab-chat-history-box d-none">
                <div className="card-header chat-list-header text-center">
                  <a href="#!" className="dlab-chat-history-back">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="18px"
                      height="18px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <polygon points="0 0 24 0 24 24 0 24" />
                        <rect
                          fill="#000000"
                          opacity="0.3"
                          transform="translate(15.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-15.000000, -12.000000) "
                          x="14"
                          y="7"
                          width="2"
                          height="10"
                          rx="1"
                        />
                        <path
                          d="M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z"
                          fill="#000000"
                          fillRule="nonzero"
                          transform="translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997) "
                        />
                      </g>
                    </svg>
                  </a>

                  <div>
                    <h6 className="mb-1">Chat with {messager.name}</h6>
                    <p
                      className={
                        isOnline ? 'mb-0 text-success' : 'mb-0 text-failure'
                      }
                    >
                      Online
                    </p>
                  </div>

                  <div className="dropdown">
                    <a
                      href="#!"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x="0" y="0" width="24" height="24" />
                          <circle fill="#000000" cx="5" cy="12" r="2" />
                          <circle fill="#000000" cx="12" cy="12" r="2" />
                          <circle fill="#000000" cx="19" cy="12" r="2" />
                        </g>
                      </svg>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li className="dropdown-item">
                        <i className="fa fa-user-circle text-primary me-2"></i>{' '}
                        View profile
                      </li>
                      <li className="dropdown-item">
                        <i className="fa fa-users text-primary me-2"></i> Add to
                        btn-close friends
                      </li>
                      <li className="dropdown-item">
                        <i className="fa fa-plus text-primary me-2"></i> Add to
                        group
                      </li>
                      <li className="dropdown-item">
                        <i className="fa fa-ban text-primary me-2"></i> Block
                      </li>
                    </ul>
                  </div>
                </div>
                {!messages || messages.length === 0 ? null : (
                  <div>
                    {messages.map((message) => (
                      <ChatDisplay
                        message={message}
                        user={user}
                        messager={messager}
                      />
                    ))}
                  </div>
                )}
                <ChatInput sendMessage={sendMessage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
