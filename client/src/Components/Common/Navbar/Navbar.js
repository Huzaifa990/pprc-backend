import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='p-[10px] bg-slate-950'>
        <Link to={"/"} className='text-white no-underline ml-[10px]'> Blogs </Link>
        <Link to={"/addblogs"}  className='text-white no-underline ml-[10px]'> Add Blogs </Link>
    </div>
  )
}
