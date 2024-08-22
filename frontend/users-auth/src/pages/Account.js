import React from 'react';
import { useUser } from '../components/contexts/UserContext';
import Profileinfo from '../components/profile-info/profileinfo'; // Adjust the path as needed
import Yourblog from '../components/yourblog/yourblog'; // Adjust the path as needed
import "../components/yourblog/yourblog.css"

function Account() {
    const { user } = useUser();

    return (

        <div className='w-full h-screen bg-[#1a1a1a] text-white alldata'>
            <div className='profilebox'>
                {user ? (
                    <Profileinfo user={user} />

                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <Yourblog/>


        </div>




    );
}

export default Account;
