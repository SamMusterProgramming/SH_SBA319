import React, { useEffect } from 'react'
import Post from '../post/Post'
import './Timeline.css'

const Timeline = (props) => {

 useEffect(() => {
  console.log(props.posts)
 }, [props.posts])
 

  return (
    <div className='timeline'>
        { props.posts.map((post,key)=> {
          return <Post post={post} key={key} user={props.user}/>
       })     
       }
    </div>
  )
}

export default Timeline
