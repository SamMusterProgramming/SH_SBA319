import React from 'react'
import './Profile.css'
import axios from 'axios' 

const Profile = (props) => {

  
  const loadPosts = async(e)=> {
   await axios.get(`http://localhost:8080/posts/user/${props.user.id}`)
   .then((res) => { console.log(res.data); props.setPosts(res.data)})
  }

  return (
    <div className='profile'>
        <div className='header'> 
            <h3>{props.user.name}</h3>
            {/* {require(`${user.profile_img}`)}  */}
            <img src = {require('../../assets/2.png')} alt="" />
        </div>
        <p><span style={{fontWeight:100,fontSize:13}} >Profession</span> {props.user.profession}</p>
        <p><span style={{fontWeight:100,fontSize:13}} >City:</span> {props.user.city}</p>
        <p><span style={{fontWeight:100,fontSize:13}} >State:</span> {props.user.state}</p>
        <button onClick={(e)=>loadPosts()}> your posts</button>   
    </div>
  )      
}

export default Profile
