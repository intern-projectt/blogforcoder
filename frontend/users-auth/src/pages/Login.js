import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../components/contexts/UserContext';
import './login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api2/v2/login', { email, password });
            const { token, user } = response.data;

            console.log('response data:', response.data); 
            console.log('User data:', user); 
            alert('Login successful');
            setEmail('');
            setPassword('');
            setUser(user); // Update context with user data
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user)); // Store user data
            navigate('/'); // Navigate to Account page
        } catch (error) {
            console.log('Login Error', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className='w-full h-screen flex justify-center'>
            <div className='w-[100%] h-[100%] bg-[#1a1a1a] text-white flex justify-center items-center'>
                <form 
                    className='text-center h-auto p-5 mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl form'
                    onSubmit={handleLogin}
                >
                    <label className='block text-left'>Email</label>
                    <input 
                        className='w-full h-[40px] rounded-xl bg-zinc-700 p-2 mb-4'
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className='block text-left'>Password</label>
                    <input 
                        className='w-full h-[40px] rounded-xl bg-zinc-700 p-2 mb-4'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                        className='w-full h-[50px] rounded-xl border bg-teal-700 text-white hover:bg-teal-900'
                        type='submit'
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
