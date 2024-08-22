import React from 'react'
import "./page1.css"
import { Link } from 'react-router-dom'

const page1 = () => {
  return (
   <div className="page container home-pg1  d-flex justify-content-center align-items-center">
     <div className='head-box'>
      <Link to="/writeblogs">
      <h1>
            Create Your Own Blogs
        </h1>
      </Link>
        
     </div>
     <hr />
   </div>
   
  )
}

export default page1;
