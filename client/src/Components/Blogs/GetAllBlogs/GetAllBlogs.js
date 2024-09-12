import React, { useEffect, useState } from 'react'
import { getAllBlogs } from '../../../Service/GET/blogs';
import { useNavigate } from 'react-router-dom';

export default function GetAllBlogs() {

    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    const getData = async () => {
        const data = await getAllBlogs();
        console.log(data);
        setBlogs(data);
    }
    
    useEffect(()=>{
        getData();
    }, [])


    const blogDetails = (id) => {
      navigate("/blogdetails", {state: {id: id}});
    }

  return (
    <div>
      {blogs.map((item)=>{
        return(
          <div className='w-[80%] m-auto mt-[20px] p-[20px] bg-slate-800 text-white rounded-md' onClick={()=> blogDetails(item._id)}>

            <div className='flex justify-between items-center'>
              <h2 className='text-lg font-semibold'>{item.title}</h2>
              <p>{new Date(item.uploadedOn).toLocaleDateString()}</p>  
            </div>
            <p className='text-gray-400'>{item.body}</p>
            <p>{item.liked} Likes</p>
            <br/>
            {/*  */}
          </div>
        )
      })}
    </div>
  )
}
