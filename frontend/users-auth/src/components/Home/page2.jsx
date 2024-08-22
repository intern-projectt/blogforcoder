
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./page2.css"
import {Link} from 'react-router-dom'

const Page2 = () => {
    const [blog, setblog] = useState()
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/getrecentblogs").then((res) => setblog(res.data.data))

            } catch (error) {
                alert("some error occured")
            }
        };
        fetch();
    }, []);
    // console.log(blog)

    return (
        <div className='page2 '>
            {blog && blog.map((item, i) =>
                <div className='page2-box' key={i}>
                    <h1>{item.title}</h1>
                    <p> {item.desc.slice(0,200)}...</p>
                </div>
            )}
        </div>
    );
};

export default Page2;

