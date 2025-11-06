import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
   <> 
    <div className='text-4xl text-center mt-20'>Home Page</div>
<div className='flex gap-10 justify-center text-3xl underline text-center m-52'>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
</div>



</>
  )
}

export default HomePage