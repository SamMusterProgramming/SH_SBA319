import React from 'react'
import './Post.css'

const Post = (props) => {
  return (       
    <div className='post'>
        <div className='postHeader'>
            <img src={require('../../assets/overlook.jpeg')} alt="" /> 
            <div className='desc'>
                <span style={{marginTop:10}}>{props.user.name}</span> 
                <p style={{fontSize:12}}>{props.post.desc}</p>
            </div>
        </div>   
        <div className='postBody'>
           <img src={require('../../assets/overlook.jpeg')} alt="" />
        </div>
        <div className='postFooter'>
            <button style={{border:null,cursor:'pointer'}} > <i  class="fa fa-thumbs-up">like</i></button>
            <button ><i class="fa fa-chat-dots"></i> Comments</button>
           <button ><i class="fa fa-share"></i> Share</button>   
        </div>
    </div>
  )
}
   
export default Post
