
import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import "../Home/page2.css"
import Writeblogs from '../writeblogs/writeblogs';

const Blogspage = () => {
     const id = useParams().id;
     const [blog, setblog] = useState()
     useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/getblog/${id}`).then((res) => setblog(res.data.data))

            } catch (error) {
                alert("some error occured")
            }
        };
        fetch();
    }, [id]);

    //  console.log(blog)

  return (
    <div className='page2 '>
        
        <Link  to={`/updateblogs/${id}`} className="edit-logo" >
        <FaRegEdit />
        </Link>

    {blog &&  (
        <div className='page2-box' >
             <h1>{blog.title}</h1>
            
           
            <p> -- {blog.desc}</p>
        </div>
    )}
</div>
  )
}

export default Blogspage
