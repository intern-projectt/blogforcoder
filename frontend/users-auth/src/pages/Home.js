import React from 'react'
import Page1 from "../components/Home/page1"
import Page2 from "../components/Home/page2"

function Home() {
  return (
    <div className='page container'>
      <Page1 />
      <div className='d-flex justify-content-center align-items-center my-4 '>
        <h1>Latest Blogs</h1>
      </div>
      <Page2/>
      


    </div>
  )
}

export default Home