import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getBlog } from '../../../Service/GET/blogs';

export default function BlogDetails() {
    const location = useLocation();

    const id = location.state.id;
    const [blog, setBlog] = useState({});


    const getData = async () => {
        const data = await getBlog(id);
        console.log(data);
        setBlog(data);
    }


    useEffect(()=>{
        getData();
    }, [])

  return (
    <div className='w-[80%] m-auto mt-[50px] mb-[50px] bg-slate-800 text-white rounded-lg shadow-black shadow-lg p-[30px] text-center'>
        <center>
            <img src={blog.image} alt='blog' className='rounded-md' width={500}/>
        </center>
        <h1 className='text-lg font-semibold'>{blog.title}</h1>
        <p className='text-gray-400'>{blog.body}</p>
        <p className='text-gray-400'>{new Date(blog.uploadedOn).toLocaleDateString()}</p> 
        <br/>
        <button className='w-[100px] h-[35px] bg-slate-900 text-white rounded-md'> + Like </button>
    </div>
  )
}
