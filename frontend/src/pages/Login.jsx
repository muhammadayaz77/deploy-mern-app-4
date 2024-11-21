import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
let url = 'http://localhost:3000';
function LoginAcc() {
  let navigate = useNavigate();
  let [data,setData] = useState({
    email : '',
    password : '',
  })
  let handleChange = e => {
    let {name,value} = e.target;
    setData({
      ...data,
      [name] : value
    })
  }

  let handleLogin = (e) => {
    e.preventDefault();
    console.log(data)
    axios.post(`${url}/login`,
      data
    )
    .then((response) => {
      localStorage.setItem('token',response.data.token)
      console.log(response);
    })
    .catch((error) => {
      console.log(error)
    })
  }
  return (
    <>
      <h1 className='text-2xl font-semibold mb-4'>Login Account</h1>
      <form onSubmit={handleLogin} action="">
      
        <input
        name='email'
        onChange={handleChange}
        className='bg-transparent px-4 py-2  border-[1px] focus:outline-none border-slate-500 mr-3 rounded-sm' type="text" placeholder='Email...' />
        <input
        name='password'
        onChange={handleChange}
        className='bg-transparent px-4 py-2  border-[1px] focus:outline-none border-slate-500 mr-3 rounded-sm' type="text" placeholder='Password...' />
        
        <input type="submit" className='bg-blue-500 p-2 rounded-sm' value="Login Account" />
      </form>
        </>
  )
}

export default LoginAcc