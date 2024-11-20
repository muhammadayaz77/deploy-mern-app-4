import React, { useEffect } from 'react'
import CreateAcc from './pages/CreateAcc'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import axios from 'axios';
import Profile from './pages/Profile';
function App() {
  useEffect(() => {
    // Assuming a token is stored in localStorage
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
        // Send token to the protected route in Express
        axios.get('http://localhost:3000/profile', {
            headers: {
                'Authorization': `Bearer ${token}` // Send the token in the Authorization header
            }
        })
        .then(response => {
            console.log(response.data); // Handle the response from the protected route
        })
        .catch(error => {
            console.error('Error accessing protected route:', error);
        });
    }
}, []);
  return (
    <>
    <Routes>
      <Route path='/create' element={<CreateAcc />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
    </>
  )
}

export default App