const Blogs = require("../Model/Blogs")

const getAllBlogs = async (req, res) => {
    const allBlogs = await Blogs.find();
    res.status(200).send(allBlogs);
}


const addBlog = (req, res) => {
    try {
        const newBlog = new Blogs(req.body);

        newBlog.save().then(()=>{
            res.status(200).send(newBlog);
        }).catch((e)=>{
            res.status(404).send(e);
        })
    } catch (error) {
        res.status(404).send(error);
    }
}

module.exports = {
    getAllBlogs,
    addBlog
}