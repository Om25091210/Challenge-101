import axios from 'axios';
import { formatDistanceToNowStrict } from 'date-fns';
import cookie from 'js-cookie';
import baseURL from '@utils/baseURL';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export const NotificationItem = () => {
  const [notify, setNotify] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/notifications`, {
        headers: {
          Authorization: cookie.get('token')
        }
      })
      .then((res) => {
        setNotify(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = async () => {
    await fetch(`${baseURL}/api/notifications`, {
      method: 'POST',
      headers: {
        authorization: cookie.get('token')
      }
    });
  };

  return (
    <div>
      <a href="#">
        {' '}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g data-name="Layer 2" transform="translate(-2 -2)">
            <path
              id="Path_20"
              data-name="Path 20"
              d="M22.571,15.8V13.066a8.5,8.5,0,0,0-7.714-8.455V2.857a.857.857,0,0,0-1.714,0V4.611a8.5,8.5,0,0,0-7.714,8.455V15.8A4.293,4.293,0,0,0,2,20a2.574,2.574,0,0,0,2.571,2.571H9.8a4.286,4.286,0,0,0,8.4,0h5.23A2.574,2.574,0,0,0,26,20,4.293,4.293,0,0,0,22.571,15.8ZM7.143,13.066a6.789,6.789,0,0,1,6.78-6.78h.154a6.789,6.789,0,0,1,6.78,6.78v2.649H7.143ZM14,24.286a2.567,2.567,0,0,1-2.413-1.714h4.827A2.567,2.567,0,0,1,14,24.286Zm9.429-3.429H4.571A.858.858,0,0,1,3.714,20a2.574,2.574,0,0,1,2.571-2.571H21.714A2.574,2.574,0,0,1,24.286,20a.858.858,0,0,1-.857.857Z"
            />
          </g>
        </svg>{' '}
        <span className="pop">{notify.length}</span>
      </a>

      <div className="drop_down_bg bell_drop_down">
        <ul className="notif_box bellHight">
          <div>
            {!notify || notify.length === 0 ? (
              <h3>No Notifications...</h3>
            ) : (
              <div>
                {' '}
                {notify.map((notification) => (
                  <li className="notif_tag">
                    {notification.type === 'comment' ? (
                      <>
                        <span className="notif_img">
                          <img src={notification.user.profilePicUrl} />
                        </span>{' '}
                        <span className="notif_name">
                          <a
                            href={`/${notification.user.username}`}
                            onClick={handleClick}
                          >
                            {notification.user.username}
                          </a>{' '}
                          left a comment on{' '}
                          <a
                            href={`/posts/${notification.post._id}`}
                            onClick={handleClick}
                          >
                            {notification.post.description}
                          </a>
                          {/* don't have data in text */}
                          <p>{notification.text}</p>
                          <p>
                            {formatDistanceToNowStrict(
                              new Date(notification.date),
                              {
                                addSuffix: true
                              }
                            )}
                          </p>
                        </span>
                      </>
                    ) : notification.type === 'reply' ? (
                      <>
                        <span className="notif_img">
                          <img src={notification.user.profilePicUrl} />
                        </span>{' '}
                        <span className="notif_name">
                          <a
                            href={`/${notification.user.username}`}
                            onClick={handleClick}
                          >
                            {notification.user.username}
                          </a>{' '}
                          replied to your comment on{' '}
                          <a
                            href={`/posts/${notification.post._id}`}
                            onClick={handleClick}
                          >
                            {notification.post.description}
                          </a>
                          {/* replies is not available */}
                          <p>{notification.text}</p>
                          <p>
                            {formatDistanceToNowStrict(
                              new Date(notification.date),
                              {
                                addSuffix: true
                              }
                            )}
                          </p>
                        </span>
                      </>
                    ) : notification.type === 'follow' ? (
                      <>
                        <span className="notif_img">
                          <img src={notification.user.profilePicUrl} />
                        </span>{' '}
                        <span className="notif_name">
                          <a
                            href={`/${notification.user.username}`}
                            onClick={handleClick}
                          >
                            {notification.user.username}
                          </a>{' '}
                          started following you
                          <p>
                            {formatDistanceToNowStrict(
                              new Date(notification.date),
                              {
                                addSuffix: true
                              }
                            )}
                          </p>
                        </span>
                      </>
                    ) : notification.type === 'like' ? (
                      <>
                        <span className="notif_img">
                          <img src={notification.user.profilePicUrl} />
                        </span>{' '}
                        <span className="notif_name">
                          <Link
                            href={`/${notification.user.username}`}
                            onClick={handleClick}
                          >
                            <a>{notification.user.username}</a>
                          </Link>{' '}
                          liked your post on{' '}
                          <a
                            href={`/posts/${notification.post._id}`}
                            onClick={handleClick}
                          >
                            {notification.post.description}
                          </a>
                          <p>
                            {formatDistanceToNowStrict(
                              new Date(notification.date),
                              {
                                addSuffix: true
                              }
                            )}
                          </p>
                        </span>
                      </>
                    ) : notification.type === 'badge' ? (
                      <>
                        <span className="notif_img">
                          <img src={notification.user.profilePicUrl} />
                        </span>{' '}
                        <span className="notif_name">
                          You have been awarded the{' '}
                          <span>
                            {/* Badge is not available */}
                            {notification.text} badge
                          </span>
                          .
                          <p>
                            {formatDistanceToNowStrict(
                              new Date(notification.date),
                              {
                                addSuffix: true
                              }
                            )}
                          </p>
                        </span>
                      </>
                    ) : null}
                  </li>
                ))}
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default NotificationItem;
