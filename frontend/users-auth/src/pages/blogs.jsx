import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import "../components/Home/page2.css"
import Chatgpt from '../components/chatgpt/chatgpt';

const Blogs = () => {
  const [blog, setblogs] = useState();
  useEffect(() => {
    const fetch = async () => {
      try {
        await axios.get("http://localhost:3000/api/v1/getall")
          .then((res) => setblogs(res.data.data))

      } catch (error) {
        alert("some error occured")
      }

    }
    fetch();


  }, [])


  return (
    <>
      <div className='page2 '>
        {blog && blog.map((item, i) =>
          <div className='page2-box' key={i}>
            <h1>{item.title}</h1>
            <p> -- {item.desc.slice(0, 200)}...</p>
          </div>
        )}
      </div>
      
      <Chatgpt />
    </>


  )
}

export default Blogs
