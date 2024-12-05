import React, { useEffect, useRef, useState } from 'react'
import "./Login.css"
import axios from "axios"

const Login = ({setUser}) => {
  
 let email = useRef() 
 let password = useRef()  
 
 const baseURL = "http://localhost:8080" ;
 const axiosApiUrl = axios.create({
    baseURL : baseURL 
  });  

 const handleSubmit= async(e)=> {    
    e.preventDefault();
    await axiosApiUrl.post('/users/login',
         {email:email.current.value,password:password.current.value}
      ).then(res => { if(res.status == 200) setUser(res.data) } )
 }
  

 
  return (
    <div className='wrapper'>
         <form  onSubmit={handleSubmit} className='form'>
                     <h3 style={{fontSize:25}} > Log In </h3>
                     <input type="email" name="email" placeholder="email" ref={email} defaultValue="samcoeur2020@gmail.com" />
                     <input type="password" name="password" ref={password} placeholder="password" 
                     defaultValue="samir"/>
                     <button type='submit'> LOGIN</button>    
                     <p> don't have account yet , register below</p>
                     <a href="/api/register"> REGISTER </a> 
        </form> 
    </div>
  )   

}

export default Login
