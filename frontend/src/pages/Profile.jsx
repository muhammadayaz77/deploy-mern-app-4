import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
let url = 'http://localhost:3000/profile';
function Profile() {
  let [loading,setLoading] = useState(false);
  let navigate = useNavigate();
  let [protect,setProtect] = useState(false);
  useEffect(()=> {
    let item = localStorage.getItem('token');
    if(item){
      setProtect(true);
    }else{
      setProtect(false);
      navigate('/login');
    }
  },[])
  let logout = () =>{
    localStorage.removeItem('token');
    navigate("/create");
}
  useEffect(()=>{
    setLoading(true);
    axios.get(url)
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
    .finally(()=>{
      setLoading(false);
    })
  },[])
  return (
    <>
    <button 
      onClick={logout}
      type="submit" className='bg-red-500 p-2 my-3 rounded-sm text-white block'>Logout</button>
      {
        loading ? <h1>loading</h1> : <h1>working</h1>
      }
    </>
  )
}

export default Profile