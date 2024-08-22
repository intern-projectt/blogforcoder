import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const [users, setUsers] = useState([])
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();


    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = () => {
        axios
        .get('http://localhost:3000/api2/v2/register')
        .then((res) => {
            console.log(res.data)
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        axios
        .post('http://localhost:3000/api2/v2/register', { email, username, password })
        .then(() => {
            alert('Registration Successful')
            setEmail('')
            setUsername('')
            setPassword('')
            fetchUsers();
            navigate('/login')
        })
        .catch((error) => {
            console.log('Unable to register user')
        })

    }

  return (
    <div className='w-full h-screen flex justify-center'>
        <div className='w-full h-screen bg-[#1a1a1a] text-white flex justify-center items-center p-4'>
    <form 
        className='text-center border rounded-lg w-full max-w-md p-6 bg-gray-800'
        onSubmit={handleSubmit}
    >
        {/* Email Input */}
        <label className='block text-left mb-2'>Email</label>
        <input 
            className='w-full h-[40px] rounded-xl bg-zinc-700 p-2 mb-4'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        
        {/* Username Input */}
        <label className='block text-left mb-2'>Username</label>
        <input 
            className='w-full h-[40px] rounded-xl bg-zinc-700 p-2 mb-4'
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        
        {/* Password Input */}
        <label className='block text-left mb-2'>Password</label>
        <input 
            className='w-full h-[40px] rounded-xl bg-zinc-700 p-2 mb-4'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        
        {/* Button */}
        <button 
            className='w-full h-[50px] rounded-xl border bg-teal-700 text-white hover:bg-teal-900'
            type='submit'
        >
            Sign Up
        </button>
    </form>
</div>

        {/* <div className='w-[50%] h-[100%] flex justify-center items-center bg-teal-800'>
            <h2 className='text-3xl text-white'>Sign Up</h2>
        </div> */}
    </div>
  )
}

export default SignUp