import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import "./yourblog.css";

const Yourblog = () => {
    const [blogs, setBlogs] = useState([]);
    const { user } = useUser(); // Get user from context

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/getall");
                
                const allBlogs = response.data.data;
                console.log("Fetched Blogs:", allBlogs); // Ensure this logs the fetched blogs
                console.log("User ID:", user.id);
                
                // Filter blogs to show only those created by the logged-in user
                const userBlogs = allBlogs.filter(blog => blog.authorId === user.id);
                console.log("Filtered User Blogs:", userBlogs); // This should log the filtered blogs
                setBlogs(userBlogs);
            } catch (error) {
                alert("Some error occurred");
            }
        };

        if (user) {
            fetchBlogs();
        }
    }, [user]);

    return (
        <div className='ur-box'>
            <h1>Your Blog</h1>
            <div className='page2'>
                {blogs.length > 0 ? (
                    blogs.map((item, i) => (
                        <div className='page2-box' key={i}>
                            <Link to={`/blogspage/${item._id}`}>
                                <h1>{item.title}</h1>
                            </Link>
                            <p> -- {item.desc.slice(0, 200)}...</p>
                        </div>
                    ))
                ) : (
                    <p>No blogs found</p>
                )}
            </div>
        </div>
    );
};

export default Yourblog;
