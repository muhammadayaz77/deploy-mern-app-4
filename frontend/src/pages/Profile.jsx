import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Profile() {
  let content = useRef();
  let [data,setData] = useState([]);
  let [post,setPost] = useState([]);
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
let fetchedData = () => {
  setLoading(true);
  const token = localStorage.getItem('token');
  if (token) {
      // Send token to the protected route in Express
      axios.get('http://localhost:3000/profile', {
          headers: {
              'Authorization': `Bearer ${token}` // Send the token in the Authorization header
          }
      })
      .then(response => {
        console.log(response.data.posts)
          setPost(response.data.posts); // Handle the response from the protected route
          setData(response.data)
      })
      .catch(error => {
          console.error('Error accessing protected route:', error);
      })
  }
  setLoading(false);
}
useEffect(() => {
  fetchedData();
}, []);
const handleCreateBtn = async (e) => {
  e.preventDefault(); // Prevent form refresh
  console.log(content.current.value)
  const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage

  if (!token) {
      console.log('User is not authenticated. Please log in.');
      return;
  }

  try {
      const response = await axios.post(
          'http://localhost:3000/post', // Your Express route URL
          { 
            content : content.current.value

           }, // Data sent in the request body
          {
              headers: {
                  Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
              },
          }
      );
      console.log(response.data); // Handle the response message
  } catch (error) {
      // Handle errors (e.g., network, validation, server errors)
      console.log(
          error.response?.data?.message || 'An error occurred while creating the post.'
      );
  }
  fetchedData();
};
  return (
    <>
    <button 
      onClick={logout}
      type="submit" className='bg-red-500 p-2 my-3 rounded-sm text-white block'>Logout</button>
      {
        loading == true ? <h1>loading</h1> : 
        <>
        <h1 className='text-3xl font-semibold'><span className='font-normal'>Hello,</span> {data.name} 👋</h1>
        <h2 className='text-sm mb-3 text-zinc-300'>You can create a new post.</h2>
        <form
        onSubmit={handleCreateBtn}
        action="">
        <textarea 
        ref={content}
        className='block bg-transparent border-[1px] border-zinc-600 text-sm w-[30%] p-2 my-3'
        name="content" id="" placeholder="What's on your mind ?"></textarea>
        <button type="submit" className='bg-blue-500 p-2 rounded-md'>Create New Post</button>
        </form>
        <h2 className='text-md mb-3 text-zinc-400 mt-10'>Your Posts.</h2>
        {
          post.slice().reverse().map(item => (
        <div className='p-4 w-[30%] bg-zinc-800 rounded-sm mb-4'>
          <p className='text-blue-500 text-sm'>@async</p>
          <h3 className='text-sm my-2 tracking-tight'>{item.content}</h3>
          <span className='text-blue-500 mr-3 text-sm'>Likes</span>
          <span className='text-zinc-400 text-sm' >edit</span>
        </div>
            
          ))
        }
        </>

      }
    </>
  )
}

export default Profile