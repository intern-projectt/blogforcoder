import React, { useState, useEffect } from 'react';
import './writeblogs.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../contexts/UserContext'; 

const WriteBlogsAndUpdate = ({ titlename }) => {
  const id = useParams().id;
  const { user } = useUser();
  

  const history = useNavigate();

  const [blog, setBlog] = useState({ title: "", desc: "" });

 
    useEffect(() => {
      const fetch = async () => {
        try {
          if(titlename === "Update"){
            const response = await axios.get(`http://localhost:3000/api/v1/getblog/${id}`)
            .then((res) => setBlog(res.data.data))
          }
         
        } catch (error) {
          alert("something is wronggg")
        }
      }
      fetch();
    }, [id])
  

 







  const change = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const submit = async () => {
    try {
      const blogData = {
        ...blog,
        authorId: user.id 
       
      };
      
      if (titlename === "Write") {
        const response = await axios.post("http://localhost:3000/api/v1/post", blogData)
          .then((res) => console.log(res.data.data))

        setBlog({ title: "", desc: "" });

      }
      else {
        const response = await axios.put(`http://localhost:3000/api/v1/updateblog/${id}`, blog)
        .then((res) => alert(res.data.message))

      setBlog({ title: "", desc: "" });
      history(`/blogspage/${id}`);

      }


    } catch (err) {
      alert("something is wrong")
    }
  };



  return (
    <div className='write-container'>
      <h1>{titlename}</h1>
      <div className='write-box'>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            className='formtext'
            type="text"
            id='title'
            name='title'
            value={blog.title}
            onChange={(e)=> setBlog( e.target.value)}
            placeholder='Write Title'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='desc'>Description</label>
          <textarea
            className='formtext'
            id='desc'
            name='desc'
            value={blog.desc}
            onChange={(e)=> setBlog(  e.target.value)}
            placeholder='Write Description'
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <button className='add-blog-button' onClick={submit}>{titlename}</button>

      </div>
    </div>
  );
};

export default WriteBlogsAndUpdate;
