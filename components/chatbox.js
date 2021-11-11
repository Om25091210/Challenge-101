import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import baseURL from '../utils/baseURL';
import { useForm } from "react-hook-form";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

 export default function ChatBox(){
  return(<QueryClientProvider client={queryClient} contextSharing={true}>
        <WChatbox/>
    </QueryClientProvider>
  );
}

function WChatbox(req,res) {


  const [searchText, setSearchText] = useState('');

  const router = useRouter();

  const { data, isLoading, isSuccess } = useQuery(
    ['search', searchText],
    async () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      const promise = await axios.get(`${baseURL}/api/friendrequests/search/${searchText}`, {
        cancelToken: source.token,
      });

      promise.cancel = () => {
        source.cancel();
      };

      console.log(promise.data)
      return promise.data;
    },
    {
      enabled: !!searchText,
    }
  );


  return (


    
       <div className="chatbox">
        <div className="chatbox-close"></div>


        <div className="tab_box">
       
        <div className="tabs">
        <ul>
       
          <li className="active"><a href="#" rel="tab1">Chat</a></li>
     

        </ul>

        </div>  


        <div className="tab_data tab_data_scroll">
        
          <div className="chat tab" id="tab1">

            <div className="card mb-sm-3 mb-md-0 contacts_card dlab-chat-user-box">
            <div className="card-header chat-list-header text-center">
              <a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect fill="#000000" x="4" y="11" width="16" height="2" rx="1"/><rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) " x="4" y="11" width="16" height="2" rx="1"/></g></svg></a>



    <div className="relative flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
      <div className="max-w-lg w-full lg:max-w-xs">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            
          </div>
          <input
            id="search"
            name="search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            placeholder="Search for users and posts..."
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            autoComplete="off"
          />
          {searchText.trim() !== '' && !isLoading && isSuccess && (
            <div className="absolute top-14 w-full bg-white z-50 px-2 py-4 shadow-2xl rounded">
              <h1 className="text-sm font-semibold mb-2">Users</h1>
              <div className="flex flex-col space-y-2">
                {!data || data.length === 0 ? (
                  <p className="text-gray-400 text-xs">No users found..</p>
                ) : (
                  data.map((user) => (

            <ul className="contacts">
              <li className="active dlab-chat-user">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src="/assets/media/avatar/1.jpg" className="rounded-circle user_img" alt=""/>
                    <span className="online_icon"></span>
                  </div>
                  <div className="user_info">
                    <span> {user.name.length > 20
                          ? user.name.substring(0, 20) + '...'
                          : user.name}</span>
                  </div>
                </div>
                    <form action="" method="get" class="add_friend" >
            <input type="hidden" name="receiverName" className="receiverName" value="{{user.name}}"/>
            <input type="hidden" name="sender-name" className="sender-name" value="{{user.username}}"/>
            <button type="submit" onClick={addFriend('{{user.name}}')} className="btn add accept friend-add"><i class="fa fa-user"></i> Add Friend</button>
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
    </div>






              <div>
                <h6 className="mb-1">Chat List</h6>
                <p className="mb-0">Show All</p>
              </div>
              <a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg></a>
            </div>
           
            <ul className="contacts">
              <li className="name-first-letter">A</li>
              <li className="active dlab-chat-user">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src="/assets/media/avatar/1.jpg" className="rounded-circle user_img" alt=""/>
                    <span className="online_icon"></span>
                  </div>
                  <div className="user_info">
                    <span>Archie Parker</span>
                    <p>Kalid is online</p>
                  </div>
                </div>
              </li>
              <li className="dlab-chat-user">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src="/assets/media/avatar/2.jpg" className="rounded-circle user_img" alt=""/>
                    <span className="online_icon offline"></span>
                  </div>
                  <div className="user_info">
                    <span>Alfie Mason</span>
                    <p>Taherah left 7 mins ago</p>
                  </div>
                </div>
              </li>
              <li className="dlab-chat-user">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src="/assets/media/avatar/3.jpg" className="rounded-circle user_img" alt=""/>
                    <span className="online_icon"></span>
                  </div>
                  <div className="user_info">
                    <span>AharlieKane</span>
                    <p>Sami is online</p>
                  </div>
                </div>
              </li>
              <li className="dlab-chat-user">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src="/assets/media/avatar/4.jpg" className="rounded-circle user_img" alt=""/>
                    <span className="online_icon offline"></span>
                  </div>
                  <div className="user_info">
                    <span>Athan Jacoby</span>
                    <p>Nargis left 30 mins ago</p>
                  </div>
                </div>
              </li>
              <li className="name-first-letter">B</li>
              <li className="dlab-chat-user">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src="/assets/media/avatar/5.jpg" className="rounded-circle user_img" alt=""/>
                    <span className="online_icon offline"></span>
                  </div>
                  <div className="user_info">
                    <span>Bashid Samim</span>
                    <p>Rashid left 50 mins ago</p>
                  </div>
                </div>
              </li>
              <li className="dlab-chat-user">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src="/assets/media/avatar/1.jpg" className="rounded-circle user_img" alt=""/>
                    <span className="online_icon"></span>
                  </div>
                  <div className="user_info">
                    <span>Breddie Ronan</span>
                    <p>Kalid is online</p>
                  </div>
                </div>
              </li>
              <li className="dlab-chat-user">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src="/assets/media/avatar/2.jpg" className="rounded-circle user_img" alt=""/>
                    <span className="online_icon offline"></span>
                  </div>
                  <div className="user_info">
                    <span>Ceorge Carson</span>
                    <p>Taherah left 7 mins ago</p>
                  </div>
                </div>
              </li>
              <li className="name-first-letter">D</li>
              <li className="dlab-chat-user">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src="/assets/media/avatar/3.jpg" className="rounded-circle user_img" alt=""/>
                    <span className="online_icon"></span>
                  </div>
                  <div className="user_info">
                    <span>Darry Parker</span>
                    <p>Sami is online</p>
                  </div>
                </div>
              </li>
              <li className="dlab-chat-user">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src="/assets/media/avatar/4.jpg" className="rounded-circle user_img" alt=""/>
                    <span className="online_icon offline"></span>
                  </div>
                  <div className="user_info">
                    <span>Denry Hunter</span>
                    <p>Nargis left 30 mins ago</p>
                  </div>
                </div>
              </li>
              <li className="name-first-letter">J</li>
              <li className="dlab-chat-user">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src="/assets/media/avatar/5.jpg" className="rounded-circle user_img" alt=""/>
                    <span className="online_icon offline"></span>
                  </div>
                  <div className="user_info">
                    <span>Jack Ronan</span>
                    <p>Rashid left 50 mins ago</p>
                  </div>
                </div>
              </li>
              <li className="dlab-chat-user">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src="/assets/media/avatar/1.jpg" className="rounded-circle user_img" alt=""/>
                    <span className="online_icon"></span>
                  </div>
                  <div className="user_info">
                    <span>Jacob Tucker</span>
                    <p>Kalid is online</p>
                  </div>
                </div>
              </li>
              <li className="dlab-chat-user">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src="/assets/media/avatar/2.jpg" className="rounded-circle user_img" alt=""/>
                    <span className="online_icon offline"></span>
                  </div>
                  <div className="user_info">
                    <span>James Logan</span>
                    <p>Taherah left 7 mins ago</p>
                  </div>
                </div>
              </li>
              <li className="dlab-chat-user">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src="/assets/media/avatar/3.jpg" className="rounded-circle user_img" alt=""/>
                    <span className="online_icon"></span>
                  </div>
                  <div className="user_info">
                    <span>Joshua Weston</span>
                    <p>Sami is online</p>
                  </div>
                </div>
              </li>
              <li className="name-first-letter">O</li>
              <li className="dlab-chat-user">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src="/assets/media/avatar/4.jpg" className="rounded-circle user_img" alt=""/>
                    <span className="online_icon offline"></span>
                  </div>
                  <div className="user_info">
                    <span>Oliver Acker</span>
                    <p>Nargis left 30 mins ago</p>
                  </div>
                </div>
              </li>
              <li className="dlab-chat-user">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src="/assets/media/avatar/5.jpg" className="rounded-circle user_img" alt=""/>
                    <span className="online_icon offline"></span>
                  </div>
                  <div className="user_info">
                    <span>Oscar Weston</span>
                    <p>Rashid left 50 mins ago</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>


       <div className="card chat dlab-chat-history-box d-none">
              <div className="card-header chat-list-header text-center">
                <a href="javascript:void(0);" className="dlab-chat-history-back">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><polygon points="0 0 24 0 24 24 0 24"/><rect fill="#000000" opacity="0.3" transform="translate(15.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-15.000000, -12.000000) " x="14" y="7" width="2" height="10" rx="1"/><path d="M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z" fill="#000000" fillRule="nonzero" transform="translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997) "/></g></svg>
                </a>
                <div>
                  <h6 className="mb-1">Chat with Khelesh</h6>
                  <p className="mb-0 text-success">Online</p>
                </div>              
                <div className="dropdown">
                  <a href="javascript:void(0);" data-bs-toggle="dropdown" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg></a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li className="dropdown-item"><i className="fa fa-user-circle text-primary me-2"></i> View profile</li>
                    <li className="dropdown-item"><i className="fa fa-users text-primary me-2"></i> Add to btn-close friends</li>
                    <li className="dropdown-item"><i className="fa fa-plus text-primary me-2"></i> Add to group</li>
                    <li className="dropdown-item"><i className="fa fa-ban text-primary me-2"></i> Block</li>
                  </ul>
                </div>
              </div>
              <div className="card-body msg_card_body dlab-scroll" id="DLAB_W_Contacts_Body3">
                <div className="d-flex justify-content-start mb-4">
                  <div className="img_cont_msg">
                    <img src="/assets/media/dash/1.jpg" className="rounded-circle user_img_msg" alt=""/>
                  </div>
                  <div className="msg_cotainer">
                    Hi, how are you samim?
                    <span className="msg_time">8:40 AM, Today</span>
                  </div>
                </div>
                <div className="d-flex justify-content-end mb-4">
                  <div className="msg_cotainer_send">
                    Hi Khalid i am good tnx how about you?
                    <span className="msg_time_send">8:55 AM, Today</span>
                  </div>
                  <div className="img_cont_msg">
                <img src="/assets/media/dash/2.jpg" className="rounded-circle user_img_msg" alt=""/>
                  </div>
                </div>
                <div className="d-flex justify-content-start mb-4">
                  <div className="img_cont_msg">
                    <img src="/assets/media/dash/1.jpg" className="rounded-circle user_img_msg" alt=""/>
                  </div>
                  <div className="msg_cotainer">
                    I am good too, thank you for your chat template
                    <span className="msg_time">9:00 AM, Today</span>
                  </div>
                </div>
                <div className="d-flex justify-content-end mb-4">
                  <div className="msg_cotainer_send">
                    You are welcome
                    <span className="msg_time_send">9:05 AM, Today</span>
                  </div>
                  <div className="img_cont_msg">
                <img src="/assets/media/dash/2.jpg" className="rounded-circle user_img_msg" alt=""/>
                  </div>
                </div>
                <div className="d-flex justify-content-start mb-4">
                  <div className="img_cont_msg">
                    <img src="/assets/media/dash/1.jpg" className="rounded-circle user_img_msg" alt=""/>
                  </div>
                  <div className="msg_cotainer">
                    I am looking for your next templates
                    <span className="msg_time">9:07 AM, Today</span>
                  </div>
                </div>
                <div className="d-flex justify-content-end mb-4">
                  <div className="msg_cotainer_send">
                    Ok, thank you have a good day
                    <span className="msg_time_send">9:10 AM, Today</span>
                  </div>
                  <div className="img_cont_msg">
                    <img src="/assets/media/dash/2.jpg" className="rounded-circle user_img_msg" alt=""/>
                  </div>
                </div>
                <div className="d-flex justify-content-start mb-4">
                  <div className="img_cont_msg">
                    <img src="/assets/media/dash/1.jpg" className="rounded-circle user_img_msg" alt=""/>
                  </div>
                  <div className="msg_cotainer">
                    Bye, see you
                    <span className="msg_time">9:12 AM, Today</span>
                  </div>
                </div>
                <div className="d-flex justify-content-start mb-4">
                  <div className="img_cont_msg">
                    <img src="/assets/media/dash/1.jpg" className="rounded-circle user_img_msg" alt=""/>
                  </div>
                  <div className="msg_cotainer">
                    Hi, how are you samim?
                    <span className="msg_time">8:40 AM, Today</span>
                  </div>
                </div>
                <div className="d-flex justify-content-end mb-4">
                  <div className="msg_cotainer_send">
                    Hi Khalid i am good tnx how about you?
                    <span className="msg_time_send">8:55 AM, Today</span>
                  </div>
                  <div className="img_cont_msg">
                <img src="/assets/media/dash/2.jpg" className="rounded-circle user_img_msg" alt=""/>
                  </div>
                </div>
                <div className="d-flex justify-content-start mb-4">
                  <div className="img_cont_msg">
                    <img src="/assets/media/dash/1.jpg" className="rounded-circle user_img_msg" alt=""/>
                  </div>
                  <div className="msg_cotainer">
                    I am good too, thank you for your chat template
                    <span className="msg_time">9:00 AM, Today</span>
                  </div>
                </div>
                <div className="d-flex justify-content-end mb-4">
                  <div className="msg_cotainer_send">
                    You are welcome
                    <span className="msg_time_send">9:05 AM, Today</span>
                  </div>
                  <div className="img_cont_msg">
                <img src="/assets/media/dash/2.jpg" className="rounded-circle user_img_msg" alt=""/>
                  </div>
                </div>
                <div className="d-flex justify-content-start mb-4">
                  <div className="img_cont_msg">
                    <img src="/assets/media/dash/1.jpg" className="rounded-circle user_img_msg" alt=""/>
                  </div>
                  <div className="msg_cotainer">
                    I am looking for your next templates
                    <span className="msg_time">9:07 AM, Today</span>
                  </div>
                </div>
                <div className="d-flex justify-content-end mb-4">
                  <div className="msg_cotainer_send">
                    Ok, thank you have a good day
                    <span className="msg_time_send">9:10 AM, Today</span>
                  </div>
                  <div className="img_cont_msg">
                    <img src="/assets/media/dash/2.jpg" className="rounded-circle user_img_msg" alt=""/>
                  </div>
                </div>
                <div className="d-flex justify-content-start mb-4">
                  <div className="img_cont_msg">
                    <img src="/assets/media/dash/1.jpg" className="rounded-circle user_img_msg" alt=""/>
                  </div>
                  <div className="msg_cotainer">
                    Bye, see you
                    <span className="msg_time">9:12 AM, Today</span>
                  </div>
                </div>
              </div>
              <div className="card-footer type_msg">
                <div className="input-group">
                  <textarea className="form-control" placeholder="Type your message..."></textarea>
                  <div className="input-group-append">
                    <button type="button" className="btn btn-primary"><i className="fa fa-location-arrow"></i></button>
                  </div>
                </div>
              </div>
            </div>

       /** end user chat **/


          </div>
           
        


       

        </div>



         </div>


       </div>

     /** end chat box **/



  )
}


