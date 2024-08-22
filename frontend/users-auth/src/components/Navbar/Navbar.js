import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./navbar.css"
import Blogimg from "./blogimg.jpg"
import { useUser } from '../contexts/UserContext';



function Navbar() {
    const isUserSignedIn = !!localStorage.getItem('token');
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { setUser } = useUser();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Clear user data from local storage
        setUser(null); // Clear user data from context
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className='navbar'>
        <div className='navbar-content'>
            <img src={Blogimg} alt="Blog Logo" className='logo' />
            <Link to='/'><h1 className='title'>BlogForCoder</h1></Link>
            <button className='menu-button' onClick={toggleMenu}>
                &#9776;
            </button>
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            {isUserSignedIn ? (
                <>
                    <Link to='/account'><li className='nav-item'>Account</li></Link>
                    <li><button className='nav-item' onClick={() => navigate('/')}>Home</button></li>
                    <li><button className='nav-item' onClick={() => navigate('/blogs')}>Blogs</button></li>
                    <li><button className='nav-item' onClick={() => navigate('/writeblogs')}>Write Blogs</button></li>
                    <li><button className='nav-item' onClick={handleSignOut}>Sign Out</button></li>
                </>
            ) : (
                <>
                    <Link to='/login'><li className='nav-item'>Login</li></Link>
                    <Link to='/signup'><li className='nav-item'>Signup</li></Link>
                </>
            )}
        </ul>
    </nav>
    );
}

export default Navbar;
