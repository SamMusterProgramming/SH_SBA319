import React, { useState } from 'react'
import './Homepage.css'
import Profile from '../../components/profile/Profile'
import Timeline from '../../components/timeline/Timeline'

const Homepage = ({user}) => {
 
   const [posts,setPosts] = useState([])
   
  return (
    <div className='homepage'>
       <Profile user={user}  setPosts={setPosts}/>
      {posts ? <Timeline  user={user} posts={posts}/> : <></>}   
    </div>   
  )
}

export default Homepage
