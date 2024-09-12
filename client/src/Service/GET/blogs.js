import axios from "axios"
import { API } from "../../Config/config"

export const getAllBlogs = async () => {
    const data = await axios.get(`${API.api_url}/api/blogs`).then((res)=>{
        return res.data;
    }).catch((e)=>{
        return e;
    })
    return data;
}


export const getBlog = async (id) => {
    const data = await axios.get(`${API.api_url}/api/blogs/${id}`).then((res)=>{
        return res.data;
    }).catch((e)=>{
        return e;
    })

    return data;
}