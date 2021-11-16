import { useEffect, useState,  } from 'react'
import axios from 'axios';
import baseURL from '../../utils/baseURL';

const CommentList = ({postList}) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
      axios.get(`${baseURL}/api/comments/${postList}`)
        .then(res => {
          console.log(res)
          setComments(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }, [])
    
    return (
      <div>
      
          <div className="post_comments">
            <div className="pop_comment">Popular Comments</div>
          {comments.map((comment) =>
              <div key={comment._id}>
                  
          <div className="comments_point">
              <div className="fire"><img src="/assets/media/dash/fire.png" alt=""/> <span>{comment.likes.length}</span></div>
              <div className="user"><img src="/assets/media/dash/user.jpg" alt=""/></div>
              <h3>{comment.text}</h3>
              <a href="#" className="create">{comment.user.name}</a> <span className="days">2 days ago</span> <a href="#" className="pinned">Pinned by Creator</a> </div>
              </div>
          )}
          </div>
      
       <p>Thank you everyone for all of your support.</p>
          <div className="loadmore"><a href="#">Load comments <i className="fa fa-angle-down"
                                      aria-hidden="true"></i></a></div>
  </div>
    )
}

export default CommentList;