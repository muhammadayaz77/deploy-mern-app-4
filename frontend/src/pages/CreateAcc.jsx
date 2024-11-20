import React, { useState } from 'react'
import axios from 'axios'
let url = 'http://localhost:3000/create';
import {useNavigate} from 'react-router-dom'
function CreateAcc() {
  let navigate = useNavigate();
  let [data,setData] = useState({
    username : '',
    name : '',
    email : '',
    password : '',
    age : '',
  })
  let handleChange = e => {
    let {name,value} = e.target;
    setData({
      ...data,
      [name] : value
    })
  }

  let handleCreate = (e) => {
    e.preventDefault();
    axios.post(`${url}`,
      data
    )
    .then((response) => {
      navigate("/login");
      console.log(response);
      localStorage.setItem('token',response.data.token);
      navigate("/profile")
    })
    .catch((error) => {
      console.log(error)
    })
  }
  return (
    <div className='min-h-screen bg-zinc-900 text-white pt-5 pl-5'>
      <h1 className='text-2xl font-semibold mb-4'>Create Account</h1>
      <form onSubmit={handleCreate} action="">
        <input
        onChange={handleChange}
        name='username'
        className='bg-transparent px-4 py-2  border-[1px] focus:outline-none border-slate-500 mr-3 rounded-sm' type="text" placeholder='User Name...' />
        <input
        name='name'
        onChange={handleChange}
        className='bg-transparent px-4 py-2  border-[1px] focus:outline-none border-slate-500 mr-3 rounded-sm' type="text" placeholder='Name...' />
        <input
        name='email'
        onChange={handleChange}
        className='bg-transparent px-4 py-2  border-[1px] focus:outline-none border-slate-500 mr-3 rounded-sm' type="text" placeholder='Email...' />
        <input
        name='password'
        onChange={handleChange}
        className='bg-transparent px-4 py-2  border-[1px] focus:outline-none border-slate-500 mr-3 rounded-sm' type="text" placeholder='Password...' />
        <input
        name='age'
        onChange={handleChange}
        className='bg-transparent px-4 py-2  border-[1px] focus:outline-none border-slate-500 mr-3 rounded-sm' type="text" placeholder='Age...' />
        <input type="submit" className='bg-blue-500 p-2 rounded-sm' value="Create Account" />
      </form>
    </div>
  )
}

export default CreateAcc