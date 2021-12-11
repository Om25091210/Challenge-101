import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { useForm } from 'react-hook-form';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Link from 'next/link';

const ChatBox = ({ user, chats, setChats }) => {
  const [receiverName, setReceiverName] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [list, setList] = useState([]);

  const { register, handleSubmit } = useForm();

  const addFriend = async ({ receiverEmail, receiverName }) => {
    try {
      const res = await axios.post(`${baseURL}/api/friendrequests/search`, {
        user,
        receiverEmail,
        receiverName
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { data, isLoading, isSuccess } = useQuery(
    ['search', searchText],
    async () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      const promise = await axios.get(
        `${baseURL}/api/friendrequests/search/${searchText}`,
        {
          cancelToken: source.token
        }
      );

      promise.cancel = () => {
        source.cancel();
      };

      return promise.data;
    },
    {
      enabled: !!searchText
    }
  );

  async function getList({ user }) {
    return await fetch(`${baseURL}/api/friendrequests/list/${user._id}`)
      .then((data) => data.json())
      .finally(() => {
        setLoading(true);
      });
  }

  useEffect(() => {
    let mounted = true;
    getList({ user }).then((items) => {
      if (mounted) {
        setList(items);
      }
    });
    return () => (mounted = false);
  }, []);

  const addChat = ({ user }) => {
    const alreadyInChat =
      chats.length > 0 &&
      chats.filter((chat) => chat.messagesWith === user.friendId).length > 0;
    if (alreadyInChat) {
      router.push(`/dashboard?chat=${user.friendId}`);
    } else {
      const newChat = {
        messagesWith: user.friendId,
        name: user.friendName,
        profilePicUrl: user.profilePicUrl,
        lastMessage: '',
        date: Date.now()
      };
      setChats((prevState) => [newChat, ...prevState]);
      router.push(`/dashboard?chat=${user.friendId}`);
    }
    setChats('');
  };

  const userName = ({ user }) => {
    const result = user.friendUsername;
    return result;
  };

  const test = () => {
    jQuery(function ($) {
      jQuery('.dlab-chat-user-box').addClass('d-none');
      jQuery('.dlab-chat-history-box').removeClass('d-none');
    });
  };

  const isFriend = user.friendsList.filter((x) => !list.includes(x));

  return (
    <>
      <div className="card mb-sm-3 mb-md-0 contacts_card dlab-chat-user-box ">
        <div className="card-header chat-list-header text-center">
          <a href="#!">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              version="1.1"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <rect
                  fill="#000000"
                  x="4"
                  y="11"
                  width="16"
                  height="2"
                  rx="1"
                />
                <rect
                  fill="#000000"
                  opacity="0.3"
                  transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) "
                  x="4"
                  y="11"
                  width="16"
                  height="2"
                  rx="1"
                />
              </g>
            </svg>
          </a>

          <div>
            <h6 className="mb-1">Chat List</h6>
            <p className="mb-0">Show All</p>
          </div>
          <a href="#!">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              version="1.1"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <rect x="0" y="0" width="24" height="24" />
                <circle fill="#000000" cx="5" cy="12" r="2" />
                <circle fill="#000000" cx="12" cy="12" r="2" />
                <circle fill="#000000" cx="19" cy="12" r="2" />
              </g>
            </svg>
          </a>
        </div>
        <div className="card-header chat-list-header text-center">
          <div className="user_search">
            <input
              id="search"
              name="search"
              className=""
              placeholder="Search for users and posts..."
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              autoComplete="off"
            />
            {searchText.trim() !== '' && !isLoading && isSuccess && (
              <div className="search_result">
                <h2>Users</h2>
                <div className="flex flex-col space-y-2">
                  {!data || data.length === 0 ? (
                    <p>No users found..</p>
                  ) : (
                    data
                      .filter(
                        (resultuser) => resultuser.username !== user.username
                      )
                      .map((resultuser) => (
                        <ul className="contacts">
                          <li className="active dlab-chat-user ">
                            <div className="d-flex bd-highlight">
                              <div className="img_cont">
                                <img
                                  src={resultuser.profilePicUrl}
                                  className="rounded-circle user_img"
                                  alt=""
                                />
                                <span className="online_icon"></span>
                              </div>
                              <div className="user_info">
                                <span>
                                  {' '}
                                  {resultuser.name.length > 20
                                    ? resultuser.name.substring(0, 20) + '...'
                                    : resultuser.name}
                                </span>
                              </div>
                            </div>

                            <form
                              className="form w-100"
                              method="POST"
                              noValidate="novalidate"
                              onSubmit={handleSubmit(addFriend)}
                            >
                              <input
                                type="hidden"
                                name="receiverEmail"
                                {...register('receiverEmail')}
                                className="receiverEmail"
                                value={resultuser.email}
                              />
                              <input
                                type="hidden"
                                name="receiverName"
                                {...register('receiverName')}
                                className="receiverName"
                                value={resultuser.username}
                              />

                              <button
                                type="submit"
                                className="btn add accept friend-add"
                              >
                                <i className="fa fa-user"></i>
                                {isFriend.find(
                                  ({ friendId }) => friendId === resultuser._id
                                )
                                  ? 'Friends'
                                  : 'Add Friend'}
                              </button>
                            </form>
                          </li>
                        </ul>
                      ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          {!list || list.length === 0 ? (
            <p>No friends to chat..</p>
          ) : (
            <ul className="contacts">
              {list.map((user, index) => (
                <li
                  key={index}
                  className="active dlab-chat-user"
                  onClick={() => test()}
                >
                  <Link
                    as={`/dashboard`}
                    href={`/dashboard?chat=${user.friendId}`}
                    onClick={() => addChat({ user })}
                  >
                    <div className="d-flex bd-highlight">
                      <div className="img_cont">
                        <img
                          src={user.profilePicUrl}
                          className="rounded-circle user_img"
                          alt=""
                        />
                        <span className="online_icon"></span>
                      </div>
                      <div
                        className="user_info"
                        onClick={() => userName({ user })}
                      >
                        <span>{user.friendName}</span>
                        <p>{user.friendUsername} is online</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatBox;
